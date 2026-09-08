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
  title: { absolute: 'Brat Generator Key Features, Free Tool & How It Works' },
  description: 'Free Brat Generator with real-time preview, Brat green presets, blur effects, social-ready sizes and no-watermark downloads. No sign-up required.',
  alternates: { canonical: '/features/' },
  openGraph: {
    url: '/features/',
    title: 'Brat Generator Key Features, Free Tool & How It Works',
    description: 'Explore the live preview, colours, blur, sizes, formats, privacy, and free no-watermark workflow.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Generator features' }],
  },
  twitter: { card: 'summary_large_image', title: 'Brat Generator Key Features', description: 'See how the free Brat Generator works.', images: ['/og-image.png'] },
};

const featureCards = [
  ['👁️', 'Real-Time Preview', 'Every change shows up instantly. Type a word, move the blur slider, switch colours, resize text, or change spacing and the live preview updates without making you export repeatedly.', 'glow-brat'],
  ['🎨', 'Brat Green, White & Pink Presets', 'The generator includes #8ACE00 as a one-tap Brat Green preset plus white, black, pink, electric blue, and a full colour picker for custom background and text colours.', 'glow-pink'],
  ['🔤', 'Brat-Style Typography', 'The text uses a condensed Arial Narrow-style treatment with lowercase rendering, adjustable size, letter spacing, and a soft Gaussian blur to recreate the familiar rough anti-design feel.', 'glow-electric'],
  ['📐', 'Social Media Size Presets', 'Choose 800×800, 1000×1000, or 1200×1200 square canvases, plus 1080×1920 Story and 1200×630 banner presets. The exported image uses the selected pixel dimensions.', 'glow-brat'],
  ['⬇️', 'No-Watermark Download', 'What you design is what you download. Choose PNG, JPG, or WebP, then export the finished graphic without a logo stamped over the artwork.', 'glow-pink'],
  ['🔓', 'No Sign-Up. Completely Free.', 'There is no account form, email gate, subscription screen, or software installation. Open the tool, create a design, and download it directly in the browser.', 'glow-electric'],
];




export default function FeaturesPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Features', item: `${siteConfig.url}/features/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <div className="container container-wide breadcrumb-before-hero"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Features' }]} /></div>


        <PageHero
          eyebrow="Features"
          title="Brat Generator Key Features: Free Tool &"
          accent="How It Works"
          description="A fast Brat text generator with real-time preview, #8ACE00 colour presets, condensed typography, adjustable blur, social-ready canvas sizes, and clean no-watermark downloads — all in your browser."
          secondaryHref="/how-to-use/"
          secondaryLabel="How to Use It"
        />

        <section className="section section-tight">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Quick Answer</p>
            <h2>What Is a Brat Generator?</h2>
            <p>A Brat generator is a browser-based design tool for creating graphics inspired by the flat colour, condensed lowercase text, and blurred anti-design aesthetic associated with Charli XCX’s <em>Brat</em> era. This one focuses on speed: type, customise, preview, and download without opening a full design editor.</p>
          </div>
        </section>

        <section className="section">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Key Features</p><h2>Key Features of Our <span className="text-brat">Brat Generator</span></h2><p>Everything needed to create a convincing Brat-style graphic without extra software.</p></div>
            <div className="card-grid feature-grid">
              {featureCards.map(([icon, title, body, glow], i) => (
                <div className={`reveal reveal-delay-${i % 3}`} key={title}><article className={`glass info-card ${glow} hover-lift`}><div className="emoji">{icon}</div><h3>{title}</h3><p>{body}</p></article></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Comparison</p><h2>Brat Generator vs <span className="text-pink">Other Tools</span></h2><p>Canva and Photoshop are broader editors. A dedicated Brat generator removes setup when you only need this one aesthetic.</p></div>
            <div className="simple-table glass reveal" role="region" aria-label="Brat Generator tool comparison" tabIndex={0}>
              <table>
                <thead><tr><th>Tool</th><th>Best for</th></tr></thead>
                <tbody>
                  <tr><td>This Brat Generator</td><td>Fast, purpose-built Brat-inspired designs</td></tr>
                  <tr><td>Canva</td><td>General-purpose templates and design work</td></tr>
                  <tr><td>Photoshop</td><td>Advanced manual editing and compositing</td></tr>
                  <tr><td>Meme generators</td><td>Basic caption-style memes</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Trust</p><h2>Limitations to Know</h2>
            <p>This tool is intentionally specialised. It is not a replacement for Photoshop if you need layered photo editing, advanced compositing, or precise professional print workflows. Colours may also look slightly different across screens because display calibration varies.</p>
            <p>The typography is an approximation of the visual treatment associated with the Brat artwork, not an official downloadable font supplied by the artist or label.</p>
          </div>
        </section>

        <RelatedPages items={[
          { href: '/how-to-use/', eyebrow: 'Guide', title: 'How to Use Brat Generator', description: 'Follow the full workflow from text entry to export.', accent: 'green' },
          { href: '/brat-styles/', eyebrow: 'Styles', title: 'Explore Brat Styles', description: 'Compare green, black, white, pink and custom colour variations.', accent: 'pink' },
          { href: '/blog/how-to-make-a-brat-album-cover-free/', eyebrow: 'Article', title: 'Make a Brat Album Cover', description: 'Turn the generator controls into a complete album-cover workflow.', accent: 'blue' },
        ]} />

      </main>
      <SiteFooter />
    </>
  );
}
