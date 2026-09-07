import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RelatedPages from '@/components/RelatedPages';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'About Brat Generator | Free Browser-Based Design Tool' },
  description: 'Learn how Brat Generator works, why it was built, how designs are processed in your browser, and the independent fan-made status of the tool.',
  alternates: { canonical: '/about/' },
  openGraph: {
    type: 'website',
    url: '/about/',
    title: 'About Brat Generator',
    description: 'A free browser-based tool for creating Brat-inspired text, covers, memes and social graphics.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About Brat Generator' }],
  },
  twitter: { card: 'summary_large_image', title: 'About Brat Generator', description: 'Learn how the free browser-based Brat-inspired design tool works.', images: ['/og-image.png'] },
};

export default function AboutPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${siteConfig.url}/about/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="About"
          title="A Focused Tool for"
          accent="Brat-Inspired Design"
          description="Brat Generator is a free, independent browser-based design tool built to make Brat-inspired text, cover art, memes and social graphics fast without forcing users into a complex editor."
          secondaryHref="/features/"
          secondaryLabel="Explore Features"
        />

        <div className="container container-wide"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} /></div>

        <section className="section section-tight">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Why It Exists</p>
            <h2>Simple by Design</h2>
            <p>General design tools are powerful, but they can be slow when you only want one specific visual style. Brat Generator focuses on the few controls that matter most for this aesthetic: text, background colour, text colour, size, spacing, blur, canvas ratio and export format.</p>
            <p>The goal is not to replace a full design suite. It is to help someone move from an idea to a finished Brat-inspired graphic in seconds, whether they are making a playlist cover, meme, profile image, social post or personal design experiment.</p>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-wide card-grid three">
            <article className="glass info-card hover-lift reveal"><div className="emoji">⚡</div><h3>Fast</h3><p>The live preview updates as settings change, so there is no repeated export-and-check loop.</p></article>
            <article className="glass info-card hover-lift reveal reveal-delay-1"><div className="emoji">🧩</div><h3>Focused</h3><p>The interface stays centred on the controls needed for Brat-style artwork rather than hiding them inside a large editor.</p></article>
            <article className="glass info-card hover-lift reveal reveal-delay-2"><div className="emoji">🔒</div><h3>Browser-Based</h3><p>Generator text and design rendering happen locally in your browser instead of being uploaded by the generator to an application server.</p></article>
          </div>
        </section>

        <section className="section">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Independent Status</p>
            <h2>Fan-Made, Not Official</h2>
            <p>Brat Generator is an independent fan-made design tool inspired by the broader visual language associated with Charli XCX&apos;s <em>Brat</em> era. It is not affiliated with, sponsored by, or endorsed by Charli XCX, Atlantic Records, Warner Music or their related brands.</p>
            <p>The site is intended to provide creative tools and educational guidance around the visual style. Users should avoid using generated designs in ways that falsely suggest an official relationship or endorsement.</p>
            <div className="section-cta"><Link className="text-link" href="/terms/">Read the Terms & Disclaimer <span aria-hidden="true">→</span></Link></div>
          </div>
        </section>

        <RelatedPages items={[
          { href: '/features/', eyebrow: 'Tool', title: 'Key Features', description: 'See exactly what the generator can do and how each control works.', accent: 'green' },
          { href: '/how-to-use/', eyebrow: 'Guide', title: 'How to Use It', description: 'Follow the full step-by-step workflow from text entry to download.', accent: 'blue' },
          { href: '/privacy-policy/', eyebrow: 'Trust', title: 'Privacy Policy', description: 'See what is processed locally and what technical data may be handled by hosting.', accent: 'pink' },
        ]} />
      </main>
      <SiteFooter />
    </>
  );
}
