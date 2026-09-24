import type { Metadata } from 'next';
import Link from 'next/link';
import BratVideoGenerator from '@/components/BratVideoGenerator';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, organizationEntity, websiteId } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Brat Video Generator | Free Brat-Style Video Maker' },
  description: 'Create animated Brat-style videos and lyric videos with text, optional audio, live preview, 10–60 FPS controls, video, GIF and PNG-frame exports in your browser.',
  alternates: { canonical: '/video-generator/' },
  openGraph: {
    type: 'website',
    url: '/video-generator/',
    title: 'Brat Video Generator | Free Brat-Style Video Maker',
    description: 'Create animated Brat-style videos and lyric clips with text, optional audio and browser-based export controls.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Video Generator preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brat Video Generator',
    description: 'Create Brat-style animations and lyric clips, then export video, GIF or PNG frames.',
    images: ['/og-image.png'],
  },
};

const features = [
  ['🎬', 'Animated Brat Text & Lyrics', 'Turn short phrases, hooks or one lyric phrase per line into a moving Brat-style sequence instead of a static image.', 'glow-brat'],
  ['🎧', 'Optional Audio Upload', 'Add MP3, WAV, M4A, AAC or OGG audio when you want a supported video export to include sound with the animation.', 'glow-pink'],
  ['👁️', 'Live Preview & FPS Control', 'Check the text treatment before export and choose 10–60 FPS to balance smoother motion with browser processing time.', 'glow-electric'],
  ['⬇️', 'Browser-Supported Video Export', 'Create a finished video using the best recording format supported by the browser you are currently using.', 'glow-brat'],
  ['✨', 'Animated GIF Export', 'Export a silent looping GIF when you want quick motion for reactions, previews or lightweight social content.', 'glow-pink'],
  ['🖼️', 'PNG Frame ZIP', 'Download the animation as individual PNG frames in a ZIP when you want to continue editing frame by frame in another app.', 'glow-electric'],
] as const;

const faqs = [
  ['Is the Brat Video Generator free?', 'Yes. The current video tool can be used in the browser without creating an account, and it does not add a Brat Generator watermark to the exported animation.'],
  ['Can I use it as a lyric video generator?', 'Yes. Put one lyric phrase on each line, optionally upload your audio, and the tool will show the non-empty lines in sequence during the export.'],
  ['Does it automatically transcribe or sync every word to the beat?', 'No. You provide the text yourself. The current workflow sequences lyric lines across the video duration rather than using AI transcription or word-by-word karaoke timing.'],
  ['Which audio formats can I upload?', 'The tool accepts MP3, WAV, M4A, AAC and OGG. Actual decoding support can vary by browser and codec, so MP3 or WAV is a useful fallback if another file does not load.'],
  ['Which export formats are available?', 'You can export a browser-supported video, a silent animated GIF, or a ZIP containing individual PNG frames.'],
  ['What FPS should I choose?', 'For most short lyric clips and social animations, 24–30 FPS is a practical starting point. Higher settings can look smoother but require more browser processing.'],
] as const;

export default function VideoGeneratorPage() {
  const canonical = `${siteConfig.url}/video-generator/`;
  const appId = `${canonical}#app`;
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/` },
    { name: 'Brat Video Generator', url: canonical },
  ]);

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': appId,
    name: 'Brat Video Generator',
    url: canonical,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript and a modern web browser with media recording support',
    description: 'Free browser-based Brat-style video and lyric animation generator with line-by-line text sequencing, optional audio, live preview, 10–60 FPS controls, video export, GIF export and PNG frame ZIP export.',
    provider: organizationEntity,
    isAccessibleForFree: true,
    inLanguage: 'en-GB',
    image: `${siteConfig.url}/og-image.png`,
    featureList: features.map(([, heading]) => heading),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: 'Brat Video Generator',
    description: metadata.description,
    inLanguage: 'en-GB',
    isPartOf: { '@id': websiteId },
    about: { '@id': appId },
    dateModified: '2026-09-25',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumb, pageSchema, appSchema, faqSchema]} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content" className="video-generator-page">
        <PageHero
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Brat Video Generator' }]}
          eyebrow="Video Tool"
          title="Brat Video Generator"
          description=""
        />

        <section className="section video-generator-tool-section tool-section-compact" id="video-tool">
          <div className="container tool-container"><div className="reveal"><BratVideoGenerator /></div></div>
        </section>

        <section className="section section-card" id="how-to-use">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Tutorial</p>
              <h2 className="single-line-heading">How to Use the <span className="text-brat">Brat Video Generator</span></h2>
              <p>Paste a short phrase or lyric lines, preview the look, add audio when you need it, then choose the export that fits your next step.</p>
            </div>
            <div className="guide-step-list compact-howto-grid">
              <article className="glass guide-step reveal"><div className="guide-step-no">01</div><div><h3>Enter text or lyrics</h3><p>Use a short phrase, or put one lyric phrase on each line so the sequence stays clear and readable.</p></div></article>
              <article className="glass guide-step reveal"><div className="guide-step-no">02</div><div><h3>Preview the animation</h3><p>Check the text treatment and clean up any line that feels too long before starting the export.</p></div></article>
              <article className="glass guide-step reveal"><div className="guide-step-no">03</div><div><h3>Add audio if needed</h3><p>Upload a supported audio file when you want sound in the video; GIF and PNG frame exports stay visual.</p></div></article>
              <article className="glass guide-step reveal"><div className="guide-step-no">04</div><div><h3>Choose FPS and export</h3><p>Set the frame rate, then export as Video, GIF or Frames and let the browser create the result.</p></div></article>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Key Features</p>
              <h2>Brat Video Generator <span className="text-electric">Features</span></h2>
              <p>Six core features cover the full workflow from lyric text and optional audio to a finished video, GIF or editable frame sequence.</p>
            </div>
            <div className="card-grid feature-grid home-feature-grid tool-feature-grid">
              {features.map(([icon, heading, body, glow], index) => (
                <div className={`reveal reveal-delay-${index % 3}`} key={heading}>
                  <article className={`glass info-card ${glow} hover-lift`}>
                    <div className="emoji">{icon}</div>
                    <h3>{heading}</h3>
                    <p>{body}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-card" id="use-cases">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Use Cases</p><h2>What Can You Make with <span className="text-brat">Brat Video?</span></h2><p>Use the same simple workflow for lyric clips, social motion and lightweight animation exports.</p></div>
            <div className="card-grid three">
              <article className="glass info-card reveal glow-brat hover-lift"><div className="emoji">🎵</div><h3>Lyric & Music Clips</h3><p>Turn a chorus, hook or short verse into a line-by-line Brat-style lyric video with optional audio.</p></article>
              <article className="glass info-card reveal glow-pink hover-lift"><div className="emoji">📱</div><h3>Social Motion Posts</h3><p>Create animated title cards and short text clips for Reels, TikTok-style edits, Shorts or other social content.</p></article>
              <article className="glass info-card reveal glow-electric hover-lift"><div className="emoji">🧩</div><h3>GIFs & Editable Frames</h3><p>Export a looping GIF for quick reactions or PNG frames when you want to continue editing in another app.</p></article>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container container-faq">
            <div className="section-heading reveal">
              <p className="eyebrow">FAQ</p>
              <h2>Brat Video Generator <span className="text-brat">Questions</span></h2>
              <p>Important answers about lyric sequencing, audio support, frame rate and export formats.</p>
            </div>
            <div className="accordion-list">
              {faqs.map(([question, answer]) => (
                <details className="glass accordion compact reveal" key={question}>
                  <summary>{question}<span>⌄</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Related Tools</p><h2>Keep Creating with <span className="text-brat">Brat Tools</span></h2></div>
            <div className="tool-related-links reveal">
              <Link className="text-link" href="/#generator">Create Brat Text →</Link>
              <Link className="text-link" href="/brat-image-generator/">Create a Brat Image →</Link>
              <Link className="text-link" href="/brat-meme-generator/">Make a Brat Meme →</Link>
              <Link className="text-link" href="/brat-styles/">Explore Brat Styles →</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
