'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type TocItem = {
  href: string;
  label: string;
};

export default function ArticleTableOfContents({ items }: { items: readonly TocItem[] }) {
  const ids = useMemo(() => items.map((item) => item.href.replace(/^#/, '')), [items]);
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? '');

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

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
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
