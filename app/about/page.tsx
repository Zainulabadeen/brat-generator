import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import SiteIcon from '@/components/SiteIcon';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, organizationId, webPageSchema } from '@/lib/schema';

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
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/` },
    { name: 'About', url: `${siteConfig.url}/about/` },
  ]);

  const pageSchema = webPageSchema({
    type: 'AboutPage',
    url: `${siteConfig.url}/about/`,
    name: 'About Brat Generator',
    description: metadata.description,
    dateModified: '2026-10-04',
    about: { '@id': organizationId },
  });

  return (
    <>
      <JsonLd data={[breadcrumb, pageSchema]} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
          eyebrow="About"
          title="A Focused Tool for"
          accent="Brat-Inspired Design"
          description="Brat Generator is a free, independent browser-based design tool built to make Brat-inspired text, cover art, memes and social graphics fast without forcing users into a complex editor."
        />

        <section className="section section-tight">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Why It Exists</p>
            <h2>Simple by Design</h2>
            <p>General design tools are powerful, but they can be slow when you only want one specific visual style. Brat Generator focuses on the few controls that matter most for this aesthetic: text, background colour, text colour, size, spacing, blur, canvas ratio and export format.</p>
            <p>The goal is not to replace a full design suite. It is to help someone move from an idea to a finished Brat-inspired graphic quickly. The <Link className="inline-source-link" href="/#how-to">Brat Generator tutorial</Link> covers the basic workflow when you need a starting point.</p>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-wide card-grid three">
            <article className="glass info-card hover-lift reveal"><div className="emoji"><SiteIcon name="bolt" size={27} /></div><h3>Fast</h3><p>The live preview updates as settings change, so there is no repeated export-and-check loop.</p></article>
            <article className="glass info-card hover-lift reveal reveal-delay-1"><div className="emoji"><SiteIcon name="puzzle" size={27} /></div><h3>Focused</h3><p>The interface stays centred on the controls needed for Brat-style artwork rather than hiding them inside a large editor.</p></article>
            <article className="glass info-card hover-lift reveal reveal-delay-2"><div className="emoji"><SiteIcon name="lock" size={27} /></div><h3>Browser-Based</h3><p>Generator text and design rendering happen locally in your browser instead of being uploaded by the generator to an application server.</p></article>
          </div>
        </section>

        <section className="section section-tight">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">How the Guides Are Maintained</p>
            <h2>Checked Against the Current Tools</h2>
            <p>The Help guides are reviewed against the controls and export behaviour available on this site. When a tool changes, the related instructions are updated so the page describes what a user can actually do rather than promising a control that is not there.</p>
            <p>Updated dates are changed when the guide itself is revised. They are not refreshed only to make an older article look new.</p>
          </div>
        </section>

        <section className="section">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Independent Status</p>
            <h2>Fan-Made, Not Official</h2>
            <p>Brat Generator is an independent fan-made design tool inspired by the broader visual language associated with Charli XCX&apos;s <em>Brat</em> era. It is not affiliated with, sponsored by, or endorsed by Charli XCX, Atlantic Records, Warner Music or their related brands.</p>
            <p>The site is intended to provide creative tools and educational guidance around the visual style. Users should avoid using generated designs in ways that falsely suggest an official relationship or endorsement; the <Link className="inline-source-link" href="/terms/">Terms &amp; Disclaimer</Link> explains those limits, and the <Link className="inline-source-link" href="/privacy-policy/">Privacy Policy</Link> explains how the site handles browser-based processing and technical data.</p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
