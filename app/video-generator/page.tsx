import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import BratVideoGenerator from '@/components/BratVideoGenerator';
import JsonLd from '@/components/JsonLd';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Brat Video Generator | Create Animated Brat-Style Videos' },
  description:
    'Create animated Brat-style videos with custom text, audio upload, live preview, FPS controls, and MP4, GIF or frame output options.',
  alternates: { canonical: '/video-generator/' },
  openGraph: {
    title: 'Brat Video Generator',
    description: 'Create animated Brat-style videos in your browser.',
    url: '/video-generator/',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brat Video Generator',
    description: 'Create animated Brat-style videos in your browser.',
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
      'Browser-based Brat-style video generator with text, audio upload, preview and output controls.',
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
        <section className="video-generator-hero">
          <div className="container container-wide">
            <div className="video-generator-hero-inner reveal">
              <p className="eyebrow">Video Generator</p>
              <h1>BRAT VIDEO GENERATOR.</h1>
              <p>Text in motion, lime green, messy, and customisable. Create your own Brat-style video in your browser.</p>
            </div>
          </div>
        </section>

        <div className="container container-wide video-breadcrumb-wrap">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Video Generator' }]} />
        </div>

        <section className="section video-generator-tool-section" id="video-tool">
          <div className="container container-wide">
            <div className="section-heading reveal video-tool-heading">
              <p className="eyebrow">Create</p>
              <h2>GENERATE YOURS <span className="text-brat">NOW</span></h2>
              <p>Type your text, upload audio, preview the result, adjust FPS, and use the output controls below.</p>
            </div>
            <div className="reveal">
              <BratVideoGenerator />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
