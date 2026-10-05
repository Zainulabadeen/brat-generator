import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ArticleTableOfContents from '@/components/ArticleTableOfContents';
import BratCreativeTool from '@/components/BratCreativeTool';
import ContextCta from '@/components/ContextCta';
import HelpArticleHeader from '@/components/HelpArticleHeader';
import JsonLd from '@/components/JsonLd';
import RelatedPostsSidebar from '@/components/RelatedPostsSidebar';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getHelpArticle } from '@/lib/helpArticles';
import { getHelpBreadcrumbSchema, getHelpBreadcrumbUi } from '@/lib/helpBreadcrumbs';
import { siteConfig } from '@/lib/site';
import { articleSchema, breadcrumbSchema, organizationEntity, webPageSchema, websiteEntity } from '@/lib/schema';

const articleData = getHelpArticle('how-to-make-a-brat-album-cover-free')!;

export const metadata: Metadata = {
  title: { absolute: 'How to Make a Brat Album Cover Free | Brat Generator' },
  description: 'Learn how to make a Brat album cover in four simple steps using the right colour, font, blur, and image size. Create yours with no sign-up or watermark.',
  alternates: { canonical: articleData.href },
  openGraph: {
    type: 'article',
    url: articleData.href,
    title: articleData.title,
    description: articleData.description,
    publishedTime: '2026-07-18T00:00:00Z',
    modifiedTime: '2026-10-05T00:00:00Z',
    images: [{ url: articleData.image, width: 1200, height: 720, alt: articleData.imageAlt }],
  },
  twitter: { card: 'summary_large_image', title: articleData.title, description: articleData.description, images: [articleData.image] },
};

const toc = [
  { href: '#cover-look', label: 'What makes the Brat cover look work?' },
  { href: '#create-cover', label: 'Create alongside the guide' },
  { href: '#colour-type-blur', label: 'Colour, typography and blur' },
  { href: '#four-steps', label: 'Make a cover in four steps' },
  { href: '#cover-ideas', label: 'Original cover ideas' },
  { href: '#cover-sizes', label: 'Cover sizes and platform formats' },
  { href: '#platform-use', label: 'Music and social platform use' },
  { href: '#compare-editors', label: 'Generator vs Canva vs Photoshop' },
  { href: '#cover-problems', label: 'Common cover problems' },
] as const;

const coverSteps = [
  ['01', 'Enter Your Cover Text', 'Pick something short: one word, a brief phrase, an artist name, or a playlist title. Short text stays readable when it is condensed and blurred. Use existing Brat-era track titles only as style references rather than copying someone else’s artwork.'],
  ['02', 'Choose the Background Colour', 'Start with the lime-green preset if you want the classic Brat-inspired look. The generator uses #8ACE00 as a common digital approximation, but you can also choose pink, white, black, blue, or any custom colour.'],
  ['03', 'Adjust Font, Size & Blur', 'Set the font, size and alignment until the title fills the cover comfortably, then add blur gradually. The goal is slightly imperfect rather than unreadable. Check the design at a smaller size before exporting.'],
  ['04', 'Preview & Download the Cover', 'Review the fixed 3000×3000 square canvas at both full size and thumbnail size. PNG is a strong quality-first master; JPG and WebP are useful when you need a smaller file.'],
] as const;

export default function AlbumCoverGuidePage() {
  const canonical = `${siteConfig.url}${articleData.href}`;
  const breadcrumb = breadcrumbSchema(getHelpBreadcrumbSchema(articleData.slug, canonical));
  const pageSchema = webPageSchema({
    url: canonical,
    name: articleData.title,
    description: articleData.description,
    dateModified: '2026-10-05',
    mainEntity: { '@id': `${canonical}#article` },
    primaryImageUrl: `${siteConfig.url}${articleData.image}`,
  });
  const article = articleSchema({
    pageUrl: canonical,
    headline: articleData.title,
    description: articleData.description,
    imageUrl: articleData.image,
    datePublished: '2026-07-18T00:00:00+05:00',
    dateModified: '2026-10-05T00:00:00+05:00',
  });

  return (
    <>
      <JsonLd data={[organizationEntity, websiteEntity, breadcrumb, pageSchema, article]} />
      <RevealSetup />
      <SiteHeader />
      <main id="main-content" className="help-article-modern">
        <div className="help-article-soft-bg" aria-hidden="true" />
        <div className="container container-wide help-article-layout">
          <div className="help-article-main">
            <HelpArticleHeader
              title={articleData.title}
              description={articleData.description}
              eyebrow={articleData.eyebrow}
              published={articleData.modified}
              breadcrumbs={getHelpBreadcrumbUi(articleData.slug)}
            />
            <ArticleTableOfContents items={toc} />

            <div className="help-article-intro-body">
              <section id="cover-look" className="help-article-section reveal">
                <h2>What Makes the Brat Album Cover Look Work?</h2>
                <p>Charli XCX released <em>Brat</em> in June 2024, and the cover quickly became shorthand for a wider “Brat Summer” moment. Its cultural reach grew beyond the artwork itself: <a className="inline-source-link" href="https://blog.collinsdictionary.com/language-lovers/a-year-when-hedonism-and-anxiety-combine/" target="_blank" rel="noopener noreferrer">Collins Dictionary later named “brat” its 2024 Word of the Year</a>, and the <a className="inline-source-link" href="https://www.brits.co.uk/news/2025/brat-wins-mastercard-album/" target="_blank" rel="noopener noreferrer">BRIT Awards recognised <em>BRAT</em> as Album of the Year in 2025</a>.</p>
                <p>The visual treatment is deliberately spare: flat colour, condensed lowercase typography, soft edges, and almost no ornamental detail. That combination matters more than copying any one font or colour value exactly.</p>
              </section>
            </div>

            <article className="help-article-body">
              <section id="create-cover" className="help-article-section reveal">
                <h2>Create Alongside the Guide</h2>
                <p>The dedicated Album Cover Generator below uses a fixed 3000×3000 square canvas with separate title and artist text, colour or photo backgrounds, font controls, alignment and blur. You can follow the guide without opening another page.</p>
                <div className="help-inline-tool">
                  <BratCreativeTool mode="album" />
                </div>
              </section>

              <section id="colour-type-blur" className="help-article-section reveal">
                <h2>Colour, Typography and Blur</h2>
                <h3>The Brat green colour</h3>
                <p>The generator uses <strong>#8ACE00</strong> as its default Brat Green preset. Different screens can display the same hex value differently, so treat it as a consistent digital starting point rather than an official print colour.</p>
                <div className="simple-table article-table" role="region" aria-label="Brat green colour values" tabIndex={0}>
                  <table>
                    <thead><tr><th>Colour detail</th><th>Value</th></tr></thead>
                    <tbody>
                      <tr><td>Digital preset</td><td>#8ACE00</td></tr>
                      <tr><td>RGB</td><td>138, 206, 0</td></tr>
                      <tr><td>Generator default</td><td>Brat Green</td></tr>
                    </tbody>
                  </table>
                </div>
                <h3>The font and typography</h3>
                <p>The exact source typeface is debated. Arial Narrow and similar condensed sans-serif fonts are useful approximations, but the recognisable look also depends on sizing, spacing, distortion and blur. The cover tool gives you condensed system-font choices plus text size, alignment, line height and blur controls.</p>
                <h3>The soft, slightly rough blur</h3>
                <p>Use blur lightly. Too much makes the words dissolve; too little leaves the title looking like clean digital type. Check the result at thumbnail size and reduce the blur if readability drops.</p>
              </section>

              <section id="four-steps" className="help-article-section reveal">
                <h2>How to Make a Brat Album Cover in 4 Steps</h2>
                <p>Use the same order in the <Link className="inline-source-link" href="/brat-album-cover-generator/">Brat Album Cover Generator</Link> so each decision builds on the one before it.</p>
                <div className="guide-step-list">
                  {coverSteps.map(([number, title, body], index) => (
                    <div className={`glass guide-step reveal reveal-delay-${index % 3}`} key={number}>
                      <div className="guide-step-no">{number}</div>
                      <div><h3>{title}</h3><p>{body}</p></div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="cover-ideas" className="help-article-section reveal">
                <h2>Original Brat Album Cover Ideas</h2>
                <p>These examples keep the same minimal, condensed treatment while changing the mood through colour.</p>
                <div className="example-gallery">
                  <figure className="example-card glass reveal">
                    <Image src="/images/brat-cover-example-green.webp" alt="Green Brat-style album cover idea with black condensed text reading your album" width={1200} height={1200} sizes="(max-width: 760px) 88vw, 30vw" />
                    <figcaption><strong>Classic green:</strong> start with #8ACE00, dark text, and only enough blur to soften the edges.</figcaption>
                  </figure>
                  <figure className="example-card glass reveal reveal-delay-1">
                    <Image src="/images/brat-cover-example-black.webp" alt="Black Brat-style album cover idea with green condensed text reading late night" width={1200} height={1200} sizes="(max-width: 760px) 88vw, 30vw" />
                    <figcaption><strong>Dark variation:</strong> reverse the contrast with a black background and Brat Green text.</figcaption>
                  </figure>
                  <figure className="example-card glass reveal reveal-delay-2">
                    <Image src="/images/brat-cover-example-pink.webp" alt="Pink Brat-style album cover idea with dark condensed text reading main character" width={1200} height={1200} sizes="(max-width: 760px) 88vw, 30vw" />
                    <figcaption><strong>Pink variation:</strong> keep the flat background and minimal typography while changing the mood.</figcaption>
                  </figure>
                </div>
              </section>

              <section id="cover-sizes" className="help-article-section reveal">
                <h2>Brat Album Cover Sizes for Different Uses</h2>
                <p>Use a high-resolution square as the cover master, then make separate vertical or wide versions for social platforms instead of stretching the square artwork.</p>
                <div className="simple-table article-table" role="region" aria-label="Brat album cover size guide" tabIndex={0}>
                  <table>
                    <thead><tr><th>Platform or use</th><th>Recommended starting size</th><th>Aspect ratio</th></tr></thead>
                    <tbody>
                      <tr><td>Music platform artwork</td><td>High-resolution square; check the service or distributor specs</td><td>1:1</td></tr>
                      <tr><td>Playlist / library artwork</td><td>High-resolution square; check the destination specs</td><td>1:1</td></tr>
                      <tr><td>Instagram feed square</td><td>1080 × 1080 px</td><td>1:1</td></tr>
                      <tr><td>Instagram Story / TikTok</td><td>1080 × 1920 px</td><td>9:16</td></tr>
                      <tr><td>YouTube thumbnail</td><td>1280 × 720 px</td><td>16:9</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="article-note">Upload specifications can change. Confirm the destination platform’s latest requirements before publishing final artwork.</p>
              </section>

              <section id="platform-use" className="help-article-section reveal">
                <h2>Music and Social Platform Use</h2>
                <h3>Spotify, Apple Music, Bandcamp and SoundCloud</h3>
                <p>Square artwork is a practical starting point because music covers are commonly displayed in square grids and thumbnails. Keep important text away from the edges so minor resizing or cropping does not cut it off.</p>
                <h3>Instagram, TikTok and social media</h3>
                <p>The Album Cover Generator stays square at 3000×3000. If you need a Story, portrait or wide social version, rebuild the composition in the <Link className="inline-source-link" href="/brat-image-generator/">Brat Image Generator</Link> instead of stretching the square cover.</p>
              </section>

              <section id="compare-editors" className="help-article-section reveal">
                <h2>Brat Album Cover Generator vs Canva vs Photoshop</h2>
                <p>A dedicated generator is quickest for this one visual style; broader editors make more sense when you need complex layouts or deeper compositing.</p>
                <div className="simple-table article-table" role="region" aria-label="Brat album cover generator vs Canva vs Photoshop" tabIndex={0}>
                  <table>
                    <thead><tr><th>Point</th><th>Brat album cover generator</th><th>Canva</th><th>Photoshop</th></tr></thead>
                    <tbody>
                      <tr><td>Starting point</td><td>Brat-inspired controls are ready</td><td>Build the look inside a general editor</td><td>Build the look with type, layers and effects</td></tr>
                      <tr><td>Speed for this style</td><td>Fast and focused</td><td>More setup but broader templates</td><td>More setup with deeper control</td></tr>
                      <tr><td>Best for</td><td>Quick covers, playlist art and social graphics</td><td>Multi-purpose design projects</td><td>Advanced editing and compositing</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="cover-problems" className="help-article-section reveal">
                <h2>Common Brat Album Cover Problems</h2>
                <h3>The text becomes unreadable after blur</h3>
                <p>Reduce the blur first, then increase contrast or simplify the wording. The effect should soften the letters without making them disappear at thumbnail size.</p>
                <h3>The cover gets cropped on a platform</h3>
                <p>Keep important text away from the edges and make a separate vertical version for Stories or TikTok instead of stretching a square cover.</p>
                <h3>The downloaded image looks pixelated</h3>
                <p>Export the high-resolution square directly from the cover tool and avoid enlarging a smaller download afterward. For browser and download problems, see the <Link className="inline-source-link" href="/help/brat-generator-not-working/">Brat Generator troubleshooting guide</Link>.</p>
              </section>

              <ContextCta
                title="Create Your Brat Album Cover"
                description="Use the dedicated cover maker for square Brat-style artwork with title, artist text, colours, blur, and high-resolution export."
                href="/brat-album-cover-generator/#tool"
                buttonLabel="Open Brat Album Cover Generator"
              />
            </article>
          </div>

          <RelatedPostsSidebar
            currentSlug={articleData.slug}
            relatedSlugs={['brat-canvas-size-guide', 'which-brat-tool-should-you-use', 'brat-meme-ideas-templates', 'brat-generator-not-working']}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
