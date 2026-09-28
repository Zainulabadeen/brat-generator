import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, webPageSchema, websiteId } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Brat Generator Help: Guides, Tutorials & Quick Fixes' },
  description: 'Browse Brat Generator help articles covering album covers, colours, blur, typography, sizes, downloads, and browser troubleshooting.',
  alternates: { canonical: '/help/' },
  openGraph: {
    url: '/help/',
    title: 'Brat Generator Help: Guides, Tutorials & Quick Fixes',
    description: 'Practical Brat Generator tutorials and troubleshooting guides.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Generator Help guides and tutorials' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brat Generator Help: Guides & Quick Fixes',
    description: 'Practical tutorials and troubleshooting help for Brat Generator.',
    images: ['/og-image.png'],
  },
};

const helpItems = [
  {
    href: '/help/how-to-make-a-brat-album-cover-free/',
    eyebrow: 'Album Cover Guide',
    title: 'How to Make a Brat Album Cover Free',
    description: 'Learn the Brat-inspired colour, typography, blur, sizing, and four-step workflow for creating an album cover in your browser.',
    art: 'album cover',
    artClass: 'brat-green',
    cta: 'Read the album cover guide',
  },
  {
    href: '/help/brat-generator-not-working/',
    eyebrow: 'Troubleshooting',
    title: 'Brat Generator Not Working? Common Problems & Quick Fixes',
    description: 'Fix download issues, excessive blur, clipped text, colour differences, and confusing mobile download locations with a simple step-by-step checklist.',
    art: 'quick fixes',
    artClass: 'brat-electric',
    cta: 'Open the troubleshooting guide',
  },
] as const;

export default function HelpPage() {
  const canonical = `${siteConfig.url}/help/`;
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/` },
    { name: 'Help', url: canonical },
  ]);

  const pageSchema = webPageSchema({
    type: 'CollectionPage',
    url: canonical,
    name: 'Brat Generator Help',
    description: metadata.description,
    dateModified: '2026-09-28',
    mainEntity: { '@id': `${canonical}#help-list` },
  });

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${canonical}#help-list`,
    name: 'Brat Generator Help Guides',
    url: canonical,
    isPartOf: { '@id': websiteId },
    numberOfItems: helpItems.length,
    itemListElement: helpItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      url: `${siteConfig.url}${item.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumb, pageSchema, itemListSchema]} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content" className="help-hub-page help-hub-simple">
        <PageHero
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Help' }]}
          eyebrow="Help"
          title="Brat Generator"
          accent="Help"
          description="Practical guides for creating Brat-inspired covers, fixing common issues, and getting better results from the tools."
        />

        <section className="section help-guides-section">
          <div className="container container-wide">
            <div className="blog-grid help-guide-grid">
              {helpItems.map((item, index) => (
                <article className={`glass blog-card help-guide-card reveal reveal-delay-${index}`} key={item.href}>
                  <Link className={`blog-card-art ${item.artClass}`} href={item.href} aria-label={item.title}>
                    <span className="brat-text">{item.art}</span>
                  </Link>
                  <p className="eyebrow left">{item.eyebrow}</p>
                  <h2><Link href={item.href}>{item.title}</Link></h2>
                  <p>{item.description}</p>
                  <Link className="text-link" href={item.href}>{item.cta} →</Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
