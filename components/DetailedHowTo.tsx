import HowToImage from '@/components/HowToImage';

export type DetailedHowToStep = {
  title: string;
  body: string;
  points: readonly string[];
  tip?: string;
  image: string;
  alt: string;
};

export type GuideDetailSection = {
  eyebrow: string;
  title: string;
  accent?: string;
  accentClass?: 'text-brat' | 'text-pink' | 'text-electric';
  body: string;
  points: readonly string[];
  note?: string;
};

type DetailedHowToProps = {
  id: string;
  toolName: string;
  intro: string;
  steps: readonly DetailedHowToStep[];
};

type GuideDetailSectionsProps = {
  heading: string;
  intro: string;
  sections: readonly GuideDetailSection[];
  eyebrow?: string;
  accent?: string;
  accentClass?: 'text-brat' | 'text-pink' | 'text-electric';
};

export default function DetailedHowTo({ id, toolName, intro, steps }: DetailedHowToProps) {
  return (
    <section className="section section-card detailed-howto-section" id={id}>
      <div className="container container-wide">
        <div className="section-heading reveal">
          <p className="eyebrow">Step-by-Step Tutorial</p>
          <h2 className="single-line-heading">How to Use the <span className="text-brat">{toolName}</span></h2>
          <p>{intro}</p>
        </div>

        <div className="detailed-howto-list">
          {steps.map((step, index) => (
            <article className="glass detailed-howto-step reveal" key={step.title}>
              <div className="detailed-howto-copy">
                <p className="guide-kicker">Step {index + 1}</p>
                <h3>{step.title}</h3>
                <p className="detailed-howto-lead">{step.body}</p>
                <ul className="detailed-howto-points">
                  {step.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                {step.tip ? <div className="detailed-howto-tip"><strong>Quick tip:</strong> {step.tip}</div> : null}
              </div>

              <div className="detailed-howto-media">
                <HowToImage
                  className="guide-step-image"
                  src={step.image}
                  alt={step.alt}
                  width={520}
                  height={700}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GuideDetailSections({
  heading,
  intro,
  sections,
  eyebrow,
  accent,
  accentClass = 'text-electric',
}: GuideDetailSectionsProps) {
  return (
    <section className="section tool-guide-detail-section">
      <div className="container container-wide">
        <div className="section-heading reveal">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2>
            {heading}
            {accent ? <> <span className={accentClass}>{accent}</span></> : null}
          </h2>
          <p>{intro}</p>
        </div>

        <div className="tool-guide-detail-grid">
          {sections.map((section, index) => (
            <article className={`glass tool-guide-detail-card reveal reveal-delay-${index % 3}`} key={section.title}>
              <p className="guide-kicker">{section.eyebrow}</p>
              <h3>
                {section.title}{section.accent ? <> <span className={section.accentClass || 'text-brat'}>{section.accent}</span></> : null}
              </h3>
              <p>{section.body}</p>
              <ul>
                {section.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              {section.note ? <div className="tool-guide-detail-note">{section.note}</div> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
