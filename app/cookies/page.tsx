import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, webPageSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Cookie Policy | Brat Generator' },
  description: 'Read the Brat Generator cookie policy, including analytics consent, local browser storage, Google Analytics and how to clear or change stored site data.',
  alternates: { canonical: '/cookies/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Brat Generator',
    locale: 'en_GB',
    url: '/cookies/',
    title: 'Cookie Policy | Brat Generator',
    description: 'Understand which browser storage Brat Generator uses, when optional analytics can load, and how you can manage stored site data.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Generator cookie policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy | Brat Generator',
    description: 'Understand analytics consent, browser storage and cookie use on Brat Generator.',
    images: ['/og-image.png'],
  },
};

export default function CookiePolicyPage() {
  const canonical = `${siteConfig.url}/cookies/`;
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/` },
    { name: 'Cookie Policy', url: canonical },
  ]);

  const pageSchema = webPageSchema({
    url: canonical,
    name: 'Cookie Policy',
    description: metadata.description,
    dateModified: '2026-10-02',
  });

  return (
    <>
      <JsonLd data={[breadcrumb, pageSchema]} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cookie Policy' }]}
          eyebrow="Cookies"
          title="Cookie & Browser Storage"
          accent="Policy"
          description="Brat Generator does not need advertising or analytics cookies to create a design. This page explains the limited browser storage used by the site and what happens if you choose optional analytics."
        />

        <section className="section section-tight">
          <div className="container container-medium article-prose legal-prose reveal">
            <p className="article-meta">Last updated: 2 October 2026</p>

            <h2>1. What the Generator Needs</h2>
            <p>The core <Link className="inline-source-link" href="/#generator">Brat Generator</Link> and the dedicated creative tools can run without analytics cookies. Text, colour choices and normal image rendering are handled in your browser, so accepting optional analytics is not required to create or download a design.</p>

            <h2>2. Analytics Consent Storage</h2>
            <p>When optional analytics is configured, the consent banner stores your choice in your browser under the local-storage key <code>brat-analytics-consent</code>. This small value records whether you selected Accept or Decline so the site does not need to ask the same question on every page.</p>

            <h2>3. Google Analytics</h2>
            <p>Google Analytics is loaded only after an explicit Accept choice and only when a Google Analytics measurement ID is configured for the site. If it loads, Google Analytics may use its own cookies or browser identifiers to measure visits and page usage. The generator itself remains usable if you decline analytics.</p>

            <h2>4. Essential Browser Storage</h2>
            <p>Browser features can also keep temporary state needed for normal website behaviour, such as in-memory tool settings while a page is open. These are functional parts of the browser experience rather than advertising profiles. Where a feature stores something persistently, it should be limited to what the feature needs.</p>

            <h2>5. Third-Party Websites</h2>
            <p>Guides may contain links to external reference sites. A third-party site can set its own cookies after you leave Brat Generator, and those cookies are governed by that site&apos;s policy rather than this one.</p>

            <h2>6. How to Clear Stored Data</h2>
            <p>You can clear cookies and local site data from your browser settings at any time. Clearing site data removes the saved analytics-consent choice, so the consent prompt may appear again if optional analytics is configured. Private-browsing modes can also discard storage when the private session ends.</p>

            <h2>7. Related Privacy Information</h2>
            <p>For the wider explanation of hosting logs, local generator processing and third-party links, read the <Link className="inline-source-link" href="/privacy-policy/">Privacy Policy</Link>. Questions about privacy or browser storage can be sent through the <Link className="inline-source-link" href="/contact/">Contact page</Link>.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
