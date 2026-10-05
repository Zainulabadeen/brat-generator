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

const articleData = getHelpArticle('brat-meme-ideas-templates')!;

export const metadata: Metadata = {
  title: { absolute: articleData.title },
  description: articleData.description,
  alternates: { canonical: articleData.href },
  openGraph: { type: 'article', url: articleData.href, title: articleData.title, description: articleData.description, publishedTime: '2026-10-02T00:00:00Z', modifiedTime: '2026-10-04T00:00:00Z', images: [{ url: articleData.image, width: 1200, height: 720, alt: articleData.imageAlt }] },
  twitter: { card: 'summary_large_image', title: articleData.title, description: articleData.description, images: [articleData.image] },
};

const toc = [
  { href: '#choose-format', label: 'Choose a meme format before you write' },
  { href: '#workflow', label: 'A practical Brat meme workflow' },
  { href: '#ideas', label: 'Brat meme ideas you can adapt' },
  { href: '#writing', label: 'Write text that stays readable' },
  { href: '#backgrounds', label: 'Use flat colours or your own photo' },
  { href: '#sizes', label: 'Pick the right canvas size' },
  { href: '#faq', label: 'Brat meme FAQ' },
] as const;


const faqs = [
  ['How much text should a Brat meme use?', 'Keep the main joke short enough to read at thumbnail size. If the context is longer, put that extra explanation in the social caption instead of shrinking the meme text.'],
  ['Should I use a flat colour or a photo?', 'Use a flat colour when the wording is the whole joke. Use a photo when the expression or scene adds context that the text cannot provide by itself.'],
  ['Which canvas size is safest for a general meme?', 'Square is the safest reusable starting point. Choose portrait, Story, or wide only when you already know the destination needs that shape.'],
] as const;


const ideaRows = [
  ['POV reaction', '“pov: you said you were going home early”', 'One short setup that places the viewer inside the joke.'],
  ['Two-part contrast', '“me making plans” / “me when the day arrives”', 'Use setup and punchline text to show opposite moods.'],
  ['Before / after', '“before the group chat” / “after the group chat”', 'A familiar transformation format that works with text or a background photo.'],
  ['Tiny confession', '“pretending i did not check three times”', 'One self-aware line with a simple flat background.'],
  ['Rating / scale', '“energy level: 2%”', 'A short status format that is easy to remix with colours.'],
  ['Weekend mood', '“friday night” / “sunday afternoon”', 'Two versions of the same idea using different colours or photos.'],
];

export default function BratMemeIdeasTemplatesPage() {
  const canonical = `${siteConfig.url}${articleData.href}`;
  const breadcrumb = breadcrumbSchema(getHelpBreadcrumbSchema('brat-meme-ideas-templates', canonical));
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
              breadcrumbs={getHelpBreadcrumbUi('brat-meme-ideas-templates')}
            />
            <ArticleTableOfContents items={toc} />

            <div className="help-article-intro-body">


              <section id="choose-format" className="help-article-section reveal">
                <h2>Choose a Meme Format Before You Write</h2>
                <p>The <Link className="inline-source-link" href="/brat-meme-generator/">Brat Meme Generator</Link> already handles the mechanics: setup text, punchline text, a flat colour or uploaded photo, styling controls, and social-ready canvas sizes. The creative part is deciding what kind of joke or reaction you want the design to carry.</p>
                <p>Start with the structure, then write the copy. A clear format makes the meme easier to understand and keeps you from forcing too much text into one image.</p>
              </section>


            </div>



            <article className="help-article-body">


              <section id="workflow" className="help-article-section reveal">
                <h2>A Practical Brat Meme Workflow</h2>
                <ol className="article-steps-clean">
                  <li><strong>Pick one meme format.</strong> Reaction, POV, contrast, before/after, or a short status all work without overcomplicating the layout.</li>
                  <li><strong>Write the shortest version of the joke.</strong> You can always add context in the caption outside the image.</li>
                  <li><strong>Choose flat colour or photo.</strong> Let the background support the joke rather than compete with it.</li>
                  <li><strong>Check text size and blur.</strong> Read it at thumbnail size before exporting.</li>
                  <li><strong>Use the correct canvas ratio.</strong> Avoid resizing a finished image into a very different shape.</li>
                  <li><strong>Export and test.</strong> If the file does not download as expected, use the <Link className="inline-source-link" href="/help/brat-generator-not-working/">troubleshooting guide</Link>.</li>
                </ol>
              </section>

              <section id="ideas" className="help-article-section reveal">
                <h2>Brat Meme Ideas You Can Adapt</h2>
                <p>These are flexible starting points, not fixed templates. Change the wording, colours, or photo so the result feels like your own post rather than a copy of someone else’s joke.</p>
                <div className="simple-table article-table" role="region" aria-label="Brat meme idea examples" tabIndex={0}>
                  <table>
                    <thead><tr><th>Format</th><th>Example structure</th><th>Why it works</th></tr></thead>
                    <tbody>{ideaRows.map(([format, example, why]) => <tr key={format}><td>{format}</td><td>{example}</td><td>{why}</td></tr>)}</tbody>
                  </table>
                </div>
                <div className="article-meme-samples" aria-label="Brat meme layout examples">
                  <div className="meme-sample brat-green"><span>pov:</span><strong>one specific moment</strong></div>
                  <div className="meme-sample brat-pink"><span>setup</span><strong>unexpected punchline</strong></div>
                  <div className="meme-sample brat-dark"><span>before</span><strong>after</strong></div>
                </div>
              </section>

              <section id="writing" className="help-article-section reveal">
                <h2>Write Text That Stays Readable</h2>
                <p>Short text is not only more “Brat-like”; it is also easier to read in feeds and at thumbnail size. Keep the setup specific enough to understand quickly, then let the punchline do one job.</p>
                <ul className="article-clean-list">
                  <li>Prefer one clear setup and one clear punchline over a paragraph.</li>
                  <li>If the joke needs context, put the context in the post caption rather than shrinking the meme text.</li>
                  <li>Use lowercase when you want the familiar understated Brat treatment, but prioritise readability over a rule.</li>
                  <li>Reduce blur on small text; a style effect should not hide the joke.</li>
                </ul>
              </section>

              <section id="backgrounds" className="help-article-section reveal">
                <h2>Use Flat Colours or Your Own Photo</h2>
                <p>A flat colour works well when the text is the entire joke. An uploaded reaction photo works better when the expression or scene provides context that the copy alone cannot.</p>
                <p>For a recognisable Brat-style result, use a simple background and strong contrast. For a photo meme, keep the text away from busy areas of the image and use the preview to check that both lines stay legible.</p>
                <p>If you want a pure text graphic rather than a meme layout, switch to the <Link className="inline-source-link" href="/">main Brat Generator</Link>. If you want a more general text-led image, use the <Link className="inline-source-link" href="/brat-image-generator/">Brat Image Generator</Link>.</p>
              </section>

              <section id="sizes" className="help-article-section reveal">
                <h2>Pick the Right Canvas Size</h2>
                <p>The meme tool includes square, portrait, Story, 1200×630 landscape and 1920×1080 wide layouts. Choose the canvas for where the image will appear instead of stretching the final download later.</p>
                <p>Square is a safe all-purpose starting point; portrait uses more vertical feed space; Story fills a phone screen; 1200×630 works for compact horizontal previews; and 1920×1080 gives you a full 16:9 frame. The <Link className="inline-source-link" href="/help/brat-canvas-size-guide/">Canvas Size Guide</Link> compares these layouts in more detail.</p>
              </section>


              <ArticleFaqSection
                faqs={faqs}
                intro="Quick answers about writing, backgrounds, and canvas choices for Brat-style memes."
              />

              <ContextCta
                title="Create Your Brat Meme"
                description="Turn one of these ideas into a finished meme with custom text, colours, photos, and social-ready sizes."
                href="/brat-meme-generator/#tool"
                buttonLabel="Open Brat Meme Generator"
              />

            </article>
          </div>
          <RelatedPostsSidebar currentSlug={articleData.slug} relatedSlugs={['brat-canvas-size-guide','which-brat-tool-should-you-use','brat-video-tips','brat-generator-not-working']} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
