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
import { articleSchema, breadcrumbSchema, faqPageSchema, organizationEntity, webPageSchema, websiteEntity } from '@/lib/schema';

const articleData = getHelpArticle('which-brat-tool-should-you-use')!;

export const metadata: Metadata = {
  title: { absolute: articleData.title },
  description: articleData.description,
  alternates: { canonical: articleData.href },
  openGraph: { type: 'article', url: articleData.href, title: articleData.title, description: articleData.description, publishedTime: '2026-10-02T00:00:00Z', modifiedTime: '2026-10-04T00:00:00Z', images: [{ url: articleData.image, width: 1200, height: 720, alt: articleData.imageAlt }] },
  twitter: { card: 'summary_large_image', title: articleData.title, description: articleData.description, images: [articleData.image] },
};

const toc = [
  { href: '#quick-choice', label: 'Quick choice: match the tool to the job' },
  { href: '#main-generator', label: 'Use the main Brat Generator for text-first graphics' },
  { href: '#font-generator', label: 'Use the Font Generator for typography-only graphics' },
  { href: '#meme-generator', label: 'Use the Meme Generator for setup-and-punchline posts' },
  { href: '#image-generator', label: 'Use the Image Generator for flexible Brat graphics' },
  { href: '#video-generator', label: 'Use the Video Generator for motion and audio' },
  { href: '#album-generator', label: 'Use the Album Cover Generator for square cover art' },
  { href: '#faq', label: 'Choosing a Brat tool FAQ' },
] as const;


const faqs = [
  ['Which tool should I use for a simple text graphic?', 'Use the main Brat Generator when the text itself is the design and you want direct control over colour, size, spacing, blur, and effects.'],
  ['Which tool should I use for typography or a transparent text overlay?', 'Use the Brat Font Generator when you want focused font, spacing, line-height, alignment and transparent-background controls for text you may reuse in another design.'],
  ['Which tool should I use for a joke with setup and punchline text?', 'Use the Brat Meme Generator because its workflow is built around meme copy and can also use a photo background.'],
  ['Which tool should I use when I need motion or sound?', 'Use the Brat Video Generator for line-based animated text, optional audio, FPS control, and video, GIF, or PNG-frame exports.'],
] as const;


export default function WhichBratToolShouldYouUsePage() {
  const canonical = `${siteConfig.url}${articleData.href}`;
  const breadcrumb = breadcrumbSchema(getHelpBreadcrumbSchema('which-brat-tool-should-you-use', canonical));
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
              breadcrumbs={getHelpBreadcrumbUi('which-brat-tool-should-you-use')}
            />
            <ArticleTableOfContents items={toc} />

            <div className="help-article-intro-body">


              <section id="quick-choice" className="help-article-section reveal">
                <h2>Quick Choice: Match the Tool to the Job</h2>
                <p>All six tools share a Brat-inspired visual language, but they solve different jobs. Start with the output you need, then choose the tool that has the right controls instead of trying to force every project through the main generator.</p>
                <div className="simple-table article-table" role="region" aria-label="Brat Generator tool comparison" tabIndex={0}>
                  <table>
                    <thead><tr><th>Tool</th><th>Best for</th><th>Key controls</th><th>Typical output</th></tr></thead>
                    <tbody>
                      <tr><td><Link className="inline-source-link" href="/">Brat Generator</Link></td><td>Text-first Brat graphics</td><td>Colour, font style, text size, spacing, blur, effects</td><td>PNG, JPG or WebP image</td></tr>
                      <tr><td><Link className="inline-source-link" href="/brat-font-generator/">Font Generator</Link></td><td>Typography-only graphics and text overlays</td><td>Font, letter spacing, line height, alignment, blur, transparency</td><td>Transparent PNG or solid PNG/JPG/WebP</td></tr>
                      <tr><td><Link className="inline-source-link" href="/brat-meme-generator/">Meme Generator</Link></td><td>Setup + punchline memes, reaction images</td><td>Top/bottom text, photo background, colours, effects</td><td>Social-ready image</td></tr>
                      <tr><td><Link className="inline-source-link" href="/brat-image-generator/">Image Generator</Link></td><td>Text-led graphics with optional photo backgrounds</td><td>Text, colours, background image, font, blur, effects, canvas size</td><td>Image in selected ratio</td></tr>
                      <tr><td><Link className="inline-source-link" href="/video-generator/">Video Generator</Link></td><td>Animated text or lyric-style clips</td><td>Line timing, audio trim, FPS, Video/GIF/Frames</td><td>Video, GIF, or PNG-frame ZIP</td></tr>
                      <tr><td><Link className="inline-source-link" href="/brat-album-cover-generator/">Album Cover Generator</Link></td><td>Square album and playlist cover concepts</td><td>Title, artist line, colour/photo background, blur</td><td>3000×3000 cover image</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>


            </div>



            <article className="help-article-body">


              <section id="main-generator" className="help-article-section reveal">
                <h2>Use the Main Brat Generator for Text-First Graphics</h2>
                <p>Choose the main generator when the text itself is the design. It gives you the most direct control over background colour, text colour, font style, size, letter spacing, blur, lowercase, mirror, grain, and export format.</p>
                <p>Use it for short phrases, square graphics, banners and profile images when you do not need meme fields or motion.</p>
              </section>

              <section id="font-generator" className="help-article-section reveal">
                <h2>Use the Brat Font Generator for Typography-Only Graphics</h2>
                <p>Choose the <Link className="inline-source-link" href="/brat-font-generator/">Brat Font Generator</Link> when the lettering itself is the asset you want to reuse. It gives you focused control over typeface, letter spacing, line height, alignment, blur, colour, and transparent background export.</p>
                <p>It fits poster titles, cover lettering, transparent text overlays and social typography.</p>
              </section>

              <section id="meme-generator" className="help-article-section reveal">
                <h2>Use the Meme Generator for Setup-and-Punchline Posts</h2>
                <p>The meme tool is better when the design has a clear top-and-bottom joke, reaction, or caption structure. It also supports a photo background, so you can combine Brat-style text with an image instead of using only a flat colour.</p>
                <p>If you are not sure what to make, the <Link className="inline-source-link" href="/help/brat-meme-ideas-templates/">Brat Meme Ideas & Templates guide</Link> gives you original formats to adapt.</p>
              </section>

              <section id="image-generator" className="help-article-section reveal">
                <h2>Use the Image Generator for Flexible Brat Graphics</h2>
                <p>The image tool is a better fit when you want one text-led graphic rather than a setup-and-punchline meme. You can use a flat colour or upload a background image, then adjust the font, blur, simple effects and canvas size.</p>
                <p>Choose it when you need a square, portrait, Story, landscape or 16:9 version of the same idea.</p>
              </section>

              <section id="video-generator" className="help-article-section reveal">
                <h2>Use the Video Generator for Motion and Audio</h2>
                <p>Use the video tool when your words need to appear in sequence rather than remain on one still image. You can enter line-based text, adjust the relative duration of each line, trim optional audio, preview the result, choose 10–60 FPS, and export as a browser-supported video, GIF, or PNG frames.</p>
                <p>If you are unsure whether to choose Video, GIF or Frames, the <Link className="inline-source-link" href="/help/brat-video-export-guide/">Video Export Guide</Link> explains the differences and current limits.</p>
              </section>

              <section id="album-generator" className="help-article-section reveal">
                <h2>Use the Album Cover Generator for Square Cover Art</h2>
                <p>The album-cover tool is focused on a large 3000×3000 square layout with title and artist/subtitle text, optional photo backgrounds, colour choices, and a Brat-inspired typographic treatment.</p>
                <p>It is the best match when the project is specifically a cover concept, playlist artwork, or a square music-style graphic. The <Link className="inline-source-link" href="/help/how-to-make-a-brat-album-cover-free/">album-cover guide</Link> covers the full workflow.</p>
              </section>
              <ArticleFaqSection
                faqs={faqs}
                intro="Quick answers for choosing between the text, font, meme, image, video, and album-cover tools."
              />

              <ContextCta
                title="Start with the Right Brat Tool"
                description="Start with the workflow that matches your output: quick text, reusable typography, a meme, an image, a video, or album-cover artwork."
                href="/#generator"
                buttonLabel="Open Brat Generator"
              />

            </article>
          </div>
          <RelatedPostsSidebar currentSlug={articleData.slug} relatedSlugs={['brat-canvas-size-guide','brat-meme-ideas-templates','brat-video-export-guide','how-to-make-a-brat-album-cover-free']} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
