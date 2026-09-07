import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="not-found-page">
        <div className="container container-narrow not-found-box glass">
          <p className="eyebrow">404</p>
          <h1>That Page Went <span className="text-brat">Off-Track</span></h1>
          <p>The page you requested does not exist or may have moved. Head back to the generator or browse the guides.</p>
          <div className="hero-buttons">
            <Link className="pill-btn primary" href="/#generator">Open Generator</Link>
            <Link className="pill-btn secondary" href="/">Go Home</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
