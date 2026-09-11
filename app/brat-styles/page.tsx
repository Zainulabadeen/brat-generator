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
  title: { absolute: 'Brat Styles & Colours: Green Hex, Black, White & Pink' },
  description: 'Explore Brat styles and colours: Brat green #8ACE00, black, white, pink and custom palettes, plus typography, blur settings and export tips.',
  alternates: { canonical: '/brat-styles/' },
  openGraph: {
    url: '/brat-styles/',
    title: 'Brat Styles & Colours: Green Hex, Black, White & Pink',
    description: 'Explore Brat green #8ACE00, black, white, pink and custom colour styles with condensed typography and blur tips.',
    images: [{ url: '/brat-generator-free-online-tool.png', width: 1200, height: 630, alt: 'Brat Generator colour styles' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brat Styles & Colours: Green Hex, Black, White & Pink',
    description: 'Explore Brat green, black, white, pink and custom colour styles, typography and blur.',
    images: ['/brat-generator-free-online-tool.png'],
  },
};

const styleCards = [
  ['brat', 'Classic Brat Green', 'The most recognisable starting point. Use #8ACE00 with dark text for the familiar acidic lime look.', 'brat-green', '#111'],
  ['vibes', 'Brat Generator Black', 'A darker, more understated variation. Black works especially well with white or Brat Green text.', 'brat-black', '#fff'],
  ['clean', 'Brat Generator White', 'A cleaner minimalist version that keeps the condensed lowercase treatment while removing the loud green background.', 'brat-white', '#111'],
  ['girly', 'Brat Generator Pink', 'A softer, playful variation that keeps the same lowercase typography and blur while changing the mood completely.', 'brat-pink', '#111'],
  ['anomaly', 'Electric Blue', 'A bright alternative for social graphics when you want the Brat layout without copying the original green palette.', 'brat-electric', '#111'],
  ['your text', 'Custom Colours', 'Use the colour picker or a custom hex value to create a familiar Brat-style layout in your own palette.', 'brat-custom', '#fff'],
];

const styleFaqs = [
  ['What is the Brat green hex code?', '#8ACE00 is a widely used digital approximation for the lime-green Brat look and is the default green preset in this generator. Display calibration can make the same hex value look slightly different across screens.'],
  ['Can I make a black or white Brat-style image?', 'Yes. Keep the condensed lowercase typography and light blur, then switch the background and text colours for a black, white or high-contrast variation.'],
  ['Can I make a pink Brat-style design?', 'Yes. Pink changes the mood while the recognisable structure comes from the short lowercase text, tight spacing, flat colour field and controlled blur.'],
  ['What font works best for the Brat style?', 'The original artwork is based on manipulated Arial-style typography. This generator uses an Arial Narrow-style condensed starting point because the treatment, stretching, spacing and blur matter as much as the exact font name.'],
];

export default function BratStylesPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Brat Styles', item: `${siteConfig.url}/brat-styles/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Brat Styles' }]}
          eyebrow="Brat Styles"
          title="Brat Styles & Colours:"
          accent="Green Hex, Black, White, Pink & More"
          description="Explore the most popular Brat colour variations, then keep the same condensed lowercase typography, tight spacing and soft blur while changing the palette to fit your own design."
        />

        <section className="section section-tight">
          <div className="container container-medium article-prose centered-prose reveal">
            <p className="eyebrow">Quick Answer</p>
            <h2>What Is Brat Green and Which Colours Fit the Brat Style?</h2>
            <p>Brat green is the acidic lime colour most associated with the album artwork. For web recreations, <strong>#8ACE00</strong> is a widely used approximation. Black, white, pink and custom colours can also work when you keep the same short lowercase text, condensed typography and soft blur.</p>
          </div>
        </section>

        <section className="section section-tight">
          <div className="container container-wide article-prose centered-prose reveal">
            <p className="eyebrow">Quick Guide</p>
            <h2>Create Every Brat Style</h2>
            <p>Green is the colour most closely associated with the original Brat artwork and Brat Summer, but the aesthetic is not limited to one shade. A <strong>brat generator black</strong> design feels darker and more understated, while a <strong>brat generator white</strong> version looks cleaner and more minimalist. A <strong>brat generator pink</strong> style keeps the familiar lowercase treatment while giving the design a softer, more playful personality.</p>
            <p>If you are searching for a <strong>brat generator different colors</strong> option, use the custom colour controls to enter any hex value. The palette can change while the recognisable Brat layout stays consistent.</p>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Styles</p>
              <h2>Brat Styles <span className="text-brat">You Can Create</span></h2>
              <p>Start with the classic green, switch to black, white or pink, or build your own colour combination.</p>
            </div>
            <div className="style-grid style-grid-six">
              {styleCards.map(([word, title, body, cls, color], i) => (
                <article className={`style-card reveal reveal-delay-${i % 3}`} key={title}>
                  <div className={`style-square ${cls}`}><span className="brat-text style-word" style={{ color }}>{word}</span></div>
                  <h3>{title}</h3><p>{body}</p>
                </article>
              ))}
            </div>
            <div className="section-cta reveal"><Link className="pill-btn primary glow-brat" href="/#generator">Create a Brat Style in the Generator →</Link></div>
          </div>
        </section>

        <section className="section">
          <div className="container container-medium prose-split">
            <div className="reveal">
              <p className="eyebrow left">Colour Guide</p>
              <h2 className="prose-heading">Brat Green Colour Guide: #8ACE00 Web Approximation</h2>
              <p>The generator uses <strong>#8ACE00</strong> (RGB 138, 206, 0) as its default Brat Green preset. It is a widely used digital approximation for the shade people are trying to recreate when they search for the Brat green colour code or Brat green hex.</p>
              <p>Enter #8ACE00 in the colour picker for a consistent digital starting point, then pair it with black or white text depending on the contrast you want.</p>
            </div>
            <div className="colour-fact-card glass reveal reveal-delay-1">
              <span className="colour-swatch" aria-hidden="true" />
              <dl>
                <div><dt>Hex</dt><dd>#8ACE00</dd></div>
                <div><dt>RGB</dt><dd>138, 206, 0</dd></div>
                <div><dt>Use</dt><dd>Default green preset</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-wide article-prose centered-prose reveal">
            <p className="eyebrow">Typography</p>
            <h2>What Makes the Brat Text Style Work?</h2>
            <p>The look is not created by one magic font. Most Brat font generator tools use <strong>Arial Narrow</strong> or an Arial Narrow-style condensed typeface as a starting point. The recognisable effect comes from the treatment: large lowercase typography, fairly tight letter spacing, and a light <strong>Gaussian blur</strong>.</p>
            <p>Keep the blur subtle enough that the letters remain readable. Too much turns the text into a smear; too little makes it look like ordinary bold text on a coloured background.</p>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-wide article-prose centered-prose reveal">
            <p className="eyebrow">Use Cases</p>
            <h2>Where Different Brat Styles Work Best</h2>
            <p>Classic green is the obvious choice when you want the most recognisable Brat reference. Black works well for darker fan edits and understated graphics. White is useful when you want a cleaner minimal layout, while pink gives the same format a softer, playful feel. Custom colours are useful for playlists, memes, wallpapers, profile pictures and social posts where you want the Brat-inspired layout to match your own palette.</p>
            <div className="section-cta"><Link className="text-link" href="/blog/how-to-make-a-brat-album-cover-free/">See how to turn a style into a full Brat album cover →</Link></div>
          </div>
        </section>

        <section className="section" id="brat-colour-faq">
          <div className="container container-faq">
            <div className="section-heading reveal"><p className="eyebrow">FAQ</p><h2>Brat Style &amp; Colour <span className="text-brat">Questions</span></h2><p>Quick answers about Brat green, alternative colours and the typography treatment.</p></div>
            <div className="accordion-list">
              {styleFaqs.map(([q, a]) => <details className="glass accordion compact reveal" key={q}><summary>{q}<span>⌄</span></summary><p>{a}</p></details>)}
            </div>
          </div>
        </section>

        <RelatedPages items={[
          { href: '/#generator', eyebrow: 'Create', title: 'Open the Generator', description: 'Apply any of these colour styles to your own text and download the result.', accent: 'green' },
          { href: '/how-to-use/', eyebrow: 'Guide', title: 'How to Use the Tool', description: 'Follow the full step-by-step workflow for text, blur, sizing and export.', accent: 'blue' },
          { href: '/blog/how-to-make-a-brat-album-cover-free/', eyebrow: 'Article', title: 'Build an Album Cover', description: 'Turn a colour style into a complete Brat-inspired album cover.', accent: 'pink' },
        ]} />

      </main>
      <SiteFooter />
    </>
  );
}
