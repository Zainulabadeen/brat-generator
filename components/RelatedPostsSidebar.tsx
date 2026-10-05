import Image from 'next/image';
import Link from 'next/link';
import { helpArticles } from '@/lib/helpArticles';

export default function RelatedPostsSidebar({ currentSlug, relatedSlugs }: { currentSlug: string; relatedSlugs?: readonly string[] }) {
  const preferred = relatedSlugs?.length
    ? relatedSlugs.map((slug) => helpArticles.find((article) => article.slug === slug)).filter(Boolean)
    : [];

  const preferredSlugs = new Set(preferred.map((article) => article?.slug));
  const remaining = helpArticles.filter((article) => !preferredSlugs.has(article.slug) && article.slug !== currentSlug);
  const posts = [...preferred, ...remaining].filter((article): article is NonNullable<typeof article> => Boolean(article));
  if (!posts.length) return null;

  const [featured, ...rest] = posts;

  return (
    <aside className="article-related-sidebar" aria-label="Related Posts">
      <div className="article-related-panel">
        <h2>Related Posts</h2>

        <Link href={featured.href} className="article-related-featured">
          <Image
            src={featured.image}
            alt={featured.imageAlt}
            width={1200}
            height={720}
            sizes="(max-width: 900px) 92vw, 390px"
            priority={false}
          />
          <h3>{featured.title}</h3>
        </Link>

        <div className="article-related-list">
          {rest.map((post) => (
            <Link href={post.href} className="article-related-card" key={post.slug}>
              <Image
                src={post.image}
                alt={post.imageAlt}
                width={1200}
                height={720}
                sizes="(max-width: 900px) 34vw, 132px"
              />
              <h3>{post.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
