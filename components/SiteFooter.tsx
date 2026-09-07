import Link from 'next/link';
import { pageLinks } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container container-wide">
        <div className="footer-grid footer-grid-four">
          <div className="footer-about">
            <Link href="/" className="brand" aria-label="Brat Generator home">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-glow" />
                <svg viewBox="0 0 40 40"><path d="M20 4 C25 8, 34 6, 36 14 C38 22, 30 24, 32 32 C28 36, 18 34, 14 36 C8 34, 4 28, 6 22 C2 16, 8 8, 14 8 C16 4, 18 2, 20 4 Z" /></svg>
              </span>
              <span>brat<span className="text-brat">.</span>generator</span>
            </Link>
            <p>Free browser-based Brat-inspired text and cover generator. No account required, no watermark, and generator designs are processed locally in your browser.</p>
          </div>

          <div>
            <h4>Create</h4>
            <Link href={pageLinks.home}>Home</Link>
            <Link href={pageLinks.generator}>Open Generator</Link>
            <Link href={pageLinks.videoGenerator}>Video Generator</Link>
            <Link href={pageLinks.features}>Features</Link>
            <Link href={pageLinks.styles}>Brat Styles</Link>
            <Link href={pageLinks.howTo}>How to Use</Link>
          </div>

          <div>
            <h4>Learn</h4>
            <Link href={pageLinks.blog}>Blog</Link>
            <Link href={pageLinks.faq}>FAQ</Link>
            <Link href={pageLinks.about}>About</Link>
          </div>

          <div>
            <h4>Trust</h4>
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
