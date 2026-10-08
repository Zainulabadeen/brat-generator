'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

type TocItem = {
  href: string;
  label: string;
};

export default function ArticleTableOfContents({ items }: { items: readonly TocItem[] }) {
  const ids = useMemo(() => items.map((item) => item.href.replace(/^#/, '')), [items]);
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? '');
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const updateActive = () => {
      const marker = Math.min(220, window.innerHeight * 0.28);
      let current = sections[0].id;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= marker) current = section.id;
        else break;
      }

      setActiveHref(`#${current}`);
    };

    // At most one geometry calculation per painted frame, even during fast scrolling.
    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateActive();
      });
    };
    updateActive();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [ids]);

  return (
    <nav className="article-toc-clean reveal" aria-label="Table of Contents">
      <h2>Table of Contents</h2>
      <div className="article-toc-clean-list">
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={activeHref === item.href ? 'is-active' : undefined}
            aria-current={activeHref === item.href ? 'location' : undefined}
            onClick={() => setActiveHref(item.href)}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
