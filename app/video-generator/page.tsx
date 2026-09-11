import type { Metadata } from 'next';
import Link from 'next/link';
import BratVideoGenerator from '@/components/BratVideoGenerator';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RelatedPages from '@/components/RelatedPages';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Brat Video Generator – Animated Text & Audio Preview' },
  description:
    'Experiment with Brat-style animated text, audio upload, live preview, FPS controls and MP4, GIF or frame output settings directly in your browser.',
  alternates: { canonical: '/video-generator/' },
  openGraph: {
    title: 'Brat Video Generator – Animated Text & Audio Preview',
    description: 'Experiment with Brat-style animated text, audio upload, live preview and output settings in your browser.',
    url: '/video-generator/',
    type: 'website',
    images: [{ url: '/brat-generator-free-online-tool.png', width: 1200, height: 630, alt: 'Brat Video Generator animated text preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brat Video Generator – Animated Text & Audio Preview',
    description: 'Experiment with Brat-style animated text, audio upload, live preview and output settings in your browser.',
    images: [{ url: '/brat-generator-free-online-tool.png', width: 1200, height: 630, alt: 'Brat Video Generator animated text preview' }],
  },
};

const videoSteps = [
  ['01', 'Add Your Text', 'Enter a short lyric, phrase, or sequence of words for the animated preview. Short lines are easier to read when the text changes quickly.'],
  ['02', 'Add Audio', 'Upload a supported MP3 or WAV file if you want to preview the text alongside audio. Your browser handles the selected file locally for the page session.'],
  ['03', 'Preview and Adjust FPS', 'Use the preview and FPS control to balance smooth motion with a lighter processing load. Higher FPS looks smoother but requires more frames.'],
  ['04', 'Choose an Output Setting', 'Select MP4, GIF, or Frames to explore the available output controls. Review the final preview before using the result in another editing workflow.'],
];

const videoFaqs = [
  ['What is a Brat video generator?', 'It is a browser-based tool for turning short text or lyric-style phrases into an animated Brat-inspired preview using the familiar flat colour, condensed lowercase typography and motion timing controls.'],
  ['Can I add my own audio?', 'Yes. The current interface accepts common MP3 and WAV audio files for the preview workflow.'],
  ['What does FPS change?', 'FPS means frames per second. A higher value can make motion look smoother, while a lower value uses fewer frames and can be lighter to preview.'],
  ['Does the Brat video tool work on mobile?', 'The page is responsive in modern browsers, but audio handling and browser performance can vary by device. A desktop browser is usually more comfortable for longer preview sessions.'],
];

export default function VideoGeneratorPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Video Generator', item: `${siteConfig.url}/video-generator/` },
    ],
  };

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Brat Video Generator',
    url: `${siteConfig.url}/video-generator/`,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript and a modern web browser',
    description:
      'Browser-based Brat-style video tool with text, audio upload, live preview, FPS controls and output settings.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumb, appSchema]} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content" className="video-generator-page">
        <PageHero
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Video Generator' }]}
          eyebrow="Video Generator"
          title="Brat Video Generator:"
          accent="Animated Text & Audio Preview"
          description="Turn lyrics or short phrases into a Brat-style animated preview, add audio, adjust FPS, and explore MP4, GIF or frame output settings directly in your browser."
        />

        <section className="section video-generator-tool-section tool-section-compact" id="video-tool">
          <div className="container tool-container">
            <div className="section-heading reveal video-tool-heading tool-section-heading">
              <p className="eyebrow">Create</p>
              <h2>Generate yours <span className="text-brat">now</span></h2>
              <p>Type your text, upload audio, preview the result, adjust FPS, and use the output controls below.</p>
            </div>
            <div className="reveal">
              <BratVideoGenerator />
            </div>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-medium article-prose centered-prose reveal">
            <p className="eyebrow">Quick Answer</p>
            <h2>What Is a Brat Video Generator?</h2>
            <p>A Brat video generator turns short text or lyrics into an animated Brat-inspired preview. Add your phrase, optionally upload audio, adjust the preview speed with FPS controls, and use the available output settings to plan a short social-style animation in the browser.</p>
          </div>
        </section>

        <section className="section">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">How It Works</p><h2>Use the Brat Video Tool in <span className="text-brat">4 Steps</span></h2><p>A focused workflow for text, audio, motion and output settings.</p></div>
            <div className="guide-step-list">
              {videoSteps.map(([n, title, body], i) => (
                <article className={`glass guide-step reveal reveal-delay-${i % 3}`} key={n}>
                  <div className="guide-step-no">{n}</div>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </article>
              ))}
            </div>
            <div className="section-cta reveal"><Link className="text-link" href="/how-to-use/">Need the image generator? Read the 6-step Brat Generator tutorial →</Link></div>
          </div>
        </section>

        <section className="section section-card" id="video-generator-faq">
          <div className="container container-faq">
            <div className="section-heading reveal"><p className="eyebrow">FAQ</p><h2>Brat Video Generator <span className="text-brat">Questions</span></h2><p>Quick answers about audio, FPS, browser use and output settings.</p></div>
            <div className="accordion-list">
              {videoFaqs.map(([q, a]) => <details className="glass accordion compact reveal" key={q}><summary>{q}<span>⌄</span></summary><p>{a}</p></details>)}
            </div>
          </div>
        </section>

        <RelatedPages title="More Brat Tools & Guides" items={[
          { href: '/#generator', eyebrow: 'Image Tool', title: 'Free Brat Text & Image Generator', description: 'Create static Brat-style text, covers, memes and social graphics.', accent: 'green' },
          { href: '/how-to-use/', eyebrow: 'Tutorial', title: 'How to Use Brat Generator', description: 'Follow the complete image-generator workflow from text entry to download.', accent: 'blue' },
          { href: '/blog/how-to-make-a-brat-album-cover-free/', eyebrow: 'Cover Guide', title: 'Make a Brat Album Cover', description: 'Use Brat green, typography, blur and the right square size for cover artwork.', accent: 'pink' },
        ]} />
      </main>
      <SiteFooter />
    </>
  );
}
