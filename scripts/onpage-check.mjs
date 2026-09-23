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
  { rel: 'video-generator/index.html', url: '/video-generator/', keyword: 'brat video generator', schema: 'WebApplication' },
  { rel: 'brat-meme-generator/index.html', url: '/brat-meme-generator/', keyword: 'brat meme generator', schema: 'WebApplication' },
  { rel: 'brat-image-generator/index.html', url: '/brat-image-generator/', keyword: 'brat image generator', schema: 'WebApplication' },
  { rel: 'brat-album-cover-generator/index.html', url: '/brat-album-cover-generator/', keyword: 'brat album cover generator', schema: 'WebApplication' },
  { rel: 'features/index.html', url: '/features/', keyword: 'brat generator', schema: 'WebPage' },
  { rel: 'brat-styles/index.html', url: '/brat-styles/', keyword: 'brat styles', schema: 'CollectionPage' },
  { rel: 'blog/index.html', url: '/blog/', keyword: 'brat generator', schema: 'Blog' },
  { rel: 'blog/how-to-make-a-brat-album-cover-free/index.html', url: '/blog/how-to-make-a-brat-album-cover-free/', keyword: 'how to make a brat album cover', schema: 'BlogPosting' },
  { rel: 'blog/brat-generator-not-working/index.html', url: '/blog/brat-generator-not-working/', keyword: 'brat generator not working', schema: 'BlogPosting' },
  { rel: 'about/index.html', url: '/about/', schema: 'AboutPage' },
  { rel: 'contact/index.html', url: '/contact/', schema: 'ContactPage' },
  { rel: 'privacy-policy/index.html', url: '/privacy-policy/', schema: 'WebPage' },
  { rel: 'terms/index.html', url: '/terms/', schema: 'WebPage' },
];

const redirectSources = new Set(['/brat-text-generator', '/how-to', '/how-to-use', '/styles', '/key-features', '/brat-generator-features', '/how-to-make-a-brat-album-cover', '/blog/how-to-make-a-brat-album-cover']);

const decode = (s = '') => s
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#([0-9]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)));

const textOnly = (html) => decode(html
  .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
).replace(/\s+/g, ' ').trim();

const norm = (s) => s.toLowerCase().replace(/[–—:|,+()]/g, ' ').replace(/\s+/g, ' ').trim();
const titleSeen = new Map();
const descSeen = new Map();

for (const page of pages) {
  const file = path.join(out, page.rel);
  if (!fs.existsSync(file)) { failures.push(`Missing built page: out/${page.rel}`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const visible = textOnly(html);
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '').trim();
  const desc = decode(html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] || '').trim();
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => textOnly(m[1]));
  const h2s = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => textOnly(m[1]));
  const canonical = decode(html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1] || '').trim();
  const expectedCanonical = `${siteBase}${page.url}`;

  if (!title) failures.push(`${page.url}: missing title`);
  else {
    if (title.length < 30 || title.length > 65) failures.push(`${page.url}: title length ${title.length} (target 30–65)`);
    if (titleSeen.has(title)) failures.push(`${page.url}: duplicate title with ${titleSeen.get(title)}`); else titleSeen.set(title, page.url);
  }
  if (!desc) failures.push(`${page.url}: missing meta description`);
  else {
    if (desc.length < 100 || desc.length > 165) failures.push(`${page.url}: meta description length ${desc.length} (target 100–165)`);
    if (descSeen.has(desc)) failures.push(`${page.url}: duplicate meta description with ${descSeen.get(desc)}`); else descSeen.set(desc, page.url);
  }
  if (canonical !== expectedCanonical) failures.push(`${page.url}: canonical mismatch (${canonical || 'missing'} !== ${expectedCanonical})`);
  if (h1s.length !== 1) failures.push(`${page.url}: expected exactly one H1, found ${h1s.length}`);
  if (!h2s.length) failures.push(`${page.url}: no H2 section heading found`);

  const robots = decode(html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i)?.[1] || '').toLowerCase();
  if (robots.includes('noindex') || robots.includes('nofollow')) failures.push(`${page.url}: robots meta blocks indexing/following`);

  const ogTitle = html.match(/property=["']og:title["']/i);
  const ogDesc = html.match(/property=["']og:description["']/i);
  const twitter = html.match(/name=["']twitter:card["']/i);
  if (!ogTitle) failures.push(`${page.url}: missing Open Graph title`);
  if (!ogDesc) failures.push(`${page.url}: missing Open Graph description`);
  if (!twitter) failures.push(`${page.url}: missing Twitter card metadata`);

  if (!html.includes('application/ld+json')) failures.push(`${page.url}: no JSON-LD structured data found`);
  if (!html.includes('BreadcrumbList') && page.url !== '/') failures.push(`${page.url}: BreadcrumbList schema missing`);
  if (page.schema && !html.includes(`\"@type\":\"${page.schema}\"`) && !html.includes(`"@type":"${page.schema}"`) && !html.includes(`"@type": "${page.schema}"`)) failures.push(`${page.url}: expected ${page.schema} schema not found`);

  if (page.keyword) {
    const key = norm(page.keyword);
    const titleNorm = norm(title);
    const visibleNorm = norm(visible);
    const h1Norm = norm(h1s.join(' '));
    if (!titleNorm.includes(key)) failures.push(`${page.url}: primary keyword missing from title: ${page.keyword}`);
    if (!h1Norm.includes(key) && !visibleNorm.includes(key)) failures.push(`${page.url}: primary keyword missing from H1/body: ${page.keyword}`);
    const count = visibleNorm.split(key).length - 1;
    notes.push(`${page.url}: ${page.keyword} — ${count} visible exact mention(s)`);
  }

  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
  for (const img of imgs) if (!/\balt=["'][^"']*["']/i.test(img)) failures.push(`${page.url}: image without alt attribute`);

  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = decode(match[1]).trim();
    const base = href.split('#')[0].replace(/\/$/, '') || '/';
    if (href.startsWith('/') && redirectSources.has(base)) failures.push(`${page.url}: internal link points at redirect source ${href}`);
  }
}

console.log('ON-PAGE SEO AUDIT\n------------------');
for (const note of notes) console.log('•', note);
if (failures.length) {
  console.error(`\nON-PAGE SEO CHECK FAILED (${failures.length} issues):`);
  for (const failure of failures) console.error('-', failure);
  process.exit(1);
}
console.log('\nON-PAGE SEO CHECK: PASS');
console.log('Unique metadata, canonicals, indexability, H1/H2 structure, social metadata, structured data, keyword ownership, image alt coverage and redirect-link hygiene passed.');
