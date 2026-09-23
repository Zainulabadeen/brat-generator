import Link from 'next/link';
import { pageLinks } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container container-wide">
        <div className="footer-grid footer-grid-four">
          <div className="footer-about">
            <Link href="/" className="brand" aria-label="Brat Generator home" data-no-translate="true">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-glow" />
                <svg viewBox="0 0 40 40"><path d="M20 4 C25 8, 34 6, 36 14 C38 22, 30 24, 32 32 C28 36, 18 34, 14 36 C8 34, 4 28, 6 22 C2 16, 8 8, 14 8 C16 4, 18 2, 20 4 Z" /></svg>
              </span>
              <span>brat<span className="text-brat">.</span>generator</span>
            </Link>
            <p>Free browser-based Brat-inspired creative tools for text, memes, images, album covers, and video.</p>
          </div>

          <div>
            <p className="footer-heading">Tools</p>
            <Link href={pageLinks.home}>Brat Generator (Home)</Link>
            <Link href={pageLinks.videoGenerator}>Brat Video Generator</Link>
            <Link href={pageLinks.memeGenerator}>Brat Meme Generator</Link>
            <Link href={pageLinks.imageGenerator}>Brat Image Generator</Link>
            <Link href={pageLinks.albumGenerator}>Brat Album Cover Generator</Link>
          </div>

          <div>
            <p className="footer-heading">Explore</p>
            <Link href={pageLinks.features}>Features</Link>
            <Link href={pageLinks.styles}>Brat Styles</Link>
            <Link href={pageLinks.blog}>Blog</Link>
            <Link href={pageLinks.faq}>FAQ</Link>
            <Link href={pageLinks.about}>About</Link>
          </div>

          <div>
            <p className="footer-heading">Trust</p>
            <Link href={pageLinks.privacy}>Privacy Policy</Link>
            <Link href={pageLinks.terms}>Terms &amp; Disclaimer</Link>
            <Link href={pageLinks.contact}>Contact</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Brat Generator</span>
          <span>Independent fan-made design tool. Not affiliated with Charli XCX or her label.</span>
        </div>
      </div>
    </footer>
  );
}
