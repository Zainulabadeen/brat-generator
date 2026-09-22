import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
let failures = 0;
function file(rel){ return fs.readFileSync(path.join(root, rel), 'utf8'); }
function exists(rel){ return fs.existsSync(path.join(root, rel)); }
function pass(msg){ console.log(`PASS  ${msg}`); }
function fail(msg){ failures += 1; console.error(`FAIL  ${msg}`); }
function expect(cond,msg){ cond ? pass(msg) : fail(msg); }

const expected = [
  ['/', 'app/page.tsx'],
  ['/video-generator/', 'app/video-generator/page.tsx'],
  ['/brat-meme-generator/', 'app/brat-meme-generator/page.tsx'],
  ['/brat-image-generator/', 'app/brat-image-generator/page.tsx'],
  ['/brat-font-generator/', 'app/brat-font-generator/page.tsx'],
  ['/brat-album-cover-generator/', 'app/brat-album-cover-generator/page.tsx'],
  ['/features/', 'app/features/page.tsx'],
  ['/brat-styles/', 'app/brat-styles/page.tsx'],
  ['/blog/', 'app/blog/page.tsx'],
  ['/blog/how-to-make-a-brat-album-cover-free/', 'app/blog/how-to-make-a-brat-album-cover-free/page.tsx'],
  ['/blog/brat-generator-not-working/', 'app/blog/brat-generator-not-working/page.tsx'],
  ['/about/', 'app/about/page.tsx'],
  ['/contact/', 'app/contact/page.tsx'],
  ['/privacy-policy/', 'app/privacy-policy/page.tsx'],
  ['/terms/', 'app/terms/page.tsx'],
];

console.log('\nTECHNICAL SEO CHECK\n');
expect(exists('lib/schema.ts'), 'shared schema library exists at lib/schema.ts');

for (const [route, source] of expected) {
  expect(exists(source), `${route} source exists`);
  if (!exists(source)) continue;
  const text = file(source);
  const needle = route === '/' ? "alternates: { canonical: '/' }" : `alternates: { canonical: '${route}' }`;
  expect(text.includes(needle), `${route} has a self-referencing canonical`);
}

const sitemap = file('public/sitemap.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc>https:\/\/bratgeneratorpro\.net([^<]*)<\/loc>/g)].map(m => m[1] || '/');
expect(sitemapUrls.length === expected.length, `sitemap contains exactly ${expected.length} indexable URLs`);
for (const [route] of expected) expect(sitemapUrls.includes(route), `sitemap includes ${route}`);
for (const removed of ['/how-to-use/','/brat-text-generator/']) expect(!sitemapUrls.includes(removed), `sitemap excludes retired ${removed}`);
expect(!/<priority>|<changefreq>/i.test(sitemap), 'sitemap omits ignored priority/changefreq hints');
expect(sitemap.includes('<lastmod>2026-09-23</lastmod>'), 'sitemap has current meaningful lastmod dates');

const robots = file('public/robots.txt');
expect(/User-agent:\s*Googlebot[\s\S]*?Allow:\s*\//i.test(robots), 'robots.txt allows Googlebot');
expect(robots.includes('Sitemap: https://bratgeneratorpro.net/sitemap.xml'), 'robots.txt declares canonical sitemap');

const layout = file('app/layout.tsx');
expect(layout.includes('index: true') && layout.includes('follow: true'), 'root robots metadata allows index/follow');
expect(layout.includes("'/favicon.ico'") && layout.includes("'/icon-192.png'"), 'ICO and PNG favicons are exposed');
expect(layout.includes("lang=\"en-GB\""), 'root HTML language is en-GB');
expect(exists('public/favicon.ico') && exists('public/icon-192.png') && exists('public/icon-512.png'), 'favicon/PWA icon files exist');

const home = file('app/page.tsx');
expect(home.includes('WebSite') && home.includes('WebApplication') && home.includes('organizationSchema'), 'homepage publishes WebSite + WebApplication + Organization schema');
const toolShell = file('components/ToolPageShell.tsx');
expect(toolShell.includes("'@type': 'WebApplication'") && toolShell.includes("'@type': 'WebPage'") && toolShell.includes('breadcrumbSchema'), 'shared tool pages publish WebApplication + WebPage + Breadcrumb schema');
const video = file('app/video-generator/page.tsx');
expect(video.includes("'@type': 'WebApplication'") && video.includes("'@type': 'WebPage'"), 'video page publishes WebApplication + WebPage schema');
const albumPost = file('app/blog/how-to-make-a-brat-album-cover-free/page.tsx');
const troublePost = file('app/blog/brat-generator-not-working/page.tsx');
expect(albumPost.includes("'@type': 'BlogPosting'") && troublePost.includes("'@type': 'BlogPosting'"), 'blog articles publish BlogPosting schema');
expect(file('app/blog/page.tsx').includes("'@type': 'Blog'"), 'blog hub publishes Blog schema');
expect(file('app/about/page.tsx').includes("'@type': 'AboutPage'"), 'About page publishes AboutPage schema');
expect(file('app/contact/page.tsx').includes("'@type': 'ContactPage'"), 'Contact page publishes ContactPage schema');
expect(file('app/brat-styles/page.tsx').includes("'@type': 'CollectionPage'"), 'Brat Styles publishes CollectionPage schema');

const vercel = file('vercel.json');
for (const oldPath of ['/brat-text-generator','/how-to','/how-to-use','/styles','/key-features','/brat-generator-features','/how-to-make-a-brat-album-cover']) expect(vercel.includes(`\"source\": \"${oldPath}\"`), `Vercel has redirect for ${oldPath}`);
expect(vercel.includes('"destination": "/"'), 'retired Brat Text route redirects to homepage');
for (const h of ['Strict-Transport-Security','Content-Security-Policy','X-Content-Type-Options','Referrer-Policy','X-Frame-Options','Permissions-Policy']) expect(vercel.includes(h), `Vercel sends ${h}`);
expect(vercel.includes('accounts.google.com'), 'CSP allows Google Identity Services');

const htaccess = file('public/.htaccess');
expect(htaccess.includes('Force HTTPS and the preferred non-www hostname'), 'Apache fallback forces HTTPS + non-www');
expect(htaccess.includes('ErrorDocument 404 /404.html'), 'Apache fallback has custom 404');
expect(htaccess.includes('RewriteRule ^brat-text-generator/?$ / [R=301,L]'), 'Apache redirects retired Brat Text route to homepage');

for (const embed of ['public/brat-generator-embed.html','public/brat-video-generator-embed.html']) {
  const text = file(embed);
  expect(/noindex\s*,\s*nofollow/i.test(text), `${embed} is noindex/nofollow`);
}
expect(exists('app/not-found.tsx'), 'custom Next.js 404 page exists');
expect(!layout.includes('index: false'), 'public site is not accidentally noindexed');

const allSource = expected.map(([,source]) => file(source)).join('\n') + '\n' + file('components/SiteHeader.tsx') + '\n' + file('components/SiteFooter.tsx');
for (const retired of ['/brat-text-generator/','/how-to-use/']) expect(!allSource.includes(`href=\"${retired}`) && !allSource.includes(`href={'${retired}`), `main indexable source avoids internal links to retired ${retired}`);

const packageJson = JSON.parse(file('package.json'));
expect(Boolean(packageJson.scripts?.['technical:check']), 'package.json exposes technical:check');
expect(Boolean(packageJson.scripts?.['technical:live']), 'package.json exposes technical:live');
expect(Boolean(packageJson.scripts?.['seo:check']), 'package.json exposes seo:check');

console.log(`\nResult: ${failures ? 'FAIL' : 'PASS'} — ${failures} failure(s).`);
if (failures) process.exit(1);
