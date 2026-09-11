import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'out');
const failures = [];
const notes = [];

if (!fs.existsSync(out)) {
  console.error('ON-PAGE SEO CHECK FAILED: out/ folder not found. Run npm run build first.');
  process.exit(1);
}

const pages = [
  { rel: 'index.html', url: '/', keyword: 'brat generator', quick: true },
  { rel: 'features/index.html', url: '/features/', keyword: 'brat generator features' },
  { rel: 'how-to-use/index.html', url: '/how-to-use/', keyword: 'how to use brat generator', quick: true },
  { rel: 'brat-styles/index.html', url: '/brat-styles/', keyword: 'brat styles', quick: true },
  { rel: 'video-generator/index.html', url: '/video-generator/', keyword: 'brat video generator', quick: true },
  { rel: 'blog/index.html', url: '/blog/', keyword: 'brat generator guides' },
  { rel: 'blog/how-to-make-a-brat-album-cover-free/index.html', url: '/blog/how-to-make-a-brat-album-cover-free/', keyword: 'brat album cover generator', quick: true },
  { rel: 'blog/brat-generator-not-working/index.html', url: '/blog/brat-generator-not-working/', keyword: 'brat generator not working', quick: true },
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
    if (!norm(title).includes(key)) failures.push(`${page.url}: primary keyword missing from title: ${page.keyword}`);
    if (!h1s[0] || !norm(h1s[0]).includes(key)) failures.push(`${page.url}: primary keyword missing from H1: ${page.keyword}`);
    if (!norm(desc).includes(key)) failures.push(`${page.url}: primary keyword missing from meta description: ${page.keyword}`);

    const visibleNorm = norm(visible);
    const exactCount = visibleNorm.split(key).length - 1;
    const wordCount = Math.max(1, visibleNorm.split(/\s+/).length);
    const keywordWords = key.split(/\s+/).length;
    const density = (exactCount * keywordWords / wordCount) * 100;
    if (exactCount < 1) failures.push(`${page.url}: primary keyword not found in visible copy`);
    if (density > 4.5) failures.push(`${page.url}: primary keyword looks overused (${density.toFixed(2)}% exact-phrase density)`);
    notes.push(`${page.url}: ${page.keyword} — ${exactCount} exact visible mention(s), ${density.toFixed(2)}% phrase density`);
  }

  if (page.quick && !/quick answer:/i.test(visible)) failures.push(`${page.url}: missing concise “Quick answer” passage`);

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
console.log('Titles, descriptions, H1/H2 structure, keyword mapping, quick-answer passages, image alt coverage and internal anchor hygiene passed the automated checks.');
