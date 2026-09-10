'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function BratVideoGenerator() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [height, setHeight] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: '120px 0px', threshold: 0 }
    );

    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => resizeObserverRef.current?.disconnect(), []);

  const measureTool = () => {
    const frame = frameRef.current;
    if (!frame) return;

    try {
      const doc = frame.contentDocument;
      const toolRoot = doc?.querySelector<HTMLElement>('#bvg-root');
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
      // Keep the fallback collapsed if the embedded document cannot be measured.
    }

    window.setTimeout(measureTool, 120);
    window.setTimeout(measureTool, 500);
  };

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'brat-video-generator-export') {
        trackEvent('brat_video_export_click', { tool_version: 'uploaded-video-generator' });
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div
      ref={shellRef}
      className="video-generator-embed-shell"
      style={!ready ? { minHeight: 1, borderColor: 'transparent', boxShadow: 'none' } : undefined}
    >
      {shouldLoad && (
        <iframe
          ref={frameRef}
          src="/brat-video-generator-embed.html"
          className="brat-video-generator-iframe"
          title="Brat Video Generator"
          onLoad={handleLoad}
          style={{
            height: ready ? `${height}px` : '1px',
            minHeight: 0,
            opacity: ready ? 1 : 0,
            overflow: 'hidden',
          }}
          scrolling="no"
          loading="lazy"
          allow="clipboard-read; clipboard-write; fullscreen"
        />
      )}
    </div>
  );
}
