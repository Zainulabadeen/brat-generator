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

const steps = [
  ['01', 'Enter Your Text', 'Type one word, a short phrase, a caption, or a name. Shorter text tends to produce the cleanest Brat-style layout.'],
  ['02', 'Choose Colours', 'Use the green preset or choose your own background and text colours with the colour pickers.'],
  ['03', 'Adjust Font & Blur', 'Fine-tune text size, letter spacing, and blur until the design looks balanced and readable.'],
  ['04', 'Download Your File', 'Pick the canvas ratio and PNG, JPG, or WebP, then download the final design with no watermark.'],
];

const problems = [
  ['Text looks blurry when I do not want it to', 'The blur slider is probably too high. Move it closer to zero for sharper edges.'],
  ['Colours look different than expected', 'Different displays can make the same hex value appear warmer or cooler. The digital colour value itself stays unchanged.'],
  ['Image will not download', 'Check browser download permissions, refresh the page, or try another modern browser if an extension is interfering.'],
  ['It looks different on mobile and desktop', 'The page layout changes responsively, but the exported image uses the pixel dimensions shown in the selected canvas preset.'],
];

const faqs = [
  ['What image format does Brat Generator download?', 'This version supports PNG, JPG, and WebP. PNG is a strong default for crisp social graphics, while JPG and WebP can produce smaller files.'],
  ['Can I use Brat Generator for social media?', 'Yes. The built-in canvas presets are useful for TikTok, Instagram Stories and feeds, playlist covers, profile images, banners, and other digital graphics.'],
  ['What is the Brat green hex code?', '#8ACE00 is the default digital Brat Green preset used by this generator. It is a widely used web approximation of the album’s acidic lime-green look.'],
  ['Can I use my images commercially?', 'Personal creative use and commercial use are not the same legally. If you are selling products or advertising with protected names, logos, or artwork, check the relevant rights and seek legal advice if needed.'],
  ['Is there a character limit?', 'The current text field is designed for short words and phrases rather than long paragraphs. Short copy usually produces the cleanest Brat-style result.'],
  ['Are my designs stored anywhere?', 'The current generator renders the canvas and file locally in your browser and does not upload the design to a server.'],
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
          eyebrow="Features"
          title="Brat Generator Key Features: Free Tool &"
          accent="How It Works"
          description="A fast Brat text generator with real-time preview, #8ACE00 colour presets, condensed typography, adjustable blur, social-ready canvas sizes, and clean no-watermark downloads — all in your browser."
          secondaryHref="/how-to-use/"
          secondaryLabel="How to Use It"
        />

        <div className="container container-wide"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Features' }]} /></div>

        <section className="section section-tight">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Quick Answer</p>
            <h2>What Is a Brat Generator?</h2>
            <p>A Brat generator is a browser-based design tool for creating graphics inspired by the flat colour, condensed lowercase text, and blurred anti-design aesthetic associated with Charli XCX’s <em>Brat</em> era. This one focuses on speed: type, customise, preview, and download without opening a full design editor.</p>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-narrow">
            <div className="glass tool-promo-card reveal">
              <div><p className="eyebrow left">Try It</p><h2>Ready to use the <span className="text-brat">Brat Generator?</span></h2><p>The feature list below matches the working generator on the homepage. Open it when you are ready to create.</p></div>
              <Link className="pill-btn primary glow-brat" href="/#generator">Open Generator →</Link>
            </div>
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

        <section className="section">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Tutorial</p><h2>Create a Brat-Style Cover in <span className="text-brat">Four Steps</span></h2><p>Wondering how to use a Brat generator? The basic workflow takes only a few actions.</p></div>
            <div className="card-grid four">{steps.map(([n,t,b],i)=><article key={n} className={`glass step-card hover-lift reveal reveal-delay-${i}`}><div className="step-number">{n}</div><h3>{t}</h3><p>{b}</p></article>)}</div>
            <div className="section-cta reveal"><Link className="text-link" href="/how-to-use/">Read the complete Brat Generator tutorial →</Link></div>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Culture</p>
            <h2>Brat Aesthetic, Brat Summer and Its Viral Appeal</h2>
            <p>Charli XCX released <em>Brat</em> in 2024, and the flat lime-green background with blurred lowercase text spread far beyond the album itself. “Brat Summer” became shorthand for a confident, messy, unbothered mood, and <a className="inline-source-link" href="https://blog.collinsdictionary.com/language-lovers/a-year-when-hedonism-and-anxiety-combine/" target="_blank" rel="noopener noreferrer">Collins Dictionary later selected “brat” as its Word of the Year for 2024</a>.</p>
            <p>The format kept getting reused because it is intentionally simple. A phone, a short phrase, a flat colour, and a little blur are enough to make a recognisable reference for captions, event flyers, playlist art, and memes.</p>
          </div>
        </section>

        <section className="section">
          <div className="container container-narrow"><div className="glass safety-box reveal"><p className="eyebrow left">Privacy</p><h2>Private by Design, <span className="text-brat">Free to Use</span></h2><p>Your text and generated canvas are processed in your browser. The generator does not upload the design to a server, and there is no account to create before you use it.</p><p>This is an independent fan-made tool inspired by the album’s visual language. It is not affiliated with or endorsed by Charli XCX or her label.</p><div className="safety-badges"><span>🔒 No design upload</span><span>✅ No account</span><span>🚫 No watermark</span></div></div></div>
        </section>

        <section className="section section-card">
          <div className="container container-faq">
            <div className="section-heading reveal"><p className="eyebrow">Troubleshooting</p><h2>Common Issues &amp; <span className="text-electric">Quick Fixes</span></h2></div>
            <div className="accordion-list">{problems.map(([q,a])=><details className="glass accordion reveal" key={q}><summary>{q}<span>⌄</span></summary><p>{a}</p></details>)}</div>
          </div>
        </section>

        <section className="section">
          <div className="container container-faq">
            <div className="section-heading reveal"><p className="eyebrow">FAQ</p><h2>Frequently Asked <span className="text-brat">Questions</span></h2></div>
            <div className="accordion-list">{faqs.map(([q,a])=><details className="glass accordion compact reveal" key={q}><summary>{q}<span>⌄</span></summary><p>{a}</p></details>)}</div>
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

        <section className="cta-section"><div className="cta-box reveal"><span className="cta-orb pink"/><span className="cta-orb blue"/><h2>Make Your Free <span className="brat-text cta-brat">brat</span> Cover</h2><p>Free · Fast · No sign-up · No watermark</p><Link className="cta-button" href="/#generator">Start Creating →</Link></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
