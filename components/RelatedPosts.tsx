import RelatedPages from '@/components/RelatedPages';

type RelatedPostsProps = {
  currentSlug: string;
};

const blogPosts = [
  {
    slug: 'how-to-make-a-brat-album-cover-free',
    href: '/blog/how-to-make-a-brat-album-cover-free/',
    eyebrow: 'Album Cover Guide',
    title: 'How to Make a Brat Album Cover Free',
    description: 'Learn the Brat-inspired colour, typography, blur, sizing, and four-step workflow for creating an album cover in your browser.',
    accent: 'green' as const,
  },
  {
    slug: 'brat-generator-not-working',
    href: '/blog/brat-generator-not-working/',
    eyebrow: 'Troubleshooting',
    title: 'Brat Generator Not Working? Common Problems & Quick Fixes',
    description: 'Fix download issues, excessive blur, clipped text, colour differences, and confusing mobile download locations with a simple step-by-step checklist.',
    accent: 'blue' as const,
  },
];

export default function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const relatedPosts = blogPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3)
    .map(({ slug: _slug, ...post }) => post);

  if (relatedPosts.length === 0) return null;

  return <RelatedPages title="Related Posts" items={relatedPosts} />;
}
