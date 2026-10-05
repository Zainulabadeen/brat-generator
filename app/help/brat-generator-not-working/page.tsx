import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleTableOfContents from '@/components/ArticleTableOfContents';
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

const articleData = getHelpArticle('brat-generator-not-working')!;

export const metadata: Metadata = {
  title: { absolute: 'Brat Generator Not Working? Common Problems & Quick Fixes' },
  description: 'Brat Generator not working? Fix download problems, blurry text, clipped text, colour differences, and mobile download issues with these quick steps.',
  alternates: { canonical: articleData.href },
  openGraph: {
    type: 'article',
    url: articleData.href,
    title: articleData.title,
    description: articleData.description,
    publishedTime: '2026-09-07T00:00:00Z',
    modifiedTime: '2026-10-05T00:00:00Z',
    images: [{ url: articleData.image, width: 1200, height: 720, alt: articleData.imageAlt }],
  },
  twitter: { card: 'summary_large_image', title: articleData.title, description: articleData.description, images: [articleData.image] },
};

const toc = [
  { href: '#quick-check', label: 'Quick checks to try first' },
  { href: '#common-fixes', label: 'Common problems and quick fixes' },
  { href: '#reset-design', label: 'Reset the design before starting over' },
] as const;

const fixes = [
  {
    number: '01',
    title: 'Download Not Working',
    body: 'Start by checking whether your browser is allowing downloads from the page. If clicking the download button does nothing, try the same action in another modern browser or temporarily disable an extension that may be blocking file downloads. On mobile, also check the browser\'s Downloads list before assuming the export failed.',
  },
  {
    number: '02',
    title: 'Text Is Blurrier Than Expected',
    body: 'Move the blur slider closer to zero and watch the live preview as you adjust it. A small amount of blur creates the soft Brat-inspired effect, but higher values can make short text look fuzzy and longer phrases difficult to read. Keep the blur light enough that the word still works at thumbnail size.',
  },
  {
    number: '03',
    title: 'Text Clips Near the Edges',
    body: 'Keep Auto Fit Text turned on first. For a longer phrase, turn on Wrap Long Text so the wording can use more than one line. If the composition still feels crowded, reduce the text size, tighten the wording, or choose a wider canvas before changing letter spacing.',
  },
  {
    number: '04',
    title: 'Colours Look Different on Another Screen',
    body: 'The selected hex value does not change, but screens can display the same colour differently because of brightness, colour profiles, calibration, and app compression. Use the displayed hex code as your reference and avoid judging the colour from one device alone when an exact digital value matters.',
  },
  {
    number: '05',
    title: 'Mobile Download Location Is Unclear',
    body: 'Some mobile browsers save exported images to a Downloads folder rather than directly to Photos. Check the browser download list, your Files app, or the device Downloads folder. If the image appears there, you can move or save it to Photos afterward.',
  },
];

export default function TroubleshootingGuidePage() {
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
    datePublished: '2026-09-07T00:00:00+05:00',
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
              <section id="quick-check" className="help-article-section reveal">
                <h2>Quick Checks to Try First</h2>
                <p>Most problems come from browser download behaviour, an aggressive blur setting, text that is too long for the selected canvas, or differences between devices. Before changing lots of settings, check these basics first.</p>
                <ol className="article-steps-clean">
                  <li><strong>Refresh the page once.</strong> Make sure the generator loaded normally.</li>
                  <li><strong>Check download permission.</strong> Confirm the browser is allowed to save files.</li>
                  <li><strong>Check Auto Fit and Wrap Long Text.</strong> Use them before shrinking a long phrase manually.</li>
                  <li><strong>Try another modern browser.</strong> This quickly rules out an extension or browser-specific issue.</li>
                </ol>
              </section>
            </div>

            <article className="help-article-body">
              <section id="common-fixes" className="help-article-section reveal">
                <h2>Common Problems &amp; Quick Fixes</h2>
                <p>Use the matching fix below, then return to the live preview and test the design again.</p>
                <div className="guide-step-list">
                  {fixes.map((fix, index) => (
                    <div className={`glass guide-step reveal reveal-delay-${index % 3}`} key={fix.number}>
                      <div className="guide-step-no">{fix.number}</div>
                      <div><h3>{fix.title}</h3><p>{fix.body}</p></div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="reset-design" className="help-article-section reveal">
                <h2>Reset the Design Before You Start Over</h2>
                <p>If the generator loads but the result looks wrong, return to a simple setup first: use a short phrase, keep Auto Fit Text on, use the default Brat Green background, dark text, a moderate text size, and very little blur. Once that version looks correct, add your custom colour, spacing, and stronger effects one setting at a time.</p>
                <p>If you are unsure what a control does, the <Link className="inline-source-link" href="/#how-to">step-by-step Brat Generator guide</Link> shows the process from text entry through export.</p>
              </section>

              <ContextCta
                title="Try the Brat Generator Again"
                description="Return to a simple setup, confirm the preview looks right, then add colours, spacing, blur, and effects one change at a time."
                href="/#generator"
                buttonLabel="Open Brat Generator"
              />
            </article>
          </div>

          <RelatedPostsSidebar
            currentSlug={articleData.slug}
            relatedSlugs={['brat-canvas-size-guide', 'which-brat-tool-should-you-use', 'brat-video-tips', 'how-to-make-a-brat-album-cover-free']}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
