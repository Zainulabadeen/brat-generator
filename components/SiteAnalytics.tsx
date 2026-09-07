'use client';

import Script from 'next/script';
import { useEffect, useMemo, useState } from 'react';

const CONSENT_KEY = 'brat-analytics-consent';

type Consent = 'accepted' | 'declined' | null;

export default function SiteAnalytics() {
  const measurementId = useMemo(() => process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || '', []);
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!measurementId) return;
    const saved = window.localStorage.getItem(CONSENT_KEY);
    setConsent(saved === 'accepted' || saved === 'declined' ? saved : null);
    setReady(true);
  }, [measurementId]);

  if (!measurementId || !ready) return null;

  const choose = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              anonymize_ip: true,
              send_page_view: true
            });
          `}</Script>
        </>
      )}

      {consent === null && (
        <div className="consent-banner" role="dialog" aria-label="Analytics consent" aria-live="polite">
          <div>
            <strong>Optional analytics</strong>
            <p>We only load Google Analytics if you choose Accept. The Brat generator itself works without analytics.</p>
          </div>
          <div className="consent-actions">
            <button type="button" className="consent-secondary" onClick={() => choose('declined')}>Decline</button>
            <button type="button" className="consent-primary" onClick={() => choose('accepted')}>Accept</button>
          </div>
        </div>
      )}
    </>
  );
}
