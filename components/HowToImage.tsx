'use client';

import { useEffect, useId, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  src: string;
  alt: string;
  className: 'step-image' | 'guide-step-image';
  width: number;
  height: number;
};

export default function HowToImage({ src, alt, className, width, height }: Props) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="howto-image-trigger"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge screenshot: ${alt}`}
      >
        <img
          className={className}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </button>

      {open ? createPortal(
        <div
          className="howto-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => {
            if (event.currentTarget === event.target) setOpen(false);
          }}
        >
          <div className="howto-lightbox-panel">
            <p className="sr-only" id={titleId}>{alt}</p>
            <button
              type="button"
              className="howto-lightbox-close"
              onClick={() => setOpen(false)}
              aria-label="Close enlarged screenshot"
            >
              ×
            </button>
            <img className="howto-lightbox-image" src={src} alt={alt} width="320" height="320" />
            <p className="howto-lightbox-caption">{alt.replace(/^.*?:\s*/, '')}</p>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
