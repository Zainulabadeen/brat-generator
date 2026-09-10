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
  'video-generator/index.html',
  'brat-generator-embed.html',
  'brat-video-generator-embed.html',
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
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

// Canonicals are required on real indexable Next.js pages, not on the two
// standalone HTML files used only inside iframes. Those embed documents should
// stay noindex instead, so search engines do not treat them as separate pages.
const pageHtmlFiles = expected.filter(
  (x) => x.endsWith('.html') && x !== '404.html' && !x.endsWith('-embed.html'),
);
for (const rel of pageHtmlFiles) {
  const file = path.join(out, rel);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`No title: out/${rel}`);
  if (!/rel="canonical"/i.test(html)) failures.push(`No canonical: out/${rel}`);
  if (/brategenrator\.lovable\.app|bratgenerator\.app/i.test(html)) failures.push(`Old/wrong domain found: out/${rel}`);
}

const embedHtmlFiles = ['brat-generator-embed.html', 'brat-video-generator-embed.html'];
for (const rel of embedHtmlFiles) {
  const file = path.join(out, rel);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`No title: out/${rel}`);
  if (!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
    failures.push(`Embed file is not noindex: out/${rel}`);
  }
  if (/brategenrator\.lovable\.app|bratgenerator\.app/i.test(html)) failures.push(`Old/wrong domain found: out/${rel}`);
}

const robotsPath = path.join(out, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (!robots.includes('https://bratgeneratorpro.net/sitemap.xml')) failures.push('robots.txt does not reference the final sitemap URL');
  if (!/User-agent:\s*\*[^]*Allow:\s*\//i.test(robots)) failures.push('robots.txt does not clearly allow the public site');
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
    'https://bratgeneratorpro.net/video-generator/',
    'https://bratgeneratorpro.net/about/',
    'https://bratgeneratorpro.net/contact/',
    'https://bratgeneratorpro.net/privacy-policy/',
    'https://bratgeneratorpro.net/terms/',
  ];
  for (const url of requiredUrls) if (!sitemap.includes(url)) failures.push(`Sitemap missing: ${url}`);
  if (/brat-(?:video-)?generator-embed\.html|404\.html/i.test(sitemap)) failures.push('Sitemap contains a non-indexable embed or 404 URL');
}

const llmsPath = path.join(out, 'llms.txt');
if (fs.existsSync(llmsPath)) {
  const llms = fs.readFileSync(llmsPath, 'utf8');
  if (!/^# Brat Generator\s*$/m.test(llms)) failures.push('llms.txt missing required H1 site title');
  if (!/^> .+/m.test(llms)) failures.push('llms.txt missing summary blockquote');
  if (!llms.includes('https://bratgeneratorpro.net/')) failures.push('llms.txt missing final canonical domain');
  if (!llms.includes('https://bratgeneratorpro.net/sitemap.xml')) failures.push('llms.txt missing sitemap link');
  if (/brategenrator\.lovable\.app|bratgenerator\.app/i.test(llms)) failures.push('Old/wrong domain found in llms.txt');
}

const robotsPathText = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : '';
if (/content-signal\s*:/i.test(robotsPathText)) failures.push('robots.txt contains non-standard Content-Signal directive');
if (/crawl-delay\s*:/i.test(robotsPathText)) failures.push('robots.txt contains Crawl-delay; keep Google-facing robots rules standards-based');


const vercelConfigPath = path.join(root, 'vercel.json');
if (!fs.existsSync(vercelConfigPath)) {
  failures.push('Missing root vercel.json technical SEO configuration');
} else {
  try {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
    const redirects = Array.isArray(vercelConfig.redirects) ? vercelConfig.redirects : [];
    const requiredRedirects = ['/how-to', '/styles', '/key-features', '/brat-generator-features', '/how-to-make-a-brat-album-cover', '/blog/how-to-make-a-brat-album-cover'];
    for (const source of requiredRedirects) {
      if (!redirects.some((x) => x?.source === source)) failures.push(`Vercel redirect missing: ${source}`);
    }
    const headers = Array.isArray(vercelConfig.headers) ? vercelConfig.headers : [];
    for (const source of ['/brat-generator-embed.html', '/brat-video-generator-embed.html']) {
      const row = headers.find((x) => x?.source === source);
      const hasNoindex = row?.headers?.some((h) => String(h?.key).toLowerCase() === 'x-robots-tag' && /noindex/i.test(String(h?.value)));
      if (!hasNoindex) failures.push(`Vercel X-Robots-Tag noindex missing: ${source}`);
    }
  } catch {
    failures.push('vercel.json is not valid JSON');
  }
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
console.log('Checked titles, canonicals, embed noindex rules, redirects, old-domain leakage, robots, sitemap, llms.txt and Vercel SEO headers.');
console.log('The build is ready for backup/deployment steps.');
