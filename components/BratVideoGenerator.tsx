'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { BRAT_VIDEO_GENERATOR_EMBED_HTML } from '@/lib/toolEmbedHtml';

export default function BratVideoGenerator() {
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

        const toolRoot = doc.querySelector<HTMLElement>('#bvg-root');
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
      doc.write(BRAT_VIDEO_GENERATOR_EMBED_HTML);
      doc.close();

      const attachObserver = () => {
        if (cancelled) return;
        try {
          const embeddedDoc = frame.contentDocument;
          const toolRoot = embeddedDoc?.querySelector<HTMLElement>('#bvg-root');
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

      // Ignore legacy height messages for the same reason as the image tool:
      // the real widget root is measured directly instead of document.scrollHeight.
      if (data.type === 'brat-video-generator-export') {
        trackEvent('brat_video_export_click', { tool_version: 'uploaded-video-generator' });
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div
      className="video-generator-embed-shell"
      style={!ready ? { minHeight: 0, borderColor: 'transparent', boxShadow: 'none' } : undefined}
    >
      <iframe
        ref={frameRef}
        className="brat-video-generator-iframe"
        title="Brat Video Generator"
        style={{
          height: ready ? `${height}px` : '0px',
          minHeight: 0,
          opacity: ready ? 1 : 0,
          overflow: 'hidden',
        }}
        scrolling="no"
        loading="eager"
        allow="clipboard-read; clipboard-write; fullscreen"
      />
    </div>
  );
}
