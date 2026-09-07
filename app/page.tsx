import type { Metadata } from 'next';
import Link from 'next/link';
import BratGenerator from '@/components/BratGenerator';
import JsonLd from '@/components/JsonLd';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Brat Generator Free Brat Text & Album Cover Maker' },
  description: 'Create Brat text, album covers, and memes in seconds with our free Brat Generator. Customize colours, font effects, blur, sizes, and download instantly.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'Brat Generator Free Brat Text & Album Cover Maker',
    description: 'Create Brat-style text, album covers, and memes free in your browser. No sign-up, no watermark.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Generator on lime green background' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brat Generator Free Brat Text & Album Cover Maker',
    description: 'Create Brat-style text, album covers, and memes free in your browser.',
    images: ['/og-image.png'],
  },
};

const trendCards = [
  ['🎵', 'From Album Cover to Internet Trend', 'Charli XCX released her sixth studio album, Brat, on 7 June 2024. Its stripped-back cover quickly became a recognisable visual reference across music and social media.'],
  ['💚', 'The Design That Broke the Rules', 'The bright green field, blurred lowercase typography, and deliberately imperfect finish stood out because it rejected the polished look of conventional album artwork.'],
  ['🌍', 'More Than a Summer Trend', 'Brat Summer spread into fashion, language, memes, and internet culture. Collins Dictionary later chose “brat” as its Word of the Year for 2024.'],
];

const features = [
  ['👁️', 'Live Preview', 'Watch every change appear instantly as you edit your text, colours, blur, size, and spacing.', 'glow-brat'],
  ['🎨', 'Brat-Inspired Colour Presets', 'Start with the widely used Brat Green digital approximation #8ACE00, or switch to black, white, pink, blue, or any custom colour.', 'glow-pink'],
  ['🔤', 'Brat-Style Typography', 'Use condensed Arial Narrow-style text, tight spacing, lowercase rendering, and an adjustable Gaussian blur effect.', 'glow-electric'],
  ['📐', 'Social-Ready Sizes', 'Export square, 4:5 portrait, 9:16 Story/TikTok, or 16:9 wide graphics without rebuilding the design.', 'glow-brat'],
  ['⬇️', 'High-Quality Downloads', 'Download PNG, JPG, or WebP files with no watermark. The chosen export dimensions are rendered directly in your browser.', 'glow-pink'],
  ['🔓', 'No Sign-Up Required', 'Open the tool, create your design, and download it instantly. No account or separate software installation is required.', 'glow-electric'],
];

const steps = [
  ['01', 'Enter Your Text', 'Type a short word or phrase. One to four words usually keeps the condensed, blurred text readable.'],
  ['02', 'Choose Colours', 'Start with Brat Green or use the colour picker for black, white, pink, blue, or a custom hex value.'],
  ['03', 'Adjust Font & Blur', 'Tune text size, letter spacing, and blur. Keep enough contrast so the text stays readable at smaller sizes.'],
  ['04', 'Download Your Design', 'Choose a canvas size and PNG, JPG, or WebP, then download the finished design directly from your browser.'],
];

const styleCards = [
  ['brat', 'Classic Brat Green', 'Lime green + black', 'brat-green', '#111'],
  ['vibes', 'Minimalist Black', 'Black + white', 'brat-black', '#fff'],
  ['girly', 'Aesthetic Pink', 'Pink + dark text', 'brat-pink', '#111'],
  ['anomaly', 'Electric Blue', 'Blue + dark text', 'brat-electric', '#111'],
];

const ideas = [
  ['🎬', 'Album Covers & Playlist Artwork', 'Use the Brat album cover generator workflow for fan-made cover concepts, playlist artwork, artist names, moods, and inside jokes in a familiar Brat-inspired layout.'],
  ['🎧', 'Memes & Quick Social Posts', 'Use the green square and blurred lowercase text for reactions, one-liners, TikTok thumbnails, Instagram Stories, or X posts.'],
  ['💬', 'Wallpapers, PFPs & Banners', 'Make phone wallpapers, profile pictures, Discord banners, WhatsApp DPs, and other personal graphics.'],
  ['✨', 'One Style Across Platforms', 'Switch export sizes while keeping the same visual treatment for Instagram, TikTok, playlists, banners, and other creative projects.'],
];

const faqs = [
  ['What is a Brat Generator?', 'It is a browser-based design tool that recreates the visual language associated with Charli XCX’s 2024 Brat era: flat colour, condensed lowercase text, and a soft blur. You can replace the text, colours, size, and export format.'],
  ['Is Brat Generator free?', 'Yes. This tool is free to use, does not require an account, and does not add a watermark to the exported image.'],
  ['What font is used for the Brat look?', 'The original artwork is widely described as using heavily manipulated Arial-style typography rather than a special downloadable “Brat font.” This generator uses an Arial Narrow-style condensed font as a practical starting point and adds spacing and blur controls.'],
  ['What is the Brat green hex code?', '#8ACE00 is a widely used digital approximation for the lime-green Brat look and is the default preset in this generator. Screen rendering can vary, so treat it as a practical web colour rather than a guaranteed physical colour match.'],
  ['How do I use Brat Generator?', 'Enter your text, choose the background and text colours, adjust blur, size, and spacing, pick a canvas size and export format, then download the finished image.'],
  ['Is there a Brat Generator app?', 'No separate app is required. The generator runs in modern mobile and desktop browsers.'],
  ['Can I use Brat Generator commercially?', 'This is a fan-made tool, not legal advice. Personal creative use is generally different from selling merchandise or advertising with protected names, branding, or artwork. For commercial use, consider the applicable copyright and trademark rules in your jurisdiction.'],
  ['Does Brat Generator work on mobile?', 'Yes. The controls are responsive and work on modern phone and tablet browsers as well as desktop computers.'],
  ['Are my designs stored?', 'The current generator renders the preview and export in your browser. It does not upload your design text or generated canvas to a server.'],
  ['Is this official or affiliated with Charli XCX?', 'No. Brat Generator is an independent fan-made design tool inspired by the Brat aesthetic and is not affiliated with Charli XCX, Atlantic Records, or Warner Music.'],
];

const compare = [
  ['Browser-based', 'Yes', 'Yes', 'Desktop + web options'],
  ['No sign-up required for this tool', 'Yes', 'Usually account-based', 'Account/subscription based'],
  ['Brat-specific presets', 'Purpose-built', 'Manual setup', 'Manual setup'],
  ['Font, spacing & blur controls', 'Dedicated controls', 'Manual adjustments', 'Manual layers/effects'],
  ['Fast one-style workflow', 'Seconds', 'A few minutes', 'More setup for beginners'],
  ['Learning curve for this use case', 'Very low', 'Low', 'Moderate to high'],
];

export default function Home() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Brat Generator',
    alternateName: 'brat.generator',
    url: `${siteConfig.url}/`,
    description: metadata.description,
    inLanguage: 'en-GB',
  };

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Brat Generator',
    url: `${siteConfig.url}/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser with HTML5 Canvas support',
    description: 'A free browser-based generator for Brat-inspired text, cover art, memes, and social graphics.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    isAccessibleForFree: true,
    featureList: [
      'Real-time preview',
      'Custom background and text colours',
      'Adjustable blur, text size and letter spacing',
      'Multiple social-media canvas ratios',
      'PNG, JPG and WebP downloads',
      'No watermark',
    ],
  };

  return (
    <>
      <JsonLd data={[websiteSchema, appSchema]} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <section className="hero-section" id="top">
          <div className="hero-blobs" aria-hidden="true">
            <span className="blob blob-green" />
            <span className="blob blob-pink" />
            <span className="blob blob-blue" />
          </div>
          <div className="container container-hero hero-content">
            <div className="reveal is-visible hero-delay-0">
              <span className="micro-pill glass"><span className="micro-dot" />100% free · no sign-up · instant</span>
            </div>
            <h1 className="hero-title reveal is-visible hero-delay-1">
              Brat Generator: Create Text, Album Covers &amp; Memes<br />
              <span className="brat-text hero-brat">charli xcx style</span><br />
              <span>For Free</span>
            </h1>
            <p className="hero-copy reveal is-visible hero-delay-2">Create Brat-style text, album covers, and memes with custom colours, condensed font effects, adjustable blur, social-ready sizes, and instant browser-based downloads — completely free.</p>
            <div className="hero-buttons reveal is-visible hero-delay-3">
              <Link href="#generator" className="pill-btn primary glow-brat">Start Creating →</Link>
              <Link href="#styles" className="pill-btn secondary">See Examples</Link>
            </div>
            <div className="hero-proof reveal is-visible hero-delay-4">
              <span>⚡ Browser-based</span>
              <span>📱 Mobile friendly</span>
              <span>🚫 No watermark</span>
            </div>
          </div>
        </section>

        <section className="section" id="generator">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Generator</p>
              <h2>Create Your Brat Design <span className="text-brat">Right Now</span></h2>
              <p>Type your text, customise the colours and blur, choose an export size, then download your Brat-inspired design instantly. No signup. No software to install.</p>
            </div>
            <BratGenerator />
          </div>
        </section>

        <section className="section">
          <div className="container container-medium about-grid">
            <div className="reveal"><div className="about-art"><span className="brat-text about-brat">brat</span></div></div>
            <div className="reveal reveal-delay-1 about-copy">
              <p className="eyebrow left">About</p>
              <h2>What Is a <span className="text-brat">Brat Generator</span> and How Does It Work?</h2>
              <p>A Brat generator turns a word or phrase into a graphic inspired by the lime-green, lowercase, slightly blurred visual style associated with Charli XCX’s <em>Brat</em> album. Type your text, choose colours, adjust the blur and spacing, and watch the result update immediately.</p>
              <p>This free Brat generator runs in your browser with no signup and no watermark. The current design canvas is processed locally, so your text and generated image do not need to be uploaded to a server.</p>
            </div>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Global Trend</p>
              <h2>From Album Cover to <span className="text-pink">Global Trend</span></h2>
              <p>The visual language moved far beyond the original cover; <a className="inline-source-link" href="https://blog.collinsdictionary.com/language-lovers/a-year-when-hedonism-and-anxiety-combine/" target="_blank" rel="noopener noreferrer">Collins Dictionary’s 2024 Word of the Year coverage</a> is one clear marker of how widely “brat” entered everyday culture.</p>
            </div>
            <div className="card-grid three">
              {trendCards.map(([icon, title, body], i) => (
                <div className={`reveal reveal-delay-${i}`} key={title}>
                  <article className="glass info-card glow-pink hover-lift"><div className="emoji">{icon}</div><h3>{title}</h3><p>{body}</p></article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Key Features</p>
              <h2>Why You’ll Love This <span className="text-brat">Brat Generator</span></h2>
              <p>Everything you need to create Brat-style text, album covers, memes, and social graphics right in your browser.</p>
            </div>
            <div className="card-grid feature-grid">
              {features.map(([icon, title, body, glow], i) => (
                <div className={`reveal reveal-delay-${i % 3}`} key={title}>
                  <article className={`glass info-card ${glow} hover-lift`}><div className="emoji">{icon}</div><h3>{title}</h3><p>{body}</p></article>
                </div>
              ))}
            </div>
            <div className="section-cta reveal"><Link className="text-link" href="/features/">Explore all Brat Generator features →</Link></div>
          </div>
        </section>

        <section className="section section-card" id="how-to">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Tutorial</p>
              <h2>How to Use the <span className="text-brat">Brat Generator</span></h2>
              <p>Making a Brat-style graphic is simple. Here is the quick four-step workflow.</p>
            </div>
            <div className="card-grid four">
              {steps.map(([number, title, body], i) => (
                <div className={`reveal reveal-delay-${i}`} key={number}>
                  <article className="glass step-card hover-lift"><div className="step-number">{number}</div><h3>{title}</h3><p>{body}</p></article>
                </div>
              ))}
            </div>
            <div className="section-cta reveal"><Link className="text-link" href="/how-to-use/">Read the complete step-by-step guide →</Link></div>
          </div>
        </section>

        <section className="section" id="styles">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Styles</p>
              <h2>Create Every Brat Style <span className="text-brat">You Want</span></h2>
              <p>Green is the most recognisable starting point, but black, pink, blue, white, and custom colours can keep the same unmistakable condensed, blurred treatment.</p>
            </div>
            <div className="style-grid">
              {styleCards.map(([word, title, body, cls, color], i) => (
                <article className={`style-card reveal reveal-delay-${i}`} key={title}>
                  <div className={`style-square ${cls}`}><span className="brat-text style-word" style={{ color }}>{word}</span></div>
                  <h3>{title}</h3><p>{body}</p>
                </article>
              ))}
            </div>
            <div className="section-cta reveal"><Link className="text-link" href="/brat-styles/">Explore all Brat colour styles →</Link></div>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-medium prose-split">
            <div className="reveal">
              <p className="eyebrow left">Colour Guide</p>
              <h2 className="prose-heading">Brat Green Colour Guide</h2>
              <p>The generator uses <strong>#8ACE00</strong> (RGB 138, 206, 0) as its default Brat Green preset. It is a common digital approximation associated with the album’s acidic lime look, but screens and colour-management systems can display the same hex value differently.</p>
              <p>Use the preset for consistency, then try black, white, pink, blue, or any custom hex value if you want the familiar Brat layout with a different personality.</p>
            </div>
            <div className="colour-fact-card glass reveal reveal-delay-1">
              <span className="colour-swatch" aria-hidden="true" />
              <dl>
                <div><dt>Hex</dt><dd>#8ACE00</dd></div>
                <div><dt>RGB</dt><dd>138, 206, 0</dd></div>
                <div><dt>Use</dt><dd>Default web preset</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Content Ideas</p><h2>What Can You <span className="text-pink">Create?</span></h2><p>The same Brat text generator style can work across personal artwork, memes, playlists, profile graphics, and social media.</p></div>
            <div className="ideas-grid">
              {ideas.map(([icon, title, body], i) => <article className={`glass idea-card reveal reveal-delay-${i % 2}`} key={title}><div className="emoji">{icon}</div><div><h3>{title}</h3><p>{body}</p></div></article>)}
            </div>
            <div className="section-cta reveal"><Link className="text-link" href="/blog/how-to-make-a-brat-album-cover-free/">Learn how to make a Brat album cover →</Link></div>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-narrow">
            <div className="glass safety-box reveal">
              <p className="eyebrow left">Safety</p>
              <h2>Privacy, Commercial Use &amp; <span className="text-brat">Official Status</span></h2>
              <p><strong>This is a fan-made tool.</strong> It is not affiliated with Charli XCX, Atlantic Records, or Warner Music, and it is not the official generator released alongside the album.</p>
              <p>For privacy, the generator preview and export run locally in your browser. Your design text and generated canvas are not sent to a server by this tool.</p>
              <p>Commercial use depends on what you create and the laws that apply where you are. Selling products or advertising a business with protected names, logos, or artwork can raise different rights issues than personal memes or fan posts. When in doubt, get appropriate legal advice.</p>
              <div className="safety-badges"><span>🔒 Browser processing</span><span>✅ No sign-up</span><span>🚫 No watermark</span></div>
            </div>
          </div>
        </section>

        <section className="section section-card" id="faq">
          <div className="container container-faq">
            <div className="section-heading reveal"><p className="eyebrow">FAQ</p><h2>Frequently Asked <span className="text-brat">Questions</span></h2><p>Clear answers to the most common Brat Generator questions.</p></div>
            <div className="accordion-list">
              {faqs.map(([q, a]) => <details className="glass accordion compact reveal" key={q}><summary>{q}<span>⌄</span></summary><p>{a}</p></details>)}
            </div>
            <div className="section-cta reveal"><Link className="text-link" href="/blog/brat-generator-not-working/">Need help? Open the Common Problems &amp; Quick Fixes guide →</Link></div>
          </div>
        </section>

        <section className="section">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Why Us</p><h2>Why Use This <span className="text-brat">Brat Generator</span></h2><p>Built around one specific visual style, so you can spend less time setting up a general design editor and more time creating.</p></div>
            <div className="stats-grid">
              <div className="glass stat-card reveal"><strong>100%</strong><span>Free to use</span></div>
              <div className="glass stat-card reveal reveal-delay-1"><strong>0</strong><span>Watermarks</span></div>
              <div className="glass stat-card reveal reveal-delay-2"><strong>4</strong><span>Canvas presets</span></div>
              <div className="glass stat-card reveal reveal-delay-3"><strong>3</strong><span>Export formats</span></div>
            </div>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Comparison</p><h2>Brat Generator vs <span className="text-pink">Canva &amp; Photoshop</span></h2><p>General-purpose editors offer much deeper control. This tool is designed for a faster, focused Brat-style workflow.</p></div>
            <div className="comparison glass reveal" role="region" aria-label="Brat Generator comparison table" tabIndex={0}>
              <div className="compare-row compare-head"><div>Feature</div><div>This Tool</div><div>Canva</div><div>Photoshop</div></div>
              {compare.map((row) => <div className="compare-row" key={row[0]}>{row.map((cell, i) => <div key={`${row[0]}-${i}`}>{cell}</div>)}</div>)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Pop Culture</p>
            <h2>Why the Brat Aesthetic Still Resonates in the UK</h2>
            <p>Charli XCX was born in Cambridge, and Brat became a particularly visible British pop-culture moment before spreading worldwide. <a className="inline-source-link" href="https://blog.collinsdictionary.com/language-lovers/a-year-when-hedonism-and-anxiety-combine/" target="_blank" rel="noopener noreferrer">Collins Dictionary’s 2024 Word of the Year selection</a> pushed “brat” beyond an album title into everyday language, while the <a className="inline-source-link" href="https://www.brits.co.uk/history?page=1&quicktabs_1=1" target="_blank" rel="noopener noreferrer">BRIT Awards 2025</a> later named <em>BRAT</em> Album of the Year and Charli xcx Artist of the Year.</p>
            <p>The reason the visual language still gets reused is simple: it is easy to recognise, easy to remix, and intentionally unpolished. People now reference it in memes, fashion, language, playlists, posters, and everyday digital design rather than only recreating the original cover.</p>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Typography</p>
            <h2>What Font Does Brat Use?</h2>
            <p>The Brat look is not created by choosing one magic “Brat font.” The original cover is widely understood to rely on manipulated Arial-style typography that was stretched, enlarged, and softened until it felt intentionally rough. This generator uses an Arial Narrow-style condensed font as a practical starting point; people searching for a Brat font generator are usually trying to recreate this overall treatment rather than download one official font file.</p>
            <p>For a convincing result, keep the text short and lowercase, tighten the letter spacing, then add only enough blur to soften the edges. The treatment matters as much as the font family.</p>
          </div>
        </section>

        <section className="section">
          <div className="container container-medium article-prose reveal">
            <p className="eyebrow">Export</p>
            <h2>Export Sizes &amp; Download Formats</h2>
            <p>Use the square 1500×1500 preset for a flexible all-purpose cover. For vertical social graphics, choose 1080×1920 (9:16) or 1080×1350 (4:5). For a wide banner or desktop-style layout, use 1920×1080.</p>
            <p>PNG is the safest choice when you want crisp digital artwork. JPG creates smaller files and WebP is efficient for modern websites. The generator lets you switch the canvas and file format before downloading.</p>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-box reveal">
            <span className="cta-orb pink" /><span className="cta-orb blue" />
            <h2>Create Your <span className="brat-text cta-brat">brat</span> Design Now</h2>
            <p>Free · No sign-up · Browser-based · No watermark</p>
            <Link href="#generator" className="cta-button">Start Creating →</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
