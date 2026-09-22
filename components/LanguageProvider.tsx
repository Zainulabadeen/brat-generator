'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { localeFromTimezone, localeOptions, normalizeLocale, LocaleCode, commonText, translatorLanguageCode } from '@/lib/localization';

type LanguageContextValue = {
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
  t: (key: string) => string;
  translating: boolean;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  setLocale: () => undefined,
  t: (key) => key,
  translating: false,
});

const SCRIPT_ID = 'brat-google-translate-script';
const HOST_ID = 'brat-google-translate-host';

function rootCookieDomain() {
  if (typeof location === 'undefined' || !location.hostname.includes('.')) return null;
  const parts = location.hostname.split('.');
  if (parts.length < 2) return null;
  return `.${parts.slice(-2).join('.')}`;
}

function clearTranslateCookie() {
  document.cookie = 'googtrans=;path=/;max-age=0;SameSite=Lax';
  const domain = rootCookieDomain();
  if (domain) document.cookie = `googtrans=;domain=${domain};path=/;max-age=0;SameSite=Lax`;
}

function setTranslateCookie(locale: LocaleCode) {
  const code = translatorLanguageCode[locale] || 'en';
  if (code === 'en') {
    clearTranslateCookie();
    return;
  }

  const value = `/en/${code}`;
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `googtrans=${value};path=/;max-age=${maxAge};SameSite=Lax`;
  const domain = rootCookieDomain();
  if (domain) document.cookie = `googtrans=${value};domain=${domain};path=/;max-age=${maxAge};SameSite=Lax`;
}

function suppressGoogleChrome() {
  document.documentElement.style.marginTop = '0px';
  if (document.body) document.body.style.top = '0px';

  const selectors = [
    '.goog-te-banner-frame',
    '.goog-te-banner-frame.skiptranslate',
    '.VIpgJd-ZVi9od-ORHb-OEVmcd',
    '#goog-gt-tt',
    '.goog-te-balloon-frame',
  ];
  document.querySelectorAll<HTMLElement>(selectors.join(',')).forEach((el) => {
    el.style.setProperty('display', 'none', 'important');
    el.style.setProperty('visibility', 'hidden', 'important');
    el.style.setProperty('height', '0', 'important');
  });

  document.querySelectorAll<HTMLElement>('body > .skiptranslate').forEach((el) => {
    if (el.id === HOST_ID || el.classList.contains('google-translate-host')) return;
    el.style.setProperty('display', 'none', 'important');
    el.style.setProperty('height', '0', 'important');
  });
}

function getGoogleCombo(root: ParentNode = document) {
  return root.querySelector<HTMLSelectElement>('select.goog-te-combo');
}

function applyGoogleLocale(locale: LocaleCode) {
  if (locale === 'en') {
    suppressGoogleChrome();
    return true;
  }
  const combo = getGoogleCombo();
  if (!combo) return false;
  const code = translatorLanguageCode[locale] || 'en';
  if (combo.value !== code) {
    combo.value = code;
    combo.dispatchEvent(new Event('change', { bubbles: true }));
  }
  suppressGoogleChrome();
  return true;
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<LocaleCode>('en');
  const [translating, setTranslating] = useState(false);

  const setLocale = useCallback((next: LocaleCode) => {
    localStorage.setItem('brat_locale', next);
    localStorage.setItem('brat_locale_manual', '1');
    setTranslateCookie(next);
    setLocaleState(next);
    window.dispatchEvent(new CustomEvent('brat-language-change', { detail: { locale: next } }));

    // Returning to English is most reliable after removing Google's translation cookie.
    if (next === 'en' && document.querySelector('html.translated-ltr,html.translated-rtl,body.translated-ltr,body.translated-rtl')) {
      window.setTimeout(() => window.location.reload(), 20);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('brat_locale');
    if (saved) {
      const next = normalizeLocale(saved);
      setTranslateCookie(next);
      setLocaleState(next);
      return;
    }
    const primary = normalizeLocale(navigator.languages?.[0] || navigator.language);
    const next = primary !== 'en' ? primary : localeFromTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setTranslateCookie(next);
    setLocaleState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh-Hans' ? 'zh-CN' : locale === 'zh-Hant' ? 'zh-TW' : locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  useEffect(() => {
    suppressGoogleChrome();
    const target = document.body || document.documentElement;
    const observer = new MutationObserver(() => suppressGoogleChrome());
    observer.observe(target, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (locale === 'en') {
      clearTranslateCookie();
      suppressGoogleChrome();
      setTranslating(false);
      return;
    }

    const win = window as unknown as {
      google?: { translate?: { TranslateElement?: new (opts: Record<string, unknown>, id: string) => unknown } };
      __bratGoogleTranslateInit?: () => void;
    };

    const init = () => {
      const Constructor = win.google?.translate?.TranslateElement;
      if (!Constructor) return;
      const host = document.getElementById(HOST_ID);
      if (!host || host.dataset.ready === '1') {
        window.setTimeout(() => applyGoogleLocale(locale), 60);
        return;
      }
      host.dataset.ready = '1';
      const includedLanguages = localeOptions
        .map((item) => translatorLanguageCode[item.code])
        .filter(Boolean)
        .join(',');
      new Constructor({ pageLanguage: 'en', includedLanguages, autoDisplay: false, multilanguagePage: true }, HOST_ID);
      window.setTimeout(() => applyGoogleLocale(locale), 180);
      window.setTimeout(suppressGoogleChrome, 220);
    };

    win.__bratGoogleTranslateInit = init;
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=__bratGoogleTranslateInit';
      (document.body || document.documentElement).appendChild(script);
    } else {
      init();
    }
  }, [locale]);

  useEffect(() => {
    if (locale === 'en') {
      setTranslating(false);
      suppressGoogleChrome();
      return;
    }

    setTranslating(true);
    setTranslateCookie(locale);
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      suppressGoogleChrome();
      if (applyGoogleLocale(locale) || attempts > 24) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          suppressGoogleChrome();
          setTranslating(false);
        }, 300);
      }
    }, 125);
    return () => window.clearInterval(timer);
  }, [locale, pathname]);

  useEffect(() => {
    const onFrameRequest = () => window.dispatchEvent(new CustomEvent('brat-language-change', { detail: { locale } }));
    window.addEventListener('brat-frame-ready', onFrameRequest);
    return () => window.removeEventListener('brat-frame-ready', onFrameRequest);
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => ({
    locale,
    setLocale,
    t: (key: string) => commonText(locale, key),
    translating,
  }), [locale, setLocale, translating]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
      <div id={HOST_ID} className="google-translate-host notranslate" aria-hidden="true" />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
