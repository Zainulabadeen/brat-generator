'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { BRAT_GENERATOR_EMBED_HTML } from '@/lib/toolEmbedHtml';

export default function BratGenerator() {
  const [height, setHeight] = useState(780);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;

      if (data.type === 'brat-generator-height' && Number.isFinite(Number(data.height))) {
        setHeight(Math.min(2400, Math.max(720, Number(data.height) + 6)));
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
        className="brat-generator-iframe"
        title="Brat Generator design tool"
        srcDoc={BRAT_GENERATOR_EMBED_HTML}
        style={{ height }}
        allow="clipboard-read; clipboard-write"
        loading="eager"
      />
    </div>
  );
}
