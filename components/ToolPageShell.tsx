import HowToImage from '@/components/HowToImage';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import BratCreativeTool from '@/components/BratCreativeTool';
import BratGenerator from '@/components/BratGenerator';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, faqPageSchema, softwareApplicationSchema, webPageSchema } from '@/lib/schema';

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
  faqs?: Array<[string, string]>;
  faqIntro?: string;
  links?: Array<[string, string]>;
  applicationCategory?: string;
};


const howToImagePrefix: Record<ToolMode, string> = {
  text: 'main',
  meme: 'meme',
  image: 'image',
  album: 'album',
};

const featureDecorByMode: Record<ToolMode, Array<[string, string]>> = {
  text: [
    ['👁️', 'glow-brat'], ['🎨', 'glow-pink'], ['🔤', 'glow-electric'], ['📐', 'glow-brat'], ['⬇️', 'glow-pink'], ['🔓', 'glow-electric'],
  ],
  meme: [
    ['😂', 'glow-pink'], ['🖼️', 'glow-electric'], ['✍️', 'glow-brat'], ['📱', 'glow-pink'], ['⚡', 'glow-electric'], ['📤', 'glow-brat'],
  ],
  image: [
    ['💬', 'glow-electric'], ['🌈', 'glow-pink'], ['🧩', 'glow-brat'], ['✨', 'glow-electric'], ['📋', 'glow-pink'], ['🗂️', 'glow-brat'],
  ],
  album: [
    ['💿', 'glow-brat'], ['🎵', 'glow-electric'], ['📸', 'glow-pink'], ['🎚️', 'glow-brat'], ['👁️', 'glow-electric'], ['⬇️', 'glow-pink'],
  ],
};

const featureCopyByMode: Record<ToolMode, string> = {
  text: 'Six focused controls cover the core Brat text workflow from styling and preview to export.',
  meme: 'Six practical features cover photo input, meme text, social-ready sizing and clean image export.',
  image: 'Six focused features cover text, colours, canvas ratios, instant preview and flexible image export.',
  album: 'Six essential features cover cover size, title and artist text, backgrounds, styling, preview and export.',
};

const useCaseDecorByMode: Record<ToolMode, Array<[string, string]>> = {
  text: [
    ['✍️', 'glow-brat'], ['📱', 'glow-pink'], ['🖼️', 'glow-electric'],
  ],
  meme: [
    ['😹', 'glow-pink'], ['🎧', 'glow-electric'], ['📲', 'glow-brat'],
  ],
  image: [
    ['👤', 'glow-electric'], ['📱', 'glow-pink'], ['🖥️', 'glow-brat'],
  ],
  album: [
    ['💿', 'glow-brat'], ['🎶', 'glow-electric'], ['📣', 'glow-pink'],
  ],
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
  faqs = [],
  faqIntro = 'Clear answers to the questions people usually have before creating and exporting.',
  applicationCategory = 'DesignApplication',
}: Props) {
  const canonical = `${siteConfig.url}/${slug}/`;
  const appId = `${canonical}#app`;
  const featureDecor = featureDecorByMode[mode];
  const useCaseDecor = useCaseDecorByMode[mode];

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/` },
    { name, url: canonical },
  ]);

  const appSchema = softwareApplicationSchema({
    id: appId,
    name,
    url: canonical,
    applicationCategory,
    browserRequirements: 'Requires JavaScript and a modern web browser',
    description: schemaDescription,
    featureList: features.map(([heading]) => heading),
  });

  const pageSchema = webPageSchema({
    url: canonical,
    name,
    description: schemaDescription,
    dateModified: '2026-09-25',
    mainEntity: { '@id': appId },
  });

  const faqSchema = faqs.length ? faqPageSchema(faqs, canonical) : null;

  return (
    <>
      <JsonLd data={[breadcrumb, pageSchema, appSchema, ...(faqSchema ? [faqSchema] : [])]} />
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
              <h2 className="single-line-heading">How to Use the <span className="text-brat">{name}</span></h2>
              <p>Four quick steps are enough: add your content, customise the style, check the preview, then export.</p>
            </div>
            <div className="guide-step-list compact-howto-grid">
              {howTo.map(([heading, body], index) => (
                <article className="glass guide-step reveal" key={heading}>
                  <HowToImage
                    className="guide-step-image"
                    src={`/images/how-to/${howToImagePrefix[mode]}-step-${index + 1}.webp`}
                    alt={`${name}: ${heading} step screenshot`}
                    width={132}
                    height={132}
                  />
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
              <h2>{name} <span className="text-electric">Features</span></h2>
              <p>{featureCopyByMode[mode]}</p>
            </div>
            <div className="card-grid feature-grid home-feature-grid tool-feature-grid">
              {features.slice(0, 6).map(([heading, body], index) => (
                <div className={`reveal reveal-delay-${index % 3}`} key={heading}>
                  <article className={`glass info-card ${featureDecor[index % featureDecor.length][1]} hover-lift`}>
                    <div className="emoji">{featureDecor[index % featureDecor.length][0]}</div>
                    <h3>{heading}</h3>
                    <p>{body}</p>
                  </article>
                </div>
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
              {useCases.map(([heading, body], index) => (
                <article className={`glass info-card reveal ${useCaseDecor[index % useCaseDecor.length][1]} hover-lift`} key={heading}>
                  <div className="emoji">{useCaseDecor[index % useCaseDecor.length][0]}</div>
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
          </div>
        </section>

        {faqs.length ? (
          <section className="section section-card tool-faq-section" id="faq">
            <div className="container container-faq">
              <div className="section-heading reveal">
                <p className="eyebrow">FAQ</p>
                <h2>Frequently Asked <span className="text-brat">Questions</span></h2>
                <p>{faqIntro}</p>
              </div>
              <div className="accordion-list">
                {faqs.map(([question, answer]) => (
                  <details className="glass accordion compact reveal" key={question}>
                    <summary>{question}<span>⌄</span></summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
