'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { BRAT_VIDEO_GENERATOR_EMBED_HTML } from '@/lib/embedDocuments';

const DEFAULT_HEIGHT = 940;

export default function BratVideoGenerator() {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  const measureTool = () => {
    const frame = frameRef.current;
    if (!frame) return;

    try {
      const doc = frame.contentDocument;
      const toolRoot = doc?.querySelector<HTMLElement>('#bvg-root');
      if (!toolRoot) return;

      const rectHeight = Math.ceil(toolRoot.getBoundingClientRect().height);
      const contentHeight = Math.ceil(toolRoot.scrollHeight || 0);
      const nextHeight = Math.max(rectHeight, contentHeight, 820);
      setHeight(Math.min(nextHeight, 2200));
    } catch {
      setHeight(DEFAULT_HEIGHT);
    }
  };

  const handleLoad = () => {
    resizeObserverRef.current?.disconnect();
    measureTool();

    try {
      const toolRoot = frameRef.current?.contentDocument?.querySelector<HTMLElement>('#bvg-root');
      if (toolRoot && typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver(measureTool);
        observer.observe(toolRoot);
        resizeObserverRef.current = observer;
      }
    } catch {
      // The default height keeps the video tool visible if measurement is unavailable.
    }

    window.setTimeout(measureTool, 120);
    window.setTimeout(measureTool, 500);
  };

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'brat-video-generator-export') {
        trackEvent('brat_video_export_click', { tool_version: 'embedded-video-generator' });
      }
    };

    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
      resizeObserverRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="video-generator-embed-shell">
      <iframe
        ref={frameRef}
        srcDoc={BRAT_VIDEO_GENERATOR_EMBED_HTML}
        className="brat-video-generator-iframe"
        title="Brat Video Generator"
        onLoad={handleLoad}
        style={{ height: `${height}px` }}
        scrolling="no"
        loading="eager"
        allow="clipboard-read; clipboard-write; fullscreen"
      />
    </div>
  );
}
