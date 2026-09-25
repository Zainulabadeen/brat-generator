import type { Metadata } from 'next';
import BratVideoGenerator from '@/components/BratVideoGenerator';
import DetailedHowTo, { GuideDetailSections } from '@/components/DetailedHowTo';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, faqPageSchema, imageObjectSchema, softwareApplicationSchema, webPageSchema } from '@/lib/schema';

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


const videoHowToSteps = [
  {
    title: 'Enter and organise your text or lyrics',
    body: 'Begin in the Lyrics tab. Paste or type the wording you want to animate, then organise it into short non-empty lines so each part of the sequence stays readable when the export moves from line to line.',
    points: [
      'Use Paste Text when you already have the wording copied from another document or note.',
      'Use Trim Text to remove extra spacing before you create the sequence.',
      'Keep one short phrase per line when you want a cleaner lyric-style progression.',
    ],
    tip: 'A line that looks comfortable as a still frame is usually easier to follow once the animation starts moving.',
    image: '/images/how-to/video-step-1.webp',
    alt: 'Brat Video Generator: enter and organise text or lyrics step screenshot',
  },
  {
    title: 'Create the sequence and check the preview',
    body: 'After the wording is ready, create the sets from your text and open the Preview tab. This lets you check the Brat-style treatment before the browser spends time rendering the final animation.',
    points: [
      'Make sure no important line is missing or duplicated before export.',
      'Shorten any phrase that feels crowded in the live preview.',
      'Use the preview as a content check; the final export will sequence the non-empty lines over time.',
    ],
    tip: 'Fix wording problems before adding audio or increasing FPS. Text changes are fastest while the project is still simple.',
    image: '/images/how-to/video-step-2.webp',
    alt: 'Brat Video Generator: create sequence and preview step screenshot',
  },
  {
    title: 'Add audio when the video needs sound',
    body: 'Audio is optional. Drop a supported audio file into the tool or click the upload area when you want a browser-supported video export to include sound with the text animation.',
    points: [
      'The tool accepts MP3, WAV, M4A, AAC and OGG files, although decoding can vary by browser and codec.',
      'MP3 or WAV is a useful fallback if another format does not decode correctly.',
      'GIF and PNG-frame exports remain silent, so use the video option when the audio is part of the finished result.',
    ],
    tip: 'If an audio file fails, first test the same project with a short MP3 or WAV before changing the text setup.',
    image: '/images/how-to/video-step-3.webp',
    alt: 'Brat Video Generator: add optional audio step screenshot',
  },
  {
    title: 'Choose FPS and export format',
    body: 'Finish by choosing how the animation should be delivered. Select Video, GIF or Frames, then set the frame rate and start the browser-based export.',
    points: [
      'Around 24–30 FPS is a practical starting point for most short text animations.',
      'Higher FPS can look smoother but creates more frames and requires more browser processing.',
      'Use Video for motion with optional audio, GIF for a silent loop, or Frames when you want individual PNGs for another editor.',
    ],
    tip: 'For a first export, use 30 FPS. Increase it only if you can actually see a benefit in the motion.',
    image: '/images/how-to/video-step-4.webp',
    alt: 'Brat Video Generator: choose FPS and export format step screenshot',
  },
] as const;

const videoGuideDetails = [
  {
    eyebrow: 'Sequence',
    title: 'Text and Lyric Flow',
    body: 'The current video workflow is line-driven rather than AI-transcribed or word-by-word karaoke timed. Your text structure is therefore the main control over how easy the finished clip is to follow.',
    points: [
      'Use short, separate lines for hooks, captions and lyric phrases.',
      'Remove empty or accidental duplicate lines before export.',
      'Preview the wording before you commit to a long render.',
    ],
    note: 'The tool does not automatically transcribe a song or manually place every word on a beat.',
  },
  {
    eyebrow: 'Audio',
    title: 'Sound and Browser Compatibility',
    body: 'Audio is decoded in the browser and added only where the selected video-export path supports it. This keeps the workflow local, but support can differ between browsers and codecs.',
    points: [
      'MP3 and WAV are useful compatibility-first choices.',
      'M4A, AAC and OGG are accepted, but browser decoding support can vary.',
      'GIF and individual PNG frames do not contain audio.',
    ],
  },
  {
    eyebrow: 'Export',
    title: 'Video, GIF, Frames and FPS',
    body: 'Choose the output based on what you will do after export rather than choosing the heaviest option by default. Frame rate controls smoothness and processing cost, while format controls how the animation can be reused.',
    points: [
      'Video uses the best recording format the current browser can provide.',
      'GIF is useful for silent looping motion and lightweight previews.',
      'Frames ZIP gives you individual PNG images for retiming or compositing in another editor.',
    ],
  },
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
  const tutorialImageSchemas = videoHowToSteps.map((step, index) => imageObjectSchema({
    pageUrl: canonical,
    idSuffix: `howto-image-${index + 1}`,
    url: step.image,
    caption: `Brat Video Generator step ${index + 1}: ${step.title}`,
    description: `Brat Video Generator tutorial image showing ${step.title.toLowerCase()}.`,
    width: 640,
    height: 860,
  }));

  return (
    <>
      <JsonLd data={[breadcrumb, pageSchema, appSchema, faqSchema, ...tutorialImageSchemas]} />
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

        <DetailedHowTo
          id="how-to-use"
          toolName="Brat Video Generator"
          intro="The video tool has more moving parts than the static generators, so the cleanest workflow is to prepare the text first, preview it, add optional audio, and only then choose the render settings."
          steps={videoHowToSteps}
        />

        <GuideDetailSections
          heading="Brat Video Workflow"
          intro="The most important video-specific choices are how you structure the text, how browser-based audio support behaves, and which export format makes sense for the next platform or editor."
          sections={videoGuideDetails}
        />

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
