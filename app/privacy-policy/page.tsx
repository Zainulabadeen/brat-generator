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
  title: { absolute: 'Privacy Policy | Brat Generator' },
  description: 'Read the Brat Generator privacy policy, including local browser processing, technical hosting logs, cookies, analytics and third-party links.',
  alternates: { canonical: '/privacy-policy/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Brat Generator',
    locale: 'en_GB',
    url: '/privacy-policy/',
    title: 'Privacy Policy | Brat Generator',
    description: 'Read the Brat Generator privacy policy, including local browser processing, technical hosting logs, cookies, analytics and third-party links.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Generator privacy policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Brat Generator',
    description: 'Read the Brat Generator privacy policy, including local browser processing, technical hosting logs, cookies, analytics and third-party links.',
    images: ['/og-image.png'],
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${siteConfig.url}/privacy-policy/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <div className="container container-wide breadcrumb-before-hero"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} /></div>


        <PageHero
          eyebrow="Privacy"
          title="Privacy Policy for"
          accent="Brat Generator"
          description="This page explains how the generator handles your design locally in the browser and what ordinary technical data may still be processed when you visit a website."
          primaryHref="/#generator"
          primaryLabel="Open Generator →"
          secondaryHref="/contact/"
          secondaryLabel="Contact"
        />

        <section className="section section-tight">
          <div className="container container-medium article-prose legal-prose reveal">
            <p className="article-meta">Last updated: 7 September 2026</p>
            <h2>1. Generator Content</h2>
            <p>The generator is designed so that the text you enter, colour choices, blur settings and image rendering are processed in your browser. The generator does not need to upload your design to an application server in order to create or download the image.</p>

            <h2>2. Technical Website Data</h2>
            <p>Like most websites, the hosting provider may process ordinary request information needed to deliver the site, such as an IP address, browser type, device information, requested URL, timestamps and security logs. This is separate from the text or image content you create inside the generator.</p>

            <h2>3. Accounts and Uploaded Designs</h2>
            <p>No account is required to use the current generator. The current tool does not provide a cloud gallery or account-based storage area for generated designs, so users should keep their own downloaded copies.</p>

            <h2>4. Cookies and Analytics</h2>
            <p>The generator does not require analytics to create or download an image. The site is prepared to use Google Analytics only after a visitor actively accepts optional analytics in the consent banner. If analytics is not configured, or if a visitor declines, the Google Analytics script is not loaded. The site may store the visitor&apos;s analytics-consent choice locally so the banner does not need to be answered on every page.</p>

            <h2>5. Third-Party Links</h2>
            <p>Some guides may link to third-party websites for references, platform specifications or additional information. Those websites operate under their own privacy policies and are responsible for their own data practices.</p>

            <h2>6. Children</h2>
            <p>The site is a general creative tool and is not intentionally designed to collect personal information from children. Because no account is required, users should avoid entering sensitive personal information into any public-facing text they choose to create.</p>

            <h2>7. Changes to This Policy</h2>
            <p>This policy may be updated when the site adds new services, analytics, advertising, accounts or other features that change how data is handled. The update date at the top of this page should be changed when material revisions are made.</p>

            <h2>8. Contact</h2>
            <p>Questions about privacy, rights concerns or this policy can be sent through the contact details listed on the <Link href="/contact/">Contact page</Link>.</p>
          </div>
        </section>

        <RelatedPages title="Trust & Site Information" items={[
          { href: '/about/', eyebrow: 'About', title: 'About Brat Generator', description: 'Learn why the tool exists and how the browser-based workflow is designed.', accent: 'green' },
          { href: '/terms/', eyebrow: 'Legal', title: 'Terms & Disclaimer', description: 'Review acceptable use, non-affiliation and commercial-use considerations.', accent: 'pink' },
          { href: '/contact/', eyebrow: 'Support', title: 'Contact', description: 'Find the contact channel for feedback, privacy questions and rights concerns.', accent: 'blue' },
        ]} />
      </main>
      <SiteFooter />
    </>
  );
}
