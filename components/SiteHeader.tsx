'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { pageLinks } from '@/lib/site';

const navItems = [
  ['Home', pageLinks.home],
  ['Features', pageLinks.features],
  ['How to Use', pageLinks.howTo],
  ['Brat Styles', pageLinks.styles],
  ['Album Cover Guide', pageLinks.albumCoverGuide],
  ['Blog', pageLinks.blog],
] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);
  const isActive = (href: string) => {
    if (href.startsWith('/#')) return pathname === '/';
    if (href === '/') return pathname === '/';

    const cleanHref = href.replace(/\/$/, '');
    const albumGuidePath = pageLinks.albumCoverGuide.replace(/\/$/, '');

    if (href === pageLinks.blog) {
      return pathname === cleanHref || (pathname.startsWith(`${cleanHref}/`) && !pathname.startsWith(albumGuidePath));
    }

    return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <Link href="/" className="brand" onClick={close} aria-label="Brat Generator home">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-glow" />
            <svg viewBox="0 0 40 40"><path d="M20 4 C25 8, 34 6, 36 14 C38 22, 30 24, 32 32 C28 36, 18 34, 14 36 C8 34, 4 28, 6 22 C2 16, 8 8, 14 8 C16 4, 18 2, 20 4 Z" /></svg>
          </span>
          <span>brat<span className="text-brat">.</span>generator</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <Link key={label} href={href} className={isActive(href) ? 'active' : undefined}>{label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="create-now glow-brat" href={pageLinks.generator}>Create Now →</Link>
          <button className="menu-btn glass" type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>☰</button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {navItems.map(([label, href]) => (
          <Link key={label} href={href} onClick={close} className={isActive(href) ? 'active' : undefined}>{label}</Link>
        ))}
        <div className="mobile-menu-divider" />
        <Link href={pageLinks.generator} onClick={close}>Open Generator</Link>
        <Link href={pageLinks.faq} onClick={close}>FAQ</Link>
        <Link href={pageLinks.about} onClick={close}>About</Link>
        <Link href={pageLinks.privacy} onClick={close}>Privacy Policy</Link>
        <Link href={pageLinks.terms} onClick={close}>Terms &amp; Disclaimer</Link>
        <Link href={pageLinks.contact} onClick={close}>Contact</Link>
      </div>
    </header>
  );
}
