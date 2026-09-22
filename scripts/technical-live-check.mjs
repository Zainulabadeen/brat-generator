const base = 'https://bratgeneratorpro.net';
let failures = 0;
const pass = (m) => console.log(`PASS  ${m}`);
const fail = (m) => { failures += 1; console.error(`FAIL  ${m}`); };

async function get(url, options = {}) {
  try { return await fetch(url, { redirect: 'manual', ...options }); }
  catch (error) { fail(`${url} could not be fetched: ${error.message}`); return null; }
}

console.log('\nLIVE TECHNICAL SEO CHECK\n');

const home = await get(`${base}/`);
if (home?.status === 200) pass('HTTPS homepage returns 200'); else fail(`HTTPS homepage status is ${home?.status ?? 'unavailable'}`);
if (home) {
  const headers = ['strict-transport-security','content-security-policy','x-content-type-options','referrer-policy','x-frame-options','permissions-policy'];
  for (const h of headers) home.headers.get(h) ? pass(`${h} header is present`) : fail(`${h} header is missing`);
}

const http = await get('http://bratgeneratorpro.net/');
if (http && [301,302,307,308].includes(http.status) && (http.headers.get('location') || '').startsWith('https://bratgeneratorpro.net')) pass('HTTP redirects to canonical HTTPS host'); else fail('HTTP canonical redirect is missing or unexpected');

const www = await get('https://www.bratgeneratorpro.net/');
if (www && [301,302,307,308].includes(www.status) && (www.headers.get('location') || '').startsWith('https://bratgeneratorpro.net')) pass('www redirects to non-www canonical host'); else fail('www canonical redirect is missing or unexpected');

const robots = await get(`${base}/robots.txt`);
const robotsText = robots ? await robots.text() : '';
if (robots?.status === 200 && robotsText.includes(`Sitemap: ${base}/sitemap.xml`) && !/User-agent:\s*Googlebot[\s\S]*?Disallow:\s*\//i.test(robotsText)) pass('live robots.txt allows Google and declares sitemap'); else fail('live robots.txt needs review');

const sitemap = await get(`${base}/sitemap.xml`);
const sitemapText = sitemap ? await sitemap.text() : '';
const required = ['/video-generator/','/brat-meme-generator/','/brat-image-generator/','/brat-font-generator/','/brat-album-cover-generator/'];
if (sitemap?.status === 200 && required.every(x => sitemapText.includes(`${base}${x}`)) && !sitemapText.includes(`${base}/brat-text-generator/`) && !sitemapText.includes(`${base}/how-to-use/`)) pass('live sitemap contains new tools and excludes retired routes'); else fail('live sitemap is stale or incomplete');

const missing = await get(`${base}/technical-seo-404-test-928374/`);
if (missing?.status === 404) pass('random missing URL returns real 404'); else fail(`missing URL returned ${missing?.status ?? 'unavailable'} instead of 404`);

const retired = await get(`${base}/brat-text-generator/`);
if (retired && [301,302,307,308].includes(retired.status)) pass('retired Brat Text URL redirects'); else fail('retired Brat Text URL does not redirect');

console.log(`\nResult: ${failures ? 'FAIL' : 'PASS'} — ${failures} failure(s).`);
if (failures) process.exit(1);
