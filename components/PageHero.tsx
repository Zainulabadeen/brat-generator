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
          {title} {accent ? <span className="text-brat">{accent}</span> : null}
        </h1>
        <p className="inner-hero-copy reveal is-visible hero-delay-2">{description}</p>
      </div>
    </section>
  );
}
