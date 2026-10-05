import Link from 'next/link';
import DetailedHowTo, { GuideDetailSections, type DetailedHowToStep, type GuideDetailSection } from '@/components/DetailedHowTo';
import JsonLd from '@/components/JsonLd';
import ContextCta from '@/components/ContextCta';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import SiteIcon, { type SiteIconName } from '@/components/SiteIcon';
import BratCreativeTool from '@/components/BratCreativeTool';
import BratGenerator from '@/components/BratGenerator';
import { siteConfig } from '@/lib/site';
import { HOW_TO_IMAGE_HEIGHT, HOW_TO_IMAGE_WIDTH } from '@/lib/tutorialImages';
import { breadcrumbSchema, faqPageSchema, imageObjectSchema, softwareApplicationSchema, webPageSchema } from '@/lib/schema';

type ToolMode = 'text' | 'meme' | 'image' | 'font' | 'album';

type Props = {
  mode: ToolMode;
  name: string;
  slug: string;
  title: string;
  accent?: string;
  description?: string;
  schemaDescription: string;
  howTo: DetailedHowToStep[];
  guideDetails: GuideDetailSection[];
  features: Array<[string, string]>;
  useCases: Array<[string, string]>;
  tips: string[];
  faqs?: Array<[string, string]>;
  faqIntro?: string;
  applicationCategory?: string;
};


const howToImagePrefix: Record<ToolMode, string> = {
  text: 'main',
  meme: 'meme',
  image: 'image',
  font: 'font',
  album: 'album',
};

const featureDecorByMode: Record<ToolMode, Array<[SiteIconName, string]>> = {
  text: [
    ['eye', 'glow-brat'], ['palette', 'glow-pink'], ['type', 'glow-electric'], ['ratio', 'glow-brat'], ['download', 'glow-pink'], ['unlock', 'glow-electric'],
  ],
  meme: [
    ['smile', 'glow-pink'], ['image', 'glow-electric'], ['pen', 'glow-brat'], ['phone', 'glow-pink'], ['bolt', 'glow-electric'], ['upload', 'glow-brat'],
  ],
  image: [
    ['message', 'glow-electric'], ['palette', 'glow-pink'], ['layers', 'glow-brat'], ['sparkles', 'glow-electric'], ['clipboard', 'glow-pink'], ['folder', 'glow-brat'],
  ],
  font: [
    ['type', 'glow-brat'], ['sliders', 'glow-electric'], ['palette', 'glow-pink'], ['ratio', 'glow-brat'], ['clipboard', 'glow-electric'], ['download', 'glow-pink'],
  ],
  album: [
    ['disc', 'glow-brat'], ['music', 'glow-electric'], ['camera', 'glow-pink'], ['sliders', 'glow-brat'], ['eye', 'glow-electric'], ['download', 'glow-pink'],
  ],
};

const featureCopyByMode: Record<ToolMode, string> = {
  text: 'The main generator keeps the everyday styling, text-fitting and export controls in one place.',
  meme: 'Photo input, two caption fields and social-size exports keep the meme workflow quick without hiding the useful controls.',
  image: 'Use text, colours, an optional background image and a few simple effects to build a reusable Brat-style graphic.',
  font: 'Typography controls focus on font choice, letter spacing, line height, alignment, blur and transparent PNG output.',
  album: 'The cover workspace separates title, artist text, background and styling on a fixed 3000×3000 square canvas.',
};

const howToIntroByMode: Record<ToolMode, string> = {
  text: 'Start with the wording, then style it while watching the live preview. Finish with the canvas and export settings once the design reads clearly.',
  meme: 'Write the joke first, choose the background, then adjust the captions while checking the result at phone size.',
  image: 'Start with the exact text you want to show, choose the visual treatment, then create and review the image before exporting it.',
  font: 'Type your wording first, then shape the typography with font, spacing, line height and alignment while watching the live preview.',
  album: 'Build the cover around the main title first. Add the artist line and background after the title stays readable at thumbnail size.',
};

const guideIntroByMode: Record<ToolMode, string> = {
  text: 'These notes explain the controls that most often change the final result.',
  meme: 'These controls matter most for keeping both the joke and the background easy to read.',
  image: 'These settings control the visual treatment after you have chosen the wording.',
  font: 'These typography and export controls are the ones worth checking before you save the final graphic.',
  album: 'These cover-specific controls help keep the title hierarchy clear and the final square export usable.',
};

const useCaseHeadingByMode: Record<ToolMode, string> = {
  text: 'Where the Main Generator Works Best',
  meme: 'When to Use the Meme Generator',
  image: 'Best Uses for Text-Led Brat Graphics',
  font: 'Where Font Graphics Work Best',
  album: 'What You Can Make With It',
};

const featureHeadingByMode: Record<ToolMode, string> = {
  text: 'What You Can Customize',
  meme: 'What the Meme Generator Can Do',
  image: 'What the Image Generator Can Do',
  font: 'Typography Features That Matter',
  album: 'Cover-Building Features',
};

const tipHeadingByMode: Record<ToolMode, string> = {
  text: 'Before You Export',
  meme: 'Keep the Joke Readable',
  image: 'Keep the Graphic Clear',
  font: 'Keep the Typography Balanced',
  album: 'Check the Cover at Thumbnail Size',
};


const useCaseDecorByMode: Record<ToolMode, Array<[SiteIconName, string]>> = {
  text: [
    ['pen', 'glow-brat'], ['phone', 'glow-pink'], ['image', 'glow-electric'],
  ],
  meme: [
    ['smile', 'glow-pink'], ['headphones', 'glow-electric'], ['phone', 'glow-brat'],
  ],
  image: [
    ['user', 'glow-electric'], ['phone', 'glow-pink'], ['desktop', 'glow-brat'],
  ],
  font: [
    ['type', 'glow-brat'], ['image', 'glow-electric'], ['phone', 'glow-pink'],
  ],
  album: [
    ['disc', 'glow-brat'], ['music', 'glow-electric'], ['megaphone', 'glow-pink'],
  ],
};

const toolContextByMode = {
  text: <>Need help choosing a layout? The <Link className="inline-source-link" href="/help/brat-canvas-size-guide/">canvas size guide</Link> compares the common options.</>,
  meme: <>Need a starting idea? Browse the <Link className="inline-source-link" href="/help/brat-meme-ideas-templates/">Brat meme ideas guide</Link>.</>,
  image: <>If the photo itself carries the joke, the <Link className="inline-source-link" href="/brat-meme-generator/">Brat Meme Generator</Link> is the better fit.</>,
  font: <>Need a colour direction before styling the type? Compare the options in <Link className="inline-source-link" href="/brat-styles/">Brat Styles</Link>.</>,
  album: <>For composition and sizing help, follow the <Link className="inline-source-link" href="/help/how-to-make-a-brat-album-cover-free/">album cover guide</Link>.</>,
} as const;


const ctaCopyByMode: Record<ToolMode, { title: string; description: string; buttonLabel: string }> = {
  text: { title: 'Create Your Brat Design Now', description: 'Start with text, then refine colour, spacing, blur, effects, and export size.', buttonLabel: 'Start Creating' },
  meme: { title: 'Create Your Brat Meme Now', description: 'Add setup and punchline text, use a flat colour or photo, then export a social-ready meme.', buttonLabel: 'Start Creating' },
  image: { title: 'Create Your Brat Image Now', description: 'Choose the canvas ratio, add your text and colours, preview the design, and export the final image.', buttonLabel: 'Start Creating' },
  font: { title: 'Create Your Brat Typography Now', description: 'Set the wording, font, letter spacing, line height, blur and alignment, then export a solid-background image or transparent PNG.', buttonLabel: 'Start Creating' },
  album: { title: 'Create Your Brat Album Cover Now', description: 'Build square cover artwork with title, artist text, colour or photo background, blur, and high-resolution export.', buttonLabel: 'Start Creating' },
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
  guideDetails,
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
    dateModified: '2026-10-04',
    mainEntity: { '@id': appId },
  });

  const faqSchema = faqs.length ? faqPageSchema(faqs, canonical) : null;
  const tutorialImageSchemas = howTo.map((step, index) => imageObjectSchema({
    pageUrl: canonical,
    idSuffix: `howto-image-${index + 1}`,
    url: `/images/how-to/${howToImagePrefix[mode]}-step-${index + 1}.webp`,
    caption: `${name} step ${index + 1}: ${step.title}`,
    description: `${name} tutorial illustration showing ${step.title.toLowerCase()}.`,
    width: HOW_TO_IMAGE_WIDTH,
    height: HOW_TO_IMAGE_HEIGHT,
  }));

  return (
    <>
      <JsonLd data={[breadcrumb, pageSchema, appSchema, ...(faqSchema ? [faqSchema] : []), ...tutorialImageSchemas]} />
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

        <DetailedHowTo
          id="how-to-use"
          toolName={name}
          intro={howToIntroByMode[mode]}
          steps={howTo.map((step, index) => ({
            ...step,
            image: `/images/how-to/${howToImagePrefix[mode]}-step-${index + 1}.webp`,
            alt: `${name} tutorial image showing ${step.title.toLowerCase()}`,
          }))}
        />

        <GuideDetailSections
          heading={`${name} Controls`}
          intro={guideIntroByMode[mode]}
          sections={guideDetails}
        />

        <section className="section" id="features">
          <div className="container container-wide">
            <div className="section-heading reveal">
              <p className="eyebrow">Key Features</p>
              <h2>{featureHeadingByMode[mode]}</h2>
              <p>{featureCopyByMode[mode]} {toolContextByMode[mode]}</p>
            </div>
            <div className="card-grid feature-grid home-feature-grid tool-feature-grid">
              {features.slice(0, 6).map(([heading, body], index) => (
                <div className={`reveal reveal-delay-${index % 3}`} key={heading}>
                  <article className={`glass info-card ${featureDecor[index % featureDecor.length][1]} hover-lift`}>
                    <div className="emoji"><SiteIcon name={featureDecor[index % featureDecor.length][0]} size={27} /></div>
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
              <h2>{useCaseHeadingByMode[mode]}</h2>
            </div>
            <div className="card-grid three">
              {useCases.map(([heading, body], index) => (
                <article className={`glass info-card reveal ${useCaseDecor[index % useCaseDecor.length][1]} hover-lift`} key={heading}>
                  <div className="emoji"><SiteIcon name={useCaseDecor[index % useCaseDecor.length][0]} size={27} /></div>
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
              <h2>{tipHeadingByMode[mode]}</h2>
            </div>
            <div className="card-grid three tool-tip-grid">
              {tips.map((tip, index) => (
                <article className="glass info-card reveal" key={tip}>
                  <div className="emoji"><SiteIcon name={(['sparkles','compare','download'] as SiteIconName[])[index % 3]} size={27} /></div>
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

        {faqs.length ? (
          <ContextCta
            title={ctaCopyByMode[mode].title}
            description={ctaCopyByMode[mode].description}
            href="#tool"
            buttonLabel={ctaCopyByMode[mode].buttonLabel}
          />
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
