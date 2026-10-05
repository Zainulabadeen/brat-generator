import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { helpArticles } from '@/lib/helpArticles';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, webPageSchema, websiteId } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Brat Generator Help: Guides, Tutorials & Quick Fixes' },
  description: 'Browse Brat Generator help articles covering video audio sync, export tips, meme ideas, canvas sizes, album covers, tool selection, downloads, and troubleshooting.',
  alternates: { canonical: '/help/' },
  openGraph: {
    url: '/help/',
    title: 'Brat Generator Help: Guides, Tutorials & Quick Fixes',
    description: 'Practical Brat Generator tutorials, creative guides, and troubleshooting help.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Generator Help guides and tutorials' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brat Generator Help: Guides & Quick Fixes',
    description: 'Practical tutorials and troubleshooting help for Brat Generator.',
    images: ['/og-image.png'],
  },
};

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
    dateModified: '2026-10-03',
    mainEntity: { '@id': `${canonical}#help-list` },
  });

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${canonical}#help-list`,
    name: 'Brat Generator Help Guides',
    url: canonical,
    isPartOf: { '@id': websiteId },
    numberOfItems: helpArticles.length,
    itemListElement: helpArticles.map((item, index) => ({
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
          description="Practical guides for choosing the right tool, creating better Brat-style graphics and videos, and fixing common browser or export problems."
        />

        <section className="section help-guides-section">
          <div className="container container-wide">
            <div className="blog-grid help-guide-grid help-guide-grid-expanded">
              {helpArticles.map((item, index) => (
                <article className={`glass blog-card help-guide-card help-guide-card-image reveal reveal-delay-${index % 3}`} key={item.href}>
                  <Link className="help-card-image-link" href={item.href} aria-label={item.title}>
                    <Image src={item.image} alt={item.imageAlt} width={1200} height={720} sizes="(max-width: 760px) 92vw, (max-width: 1100px) 44vw, 30vw" />
                  </Link>
                  <p className="eyebrow left">{item.eyebrow}</p>
                  <h2><Link href={item.href}>{item.title}</Link></h2>
                  <p>{item.description}</p>
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
