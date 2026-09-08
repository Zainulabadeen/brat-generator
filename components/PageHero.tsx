export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  primaryHref = '/#generator',
  primaryLabel = 'Start Creating →',
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
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
    <section className="inner-hero">
      <div className="hero-blobs" aria-hidden="true">
        <span className="blob blob-green" />
        <span className="blob blob-pink" />
        <span className="blob blob-blue" />
      </div>
      <div className="container container-medium inner-hero-content">
        <p className="eyebrow reveal is-visible">{eyebrow}</p>
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
