import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'out');

function readOutFile(rel) {
  const fp = path.join(out, rel);
  return fs.existsSync(fp) ? fs.readFileSync(fp, 'utf8') : '';
}
const indexablePages = [
  ['/', 'index.html'],
  ['/video-generator/', 'video-generator/index.html'],
  ['/brat-meme-generator/', 'brat-meme-generator/index.html'],
  ['/brat-image-generator/', 'brat-image-generator/index.html'],
  ['/brat-album-cover-generator/', 'brat-album-cover-generator/index.html'],
  ['/brat-styles/', 'brat-styles/index.html'],
  ['/blog/', 'blog/index.html'],
  ['/blog/how-to-make-a-brat-album-cover-free/', 'blog/how-to-make-a-brat-album-cover-free/index.html'],
  ['/blog/brat-generator-not-working/', 'blog/brat-generator-not-working/index.html'],
  ['/about/', 'about/index.html'],
  ['/contact/', 'contact/index.html'],
  ['/privacy-policy/', 'privacy-policy/index.html'],
  ['/terms/', 'terms/index.html'],
];
const technicalFiles = [
  '404.html',
  'brat-generator-embed/index.html',
  'brat-video-generator-embed/index.html',
  'robots.txt',
  'sitemap.xml',
  'sitemap_index.xml',
  'llms.txt',
  'manifest.webmanifest',
  'og-image.png',
  'favicon.ico',
  'favicon.svg',
  'icon-192.png',
  'icon-512.png',
  '.htaccess',
];
const failures = [];

if (!fs.existsSync(out)) {
  console.error('PRE-LIVE CHECK FAILED: out/ folder not found. Run npm run build first.');
  process.exit(1);
}

for (const [, rel] of indexablePages) {
  if (!fs.existsSync(path.join(out, rel))) failures.push(`Missing: out/${rel}`);
}
for (const rel of technicalFiles) {
  if (!fs.existsSync(path.join(out, rel))) failures.push(`Missing: out/${rel}`);
}

if (failures.some((item) => item.startsWith('Missing: '))) {
  console.error('\nPRE-LIVE CHECK FAILED: build output is incomplete. Run npm run build successfully first.');
  failures.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

for (const [route, rel] of indexablePages) {
  const fp = path.join(out, rel);
  if (!fs.existsSync(fp)) continue;
  const html = fs.readFileSync(fp, 'utf8');
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`No title: out/${rel}`);
  if (!/rel=["']canonical["']/i.test(html)) failures.push(`No canonical: out/${rel}`);
  if (!/application\/ld\+json/i.test(html)) failures.push(`No JSON-LD: out/${rel}`);
  if (/name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) failures.push(`Unexpected noindex: out/${rel}`);
  if (/brategenrator\.lovable\.app|bratgenerator\.app/i.test(html)) failures.push(`Old/wrong domain found: out/${rel}`);
  if (route !== '/' && !html.includes('BreadcrumbList')) failures.push(`BreadcrumbList missing: out/${rel}`);
}

for (const rel of ['brat-generator-embed/index.html', 'brat-video-generator-embed/index.html']) {
  const fp = path.join(out, rel);
  if (!fs.existsSync(fp)) continue;
  const html = fs.readFileSync(fp, 'utf8');
  if (!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) failures.push(`Embed file is not noindex: out/${rel}`);
}

const home = readOutFile('index.html');
for (const type of ['WebSite', 'Organization', 'WebPage', 'SoftwareApplication', 'FAQPage']) {
  if (!home.includes(`\"@type\":\"${type}\"`) && !home.includes(`"@type":"${type}"`)) failures.push(`Homepage schema missing ${type}`);
}
for (const rel of ['video-generator/index.html', 'brat-meme-generator/index.html', 'brat-image-generator/index.html', 'brat-album-cover-generator/index.html']) {
  const html = readOutFile(rel);
  if (!html.includes('SoftwareApplication')) failures.push(`SoftwareApplication schema missing: out/${rel}`);
}

const sitemap = readOutFile('sitemap.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc>(https:\/\/bratgeneratorpro\.net[^<]*)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length !== indexablePages.length) failures.push(`Sitemap should contain ${indexablePages.length} URLs, found ${sitemapUrls.length}`);
for (const [route] of indexablePages) {
  const expected = `https://bratgeneratorpro.net${route}`;
  if (!sitemapUrls.includes(expected)) failures.push(`Sitemap missing: ${expected}`);
}
for (const retired of ['https://bratgeneratorpro.net/brat-text-generator/', 'https://bratgeneratorpro.net/brat-font-generator/', 'https://bratgeneratorpro.net/how-to-use/', 'https://bratgeneratorpro.net/features/']) {
  if (sitemap.includes(retired)) failures.push(`Sitemap should not include retired URL: ${retired}`);
}

const robots = readOutFile('robots.txt');
if (!robots.includes('Sitemap: https://bratgeneratorpro.net/sitemap.xml')) failures.push('robots.txt does not reference final sitemap URL');
if (/Disallow:\s*\/$/im.test(robots)) failures.push('robots.txt blocks the public site');

const sitemapIndex = readOutFile('sitemap_index.xml');
if (!sitemapIndex.includes('https://bratgeneratorpro.net/sitemap.xml')) failures.push('sitemap_index.xml does not reference canonical sitemap.xml');

const llms = readOutFile('llms.txt');
if (!llms.includes('# Brat Generator') || !llms.includes('https://bratgeneratorpro.net/video-generator/') || !llms.includes('https://bratgeneratorpro.net/brat-styles/')) failures.push('llms.txt is missing current core-site references');

if (failures.length) {
  console.error('\nPRE-LIVE CHECK FAILED');
  failures.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

console.log('\n==============================================');
console.log(' PRE-LIVE BUILD CHECK: PASS');
console.log('==============================================');
console.log(`Checked ${indexablePages.length} indexable pages plus ${technicalFiles.length} technical files, metadata, JSON-LD, embeds, robots, sitemap and llms.txt.`);
