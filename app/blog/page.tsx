import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RelatedPages from '@/components/RelatedPages';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Brat Generator Guides' },
  description: 'Practical Brat Generator guides covering album covers, colours, blur, typography, sizes, and browser-based creation.',
  alternates: { canonical: '/blog/' },
  openGraph: { url: '/blog/', title: 'Brat Generator Guides', description: 'Practical Brat Generator tutorials and creative guides.', images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Generator guides and tutorials' }] },
  twitter: { card: 'summary_large_image', title: 'Brat Generator Guides', description: 'Practical Brat Generator tutorials and creative guides.', images: ['/og-image.png'] },
};

export default function BlogPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
          eyebrow="Guides"
          title="Brat Generator"
          accent="Guides"
          description="Practical tutorials for creating Brat-inspired covers, social graphics, text effects, and downloads without unnecessary design software."
        />

        <section className="section">
          <div className="container container-wide">
            <div className="blog-grid">
              <article className="glass blog-card reveal">
                <div className="blog-card-art brat-green"><span className="brat-text">album cover</span></div>
                <p className="eyebrow left">Album Cover Guide</p>
                <h2><Link href="/blog/how-to-make-a-brat-album-cover-free/">How to Make a Brat Album Cover Free</Link></h2>
                <p>Learn the Brat-inspired colour, typography, blur, sizing, and four-step workflow for creating an album cover in your browser.</p>
                <Link className="text-link" href="/blog/how-to-make-a-brat-album-cover-free/">Read the album cover guide →</Link>
              </article>

              <article className="glass blog-card reveal reveal-delay-1">
                <div className="blog-card-art brat-electric"><span className="brat-text">quick fixes</span></div>
                <p className="eyebrow left">Troubleshooting</p>
                <h2><Link href="/blog/brat-generator-not-working/">Brat Generator Not Working? Common Problems &amp; Quick Fixes</Link></h2>
                <p>Fix download issues, excessive blur, clipped text, colour differences, and confusing mobile download locations with a simple step-by-step checklist.</p>
                <Link className="text-link" href="/blog/brat-generator-not-working/">Open the troubleshooting guide →</Link>
              </article>
            </div>
          </div>
        </section>

        <RelatedPages title="Explore the Brat Generator" items={[
          { href: '/how-to-use/', eyebrow: 'Tutorial', title: 'How to Use Brat Generator', description: 'Follow the full beginner-friendly workflow from text entry to download.', accent: 'green' },
          { href: '/brat-styles/', eyebrow: 'Styles', title: 'Explore Brat Styles', description: 'Compare green, black, white, pink and custom colour variations.', accent: 'pink' },
          { href: '/features/', eyebrow: 'Features', title: 'See Every Feature', description: 'Review preview, colour, blur, canvas and export controls in one place.', accent: 'blue' },
        ]} />
      </main>
      <SiteFooter />
    </>
  );
}
