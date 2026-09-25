import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
let failures = 0;
const file = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(root, rel));
const pass = (msg) => console.log(`PASS  ${msg}`);
const fail = (msg) => { failures += 1; console.error(`FAIL  ${msg}`); };
const expect = (condition, msg) => condition ? pass(msg) : fail(msg);

const expected = [
  ['/', 'app/page.tsx'],
  ['/video-generator/', 'app/video-generator/page.tsx'],
  ['/brat-meme-generator/', 'app/brat-meme-generator/page.tsx'],
  ['/brat-image-generator/', 'app/brat-image-generator/page.tsx'],
  ['/brat-album-cover-generator/', 'app/brat-album-cover-generator/page.tsx'],
  ['/brat-styles/', 'app/brat-styles/page.tsx'],
  ['/blog/', 'app/blog/page.tsx'],
  ['/blog/how-to-make-a-brat-album-cover-free/', 'app/blog/how-to-make-a-brat-album-cover-free/page.tsx'],
  ['/blog/brat-generator-not-working/', 'app/blog/brat-generator-not-working/page.tsx'],
  ['/about/', 'app/about/page.tsx'],
  ['/contact/', 'app/contact/page.tsx'],
  ['/privacy-policy/', 'app/privacy-policy/page.tsx'],
  ['/terms/', 'app/terms/page.tsx'],
];

const retired = ['/how-to-use/', '/brat-text-generator/', '/brat-font-generator/', '/features/'];

console.log('\nTECHNICAL + SOURCE SEO CHECK\n');

// Indexable page metadata and canonicals.
const titles = new Map();
const descriptions = new Map();
for (const [route, source] of expected) {
  expect(exists(source), `${route} source exists`);
  if (!exists(source)) continue;

  const text = file(source);
  const canonicalNeedle = route === '/' ? "alternates: { canonical: '/' }" : `alternates: { canonical: '${route}' }`;
  expect(text.includes(canonicalNeedle), `${route} has a self-referencing canonical`);

  const title = text.match(/title:\s*\{\s*absolute:\s*'([^']+)'/)?.[1] || '';
  const desc = text.match(/description:\s*'([^']+)'/)?.[1] || '';
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
for (const route of ['/', '/video-generator/', '/brat-meme-generator/', '/brat-image-generator/', '/brat-album-cover-generator/', '/brat-styles/']) {
  const entry = sitemapEntries.find((item) => new URL(item.loc).pathname === route);
  expect(entry?.lastmod === '2026-09-25', `${route} sitemap lastmod reflects the current tool update`);
}
expect(!/<priority>|<changefreq>/i.test(sitemap), 'sitemap omits ignored priority/changefreq hints');

const sitemapIndex = file('public/sitemap_index.xml');
expect(sitemapIndex.includes('https://bratgeneratorpro.net/sitemap.xml'), 'sitemap_index.xml points to canonical sitemap.xml');
expect(sitemapIndex.includes('<lastmod>2026-09-25</lastmod>'), 'sitemap_index.xml lastmod is current');

// Robots and llms discovery files.
const robots = file('public/robots.txt');
expect(/User-agent:\s*Googlebot[\s\S]*?Allow:\s*\//i.test(robots), 'robots.txt explicitly allows Googlebot');
expect(/User-agent:\s*\*[\s\S]*?Allow:\s*\//i.test(robots), 'robots.txt allows default crawlers');
expect(robots.includes('Sitemap: https://bratgeneratorpro.net/sitemap.xml'), 'robots.txt declares the canonical sitemap');
expect(!/Disallow:\s*\/$/im.test(robots), 'robots.txt does not block the public site');
expect(!/Crawl-delay:/i.test(robots), 'robots.txt does not throttle normal crawling');
for (const agent of ['OAI-SearchBot', 'ClaudeBot', 'PerplexityBot']) expect(robots.includes(`User-agent: ${agent}`), `robots.txt explicitly allows ${agent}`);

const llms = file('public/llms.txt');
expect(llms.startsWith('# Brat Generator'), 'llms.txt has a clear H1 title');
expect(llms.includes('Canonical website: https://bratgeneratorpro.net/'), 'llms.txt declares the canonical website');
for (const heading of ['## Core tools', '## Styles', '## Tutorials and guides', '## Site information', '## Technical discovery']) {
  expect(llms.includes(heading), `llms.txt includes ${heading.replace('## ', '')}`);
}
for (const route of ['/video-generator/', '/brat-meme-generator/', '/brat-image-generator/', '/brat-album-cover-generator/', '/brat-styles/', '/blog/', '/about/', '/contact/', '/privacy-policy/', '/terms/']) {
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
expect(file('app/privacy-policy/page.tsx').includes('webPageSchema') && file('app/terms/page.tsx').includes('webPageSchema'), 'legal pages use shared WebPage schema');
expect(file('app/blog/page.tsx').includes("type: 'CollectionPage'") && file('app/blog/page.tsx').includes("'@type': 'Blog'"), 'blog hub uses CollectionPage + Blog schema');
for (const post of ['app/blog/how-to-make-a-brat-album-cover-free/page.tsx', 'app/blog/brat-generator-not-working/page.tsx']) {
  const text = file(post);
  expect(text.includes("'@type': 'BlogPosting'") && text.includes('webPageSchema') && text.includes('breadcrumbSchema'), `${post} uses BlogPosting + WebPage + Breadcrumb schema`);
}

// Redirects, host normalization and security headers.
const vercel = JSON.parse(file('vercel.json'));
const redirects = vercel.redirects || [];
for (const oldPath of ['/brat-text-generator', '/brat-font-generator', '/how-to', '/how-to-use', '/styles', '/features', '/key-features', '/brat-generator-features', '/how-to-make-a-brat-album-cover']) {
  expect(redirects.some((r) => r.source === oldPath || r.source === `${oldPath}/`), `Vercel has redirect for ${oldPath}`);
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
expect(htaccess.includes('RewriteRule ^brat-font-generator/?$ / [R=301,L]'), 'Apache redirects retired Brat Font route');
expect(htaccess.includes('X-Robots-Tag "noindex, follow"'), 'Apache fallback also noindexes llms.txt');

for (const [rel, destination] of [
  ['app/brat-text-generator/page.tsx', '/#generator'],
  ['app/brat-font-generator/page.tsx', '/#generator'],
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
for (const prefix of ['main', 'meme', 'image', 'album', 'video']) {
  for (let step = 1; step <= 4; step += 1) {
    expect(exists(`public/images/how-to/${prefix}-step-${step}.webp`), `${prefix} how-to step ${step} WebP exists`);
  }
}
expect(exists('components/HowToImage.tsx') && file('components/HowToImage.tsx').includes('howto-lightbox'), 'how-to screenshots use the click-to-enlarge lightbox');
expect(home.indexOf('id="how-to"') > -1 && home.indexOf('id="how-to"') < home.indexOf('Global Trend'), 'homepage How to Use section remains below About and above Global Trend');
expect(!toolShell.includes('tool-related-links') && !video.includes('Related Tools') && !video.includes('Keep Creating with'), 'dedicated tool pages still omit the removed Related Tools block');

const generator = file('components/BratGenerator.tsx');
for (const style of ['green', 'black', 'white', 'pink', 'blue']) expect(generator.includes(`${style}: { background:`), `main generator supports ${style} style preselection`);
expect(generator.includes("window.addEventListener('hashchange'") && generator.includes('applyStyleFromLocation'), 'main generator applies style-card hash changes automatically');
expect(generator.includes("green: 'brat'") && generator.includes("white: 'white'") && generator.includes('modeButton.click()'), 'styles with matching generator modes switch the visible menu mode');

const packageJson = JSON.parse(file('package.json'));
expect(Boolean(packageJson.scripts?.['technical:check']), 'package.json exposes technical:check');
expect(Boolean(packageJson.scripts?.['technical:live']), 'package.json exposes technical:live');
expect(Boolean(packageJson.scripts?.['seo:check']), 'package.json exposes seo:check');

console.log(`\nResult: ${failures ? 'FAIL' : 'PASS'} — ${failures} failure(s).`);
if (failures) process.exit(1);
