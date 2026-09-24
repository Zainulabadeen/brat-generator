import type { Metadata } from 'next';
import Link from 'next/link';
import BratGenerator from '@/components/BratGenerator';
import JsonLd from '@/components/JsonLd';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';
import { organizationEntity, organizationSchema, websiteId } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Brat Generator Free Brat Text & Album Cover Maker' },
  description: 'Create Brat text, album covers, and memes in seconds with our free Brat Generator. Customise colours, font effects, blur, sizes, and download instantly.',
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
  ['👁️', 'Real-Time Preview', 'Every change shows up instantly. Type a word, move the blur slider, switch colours, resize text, or change spacing and the live preview updates without making you export repeatedly.', 'glow-brat'],
  ['🎨', 'Brat Green, White & Pink Presets', 'The generator includes #8ACE00 as a one-tap Brat Green preset plus white, black, pink, electric blue, and a full colour picker for custom background and text colours.', 'glow-pink'],
  ['🔤', 'Brat-Style Typography', 'The text uses a condensed Arial Narrow-style treatment with lowercase rendering, adjustable size, letter spacing, and a soft Gaussian blur to recreate the familiar rough anti-design feel.', 'glow-electric'],
  ['📐', 'Social Media Size Presets', 'Choose 800×800, 1000×1000, or 1200×1200 square canvases, plus 1080×1920 Story and 1200×630 banner presets. The exported image uses the selected pixel dimensions.', 'glow-brat'],
  ['⬇️', 'No-Watermark Download', 'What you design is what you download. Choose PNG, JPG, or WebP, then export the finished graphic without a logo stamped over the artwork.', 'glow-pink'],
  ['🔓', 'No Sign-Up. Completely Free.', 'There is no account form, email gate, subscription screen, or software installation. Open the tool, create a design, and download it directly in the browser.', 'glow-electric'],
];

const steps = [
  ['01', 'Enter Your Text', 'Type a short word or phrase. One to four words usually keeps the condensed, blurred text readable.'],
  ['02', 'Choose Colours', 'Start with Brat Green or use the colour picker for black, white, pink, blue, or a custom hex value.'],
  ['03', 'Adjust Font & Blur', 'Tune text size, letter spacing, and blur. Keep enough contrast so the text stays readable at smaller sizes.'],
  ['04', 'Download Your Design', 'Choose a canvas size and PNG, JPG, or WebP, then download the finished design directly from your browser.'],
];

const styleCards = [
  ['brat', 'Classic Brat Green', 'Lime green + black', 'brat-green', '#111', '/#green'],
  ['vibes', 'Minimalist Black', 'Black + white', 'brat-black', '#fff', '/#black'],
  ['girly', 'Aesthetic Pink', 'Pink + dark text', 'brat-pink', '#111', '/#pink'],
  ['anomaly', 'Electric Blue', 'Blue + dark text', 'brat-electric', '#111', '/#blue'],
];

const ideas = [
  ['🎬', 'Album Covers & Playlist Artwork', 'Use the Brat album cover generator workflow for fan-made cover concepts, playlist artwork, artist names, moods, and inside jokes in a familiar Brat-inspired layout.'],
  ['🎧', 'Memes & Quick Social Posts', 'Use the tool as a lightweight Brat meme generator for reactions, one-liners, TikTok thumbnails, Instagram Stories, or X posts.'],
  ['💬', 'Wallpapers, PFPs & Banners', 'Make phone wallpapers, profile pictures, Discord banners, WhatsApp DPs, and other personal graphics.'],
  ['✨', 'One Style Across Platforms', 'Switch export sizes while keeping the same visual treatment for Instagram, TikTok, playlists, banners, and other creative projects.'],
];


const toolCards = [
  ['/video-generator/', 'Brat Video Generator', 'Create animated Brat-style text with optional audio, GIF, video and frame exports.'],
  ['/brat-meme-generator/', 'Brat Meme Generator', 'Make Brat-style memes with photo upload, top and bottom text, effects and image export.'],
  ['/brat-image-generator/', 'Brat Image Generator', 'Build custom Brat-style images with uploaded backgrounds, text, effects and multiple ratios.'],
  ['/brat-album-cover-generator/', 'Brat Album Cover Generator', 'Create square Brat-style album and playlist covers with title, artist line and high-resolution export.'],
  ['/brat-styles/', 'Brat Styles', 'Compare Brat green, black, white, pink and custom colour directions before you create.'],
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


export default function Home() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: 'Brat Generator',
    alternateName: 'brat.generator',
    url: `${siteConfig.url}/`,
    description: metadata.description,
    inLanguage: 'en-GB',
    publisher: organizationEntity,
    hasPart: toolCards.slice(0, 5).map(([url, name]) => ({ '@type': 'WebPage', name, url: `${siteConfig.url}${url}` })),
  };

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${siteConfig.url}/#app`,
    name: 'Brat Generator',
    url: `${siteConfig.url}/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser with HTML5 Canvas support',
    description: 'A free browser-based generator for Brat-inspired text, cover art, memes, and social graphics.',
    provider: organizationEntity,
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
      <JsonLd data={[websiteSchema, appSchema, organizationSchema]} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <section className="hero-section hero-tool-first" id="top">
          <div className="hero-blobs" aria-hidden="true">
            <span className="blob blob-green" />
            <span className="blob blob-pink" />
            <span className="blob blob-blue" />
          </div>
          <div className="container container-hero hero-content">
            <div className="hero-micro-wrap">
              <span className="micro-pill glass"><span className="micro-dot" />100% free · no sign-up · instant</span>
            </div>

            <div id="generator" className="hero-generator-block">
              <span id="green" aria-hidden="true" />
              <span id="black" aria-hidden="true" />
              <span id="white" aria-hidden="true" />
              <span id="pink" aria-hidden="true" />
              <span id="blue" aria-hidden="true" />
              <span id="custom" aria-hidden="true" />
              <h1 className="tool-first-title hero-primary-title">
                Brat Generator: Create Text, Album Covers &amp; Memes <span className="text-brat">Brat Style For Free</span>
              </h1>
              <p className="hero-primary-copy">Create Brat-style text, album covers, and memes with custom colours, condensed font effects, adjustable blur, social-ready sizes, and instant browser-based downloads — completely free.</p>
              <div className="hero-generator-shell">
                <BratGenerator />
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container container-wide about-grid about-grid-wide">
            <div className="reveal"><div className="about-art"><span className="brat-text about-brat">brat</span></div></div>
            <div className="reveal reveal-delay-1 about-copy">
              <h2>What Is a <span className="text-brat">Brat Generator?</span></h2>
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
            <div className="card-grid feature-grid home-feature-grid">
              {features.map(([icon, title, body, glow], i) => (
                <div className={`reveal reveal-delay-${i % 3}`} key={title}>
                  <article className={`glass info-card ${glow} hover-lift`}><div className="emoji">{icon}</div><h3>{title}</h3><p>{body}</p></article>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="section section-card" id="tools">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">More Tools</p>
              <h2>Explore More <span className="text-brat">Brat Tools</span></h2>
              <p>Use the dedicated tool that matches what you want to create, then move between tools without rebuilding the same style from scratch.</p>
            </div>
            <div className="card-grid three">
              {toolCards.map(([href, title, body]) => (
                <article className="glass info-card reveal hover-lift" key={href}>
                  <h3><Link href={href}>{title}</Link></h3>
                  <p>{body}</p>
                  <Link className="text-link" href={href}>Open {title} →</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-card" id="how-to">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Tutorial</p>
              <h2 className="single-line-heading">How to Use the <span className="text-brat">Brat Generator</span></h2>
              <p>Making a Brat-style graphic is simple. Here is the quick four-step workflow.</p>
            </div>
            <div className="card-grid four">
              {steps.map(([number, title, body], i) => (
                <div className={`reveal reveal-delay-${i}`} key={number}>
                  <article className="glass step-card hover-lift"><div className="step-number">{number}</div><h3>{title}</h3><p>{body}</p></article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="styles">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Styles</p>
              <h2>Create Every Brat Style <span className="text-brat">You Want</span></h2>
              <p>Green is the most recognisable starting point, but black, pink, blue, white, and custom colours can keep the same unmistakable condensed, blurred treatment. See the full <Link className="inline-source-link" href="/brat-styles/">Brat Styles guide</Link> for more colour ideas.</p>
            </div>
            <div className="style-grid">
              {styleCards.map(([word, title, body, cls, color, href], i) => (
                <Link className={`style-card reveal reveal-delay-${i}`} href={href} key={title} aria-label={`Open Brat Generator in ${title} style`}>
                  <div className={`style-square ${cls}`}><span className="brat-text style-word" style={{ color }}>{word}</span></div>
                  <h3>{title}</h3><p>{body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Content Ideas</p><h2 className="single-line-heading">What Can You <span className="text-pink">Create?</span></h2><p>The same Brat text generator style can work across personal artwork, memes, playlists, profile graphics, and social media. If you want to build music artwork from scratch, the <Link className="inline-source-link" href="/blog/how-to-make-a-brat-album-cover-free/">Brat album cover guide</Link> walks through the full cover workflow.</p></div>
            <div className="ideas-grid">
              {ideas.map(([icon, title, body], i) => <article className={`glass idea-card reveal reveal-delay-${i % 2}`} key={title}><div className="emoji">{icon}</div><div><h3>{title}</h3><p>{body}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="section section-card" id="faq">
          <div className="container container-faq">
            <div className="section-heading reveal"><p className="eyebrow">FAQ</p><h2>Frequently Asked <span className="text-brat">Questions</span></h2><p>Clear answers to the most common Brat Generator questions. If you run into a download, blur, text-fitting or browser issue, the <Link className="inline-source-link" href="/blog/brat-generator-not-working/">Common Problems &amp; Quick Fixes guide</Link> covers the practical fixes.</p></div>
            <div className="accordion-list">
              {faqs.map(([q, a]) => <details className="glass accordion compact reveal" key={q}><summary>{q}<span>⌄</span></summary><p>{a}</p></details>)}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-box reveal">
            <span className="cta-orb pink" /><span className="cta-orb blue" />
            <h2>Create Your <span className="brat-text cta-brat">Brat</span> Design Now</h2>
            <p>Free · No sign-up · Browser-based · No watermark</p>
            <Link href="#generator" className="cta-button">Start Creating →</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
