import SiteIcon from '@/components/SiteIcon';
type Props = {
  faqs: readonly (readonly [string, string])[];
  intro?: string;
};

export default function ArticleFaqSection({
  faqs,
  intro = 'Clear answers to the most common questions about this guide.',
}: Props) {
  if (!faqs.length) return null;

  return (
    <section id="faq" className="help-article-section article-faq-section reveal">
      <div className="section-heading article-faq-heading">
        <p className="eyebrow">FAQ</p>
        <h2>Frequently Asked <span className="text-brat">Questions</span></h2>
        <p>{intro}</p>
      </div>
      <div className="accordion-list article-faq-list">
        {faqs.map(([question, answer]) => (
          <details className="glass accordion compact" key={question}>
            <summary>{question}<span aria-hidden="true"><SiteIcon name="chevronDown" size={16} /></span></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
