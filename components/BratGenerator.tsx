'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

const DEFAULT_HEIGHT = 820;

export default function BratGenerator() {
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

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
        trackEvent('brat_design_download', { tool_version: 'uploaded-generator' });
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="generator-embed-shell">
      <iframe
        src="/brat-generator-embed.html"
        className="brat-generator-iframe"
        title="Brat Generator design tool"
        style={{ height: `${height}px` }}
        scrolling="no"
        allow="clipboard-read; clipboard-write"
        loading="eager"
      />
    </div>
  );
}
