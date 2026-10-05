import fs from 'node:fs';
import path from 'node:path';
import { INDEXABLE_PAGES, RETIRED_ROUTES, SITEMAP_LASTMOD } from './site-routes.mjs';

const root = process.cwd();
let failures = 0;
const file = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(root, rel));
const pass = (msg) => console.log(`PASS  ${msg}`);
const fail = (msg) => { failures += 1; console.error(`FAIL  ${msg}`); };
const expect = (condition, msg) => condition ? pass(msg) : fail(msg);

const expected = INDEXABLE_PAGES.map(({ route, source }) => [route, source]);

const retired = RETIRED_ROUTES;

console.log('\nTECHNICAL + SOURCE SEO CHECK\n');

// Indexable page metadata and canonicals.
const titles = new Map();
const descriptions = new Map();
for (const [route, source] of expected) {
  expect(exists(source), `${route} source exists`);
  if (!exists(source)) continue;

  const text = file(source);
  const canonicalNeedle = route === '/' ? "alternates: { canonical: '/' }" : `alternates: { canonical: '${route}' }`;
  const hasDynamicArticleCanonical = text.includes('alternates: { canonical: articleData.href }')
    && route.startsWith('/help/')
    && route !== '/help/';
  expect(text.includes(canonicalNeedle) || hasDynamicArticleCanonical, `${route} has a self-referencing canonical`);

  let title = text.match(/title:\s*\{\s*absolute:\s*'([^']+)'/)?.[1] || '';
  let desc = text.match(/description:\s*'([^']+)'/)?.[1] || '';
  if ((!title || !desc) && text.includes('articleData.title') && text.includes('articleData.description')) {
    const slug = source.match(/app\/help\/([^/]+)\/page\.tsx$/)?.[1] || '';
    const articleRegistry = file('lib/helpArticles.ts');
    const block = articleRegistry.match(new RegExp(`slug: '${slug}'[\\s\\S]*?(?=\\n  \\{|\\n\];)`))?.[0] || '';
    title = block.match(/title: '([^']+)'/)?.[1] || title;
    desc = block.match(/description: '([^']+)'/)?.[1] || desc;
  }
  expect(Boolean(title), `${route} has an explicit title`);
  expect(Boolean(desc), `${route} has an explicit meta description`);

  if (title) {
    expect(title.length >= 30 && title.length <= 65, `${route} title length is ${title.length} characters`);
    expect(!titles.has(title), `${route} title is unique`);
    titles.set(title, route);
  }
  if (desc) {
    expect(desc.length >= 100 && desc.length <= 170, `${route} meta description length is ${desc.length} characters`);
    expect(!descriptions.has(desc), `${route} meta description is unique`);
    descriptions.set(desc, route);
  }

  expect(text.includes('openGraph:'), `${route} has Open Graph metadata`);
  expect(text.includes('twitter:'), `${route} has Twitter/X card metadata`);
}

// Sitemap validation.
const sitemap = file('public/sitemap.xml');
const sitemapEntries = [...sitemap.matchAll(/<url>\s*<loc>(https:\/\/bratgeneratorpro\.net[^<]*)<\/loc>\s*<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>\s*<\/url>/g)]
  .map(([, loc, lastmod]) => ({ loc, lastmod }));
const sitemapUrls = sitemapEntries.map((entry) => new URL(entry.loc).pathname);
expect(sitemapEntries.length === expected.length, `sitemap contains exactly ${expected.length} indexable URLs`);
expect(new Set(sitemapEntries.map((entry) => entry.loc)).size === sitemapEntries.length, 'sitemap has no duplicate URLs');
for (const [route] of expected) expect(sitemapUrls.includes(route), `sitemap includes ${route}`);
for (const route of retired) expect(!sitemapUrls.includes(route), `sitemap excludes retired ${route}`);
for (const { loc, lastmod } of sitemapEntries) {
  const url = new URL(loc);
  expect(url.protocol === 'https:' && url.hostname === 'bratgeneratorpro.net', `${loc} uses canonical HTTPS non-www host`);
  expect(!url.hash && !url.search, `${loc} contains no fragment or query string`);
  expect(url.pathname === '/' || url.pathname.endsWith('/'), `${loc} follows trailing-slash convention`);
  expect(/^2026-\d{2}-\d{2}$/.test(lastmod), `${loc} has a valid lastmod date`);
}
for (const { loc, lastmod } of sitemapEntries) {
  const pathname = new URL(loc).pathname;
  const expectedLastmod = SITEMAP_LASTMOD[pathname];
  expect(Boolean(expectedLastmod), `${pathname} has a configured sitemap lastmod`);
  if (expectedLastmod) expect(lastmod === expectedLastmod, `${pathname} sitemap lastmod is ${expectedLastmod}`);
}
expect(!/<priority>|<changefreq>/i.test(sitemap), 'sitemap omits ignored priority/changefreq hints');

const sitemapIndex = file('public/sitemap_index.xml');
expect(sitemapIndex.includes('https://bratgeneratorpro.net/sitemap.xml'), 'sitemap_index.xml points to canonical sitemap.xml');
expect(sitemapIndex.includes('<lastmod>2026-10-05</lastmod>'), 'sitemap_index.xml lastmod reflects the latest sitemap update');

// Robots and llms discovery files.
const robots = file('public/robots.txt');
expect(/User-agent:\s*Googlebot[\s\S]*?Allow:\s*\//i.test(robots), 'robots.txt explicitly allows Googlebot');
expect(/User-agent:\s*\*[\s\S]*?Allow:\s*\//i.test(robots), 'robots.txt allows default crawlers');
expect(robots.includes('Sitemap: https://bratgeneratorpro.net/sitemap.xml'), 'robots.txt declares the canonical sitemap');
expect(robots.includes('# Updated: 2026-10-03'), 'robots.txt carries the current technical update date');
expect(!/Disallow:\s*\/$/im.test(robots), 'robots.txt does not block the public site');
expect(!/Crawl-delay:/i.test(robots), 'robots.txt does not throttle normal crawling');
for (const agent of ['OAI-SearchBot', 'ClaudeBot', 'PerplexityBot']) expect(robots.includes(`User-agent: ${agent}`), `robots.txt explicitly allows ${agent}`);

const llms = file('public/llms.txt');
expect(llms.startsWith('# Brat Generator'), 'llms.txt has a clear H1 title');
expect(llms.includes('Canonical website: https://bratgeneratorpro.net/'), 'llms.txt declares the canonical website');
for (const heading of ['## Core tools', '## Examples', '## Styles', '## Tutorials and guides', '## Site information', '## Technical discovery']) {
  expect(llms.includes(heading), `llms.txt includes ${heading.replace('## ', '')}`);
}
for (const { route } of INDEXABLE_PAGES.filter((page) => page.route !== '/')) {
  expect(llms.includes(`https://bratgeneratorpro.net${route}`), `llms.txt references ${route}`);
}
expect(llms.includes('independent fan-made project'), 'llms.txt preserves the independent/non-affiliation context');

// Global metadata and icons.
const layout = file('app/layout.tsx');
expect(layout.includes('index: true') && layout.includes('follow: true'), 'root robots metadata allows index/follow');
expect(layout.includes("'/favicon.ico'") && layout.includes("'/icon-192.png'"), 'ICO and PNG favicons are exposed');
expect(layout.includes('lang="en-GB"'), 'root HTML language is en-GB');
expect(exists('public/favicon.ico') && exists('public/icon-192.png') && exists('public/icon-512.png'), 'favicon/PWA icon files exist');

// Structured data architecture.
const schemaLibrary = file('lib/schema.ts');
for (const schemaType of ['WebSite', 'Organization', 'SoftwareApplication', 'FAQPage', 'BreadcrumbList']) {
  expect(schemaLibrary.includes(`'@type': '${schemaType}'`), `shared schema library defines ${schemaType}`);
}
expect(schemaLibrary.includes('export function webPageSchema'), 'shared schema library centralizes WebPage-family markup');
expect(schemaLibrary.includes("price: 0"), 'SoftwareApplication free offer uses numeric price 0');
expect(schemaLibrary.includes("mainEntityOfPage: { '@id': `${url}#webpage` }"), 'SoftwareApplication links back to its page entity');
expect(!schemaLibrary.includes('aggregateRating') && !schemaLibrary.includes("'@type': 'Review'"), 'schema does not fabricate ratings or reviews');
expect(!schemaLibrary.includes("'@type': 'WebApplication'"), 'schema avoids conflicting WebApplication duplication');
expect(schemaLibrary.includes('author: organizationRef') && schemaLibrary.includes('isPartOf: websiteRef'), 'Article schema references the canonical Organization and WebSite entities without nesting duplicates');

const jsonLd = file('components/JsonLd.tsx');
expect(jsonLd.includes("'@graph'"), 'JSON-LD arrays are emitted as one linked @graph');
expect(jsonLd.includes('stripContext'), 'duplicate per-node @context values are removed inside @graph');

const home = file('app/page.tsx');
expect(home.includes('websiteSchema') && home.includes('organizationSchema') && home.includes('webPageSchema') && home.includes('softwareApplicationSchema') && home.includes('faqPageSchema'), 'homepage publishes WebSite + Organization + WebPage + SoftwareApplication + FAQPage');
const allSchemaSources = expected.map(([, source]) => file(source)).join('\n') + '\n' + file('components/ToolPageShell.tsx');
expect((allSchemaSources.match(/organizationSchema/g) || []).length === 2, 'Organization entity is emitted only from the homepage source');

const toolShell = file('components/ToolPageShell.tsx');
expect(toolShell.includes('softwareApplicationSchema') && toolShell.includes('webPageSchema') && toolShell.includes('breadcrumbSchema') && toolShell.includes('faqPageSchema'), 'shared tool pages use linked app/page/breadcrumb/FAQ schema helpers');
expect(toolShell.includes("mainEntity: { '@id': appId }"), 'tool WebPage schema identifies the generator as its main entity');

const video = file('app/video-generator/page.tsx');
expect(video.includes('softwareApplicationSchema') && video.includes('webPageSchema') && video.includes('faqPageSchema') && video.includes('breadcrumbSchema'), 'video page uses linked app/page/FAQ/breadcrumb schemas');
expect(file('app/brat-styles/page.tsx').includes("type: 'CollectionPage'") && file('app/brat-styles/page.tsx').includes('faqPageSchema'), 'Brat Styles uses CollectionPage + FAQ schema');
expect(file('app/about/page.tsx').includes("type: 'AboutPage'"), 'About page uses AboutPage schema');
expect(file('app/contact/page.tsx').includes("type: 'ContactPage'"), 'Contact page uses ContactPage schema');
expect(file('app/privacy-policy/page.tsx').includes('webPageSchema') && file('app/cookies/page.tsx').includes('webPageSchema') && file('app/terms/page.tsx').includes('webPageSchema'), 'privacy, cookie and terms pages use shared WebPage schema');
expect(file('app/help/page.tsx').includes("type: 'CollectionPage'") && file('app/help/page.tsx').includes("'@type': 'ItemList'"), 'help hub uses CollectionPage + ItemList schema');
const helpArticleSources = INDEXABLE_PAGES
  .filter((page) => page.route.startsWith('/help/') && page.route !== '/help/')
  .map((page) => page.source);
for (const post of helpArticleSources) {
  const text = file(post);
  expect(text.includes('articleSchema') && text.includes('webPageSchema') && text.includes('breadcrumbSchema'), `${post} uses Article + WebPage + Breadcrumb schema helpers`);
  expect(text.includes('ArticleTableOfContents') && text.includes('RelatedPostsSidebar') && text.includes('help-article-intro-body'), `${post} uses the approved TOC + lead section + Related Posts layout`);
  expect(text.includes('organizationEntity') && text.includes('websiteEntity'), `${post} emits resolvable Organization + WebSite entities with its article graph`);
  if (text.includes('faqPageSchema')) {
    expect(text.includes('ArticleFaqSection'), `${post} keeps FAQPage schema tied to a visible accordion FAQ section`);
  }
}


const helpBreadcrumbs = file('lib/helpBreadcrumbs.ts');
expect(helpBreadcrumbs.includes("{ label: 'Help', href: '/help/' }") && helpBreadcrumbs.includes("{ name: 'Help', url: `${siteConfig.url}/help/` }"), 'Help breadcrumb helper includes the Help hub in visible and JSON-LD paths');
const helpArticleSlugs = helpArticleSources.map((source) => source.match(/app\/help\/([^/]+)\/page\.tsx$/)?.[1]).filter(Boolean);
for (const slug of helpArticleSlugs) {
  expect(helpBreadcrumbs.includes(`'${slug}'`), `breadcrumb hierarchy is configured for ${slug}`);
}
for (const post of helpArticleSources) {
  const text = file(post);
  expect(text.includes('getHelpBreadcrumbUi') && text.includes('getHelpBreadcrumbSchema'), `${post} uses the shared Help breadcrumb helpers for visible navigation and JSON-LD`);
}
expect(file('components/HelpArticleHeader.tsx').includes('className="page-hero-breadcrumb"') && !file('components/HelpArticleHeader.tsx').includes('help-article-kicker-breadcrumb'), 'Help article breadcrumbs use the exact shared inner-page breadcrumb wrapper');
expect(helpBreadcrumbs.includes("{ label: config.currentLabel }"), 'visible Help breadcrumbs end on the current article as a non-clickable item');
expect(helpBreadcrumbs.includes("...(config.parent ? [{ label: config.parent.label, href: config.parent.href }] : [])"), 'visible Help breadcrumbs include a related tool only when it is a truthful parent context');
expect(helpBreadcrumbs.includes("{ name: config.currentLabel, url: canonical }"), 'BreadcrumbList JSON-LD mirrors the visible trail and identifies the current article as the final item');
expect(helpBreadcrumbs.includes("'which-brat-tool-should-you-use':") && helpBreadcrumbs.includes("currentLabel: 'Tool Selection Guide'"), 'tool-selection article uses an article-specific breadcrumb instead of pretending the homepage is its parent tool');

expect(file('components/ArticleTableOfContents.tsx').includes('Table of Contents') && !file('components/ArticleTableOfContents.tsx').includes('toc-number'), 'new article TOC keeps the approved simple one-column layout without numbering');
expect(file('components/RelatedPostsSidebar.tsx').includes('Related Posts') && file('components/RelatedPostsSidebar.tsx').includes('<Image'), 'new article sidebar contains only image-led Related Posts');
expect(!file('components/RelatedPostsSidebar.tsx').includes('...(current ? [current] : [])'), 'Related Posts sidebar excludes the current article while showing the rest of the Help library');
expect(!file('components/RelatedPostsSidebar.tsx').includes('readTime'), 'related-post cards omit reading-time labels');
expect(!file('components/HelpArticleHeader.tsx').includes('help-article-hero-image') && !file('components/HelpArticleHeader.tsx').includes('readTime'), 'new article header stays text-led without a hero image or reading-time label');
expect(!file('components/ArticleTableOfContents.tsx').includes('arrowRight'), 'article TOC uses bold text rows without arrow icons');
expect(file('components/ArticleTableOfContents.tsx').includes('is-active') && file('components/ArticleTableOfContents.tsx').includes('aria-current'), 'article TOC exposes hover/current-section active states');

const globalsCss = file('app/globals.css');
expect(globalsCss.includes('grid-template-areas:') && globalsCss.includes('\"toc sidebar\"') && globalsCss.includes('\"intro sidebar\"') && globalsCss.includes('\"body body\"'), 'Help article grid keeps TOC/lead beside the sidebar and starts the full body below both');
expect(!/\.help-article-intro-body\s*\{[^}]*margin-top\s*:\s*-/.test(globalsCss), 'Help article lead section has no negative top margin that can overlap the TOC');
expect(!globalsCss.includes('\\n'), 'global CSS contains no literal escaped newline sequences');

expect(file('components/ArticleFaqSection.tsx').includes('accordion compact') && file('components/ArticleFaqSection.tsx').includes('Frequently Asked'), 'Help article FAQs use the shared accordion treatment');
expect(file('components/ContextCta.tsx').includes('context-cta-card'), 'contextual create CTA component exists for FAQ/article endings');
expect(file('components/BratGenerator.tsx').includes('/brat-generator-embed.html'), 'homepage generator uses the direct public HTML embed path to avoid route-level 404s');


// Project hygiene: reject unrelated legacy sources that can create duplicate or
// accidental routes in the App Router.
for (const stale of [
  'app/page.js',
  'app/layout.js',
  'app/about/page.js',
  'app/contact/page.js',
  'app/contact/ContactForm.js',
  'app/divisions',
  'app/fleet',
  'app/industries',
  'components/PageHero.js',
  'components/Footer.js',
  'data/site.js',
]) {
  expect(!exists(stale), `unrelated legacy source is removed: ${stale}`);
}

const appSourceText = fs.readdirSync(path.join(root, 'app'), { recursive: true })
  .filter((entry) => typeof entry === 'string' && /\.(?:js|jsx|ts|tsx)$/.test(entry))
  .map((entry) => {
    try { return file(path.posix.join('app', entry.replaceAll('\\', '/'))); }
    catch { return ''; }
  })
  .join('\n');
expect(!/Rush Track|RT Movers|lucide-react/.test(appSourceText), 'active App Router source contains no unrelated Rush Track project code');



// Redirects, host normalization and security headers.
const vercel = JSON.parse(file('vercel.json'));
const redirects = vercel.redirects || [];
for (const oldPath of ['/brat-text-generator', '/how-to', '/how-to-use', '/styles', '/features', '/key-features', '/brat-generator-features', '/how-to-make-a-brat-album-cover']) {
  expect(redirects.some((r) => r.source === oldPath || r.source === `${oldPath}/`), `Vercel has redirect for ${oldPath}`);
}
for (const [source, destination] of [
  ['/blog', '/help/'],
  ['/blog/how-to-make-a-brat-album-cover-free', '/help/how-to-make-a-brat-album-cover-free/'],
  ['/blog/brat-generator-not-working', '/help/brat-generator-not-working/'],
]) {
  expect(redirects.some((r) => (r.source === source || r.source === `${source}/`) && r.destination === destination && r.statusCode === 301), `Vercel permanently redirects ${source} to Help`);
}
expect(redirects.some((r) => r.has?.some((h) => h.type === 'host' && h.value === 'www.bratgeneratorpro.net') && r.destination?.startsWith('https://bratgeneratorpro.net/')), 'Vercel enforces preferred non-www canonical host');
expect(vercel.trailingSlash === true, 'Vercel normalizes page URLs with trailing slashes');
const vercelText = JSON.stringify(vercel);
for (const header of ['Strict-Transport-Security', 'Content-Security-Policy', 'X-Content-Type-Options', 'Referrer-Policy', 'X-Frame-Options', 'Permissions-Policy']) {
  expect(vercelText.includes(header), `Vercel sends ${header}`);
}
for (const asset of ['/robots.txt', '/sitemap.xml', '/sitemap_index.xml', '/llms.txt']) {
  expect((vercel.headers || []).some((entry) => entry.source === asset), `Vercel has explicit headers for ${asset}`);
}
expect(vercelText.includes('"X-Robots-Tag","value":"noindex, follow"'), 'Vercel keeps llms.txt out of normal search indexing');

const htaccess = file('public/.htaccess');
expect(htaccess.includes('Force HTTPS and the preferred non-www hostname'), 'Apache fallback forces HTTPS + non-www');
expect(htaccess.includes('ErrorDocument 404 /404.html'), 'Apache fallback has a custom 404');
expect(htaccess.includes('RewriteRule ^brat-text-generator/?$ / [R=301,L]'), 'Apache redirects retired Brat Text route');
expect(htaccess.includes('X-Robots-Tag "noindex, follow"'), 'Apache fallback also noindexes llms.txt');

for (const [rel, destination] of [
  ['app/brat-text-generator/page.tsx', '/#generator'],
  ['app/how-to-use/page.tsx', '/#how-to'],
]) {
  const text = file(rel);
  expect(text.includes('permanentRedirect') && text.includes(`'${destination}'`), `${rel} retains a permanent redirect fallback`);
}

for (const embed of ['public/brat-generator-embed/index.html', 'public/brat-video-generator-embed/index.html']) {
  expect(/noindex\s*,\s*nofollow/i.test(file(embed)), `${embed} is noindex/nofollow`);
}
expect(exists('app/not-found.tsx'), 'custom Next.js 404 page exists');
expect(!layout.includes('index: false'), 'public site is not accidentally noindexed');

// Preserve the previously approved UX changes while checking technical integration.
for (const prefix of ['main', 'meme', 'image', 'font', 'album', 'video']) {
  for (let step = 1; step <= 4; step += 1) {
    expect(exists(`public/images/how-to/${prefix}-step-${step}.webp`), `${prefix} how-to step ${step} WebP exists`);
  }
}
expect(!exists('app/blog'), 'retired /blog source directory is removed so old Blog routes are not built as pages');
const howToImage = file('components/HowToImage.tsx');
const detailedHowTo = file('components/DetailedHowTo.tsx');
expect(
  exists('components/HowToImage.tsx')
    && howToImage.includes('<img')
    && !howToImage.includes('howto-lightbox')
    && !howToImage.includes('createPortal'),
  'how-to screenshots render directly without the removed click-to-enlarge lightbox',
);
expect(
  detailedHowTo.includes('detailed-howto-copy')
    && detailedHowTo.includes('detailed-howto-media')
    && detailedHowTo.includes("index % 2 ? 'is-reverse' : ''"),
  'how-to steps alternate image placement while preserving the same mockup treatment',
);
expect(!file('app/help/page.tsx').includes('help-topic-clusters') && file('app/help/page.tsx').includes('help-guide-grid'), 'Help hub keeps the focused article grid without the removed topic-cluster block');
expect(home.indexOf('id="how-to"') > -1 && home.indexOf('id="how-to"') < home.indexOf('id="features"') && home.indexOf('id="tools"') < home.indexOf('Why the Brat Look'), 'homepage keeps practical how-to/features/tools content before the lower background/trend section');
expect(!toolShell.includes('tool-related-links') && !video.includes('Related Tools') && !video.includes('Keep Creating with'), 'dedicated tool pages still omit the removed Related Tools block');

const generator = file('components/BratGenerator.tsx');
for (const style of ['green', 'black', 'white', 'pink', 'blue']) expect(generator.includes(`${style}: { background:`), `main generator supports ${style} style preselection`);
expect(generator.includes("window.addEventListener('hashchange'") && generator.includes('applyStyleFromLocation'), 'main generator applies style-card hash changes automatically');
expect(generator.includes("green: 'brat'") && generator.includes("white: 'white'") && generator.includes('modeButton.click()'), 'styles with matching generator modes switch the visible menu mode');


const contentSources = expected.map(([, source]) => file(source)).join('\n');
expect(!contentSources.includes('className="text-link"'), 'indexable content pages avoid button-styled navigation links');
expect(home.includes('ContextCta') && video.includes('ContextCta') && toolShell.includes('ContextCta') && file('app/brat-styles/page.tsx').includes('ContextCta'), 'FAQ-ending contextual create CTAs are present on the main generator, video, shared tool pages and Styles');
for (const rel of ['app/about/page.tsx', 'app/contact/page.tsx', 'app/privacy-policy/page.tsx', 'app/terms/page.tsx', 'app/brat-styles/page.tsx']) {
  expect(file(rel).includes('inline-source-link'), `${rel} includes contextual internal links in the page copy`);
}
expect(file('app/cookies/page.tsx').includes("alternates: { canonical: '/cookies/' }") && file('app/cookies/page.tsx').includes('webPageSchema'), 'Cookie Policy has canonical metadata and WebPage schema');

const packageJson = JSON.parse(file('package.json'));
expect(Boolean(packageJson.scripts?.['technical:check']), 'package.json exposes technical:check');
expect(Boolean(packageJson.scripts?.['technical:live']), 'package.json exposes technical:live');
expect(Boolean(packageJson.scripts?.['seo:check']), 'package.json exposes seo:check');
expect(Boolean(packageJson.scripts?.['cleanup:old-blog']) && exists('scripts/remove-old-blog-routes.mjs'), 'package.json exposes one-time cleanup for retired physical /blog routes');
expect(Boolean(packageJson.scripts?.['cleanup:legacy-project']) && exists('scripts/remove-unrelated-legacy-project-files.mjs'), 'package.json exposes one-time cleanup for unrelated legacy project files');


// Growth feature checks
expect(file('components/SiteHeader.tsx').includes("['Brat Font Generator', pageLinks.fontGenerator]"), 'primary desktop/mobile navigation includes Brat Font Generator');
expect(file('app/page.tsx').includes("'/brat-font-generator/'") && file('app/page.tsx').includes("'Brat Font Generator'"), 'homepage Explore More Brat Tools includes Brat Font Generator');
expect(file('components/SiteFooter.tsx').includes('pageLinks.fontGenerator'), 'footer Tools list includes Brat Font Generator');
expect(file('app/help/which-brat-tool-should-you-use/page.tsx').includes('id="font-generator"') && file('app/help/which-brat-tool-should-you-use/page.tsx').includes('/brat-font-generator/'), 'tool chooser includes Brat Font Generator workflow');
expect(fs.existsSync(path.join(root,'app/brat-font-generator/page.tsx')), 'real Brat Font Generator route exists');
const homeSource = file('app/page.tsx');
expect(homeSource.indexOf('What Can You') < homeSource.indexOf('Explore More'), 'homepage Explore More Brat Tools appears after Content Ideas');
expect(!file('app/help/page.tsx').includes('Browse by Topic') && !file('app/help/page.tsx').includes('Find the Right Help Faster'), 'Help hub does not include the removed topic-card section');
expect(!file('app/brat-styles/page.tsx').includes('For a full cover workflow, follow the'), 'Brat Styles no longer contains forced guide-link filler');
expect(fs.existsSync(path.join(root,'app/brat-examples/page.tsx')), 'Brat examples gallery route exists');
expect(fs.existsSync(path.join(root,'app/help/brat-video-audio-sync-formats/page.tsx')), 'video audio sync help route exists');
const pkgGrowth=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
expect(Object.values(pkgGrowth.dependencies||{}).every((v)=>v!=='latest') && Object.values(pkgGrowth.devDependencies||{}).every((v)=>v!=='latest'), 'package dependencies are pinned instead of latest');
const mainEmbed=fs.readFileSync(path.join(root,'public/brat-generator-embed.html'),'utf8');
expect(mainEmbed.includes('Auto Fit Text') && mainEmbed.includes('Share Link') && mainEmbed.includes('1080 &times; 1350'), 'main generator exposes auto-fit, share link and portrait canvas');
const videoEmbed=fs.readFileSync(path.join(root,'public/brat-video-generator-embed.html'),'utf8');
expect(videoEmbed.includes('Line Timing') && videoEmbed.includes('Audio Trim'), 'video generator exposes line timing and audio trim controls');

// Content/product quality checks: keep public copy aligned with the controls users can actually use.
const creativeTool = file('components/BratCreativeTool.tsx');
const fontPage = file('app/brat-font-generator/page.tsx');
const memePage = file('app/brat-meme-generator/page.tsx');
const imagePage = file('app/brat-image-generator/page.tsx');
const stylesPage = file('app/brat-styles/page.tsx');
const canvasGuide = file('app/help/brat-canvas-size-guide/page.tsx');
const troubleshooting = file('app/help/brat-generator-not-working/page.tsx');
const albumGuide = file('app/help/how-to-make-a-brat-album-cover-free/page.tsx');
const videoExportGuide = file('app/help/brat-video-export-guide/page.tsx');

expect(exists('lib/toolCapabilities.ts') && creativeTool.includes('CREATIVE_CANVAS_PRESETS as PRESETS') && canvasGuide.includes('MAIN_CANVAS_PRESETS'), 'tool capability data is shared by the creative tools and canvas guide');
expect(creativeTool.includes('Letter spacing') && creativeTool.includes('letterSpacing') && fontPage.includes('Letter Spacing slider'), 'Font Generator copy is backed by a real letter-spacing control and export rendering');
expect(!/toUpperCase\(\)/.test(creativeTool.split("if (mode === 'meme')")[1]?.split("} else if (mode === 'album')")[0] || ''), 'Meme Generator does not silently force captions to uppercase');
expect(creativeTool.includes("const memeX = align === 'left'") && creativeTool.includes('lineHeight, align, textColor'), 'Meme Generator alignment and line height affect the rendered captions');
expect(imagePage.includes('text-led') && imagePage.includes('does not generate AI scenes or photos') && creativeTool.includes('Background image (optional)') && creativeTool.includes('Create Brat Image'), 'Image Generator copy clearly describes the text-led tool and matches its actual controls');
expect(albumGuide.includes('<BratCreativeTool mode="album" />'), 'album-cover Help guide embeds the dedicated Album Cover Generator');
expect(troubleshooting.includes('Auto Fit Text') && troubleshooting.includes('Wrap Long Text'), 'troubleshooting guide uses the current text-fitting controls before manual workarounds');
expect(home.includes('1×, 2× or 3×') && home.includes('Shareable Design Link') && mainEmbed.includes("url.searchParams.set"), 'homepage resolution/share copy is backed by the main generator controls');
expect(videoExportGuide.includes('12 seconds') && videoExportGuide.includes('60 PNG') && videoEmbed.includes('Math.min(12') && videoEmbed.includes('Math.min(60'), 'Video export guide documents the actual GIF/Frames short-export limits');
expect(canvasGuide.includes('CREATIVE_CANVAS_PRESETS') && canvasGuide.includes('MAIN_CANVAS_PRESETS') && fontPage.includes('CREATIVE_CANVAS_SIZE_SUMMARY') && memePage.includes('CREATIVE_CANVAS_SIZE_SUMMARY') && imagePage.includes('CREATIVE_CANVAS_SIZE_SUMMARY'), 'canvas-size copy is synchronized through shared preset data');
for (const phrase of ['brat generator black design', 'brat generator white version', 'brat generator pink style', 'brat generator different colors option', 'when they search for the Brat green colour code', 'Press Generate Brat Image', 'platform-ready export', 'short prompt', 'prompt-based Brat-style image']) {
  expect(!contentSources.toLowerCase().includes(phrase.toLowerCase()), `public page copy avoids stale or forced phrase: ${phrase}`);
}
expect(stylesPage.includes('This site uses') && stylesPage.includes('#8ACE00') && stylesPage.includes('practical web starting point'), 'Brat Green copy gives a useful value without pretending it is an official print colour');
expect(file('components/HelpArticleHeader.tsx').includes('reviewed against the site tools') && !file('components/HelpArticleHeader.tsx').includes('Graphic Design Expert'), 'Help trust copy is specific without fake expert credentials');
expect(!exists('components/ReviewMark.tsx') && !exists('REVIEW_CHANGES_OCT04.md') && !exists('DELETE_OLD_REVIEW_NOTE_IF_PRESENT.txt') && !file('app/globals.css').includes('.review-mark'), 'temporary review markers and review-only files are removed');
expect(file('lib/tutorialImages.ts').includes('HOW_TO_IMAGE_WIDTH = 499') && file('lib/tutorialImages.ts').includes('HOW_TO_IMAGE_HEIGHT = 857'), 'tutorial image metadata matches the preserved 499×857 mobile mockups');
const videoEmbedUi = file('public/brat-video-generator-embed/index.html');
expect(!/[📝👥⬇️]/u.test(videoEmbedUi) && videoEmbedUi.includes('bvg-ui-icon'), 'video tool uses clean SVG/minimal icons instead of emoji controls');
expect(!file('components/ToolPageShell.tsx').includes('links?:') && !file('app/brat-meme-generator/page.tsx').includes('links={') && !file('app/brat-album-cover-generator/page.tsx').includes('links={'), 'unused ToolPageShell links prop and dead caller data are removed');

console.log(`\nResult: ${failures ? 'FAIL' : 'PASS'} — ${failures} failure(s).`);
if (failures) process.exit(1);
