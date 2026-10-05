import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import SiteIcon from '@/components/SiteIcon';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, organizationId, webPageSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Contact Brat Generator | Support & Rights Concerns' },
  description: 'Contact Brat Generator for tool feedback, bug reports, privacy or cookie questions, rights concerns and other website-related enquiries.',
  alternates: { canonical: '/contact/' },
  openGraph: {
    type: 'website',
    siteName: 'Brat Generator',
    locale: 'en_GB',
    url: '/contact/',
    title: 'Contact Brat Generator | Support & Rights Concerns',
    description: 'Contact Brat Generator for tool feedback, bug reports, privacy or cookie questions, rights concerns and other website-related enquiries.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact Brat Generator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Brat Generator | Support & Rights Concerns',
    description: 'Contact Brat Generator for tool feedback, technical issues, privacy questions or rights concerns.',
    images: ['/og-image.png'],
  },
};

export default function ContactPage() {
  const canonical = `${siteConfig.url}/contact/`;
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/` },
    { name: 'Contact', url: canonical },
  ]);

  const pageSchema = webPageSchema({
    type: 'ContactPage',
    url: canonical,
    name: 'Contact Brat Generator',
    description: metadata.description,
    dateModified: '2026-10-02',
    about: { '@id': organizationId },
  });

  return (
    <>
      <JsonLd data={[breadcrumb, pageSchema]} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
          eyebrow="Contact"
          title="Questions, Feedback or"
          accent="Rights Concerns?"
          description="Use the contact details below for technical feedback, privacy questions, rights concerns or general website enquiries."
        />

        <section className="section section-tight">
          <div className="container container-medium contact-intro-grid">
            <article className="contact-card glass reveal">
              <span className="contact-icon" aria-hidden="true"><SiteIcon name="mail" size={26} /></span>
              <p className="eyebrow left">Email</p>
              <h2>Contact Brat Generator</h2>
              <p>For website-related enquiries, email <a className="inline-source-link contact-email-link" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. A clear subject line and the page URL make it easier to understand the request.</p>
            </article>

            <article className="contact-card glass reveal reveal-delay-1">
              <span className="contact-icon" aria-hidden="true"><SiteIcon name="tools" size={26} /></span>
              <p className="eyebrow left">Technical Issue</p>
              <h2>Include Useful Details</h2>
              <p>If a tool is not behaving as expected, include the browser, device, exact page URL, what you tried and what happened. Before emailing, the <Link className="inline-source-link" href="/help/brat-generator-not-working/">Brat Generator troubleshooting guide</Link> covers the most common download, blur and browser issues.</p>
            </article>
          </div>
        </section>

        <section className="section section-card">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">What to Contact Us About</p>
              <h2>Send the Right <span className="text-brat">Context</span></h2>
              <p>Keeping the message specific helps separate tool feedback from privacy, policy and rights questions.</p>
            </div>
            <div className="card-grid three contact-topic-grid">
              <article className="glass info-card reveal glow-brat">
                <div className="emoji"><SiteIcon name="sliders" size={27} /></div>
                <h3>Tool &amp; Browser Feedback</h3>
                <p>Report a broken control, export issue or layout problem. Mention which tool you were using, such as the <Link className="inline-source-link" href="/video-generator/">Brat Video Generator</Link> or <Link className="inline-source-link" href="/brat-album-cover-generator/">Brat Album Cover Generator</Link>.</p>
              </article>
              <article className="glass info-card reveal reveal-delay-1 glow-electric">
                <div className="emoji"><SiteIcon name="lock" size={27} /></div>
                <h3>Privacy &amp; Cookies</h3>
                <p>Questions about browser processing, analytics consent or stored site data are explained in the <Link className="inline-source-link" href="/privacy-policy/">Privacy Policy</Link> and <Link className="inline-source-link" href="/cookies/">Cookie Policy</Link>.</p>
              </article>
              <article className="glass info-card reveal reveal-delay-2 glow-pink">
                <div className="emoji"><SiteIcon name="scale" size={27} /></div>
                <h3>Rights &amp; Attribution</h3>
                <p>For rights concerns, attribution questions or possible confusion about affiliation, include the exact URL and material involved. The site&apos;s independent status and use limitations are set out in the <Link className="inline-source-link" href="/terms/">Terms &amp; Disclaimer</Link>.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container container-medium article-prose reveal contact-note">
            <p className="eyebrow">Before You Send</p>
            <h2>A Short, Specific Message Works Best</h2>
            <p>Include the page you were using, a concise description of the issue or request, and a screenshot when the problem is visual. Please do not send passwords, payment details or other sensitive personal information.</p>
            <p>Brat Generator is an independent fan-made website, so this contact address cannot provide official support for Charli XCX, Atlantic Records, Warner Music or their services. For information about the project itself, see <Link className="inline-source-link" href="/about/">About Brat Generator</Link>.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
