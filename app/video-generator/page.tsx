import type { Metadata } from 'next';
import BratVideoGenerator from '@/components/BratVideoGenerator';
import HowToImage from '@/components/HowToImage';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, faqPageSchema, softwareApplicationSchema, webPageSchema } from '@/lib/schema';

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

const videoTrendCards = [
  ['🎞️', 'Static Style, Now in Motion', 'The familiar flat-colour Brat look becomes more dynamic when short phrases appear one after another instead of sitting on a single still image.'],
  ['🎤', 'Built for Lyric-Led Clips', 'One phrase per line gives hooks, captions and short lyric sequences enough room to stay readable while the animation progresses.'],
  ['🔁', 'Made for Short, Repeatable Formats', 'Video, GIF and frame exports make the same visual idea usable for short social clips, looping reactions and edits that continue in another app.'],
] as const;

const videoIdeas = [
  ['🎵', 'Lyric & Music Clips', 'Turn a chorus, hook or short verse into a line-by-line Brat-style sequence and add audio when the final video needs sound.'],
  ['📱', 'Social Motion Posts', 'Create short animated title cards, captions and text-led clips for vertical or square social edits.'],
  ['✨', 'Looping GIF Reactions', 'Export a silent GIF when you want lightweight motion for reactions, previews, messages or quick posts.'],
  ['🧩', 'Editable Frame Sequences', 'Download PNG frames when you want to continue compositing, retiming or adding extra effects in another editor.'],
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

  const appSchema = softwareApplicationSchema({
    id: appId,
    name: 'Brat Video Generator',
    url: canonical,
    applicationCategory: 'MultimediaApplication',
    browserRequirements: 'Requires JavaScript and a modern web browser with media recording support',
    description: 'Free browser-based Brat-style video and lyric animation generator with line-by-line text sequencing, optional audio, live preview, 10–60 FPS controls, video export, GIF export and PNG frame ZIP export.',
    featureList: features.map(([, heading]) => heading),
  });

  const pageSchema = webPageSchema({
    url: canonical,
    name: 'Brat Video Generator',
    description: metadata.description,
    dateModified: '2026-09-25',
    mainEntity: { '@id': appId },
  });

  const faqSchema = faqPageSchema(faqs, canonical);

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
          description="Create Brat-style animated text and lyric clips in your browser, add optional audio, preview the sequence, then export video, GIF or PNG frames."
        />

        <section className="section video-generator-tool-section tool-section-compact" id="video-tool">
          <div className="container tool-container"><div className="reveal"><BratVideoGenerator /></div></div>
        </section>

        <section className="section">
          <div className="container container-wide about-grid about-grid-wide">
            <div className="reveal"><div className="about-art"><span className="brat-text about-brat">video</span></div></div>
            <div className="reveal reveal-delay-1 about-copy">
              <h2>What Is a <span className="text-brat">Brat Video Generator?</span></h2>
              <p>A Brat video generator turns short text or lyric lines into an animated sequence that uses the same stripped-back, high-contrast Brat-inspired visual language as the static graphics. Instead of exporting one image, the tool moves through your lines over time.</p>
              <p>The current browser-based workflow lets you paste text, optionally add audio, preview the animation, choose a frame rate, and export a video, looping GIF, or ZIP of PNG frames without creating an account.</p>
            </div>
          </div>
        </section>

        <section className="section section-card" id="how-to-use">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Tutorial</p>
              <h2 className="single-line-heading">How to Use the <span className="text-brat">Brat Video Generator</span></h2>
              <p>Paste a short phrase or lyric lines, preview the look, add audio when you need it, then choose the export that fits your next step.</p>
            </div>
            <div className="guide-step-list compact-howto-grid">
              <article className="glass guide-step reveal"><HowToImage className="guide-step-image" src="/images/how-to/video-step-1.webp" alt="Brat Video Generator: enter text or lyrics step screenshot" width={132} height={132} /><div><h3>Enter text or lyrics</h3><p>Use a short phrase, or put one lyric phrase on each line so the sequence stays clear and readable.</p></div></article>
              <article className="glass guide-step reveal"><HowToImage className="guide-step-image" src="/images/how-to/video-step-2.webp" alt="Brat Video Generator: preview the animation step screenshot" width={132} height={132} /><div><h3>Preview the animation</h3><p>Check the text treatment and clean up any line that feels too long before starting the export.</p></div></article>
              <article className="glass guide-step reveal"><HowToImage className="guide-step-image" src="/images/how-to/video-step-3.webp" alt="Brat Video Generator: add audio step screenshot" width={132} height={132} /><div><h3>Add audio if needed</h3><p>Upload a supported audio file when you want sound in the video; GIF and PNG frame exports stay visual.</p></div></article>
              <article className="glass guide-step reveal"><HowToImage className="guide-step-image" src="/images/how-to/video-step-4.webp" alt="Brat Video Generator: choose FPS and export step screenshot" width={132} height={132} /><div><h3>Choose FPS and export</h3><p>Set the frame rate, then export as Video, GIF or Frames and let the browser create the result.</p></div></article>
            </div>
          </div>
        </section>

        <section className="section section-card" id="motion-trend">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Motion Trend</p>
              <h2>From Static Brat Graphics to <span className="text-pink">Animated Clips</span></h2>
              <p>The same simple text-first aesthetic works naturally in motion: keep each line short, make the contrast obvious, and let timing do the extra work instead of adding visual clutter.</p>
            </div>
            <div className="card-grid three">
              {videoTrendCards.map(([icon, title, body], index) => (
                <div className={`reveal reveal-delay-${index}`} key={title}>
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
              <h2>Why You’ll Love This <span className="text-brat">Brat Video Generator</span></h2>
              <p>Everything in the current workflow is focused on turning short text or lyric lines into a clean animated export without making the process complicated.</p>
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
            <div className="section-heading reveal">
              <p className="eyebrow">Content Ideas</p>
              <h2 className="single-line-heading">What Can You <span className="text-pink">Create?</span></h2>
              <p>Use the video tool for short, text-led motion where the words stay central and the export format matches what you want to do next.</p>
            </div>
            <div className="ideas-grid">
              {videoIdeas.map(([icon, title, body], index) => (
                <article className={`glass idea-card reveal reveal-delay-${index % 2}`} key={title}><div className="emoji">{icon}</div><div><h3>{title}</h3><p>{body}</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-card" id="faq">
          <div className="container container-faq">
            <div className="section-heading reveal">
              <p className="eyebrow">FAQ</p>
              <h2>Frequently Asked <span className="text-brat">Questions</span></h2>
              <p>Clear answers about lyric sequencing, audio support, frame rate and the export formats available in the current video tool.</p>
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

        <section className="cta-section">
          <div className="cta-box reveal">
            <span className="cta-orb pink" /><span className="cta-orb blue" />
            <h2>Create Your <span className="brat-text cta-brat">Brat</span> Video Now</h2>
            <p>Free · No sign-up · Browser-based · Video, GIF &amp; frame exports</p>
            <a href="#video-tool" className="cta-button">Start Creating →</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
