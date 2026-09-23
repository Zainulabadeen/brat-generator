'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { pageLinks } from '@/lib/site';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/components/LanguageProvider';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    [t('home'), pageLinks.home],
    [t('video'), pageLinks.videoGenerator],
    [t('meme'), pageLinks.memeGenerator],
    [t('image'), pageLinks.imageGenerator],
    [t('album'), pageLinks.albumGenerator],
    [t('features'), pageLinks.features],
    [t('styles'), pageLinks.styles],
    [t('blog'), pageLinks.blog],
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  const close = () => setOpen(false);
  const isActive = (href: string) => {
    if (href.startsWith('/#')) return pathname === '/';
    if (href === '/') return pathname === '/';
    const cleanHref = href.replace(/\/$/, '');
    return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <Link href="/" className="brand" onClick={close} aria-label="Brat Generator home" data-no-translate="true">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-glow" />
            <svg viewBox="0 0 40 40"><path d="M20 4 C25 8, 34 6, 36 14 C38 22, 30 24, 32 32 C28 36, 18 34, 14 36 C8 34, 4 28, 6 22 C2 16, 8 8, 14 8 C16 4, 18 2, 20 4 Z" /></svg>
          </span>
          <span>brat<span className="text-brat">.</span>generator</span>
        </Link>

        <nav className="desktop-nav tool-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className={isActive(href) ? 'active' : undefined}>{label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSelector />
          <button className="menu-btn glass" type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>☰</button>
        </div>
      </div>

      <button
        className={`mobile-menu-backdrop ${open ? 'open' : ''}`}
        type="button"
        aria-label="Close navigation"
        onClick={close}
      />

      <aside className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu-head">
          <div className="mobile-menu-brand" data-no-translate="true">
            <span className="mobile-menu-dot" aria-hidden="true" />
            <span>brat<span className="text-brat">.</span>generator</span>
          </div>
          <button className="mobile-menu-close" type="button" aria-label="Close menu" onClick={close}>×</button>
        </div>

        <div className="mobile-menu-scroll">
          <p className="mobile-menu-label">Navigation</p>
          <nav className="mobile-tool-links" aria-label="Mobile tool navigation">
            {navItems.map(([label, href]) => (
              <Link key={href} href={href} onClick={close} className={isActive(href) ? 'active' : undefined}>
                <span>{label}</span><span aria-hidden="true">→</span>
              </Link>
            ))}
          </nav>

          <div className="mobile-menu-divider" />
          <p className="mobile-menu-label">More</p>
          <nav className="mobile-secondary-links" aria-label="More pages">
            <Link href={pageLinks.faq} onClick={close}>FAQ</Link>
            <Link href={pageLinks.about} onClick={close}>About</Link>
            <Link href={pageLinks.privacy} onClick={close}>Privacy Policy</Link>
            <Link href={pageLinks.terms} onClick={close}>Terms &amp; Disclaimer</Link>
            <Link href={pageLinks.contact} onClick={close}>Contact</Link>
          </nav>
        </div>

        <div className="mobile-language-login">
          <LanguageSelector />
        </div>
      </aside>
    </header>
  );
}
