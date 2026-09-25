const base = (process.argv[2] || 'https://bratgeneratorpro.net').replace(/\/$/, '');
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
const expect = (condition, msg, detail = '') => condition ? pass(msg) : fail(`${msg}${detail ? ` — ${detail}` : ''}`);

async function fetchManual(url) {
  return fetch(url, { redirect: 'manual', headers: { 'user-agent': 'BratGeneratorTechnicalCheck/2.0' } });
}

async function follow(url, max = 6) {
  let current = url;
  const chain = [];
  for (let i = 0; i < max; i += 1) {
    const res = await fetchManual(current);
    chain.push({ url: current, status: res.status, location: res.headers.get('location') });
    if (![301, 302, 307, 308].includes(res.status) || !res.headers.get('location')) return { res, chain, finalUrl: current };
    current = new URL(res.headers.get('location'), current).toString();
  }
  return { res: await fetchManual(current), chain, finalUrl: current };
}

console.log(`\nLIVE TECHNICAL CHECK: ${base}\n`);
try {
  const home = await follow(`${base}/`);
  expect(home.res.status === 200, 'HTTPS homepage returns 200', `status ${home.res.status}`);
  const html = await home.res.text();
  expect(/rel=["']canonical["'][^>]+href=["']https:\/\/bratgeneratorpro\.net\//i.test(html) || /href=["']https:\/\/bratgeneratorpro\.net\/["'][^>]+rel=["']canonical["']/i.test(html), 'homepage canonical is HTTPS non-www');
  expect(html.includes('favicon.ico') || html.includes('icon-192.png'), 'homepage exposes a crawler-friendly favicon');
  for (const type of ['WebSite', 'Organization', 'SoftwareApplication']) expect(html.includes(type), `homepage contains ${type} schema`);
  for (const header of ['strict-transport-security', 'content-security-policy', 'x-content-type-options', 'referrer-policy']) {
    expect(Boolean(home.res.headers.get(header)), `live homepage sends ${header}`);
  }

  const http = await follow('http://bratgeneratorpro.net/');
  expect(http.finalUrl.startsWith('https://bratgeneratorpro.net/'), 'HTTP resolves to HTTPS non-www', http.finalUrl);

  const www = await follow('https://www.bratgeneratorpro.net/');
  expect(www.finalUrl.startsWith('https://bratgeneratorpro.net/'), 'www resolves to non-www', www.finalUrl);

  const robots = await fetch(`${base}/robots.txt`, { headers: { 'user-agent': 'BratGeneratorTechnicalCheck/2.0' } });
  const robotsText = await robots.text();
  expect(robots.status === 200, 'robots.txt returns 200', `status ${robots.status}`);
  expect(robotsText.includes(`Sitemap: ${base}/sitemap.xml`), 'live robots.txt declares sitemap');
  expect(!/Disallow:\s*\/$/im.test(robotsText), 'live robots.txt does not block the public site');

  const sitemap = await fetch(`${base}/sitemap.xml`);
  const sitemapText = await sitemap.text();
  expect(sitemap.status === 200, 'sitemap.xml returns 200', `status ${sitemap.status}`);
  expect((sitemapText.match(/<url>/g) || []).length === required.length, `live sitemap contains ${required.length} indexable URLs`);
  for (const route of required) expect(sitemapText.includes(`<loc>${base}${route}</loc>`), `live sitemap includes ${route}`);

  const sitemapIndex = await fetch(`${base}/sitemap_index.xml`);
  const sitemapIndexText = await sitemapIndex.text();
  expect(sitemapIndex.status === 200 && sitemapIndexText.includes(`<loc>${base}/sitemap.xml</loc>`), 'sitemap_index.xml points to sitemap.xml');

  const llms = await fetch(`${base}/llms.txt`);
  const llmsText = await llms.text();
  expect(llms.status === 200 && llmsText.includes('# Brat Generator') && llmsText.includes(`${base}/video-generator/`), 'llms.txt returns current discovery information');

  const missing = await fetch(`${base}/technical-check-this-url-should-404-92731/`, { redirect: 'manual' });
  expect(missing.status === 404, 'unknown URL returns a real 404 status', `status ${missing.status}`);

  console.log('\nManual follow-up still required after deployment: Search Console URL Inspection and Google Rich Results/schema validation on representative pages.');
} catch (error) {
  fail(`Live check could not complete: ${error.message}`);
}

console.log(`\nResult: ${failures ? 'FAIL' : 'PASS'} — ${failures} failure(s).`);
if (failures) process.exit(1);
