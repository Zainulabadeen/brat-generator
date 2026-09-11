import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'out');
const siteBase = 'https://bratgeneratorpro.net';
const failures = [];
const notes = [];

if (!fs.existsSync(out)) {
  console.error('ON-PAGE SEO CHECK FAILED: out/ folder not found. Run npm run build first.');
  process.exit(1);
}

const pages = [
  { rel: 'index.html', url: '/', keyword: 'brat generator' },
  { rel: 'features/index.html', url: '/features/', keyword: 'brat generator key features' },
  { rel: 'how-to-use/index.html', url: '/how-to-use/', keyword: 'how to use brat generator' },
  { rel: 'brat-styles/index.html', url: '/brat-styles/', keyword: 'brat styles' },
  { rel: 'video-generator/index.html', url: '/video-generator/', keyword: 'brat video generator' },
  { rel: 'blog/index.html', url: '/blog/', keyword: 'brat generator guides' },
  { rel: 'blog/how-to-make-a-brat-album-cover-free/index.html', url: '/blog/how-to-make-a-brat-album-cover-free/', keyword: 'how to make a brat album cover' },
  { rel: 'blog/brat-generator-not-working/index.html', url: '/blog/brat-generator-not-working/', keyword: 'brat generator not working' },
  { rel: 'about/index.html', url: '/about/' },
  { rel: 'contact/index.html', url: '/contact/' },
  { rel: 'privacy-policy/index.html', url: '/privacy-policy/' },
  { rel: 'terms/index.html', url: '/terms/' },
];

const redirectSources = new Set([
  '/how-to', '/styles', '/key-features', '/brat-generator-features',
  '/how-to-make-a-brat-album-cover', '/blog/how-to-make-a-brat-album-cover',
]);

const decode = (s = '') => s
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#([0-9]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)));

const textOnly = (html) => decode(
  html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
).replace(/\s+/g, ' ').trim();

const cleanInner = (html) => textOnly(html);
const norm = (s) => s.toLowerCase().replace(/[–—:|,+()]/g, ' ').replace(/\s+/g, ' ').trim();

const titleSeen = new Map();
const descSeen = new Map();

for (const page of pages) {
  const file = path.join(out, page.rel);
  if (!fs.existsSync(file)) {
    failures.push(`Missing built page: out/${page.rel}`);
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '').trim();
  const desc = decode(
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1]
    || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1]
    || ''
  ).trim();
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => cleanInner(m[1]));
  const h2s = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => cleanInner(m[1]));
  const visible = textOnly(html);

  const canonical = decode(
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1]
    || ''
  ).trim();
  const expectedCanonical = `${siteBase}${page.url}`;
  if (!canonical) failures.push(`${page.url}: missing canonical URL`);
  else if (canonical !== expectedCanonical) failures.push(`${page.url}: canonical mismatch (${canonical} !== ${expectedCanonical})`);

  const robotsMeta = decode(
    html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i)?.[1]
    || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["']/i)?.[1]
    || ''
  ).toLowerCase();
  if (robotsMeta.includes('noindex') || robotsMeta.includes('nofollow')) failures.push(`${page.url}: robots meta blocks indexing or following`);

  const ogTitle = decode(html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i)?.[1] || '').trim();
  const ogDesc = decode(html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i)?.[1] || '').trim();
  const twitterCard = decode(html.match(/<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']*)["']/i)?.[1] || '').trim();
  if (!ogTitle) failures.push(`${page.url}: missing Open Graph title`);
  if (!ogDesc) failures.push(`${page.url}: missing Open Graph description`);
  if (!twitterCard) failures.push(`${page.url}: missing Twitter card metadata`);

  if (page.url !== '/' && !html.includes('BreadcrumbList')) failures.push(`${page.url}: missing BreadcrumbList structured data`);
  if (page.url === '/' && !html.includes('FAQPage')) failures.push(`${page.url}: missing FAQPage structured data for visible FAQ content`);
  if ((page.url === '/' || page.url === '/video-generator/') && !html.includes('WebApplication')) failures.push(`${page.url}: missing WebApplication structured data`);
  if ((page.url.includes('/blog/') && page.url !== '/blog/') && !html.includes('BlogPosting')) failures.push(`${page.url}: missing BlogPosting structured data`);
  if (page.url === '/how-to-use/' && !html.includes('Article')) failures.push(`${page.url}: missing Article structured data`);

  if (!title) failures.push(`${page.url}: missing title`);
  else {
    if (title.length < 30 || title.length > 65) failures.push(`${page.url}: title length ${title.length} (target 30–65)`);
    if (titleSeen.has(title)) failures.push(`${page.url}: duplicate title with ${titleSeen.get(title)}`);
    else titleSeen.set(title, page.url);
  }

  if (!desc) failures.push(`${page.url}: missing meta description`);
  else {
    if (desc.length < 100 || desc.length > 165) failures.push(`${page.url}: meta description length ${desc.length} (target 100–165)`);
    if (descSeen.has(desc)) failures.push(`${page.url}: duplicate meta description with ${descSeen.get(desc)}`);
    else descSeen.set(desc, page.url);
  }

  if (h1s.length !== 1) failures.push(`${page.url}: expected exactly one H1, found ${h1s.length}`);
  if (!h2s.length) failures.push(`${page.url}: no H2 section heading found`);

  if (page.keyword) {
    const key = norm(page.keyword);
    const visibleNorm = norm(visible);
    const exactCount = visibleNorm.split(key).length - 1;
    const wordCount = Math.max(1, visibleNorm.split(/\s+/).length);
    const keywordWords = key.split(/\s+/).length;
    const density = (exactCount * keywordWords / wordCount) * 100;

    if (!norm(title).includes(key)) failures.push(`${page.url}: primary keyword missing from title: ${page.keyword}`);
    if (exactCount < 1) failures.push(`${page.url}: primary keyword not found in visible copy`);
    if (density > 4.5) failures.push(`${page.url}: primary keyword looks overused (${density.toFixed(2)}% exact-phrase density)`);
    notes.push(`${page.url}: ${page.keyword} — ${exactCount} exact visible mention(s), ${density.toFixed(2)}% phrase density`);
  }

  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  for (const img of imgs) {
    if (!/\balt=["'][^"']*["']/i.test(img)) failures.push(`${page.url}: image without alt attribute`);
  }

  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = decode(match[1]).trim();
    const anchor = cleanInner(match[2]);
    if (/^(click here|here|read more|learn more)$/i.test(anchor)) failures.push(`${page.url}: vague anchor text “${anchor}”`);
    const base = href.split('#')[0].replace(/\/$/, '') || '/';
    if (href.startsWith('/') && redirectSources.has(base)) failures.push(`${page.url}: internal link points at redirect source ${href}`);
  }
}

console.log('ON-PAGE SEO AUDIT');
console.log('------------------');
for (const note of notes) console.log('•', note);

if (failures.length) {
  console.error(`\nON-PAGE SEO CHECK FAILED (${failures.length} issue${failures.length === 1 ? '' : 's'}):`);
  for (const failure of failures) console.error('-', failure);
  process.exit(1);
}

console.log('\nON-PAGE SEO CHECK: PASS');
console.log('Titles, descriptions, canonicals, indexability, social metadata, structured data, H1/H2 structure, keyword mapping, image alt coverage and internal anchor hygiene passed the automated checks.');
