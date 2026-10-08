import Link from 'next/link';
import { pageLinks } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container container-wide">
        <div className="footer-grid footer-grid-four">
          <div className="footer-about">
            <Link prefetch={false} href="/" className="brand" aria-label="Brat Generator home" data-no-translate="true">
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
            <Link prefetch={false} href={pageLinks.home}>Brat Generator (Home)</Link>
            <Link prefetch={false} href={pageLinks.videoGenerator}>Brat Video Generator</Link>
            <Link prefetch={false} href={pageLinks.memeGenerator}>Brat Meme Generator</Link>
            <Link prefetch={false} href={pageLinks.imageGenerator}>Brat Image Generator</Link>
            <Link prefetch={false} href={pageLinks.albumGenerator}>Brat Album Cover Generator</Link>
            <Link prefetch={false} href={pageLinks.fontGenerator}>Brat Font Generator</Link>
          </div>

          <div>
            <p className="footer-heading">Explore</p>
            <Link prefetch={false} href={pageLinks.features}>Features</Link>
            <Link prefetch={false} href={pageLinks.styles}>Brat Styles</Link>
            <Link prefetch={false} href={pageLinks.examples}>Brat Examples</Link>
            <Link prefetch={false} href={pageLinks.help}>Help</Link>
            <Link prefetch={false} href={pageLinks.faq}>FAQ</Link>
            <Link prefetch={false} href={pageLinks.about}>About</Link>
          </div>

          <div>
            <p className="footer-heading">Trust</p>
            <Link prefetch={false} href={pageLinks.privacy}>Privacy Policy</Link>
            <Link prefetch={false} href={pageLinks.cookies}>Cookie Policy</Link>
            <Link prefetch={false} href={pageLinks.terms}>Terms &amp; Disclaimer</Link>
            <Link prefetch={false} href={pageLinks.contact}>Contact</Link>
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
