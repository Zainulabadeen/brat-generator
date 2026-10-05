import Link from 'next/link';
import SiteIcon from '@/components/SiteIcon';

type Props = {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
};

export default function ContextCta({ title, description, href, buttonLabel }: Props) {
  return (
    <section className="context-cta-section reveal" aria-label={title}>
      <div className="context-cta-card">
        <div className="context-cta-glow context-cta-glow-left" aria-hidden="true" />
        <div className="context-cta-glow context-cta-glow-right" aria-hidden="true" />
        <p className="context-cta-kicker">Ready to create?</p>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link className="context-cta-button" href={href}>{buttonLabel} <span aria-hidden="true"><SiteIcon name="arrowRight" size={15} /></span></Link>
      </div>
    </section>
  );
}
