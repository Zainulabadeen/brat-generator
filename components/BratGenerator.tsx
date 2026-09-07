'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function BratGenerator() {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [height, setHeight] = useState(780);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'brat-generator-height' && Number.isFinite(Number(data.height))) {
        setHeight(Math.min(2200, Math.max(720, Number(data.height) + 4)));
      }
      if (data.type === 'brat-generator-download') {
        trackEvent('brat_design_download', { tool_version: 'uploaded-generator' });
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="generator-embed-shell reveal">
      <iframe
        ref={frameRef}
        className="brat-generator-iframe"
        title="Brat Generator design tool"
        src="/brat-generator-embed.html"
        style={{ height }}
        allow="clipboard-write"
        loading="lazy"
      />
    </div>
  );
}
