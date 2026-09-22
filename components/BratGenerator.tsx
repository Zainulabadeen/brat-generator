'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { useLanguage } from '@/components/LanguageProvider';
import { localeOptions, translatorLanguageCode, type LocaleCode } from '@/lib/localization';
import { BRAT_GENERATOR_EMBED_HTML } from '@/lib/embedDocuments';

function translateEmbeddedFrame(frame: HTMLIFrameElement | null, locale: LocaleCode) {
  if (!frame?.contentDocument || !frame.contentWindow) return;

  const doc = frame.contentDocument;
  const body = doc.body;
  if (!body) return; // The locale effect can run before srcDoc has finished creating <body>.

  const win = frame.contentWindow as unknown as {
    google?: { translate?: { TranslateElement?: new (opts: Record<string, unknown>, id: string) => unknown } };
    __bratFrameTranslateInit?: () => void;
  };

  // Keep Google Translate's legacy banner/tooltips out of the embedded tool UI.
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

const DEFAULT_HEIGHT = 820;

export default function BratGenerator() {
  const { locale } = useLanguage();
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  const measureTool = () => {
    const frame = frameRef.current;
    if (!frame) return;

    try {
      const doc = frame.contentDocument;
      const toolRoot = doc?.querySelector<HTMLElement>('.brat-app-wrapper');
      if (!toolRoot) return;

      const rectHeight = Math.ceil(toolRoot.getBoundingClientRect().height);
      const contentHeight = Math.ceil(toolRoot.scrollHeight || 0);
      const nextHeight = Math.max(rectHeight, contentHeight, 720);
      setHeight(Math.min(nextHeight, 1800));
    } catch {
      setHeight(DEFAULT_HEIGHT);
    }
  };

  const handleLoad = () => {
    resizeObserverRef.current?.disconnect();
    measureTool();
    translateEmbeddedFrame(frameRef.current, locale);
    window.dispatchEvent(new CustomEvent('brat-frame-ready'));

    try {
      const toolRoot = frameRef.current?.contentDocument?.querySelector<HTMLElement>('.brat-app-wrapper');
      if (toolRoot && typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver(measureTool);
        observer.observe(toolRoot);
        resizeObserverRef.current = observer;
      }
    } catch {
      // The default height keeps the generator visible if measurement is unavailable.
    }

    window.setTimeout(measureTool, 120);
    window.setTimeout(measureTool, 500);
  };

  useEffect(() => {
    translateEmbeddedFrame(frameRef.current, locale);
  }, [locale]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;

      if (data.type === 'brat-generator-height') {
        const nextHeight = Number(data.height);
        if (Number.isFinite(nextHeight) && nextHeight > 0) {
          setHeight(Math.max(720, Math.min(Math.ceil(nextHeight), 1800)));
        }
      }

      if (data.type === 'brat-generator-download') {
        trackEvent('brat_design_download', { tool_version: 'embedded-generator' });
      }
    };

    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
      resizeObserverRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="generator-embed-shell">
      <iframe
        ref={frameRef}
        srcDoc={BRAT_GENERATOR_EMBED_HTML}
        className="brat-generator-iframe"
        title="Brat Generator design tool"
        onLoad={handleLoad}
        style={{ height: `${height}px` }}
        scrolling="no"
        allow="clipboard-read; clipboard-write"
        loading="eager"
      />
    </div>
  );
}
