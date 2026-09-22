import type { Metadata } from 'next';
import Link from 'next/link';
import BratVideoGenerator from '@/components/BratVideoGenerator';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';
import { organizationEntity } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Brat Video Generator | Create Animated Brat-Style Videos' },
  description:
    'Use the free Brat Video Generator to create animated Brat-style videos with custom text, optional audio, live preview, FPS controls, real video export, GIF, and frame ZIP downloads.',
  alternates: { canonical: '/video-generator/' },
  openGraph: {
    title: 'Brat Video Generator',
    description: 'Create Brat-style animations in your browser and export a real video file, GIF, or PNG frame ZIP.',
    url: '/video-generator/',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brat Video Generator',
    description: 'Create Brat-style animations in your browser and export a video, GIF, or frame ZIP.',
    images: ['/og-image.png'],
  },
};

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
      'Browser-based Brat-style animation generator with text, optional audio, live preview, FPS controls, real video export, GIF export and PNG frame ZIP export.',
    provider: organizationEntity,
    isAccessibleForFree: true,
    featureList: [
      'Animated Brat-style text rendering',
      'Optional audio track for video export',
      'Browser-supported MP4 or WebM video export',
      'Animated GIF export',
      'PNG frame ZIP export',
      'Adjustable FPS',
    ],
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
          title="Brat Video"
          accent="Generator"
          description="Text in motion, lime green, messy, and customisable. Create your own Brat-style video in your browser."
        />

        <section className="section video-generator-tool-section tool-section-compact" id="video-tool">
          <div className="container tool-container">
            <div className="section-heading reveal video-tool-heading tool-section-heading">
              <p className="eyebrow">Create</p>
              <h2>Generate yours <span className="text-brat">now</span></h2>
              <p>Type your text, optionally upload audio, preview the result, adjust FPS, then export a real video file, animated GIF, or PNG frame ZIP. Video uses MP4 when the browser supports it and WebM otherwise.</p>
            </div>
            <div className="reveal">
              <BratVideoGenerator />
            </div>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">How It Works</p>
              <h2>How to Use the <span className="text-brat">Brat Video Generator</span></h2>
              <p>Start with a short phrase so the animated text stays readable. Adjust the visual treatment, add an audio file when you want sound, preview the result, then fine-tune the frame rate before export. A moderate FPS is usually a good balance between smooth motion and processing time in the browser.</p>
            </div>

            <div className="guide-step-list">
              <article className="glass guide-step reveal">
                <div className="guide-step-no">01</div>
                <div>
                  <h3>Enter your text</h3>
                  <p>Use a short word or phrase for a cleaner Brat-style result.</p>
                </div>
              </article>

              <article className="glass guide-step reveal reveal-delay-1">
                <div className="guide-step-no">02</div>
                <div>
                  <h3>Customise the look</h3>
                  <p>Keep strong contrast between the background and text while adjusting the available visual controls.</p>
                </div>
              </article>

              <article className="glass guide-step reveal reveal-delay-2">
                <div className="guide-step-no">03</div>
                <div>
                  <h3>Add audio and preview</h3>
                  <p>Audio is optional. Add it when you want sound in the video export, then check timing and readability in the live preview.</p>
                </div>
              </article>

              <article className="glass guide-step reveal">
                <div className="guide-step-no">04</div>
                <div>
                  <h3>Choose output settings</h3>
                  <p>Set the FPS, then choose Video, GIF, or Frames. Video exports in the best recording format your browser supports; Frames download as a ZIP of PNG images.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Best Results</p>
              <h2>Tips for Cleaner <span className="text-electric">Brat-Style Video Output</span></h2>
              <p>Keep text concise, avoid extreme blur, and preview the animation before exporting. If a long phrase feels crowded, shorten it rather than forcing the text smaller. Browser performance can vary by device, especially when audio, higher frame rates, or longer sequences are used.</p>
            </div>

            <div className="glass colour-fact-card article-prose reveal">
              <p>For a static image instead, use the <Link className="inline-source-link" href="/#generator">Brat Generator</Link>. For colour, typography, and blur ideas, see the <Link className="inline-source-link" href="/brat-styles/">Brat Styles guide</Link>.</p>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
