import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'How to Use Brat Generator: Step-by-Step Guide (2026)' },
  description: 'Learn how to use Brat Generator step by step. Type text, pick Brat green, adjust blur and size, choose a canvas, and download free with no watermark.',
  alternates: { canonical: '/how-to-use/' },
  openGraph: {
    url: '/how-to-use/',
    title: 'How to Use Brat Generator: Step-by-Step Guide (2026)',
    description: 'A beginner-friendly walkthrough for creating and downloading a Brat-style graphic.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'How to use Brat Generator' }],
  },
  twitter: { card: 'summary_large_image', title: 'How to Use Brat Generator', description: 'Step-by-step Brat Generator tutorial.', images: ['/og-image.png'] },
};

const steps = [
  ['Step 1', 'Enter Your Text', 'Click the text field and type the phrase you want to display. Short phrases usually give the cleanest result because the condensed style stays large and readable. The preview updates as you type, so you can see the layout immediately.'],
  ['Step 2', 'Choose a Colour Preset', 'Use Brat Green for the classic lime look or switch to white, black, pink, or electric blue. You can also open the colour pickers for a completely custom background and text combination. The default Brat Green preset uses #8ACE00.'],
  ['Step 3', 'Adjust Text Colour, Blur & Spacing', 'Use the blur slider to soften the letter edges, then adjust text size and letter spacing. Lower blur values keep text crisp; higher values create a rougher soft-focus look. Tight spacing and lowercase text generally feel closer to the familiar Brat treatment.'],
  ['Step 4', 'Set the Canvas Ratio', 'Choose where the graphic will be used before you fine-tune the text. The current tool includes 800×800, 1000×1000, and 1200×1200 square presets, 1080×1920 for Stories, and 1200×630 for banners.'],
  ['Step 5', 'Preview Your Design', 'Check spelling, edge spacing, colour contrast, and blur strength in the live preview. If the text feels crowded, shorten the phrase or reduce the text size. Remember that colours may look different across screens because of display calibration.'],
  ['Step 6', 'Download Your File', 'Choose PNG, JPG, or WebP and click Download. The file is rendered in your browser at the selected pixel dimensions with no watermark. On mobile, the result may appear in your Downloads folder rather than Photos depending on the browser.'],
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
    headline: 'How to Use Brat Generator: Step-by-Step Guide',
    description: metadata.description,
    mainEntityOfPage: `${siteConfig.url}/how-to-use/`,
    image: `${siteConfig.url}/og-image.png`,
    datePublished: '2026-09-07T00:00:00+05:00',
    dateModified: '2026-09-22T00:00:00+05:00',
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
          accent="Step-by-Step Guide"
          description="Type your text, choose a background colour, adjust the blur, size and spacing, pick the canvas ratio, then download your image. The whole Brat Generator workflow runs in your browser with no account and no watermark."
        />

        <section className="section section-tight">
          <div className="container container-medium article-prose reveal">
            <p className="article-meta">Updated 22 September 2026 · Reviewed against the current Brat Generator controls</p>
            <p className="eyebrow">Before You Start</p>
            <h2>What You Need Before You Start</h2>
            <p>Not much: a phone, tablet, laptop, or desktop computer with a modern browser; the text you want to display; and, optionally, a colour or platform size in mind. There is no Brat Generator app to install and no design software required.</p>
            <ul className="check-list">
              <li>A modern browser such as Chrome, Safari, Firefox, or Edge</li>
              <li>A short word, phrase, name, or caption</li>
              <li>An optional target size such as square, Story, portrait, or wide</li>
              <li>No account, plugin, or separate mobile app</li>
            </ul>
            <p>If you want a quick overview before starting, see the <Link href="/features/">Brat Generator features</Link>. For a music-cover workflow, use the dedicated <Link href="/blog/how-to-make-a-brat-album-cover-free/">Brat album cover guide</Link>.</p>
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
            <div className="section-heading reveal"><p className="eyebrow">Example Output</p><h2>What a Finished <span className="text-brat">Brat-Style Design</span> Can Look Like</h2><p>This original example uses the same simple ingredients described above: a flat Brat Green background, condensed lowercase text, and a light soft-focus effect.</p></div>
            <figure className="guide-example glass reveal">
              <Image src="/images/brat-cover-example-green.webp" alt="Example Brat-style green design created with condensed lowercase text and a light blur" width={1200} height={1200} sizes="(max-width: 760px) 88vw, 560px" />
              <figcaption>Example output: #8ACE00 background, dark condensed text, and a restrained blur. Use the live generator above the homepage to create your own wording and colours.</figcaption>
            </figure>
          </div>
        </section>

        <section className="section">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Troubleshooting</p>
            <h2>Common Brat Generator Problems and Quick Fixes</h2>
            <h3>Brat Generator text not fitting</h3>
            <p>Shorten the phrase first, then reduce the text-size slider or choose a wider canvas. One to four words normally fit the condensed style more cleanly than a long sentence.</p>
            <h3>Brat Generator blurry image</h3>
            <p>A small amount of text blur is intentional. If the whole export looks soft, reduce the blur control and download again at one of the built-in pixel sizes instead of enlarging a smaller file afterward.</p>
            <h3>How to download a Brat Generator image</h3>
            <p>Choose PNG, JPG, or WebP, then press Download below the preview. On some phones the file appears in Downloads rather than Photos. If the button does not respond, try a current browser and check whether downloads are being blocked.</p>
            <h3>Colours look different on another screen</h3>
            <p>Brightness, colour profiles, and app compression can change how the same hex value appears. The selected hex code stays the same even when two displays render it slightly differently.</p>
            <p>For a longer checklist, open <Link href="/blog/brat-generator-not-working/">Brat Generator not working: common problems and fixes</Link>.</p>
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
            <p className="source-note reveal">For a Brat Generator design for TikTok or an Instagram Story, start with 1080 × 1920. For a Brat PFP, keep important text away from the edges because many apps crop square profile images into circles. Platform requirements can change, so check the destination platform’s current upload specifications before final release.</p>
          </div>
        </section>

        <section className="section">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Comparison</p><h2>Brat Generator vs <span className="text-brat">Canva and Photoshop</span></h2><p>All three can produce a similar visual direction, but they solve different jobs.</p></div>
            <div className="simple-table glass reveal" role="region" aria-label="Brat Generator vs Canva vs Photoshop" tabIndex={0}>
              <table>
                <thead><tr><th>Point</th><th>This Brat Generator</th><th>Canva</th><th>Photoshop</th></tr></thead>
                <tbody>
                  <tr><td>Brat-style setup</td><td>Ready-made controls</td><td>Manual styling in a general editor</td><td>Manual layers, type and effects</td></tr>
                  <tr><td>Learning curve</td><td>Focused and beginner-friendly</td><td>Broad template workflow</td><td>More advanced editing workflow</td></tr>
                  <tr><td>Best fit</td><td>Fast Brat-style text and cover graphics</td><td>Multi-purpose social and design work</td><td>Detailed compositing and professional editing</td></tr>
                  <tr><td>Editing depth</td><td>Purpose-built controls</td><td>Broader general design tools</td><td>Extensive manual control</td></tr>
                </tbody>
              </table>
            </div>
            <p className="source-note reveal">If your goal is specifically a Brat album cover maker workflow, use the <Link href="/blog/how-to-make-a-brat-album-cover-free/">album-cover guide</Link> for square artwork, platform sizes, and original examples.</p>
            <div className="section-cta reveal"><Link className="text-link" href="/#generator">Create your design in the live Brat Generator →</Link></div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
