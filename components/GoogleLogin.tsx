'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

type GoogleProfile = { name?: string; email?: string; picture?: string; sub?: string };

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: { credential: string }) => void; auto_select?: boolean }) => void;
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

function parseJwt(token: string): GoogleProfile | null {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const decoded = decodeURIComponent(atob(payload).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
    return JSON.parse(decoded) as GoogleProfile;
  } catch {
    return null;
  }
}

export default function GoogleLogin() {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<GoogleProfile | null>(null);
  const [ready, setReady] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  useEffect(() => {
    const stored = localStorage.getItem('brat_google_profile');
    if (stored) {
      try { setProfile(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (!open || !clientId) return;
    const setup = () => {
      if (!window.google || !googleButtonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        auto_select: false,
        callback: ({ credential }) => {
          const next = parseJwt(credential);
          if (next) {
            setProfile(next);
            localStorage.setItem('brat_google_profile', JSON.stringify(next));
            setOpen(false);
          }
        },
      });
      googleButtonRef.current.innerHTML = '';
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        type: 'standard',
        theme: 'filled_black',
        size: 'large',
        shape: 'rectangular',
        text: 'continue_with',
        logo_alignment: 'left',
        width: 340,
        locale: locale === 'zh-Hans' ? 'zh_CN' : locale === 'zh-Hant' ? 'zh_TW' : locale,
      });
      setReady(true);
    };

    const existing = document.querySelector<HTMLScriptElement>('script[data-google-identity]');
    if (existing) {
      if (window.google) setup();
      else existing.addEventListener('load', setup, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = 'true';
    script.addEventListener('load', setup, { once: true });
    document.head.appendChild(script);
  }, [open, clientId, locale]);

  const firstName = useMemo(() => profile?.name?.split(' ')[0] || '', [profile]);

  const signOut = () => {
    window.google?.accounts.id.disableAutoSelect();
    localStorage.removeItem('brat_google_profile');
    setProfile(null);
    setOpen(false);
  };

  return (
    <div className="login-control" data-no-translate="true">
      <button className="login-trigger" type="button" onClick={() => profile ? setOpen((v) => !v) : setOpen(true)}>
        {profile?.picture ? <img src={profile.picture} alt="" referrerPolicy="no-referrer" /> : null}
        <span>{profile ? firstName || 'Account' : t('login')}</span>
      </button>

      {profile && open ? (
        <div className="account-popover">
          {profile.picture ? <img src={profile.picture} alt="" referrerPolicy="no-referrer" /> : null}
          <strong>{profile.name || 'Google account'}</strong>
          <span>{profile.email || ''}</span>
          <button type="button" onClick={signOut}>{t('logout')}</button>
        </div>
      ) : null}

      {!profile && open ? (
        <div className="login-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="login-modal" role="dialog" aria-modal="true" aria-label="Login with Google">
            <button className="login-close" type="button" aria-label="Close" onClick={() => setOpen(false)}>×</button>
            <div className="login-brand-mark">b</div>
            <h2>Brat Generator</h2>
            <p>Please continue by logging in</p>
            {clientId ? <div className="google-render-button" ref={googleButtonRef}>{ready ? null : 'Loading Google…'}</div> : (
              <div className="google-login-setup">
                <strong>Google Login setup needed</strong>
                <span>Add NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local, then restart the site.</span>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
