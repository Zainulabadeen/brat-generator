import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
let failures = 0;
let warnings = 0;

function file(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}
function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}
function pass(msg) { console.log(`PASS  ${msg}`); }
function fail(msg) { failures += 1; console.error(`FAIL  ${msg}`); }
function warn(msg) { warnings += 1; console.warn(`WARN  ${msg}`); }
function expect(condition, msg) { condition ? pass(msg) : fail(msg); }

const expected = [
  ['/', 'app/page.tsx'],
  ['/features/', 'app/features/page.tsx'],
  ['/how-to-use/', 'app/how-to-use/page.tsx'],
  ['/brat-styles/', 'app/brat-styles/page.tsx'],
  ['/video-generator/', 'app/video-generator/page.tsx'],
  ['/blog/', 'app/blog/page.tsx'],
  ['/blog/how-to-make-a-brat-album-cover-free/', 'app/blog/how-to-make-a-brat-album-cover-free/page.tsx'],
  ['/blog/brat-generator-not-working/', 'app/blog/brat-generator-not-working/page.tsx'],
  ['/about/', 'app/about/page.tsx'],
  ['/contact/', 'app/contact/page.tsx'],
  ['/privacy-policy/', 'app/privacy-policy/page.tsx'],
  ['/terms/', 'app/terms/page.tsx'],
];

console.log('\nTECHNICAL SEO CHECK\n');

// Canonicals: every indexable route should declare itself.
for (const [route, source] of expected) {
  const text = file(source);
  const needle = route === '/' ? "alternates: { canonical: '/' }" : `alternates: { canonical: '${route}' }`;
  expect(text.includes(needle), `${route} has a self-referencing canonical`);
}

// Sitemap: exact public route set, no ignored priority/changefreq fields.
const sitemap = file('public/sitemap.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc>https:\/\/bratgeneratorpro\.net([^<]*)<\/loc>/g)].map(m => m[1] || '/');
const normalizedSitemap = sitemapUrls.map(v => v === '' ? '/' : v);
expect(normalizedSitemap.length === expected.length, `sitemap contains ${expected.length} indexable URLs`);
for (const [route] of expected) expect(normalizedSitemap.includes(route), `sitemap includes ${route}`);
expect(!/<priority>|<changefreq>/i.test(sitemap), 'sitemap omits ignored priority/changefreq hints');
expect(sitemap.includes('<lastmod>2026-09-22</lastmod>'), 'sitemap includes current meaningful lastmod dates');

// robots.txt
const robots = file('public/robots.txt');
expect(/User-agent:\s*Googlebot[\s\S]*?Allow:\s*\//i.test(robots), 'robots.txt explicitly allows Googlebot');
expect(robots.includes('Sitemap: https://bratgeneratorpro.net/sitemap.xml'), 'robots.txt declares the canonical sitemap');
const googleBlock = (robots.match(/User-agent:\s*Googlebot[\s\S]*?(?=\n# Google ads|\nUser-agent:\s*AdsBot-Google)/i) || [''])[0];
expect(!/Disallow:\s*\//i.test(googleBlock), 'robots.txt does not block Googlebot');

// Favicon and manifest
const layout = file('app/layout.tsx');
expect(exists('public/favicon.ico'), '48px multi-size favicon.ico exists');
expect(layout.includes("/favicon.ico") && layout.includes("/icon-192.png"), 'metadata exposes ICO and PNG favicons');
const manifest = file('public/manifest.webmanifest');
expect(manifest.includes('/icon-192.png') && manifest.includes('/icon-512.png'), 'manifest has 192px and 512px PNG icons');

// Schema
const home = file('app/page.tsx');
const about = file('app/about/page.tsx');
expect(home.includes('organizationSchema'), 'homepage publishes Organization schema');
expect(about.includes('organizationSchema'), 'About page publishes Organization schema');
const schemaLib = file('lib/schema.ts');
expect(schemaLib.includes("'@type': 'Organization'") && schemaLib.includes('icon-512.png'), 'Organization schema has a real logo');
const howTo = file('app/how-to-use/page.tsx');
const album = file('app/blog/how-to-make-a-brat-album-cover-free/page.tsx');
expect(howTo.includes('brat-cover-example-green.webp'), 'How-to Article/OG metadata uses a page-specific image');
expect(album.includes('brat-cover-example-green.webp'), 'Album guide Article/OG metadata uses a page-specific image');

// Redirects + headers
const vercel = file('vercel.json');
for (const oldPath of ['/how-to', '/styles', '/key-features', '/brat-generator-features', '/how-to-make-a-brat-album-cover']) {
  expect(vercel.includes(`\"source\": \"${oldPath}\"`), `Vercel keeps 301 redirect for ${oldPath}`);
}
for (const header of ['Strict-Transport-Security', 'Content-Security-Policy', 'X-Content-Type-Options', 'Referrer-Policy', 'X-Frame-Options', 'Permissions-Policy']) {
  expect(vercel.includes(header), `Vercel sends ${header}`);
}
expect(vercel.includes('"source": "/favicon.ico"'), 'Vercel caches favicon.ico explicitly');

const htaccess = file('public/.htaccess');
expect(htaccess.includes('Force HTTPS and the preferred non-www hostname'), 'Apache fallback forces HTTPS + non-www');
expect(htaccess.includes('ErrorDocument 404 /404.html'), 'Apache fallback returns the custom 404 document');

// Embedded tools should stay out of the search index.
for (const embed of ['public/brat-generator-embed.html', 'public/brat-video-generator-embed.html']) {
  const text = file(embed);
  expect(/noindex\s*,\s*nofollow/i.test(text), `${embed} is noindex/nofollow`);
}

// Video generator: no fake progress; real browser exports are implemented.
const videoHtml = file('public/brat-video-generator-embed.html');
expect(!videoHtml.includes('simulated progress'), 'video generator no longer uses simulated export progress');
expect(videoHtml.includes('MediaRecorder') && videoHtml.includes('captureStream'), 'video generator records a real browser video file');
expect(videoHtml.includes('image/gif') && videoHtml.includes('GIF89a'), 'video generator builds a real animated GIF');
expect(videoHtml.includes('application/zip') && videoHtml.includes('frame-'), 'video generator exports PNG frames in a ZIP');
const embeddedDocs = file('lib/embedDocuments.ts');
expect(embeddedDocs.includes('MediaRecorder') && embeddedDocs.includes('GIF89a'), 'production srcDoc contains the real exporter');

// Static 404 and no accidental noindex on normal pages.
expect(exists('app/not-found.tsx'), 'custom Next.js 404 page exists');
expect(!layout.includes('index: false'), 'root metadata does not noindex the public site');

console.log(`\nResult: ${failures ? 'FAIL' : 'PASS'} — ${failures} failure(s), ${warnings} warning(s).`);
if (failures) process.exit(1);
