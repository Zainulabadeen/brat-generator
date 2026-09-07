import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RelatedPages from '@/components/RelatedPages';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Contact Brat Generator | Support & Rights Concerns' },
  description: 'Contact Brat Generator for feedback, bug reports, privacy questions, rights concerns or website-related enquiries.',
  alternates: { canonical: '/contact/' },
  openGraph: {
    type: 'website',
    siteName: 'Brat Generator',
    locale: 'en_GB',
    url: '/contact/',
    title: 'Contact Brat Generator | Support & Rights Concerns',
    description: 'Contact Brat Generator for feedback, bug reports, privacy questions, rights concerns or website-related enquiries.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact Brat Generator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Brat Generator | Support & Rights Concerns',
    description: 'Contact Brat Generator for feedback, bug reports, privacy questions, rights concerns or website-related enquiries.',
    images: ['/og-image.png'],
  },
};

export default function ContactPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteConfig.url}/contact/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="Contact"
          title="Questions, Feedback or"
          accent="Rights Concerns?"
          description="Use the contact channel below for generator bugs, content feedback, privacy questions, rights concerns or general website enquiries."
          primaryHref={`mailto:${siteConfig.contactEmail}`}
          primaryLabel="Send an Email →"
          secondaryHref="/how-to-use/"
          secondaryLabel="Read the Help Guide"
        />

        <div className="container container-wide"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} /></div>

        <section className="section section-tight">
          <div className="container container-medium contact-grid">
            <article className="contact-card glass reveal">
              <span className="contact-icon">✉️</span>
              <p className="eyebrow left">Email</p>
              <h2>{siteConfig.contactEmail}</h2>
              <p>Use this address for bug reports, feedback, privacy questions, rights concerns and general enquiries.</p>
              <Link className="pill-btn primary glow-brat" href={`mailto:${siteConfig.contactEmail}`}>Email Brat Generator →</Link>
            </article>
            <article className="contact-card glass reveal reveal-delay-1">
              <span className="contact-icon">🛠️</span>
              <p className="eyebrow left">Bug Report</p>
              <h2>Include the Details</h2>
              <p>If something is not working, include your browser, device, the page URL and a short description of what happened. A screenshot is helpful when the issue is visual.</p>
              <Link className="text-link" href="/how-to-use/#troubleshooting">Check Troubleshooting <span aria-hidden="true">→</span></Link>
            </article>
          </div>
        </section>


        <RelatedPages title="Helpful Links" items={[
          { href: '/how-to-use/', eyebrow: 'Help', title: 'How to Use', description: 'Find the full generator workflow and common troubleshooting steps.', accent: 'green' },
          { href: '/privacy-policy/', eyebrow: 'Privacy', title: 'Privacy Policy', description: 'Read how generator content and technical website data are handled.', accent: 'blue' },
          { href: '/terms/', eyebrow: 'Legal', title: 'Terms & Disclaimer', description: 'Review acceptable use, commercial-use cautions and non-affiliation.', accent: 'pink' },
        ]} />
      </main>
      <SiteFooter />
    </>
  );
}
