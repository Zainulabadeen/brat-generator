'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { BRAT_VIDEO_GENERATOR_EMBED_HTML } from '@/lib/toolEmbedHtml';

export default function BratVideoGenerator() {
  const [height, setHeight] = useState(900);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;

      if (data.type === 'brat-video-generator-height' && Number.isFinite(Number(data.height))) {
        setHeight(Math.min(1800, Math.max(760, Number(data.height) + 6)));
      }

      if (data.type === 'brat-video-generator-export') {
        trackEvent('brat_video_export_click', { tool_version: 'uploaded-video-generator' });
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="video-generator-embed-shell">
      <iframe
        className="brat-video-generator-iframe"
        srcDoc={BRAT_VIDEO_GENERATOR_EMBED_HTML}
        style={{ height }}
        title="Brat Video Generator"
        loading="eager"
        allow="clipboard-read; clipboard-write; fullscreen"
      />
    </div>
  );
}
