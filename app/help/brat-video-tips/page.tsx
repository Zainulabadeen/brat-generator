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

const articleData = getHelpArticle('brat-video-tips')!;

export const metadata: Metadata = {
  title: { absolute: articleData.title },
  description: articleData.description,
  alternates: { canonical: articleData.href },
  openGraph: { type: 'article', url: articleData.href, title: articleData.title, description: articleData.description, publishedTime: '2026-10-02T00:00:00Z', modifiedTime: '2026-10-04T00:00:00Z', images: [{ url: articleData.image, width: 1200, height: 720, alt: articleData.imageAlt }] },
  twitter: { card: 'summary_large_image', title: articleData.title, description: articleData.description, images: [articleData.image] },
};

const toc = [
  { href: '#text', label: 'Keep moving text easy to read' },
  { href: '#timing', label: 'Build a cleaner text sequence' },
  { href: '#fps', label: 'Choose FPS without overdoing it' },
  { href: '#audio', label: 'Use audio without creating compatibility problems' },
  { href: '#preview', label: 'Preview before you render' },
  { href: '#workflow', label: 'A practical video workflow' },
  { href: '#faq', label: 'Brat video tips FAQ' },
] as const;


const faqs = [
  ['What FPS should I start with?', 'Start around 24 to 30 FPS for a normal test export. Increase it only when the smoother motion is visibly worth the extra browser work.'],
  ['Why does moving text become hard to read?', 'Each line has less viewing time than a static image. Shorten the line, reduce visual effects, or give the sequence more breathing room.'],
  ['Which audio format is the safest fallback?', 'MP3 or WAV is a practical compatibility-first fallback when another accepted format does not decode reliably in your browser.'],
] as const;


export default function BratVideoTipsPage() {
  const canonical = `${siteConfig.url}${articleData.href}`;
  const breadcrumb = breadcrumbSchema(getHelpBreadcrumbSchema('brat-video-tips', canonical));
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
              breadcrumbs={getHelpBreadcrumbUi('brat-video-tips')}
            />
            <ArticleTableOfContents items={toc} />

            <div className="help-article-intro-body">


              <section id="text" className="help-article-section reveal">
                <h2>Keep Moving Text Easy to Read</h2>
                <p>Moving text gets less reading time than a static graphic, so clarity matters more than filling every line. The <Link className="inline-source-link" href="/video-generator/">Brat Video Generator</Link> works best when each line is treated like one short visual beat rather than a full paragraph.</p>
                <ul className="article-clean-list">
                  <li>Use one short thought per line instead of squeezing a sentence into a single frame.</li>
                  <li>Break long text into two or more lines before creating the sequence.</li>
                  <li>Keep punctuation only where it helps the meaning; extra symbols add visual noise.</li>
                  <li>Check the preview at normal browser size, not only while zoomed in.</li>
                </ul>
                <p>A good test is simple: if you have to stop the preview to read a line, shorten it or give it more time.</p>
              </section>


            </div>



            <article className="help-article-body">


              <section id="timing" className="help-article-section reveal">
                <h2>Build a Cleaner Text Sequence</h2>
                <p>The tool turns each non-empty line into a timed segment. It is not an automatic word-by-word lyric transcriber, but you can adjust the relative duration of each line after creating the sequence.</p>
                <div className="simple-table article-table" role="region" aria-label="Brat video text sequence examples" tabIndex={0}>
                  <table>
                    <thead><tr><th>Text approach</th><th>Result</th><th>Better choice</th></tr></thead>
                    <tbody>
                      <tr><td>One long paragraph</td><td>Hard to scan while moving</td><td>Split it into short lines</td></tr>
                      <tr><td>Many one-word lines</td><td>Can feel too fast or repetitive</td><td>Group words into readable phrases</td></tr>
                      <tr><td>Short phrases with clear breaks</td><td>Easy to follow</td><td>Best starting structure</td></tr>
                    </tbody>
                  </table>
                </div>
                <p>If you are working with a hook or lyric, put the natural phrase breaks into the textarea first, then give the important lines more duration and short transitions less. That keeps the timing deliberate without forcing every line to stay on screen for the same amount of time.</p>
              </section>

              <section id="fps" className="help-article-section reveal">
                <h2>Choose FPS Without Overdoing It</h2>
                <p>The video tool offers 10–60 FPS. Higher FPS can make motion smoother, but it also means the browser has to create more visual information during export. More is not automatically better for a simple text animation.</p>
                <div className="article-comparison-cards">
                  <div><strong>10–20 FPS</strong><span>Useful for testing or deliberately simple motion.</span></div>
                  <div><strong>24–30 FPS</strong><span>A practical default for most finished text-led clips.</span></div>
                  <div><strong>40–60 FPS</strong><span>Use only when the smoother motion is worth the extra processing.</span></div>
                </div>
                <p>Start at 30 FPS, preview the result, and move higher only if you can see a real improvement. If a browser struggles during export, lowering FPS is one of the first things to try.</p>
              </section>

              <section id="audio" className="help-article-section reveal">
                <h2>Use Audio Without Creating Compatibility Problems</h2>
                <p>The upload field accepts MP3, WAV, M4A, AAC, and OGG. The file still has to be decoded by your browser, so a file can be accepted by the picker but fail later if that browser does not support its codec.</p>
                <p>For a compatibility-first workflow, MP3 or WAV is a sensible fallback. If one file refuses to decode, test the same project without audio or with a short MP3 before changing the rest of the video. Once the file loads, use the start and end controls to trim away audio you do not need.</p>
                <p>Remember that GIF and PNG-frame exports are silent. If audio is part of the finished result, choose the Video option and read the <Link className="inline-source-link" href="/help/brat-video-export-guide/">video export guide</Link> before rendering.</p>
              </section>

              <section id="preview" className="help-article-section reveal">
                <h2>Preview Before You Render</h2>
                <p>A preview is faster than discovering a mistake after a full export. Check the wording, order of lines, contrast, and overall pace first. If the animation feels crowded, simplify the text before increasing visual effects.</p>
                <ul className="article-clean-list">
                  <li>Read every line once in the live preview.</li>
                  <li>Make sure no important word depends on a very short glance.</li>
                  <li>Confirm the text colour stays readable against the background.</li>
                  <li>Use a short test export before a longer final render if the browser is under heavy load.</li>
                </ul>
              </section>

              <section id="workflow" className="help-article-section reveal">
                <h2>A Practical Brat Video Workflow</h2>
                <ol className="article-steps-clean">
                  <li><strong>Write the text first.</strong> Separate it into short, intentional lines.</li>
                  <li><strong>Create the sequence.</strong> Remove empty lines, check the order, and adjust the duration of any line that needs more or less reading time.</li>
                  <li><strong>Add and trim audio if needed.</strong> Use a format your browser can decode reliably, then choose the useful start and end section.</li>
                  <li><strong>Preview at 24–30 FPS.</strong> Increase FPS only if the motion benefits.</li>
                  <li><strong>Choose the output for the next step.</strong> Video for a finished clip, GIF for a silent loop, or PNG frames for further editing.</li>
                  <li><strong>Check the downloaded result.</strong> If something fails, use the <Link className="inline-source-link" href="/help/brat-generator-not-working/">troubleshooting guide</Link>.</li>
                </ol>
              </section>
              <ArticleFaqSection
                faqs={faqs}
                intro="Quick answers about text length, FPS, previewing, audio, and smoother Brat-style motion."
              />

              <ContextCta
                title="Create a Better Brat Video"
                description="Put the timing, text-length, and FPS tips into practice in the Brat Video Generator."
                href="/video-generator/#video-tool"
                buttonLabel="Open Brat Video Generator"
              />

            </article>
          </div>
          <RelatedPostsSidebar currentSlug={articleData.slug} relatedSlugs={['brat-video-export-guide','brat-canvas-size-guide','which-brat-tool-should-you-use','brat-generator-not-working']} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
