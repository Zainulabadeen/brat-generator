const base = 'https://bratgeneratorpro.net';
const required = [
  '/',
  '/video-generator/',
  '/brat-meme-generator/',
  '/brat-image-generator/',
  '/brat-album-cover-generator/',
  '/brat-styles/',
  '/blog/',
  '/blog/how-to-make-a-brat-album-cover-free/',
  '/blog/brat-generator-not-working/',
  '/about/',
  '/contact/',
  '/privacy-policy/',
  '/terms/',
];

let failures = 0;
const pass = (msg) => console.log(`PASS  ${msg}`);
const fail = (msg) => { failures += 1; console.error(`FAIL  ${msg}`); };
const expect = (condition, msg) => condition ? pass(msg) : fail(msg);

async function get(url, options = {}) {
  try {
    return await fetch(url, { redirect: 'manual', ...options });
  } catch (error) {
    fail(`${url} could not be fetched: ${error.message}`);
    return null;
  }
}

const hasSchemaType = (html, type) => html.includes(`\"@type\":\"${type}\"`) || html.includes(`"@type":"${type}"`);
const canonicalHref = (html) => html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
  || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1]
  || '';

console.log('\nLIVE TECHNICAL SEO CHECK\n');

const home = await get(`${base}/`);
if (home?.status === 200) pass('HTTPS homepage returns 200'); else fail(`HTTPS homepage status is ${home?.status ?? 'unavailable'}`);
let homeHtml = '';
if (home) {
  homeHtml = await home.text();
  for (const header of ['strict-transport-security', 'content-security-policy', 'x-content-type-options', 'referrer-policy', 'x-frame-options', 'permissions-policy']) {
    expect(Boolean(home.headers.get(header)), `${header} header is present`);
  }
  for (const type of ['WebSite', 'Organization', 'WebPage', 'SoftwareApplication', 'FAQPage']) {
    expect(hasSchemaType(homeHtml, type), `homepage contains ${type} structured data`);
  }
}

const http = await get('http://bratgeneratorpro.net/');
expect(Boolean(http && [301, 302, 307, 308].includes(http.status) && (http.headers.get('location') || '').startsWith('https://bratgeneratorpro.net')), 'HTTP redirects to canonical HTTPS host');

const www = await get('https://www.bratgeneratorpro.net/');
expect(Boolean(www && [301, 302, 307, 308].includes(www.status) && (www.headers.get('location') || '').startsWith('https://bratgeneratorpro.net')), 'www redirects to non-www canonical host');

for (const route of required) {
  const response = route === '/' ? null : await get(`${base}${route}`);
  if (route !== '/') expect(response?.status === 200, `${route} returns 200`);

  if (response?.status === 200) {
    const html = await response.text();
    const canonical = canonicalHref(html);
    expect(canonical === `${base}${route}`, `${route} has the expected self-canonical`);
    if (route !== '/') expect(hasSchemaType(html, 'BreadcrumbList'), `${route} contains BreadcrumbList schema`);
  }
}

for (const route of ['/video-generator/', '/brat-meme-generator/', '/brat-image-generator/', '/brat-album-cover-generator/']) {
  const response = await get(`${base}${route}`);
  const html = response?.status === 200 ? await response.text() : '';
  expect(hasSchemaType(html, 'SoftwareApplication'), `${route} contains SoftwareApplication schema`);
  expect(hasSchemaType(html, 'WebPage'), `${route} contains WebPage schema`);
}

const robots = await get(`${base}/robots.txt`);
const robotsText = robots ? await robots.text() : '';
expect(Boolean(robots?.status === 200 && robotsText.includes(`Sitemap: ${base}/sitemap.xml`) && !/Disallow:\s*\/$/im.test(robotsText)), 'live robots.txt allows public crawling and declares sitemap');

const sitemap = await get(`${base}/sitemap.xml`);
const sitemapText = sitemap ? await sitemap.text() : '';
expect(Boolean(sitemap?.status === 200 && required.every((route) => sitemapText.includes(`<loc>${base}${route}</loc>`))), 'live sitemap contains every required indexable URL');
for (const retired of ['/brat-text-generator/', '/brat-font-generator/', '/how-to-use/', '/features/']) {
  expect(!sitemapText.includes(`<loc>${base}${retired}</loc>`), `live sitemap excludes retired ${retired}`);
}

const sitemapIndex = await get(`${base}/sitemap_index.xml`);
const sitemapIndexText = sitemapIndex ? await sitemapIndex.text() : '';
expect(Boolean(sitemapIndex?.status === 200 && sitemapIndexText.includes(`<loc>${base}/sitemap.xml</loc>`)), 'live sitemap_index.xml points to sitemap.xml');

const llms = await get(`${base}/llms.txt`);
const llmsText = llms ? await llms.text() : '';
expect(Boolean(llms?.status === 200 && llmsText.includes('# Brat Generator') && llmsText.includes(`${base}/video-generator/`) && llmsText.includes(`${base}/brat-styles/`)), 'live llms.txt is current and includes core tools');

const missing = await get(`${base}/technical-seo-404-test-928374/`);
expect(missing?.status === 404, `random missing URL returns a real 404 (received ${missing?.status ?? 'unavailable'})`);

for (const retired of ['/brat-text-generator/', '/brat-font-generator/', '/how-to-use/']) {
  const response = await get(`${base}${retired}`);
  expect(Boolean(response && [301, 302, 307, 308].includes(response.status)), `${retired} redirects instead of returning an indexable duplicate`);
}

console.log(`\nResult: ${failures ? 'FAIL' : 'PASS'} — ${failures} failure(s).`);
if (failures) process.exit(1);
