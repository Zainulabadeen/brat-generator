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

const DEFAULT_HEIGHT = 940;

export default function BratVideoGenerator() {
  const { locale } = useLanguage();
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  const measureOnce = () => {
    window.requestAnimationFrame(() => {
      try {
        const toolRoot = frameRef.current?.contentDocument?.querySelector<HTMLElement>('#bvg-root');
        if (!toolRoot) return;
        const nextHeight = Math.max(Math.ceil(toolRoot.scrollHeight || 0), 820);
        setHeight((current) => {
          const safeHeight = Math.min(nextHeight, 2200);
          return Math.abs(current - safeHeight) > 2 ? safeHeight : current;
        });
      } catch {
        // The reserved height keeps the tool stable if measurement is unavailable.
      }
    });
  };

  const handleLoad = () => {
    measureOnce();
    translateEmbeddedFrame(frameRef.current, locale);
    window.dispatchEvent(new CustomEvent('brat-frame-ready'));
  };

  useEffect(() => {
    translateEmbeddedFrame(frameRef.current, locale);
  }, [locale]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'brat-video-generator-export') {
        trackEvent('brat_video_export_click', { tool_version: 'embedded-video-generator' });
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="video-generator-embed-shell">
      <iframe
        ref={frameRef}
        src="/brat-video-generator-embed.html"
        className="brat-video-generator-iframe"
        title="Brat Video Generator"
        onLoad={handleLoad}
        style={{ height: `${height}px` }}
        scrolling="no"
        loading="lazy"
        allow="clipboard-read; clipboard-write; fullscreen"
      />
    </div>
  );
}
