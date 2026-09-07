'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { BRAT_GENERATOR_EMBED_HTML } from '@/lib/toolEmbedHtml';

export default function BratGenerator() {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [height, setHeight] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    const timers: number[] = [];

    const measureTool = () => {
      if (cancelled) return;
      try {
        const doc = frame.contentDocument;
        if (!doc) return;

        const toolRoot = doc.querySelector<HTMLElement>('.brat-app-wrapper');
        if (!toolRoot) return;

        const rectHeight = Math.ceil(toolRoot.getBoundingClientRect().height);
        const contentHeight = Math.ceil(toolRoot.scrollHeight || 0);
        const nextHeight = Math.max(rectHeight, contentHeight, 1);

        if (nextHeight > 1) {
          setHeight(nextHeight);
          setReady(true);
        }
      } catch {
        // Keep the shell collapsed if the embedded document is not measurable yet.
      }
    };

    try {
      const doc = frame.contentDocument;
      if (!doc) return;

      doc.open();
      doc.write(BRAT_GENERATOR_EMBED_HTML);
      doc.close();

      const attachObserver = () => {
        if (cancelled) return;
        try {
          const embeddedDoc = frame.contentDocument;
          const toolRoot = embeddedDoc?.querySelector<HTMLElement>('.brat-app-wrapper');
          if (!toolRoot) {
            timers.push(window.setTimeout(attachObserver, 80));
            return;
          }

          measureTool();
          if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => measureTool());
            resizeObserver.observe(toolRoot);
          }
        } catch {
          // Leave collapsed; a later timer can retry.
        }
      };

      timers.push(window.setTimeout(attachObserver, 30));
      timers.push(window.setTimeout(measureTool, 150));
      timers.push(window.setTimeout(measureTool, 600));
    } catch {
      setReady(false);
      setHeight(0);
    }

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;

      // Intentionally ignore legacy iframe height messages. Measuring the actual
      // tool root avoids a feedback loop where iframe viewport height kept
      // increasing its own document.scrollHeight after every refresh.
      if (data.type === 'brat-generator-download') {
        trackEvent('brat_design_download', { tool_version: 'uploaded-generator' });
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div
      className="generator-embed-shell reveal"
      style={!ready ? { minHeight: 0, borderColor: 'transparent', boxShadow: 'none' } : undefined}
    >
      <iframe
        ref={frameRef}
        className="brat-generator-iframe"
        title="Brat Generator design tool"
        style={{
          height: ready ? `${height}px` : '0px',
          minHeight: 0,
          opacity: ready ? 1 : 0,
          overflow: 'hidden',
        }}
        scrolling="no"
        allow="clipboard-read; clipboard-write"
        loading="eager"
      />
    </div>
  );
}
