import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import BratGenerator from '@/components/BratGenerator';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RelatedPages from '@/components/RelatedPages';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'How to Make a Brat Album Cover Free | Brat Generator' },
  description: 'Learn how to make a Brat album cover in four simple steps using the right colour, font, blur, and image size. Create yours free with no sign-up or watermark.',
  alternates: { canonical: '/blog/how-to-make-a-brat-album-cover-free/' },
  openGraph: {
    type: 'article',
    url: '/blog/how-to-make-a-brat-album-cover-free/',
    title: 'How to Make a Brat Album Cover Free | Brat Generator',
    description: 'A practical four-step guide to making a Brat-inspired album cover free in your browser.',
    publishedTime: '2026-07-18T00:00:00Z',
    modifiedTime: '2026-09-07T00:00:00Z',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'How to make a Brat album cover' }],
  },
  twitter: { card: 'summary_large_image', title: 'How to Make a Brat Album Cover Free', description: 'Colour, font treatment, blur, sizes, and a four-step browser workflow.', images: ['/og-image.png'] },
};

const coverSteps = [
  ['01', 'Enter Your Cover Text', 'Pick something short: one word, a brief phrase, an artist name, or a playlist title. Short text stays readable when it is condensed and blurred. Use existing Brat-era track titles only as style references rather than copying someone else’s artwork.'],
  ['02', 'Choose the Background Colour', 'Start with the lime-green preset if you want the classic Brat-inspired look. The generator uses #8ACE00 as a common digital approximation, but you can also choose pink, white, black, blue, or any custom colour.'],
  ['03', 'Adjust Font, Size & Blur', 'Centre the text, tighten the spacing, scale it until the word fills the canvas comfortably, then add blur gradually. The goal is slightly imperfect rather than unreadable. Check the design at a smaller size before exporting.'],
  ['04', 'Preview & Download the Cover', 'Choose the target canvas ratio and preview the result. PNG is the safest default for crisp digital artwork; JPG creates smaller files and WebP is efficient for websites. Download only after the text remains readable at thumbnail size.'],
];

export default function AlbumCoverGuidePage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Album Cover Guide', item: `${siteConfig.url}/blog/how-to-make-a-brat-album-cover-free/` },
    ],
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Make a Brat Album Cover: Free, No-Sign-Up Method',
    description: metadata.description,
    url: `${siteConfig.url}/blog/how-to-make-a-brat-album-cover-free/`,
    mainEntityOfPage: `${siteConfig.url}/blog/how-to-make-a-brat-album-cover-free/`,
    image: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/og-image.png`,
      width: 1200,
      height: 630,
      caption: 'Brat Generator album cover guide preview',
    },
    datePublished: '2026-07-18T00:00:00+05:00',
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
        <PageHero
          eyebrow="Album Cover Guide"
          title="How to Make a Brat Album Cover:"
          accent="Free, No-Sign-Up Method"
          description="A green background, condensed lowercase type, and a controlled blur are the core ingredients. This guide shows how to make a Brat album cover step by step, choose the right size, and export it free in your browser."
          secondaryHref="/how-to-use/"
          secondaryLabel="Full Generator Tutorial"
        />

        <div className="container container-wide"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Album Cover Guide' }]} /></div>

        <article>
          <section className="section section-tight">
            <div className="container container-medium article-prose reveal">
              <p className="article-meta">Published 18 July 2026 · Updated 7 September 2026</p>
              <p className="article-lead">The Brat-inspired album-cover look is easier to recreate than it first appears. Use a flat lime background, short lowercase text, a narrow typeface, tight spacing, and enough blur to feel intentionally rough without losing legibility.</p>
              <p>This guide explains how to make a Brat album cover with a free browser-based generator, including colour values, typography, blur, recommended dimensions, and platform considerations. No account or design software is required, and the export has no watermark.</p>
            </div>
          </section>

          <section className="section section-card">
            <div className="container container-wide">
              <div className="section-heading reveal"><p className="eyebrow">Create Alongside the Guide</p><h2>Free Brat Album <span className="text-brat">Cover Maker</span></h2><p>Use the live generator below while you follow the four steps.</p></div>
              <BratGenerator />
            </div>
          </section>

          <section className="section">
            <div className="container container-medium article-prose reveal">
              <p className="eyebrow">Background</p>
              <h2>What Is the Brat Album Cover Look?</h2>
              <p>Charli XCX released <em>Brat</em> in June 2024, and the cover quickly became shorthand for a wider “Brat Summer” moment. Its cultural reach grew far beyond the artwork itself: <a className="inline-source-link" href="https://blog.collinsdictionary.com/language-lovers/a-year-when-hedonism-and-anxiety-combine/" target="_blank" rel="noopener noreferrer">Collins Dictionary later named “brat” its 2024 Word of the Year</a>, and the <a className="inline-source-link" href="https://www.brits.co.uk/news/2025/brat-wins-mastercard-album/" target="_blank" rel="noopener noreferrer">BRIT Awards recognised <em>BRAT</em> as Album of the Year in 2025</a>. The cover stood apart from glossy pop design because it felt deliberately unfinished: a flat green field, lowercase text, soft edges, and almost no decorative detail.</p>
              <p>The aesthetic is a form of anti-design. It avoids gradients, polished shadows, and ornamental effects. Most of the visual impact comes from three things working together: flat colour, condensed lowercase typography, and a controlled low-resolution blur.</p>
            </div>
          </section>

          <section className="section section-card">
            <div className="container container-wide facts-grid">
              <div className="article-prose reveal">
                <p className="eyebrow left">Colour</p>
                <h2>The Brat Green Colour</h2>
                <p>The green is doing much of the visual work. It is brighter and flatter than a typical brand green, closer to a highlighter than a forest tone. For web use, <strong>#8ACE00</strong> is a common digital approximation and is the default preset in this generator.</p>
                <p>Different screens can display the same hex value differently, so treat the code as a consistent digital starting point rather than a guarantee that every monitor or printed surface will look identical.</p>
              </div>
              <div className="simple-table glass reveal reveal-delay-1" role="region" aria-label="Brat green colour values" tabIndex={0}>
                <table>
                  <thead><tr><th>Colour detail</th><th>Recommended value</th></tr></thead>
                  <tbody>
                    <tr><td>Digital preset</td><td>#8ACE00</td></tr>
                    <tr><td>RGB</td><td>138, 206, 0</td></tr>
                    <tr><td>Generator default</td><td>Brat Green</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container container-medium article-prose reveal">
              <p className="eyebrow">Typography</p>
              <h2>The Font and Typography</h2>
              <p>Ask what font is used on the Brat album cover and you will often see Arial or Arial Narrow mentioned as practical references. The important part is not only the font family: the text is condensed, stretched, lowercased, enlarged, and softened so it feels less polished than normal digital typography.</p>
              <p>This generator uses an Arial Narrow-style starting point with adjustable text size and letter spacing. Keep the phrase short and the spacing tight, then use blur to move from ordinary type toward the rougher Brat-inspired treatment.</p>
            </div>
          </section>

          <section className="section section-card">
            <div className="container container-medium article-prose reveal">
              <p className="eyebrow">Effect</p>
              <h2>The Blur and Low-Resolution Effect</h2>
              <p>Blur is where many recreations go too far. Too much makes the words dissolve; too little makes the text look like clean modern typography on a green box. A light Gaussian blur works better because it softens the edge while keeping the letterforms readable.</p>
              <p>Check the result at thumbnail size. If you cannot read it when the cover is small, reduce the blur or increase contrast. The goal is a deliberate imperfection, not a green smear.</p>
            </div>
          </section>

          <section className="section">
            <div className="container container-wide">
              <div className="section-heading reveal"><p className="eyebrow">Four Steps</p><h2>How to Make a Brat Album Cover in <span className="text-brat">4 Steps</span></h2><p>From blank canvas to finished cover in a few minutes.</p></div>
              <div className="guide-step-list">
                {coverSteps.map(([n,t,b],i)=><article className={`glass guide-step reveal reveal-delay-${i % 3}`} key={n}><div className="guide-step-no">{n}</div><div><h3>{t}</h3><p>{b}</p></div></article>)}
              </div>
              <div className="section-cta reveal"><Link className="text-link" href="/#generator">Open the Brat Album Cover Generator →</Link></div>
            </div>
          </section>

          <section className="section section-card">
            <div className="container container-wide">
              <div className="section-heading reveal"><p className="eyebrow">Dimensions</p><h2>Brat Album Cover Sizes for <span className="text-pink">Every Platform</span></h2><p>Use a high-resolution square for music artwork, then make separate vertical or wide versions for social platforms when needed.</p></div>
              <div className="simple-table glass reveal" role="region" aria-label="Brat album cover size guide" tabIndex={0}>
                <table>
                  <thead><tr><th>Platform or use</th><th>Recommended starting size</th><th>Aspect ratio</th></tr></thead>
                  <tbody>
                    <tr><td>Spotify album / playlist cover</td><td>1200 × 1200 px or larger</td><td>1:1</td></tr>
                    <tr><td>Apple Music artwork</td><td>High-resolution square; check current platform specs</td><td>1:1</td></tr>
                    <tr><td>Bandcamp / SoundCloud artwork</td><td>High-resolution square; check current platform specs</td><td>1:1</td></tr>
                    <tr><td>Instagram feed square</td><td>1080 × 1080 px</td><td>1:1</td></tr>
                    <tr><td>Instagram Story / TikTok</td><td>1080 × 1920 px</td><td>9:16</td></tr>
                    <tr><td>YouTube thumbnail</td><td>1280 × 720 px</td><td>16:9</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="source-note reveal">Upload specifications can change. Always confirm the current requirements of the music or social platform before publishing final artwork.</p>
            </div>
          </section>

          <section className="section">
            <div className="container container-medium article-prose reveal">
              <h2>Spotify, Apple Music, Bandcamp and SoundCloud</h2>
              <p>Square artwork remains the safest starting point for music platforms because cover art is commonly displayed in square grids and thumbnails. Keep important text away from the edges so minor resizing or cropping does not cut it off.</p>
              <p>If you are making one master version first, create a high-resolution square. It is easier to make a separate vertical social version from a square design than to rebuild a tall Story graphic into a clean album cover.</p>
              <h2>Instagram, TikTok and Social Media</h2>
              <p>Use a vertical 9:16 version for Stories and TikTok rather than stretching a square image. A separate 4:5 portrait version can suit feed posts, while 16:9 is useful for wide thumbnails and banners.</p>
            </div>
          </section>

          <section className="section section-card">
            <div className="container container-wide">
              <div className="section-heading reveal"><p className="eyebrow">Comparison</p><h2>Brat Album Cover Generator vs <span className="text-brat">Canva vs Photoshop</span></h2><p>These tools solve different jobs. A specialist generator wins on speed; general editors win when the project becomes more complex.</p></div>
              <div className="simple-table glass reveal" role="region" aria-label="Album cover generator comparison" tabIndex={0}>
                <table>
                  <thead><tr><th>Feature</th><th>Brat Generator</th><th>Canva</th><th>Photoshop</th></tr></thead>
                  <tbody>
                    <tr><td>Best for</td><td>Fast Brat-style covers</td><td>Template-based design</td><td>Advanced editing</td></tr>
                    <tr><td>Learning curve</td><td>Very low</td><td>Low</td><td>High</td></tr>
                    <tr><td>Sign-up</td><td>Not required</td><td>Usually required</td><td>Account/subscription</td></tr>
                    <tr><td>Manual font setup</td><td>Minimal</td><td>Usually</td><td>Yes</td></tr>
                    <tr><td>Manual blur setup</td><td>Dedicated slider</td><td>Manual workaround</td><td>Manual filter/effect</td></tr>
                    <tr><td>Advanced editing</td><td>Focused controls</td><td>Moderate</td><td>Extensive</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <RelatedPages items={[
            { href: '/#generator', eyebrow: 'Create', title: 'Open the Generator', description: 'Jump straight into the live tool and create your own cover.', accent: 'green' },
            { href: '/how-to-use/', eyebrow: 'Tutorial', title: 'Full Generator Tutorial', description: 'See every control and troubleshooting step in one guide.', accent: 'blue' },
            { href: '/brat-styles/', eyebrow: 'Styles', title: 'Explore Brat Styles', description: 'Compare green, black, white, pink and custom colour directions.', accent: 'pink' },
          ]} />

          <section className="cta-section"><div className="cta-box reveal"><span className="cta-orb pink"/><span className="cta-orb blue"/><h2>Make Your Own <span className="brat-text cta-brat">brat</span> Album Cover</h2><p>Customise the text, background, spacing, blur, size, and export format — all in your browser.</p><Link className="cta-button" href="/#generator">Create Your Brat Cover →</Link></div></section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
