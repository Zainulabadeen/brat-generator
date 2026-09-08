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

const problems = [
  ['Why is my text not fitting?', 'Shorten the phrase, reduce the text-size slider, or choose a wider canvas. Long sentences rarely work as well as one to four short words in this condensed style.'],
  ['Why does my export look blurry?', 'A little text blur is intentional. If the whole image looks soft, try lowering the blur, exporting again, and avoid resizing a smaller downloaded image upward afterward.'],
  ['Why do the colours look different?', 'Screen brightness, colour profiles, and social-app compression can make the same hex value look different. The numeric colour value does not change.'],
  ['Why can’t I find the download?', 'Check the browser download list or your device Downloads folder. If clicking does nothing, confirm that the browser allows file downloads from the site.'],
  ['Why is Brat Generator not working?', 'Refresh the tab, update your browser, temporarily disable an extension that may be interfering, or try the tool in another modern browser.'],
];

const faqs = [
  ['Does Brat Generator work on mobile?', 'Yes. It runs directly in modern mobile browsers, so there is no separate app to install. The controls and preview adapt to smaller screens.'],
  ['Can I make a Brat album cover with my own text?', 'Yes. Replace the default text with your own name, phrase, lyric fragment, or caption and use a square canvas for a cover-style result.'],
  ['Why does my design not look like the original album?', 'The look depends on several things working together: the lime colour, condensed lowercase typography, tight spacing, and a light blur. Adjusting only the font is usually not enough.'],
  ['Can I download without a watermark?', 'Yes. The current generator exports the design without adding a watermark.'],
  ['Is Brat Generator affiliated with Charli XCX?', 'No. It is an independent fan-made design tool inspired by the visual style associated with the Brat album.'],
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
        <div className="container container-wide breadcrumb-before-hero"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'How to Use Brat Generator' }]} /></div>


        <PageHero
          eyebrow="Guide"
          title="How to Use Brat Generator:"
          accent="Step-by-Step Guide"
          description="Type your text, choose a background colour, adjust the blur, size and spacing, pick the canvas ratio, then download your image. The whole Brat Generator workflow runs in your browser with no account and no watermark."
          secondaryHref="/features/"
          secondaryLabel="See All Features"
        />

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

        <section className="section section-card">
          <div className="container container-narrow">
            <div className="glass tool-promo-card reveal">
              <div><p className="eyebrow left">Practice While You Read</p><h2>Follow the guide, then <span className="text-brat">open the live tool</span></h2><p>The generator stays on the homepage so this guide remains focused and easy to scan.</p></div>
              <Link className="pill-btn primary glow-brat" href="/#generator">Open Generator →</Link>
            </div>
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

        <section className="section">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Comparison</p><h2>Brat Generator vs <span className="text-brat">Canva vs Photoshop</span></h2><p>Choose the tool that matches the job rather than assuming one editor is best for everything.</p></div>
            <div className="simple-table glass reveal" role="region" aria-label="Brat Generator Canva Photoshop comparison" tabIndex={0}>
              <table>
                <thead><tr><th>Feature</th><th>Brat Generator</th><th>Canva</th><th>Photoshop</th></tr></thead>
                <tbody>
                  <tr><td>Ready-made Brat styling</td><td>Yes</td><td>Manual setup</td><td>Manual setup</td></tr>
                  <tr><td>Beginner-friendly for this style</td><td>Very easy</td><td>Easy</td><td>Advanced</td></tr>
                  <tr><td>Sign-up needed</td><td>No</td><td>Usually</td><td>Account/subscription</td></tr>
                  <tr><td>Detailed editing</td><td>Focused controls</td><td>Moderate</td><td>Extensive</td></tr>
                </tbody>
              </table>
            </div>
            <p className="article-lead reveal">Canva and Photoshop can recreate the Brat look, but a dedicated generator is faster when all you need is a short Brat-style graphic. Photoshop remains better when you need layered editing, masking, compositing, or other advanced work.</p>
          </div>
        </section>

        <section className="section section-card" id="troubleshooting">
          <div className="container container-faq">
            <div className="section-heading reveal"><p className="eyebrow">Troubleshooting</p><h2>Common Brat Generator <span className="text-electric">Problems</span></h2><p>These fixes cover the most common “not working,” text-fitting, blur, colour, and download issues.</p></div>
            <div className="accordion-list">{problems.map(([q,a])=><details className="glass accordion reveal" key={q}><summary>{q}<span>⌄</span></summary><p>{a}</p></details>)}</div>
          </div>
        </section>

        <section className="section">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Ideas</p><h2>Creative Ways to Use Your Brat Design</h2>
            <p>Once you have a design you like, use it for TikTok caption cards, Brat meme-style jokes, personal playlist artwork, mood boards, Spotify playlist covers, Instagram Highlights, profile pictures, or a quick visual refresh for a social account.</p>
            <p>If you are uploading artwork to a commercial platform or using it in a business context, check that platform’s artwork rules and the rights associated with any names, logos, or protected material you include.</p>
            <div className="section-cta"><Link className="text-link" href="/blog/how-to-make-a-brat-album-cover-free/">Read the Brat album cover guide →</Link></div>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Safety & Legal</p><h2>Is It Safe and Legal to Use?</h2>
            <p>The current generator processes your text and canvas locally in the browser. No account is required, and the tool does not upload your design to a server as part of the generation workflow.</p>
            <p>Legally, personal fan use is different from using an artist’s name, album identity, or protected artwork in commercial products. Brat Generator is not affiliated with Charli XCX or her label. If you plan to sell merchandise, run paid advertising, or closely reproduce protected branding, consider the applicable laws and get qualified advice when needed.</p>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container container-faq">
            <div className="section-heading reveal"><p className="eyebrow">FAQ</p><h2>How to Use Brat Generator <span className="text-brat">FAQs</span></h2></div>
            <div className="accordion-list">{faqs.map(([q,a])=><details className="glass accordion compact reveal" key={q}><summary>{q}<span>⌄</span></summary><p>{a}</p></details>)}</div>
          </div>
        </section>

        <RelatedPages items={[
          { href: '/features/', eyebrow: 'Features', title: 'See Every Generator Feature', description: 'Understand the controls, presets, formats and browser workflow.', accent: 'green' },
          { href: '/brat-styles/', eyebrow: 'Styles', title: 'Choose a Brat Style', description: 'Pick green, black, white, pink or a custom colour direction.', accent: 'pink' },
          { href: '/blog/how-to-make-a-brat-album-cover-free/', eyebrow: 'Guide', title: 'Make a Brat Album Cover', description: 'Use the same controls to build a complete cover for social or music artwork.', accent: 'blue' },
        ]} />

        <section className="cta-section"><div className="cta-box reveal"><span className="cta-orb pink"/><span className="cta-orb blue"/><h2>Create and Download Your <span className="brat-text cta-brat">brat</span> Design</h2><p>Choose your text, colour, blur, size, and file format — then download with no watermark.</p><Link className="cta-button" href="/#generator">Start Creating →</Link></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
