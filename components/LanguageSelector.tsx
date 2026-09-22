'use client';

import { useEffect, useRef, useState } from 'react';
import { localeOptions, LocaleCode } from '@/lib/localization';
import { useLanguage } from '@/components/LanguageProvider';

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
      <button type="button" className="language-trigger" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span aria-hidden="true">◎</span>
        <span>{translating ? '…' : current.short}</span>
        <span className="language-caret">⌄</span>
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
              <span>{item.label}</span>
              {item.code === locale ? <span aria-hidden="true">✓</span> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
