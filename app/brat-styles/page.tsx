import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RelatedPages from '@/components/RelatedPages';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, faqPageSchema, webPageSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Brat Styles: Green, Black, White, Pink & Custom Colours' },
  description: 'Explore Brat styles in green, black, white, pink and custom colours. Learn the Brat green hex, typography, blur settings and export formats.',
  alternates: { canonical: '/brat-styles/' },
  openGraph: {
    url: '/brat-styles/',
    title: 'Brat Styles: Green, Black, White, Pink & Custom Colours',
    description: 'Explore Brat colour styles, the #8ACE00 green preset, condensed typography, blur, and custom colour combinations.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Generator colour styles' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brat Styles: Green, Black, White, Pink & Custom Colours',
    description: 'Explore Brat colour styles, typography, blur and custom colour combinations.',
    images: ['/og-image.png'],
  },
};


const styleFaqs = [
  ['What is the Brat green colour code?', '#8ACE00 is the default digital Brat Green preset used on this site. Screen colour can vary, so treat it as a practical web starting point rather than a guaranteed print match.'],
  ['Can I make black, white or pink Brat-style designs?', 'Yes. The same condensed lowercase layout can be used with black, white, pink, electric blue or a custom colour instead of the classic green.'],
  ['What makes a design look Brat-style?', 'The strongest cues are simple flat colour, condensed lowercase text, tight spacing and a small amount of blur. The treatment matters more than using one exact colour.'],
  ['Can I use my own custom colour?', 'Yes. Open the Brat Generator and use the colour picker or enter a custom hex value, then keep the typography and blur treatment consistent.'],
  ['Which Brat style is easiest to read?', 'High-contrast combinations are easiest to read. Dark text on bright green or white, and white text on black, usually stay clearer at small sizes than low-contrast combinations.'],
] as const;

const styleCards = [
  ['brat', 'Classic Brat Green', 'The most recognisable starting point. Use #8ACE00 with dark text for the familiar acidic lime look.', 'brat-green', '#111', '/#green'],
  ['vibes', 'Brat Generator Black', 'A darker, more understated variation. Black works especially well with white or Brat Green text.', 'brat-black', '#fff', '/#black'],
  ['clean', 'Brat Generator White', 'A cleaner minimalist version that keeps the condensed lowercase treatment while removing the loud green background.', 'brat-white', '#111', '/#white'],
  ['girly', 'Brat Generator Pink', 'A softer, playful variation that keeps the same lowercase typography and blur while changing the mood completely.', 'brat-pink', '#111', '/#pink'],
  ['anomaly', 'Electric Blue', 'A bright alternative for social graphics when you want the Brat layout without copying the original green palette.', 'brat-electric', '#111', '/#blue'],
  ['your text', 'Custom Colours', 'Use the colour picker or a custom hex value to create a familiar Brat-style layout in your own palette.', 'brat-custom', '#fff', '/#custom'],
];


export default function BratStylesPage() {
  const canonical = `${siteConfig.url}/brat-styles/`;
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/` },
    { name: 'Brat Styles', url: canonical },
  ]);

  const pageSchema = webPageSchema({
    type: 'CollectionPage',
    url: canonical,
    name: 'Brat Styles',
    description: metadata.description,
    dateModified: '2026-09-25',
  });

  const faqSchema = faqPageSchema(styleFaqs, canonical);

  return (
    <>
      <JsonLd data={[breadcrumb, pageSchema, faqSchema]} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Brat Styles' }]}
          eyebrow="Brat Styles"
          title="Create Every Brat Style in"
          accent="Green, Black, White, Pink & More"
          description="Explore the most popular Brat colour variations, then keep the same condensed lowercase typography, tight spacing and soft blur while changing the palette to fit your own design."
        />

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
              <p>Start with the classic green, switch to black, white or pink, or build your own colour combination. Select any style below to open the <Link className="inline-source-link" href="/#generator">Brat Generator</Link> and start creating.</p>
            </div>
            <div className="style-grid style-grid-six">
              {styleCards.map(([word, title, body, cls, color, href], i) => (
                <Link className={`style-card reveal reveal-delay-${i % 3}`} href={href} key={title} aria-label={`Open Brat Generator in ${title} style`}>
                  <div className={`style-square ${cls}`}><span className="brat-text style-word" style={{ color }}>{word}</span></div>
                  <h3>{title}</h3><p>{body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container container-medium prose-split">
            <div className="reveal">
              <p className="eyebrow left">Colour Guide</p>
              <h2 className="prose-heading">Brat Green Colour Guide</h2>
              <p>The generator uses <strong>#8ACE00</strong> (RGB 138, 206, 0) as its default Brat Green preset. It is the shade most people are trying to recreate when they search for the Brat green colour code or Brat green hex.</p>
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

        <section className="section section-card" id="use-cases">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Use Cases</p>
              <h2>Where Different Brat Styles Work Best</h2>
              <p>Pick a colour treatment that fits the mood of the graphic, then open that style in the Brat Generator when you are ready to create.</p>
            </div>
            <div className="card-grid three">
              <article className="glass info-card reveal glow-brat hover-lift"><div className="emoji">🟢</div><h3>Classic Green</h3><p>Best when you want the most recognisable Brat-inspired look for text graphics, covers and social posts.</p></article>
              <article className="glass info-card reveal glow-electric hover-lift"><div className="emoji">🖤</div><h3>Black & Dark Edits</h3><p>Works well for darker fan edits, understated graphics and designs where a moodier background fits better.</p></article>
              <article className="glass info-card reveal glow-pink hover-lift"><div className="emoji">🤍</div><h3>White Minimal Style</h3><p>A clean choice for simple layouts, profile graphics and posts where you want the text treatment to feel lighter.</p></article>
              <article className="glass info-card reveal glow-pink hover-lift"><div className="emoji">💗</div><h3>Pink & Playful Posts</h3><p>Use pink when you want the same Brat-inspired layout with a softer, brighter or more playful mood.</p></article>
              <article className="glass info-card reveal glow-electric hover-lift"><div className="emoji">🎨</div><h3>Custom Colours</h3><p>Match playlists, memes, wallpapers, profile pictures and social posts to your own palette instead of using a preset.</p></article>
              <article className="glass info-card reveal glow-brat hover-lift"><div className="emoji">💿</div><h3>Music Artwork</h3><p>Use any style as a starting point for cover concepts, then build a complete square artwork in the album cover workflow.</p></article>
            </div>
            <div className="tool-related-links reveal"><Link className="text-link" href="/blog/how-to-make-a-brat-album-cover-free/">See how to turn a style into a full Brat album cover →</Link></div>
          </div>
        </section>

        <section className="section section-card" id="faq">
          <div className="container container-faq">
            <div className="section-heading reveal">
              <p className="eyebrow">FAQ</p>
              <h2>Brat Styles <span className="text-brat">Questions</span></h2>
              <p>Quick answers about Brat Green, alternate colour styles, readability and custom colour choices.</p>
            </div>
            <div className="accordion-list">
              {styleFaqs.map(([question, answer]) => (
                <details className="glass accordion compact reveal" key={question}>
                  <summary>{question}<span>⌄</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <RelatedPages items={[
          { href: '/#generator', eyebrow: 'Create', title: 'Open the Generator', description: 'Apply any of these colour styles to your own text and download the result.', accent: 'green' },
          { href: '/#how-to', eyebrow: 'Guide', title: 'How to Use the Brat Generator', description: 'Follow the quick homepage workflow for text, blur, sizing and export.', accent: 'blue' },
          { href: '/blog/how-to-make-a-brat-album-cover-free/', eyebrow: 'Article', title: 'Build an Album Cover', description: 'Turn a colour style into a complete Brat-inspired album cover.', accent: 'pink' },
        ]} />

      </main>
      <SiteFooter />
    </>
  );
}
