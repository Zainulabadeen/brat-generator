const base = (process.argv[2] || 'https://bratgeneratorpro.net').replace(/\/$/, '');
let failures = 0;

function pass(msg) { console.log(`PASS  ${msg}`); }
function fail(msg) { failures += 1; console.error(`FAIL  ${msg}`); }
function expect(condition, msg, detail = '') { condition ? pass(msg) : fail(`${msg}${detail ? ` — ${detail}` : ''}`); }

async function fetchManual(url) {
  return fetch(url, { redirect: 'manual', headers: { 'user-agent': 'BratGeneratorTechnicalCheck/1.0' } });
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
  expect(html.includes('<link rel="canonical" href="https://bratgeneratorpro.net/"'), 'homepage canonical is HTTPS non-www');
  expect(html.includes('favicon.ico') || html.includes('icon-192.png'), 'homepage exposes Google-friendly favicon');
  for (const h of ['strict-transport-security', 'content-security-policy', 'x-content-type-options', 'referrer-policy']) {
    expect(!!home.res.headers.get(h), `live homepage sends ${h}`);
  }

  const http = await follow('http://bratgeneratorpro.net/');
  expect(http.finalUrl.startsWith('https://bratgeneratorpro.net/'), 'HTTP resolves to HTTPS non-www', http.finalUrl);

  const www = await follow('https://www.bratgeneratorpro.net/');
  expect(www.finalUrl.startsWith('https://bratgeneratorpro.net/'), 'www resolves to non-www', www.finalUrl);

  const robots = await fetch(`${base}/robots.txt`, { headers: { 'user-agent': 'BratGeneratorTechnicalCheck/1.0' } });
  const robotsText = await robots.text();
  expect(robots.status === 200, 'robots.txt returns 200', `status ${robots.status}`);
  expect(robotsText.includes('Sitemap: https://bratgeneratorpro.net/sitemap.xml'), 'live robots.txt declares sitemap');
  expect(!/User-agent:\s*Googlebot[\s\S]{0,300}Disallow:\s*\//i.test(robotsText), 'live robots.txt does not block Googlebot');

  const sitemap = await fetch(`${base}/sitemap.xml`);
  const sitemapText = await sitemap.text();
  expect(sitemap.status === 200, 'sitemap.xml returns 200', `status ${sitemap.status}`);
  expect((sitemapText.match(/<url>/g) || []).length === 12, 'live sitemap contains 12 indexable URLs');

  const missing = await fetch(`${base}/technical-check-this-url-should-404-92731/`, { redirect: 'manual' });
  expect(missing.status === 404, 'unknown URL returns a real 404 status', `status ${missing.status}`);

  console.log('\nManual follow-up still required: Google Search Console URL Inspection and Core Web Vitals/PageSpeed field data.');
} catch (error) {
  fail(`Live check could not complete: ${error.message}`);
}

console.log(`\nResult: ${failures ? 'FAIL' : 'PASS'} — ${failures} failure(s).`);
if (failures) process.exit(1);
