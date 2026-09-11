import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'out');
const failures = [];

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
  'brat-generator-free-online-tool.png',
  'favicon.svg',
  '.htaccess',
];

const canonicalPages = [
  ['index.html', 'https://bratgeneratorpro.net/'],
  ['features/index.html', 'https://bratgeneratorpro.net/features/'],
  ['how-to-use/index.html', 'https://bratgeneratorpro.net/how-to-use/'],
  ['brat-styles/index.html', 'https://bratgeneratorpro.net/brat-styles/'],
  ['video-generator/index.html', 'https://bratgeneratorpro.net/video-generator/'],
  ['blog/index.html', 'https://bratgeneratorpro.net/blog/'],
  ['blog/how-to-make-a-brat-album-cover-free/index.html', 'https://bratgeneratorpro.net/blog/how-to-make-a-brat-album-cover-free/'],
  ['blog/brat-generator-not-working/index.html', 'https://bratgeneratorpro.net/blog/brat-generator-not-working/'],
  ['about/index.html', 'https://bratgeneratorpro.net/about/'],
  ['contact/index.html', 'https://bratgeneratorpro.net/contact/'],
  ['privacy-policy/index.html', 'https://bratgeneratorpro.net/privacy-policy/'],
  ['terms/index.html', 'https://bratgeneratorpro.net/terms/'],
];

const onPageKeywordExpectations = [
  ['index.html', 'brat generator'],
  ['features/index.html', 'brat generator features'],
  ['how-to-use/index.html', 'how to use brat generator'],
  ['brat-styles/index.html', 'brat styles'],
  ['video-generator/index.html', 'brat video generator'],
  ['blog/index.html', 'brat generator guides'],
  ['blog/how-to-make-a-brat-album-cover-free/index.html', 'brat album cover'],
  ['blog/brat-generator-not-working/index.html', 'brat generator not working'],
];

const readText = (file) => fs.readFileSync(file, 'utf8');
const source = (rel) => readText(path.join(root, rel));

if (!fs.existsSync(out)) {
  console.error('PRE-LIVE CHECK FAILED: out/ folder not found. Run npm run build first.');
  process.exit(1);
}

for (const rel of expected) {
  if (!fs.existsSync(path.join(out, rel))) failures.push(`Missing: out/${rel}`);
}

const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();

for (const [rel, expectedCanonical] of canonicalPages) {
  const file = path.join(out, rel);
  if (!fs.existsSync(file)) continue;
  const html = readText(file);

  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const descriptionMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);

  if (!titleMatch) failures.push(`No title: out/${rel}`);
  if (!descriptionMatch) failures.push(`No meta description: out/${rel}`);
  if (!canonicalMatch) failures.push(`No canonical: out/${rel}`);
  if (canonicalMatch && canonicalMatch[1] !== expectedCanonical) {
    failures.push(`Wrong canonical in out/${rel}: ${canonicalMatch[1]} (expected ${expectedCanonical})`);
  }

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) failures.push(`Expected exactly one H1 in out/${rel}, found ${h1Count}`);

  if (titleMatch) {
    const titleLength = titleMatch[1].replace(/&amp;/gi, '&').length;
    if (titleLength < 20 || titleLength > 70) failures.push(`SEO title length looks unusual in out/${rel}: ${titleLength} characters`);
  }
  if (descriptionMatch) {
    const descriptionLength = descriptionMatch[1].replace(/&amp;/gi, '&').length;
    if (descriptionLength < 70 || descriptionLength > 180) failures.push(`Meta description length looks unusual in out/${rel}: ${descriptionLength} characters`);
  }

  const keywordExpectation = onPageKeywordExpectations.find(([page]) => page === rel)?.[1];
  if (keywordExpectation) {
    const normalize = (value) => value
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&quot;/gi, '"')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    const h1Match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
    const titleText = normalize(titleMatch?.[1] || '');
    const h1Text = normalize(h1Match?.[1] || '');
    if (!titleText.includes(keywordExpectation)) failures.push(`Primary keyword "${keywordExpectation}" missing from title: out/${rel}`);
    if (!h1Text.includes(keywordExpectation)) failures.push(`Primary keyword "${keywordExpectation}" missing from H1: out/${rel}`);
  }

  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
    failures.push(`Indexable page contains noindex: out/${rel}`);
  }

  if (/brategenrator\.lovable\.app|bratgenerator\.app/i.test(html)) {
    failures.push(`Old/wrong domain found: out/${rel}`);
  }

  if (titleMatch) {
    if (titles.has(titleMatch[1])) failures.push(`Duplicate title: out/${rel} and out/${titles.get(titleMatch[1])}`);
    else titles.set(titleMatch[1], rel);
  }
  if (descriptionMatch) {
    if (descriptions.has(descriptionMatch[1])) failures.push(`Duplicate meta description: out/${rel} and out/${descriptions.get(descriptionMatch[1])}`);
    else descriptions.set(descriptionMatch[1], rel);
  }
  if (canonicalMatch) {
    if (canonicals.has(canonicalMatch[1])) failures.push(`Duplicate canonical: out/${rel} and out/${canonicals.get(canonicalMatch[1])}`);
    else canonicals.set(canonicalMatch[1], rel);
  }
}

const schemaExpectations = [
  ['index.html', ['WebSite', 'WebApplication']],
  ['features/index.html', ['BreadcrumbList']],
  ['how-to-use/index.html', ['BreadcrumbList', 'Article']],
  ['brat-styles/index.html', ['BreadcrumbList']],
  ['video-generator/index.html', ['BreadcrumbList', 'WebApplication']],
  ['blog/index.html', ['BreadcrumbList']],
  ['blog/how-to-make-a-brat-album-cover-free/index.html', ['BreadcrumbList', 'BlogPosting']],
  ['blog/brat-generator-not-working/index.html', ['BreadcrumbList', 'BlogPosting']],
  ['about/index.html', ['BreadcrumbList']],
  ['contact/index.html', ['BreadcrumbList']],
  ['privacy-policy/index.html', ['BreadcrumbList']],
  ['terms/index.html', ['BreadcrumbList']],
];

for (const [rel, types] of schemaExpectations) {
  const file = path.join(out, rel);
  if (!fs.existsSync(file)) continue;
  const html = readText(file);
  if (!/type=["']application\/ld\+json["']/i.test(html)) failures.push(`No JSON-LD script: out/${rel}`);
  for (const type of types) {
    const needle = new RegExp(`(?:\\"|&quot;)@type(?:\\"|&quot;)\\s*:\\s*(?:\\"|&quot;)${type}(?:\\"|&quot;)`, 'i');
    if (!needle.test(html) && !html.includes(`"@type":"${type}"`)) failures.push(`Schema type ${type} missing: out/${rel}`);
  }
}

for (const rel of ['brat-generator-embed.html', 'brat-video-generator-embed.html']) {
  const file = path.join(out, rel);
  if (!fs.existsSync(file)) continue;
  const html = readText(file);
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`No title: out/${rel}`);
  if (!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
    failures.push(`Embed file is not noindex: out/${rel}`);
  }
  if (/brategenrator\.lovable\.app|bratgenerator\.app/i.test(html)) failures.push(`Old/wrong domain found: out/${rel}`);
}

function parseRobots(text) {
  const groups = [];
  let agents = [];
  let directives = [];
  const flush = () => {
    if (agents.length) groups.push({ agents: [...agents], directives: [...directives] });
    agents = [];
    directives = [];
  };

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    if (!line) {
      if (agents.length && directives.length) flush();
      continue;
    }
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (!match) continue;
    const key = match[1].trim().toLowerCase();
    const value = match[2].trim();
    if (key === 'user-agent') {
      if (directives.length) flush();
      agents.push(value.toLowerCase());
    } else if (agents.length) {
      directives.push([key, value]);
    }
  }
  flush();
  return groups;
}

const robotsPath = path.join(out, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = readText(robotsPath);
  const groups = parseRobots(robots);
  const hasDirective = (agent, key, value) => groups.some((g) =>
    g.agents.includes(agent.toLowerCase()) && g.directives.some(([k, v]) => k === key && v === value)
  );

  const googleAgents = [
    'Googlebot', 'Googlebot-Image', 'Googlebot-News', 'Googlebot-Video',
    'GoogleOther', 'GoogleOther-Image', 'GoogleOther-Video', 'Storebot-Google',
    'Google-InspectionTool', 'AdsBot-Google', 'AdsBot-Google-Mobile',
    'Mediapartners-Google', 'Google-Extended',
  ];
  for (const agent of googleAgents) {
    if (!hasDirective(agent, 'allow', '/')) failures.push(`robots.txt does not explicitly allow ${agent}`);
    if (hasDirective(agent, 'disallow', '/')) failures.push(`robots.txt blocks ${agent}`);
  }

  const aiReferenceAgents = ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User'];
  for (const agent of aiReferenceAgents) {
    if (!hasDirective(agent, 'allow', '/')) failures.push(`robots.txt does not explicitly allow ${agent}`);
  }

  const blockedAgents = ['MJ12bot', 'BLEXBot', 'DotBot', 'MegaIndex.ru', 'SeekportBot'];
  for (const agent of blockedAgents) {
    if (!hasDirective(agent, 'disallow', '/')) failures.push(`robots.txt high-volume block missing: ${agent}`);
  }

  if (!hasDirective('*', 'allow', '/')) failures.push('robots.txt wildcard group does not allow the public site');
  if (!hasDirective('*', 'crawl-delay', '10')) failures.push('robots.txt wildcard group does not set Crawl-delay: 10');
  if (!robots.includes('Sitemap: https://bratgeneratorpro.net/sitemap.xml')) failures.push('robots.txt does not reference the final sitemap URL');
  if (/content-signal\s*:/i.test(robots)) failures.push('Source robots.txt contains Content-Signal; Cloudflare may add this live, but it should not be in the project file');
}

const sitemapPath = path.join(out, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = readText(sitemapPath);
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1]);
  const requiredUrls = canonicalPages.map(([, url]) => url);

  for (const url of requiredUrls) if (!locs.includes(url)) failures.push(`Sitemap missing: ${url}`);
  for (const url of locs) if (!requiredUrls.includes(url)) failures.push(`Sitemap contains unexpected/non-canonical URL: ${url}`);
  if (new Set(locs).size !== locs.length) failures.push('Sitemap contains duplicate URLs');
  if (/brat-(?:video-)?generator-embed\.html|404\.html/i.test(sitemap)) failures.push('Sitemap contains a non-indexable embed or 404 URL');
  if (/<changefreq>|<priority>/i.test(sitemap)) failures.push('Sitemap contains changefreq/priority noise; keep only accurate URLs and lastmod values');
  if (/brategenrator\.lovable\.app|bratgenerator\.app/i.test(sitemap)) failures.push('Old/wrong domain found in sitemap.xml');
}

const llmsPath = path.join(out, 'llms.txt');
if (fs.existsSync(llmsPath)) {
  const llms = readText(llmsPath).replace(/^\uFEFF/, '');
  const firstNonEmpty = llms.split(/\r?\n/).find((line) => line.trim())?.trim();
  if (firstNonEmpty !== '# Brat Generator') failures.push('llms.txt must begin with the site H1: # Brat Generator');
  if (!/^> .+/m.test(llms)) failures.push('llms.txt missing the required-style summary blockquote');

  for (const section of ['## Tools', '## Guides', '## Blog', '## Site information', '## Optional']) {
    if (!llms.includes(section)) failures.push(`llms.txt missing section: ${section}`);
  }

  const requiredUrls = canonicalPages.map(([, url]) => url);
  for (const url of requiredUrls) {
    if (!llms.includes(`](${url})`) && url !== 'https://bratgeneratorpro.net/privacy-policy/' && url !== 'https://bratgeneratorpro.net/terms/') {
      failures.push(`llms.txt missing important canonical link: ${url}`);
    }
  }
  if (!llms.includes('https://bratgeneratorpro.net/sitemap.xml')) failures.push('llms.txt missing sitemap link');
  if (/brat-(?:video-)?generator-embed\.html/i.test(llms)) failures.push('llms.txt links to implementation-only embed HTML');
  if (/brategenrator\.lovable\.app|bratgenerator\.app/i.test(llms)) failures.push('Old/wrong domain found in llms.txt');
}

const manifestPath = path.join(out, 'manifest.webmanifest');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(readText(manifestPath));
    if (!manifest.name) failures.push('manifest.webmanifest missing name');
    if (!manifest.start_url) failures.push('manifest.webmanifest missing start_url');
    if (!Array.isArray(manifest.icons) || !manifest.icons.length) failures.push('manifest.webmanifest missing icons');
  } catch {
    failures.push('manifest.webmanifest is not valid JSON');
  }
}

const vercelConfigPath = path.join(root, 'vercel.json');
if (!fs.existsSync(vercelConfigPath)) {
  failures.push('Missing root vercel.json technical SEO configuration');
} else {
  try {
    const config = JSON.parse(readText(vercelConfigPath));
    const redirects = Array.isArray(config.redirects) ? config.redirects : [];
    const requiredRedirects = ['/how-to', '/styles', '/key-features', '/brat-generator-features', '/how-to-make-a-brat-album-cover', '/blog/how-to-make-a-brat-album-cover'];
    for (const sourcePath of requiredRedirects) {
      const row = redirects.find((x) => x?.source === sourcePath);
      if (!row) failures.push(`Vercel redirect missing: ${sourcePath}`);
      else if (row.statusCode !== 301) failures.push(`Vercel redirect is not 301: ${sourcePath}`);
    }

    const headers = Array.isArray(config.headers) ? config.headers : [];
    const globalHeaders = headers.find((x) => x?.source === '/(.*)')?.headers || [];
    const hasGlobalHeader = (key) => globalHeaders.some((h) => String(h?.key).toLowerCase() === key.toLowerCase());
    for (const key of ['X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy', 'X-Frame-Options', 'Strict-Transport-Security']) {
      if (!hasGlobalHeader(key)) failures.push(`Global Vercel security header missing: ${key}`);
    }

    for (const sourcePath of ['/brat-generator-embed.html', '/brat-video-generator-embed.html']) {
      const row = headers.find((x) => x?.source === sourcePath);
      const hasNoindex = row?.headers?.some((h) => String(h?.key).toLowerCase() === 'x-robots-tag' && /noindex/i.test(String(h?.value)));
      if (!hasNoindex) failures.push(`Vercel X-Robots-Tag noindex missing: ${sourcePath}`);
    }

    for (const sourcePath of ['/robots.txt', '/sitemap.xml', '/llms.txt']) {
      const row = headers.find((x) => x?.source === sourcePath);
      const hasCache = row?.headers?.some((h) => String(h?.key).toLowerCase() === 'cache-control');
      const hasType = row?.headers?.some((h) => String(h?.key).toLowerCase() === 'content-type');
      if (!hasCache) failures.push(`Cache-Control missing for ${sourcePath}`);
      if (!hasType) failures.push(`Content-Type missing for ${sourcePath}`);
    }
  } catch {
    failures.push('vercel.json is not valid JSON');
  }
}

// Performance safeguards copied from the previously successful PageSpeed build.
const generatorSource = source('components/BratGenerator.tsx');
const videoSource = source('components/BratVideoGenerator.tsx');
const globalCss = source('app/globals.css');
const imageEmbed = source('public/brat-generator-embed.html');
const videoEmbed = source('public/brat-video-generator-embed.html');

for (const [name, text] of [['BratGenerator', generatorSource], ['BratVideoGenerator', videoSource]]) {
  if (!text.includes('IntersectionObserver')) failures.push(`${name} lost near-viewport lazy loading`);
  if (!/loading=["']lazy["']/.test(text)) failures.push(`${name} iframe is not loading lazily`);
  if (/loading=["']eager["']/.test(text)) failures.push(`${name} contains eager iframe loading`);
  if (/srcDoc=|toolEmbedHtml|BRAT_GENERATOR_EMBED_HTML|BRAT_VIDEO_GENERATOR_EMBED_HTML/.test(text)) failures.push(`${name} re-embeds large HTML/JS in the main bundle`);
}

if (!/\.brat-generator-iframe\{[^}]*transition:none/i.test(globalCss)) failures.push('Generator iframe height transition optimization is missing');
if (!/@media \(max-width:800px\)[\s\S]*?\.hero-blobs \.blob\{animation:none!important/i.test(globalCss)) failures.push('Mobile hero animation optimization is missing');
if (!/@media \(prefers-reduced-motion:reduce\)/i.test(globalCss)) failures.push('Reduced-motion performance/accessibility rule is missing');
if (/fonts\.googleapis\.com|fonts\.gstatic\.com|Urbanist/i.test(imageEmbed + videoEmbed)) failures.push('External Google Font dependency returned inside an embed');

// Keep internal navigation away from known redirect sources.
const redirectSources = new Set(['/how-to', '/styles', '/key-features', '/brat-generator-features', '/how-to-make-a-brat-album-cover', '/blog/how-to-make-a-brat-album-cover']);
for (const [rel] of canonicalPages) {
  const file = path.join(out, rel);
  if (!fs.existsSync(file)) continue;
  const html = readText(file);
  for (const match of html.matchAll(/href=["'](\/[^"']*)["']/gi)) {
    const clean = match[1].split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
    if (redirectSources.has(clean)) failures.push(`Internal link in out/${rel} points to redirect source: ${match[1]}`);
  }
}


// On-page anchor-text safeguard: avoid weak generic anchors on indexable pages.
for (const [rel] of canonicalPages) {
  const file = path.join(out, rel);
  if (!fs.existsSync(file)) continue;
  const html = readText(file);
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const anchorText = match[2]
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    if (/^(click here|read more|learn more|more|here)$/.test(anchorText)) {
      failures.push(`Generic anchor text "${anchorText}" found in out/${rel} -> ${match[1]}`);
    }
  }
}

// The descriptive social image is part of the current on-page SEO baseline.
if (!fs.existsSync(path.join(out, 'brat-generator-free-online-tool.png'))) {
  failures.push('Descriptive Open Graph image filename is missing from out/');
}

if (failures.length) {
  console.error('\n==============================================');
  console.error(' PRE-LIVE BUILD CHECK: FAILED');
  console.error('==============================================');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}

console.log('\n==============================================');
console.log(' PRE-LIVE BUILD CHECK: PASS');
console.log('==============================================');
console.log(`Checked ${expected.length} required output files and ${canonicalPages.length} canonical pages.`);
console.log('Checked titles, description ranges, one-H1 rules, page-to-keyword mapping, canonicals, duplicate metadata, JSON-LD presence, descriptive anchors/images, embed noindex rules, redirects, security/cache headers, robots.txt, sitemap.xml, llms.txt, manifest and PageSpeed safeguards.');
console.log('Account/live-data tasks still require production checks: Search Console verification, sitemap submission, URL Inspection, Rich Results Test, live HTTP/HTTPS redirects and Core Web Vitals field data.');
