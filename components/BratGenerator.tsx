'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { BRAT_GENERATOR_EMBED_HTML } from '@/lib/embedDocuments';

const DEFAULT_HEIGHT = 820;

export default function BratGenerator() {
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
