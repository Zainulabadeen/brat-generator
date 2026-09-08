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
  title: { absolute: 'Brat Generator Not Working? Common Problems & Quick Fixes' },
  description: 'Brat Generator not working? Fix download problems, blurry text, clipped text, colour differences, and mobile download issues with these quick steps.',
  alternates: { canonical: '/blog/brat-generator-not-working/' },
  openGraph: {
    type: 'article',
    url: '/blog/brat-generator-not-working/',
    title: 'Brat Generator Not Working? Common Problems & Quick Fixes',
    description: 'A practical troubleshooting guide for Brat Generator download, blur, text fitting, colour, and mobile issues.',
    publishedTime: '2026-09-07T00:00:00Z',
    modifiedTime: '2026-09-07T00:00:00Z',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Generator troubleshooting guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brat Generator Not Working? Quick Fixes',
    description: 'Fix common Brat Generator download, blur, text, colour, and mobile issues.',
    images: ['/og-image.png'],
  },
};

const fixes = [
  {
    number: '01',
    title: 'Download Not Working',
    body: 'Start by checking whether your browser is allowing downloads from the page. If clicking the download button does nothing, try the same action in another modern browser or temporarily disable an extension that may be blocking file downloads. On mobile, also check the browser\'s Downloads list before assuming the export failed.',
  },
  {
    number: '02',
    title: 'Text Is Blurrier Than Expected',
    body: 'Move the blur slider closer to zero and watch the live preview as you adjust it. A small amount of blur creates the soft Brat-inspired effect, but higher values can make short text look fuzzy and longer phrases difficult to read. Keep the blur light enough that the word still works at thumbnail size.',
  },
  {
    number: '03',
    title: 'Text Clips Near the Edges',
    body: 'Shorten the phrase, reduce the text size, or choose a wider canvas ratio. Condensed text works best with short copy, so one to four words usually gives the cleanest result. If the text still touches the edges, reduce the font size before changing the letter spacing.',
  },
  {
    number: '04',
    title: 'Colours Look Different on Another Screen',
    body: 'The selected hex value does not change, but screens can display the same colour differently because of brightness, colour profiles, calibration, and app compression. Use the displayed hex code as your reference and avoid judging the colour from one device alone when an exact digital value matters.',
  },
  {
    number: '05',
    title: 'Mobile Download Location Is Unclear',
    body: 'Some mobile browsers save exported images to a Downloads folder rather than directly to Photos. Check the browser download list, your Files app, or the device Downloads folder. If the image appears there, you can move or save it to Photos afterward.',
  },
];

export default function TroubleshootingGuidePage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog/` },
      { '@type': 'ListItem', position: 3, name: 'Brat Generator Not Working?', item: `${siteConfig.url}/blog/brat-generator-not-working/` },
    ],
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Brat Generator Not Working? Common Problems & Quick Fixes',
    description: metadata.description,
    url: `${siteConfig.url}/blog/brat-generator-not-working/`,
    mainEntityOfPage: `${siteConfig.url}/blog/brat-generator-not-working/`,
    image: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/og-image.png`,
      width: 1200,
      height: 630,
      caption: 'Brat Generator troubleshooting guide',
    },
    datePublished: '2026-09-07T00:00:00+05:00',
    dateModified: '2026-09-07T00:00:00+05:00',
    author: { '@type': 'Organization', name: 'Brat Generator', url: `${siteConfig.url}/about/` },
    publisher: { '@type': 'Organization', name: 'Brat Generator', url: siteConfig.url },
  };

  return (
    <>
      <JsonLd data={[breadcrumb, article]} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <div className="container container-wide breadcrumb-before-hero">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog/' }, { label: 'Common Problems & Quick Fixes' }]} />
        </div>


        <PageHero
          eyebrow="Troubleshooting Guide"
          title="Brat Generator Not Working?"
          accent="Common Problems & Quick Fixes"
          description="If a download fails, the text looks too blurry, your phrase clips at the edge, colours seem different, or a mobile export is hard to find, use these quick checks before changing your design from scratch."
          primaryHref="/#generator"
          primaryLabel="Open Generator →"
          secondaryHref="/how-to-use/"
          secondaryLabel="Full How-to Guide"
        />

        <article>
          <section className="section section-tight">
            <div className="container container-medium article-prose reveal">
              <p className="article-meta">Published 7 September 2026 · Troubleshooting guide</p>
              <p className="article-lead">Most Brat Generator problems are caused by browser download behaviour, an aggressive blur setting, text that is too long for the selected canvas, or differences between devices. Work through the fixes below in order; you usually will not need to reinstall anything because the generator runs directly in your browser.</p>
            </div>
          </section>

          <section className="section section-card">
            <div className="container container-wide">
              <div className="section-heading reveal">
                <p className="eyebrow">Quick Check</p>
                <h2>Try These <span className="text-electric">First</span></h2>
                <p>Before changing lots of settings, make sure the page is loaded normally and your browser is not blocking downloads.</p>
              </div>
              <div className="stats-grid troubleshooting-checks">
                <div className="glass stat-card reveal"><strong>1</strong><span>Refresh the page once</span></div>
                <div className="glass stat-card reveal reveal-delay-1"><strong>2</strong><span>Check browser download permission</span></div>
                <div className="glass stat-card reveal reveal-delay-2"><strong>3</strong><span>Reduce blur and text size</span></div>
                <div className="glass stat-card reveal reveal-delay-3"><strong>4</strong><span>Try another modern browser</span></div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container container-wide">
              <div className="section-heading reveal">
                <p className="eyebrow">Help</p>
                <h2>Common Problems &amp; <span className="text-electric">Quick Fixes</span></h2>
                <p>Use the matching fix below, then return to the live preview and test the design again.</p>
              </div>
              <div className="guide-step-list">
                {fixes.map((fix, index) => (
                  <article className={`glass guide-step reveal reveal-delay-${index % 3}`} key={fix.number}>
                    <div className="guide-step-no">{fix.number}</div>
                    <div><h3>{fix.title}</h3><p>{fix.body}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-card">
            <div className="container container-medium article-prose reveal">
              <p className="eyebrow">Still Stuck?</p>
              <h2>Reset the Design Before You Start Over</h2>
              <p>If the generator itself loads but the result looks wrong, return to a simple setup first: use a short lowercase phrase, the default Brat Green background, dark text, a moderate text size, and very little blur. Once that version looks correct, add your custom colour, spacing, and stronger effects one setting at a time.</p>
              <p>If the issue is about how a specific control works, the <Link className="inline-source-link" href="/how-to-use/">step-by-step Brat Generator guide</Link> explains the full workflow from text entry through download.</p>
            </div>
          </section>

          <RelatedPages title="Continue Creating" items={[
            { href: '/how-to-use/', eyebrow: 'Tutorial', title: 'How to Use Brat Generator', description: 'See every control in order, from text and colour to canvas size and export.', accent: 'green' },
            { href: '/features/', eyebrow: 'Features', title: 'See Every Generator Feature', description: 'Review preview, colour, blur, spacing, size and download controls.', accent: 'blue' },
            { href: '/brat-styles/', eyebrow: 'Styles', title: 'Explore Brat Styles', description: 'Try green, black, white, pink, blue and custom colour directions.', accent: 'pink' },
          ]} />

        </article>
      </main>
      <SiteFooter />
    </>
  );
}
