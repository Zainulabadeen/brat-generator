import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RelatedPages from '@/components/RelatedPages';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Terms of Use & Disclaimer | Brat Generator' },
  description: 'Read the Brat Generator terms of use and disclaimer covering acceptable use, user responsibility, independent fan-made status and commercial use.',
  alternates: { canonical: '/terms/' },
  openGraph: {
    type: 'website',
    siteName: 'Brat Generator',
    locale: 'en_GB',
    url: '/terms/',
    title: 'Terms of Use & Disclaimer | Brat Generator',
    description: 'Read the Brat Generator terms of use and disclaimer covering acceptable use, user responsibility, independent fan-made status and commercial use.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Generator terms and disclaimer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Use & Disclaimer | Brat Generator',
    description: 'Read the Brat Generator terms of use and disclaimer covering acceptable use, user responsibility, independent fan-made status and commercial use.',
    images: ['/og-image.png'],
  },
};

export default function TermsPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Terms & Disclaimer', item: `${siteConfig.url}/terms/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="Terms"
          title="Terms of Use &"
          accent="Disclaimer"
          description="These terms explain the basic rules for using Brat Generator, the independent status of the site and the limits of what the tool can promise."
          primaryHref="/#generator"
          primaryLabel="Use the Generator →"
          secondaryHref="/privacy-policy/"
          secondaryLabel="Privacy Policy"
        />

        <div className="container container-wide"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms & Disclaimer' }]} /></div>

        <section className="section section-tight">
          <div className="container container-medium article-prose legal-prose reveal">
            <p className="article-meta">Last updated: 7 September 2026</p>
            <h2>1. Use of the Website</h2>
            <p>Brat Generator is provided as a creative browser-based tool. You may use it to create personal graphics, covers, memes, profile images and other designs, subject to these terms and any laws or platform rules that apply to your use.</p>

            <h2>2. Independent Fan-Made Status</h2>
            <p>Brat Generator is independent and fan-made. It is not affiliated with, sponsored by, endorsed by, or officially connected with Charli XCX, Atlantic Records, Warner Music or their related brands. References to the Brat aesthetic are descriptive and contextual.</p>

            <h2>3. Your Text and Designs</h2>
            <p>You are responsible for the words, names, logos, images or other material you choose to include in a design. Do not use the tool to create content that infringes another person&apos;s rights, falsely implies endorsement, or violates applicable law.</p>

            <h2>4. Commercial Use</h2>
            <p>A generated image being downloadable without a watermark does not automatically grant rights to third-party names, trademarks, album artwork, branding or other protected material. If you plan to sell merchandise, run paid advertising or use a design in a commercial campaign, you are responsible for confirming that you have the rights needed for that use. Seek qualified legal advice when appropriate.</p>

            <h2>5. Availability and Accuracy</h2>
            <p>The site is provided on an as-available basis. Features, export formats, platform recommendations and design guidance may change. Third-party platform dimensions can also change, so check the current requirements of the platform where you plan to publish.</p>

            <h2>6. No Professional Advice</h2>
            <p>Content on this site is provided for general creative and informational purposes. It is not legal, financial or professional advice and should not be treated as a substitute for advice tailored to your situation.</p>

            <h2>7. Limitation of Responsibility</h2>
            <p>To the extent permitted by applicable law, the site does not guarantee uninterrupted operation, specific search rankings, platform acceptance or a particular commercial outcome from a generated design. You remain responsible for reviewing the final output before publishing or using it.</p>

            <h2>8. Changes</h2>
            <p>These terms may be updated when the service changes. Continued use after an update means you should review the latest version posted on this page.</p>
          </div>
        </section>

        <RelatedPages title="Useful Site Pages" items={[
          { href: '/privacy-policy/', eyebrow: 'Privacy', title: 'Privacy Policy', description: 'Understand local browser processing and ordinary technical hosting data.', accent: 'green' },
          { href: '/about/', eyebrow: 'About', title: 'About the Tool', description: 'See why Brat Generator was built and what it is designed to do.', accent: 'pink' },
          { href: '/contact/', eyebrow: 'Support', title: 'Contact', description: 'Use the contact page for feedback, rights concerns or policy questions.', accent: 'blue' },
        ]} />
      </main>
      <SiteFooter />
    </>
  );
}
