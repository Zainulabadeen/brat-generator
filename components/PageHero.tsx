import Breadcrumbs from '@/components/Breadcrumbs';

export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}) {
  const colonIndex = accent ? title.indexOf(':') : -1;

  const firstLine = colonIndex >= 0
    ? title.slice(0, colonIndex + 1).trim()
    : title.trim();

  const titleRemainder = colonIndex >= 0
    ? title.slice(colonIndex + 1).trim()
    : '';

  const secondLine = accent
    ? [titleRemainder, accent].filter(Boolean).join(' ')
    : '';

  return (
    <section className="inner-hero page-hero-section">
      <div className="hero-blobs" aria-hidden="true">
        <span className="blob blob-green" />
        <span className="blob blob-pink" />
        <span className="blob blob-blue" />
      </div>
      <div className="container container-hero inner-hero-content">
        {breadcrumbs?.length ? (
          <div className="page-hero-breadcrumb reveal is-visible">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        ) : (
          <div className="page-hero-kicker reveal is-visible">{eyebrow}</div>
        )}
        <h1 className="inner-hero-title reveal is-visible hero-delay-1">
          <span className="inner-hero-title-main">{firstLine}</span>
          {secondLine ? (
            <span className="inner-hero-title-accent text-brat">{secondLine}</span>
          ) : null}
        </h1>
        <p className="inner-hero-copy reveal is-visible hero-delay-2">{description}</p>
      </div>
    </section>
  );
}
