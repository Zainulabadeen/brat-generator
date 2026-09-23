'use client';

import { useEffect, useRef, useState } from 'react';
import { localeOptions, LocaleCode } from '@/lib/localization';
import { useLanguage } from '@/components/LanguageProvider';

function LanguageIcon() {
  return (
    <svg className="language-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 12h16.4M12 3.5c2.15 2.3 3.25 5.12 3.25 8.5S14.15 18.2 12 20.5M12 3.5C9.85 5.8 8.75 8.62 8.75 12S9.85 18.2 12 20.5" />
    </svg>
  );
}

export default function LanguageSelector() {
  const { locale, setLocale, translating } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const current = localeOptions.find((item) => item.code === locale) || localeOptions[0];

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener('pointerdown', onPointer);
    return () => window.removeEventListener('pointerdown', onPointer);
  }, []);

  return (
    <div className="language-menu" ref={wrapRef} data-no-translate="true">
      <button
        type="button"
        className="language-trigger"
        aria-label={`Language: ${current.label}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <LanguageIcon />
        <span>{translating ? '…' : current.short}</span>
        <span className="language-caret" aria-hidden="true">⌄</span>
      </button>
      {open ? (
        <div className="language-popover" role="menu" aria-label="Language">
          {localeOptions.map((item) => (
            <button
              key={item.code}
              type="button"
              role="menuitem"
              className={item.code === locale ? 'active' : undefined}
              onClick={() => { setLocale(item.code as LocaleCode); setOpen(false); }}
            >
              <span className="language-option-label"><span className="language-flag" aria-hidden="true">{item.flag}</span>{item.label}</span>
              {item.code === locale ? <span aria-hidden="true">✓</span> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
