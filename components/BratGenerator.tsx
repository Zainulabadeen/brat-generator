'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { useLanguage } from '@/components/LanguageProvider';
import { localeOptions, translatorLanguageCode, type LocaleCode } from '@/lib/localization';

function translateEmbeddedFrame(frame: HTMLIFrameElement | null, locale: LocaleCode) {
  if (locale === 'en' || !frame?.contentDocument || !frame.contentWindow) return;

  const doc = frame.contentDocument;
  const body = doc.body;
  if (!body) return;

  const win = frame.contentWindow as unknown as {
    google?: { translate?: { TranslateElement?: new (opts: Record<string, unknown>, id: string) => unknown } };
    __bratFrameTranslateInit?: () => void;
  };

  if (!doc.getElementById('brat-frame-translate-style')) {
    const style = doc.createElement('style');
    style.id = 'brat-frame-translate-style';
    style.textContent = `
      html,body{top:0!important;margin-top:0!important}
      .goog-te-banner-frame,.goog-te-banner-frame.skiptranslate,
      .VIpgJd-ZVi9od-ORHb-OEVmcd,#goog-gt-tt,.goog-te-balloon-frame,
      body>.skiptranslate{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important}
    `;
    (doc.head || doc.documentElement).appendChild(style);
  }

  const hostId = 'brat-frame-translate-host';
  let host = doc.getElementById(hostId);
  if (!host) {
    host = doc.createElement('div');
    host.id = hostId;
    host.setAttribute('aria-hidden', 'true');
    host.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none';
    body.appendChild(host);
  }

  const apply = () => {
    const combo = doc.querySelector<HTMLSelectElement>('select.goog-te-combo');
    if (!combo) return;
    const code = translatorLanguageCode[locale] || 'en';
    if (combo.value !== code) {
      combo.value = code;
      combo.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  const init = () => {
    const Constructor = win.google?.translate?.TranslateElement;
    if (!Constructor || !host) return;
    if (host.dataset.ready !== '1') {
      host.dataset.ready = '1';
      const includedLanguages = localeOptions
        .map((item) => translatorLanguageCode[item.code])
        .filter(Boolean)
        .join(',');
      new Constructor({ pageLanguage: 'en', includedLanguages, autoDisplay: false }, hostId);
    }
    window.setTimeout(apply, 160);
  };

  win.__bratFrameTranslateInit = init;
  const existing = doc.getElementById('brat-frame-translate-script');
  if (!existing) {
    const script = doc.createElement('script');
    script.id = 'brat-frame-translate-script';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=__bratFrameTranslateInit';
    script.async = true;
    body.appendChild(script);
  } else {
    init();
  }
}


type BratStylePreset = 'green' | 'black' | 'white' | 'pink' | 'blue';

const BRAT_STYLE_PRESETS: Record<BratStylePreset, { background: string; text: string }> = {
  green: { background: '#8ace00', text: '#000000' },
  black: { background: '#111111', text: '#ffffff' },
  white: { background: '#ffffff', text: '#111111' },
  pink: { background: '#ff69b4', text: '#111111' },
  blue: { background: '#00bfff', text: '#111111' },
};

const BRAT_STYLE_MODE_MAP: Partial<Record<BratStylePreset, string>> = {
  green: 'brat',
  white: 'white',
};

function styleFromLocationHash(): BratStylePreset | null {
  if (typeof window === 'undefined') return null;
  const style = window.location.hash.replace(/^#/, '').toLowerCase();
  return style in BRAT_STYLE_PRESETS ? style as BratStylePreset : null;
}

function applyStylePreset(frame: HTMLIFrameElement | null, style: BratStylePreset | null) {
  if (!frame?.contentDocument || !style) return;
  const doc = frame.contentDocument;
  const preset = BRAT_STYLE_PRESETS[style];
  const matchingMode = BRAT_STYLE_MODE_MAP[style];

  if (matchingMode) {
    const modeButton = doc.querySelector<HTMLButtonElement>(`.mode-btn[data-mode="${matchingMode}"]`);
    if (modeButton) {
      modeButton.click();
      return;
    }
  }

  const swatches = Array.from(doc.querySelectorAll<HTMLElement>('#bgColorRow .csw'));
  const matchingSwatch = swatches.find((swatch) => swatch.dataset.col?.toLowerCase() === preset.background);

  if (matchingSwatch) {
    matchingSwatch.click();
  } else {
    const bgPicker = doc.querySelector<HTMLInputElement>('#bgPick');
    if (bgPicker) {
      bgPicker.value = preset.background;
      bgPicker.dispatchEvent(new Event('input', { bubbles: true }));
      bgPicker.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  const textPicker = doc.querySelector<HTMLInputElement>('#fgPick');
  if (textPicker) {
    textPicker.value = preset.text;
    textPicker.dispatchEvent(new Event('input', { bubbles: true }));
    textPicker.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

function applyStyleFromLocation(frame: HTMLIFrameElement | null) {
  applyStylePreset(frame, styleFromLocationHash());
}

const DEFAULT_HEIGHT = 720;

export default function BratGenerator() {
  const { locale } = useLanguage();
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [fallbackHtml, setFallbackHtml] = useState<string | null>(null);

  const handleLoad = () => {
    const frame = frameRef.current;
    const bodyText = frame?.contentDocument?.body?.textContent || '';
    const title = frame?.contentDocument?.title || '';
    const missingEmbed =
      bodyText.includes('That Page Went Off-Track') ||
      /(^|\s)404(\s|$)/i.test(title) ||
      bodyText.includes('The page you requested does not exist');

    if (missingEmbed && !fallbackHtml) {
      import('@/lib/embedDocuments').then((module) => {
        setFallbackHtml(module.BRAT_GENERATOR_EMBED_HTML);
      });
      return;
    }

    translateEmbeddedFrame(frame, locale);
    applyStyleFromLocation(frame);
    window.dispatchEvent(new CustomEvent('brat-frame-ready'));
  };

  useEffect(() => {
    translateEmbeddedFrame(frameRef.current, locale);
  }, [locale]);

  useEffect(() => {
    const applyRequestedStyle = () => applyStyleFromLocation(frameRef.current);
    window.addEventListener('hashchange', applyRequestedStyle);
    applyRequestedStyle();
    return () => window.removeEventListener('hashchange', applyRequestedStyle);
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;

      if (data.type === 'brat-generator-height') {
        const nextHeight = Number(data.height);
        if (Number.isFinite(nextHeight) && nextHeight > 0) {
          setHeight((current) => {
            const safeHeight = Math.max(620, Math.min(Math.ceil(nextHeight), 1800));
            return Math.abs(current - safeHeight) > 2 ? safeHeight : current;
          });
        }
      }

      if (data.type === 'brat-generator-download') {
        trackEvent('brat_design_download', { tool_version: 'embedded-generator' });
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="generator-embed-shell">
      <iframe
        ref={frameRef}
        src={fallbackHtml ? undefined : "/brat-generator-embed/"}
        srcDoc={fallbackHtml || undefined}
        className="brat-generator-iframe"
        title="Brat Generator design tool"
        onLoad={handleLoad}
        style={{ height: `${height}px` }}
        scrolling="no"
        allow="clipboard-read; clipboard-write"
        loading="lazy"
      />
    </div>
  );
}
