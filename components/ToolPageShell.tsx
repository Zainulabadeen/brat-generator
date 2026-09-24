import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import BratCreativeTool from '@/components/BratCreativeTool';
import BratGenerator from '@/components/BratGenerator';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, organizationEntity, websiteId } from '@/lib/schema';

type ToolMode = 'text' | 'meme' | 'image' | 'album';

type Props = {
  mode: ToolMode;
  name: string;
  slug: string;
  title: string;
  accent?: string;
  description?: string;
  schemaDescription: string;
  howTo: Array<[string, string]>;
  features: Array<[string, string]>;
  useCases: Array<[string, string]>;
  tips: string[];
  links?: Array<[string, string]>;
  applicationCategory?: string;
};

export default function ToolPageShell({
  mode,
  name,
  slug,
  title,
  accent,
  description = '',
  schemaDescription,
  howTo,
  features,
  useCases,
  tips,
  links = [],
  applicationCategory = 'DesignApplication',
}: Props) {
  const canonical = `${siteConfig.url}/${slug}/`;
  const appId = `${canonical}#app`;

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/` },
    { name, url: canonical },
  ]);

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': appId,
    name,
    url: canonical,
    applicationCategory,
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript and a modern web browser',
    description: schemaDescription,
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
    name,
    description: schemaDescription,
    inLanguage: 'en-GB',
    isPartOf: { '@id': websiteId },
    about: { '@id': appId },
    primaryImageOfPage: { '@type': 'ImageObject', url: `${siteConfig.url}/og-image.png` },
    dateModified: '2026-09-23',
  };

  return (
    <>
      <JsonLd data={[breadcrumb, pageSchema, appSchema]} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content" className="tool-page">
        <PageHero
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: name }]}
          eyebrow="Tool"
          title={title}
          accent={accent}
          description={description}
        />

        <section className="section tool-page-workspace" id="tool">
          <div className="container tool-container">
            {mode === 'text' ? <BratGenerator /> : <BratCreativeTool mode={mode} />}
          </div>
        </section>

        <section className="section section-card" id="how-to-use">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Tutorial</p>
              <h2>How to Use the <span className="text-brat">{name}</span></h2>
              <p>Four quick steps are enough: add your content, customise the style, check the preview, then export.</p>
            </div>
            <div className="guide-step-list compact-howto-grid">
              {howTo.map(([heading, body], index) => (
                <article className="glass guide-step reveal" key={heading}>
                  <div className="guide-step-no">{String(index + 1).padStart(2, '0')}</div>
                  <div><h3>{heading}</h3><p>{body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Key Features</p>
              <h2>What the <span className="text-brat">{name}</span> Can Do</h2>
              <p>The controls are focused on quick Brat-style creation without requiring a separate design app.</p>
            </div>
            <div className="card-grid three tool-tip-grid">
              {features.map(([heading, body], index) => (
                <article className="glass info-card reveal" key={heading}>
                  <div className="emoji">{['✦','◫','↗','◎','↔','↓'][index % 6]}</div>
                  <h3>{heading}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-card" id="use-cases">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Use Cases</p>
              <h2>Useful for <span className="text-electric">Quick Creative Work</span></h2>
            </div>
            <div className="card-grid three">
              {useCases.map(([heading, body]) => (
                <article className="glass info-card reveal" key={heading}>
                  <h3>{heading}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Quick Tips</p>
              <h2>Get a Better Result <span className="text-electric">Faster</span></h2>
            </div>
            <div className="card-grid three tool-tip-grid">
              {tips.map((tip, index) => (
                <article className="glass info-card reveal" key={tip}>
                  <div className="emoji">{['✦','↔','↓'][index % 3]}</div>
                  <p>{tip}</p>
                </article>
              ))}
            </div>
            {links.length ? (
              <div className="tool-related-links reveal" aria-label="Related Brat tools and guides">
                {links.map(([label, href]) => <Link className="text-link" href={href} key={href}>{label} →</Link>)}
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
