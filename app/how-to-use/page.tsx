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
  title: { absolute: 'How to Use Brat Generator: 6 Easy Steps (2026)' },
  description: 'Learn how to use Brat Generator in 6 easy steps: type text, choose Brat green, adjust blur and size, pick a canvas, then download with no watermark.',
  alternates: { canonical: '/how-to-use/' },
  openGraph: {
    url: '/how-to-use/',
    title: 'How to Use Brat Generator: 6 Easy Steps (2026)',
    description: 'A beginner-friendly walkthrough for creating and downloading a Brat-style graphic.',
    images: [{ url: '/brat-generator-free-online-tool.png', width: 1200, height: 630, alt: 'How to use Brat Generator' }],
  },
  twitter: { card: 'summary_large_image', title: 'How to Use Brat Generator', description: 'Step-by-step Brat Generator tutorial.', images: ['/brat-generator-free-online-tool.png'] },
};

const steps = [
  ['Step 1', 'Enter Your Text', 'Click the text field and type the phrase you want to display. Short phrases usually give the cleanest result because the condensed style stays large and readable. The preview updates as you type, so you can see the layout immediately.'],
  ['Step 2', 'Choose a Colour Preset', 'Use Brat Green for the classic lime look or switch to white, black, pink, or electric blue. You can also open the colour pickers for a completely custom background and text combination. The default Brat Green preset uses #8ACE00.'],
  ['Step 3', 'Adjust Text Colour, Blur & Spacing', 'Use the blur slider to soften the letter edges, then adjust text size and letter spacing. Lower blur values keep text crisp; higher values create a rougher soft-focus look. Tight spacing and lowercase text generally feel closer to the familiar Brat treatment.'],
  ['Step 4', 'Set the Canvas Ratio', 'Choose where the graphic will be used before you fine-tune the text. The current tool includes 800×800, 1000×1000, and 1200×1200 square presets, 1080×1920 for Stories, and 1200×630 for banners.'],
  ['Step 5', 'Preview Your Design', 'Check spelling, edge spacing, colour contrast, and blur strength in the live preview. If the text feels crowded, shorten the phrase or reduce the text size. Remember that colours may look different across screens because of display calibration.'],
  ['Step 6', 'Download Your File', 'Choose PNG, JPG, or WebP and click Download. The file is rendered in your browser at the selected pixel dimensions with no watermark. On mobile, the result may appear in your Downloads folder rather than Photos depending on the browser.'],
];

const howToFaqs = [
  ['How do I use Brat Generator?', 'Type a short phrase, choose a background and text colour, adjust blur, size and spacing, select the canvas ratio, preview the result, then download the file in your preferred format.'],
  ['What size should I choose for a Brat image?', 'Use a square preset for covers and profile graphics, 1080×1920 for Stories or TikTok-style vertical posts, and 1200×630 for wide social previews or banners.'],
  ['Should I download PNG, JPG or WebP?', 'PNG is the safest choice for sharp text and general sharing. JPG can be smaller for simple opaque artwork, while WebP is efficient for modern websites and browsers.'],
  ['Does Brat Generator work on mobile?', 'Yes. The interface is responsive in modern mobile browsers. Depending on your phone and browser, downloaded files may appear in Downloads or Files before you move them into Photos.'],
];

export default function HowToUsePage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'How to Use Brat Generator', item: `${siteConfig.url}/how-to-use/` },
    ],
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Use Brat Generator: 6 Easy Steps (2026)',
    description: metadata.description,
    mainEntityOfPage: `${siteConfig.url}/how-to-use/`,
    image: `${siteConfig.url}/brat-generator-free-online-tool.png`,
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
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'How to Use' }]}
          eyebrow="Guide"
          title="How to Use Brat Generator:"
          accent="6 Easy Steps"
          description="Type your text, choose a background colour, adjust the blur, size and spacing, pick the canvas ratio, then download your image. The whole Brat Generator workflow runs in your browser with no account and no watermark."
        />

        <section className="section section-tight">
          <div className="container container-medium article-prose centered-prose reveal">
            <p className="eyebrow">Quick Answer</p>
            <h2>How Do You Use Brat Generator?</h2>
            <p>Type your text, choose Brat green or another colour, adjust the text size, letter spacing and blur, select a square, vertical or wide canvas, preview the result, then download it as PNG, JPG or WebP. No account or separate app is required.</p>
          </div>
        </section>

        <section className="section section-tight">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Before You Start</p>
            <h2>What You Need Before You Start</h2>
            <p>Not much: a phone, tablet, laptop, or desktop computer with a modern browser; the text you want to display; and, optionally, a colour or platform size in mind. There is no Brat Generator app to install and no design software required.</p>
            <ul className="check-list">
              <li>A modern browser such as Chrome, Safari, Firefox, or Edge</li>
              <li>A short word, phrase, name, or caption</li>
              <li>An optional target size such as square, Story, portrait, or wide</li>
              <li>No account, plugin, or separate mobile app</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Step by Step</p><h2>How to Use Brat Generator <span className="text-brat">From Start to Download</span></h2><p>Follow these six steps from a blank text field to a finished Brat-style image.</p></div>
            <div className="guide-step-list">
              {steps.map(([k, title, body], i) => (
                <article className={`glass guide-step reveal reveal-delay-${i % 3}`} key={k}>
                  <div className="guide-step-no">{String(i + 1).padStart(2, '0')}</div>
                  <div><p className="guide-kicker">{k}</p><h3>{title}</h3><p>{body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Sizing</p><h2>Best Sizes for <span className="text-pink">Each Platform</span></h2><p>Match the canvas ratio to the destination before fine-tuning the text so the final crop stays predictable.</p></div>
            <div className="simple-table glass reveal" role="region" aria-label="Recommended Brat Generator sizes" tabIndex={0}>
              <table>
                <thead><tr><th>Platform or use</th><th>Recommended size</th><th>Ratio</th></tr></thead>
                <tbody>
                  <tr><td>TikTok / Instagram Story</td><td>1080 × 1920 px</td><td>9:16</td></tr>
                  <tr><td>Square post / playlist cover</td><td>1000 × 1000 or 1200 × 1200 px</td><td>1:1</td></tr>
                  <tr><td>Wide banner / social preview</td><td>1200 × 630 px</td><td>~1.91:1</td></tr>
                </tbody>
              </table>
            </div>
            <p className="source-note reveal">Platform requirements can change. If you are preparing artwork for a specific publishing platform, check that platform’s current upload specifications before final release.</p>
          </div>
        </section>

        <section className="section" id="troubleshooting">
          <div className="container container-medium article-prose centered-prose reveal">
            <p className="eyebrow">Troubleshooting</p>
            <h2>If the Brat Generator Does Not Look or Download Correctly</h2>
            <p>Start with a short phrase, reset blur close to zero, confirm the text and background colours are different, and check your browser&apos;s Downloads list. If the issue continues, use the <Link className="inline-source-link" href="/blog/brat-generator-not-working/">Brat Generator troubleshooting guide</Link> for the matching fix.</p>
          </div>
        </section>

        <section className="section section-card" id="how-to-faq">
          <div className="container container-faq">
            <div className="section-heading reveal"><p className="eyebrow">FAQ</p><h2>Brat Generator Tutorial <span className="text-brat">Questions</span></h2><p>Short answers to common questions people ask while creating their first design.</p></div>
            <div className="accordion-list">
              {howToFaqs.map(([q, a]) => <details className="glass accordion compact reveal" key={q}><summary>{q}<span>⌄</span></summary><p>{a}</p></details>)}
            </div>
          </div>
        </section>

        <RelatedPages items={[
          { href: '/features/', eyebrow: 'Features', title: 'See Every Generator Feature', description: 'Understand the controls, presets, formats and browser workflow.', accent: 'green' },
          { href: '/brat-styles/', eyebrow: 'Styles', title: 'Choose a Brat Style', description: 'Pick green, black, white, pink or a custom colour direction.', accent: 'pink' },
          { href: '/blog/how-to-make-a-brat-album-cover-free/', eyebrow: 'Guide', title: 'Make a Brat Album Cover', description: 'Use the same controls to build a complete cover for social or music artwork.', accent: 'blue' },
        ]} />

      </main>
      <SiteFooter />
    </>
  );
}
