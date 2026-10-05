import type { Metadata } from 'next';
import Link from 'next/link';
import BratVideoGenerator from '@/components/BratVideoGenerator';
import ContextCta from '@/components/ContextCta';
import DetailedHowTo, { GuideDetailSections } from '@/components/DetailedHowTo';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import SiteIcon, { type SiteIconName } from '@/components/SiteIcon';
import { siteConfig } from '@/lib/site';
import { HOW_TO_IMAGE_HEIGHT, HOW_TO_IMAGE_WIDTH } from '@/lib/tutorialImages';
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

const features: ReadonlyArray<readonly [SiteIconName, string, string, string]> = [
  ['video', 'Timed Brat Text & Lyrics', 'Turn short phrases or lyric lines into a moving sequence, then give important lines more time and transitions less.', 'glow-brat'],
  ['headphones', 'Optional Audio & Trim', 'Add MP3, WAV, M4A, AAC or OGG audio, then choose the start and end section used by the video export.', 'glow-pink'],
  ['eye', 'Live Preview & FPS Control', 'Check the text treatment before export and choose 10–60 FPS to balance smoother motion with browser processing time.', 'glow-electric'],
  ['download', 'Browser-Supported Video Export', 'Create a finished video using the best recording format supported by the browser you are currently using.', 'glow-brat'],
  ['sparkles', 'Animated GIF Export', 'Export a silent looping GIF for a short clip. GIF exports are capped at about 12 seconds in the browser tool.', 'glow-pink'],
  ['image', 'PNG Frame ZIP', 'Download a short sequence as individual PNG frames in a ZIP. The current Frames export is capped at about 12 seconds and 60 images.', 'glow-electric'],
] as const;

const videoTrendCards: ReadonlyArray<readonly [SiteIconName, string, string]> = [
  ['video', 'Static Style, Now in Motion', 'The familiar flat-colour Brat look becomes more dynamic when short phrases appear one after another instead of sitting on a single still image.'],
  ['music', 'Built for Lyric-Led Clips', 'One phrase per line gives hooks, captions and short lyric sequences enough room to stay readable while the animation progresses.'],
  ['repeat', 'Made for Short, Repeatable Formats', 'Video, GIF and frame exports make the same visual idea usable for short social clips, looping reactions and edits that continue in another app.'],
] as const;

const videoIdeas: ReadonlyArray<readonly [SiteIconName, string, string]> = [
  ['music', 'Lyric & Music Clips', 'Turn a chorus, hook or short verse into a line-by-line Brat-style sequence and add audio when the final video needs sound.'],
  ['phone', 'Social Motion Posts', 'Create short animated title cards, captions and text-led clips for vertical or square social edits.'],
  ['sparkles', 'Looping GIF Reactions', 'Export a silent GIF when you want lightweight motion for reactions, previews, messages or quick posts.'],
  ['layers', 'Editable Frame Sequences', 'Download PNG frames when you want to continue compositing, retiming or adding extra effects in another editor.'],
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
    title: 'Create the sequence, set timing and preview',
    body: 'After the wording is ready, create timed sets from the non-empty lines. Give important lines more duration and transitions less, then open Preview to check the order before rendering the final animation.',
    points: [
      'Make sure no important line is missing or duplicated before export.',
      'Adjust the duration beside each line when one phrase needs more or less reading time.',
      'Use the preview as a content check; the final export follows the same line order and relative timing.',
    ],
    tip: 'Fix wording problems before adding audio or increasing FPS. Text changes are fastest while the project is still simple.',
    image: '/images/how-to/video-step-2.webp',
    alt: 'Brat Video Generator: create sequence and preview step screenshot',
  },
  {
    title: 'Add and trim audio when the video needs sound',
    body: 'Audio is optional. Drop in a supported file when the final video needs sound, then use the start and end controls to select the part of the track you actually want to render.',
    points: [
      'The tool accepts MP3, WAV, M4A, AAC and OGG files, although decoding can vary by browser and codec.',
      'MP3 or WAV is a useful fallback if another format does not decode correctly.',
      'Trim a long intro or outro before the final render so the text sequence is mapped to the useful section.',
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
      'Around 24–30 FPS is a good starting point for most short text animations.',
      'Higher FPS can look smoother but creates more frames and requires more browser processing.',
      'Use Video for motion with optional audio. GIF is silent and capped at about 12 seconds; Frames are also short-form and capped at 60 PNG images.',
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
    body: 'The tool is line-driven rather than AI-transcribed or word-by-word karaoke timed. You control the phrase breaks and can give each line a different relative duration before export.',
    points: [
      'Use short, separate lines for hooks, captions and lyric phrases.',
      'Remove empty or accidental duplicate lines before export.',
      'Use the line-duration controls to hold important phrases longer and move through short transitions faster.',
      'Preview the wording before you commit to a long render.',
    ],
    note: 'The tool does not automatically transcribe a song or manually place every word on a beat.',
  },
  {
    eyebrow: 'Audio',
    title: 'Sound and Browser Compatibility',
    body: 'Audio is decoded in the browser and added only to the video path that supports sound. You can also trim the start and end of the loaded track before rendering. Browser and codec support can still vary.',
    points: [
      'MP3 and WAV are useful compatibility-first choices.',
      'M4A, AAC and OGG are accepted, but browser decoding support can vary.',
      'Use the audio start and end controls to render only the section you need.',
      'GIF and individual PNG frames do not contain audio.',
    ],
  },
  {
    eyebrow: 'Export',
    title: 'Video, GIF, Frames and FPS',
    body: 'Choose the output based on what you will do after export rather than choosing the heaviest option by default. Frame rate controls smoothness and processing cost, while format controls how the animation can be reused.',
    points: [
      'Video uses the best recording format your browser can provide.',
      'GIF is useful for a short silent loop and is capped at about 12 seconds.',
      'Frames ZIP gives you individual PNG images for retiming or compositing, with a current limit of about 12 seconds and 60 frames.',
    ],
  },
] as const;

const faqs = [
  ['Is the Brat Video Generator free?', 'Yes. The current video tool can be used in the browser without creating an account, and it does not add a Brat Generator watermark to the exported animation.'],
  ['Can I use it as a lyric video generator?', 'Yes. Put one lyric phrase on each line, optionally upload your audio, and the tool will show the non-empty lines in sequence during the export.'],
  ['Does it automatically transcribe or sync every word to the beat?', 'No. You provide the text yourself. You can adjust the relative duration of each lyric line, but the tool does not use AI transcription or automatic word-by-word karaoke timing.'],
  ['Which audio formats can I upload?', 'The tool accepts MP3, WAV, M4A, AAC and OGG. Actual decoding support can vary by browser and codec, so MP3 or WAV is a useful fallback if another file does not load.'],
  ['Which export formats are available?', 'You can export a browser-supported video, a silent animated GIF, or a ZIP containing individual PNG frames. GIF and Frames are intended for short clips of about 12 seconds; Frames are also limited to 60 images.'],
  ['What FPS should I choose?', 'For most short lyric clips and social animations, 24–30 FPS is a good starting point. Higher settings can look smoother but require more browser processing.'],
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
    dateModified: '2026-10-05',
    mainEntity: { '@id': appId },
  });

  const faqSchema = faqPageSchema(faqs, canonical);
  const tutorialImageSchemas = videoHowToSteps.map((step, index) => imageObjectSchema({
    pageUrl: canonical,
    idSuffix: `howto-image-${index + 1}`,
    url: step.image,
    caption: `Brat Video Generator step ${index + 1}: ${step.title}`,
    description: `Brat Video Generator tutorial image showing ${step.title.toLowerCase()}.`,
    width: HOW_TO_IMAGE_WIDTH,
    height: HOW_TO_IMAGE_HEIGHT,
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
              <p>The browser-based tool lets you paste text, optionally add audio, preview the animation, choose a frame rate, and export a video, looping GIF, or ZIP of PNG frames without creating an account. If you only need one static graphic, the <Link className="inline-source-link" href="/">main Brat Generator</Link> is the faster option.</p>
            </div>
          </div>
        </section>

        <DetailedHowTo
          id="how-to-use"
          toolName="Brat Video Generator"
          intro="Prepare the text first, preview the line order, add audio only if the final video needs it, then choose FPS and the export format."
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
              <p>The same simple text-first aesthetic works naturally in motion: keep each line short, make the contrast obvious, and let timing do the extra work instead of adding visual clutter. The <Link className="inline-source-link" href="/help/brat-video-tips/">Brat Video Tips guide</Link> has a practical workflow when you want to improve pacing and readability.</p>
            </div>
            <div className="card-grid three">
              {videoTrendCards.map(([icon, title, body], index) => (
                <div className={`reveal reveal-delay-${index}`} key={title}>
                  <article className="glass info-card glow-pink hover-lift"><div className="emoji"><SiteIcon name={icon} size={27} /></div><h3>{title}</h3><p>{body}</p></article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Key Features</p>
              <h2>Brat Video Generator <span className="text-brat">Features</span></h2>
              <p>The tool is focused on turning short text or lyric lines into a clean animated export without making the process complicated. If you are deciding between Video, GIF and PNG frames, the <Link className="inline-source-link" href="/help/brat-video-export-guide/">video export guide</Link> explains when each output makes sense.</p>
            </div>
            <div className="card-grid feature-grid home-feature-grid tool-feature-grid">
              {features.map(([icon, heading, body, glow], index) => (
                <div className={`reveal reveal-delay-${index % 3}`} key={heading}>
                  <article className={`glass info-card ${glow} hover-lift`}>
                    <div className="emoji"><SiteIcon name={icon} size={27} /></div>
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
                <article className={`glass idea-card reveal reveal-delay-${index % 2}`} key={title}><div className="emoji"><SiteIcon name={icon} size={27} /></div><div><h3>{title}</h3><p>{body}</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-card" id="faq">
          <div className="container container-faq">
            <div className="section-heading reveal">
              <p className="eyebrow">FAQ</p>
              <h2>Frequently Asked <span className="text-brat">Questions</span></h2>
              <p>Clear answers about lyric sequencing, audio support, frame rate and the export formats available in the current video tool. The <Link className="inline-source-link" href="/help/brat-video-export-guide/">video export guide</Link> compares the output choices in more detail.</p>
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

        <ContextCta
          title="Create Your Brat Video Now"
          description="Build animated Brat-style text with optional audio, then export a browser-supported video, GIF, or PNG frames."
          href="#video-tool"
          buttonLabel="Start Creating"
        />

      </main>
      <SiteFooter />
    </>
  );
}
