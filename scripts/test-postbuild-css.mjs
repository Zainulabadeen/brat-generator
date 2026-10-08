/** Fixture-based proof that the postbuild inliner covers all route HTML. */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { INDEXABLE_PAGES } from './site-routes.mjs';
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'brat-static-css-test-'));
const html = '<!doctype html><html><head><link rel="preload" href="/_next/static/chunks/theme.css" as="style"><link rel="stylesheet" href="/_next/static/chunks/theme.css" /></head><body><main id="main-content">WORKS</main></body></html>';
const css = '.headline{color:red;background:url(../media/bg.svg)}';
const script = fileURLToPath(new URL('./postbuild-inline-home-css.mjs', import.meta.url));
try {
  const cssPath = path.join(fixture, 'out/_next/static/chunks/theme.css');
  fs.mkdirSync(path.dirname(cssPath), { recursive: true });
  fs.writeFileSync(cssPath, css);
  for (const { out } of INDEXABLE_PAGES) {
    const file = path.join(fixture, 'out', out);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
  }
  fs.writeFileSync(path.join(fixture, 'out', 'unrelated.html'), html);
  for (let attempt = 1; attempt <= 2; attempt++) {
    const run = spawnSync(process.execPath, [script], { cwd: fixture, encoding: 'utf8' });
    if (run.status !== 0) throw new Error(`attempt ${attempt}: ${run.stderr}\n${run.stdout}`);
  }
  for (const { out } of INDEXABLE_PAGES) {
    const result = fs.readFileSync(path.join(fixture, 'out', out), 'utf8');
    if (!result.includes('data-indexable-inline-css=') || result.includes('rel="stylesheet"') || result.includes('rel="preload"') || !result.includes('main-content')) throw new Error(`Bad CSS rewrite in ${out}`);
    if (!result.includes('url("/_next/static/media/bg.svg")')) throw new Error(`Relative asset URL not fixed in ${out}`);
    if ((result.match(/data-indexable-inline-css=/g) || []).length !== 1) throw new Error(`Postbuild not idempotent in ${out}`);
  }
  if (!fs.readFileSync(path.join(fixture, 'out', 'unrelated.html'), 'utf8').includes('rel="stylesheet"')) throw new Error('Changed an unlisted page');
  console.log(`PASS  ${INDEXABLE_PAGES.length} indexable HTML pages optimized, non-indexable excluded, CSS URL rebasing, preload removal, idempotence`);
} finally { fs.rmSync(fixture, { recursive:true, force:true }); }
