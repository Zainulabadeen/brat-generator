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
  description: 'Create animated Brat-style videos with custom text, optional audio, live preview, FPS controls, video, GIF and PNG-frame exports in your browser.',
  alternates: { canonical: '/video-generator/' },
  openGraph: {
    type: 'website',
    url: '/video-generator/',
    title: 'Brat Video Generator | Free Brat-Style Video Maker',
    description: 'Create animated Brat-style videos with text, optional audio and browser-based export controls.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Video Generator preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brat Video Generator',
    description: 'Create Brat-style animations and export video, GIF or PNG frames.',
    images: ['/og-image.png'],
  },
};

const features = [
  ['Animated Brat Text', 'Turn short words or phrases into a moving Brat-style visual instead of a static image.'],
  ['Optional Audio', 'Add a local audio file when you want sound included with a supported video export.'],
  ['Live Preview', 'Check the text and animation before committing to a longer export.'],
  ['FPS Control', 'Adjust the frame rate to balance smooth motion against browser processing time.'],
  ['Video & GIF Export', 'Export a browser-supported video file or an animated GIF from the current design.'],
  ['PNG Frame ZIP', 'Download individual PNG frames together in a ZIP when you need frame-by-frame assets.'],
];

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
    description: 'Free browser-based Brat-style animation generator with text, optional audio, live preview, FPS controls, video export, GIF export and PNG frame ZIP export.',
    provider: organizationEntity,
    isAccessibleForFree: true,
    inLanguage: 'en-GB',
    image: `${siteConfig.url}/og-image.png`,
    featureList: features.map(([heading]) => heading),
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
    dateModified: '2026-09-23',
  };

  return (
    <>
      <JsonLd data={[breadcrumb, pageSchema, appSchema]} />
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
              <p className="eyebrow">Simple Guide</p>
              <h2>How to Use the <span className="text-brat">Brat Video Generator</span></h2>
              <p>Keep the phrase short, preview the motion, then choose the output that fits what you want to share.</p>
            </div>
            <div className="guide-step-list compact-howto-grid">
              <article className="glass guide-step reveal"><div className="guide-step-no">01</div><div><h3>Enter your text</h3><p>Use a short word or phrase so the animated lettering stays readable on smaller screens.</p></div></article>
              <article className="glass guide-step reveal"><div className="guide-step-no">02</div><div><h3>Preview the animation</h3><p>Check the movement and text treatment before adding extra processing or exporting.</p></div></article>
              <article className="glass guide-step reveal"><div className="guide-step-no">03</div><div><h3>Add audio if needed</h3><p>Upload an audio file only when you want sound in a supported video export; GIF and frame exports remain visual formats.</p></div></article>
              <article className="glass guide-step reveal"><div className="guide-step-no">04</div><div><h3>Choose FPS and export</h3><p>Set the frame rate, then choose Video, GIF or Frames and let the browser create the output.</p></div></article>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Key Features</p><h2>Brat Video Generator <span className="text-electric">Features</span></h2><p>The workflow stays focused on fast browser-based animation rather than full video-editing software.</p></div>
            <div className="card-grid three tool-tip-grid">
              {features.map(([heading, body]) => <article className="glass info-card reveal" key={heading}><h3>{heading}</h3><p>{body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section section-card" id="use-cases">
          <div className="container container-wide">
            <div className="section-heading reveal"><p className="eyebrow">Use Cases</p><h2>Where Brat-Style <span className="text-brat">Motion Works</span></h2></div>
            <div className="card-grid three">
              <article className="glass info-card reveal"><h3>Social Clips</h3><p>Create short animated title cards for Reels, TikTok-style posts and quick social edits.</p></article>
              <article className="glass info-card reveal"><h3>Music Visuals</h3><p>Pair a short phrase with audio for a simple music teaser or visual loop.</p></article>
              <article className="glass info-card reveal"><h3>GIF Reactions</h3><p>Export a looping GIF when you need motion without a full video file.</p></article>
            </div>
          </div>
        </section>

        <section className="section">
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
