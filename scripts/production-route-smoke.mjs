/** HTTP smoke-check the actual locally built static export; no source-only fixtures. */
import { INDEXABLE_PAGES } from './site-routes.mjs';
import { startProductionTestServer } from './_production-test-server.mjs';

const errors = [];
let server;
const pass = (label) => console.log(`PASS  ${label}`);
const fail = (label) => { errors.push(label); console.error(`FAIL  ${label}`); };
try {
  server = await startProductionTestServer(Number(process.env.BRAT_TEST_PORT || 4781));
  const base = server.baseUrl;
  const staticPaths = new Set();
  for (const { route } of INDEXABLE_PAGES) {
    const response = await fetch(`${base}${route}`, { signal: AbortSignal.timeout(15000) });
    const html = await response.text();
    const ok = response.status === 200
      && /<title>[^<]+<\/title>/i.test(html)
      && /rel=["']canonical["']/i.test(html)
      && /id=["']main-content["']/i.test(html)
      && /data-indexable-inline-css=/i.test(html)
      && !/<meta\b[^>]*name=["']robots["'][^>]*noindex/i.test(html)
      && !/Aw, Snap!|Application error: a client-side exception/i.test(html);
    (ok ? pass : fail)(`${route} HTTP ${response.status}, canonical, main, styles, noindex-safe`);
    for (const match of html.matchAll(/(?:src|href)=["'](\/_next\/static\/[^"']+)["']/gi)) {
      staticPaths.add(match[1]);
    }
  }
  for (const endpoint of ['/brat-generator-embed/', '/brat-video-generator-embed/', '/sitemap.xml', '/robots.txt']) {
    const response = await fetch(`${base}${endpoint}`, { signal: AbortSignal.timeout(15000) });
    (response.ok ? pass : fail)(`${endpoint} HTTP ${response.status}`);
  }
  for (const path of staticPaths) {
    const response = await fetch(`${base}${path}`, { method: 'HEAD', signal: AbortSignal.timeout(15000) });
    if (!response.ok) fail(`Missing built asset ${path}: HTTP ${response.status}`);
  }
  if (staticPaths.size) pass(`${staticPaths.size} linked Next.js static assets accessible`);
  else fail('No Next.js static assets detected; check HTML export');
} catch (error) {
  fail(error.message);
} finally {
  if (server) await server.close();
}
console.log(`\nPRODUCTION HTTP AUDIT: ${errors.length ? 'FAIL' : 'PASS'} — ${INDEXABLE_PAGES.length} indexable routes, embeds and static assets; ${errors.length} error(s)`);
process.exitCode = errors.length ? 1 : 0;
