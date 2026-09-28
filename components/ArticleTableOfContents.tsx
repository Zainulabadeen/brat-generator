import Link from 'next/link';

type TocItem = {
  href: string;
  label: string;
  note?: string;
};

type Props = {
  items: readonly TocItem[];
  title?: string;
  description?: string;
};

export default function ArticleTableOfContents({
  items,
  title = 'On this page',
  description = 'Jump straight to the part you need, or read from top to bottom.',
}: Props) {
  return (
    <nav className="article-toc glass reveal" aria-label="Table of contents">
      <div className="article-toc-head">
        <div>
          <p className="eyebrow left">Article Guide</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className="article-toc-badge">Quick navigation</span>
      </div>

      <ol className="article-toc-grid">
        {items.map((item, index) => (
          <li key={item.href}>
            <Link href={item.href}>
              <span className="article-toc-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="article-toc-copy">
                <strong>{item.label}</strong>
                {item.note ? <small>{item.note}</small> : null}
              </span>
              <span className="article-toc-arrow" aria-hidden="true">↘</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
