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
  title: { absolute: 'Brat Generator Features: Free, No Watermark & No Sign-Up' },
  description: 'See every Brat Generator feature: live preview, Brat green presets, blur controls, social sizes, PNG/JPG/WebP exports, no watermark and no sign-up.',
  alternates: { canonical: '/features/' },
  openGraph: {
    url: '/features/',
    title: 'Brat Generator Features: Free, No Watermark & No Sign-Up',
    description: 'Explore live preview, Brat green presets, blur, social sizes, export formats and the free no-sign-up, no-watermark workflow.',
    images: [{ url: '/brat-generator-free-online-tool.png', width: 1200, height: 630, alt: 'Brat Generator features' }],
  },
  twitter: { card: 'summary_large_image', title: 'Brat Generator Features', description: 'See the live preview, colours, blur, sizes, exports and no-watermark workflow.', images: ['/brat-generator-free-online-tool.png'] },
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
        <PageHero
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Features' }]}
          eyebrow="Features"
          title="Brat Generator Features:"
          accent="Live Preview, Colours & Downloads"
          description="See the controls that make the free Brat Generator quick to use: live preview, Brat green presets, condensed type, adjustable blur, social-ready sizes, and no-watermark downloads."
        />

        <section className="section section-tight">
          <div className="container container-medium article-prose centered-prose reveal">
            <p className="eyebrow">Quick Answer</p>
            <h2>What Features Does a Brat Generator Need?</h2>
            <p>A useful Brat generator should give you a live preview, a Brat green starting preset, condensed lowercase typography, adjustable blur and spacing, practical canvas sizes, and clean image exports. This tool combines those controls in one browser-based workflow with no sign-up and no watermark.</p>
            <p>New to the controls? Follow the <Link className="inline-source-link" href="/how-to-use/">6-step Brat Generator tutorial</Link>, or compare <Link className="inline-source-link" href="/brat-styles/">Brat green, black, white and pink styles</Link> before you start.</p>
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
          <div className="container container-wide article-prose centered-prose reveal">
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
