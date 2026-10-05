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
import SiteIcon from '@/components/SiteIcon';
import { getHelpArticle } from '@/lib/helpArticles';
import { getHelpBreadcrumbSchema, getHelpBreadcrumbUi } from '@/lib/helpBreadcrumbs';
import { siteConfig } from '@/lib/site';
import { articleSchema, breadcrumbSchema, faqPageSchema, organizationEntity, webPageSchema, websiteEntity } from '@/lib/schema';

const articleData = getHelpArticle('brat-video-export-guide')!;

export const metadata: Metadata = {
  title: { absolute: articleData.title },
  description: articleData.description,
  alternates: { canonical: articleData.href },
  openGraph: {
    type: 'article',
    url: articleData.href,
    title: articleData.title,
    description: articleData.description,
    publishedTime: '2026-10-02T00:00:00Z',
    modifiedTime: '2026-10-04T00:00:00Z',
    images: [{ url: articleData.image, width: 1200, height: 720, alt: articleData.imageAlt }],
  },
  twitter: { card: 'summary_large_image', title: articleData.title, description: articleData.description, images: [articleData.image] },
};

const toc = [
  { href: '#export-options', label: 'What are the export options?' },
  { href: '#compare-formats', label: 'Compare Video, GIF and PNG Frames' },
  { href: '#when-to-use', label: 'When to use each format' },
  { href: '#quality-settings', label: 'Best settings for quality' },
  { href: '#how-to-export', label: 'How to export from the video tool' },
  { href: '#faq', label: 'Video export FAQ' },
] as const;


const faqs = [
  ['Does Video always mean MP4?', 'No. The tool checks what the browser can record. It prefers MP4 where supported and can fall back to WebM when that is the compatible recording format.'],
  ['Why is my GIF silent?', 'GIF and PNG-frame exports do not include an audio track. Use the Video option when audio is part of the final result.'],
  ['Why does a high FPS export take longer?', 'More frames have to be rendered or recorded. Lower FPS when the visible difference is small.'],
  ['Why does my GIF or Frames export stop before a long sequence ends?', 'GIF and PNG Frames are intentionally capped at about 12 seconds in the browser tool. Frames are also limited to 60 images. Use Video for longer sequences.'],
] as const;

export default function BratVideoExportGuidePage() {
  const canonical = `${siteConfig.url}${articleData.href}`;
  const breadcrumb = breadcrumbSchema(getHelpBreadcrumbSchema('brat-video-export-guide', canonical));
  const pageSchema = webPageSchema({
    url: canonical,
    name: articleData.title,
    description: articleData.description,
    dateModified: '2026-10-04',
    mainEntity: { '@id': `${canonical}#article` },
    primaryImageUrl: `${siteConfig.url}${articleData.image}`,
  });
  const article = articleSchema({
    pageUrl: canonical,
    headline: articleData.title,
    description: articleData.description,
    imageUrl: articleData.image,
    datePublished: '2026-10-02T00:00:00+05:00',
    dateModified: '2026-10-04T00:00:00+05:00',
  });
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
              breadcrumbs={getHelpBreadcrumbUi('brat-video-export-guide')}
            />
            <ArticleTableOfContents items={toc} />

            <div className="help-article-intro-body">


              <section id="export-options" className="help-article-section reveal">
                <h2>What Are the Export Options?</h2>
                <p>The <Link className="inline-source-link" href="/video-generator/">Brat Video Generator</Link> has three output paths: a browser-supported video file, an animated GIF, or a ZIP containing individual PNG frames. The right choice depends on whether you need audio, an automatic loop, or separate frames for editing.</p>
                <div className="article-option-grid">
                  <div className="article-option-card accent-green"><span className="article-option-icon"><SiteIcon name="play" size={28} /></span><h3>Video</h3><p>Best when motion and optional audio belong together in one file.</p></div>
                  <div className="article-option-card accent-purple"><span className="article-option-icon article-gif-mark">GIF</span><h3>GIF</h3><p>A silent animated loop that is easy to preview and share in places that support GIFs.</p></div>
                  <div className="article-option-card accent-blue"><span className="article-option-icon"><SiteIcon name="image" size={28} /></span><h3>PNG Frames</h3><p>A ZIP of individual image frames for retiming, compositing, or editing elsewhere.</p></div>
                </div>
                <p className="article-note">Important: the video tool uses the best recording format supported by your browser. MP4 is used where supported; another browser may provide WebM instead. GIF and PNG-frame exports are silent. In the tool, both of those exports are designed for short clips and are capped at about 12 seconds; the Frames ZIP contains up to 60 PNG images.</p>
              </section>


            </div>



            <article className="help-article-body">


              <section id="compare-formats" className="help-article-section reveal">
                <h2>Compare Video, GIF and PNG Frames</h2>
                <p>Think about what happens after you export. A social post with sound needs a video file. A short silent reaction can work as a GIF. A project that will continue in another editor is easier to control as individual frames.</p>
                <div className="simple-table article-table" role="region" aria-label="Brat video export format comparison" tabIndex={0}>
                  <table>
                    <thead><tr><th>Feature</th><th>Video</th><th>GIF</th><th>PNG Frames ZIP</th></tr></thead>
                    <tbody>
                      <tr><td>Audio</td><td>Yes, when the browser decodes the uploaded audio</td><td>No</td><td>No</td></tr>
                      <tr><td>Motion</td><td>Smooth browser-recorded video</td><td>Silent loop</td><td>Separate still frames</td></tr>
                      <tr><td>Best for</td><td>Finished clips, music-led posts, sharing</td><td>Short loops, reactions, previews</td><td>Advanced editing and frame-by-frame work</td></tr>
                      <tr><td>Editing after export</td><td>Normal video editing</td><td>Limited compared with a video file</td><td>Maximum frame-level control</td></tr>
                      <tr><td>Length in the tool</td><td>Follows the selected line timing / trimmed audio</td><td>Up to about 12 seconds</td><td>Up to about 12 seconds and 60 frames</td></tr>
                      <tr><td>Browser dependency</td><td>Format can vary by MediaRecorder support</td><td>Generated in the browser</td><td>Generated as PNG files in a ZIP</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="when-to-use" className="help-article-section reveal">
                <h2>When to Use Each Format</h2>
                <h3>Choose Video when the finished clip needs sound</h3>
                <p>Video is the most natural choice for lyric-led clips or animations where your uploaded audio is part of the result. The tool records the canvas and adds the decoded audio track when the browser supports that workflow.</p>
                <h3>Choose GIF when you want a simple silent loop</h3>
                <p>GIF works well when sound is not important and you want the animation to repeat automatically. Because GIF has a more limited colour model and the tool intentionally creates a compact animation, use it for quick motion rather than as your master-quality edit. The current GIF exporter renders up to about 12 seconds.</p>
                <h3>Choose PNG Frames when you want to keep editing</h3>
                <p>The Frames option packages individual PNG images into a ZIP. That is useful if you want to retime frames, add overlays, rebuild the animation in another editor, or inspect exactly what each moment looks like. The current Frames export is capped at about 12 seconds and 60 PNG images, so longer projects are better kept as Video.</p>
              </section>

              <section id="quality-settings" className="help-article-section reveal">
                <h2>Best Settings for Quality</h2>
                <p>The video tool allows a 10–60 FPS range. Higher FPS can make movement look smoother, but it also creates more work for the browser. For short text-led motion, 24–30 FPS is a sensible starting point before you decide whether a higher value is visibly better.</p>
                <ul className="article-clean-list">
                  <li><strong>Preview first:</strong> make sure each line is readable before starting a render.</li>
                  <li><strong>Start around 24–30 FPS:</strong> increase only when smoother motion is actually noticeable.</li>
                  <li><strong>Keep text short:</strong> short phrases are easier to read while they are moving.</li>
                  <li><strong>Use compatible audio:</strong> MP3 or WAV is a useful fallback if another accepted audio format does not decode in your browser.</li>
                  <li><strong>Use Video for longer sequences:</strong> GIF and Frames are short-export options in the tool.</li>
                  <li><strong>Keep a master export:</strong> use Video for a finished clip or PNG Frames when you expect to edit a short sequence frame by frame.</li>
                </ul>
              </section>

              <section id="how-to-export" className="help-article-section reveal">
                <h2>How to Export from the Video Tool</h2>
                <ol className="article-steps-clean">
                  <li><strong>Enter your text.</strong> Put each phrase or lyric line on its own line and remove accidental blank lines.</li>
                  <li><strong>Add audio only if needed.</strong> The tool accepts MP3, WAV, M4A, AAC, and OGG, but browser decoding support can vary.</li>
                  <li><strong>Choose Video, GIF, or Frames.</strong> Pick the format based on your next step rather than choosing the largest output by default.</li>
                  <li><strong>Set FPS.</strong> Start near 30 FPS for a normal test export.</li>
                  <li><strong>Export and check the downloaded file.</strong> If the export is missing or blocked, use the <Link className="inline-source-link" href="/help/brat-generator-not-working/">troubleshooting guide</Link>.</li>
                </ol>
              </section>

              <ArticleFaqSection
                faqs={faqs}
                intro="Quick answers about video formats, silent GIFs, browser recording support, and frame rate."
              />

              <ContextCta
                title="Create Your Brat Video"
                description="Build the motion first, then choose Video, GIF, or PNG Frames when you export."
                href="/video-generator/#video-tool"
                buttonLabel="Open Brat Video Generator"
              />
            </article>
          </div>
          <RelatedPostsSidebar currentSlug={articleData.slug} relatedSlugs={['brat-video-tips','brat-canvas-size-guide','which-brat-tool-should-you-use','brat-generator-not-working']} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
