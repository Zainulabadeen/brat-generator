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
  title: { absolute: 'Brat Generator Not Working? 7 Quick Fixes (2026)' },
  description: 'Brat Generator not working? Try 7 quick fixes for downloads, blank previews, blurry or clipped text, colour differences, mobile and browser issues.',
  alternates: { canonical: '/blog/brat-generator-not-working/' },
  openGraph: {
    type: 'article',
    url: '/blog/brat-generator-not-working/',
    title: 'Brat Generator Not Working? 7 Quick Fixes (2026)',
    description: 'Seven practical fixes for Brat Generator downloads, blank previews, blur, clipping, colour, mobile and browser issues.',
    publishedTime: '2026-09-07T00:00:00Z',
    modifiedTime: '2026-09-11T00:00:00Z',
    images: [{ url: '/brat-generator-free-online-tool.png', width: 1200, height: 630, alt: 'Brat Generator troubleshooting guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brat Generator Not Working? Quick Fixes',
    description: 'Fix common Brat Generator download, blur, text, colour, and mobile issues.',
    images: ['/brat-generator-free-online-tool.png'],
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
  {
    number: '06',
    title: 'Preview Looks Blank or Missing',
    body: 'Make sure the text field is not empty and that the text colour is different from the background. If the iframe or canvas has not appeared yet, scroll the generator into view, wait a moment for the lazy-loaded tool to initialise, then refresh once if needed.',
  },
  {
    number: '07',
    title: 'A Browser Extension or Cache Is Interfering',
    body: 'If the tool behaves differently from a normal browser session, try a private/incognito window or another modern browser. Extensions that alter downloads, scripts, privacy settings, or page content can interfere with browser-based tools. Avoid repeatedly clearing everything unless the simpler checks fail.',
  },
];

const troubleshootingFaqs = [
  ['Why is my Brat Generator preview blank?', 'Check that text has been entered and that the text colour is not the same as the background. If the tool has just scrolled into view, give the lazy-loaded canvas a moment to initialise.'],
  ['Why is the Brat image too blurry?', 'Reduce the blur slider until the word is readable at thumbnail size. The Brat-inspired look needs softness, not so much blur that the letterforms disappear.'],
  ['Why did my Brat image not download?', 'Check the browser download permission and Downloads list first. On mobile, the file may be saved in Files or Downloads rather than directly in Photos.'],
  ['Should I clear my browser cache?', 'Only after simpler checks. First refresh once, try another browser or a private window, and disable an extension that may be blocking scripts or downloads.'],
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
    headline: 'Brat Generator Not Working? 7 Quick Fixes (2026)',
    description: metadata.description,
    url: `${siteConfig.url}/blog/brat-generator-not-working/`,
    mainEntityOfPage: `${siteConfig.url}/blog/brat-generator-not-working/`,
    image: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/brat-generator-free-online-tool.png`,
      width: 1200,
      height: 630,
      caption: 'Brat Generator troubleshooting guide',
    },
    datePublished: '2026-09-07T00:00:00+05:00',
    dateModified: '2026-09-11T00:00:00+05:00',
    author: { '@type': 'Organization', name: 'Brat Generator', url: `${siteConfig.url}/about/` },
    publisher: { '@type': 'Organization', name: 'Brat Generator', url: siteConfig.url },
  };

  return (
    <>
      <JsonLd data={[breadcrumb, article]} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog/' }, { label: 'Common Problems & Quick Fixes' }]}
          eyebrow="Troubleshooting Guide"
          title="Brat Generator Not Working?"
          accent="7 Quick Fixes"
          description="If a download fails, the text looks too blurry, your phrase clips at the edge, colours seem different, or a mobile export is hard to find, use these quick checks before changing your design from scratch."
        />

        <article>
          <section className="section section-tight">
            <div className="container container-medium article-prose reveal">
              <p className="article-meta">Published 7 September 2026 · Updated 11 September 2026</p>
              <p className="article-lead"><strong>Quick answer:</strong> If Brat Generator is not working, first refresh once, confirm the browser allows downloads, reduce blur and text size, check that text and background colours differ, and try another modern browser or private window. Most problems can be fixed without installing anything.</p>
              <p>Use the seven fixes below to match the symptom you actually see instead of changing every setting at once.</p>
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

          <section className="section" id="troubleshooting-faq">
            <div className="container container-faq">
              <div className="section-heading reveal"><p className="eyebrow">FAQ</p><h2>Brat Generator Troubleshooting <span className="text-brat">Questions</span></h2><p>Direct answers for blank previews, blur, downloads and browser conflicts.</p></div>
              <div className="accordion-list">
                {troubleshootingFaqs.map(([q, a]) => <details className="glass accordion compact reveal" key={q}><summary>{q}<span>⌄</span></summary><p>{a}</p></details>)}
              </div>
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
