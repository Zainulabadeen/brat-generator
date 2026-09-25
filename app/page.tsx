import type { Metadata } from 'next';
import Link from 'next/link';
import BratGenerator from '@/components/BratGenerator';
import DetailedHowTo, { GuideDetailSections } from '@/components/DetailedHowTo';
import JsonLd from '@/components/JsonLd';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';
import { faqPageSchema, imageObjectSchema, organizationSchema, softwareApplicationSchema, webPageSchema, websiteSchema } from '@/lib/schema';

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

const detailedSteps = [
  {
    title: 'Enter your text',
    body: 'Start with the exact word or phrase you want on the design. The generator updates the preview while you type, so this is the best moment to test whether the wording feels balanced before changing visual settings.',
    points: [
      'One to four words usually gives the clearest classic Brat-style composition.',
      'Use the Lowercase effect when you want the familiar understated text treatment.',
      'Watch the live canvas while typing so you can spot awkward wrapping or an overly long phrase immediately.',
    ],
    tip: 'Try the shortest version of your phrase first. A compact line is easier to style, blur and reuse across different canvas sizes.',
    image: '/images/how-to/main-step-1.webp',
    alt: 'Brat Generator: enter text step screenshot',
  },
  {
    title: 'Choose a style and colour direction',
    body: 'Next choose the visual starting point. You can use the built-in style tabs, pick a colour swatch, or use the background and text colour controls for a custom combination.',
    points: [
      'Use Brat and Brat White when you want a quick preset that matches those built-in generator modes.',
      'Black, pink, blue and other colours can be built with the swatches or colour controls when there is no exact style tab.',
      'Keep enough contrast between the text and background so the wording remains readable at thumbnail size.',
    ],
    tip: 'Choose the background first, then set the text colour. It is easier to judge contrast in that order.',
    image: '/images/how-to/main-step-2.webp',
    alt: 'Brat Generator: choose styles and colours step screenshot',
  },
  {
    title: 'Fine-tune typography, blur and effects',
    body: 'Once the basic look is right, use the detailed controls to shape the text. Small adjustments here can make the same phrase feel cleaner, rougher, louder or more experimental.',
    points: [
      'Use Font Style, Text Size and Letter Spacing to control the basic typography.',
      'Add Blur gradually instead of pushing it so far that the phrase becomes difficult to read.',
      'Lowercase, Mirror, Flip Vertical, Noise / Grain, Scribble and Bold are optional effects for more specific variations.',
    ],
    tip: 'Change one control at a time. If several effects are added together, it becomes harder to tell which one actually improved the design.',
    image: '/images/how-to/main-step-3.webp',
    alt: 'Brat Generator: adjust typography blur and effects step screenshot',
  },
  {
    title: 'Choose a canvas size and export',
    body: 'Finish by matching the canvas to where the graphic will be used, then either copy the result or download the finished image from the generator.',
    points: [
      'Use the square presets for posts and cover-style graphics, 1080×1920 for Stories, or 1200×630 for wide banners and link previews.',
      'Use Copy when you want to paste the image straight into another supported app.',
      'Use Download Image when you want a saved file you can upload, archive or continue editing elsewhere.',
    ],
    tip: 'Check the final design at a smaller visual size before export; if it still reads clearly, it is more likely to work well in feeds and previews.',
    image: '/images/how-to/main-step-4.webp',
    alt: 'Brat Generator: choose canvas size and export step screenshot',
  },
] as const;

const generatorGuideDetails = [
  {
    eyebrow: 'Typography',
    title: 'Text Controls',
    body: 'The generator is built around text, so the most useful controls are the ones that shape how the phrase fits and how quickly it can be read.',
    points: [
      'Text Size changes the visual weight of the phrase on the canvas.',
      'Letter Spacing can make condensed words feel tighter or give a short phrase more air.',
      'Blur softens the edges for the familiar rough treatment, while zero blur keeps the result crisp.',
    ],
  },
  {
    eyebrow: 'Styles',
    title: 'Presets, Colours and',
    accent: 'Effects',
    accentClass: 'text-pink' as const,
    body: 'Use the style tabs for fast starting points, then refine the result with swatches, custom colours and optional effects instead of treating every design as the same green card.',
    points: [
      'Built-in modes change the visual direction quickly.',
      'Background and text colour controls let you build custom combinations.',
      'Mirror, Flip, Noise / Grain, Scribble and Bold are optional finishing effects rather than requirements.',
    ],
  },
  {
    eyebrow: 'Output',
    title: 'Canvas Size and',
    accent: 'Export',
    accentClass: 'text-electric' as const,
    body: 'The last step is about destination. Select the canvas that fits the placement, re-check the live preview and then copy or download the result.',
    points: [
      '800×800, 1000×1000 and 1200×1200 cover common square needs.',
      '1080×1920 is intended for vertical Story-style layouts.',
      '1200×630 is useful for wide banners, previews and social link graphics.',
    ],
  },
] as const;

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

const faqs: Array<[string, string]> = [
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
  const homeUrl = `${siteConfig.url}/`;
  const appSchema = softwareApplicationSchema({
    id: `${homeUrl}#app`,
    name: 'Brat Generator',
    url: homeUrl,
    applicationCategory: 'DesignApplication',
    browserRequirements: 'Requires a modern web browser with HTML5 Canvas support',
    description: 'A free browser-based generator for Brat-inspired text, cover art, memes, and social graphics.',
    featureList: [
      'Real-time preview',
      'Custom background and text colours',
      'Adjustable blur, text size and letter spacing',
      'Multiple social-media canvas ratios',
      'PNG, JPG and WebP downloads',
      'No watermark',
    ],
  });
  const pageSchema = webPageSchema({
    url: homeUrl,
    name: 'Brat Generator Free Brat Text & Album Cover Maker',
    description: metadata.description,
    dateModified: '2026-09-25',
    mainEntity: { '@id': `${homeUrl}#app` },
    includeBreadcrumb: false,
  });
  const faqSchema = faqPageSchema(faqs, homeUrl);
  const tutorialImageSchemas = detailedSteps.map((step, index) => imageObjectSchema({
    pageUrl: homeUrl,
    idSuffix: `howto-image-${index + 1}`,
    url: step.image,
    caption: `Brat Generator step ${index + 1}: ${step.title}`,
    description: `Brat Generator tutorial image showing ${step.title.toLowerCase()}.`,
    width: 640,
    height: 860,
  }));

  return (
    <>
      <JsonLd data={[websiteSchema, organizationSchema, pageSchema, appSchema, faqSchema, ...tutorialImageSchemas]} />
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

        <DetailedHowTo
          id="how-to"
          toolName="Brat Generator"
          intro="The basic workflow is quick, but each control has a clear purpose. Follow these four steps to build the design in the right order and avoid fixing the same thing twice."
          steps={detailedSteps}
        />

        <GuideDetailSections
          heading="Brat Generator Controls"
          intro="These are the main choices that affect the final design after you understand the four-step workflow: typography, visual style and the format you export for the next platform."
          sections={generatorGuideDetails}
        />

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
