import Link from 'next/link';

type RelatedItem = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  accent?: 'green' | 'pink' | 'blue';
};

export default function RelatedPages({
  title = 'Keep Exploring',
  items,
}: {
  title?: string;
  items: RelatedItem[];
}) {
  return (
    <section className="section related-pages-section">
      <div className="container container-wide">
        <div className="section-heading reveal">
          <p className="eyebrow">Explore</p>
          <h2>{title} <span className="text-brat">Brat Generator</span></h2>
          <p>Move between the tool, guides, styles and resources without losing your place.</p>
        </div>
        <div className="related-pages-grid">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`related-page-card glass reveal reveal-delay-${index % 3} accent-${item.accent ?? 'green'}`}
            >
              <div>
                <span className="related-page-eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <span className="related-page-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
