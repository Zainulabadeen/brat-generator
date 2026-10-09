/** Run real Chrome Lighthouse mobile audits against an actual Next static export.
 * Requires Lighthouse CLI installed in PATH (see GitHub Actions workflow).
 * Run `npm run build` first; do NOT mistake source/fixture checks for a Lighthouse run.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { INDEXABLE_PAGES } from './site-routes.mjs';
import { startProductionTestServer } from './_production-test-server.mjs';

const flag = (name) => process.argv.includes(name);
const live = flag('--live');
const selected = flag('--all') ? INDEXABLE_PAGES : INDEXABLE_PAGES.filter(({ route }) =>
  ['/', '/video-generator/', '/brat-meme-generator/', '/brat-image-generator/', '/brat-font-generator/', '/brat-album-cover-generator/'].includes(route));
const min = {
  performance: Number(process.env.BRAT_MIN_PERFORMANCE || 85),
  accessibility: Number(process.env.BRAT_MIN_ACCESSIBILITY || 95),
  'best-practices': Number(process.env.BRAT_MIN_BEST_PRACTICES || 90),
  seo: Number(process.env.BRAT_MIN_SEO || 95),
};
const cli = process.env.BRAT_LIGHTHOUSE_BIN || 'lighthouse';
const probe = spawnSync(cli, ['--version'], { encoding: 'utf8', timeout: 15000 });
if (probe.error || probe.status !== 0) {
  console.error('Lighthouse CLI unavailable. Install it with `npm install -g lighthouse@12` then retry.');
  process.exit(1);
}
const reportDir = path.join(process.cwd(), 'artifacts', live ? 'lighthouse-live' : 'lighthouse-mobile');
fs.mkdirSync(reportDir, { recursive: true });
const rows = [];
const failures = [];
let server;
const csv = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
const head = ['route','performance','accessibility','best-practices','seo','fcp_ms','lcp_ms','speed_index_ms','tbt_ms','cls','lighthouse_json'];
try {
  if (!live) server = await startProductionTestServer(Number(process.env.BRAT_TEST_PORT || 4781));
  const baseUrl = live ? (process.env.BRAT_LIVE_BASE_URL || 'https://bratgeneratorpro.net').replace(/\/$/, '') : server.baseUrl;
  for (let i = 0; i < selected.length; i++) {
    const { route } = selected[i];
    const slug = route === '/' ? 'home' : route.replace(/^\/+|\/+$/g,'').replace(/\//g,'--');
    const dest = path.join(reportDir, `${slug}.json`);
    console.log(`\n[${i+1}/${selected.length}] Mobile Lighthouse: ${route}`);
    const args = [
      `${baseUrl}${route}`,
      '--quiet',
      '--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage',
      '--form-factor=mobile',
      '--throttling-method=simulate',
      '--only-categories=performance,accessibility,best-practices,seo',
      '--output=json',
      `--output-path=${dest}`,
      '--max-wait-for-load=45000',
    ];
    const res = spawnSync(cli, args, { encoding: 'utf8', timeout: 120000, maxBuffer: 5 * 1024 * 1024, env: process.env });
    if (res.error || res.status !== 0 || !fs.existsSync(dest)) {
      failures.push(`${route}: lighthouse CLI failed: ${res.error?.message || res.stderr?.slice(-650) || res.status}`);
      console.error(failures.at(-1));
      continue;
    }
    let report;
    try { report = JSON.parse(fs.readFileSync(dest,'utf8')); }
    catch (error) { failures.push(`${route}: invalid Lighthouse JSON: ${error.message}`); continue; }
    const scores = Object.fromEntries(Object.keys(min).map((key) => [key, Math.round((report.categories?.[key]?.score ?? 0) * 100)]));
    const metric = (name) => report.audits?.[name]?.numericValue ?? null;
    const row = [route,scores.performance,scores.accessibility,scores['best-practices'],scores.seo,
      metric('first-contentful-paint'),metric('largest-contentful-paint'),metric('speed-index'),
      metric('total-blocking-time'),metric('cumulative-layout-shift'),path.relative(reportDir,dest)];
    rows.push(row);
    for (const [key, required] of Object.entries(min)) {
      if (scores[key] < required) failures.push(`${route}: ${key} score ${scores[key]} below regression floor ${required}`);
    }
    console.log(`  Performance ${scores.performance}; Accessibility ${scores.accessibility}; Best Practices ${scores['best-practices']}; SEO ${scores.seo}; LCP ${Math.round(metric('largest-contentful-paint') || 0)} ms`);
  }
} catch (error) {
  failures.push(error.message);
} finally {
  if (server) await server.close();
}
fs.writeFileSync(path.join(reportDir,'results.csv'), [head, ...rows].map((row)=>row.map(csv).join(',')).join('\n')+'\n');
fs.writeFileSync(path.join(reportDir,'summary.json'), JSON.stringify({ when: new Date().toISOString(), mode: live ? 'live website mobile emulation (check deployed commit independently)' : 'local static export mobile emulation; not live production', requiredRoutes:selected.length, completedRoutes:rows.length, minima:min, failures },null,2)+'\n');
if (rows.length !== selected.length) failures.push(`Only ${rows.length}/${selected.length} audits completed`);
console.log(`\nSaved Lighthouse reports to ${reportDir}`);
console.log(`${failures.length ? 'FAIL' : 'PASS'}  ${rows.length}/${selected.length} routes audited; ${failures.length} issue(s)`);
if (failures.length) failures.forEach((issue) => console.error(`- ${issue}`));
process.exitCode = failures.length ? 1 : 0;
