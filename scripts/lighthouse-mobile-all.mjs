/** Run real Chrome Lighthouse mobile audits against the real Next static export.
 * Requires Lighthouse CLI installed in PATH (see GitHub Actions workflow).
 * Any category *failure* is retested twice and evaluated by the median so
 * one noisy GitHub runner sample does not create a spurious regression alert.
 * Thresholds are NEVER lowered, and every attempt is retained as a full JSON.
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
const borderlineMargin = Math.max(0, Math.min(10, Number(process.env.BRAT_LH_RETRY_MARGIN ?? 4) || 0));
const cli = process.env.BRAT_LIGHTHOUSE_BIN || 'lighthouse';
const probe = spawnSync(cli, ['--version'], { encoding: 'utf8', timeout: 15000 });
if (probe.error || probe.status !== 0) {
  console.error('Lighthouse CLI unavailable. Install it with `npm install -g lighthouse@12` then retry.');
  process.exit(1);
}
const reportDir = path.join(process.cwd(), 'artifacts', live ? 'lighthouse-live' : 'lighthouse-mobile');
fs.mkdirSync(reportDir, { recursive: true });
const rows = [];
const attempts = [];
const failures = [];
let server;
const csv = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
const head = ['route','performance','accessibility','best-practices','seo','fcp_ms','lcp_ms','speed_index_ms','tbt_ms','cls','lighthouse_json','samples'];
const metricIds = ['first-contentful-paint','largest-contentful-paint','speed-index','total-blocking-time','cumulative-layout-shift'];
const median = (values) => {
  const sorted = values.filter(Number.isFinite).sort((a,b)=>a-b);
  if (!sorted.length) return null;
  const n = sorted.length;
  return n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
};

function runLighthouse(url, dest) {
  const args = [
    url,
    '--quiet',
    '--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage',
    '--form-factor=mobile',
    '--throttling-method=simulate',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--output=json',
    `--output-path=${dest}`,
    '--max-wait-for-load=45000',
  ];
  fs.rmSync(dest, { force: true }); // never accidentally read a JSON from an older invocation
  const result = spawnSync(cli, args, { encoding:'utf8',timeout:120000,maxBuffer:5*1024*1024,env:process.env });
  if (result.error || result.status !== 0 || !fs.existsSync(dest)) {
    throw new Error(result.error?.message || result.stderr?.slice(-650) || `CLI exit ${result.status}`);
  }
  const report = JSON.parse(fs.readFileSync(dest,'utf8'));
  if (!report.categories || !report.audits) throw new Error('Lighthouse JSON has no categories or audits');
  const scores = Object.fromEntries(Object.keys(min).map((key) => [key, Math.round((report.categories[key]?.score ?? 0) * 100)]));
  const metrics = Object.fromEntries(metricIds.map((key) => [key, report.audits?.[key]?.numericValue ?? null]));
  return { scores, metrics, file: path.relative(reportDir, dest) };
}

try {
  if (!live) server = await startProductionTestServer(Number(process.env.BRAT_TEST_PORT || 4781));
  const baseUrl = live ? (process.env.BRAT_LIVE_BASE_URL || 'https://bratgeneratorpro.net').replace(/\/$/, '') : server.baseUrl;
  for (let i = 0; i < selected.length; i++) {
    const { route } = selected[i];
    const slug = route === '/' ? 'home' : route.replace(/^\/+|\/+$/g,'').replace(/\//g,'--');
    console.log(`\n[${i+1}/${selected.length}] Mobile Lighthouse: ${route}`);
    const samples = [];
    const mainFile = path.join(reportDir, `${slug}.json`);
    try {
      samples.push(runLighthouse(`${baseUrl}${route}`,mainFile));
    } catch (error) {
      failures.push(`${route}: initial Lighthouse run failed: ${error.message}`);
      console.error(failures.at(-1));
      continue;
    }

    // Retest EVERY failed page, not only a score close to the threshold.
    // Three-run median preserves the unchanged minimum and exposes runner noise.
    const firstSampleFailed = Object.entries(min).some(([key, required]) =>
      samples[0].scores[key] < required);
    if (firstSampleFailed) {
      console.log('  Below minimum; repeating twice for a 3-run median (thresholds unchanged).');
      for (let retry = 2; retry <= 3; retry++) {
        try {
          samples.push(runLighthouse(`${baseUrl}${route}`, path.join(reportDir, `${slug}-retry-${retry}.json`)));
        } catch (error) {
          failures.push(`${route}: Lighthouse repeat ${retry} failed: ${error.message}`);
          console.error(failures.at(-1));
          break;
        }
      }
    }
    if (firstSampleFailed && samples.length !== 3) {
      failures.push(`${route}: only ${samples.length}/3 validation samples completed`);
    }
    const scores = Object.fromEntries(Object.keys(min).map((key) => [key, median(samples.map((sample) => sample.scores[key]))]));
    const metrics = Object.fromEntries(metricIds.map((key) => [key, median(samples.map((sample) => sample.metrics[key]))]));
    const row = [route,scores.performance,scores.accessibility,scores['best-practices'],scores.seo,
      ...metricIds.map((key) => metrics[key]),samples[0].file,samples.length];
    rows.push(row);
    attempts.push({route,median:scores,samples:samples.map((sample)=>({file:sample.file,scores:sample.scores}))});
    for (const [key, required] of Object.entries(min)) {
      if (scores[key] < required) failures.push(`${route}: ${key} median score ${scores[key]} below regression floor ${required}`);
    }
    console.log(`  Performance ${scores.performance}; Accessibility ${scores.accessibility}; Best Practices ${scores['best-practices']}; SEO ${scores.seo}; LCP ${Math.round(metrics['largest-contentful-paint'] || 0)} ms; Samples ${samples.length}`);
  }
} catch (error) {
  failures.push(error.message);
} finally {
  if (server) await server.close();
}
fs.writeFileSync(path.join(reportDir,'results.csv'),[head,...rows].map((row)=>row.map(csv).join(',')).join('\n')+'\n');
if (rows.length !== selected.length) failures.push(`Only ${rows.length}/${selected.length} audits completed`);
const summary={
  when:new Date().toISOString(),
  mode:live ? 'live website mobile emulation (check deployed commit independently)' : 'local static export mobile emulation; not live production',
  requiredRoutes:selected.length,completedRoutes:rows.length,minima:min,borderlineMargin,
  methodology:'Single pass per page; any failing category score triggers two repeats and a median of 3. Never lower thresholds.',
  attempts,failures,
};
fs.writeFileSync(path.join(reportDir,'summary.json'),JSON.stringify(summary,null,2)+'\n');
const status = failures.length ? 'FAIL' : 'PASS';
console.log(`\nSaved Lighthouse reports to ${reportDir}`);
console.log(`${status}  ${rows.length}/${selected.length} routes audited; ${failures.length} issue(s)`);
if (failures.length) failures.forEach((issue) => console.error(`- ${issue}`));
if (process.env.GITHUB_STEP_SUMMARY) {
  try {
    const report = [
      `## Mobile Lighthouse: ${status}`,
      `Audited ${rows.length}/${selected.length} routes. Failing scores are evaluated using the median of 3; floors remain unchanged.`,
      '| Route | Performance | Accessibility | Best Practices | SEO | Samples |',
      '|---|---:|---:|---:|---:|---:|',
      ...attempts.map((entry)=>`| ${entry.route} | ${entry.median.performance} | ${entry.median.accessibility} | ${entry.median['best-practices']} | ${entry.median.seo} | ${entry.samples.length} |`),
      ...(failures.length ? ['', '**Failures**',...failures.map((f)=>`- ${f}`)]:[]),
      '',
    ].join('\n');
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,report);
  } catch (error) { console.warn(`Could not write GitHub summary: ${error.message}`); }
}
process.exitCode=failures.length ? 1 : 0;
