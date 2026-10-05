import Breadcrumbs from '@/components/Breadcrumbs';
import SiteIcon from '@/components/SiteIcon';

type Props = {
  title: string;
  description: string;
  eyebrow: string;
  published: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
};

export default function HelpArticleHeader({ title, description, eyebrow, published, breadcrumbs }: Props) {
  return (
    <header className="help-article-header reveal is-visible">
      <div className="help-article-header-grid">
        <div className="help-article-header-copy">
          <div className="page-hero-breadcrumb">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <span className="sr-only">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="help-article-description">{description}</p>
          <div className="help-article-meta" aria-label="Article details">
            <span><SiteIcon name="calendar" size={18} /> Updated {published}</span>
            <span className="help-maintained-note">Maintained by Brat Generator · reviewed against the site tools</span>
          </div>
        </div>
      </div>
    </header>
  );
}
