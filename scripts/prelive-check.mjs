import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'out');
const expected = [
  'index.html',
  '404.html',
  'features/index.html',
  'how-to-use/index.html',
  'brat-styles/index.html',
  'blog/index.html',
  'blog/how-to-make-a-brat-album-cover-free/index.html',
  'blog/brat-generator-not-working/index.html',
  'about/index.html',
  'privacy-policy/index.html',
  'terms/index.html',
  'contact/index.html',
  'robots.txt',
  'sitemap.xml',
  'manifest.webmanifest',
  'og-image.png',
  'favicon.svg',
  '.htaccess',
];

const failures = [];
if (!fs.existsSync(out)) {
  console.error('PRE-LIVE CHECK FAILED: out/ folder not found. Run npm run build first.');
  process.exit(1);
}

for (const rel of expected) {
  if (!fs.existsSync(path.join(out, rel))) failures.push(`Missing: out/${rel}`);
}

const htmlFiles = expected.filter((x) => x.endsWith('.html') && x !== '404.html');
for (const rel of htmlFiles) {
  const file = path.join(out, rel);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`No title: out/${rel}`);
  if (!/rel="canonical"/i.test(html)) failures.push(`No canonical: out/${rel}`);
  if (/brategenrator\.lovable\.app|bratgenerator\.app/i.test(html)) failures.push(`Old/wrong domain found: out/${rel}`);
}

const robotsPath = path.join(out, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (!robots.includes('https://bratgeneratorpro.net/sitemap.xml')) failures.push('robots.txt does not reference the final sitemap URL');
}

const sitemapPath = path.join(out, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const requiredUrls = [
    'https://bratgeneratorpro.net/',
    'https://bratgeneratorpro.net/features/',
    'https://bratgeneratorpro.net/how-to-use/',
    'https://bratgeneratorpro.net/brat-styles/',
    'https://bratgeneratorpro.net/blog/',
    'https://bratgeneratorpro.net/blog/how-to-make-a-brat-album-cover-free/',
    'https://bratgeneratorpro.net/blog/brat-generator-not-working/',
  ];
  for (const url of requiredUrls) if (!sitemap.includes(url)) failures.push(`Sitemap missing: ${url}`);
}

if (failures.length) {
  console.error('\nPRE-LIVE CHECK FAILED');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}

console.log('\n==============================================');
console.log(' PRE-LIVE BUILD CHECK: PASS');
console.log('==============================================');
console.log(`Checked ${expected.length} required output files.`);
console.log('Checked page titles, canonicals, old-domain leakage, robots and sitemap.');
console.log('The build is ready for backup/deployment steps.');
