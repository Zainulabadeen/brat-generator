import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleTableOfContents from '@/components/ArticleTableOfContents';
import ArticleFaqSection from '@/components/ArticleFaqSection';
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
import { CREATIVE_CANVAS_PRESETS, MAIN_CANVAS_PRESETS, TOOL_CAPABILITIES } from '@/lib/toolCapabilities';
import { articleSchema, breadcrumbSchema, faqPageSchema, organizationEntity, webPageSchema, websiteEntity } from '@/lib/schema';

const articleData = getHelpArticle('brat-canvas-size-guide')!;


const dims = (preset: { width: number; height: number }) => `${preset.width}×${preset.height}`;
const creativeSquare = dims(CREATIVE_CANVAS_PRESETS.find((preset) => preset.label.startsWith('Square'))!);
const portrait = dims(CREATIVE_CANVAS_PRESETS.find((preset) => preset.label.startsWith('Portrait'))!);
const story = dims(CREATIVE_CANVAS_PRESETS.find((preset) => preset.label.startsWith('Story'))!);
const landscape = dims(CREATIVE_CANVAS_PRESETS.find((preset) => preset.label.startsWith('Landscape'))!);
const wide = dims(CREATIVE_CANVAS_PRESETS.find((preset) => preset.label.startsWith('Wide'))!);
const mainSquares = MAIN_CANVAS_PRESETS.filter((preset) => preset.width === preset.height).map(dims).join(' / ');
const albumSquare = TOOL_CAPABILITIES.album.fixedCanvas;

export const metadata: Metadata = {
  title: { absolute: articleData.title },
  description: articleData.description,
  alternates: { canonical: articleData.href },
  openGraph: { type: 'article', url: articleData.href, title: articleData.title, description: articleData.description, publishedTime: '2026-10-02T00:00:00Z', modifiedTime: '2026-10-04T00:00:00Z', images: [{ url: articleData.image, width: 1200, height: 720, alt: articleData.imageAlt }] },
  twitter: { card: 'summary_large_image', title: articleData.title, description: articleData.description, images: [articleData.image] },
};

const toc = [
  { href: '#sizes', label: 'The canvas sizes available in the tools' },
  { href: '#square', label: 'When to use a square canvas' },
  { href: '#portrait', label: 'When to use a portrait canvas' },
  { href: '#story', label: 'When to use a vertical Story canvas' },
  { href: '#wide', label: 'When to use a wide canvas' },
  { href: '#avoid-stretching', label: 'How to avoid stretching and awkward crops' },
  { href: '#faq', label: 'Canvas size FAQ' },
] as const;


const faqs = [
  ['What canvas size should I choose if I am unsure?', 'Square is the safest general-purpose starting point because it is balanced and easy to reuse or crop later.'],
  ['Can I stretch a square image into a Story size?', 'You can resize it, but the spacing and text usually look worse. It is better to start with the vertical Story preset and rebalance the composition.'],
  ['Why should I keep text away from the edges?', 'Platforms can crop previews or place interface elements near the edges, so extra breathing room protects important words.'],
] as const;


export default function BratCanvasSizeGuidePage() {
  const canonical = `${siteConfig.url}${articleData.href}`;
  const breadcrumb = breadcrumbSchema(getHelpBreadcrumbSchema('brat-canvas-size-guide', canonical));
  const pageSchema = webPageSchema({ url: canonical, name: articleData.title, description: articleData.description, dateModified: '2026-10-04', mainEntity: { '@id': `${canonical}#article` }, primaryImageUrl: `${siteConfig.url}${articleData.image}` });
  const article = articleSchema({ pageUrl: canonical, headline: articleData.title, description: articleData.description, imageUrl: articleData.image, datePublished: '2026-10-02T00:00:00+05:00', dateModified: '2026-10-04T00:00:00+05:00' });
  const faqSchema = faqPageSchema(faqs, canonical);

  return (
    <>
      <JsonLd data={[organizationEntity, websiteEntity, breadcrumb, pageSchema, article, faqSchema]} />
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
              breadcrumbs={getHelpBreadcrumbUi('brat-canvas-size-guide')}
            />
            <ArticleTableOfContents items={toc} />

            <div className="help-article-intro-body">


              <section id="sizes" className="help-article-section reveal">
                <h2>The Canvas Sizes Available in the Tools</h2>
                <p>The main image workflows use a small set of practical ratios so you can design for the destination instead of stretching a finished graphic later. The exact options vary slightly by tool.</p>
                <div className="simple-table article-table" role="region" aria-label="Brat Generator canvas size options" tabIndex={0}>
                  <table>
                    <thead><tr><th>Canvas</th><th>Example size</th><th>Best use</th><th>Available in</th></tr></thead>
                    <tbody>
                      <tr><td>Square</td><td>{creativeSquare}, plus {mainSquares} on the main generator</td><td>Cover-style graphics, feed posts, profile images</td><td>Main, Meme, Image, Font</td></tr>
                      <tr><td>Portrait 4:5</td><td>{portrait}</td><td>Vertical feed graphics</td><td>Main, Meme, Image, Font</td></tr>
                      <tr><td>Story 9:16</td><td>{story}</td><td>Full-screen vertical layouts</td><td>Main, Meme, Image, Font</td></tr>
                      <tr><td>Landscape 1.91:1</td><td>{landscape}</td><td>Link previews, banners, horizontal graphics</td><td>Main, Meme, Image, Font</td></tr>
                      <tr><td>Wide 16:9</td><td>{wide}</td><td>Widescreen posts, video-style frames, desktop graphics</td><td>Main, Meme, Image, Font</td></tr>
                      <tr><td>Album cover</td><td>{albumSquare}</td><td>Large square cover artwork</td><td>Album Cover Generator</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="source-note">Platform upload requirements can change. Treat these as design starting points and check the destination platform before final publishing.</p>
              </section>


            </div>



            <article className="help-article-body">


              <section id="square" className="help-article-section reveal">
                <h2>When to Use a Square Canvas</h2>
                <p>Square is the safest general-purpose choice when you are not sure where the image will be reused. It keeps the composition balanced, works naturally for cover-style graphics, and is easy to crop into other shapes later.</p>
                <p>The main generator includes {mainSquares.replaceAll(' / ', ', ')} square presets. The Meme, Image and Font tools use {creativeSquare} as their square preset. For large music-style cover art, the <Link className="inline-source-link" href="/brat-album-cover-generator/">Album Cover Generator</Link> uses {albumSquare}.</p>
              </section>

              <section id="portrait" className="help-article-section reveal">
                <h2>When to Use a Portrait Canvas</h2>
                <p>A {portrait} portrait canvas uses more vertical space than a square while still feeling like a normal feed graphic. It gives longer text or a reaction photo more room without becoming a full-screen Story layout.</p>
                <p>Use portrait when you want extra vertical presence but still need the design to behave like a conventional post rather than a phone-screen takeover.</p>
              </section>

              <section id="story" className="help-article-section reveal">
                <h2>When to Use a Vertical Story Canvas</h2>
                <p>The {story} Story preset is a tall 9:16 layout designed for full-screen vertical use. Because it is much taller than a square, do not simply stretch a square design into it. Reposition the text so the composition looks intentional.</p>
                <ul className="article-clean-list">
                  <li>Keep important text away from the extreme top and bottom edges.</li>
                  <li>Use larger text than you would on a dense square layout.</li>
                  <li>Preview the design at phone size before exporting.</li>
                </ul>
              </section>

              <section id="wide" className="help-article-section reveal">
                <h2>When to Use a Wide Canvas</h2>
                <p>There are two horizontal options across the main, Meme, Image and Font tools: {landscape} for link-style previews and banners, and {wide} for a standard 16:9 frame.</p>
                <p>Choose {landscape} when the destination is a link preview or compact banner. Choose {wide} when you need a true 16:9 canvas. In both cases, re-balance the text instead of stretching a square design.</p>
              </section>

              <section id="avoid-stretching" className="help-article-section reveal">
                <h2>How to Avoid Stretching and Awkward Crops</h2>
                <p>Choose the target shape before export whenever possible. Resizing a finished square into a tall Story or wide banner can distort spacing, crop text, or leave awkward empty areas.</p>
                <ol className="article-steps-clean">
                  <li><strong>Pick the destination first.</strong> Decide whether the final graphic is square, portrait, Story, {landscape} landscape, or {wide} wide.</li>
                  <li><strong>Use the matching built-in preset.</strong> Let the tool create the correct canvas rather than resizing afterward.</li>
                  <li><strong>Re-check text size.</strong> A size that looks balanced on a square may feel too small on a tall canvas.</li>
                  <li><strong>Keep text away from edges.</strong> Give the design breathing room in case another platform adds its own crop or overlay.</li>
                  <li><strong>Create separate versions when needed.</strong> A dedicated vertical or wide design usually looks better than one stretched master file.</li>
                </ol>
              </section>
              <ArticleFaqSection
                faqs={faqs}
                intro="Quick answers about square, portrait, Story, landscape and 16:9 canvas choices for Brat graphics."
              />

              <ContextCta
                title="Create at the Right Size"
                description="Choose the canvas ratio first, then build and export your Brat-style graphic at the size you actually need."
                href="/brat-image-generator/#tool"
                buttonLabel="Open Brat Image Generator"
              />

            </article>
          </div>
          <RelatedPostsSidebar currentSlug={articleData.slug} relatedSlugs={['which-brat-tool-should-you-use','brat-meme-ideas-templates','brat-video-tips','how-to-make-a-brat-album-cover-free']} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
