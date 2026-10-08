/**
 * First-viewport CSS optimization for every indexable static-export page.
 *
 * With a single shared global CSS chunk, using async CSS can flash unstyled
 * content and cause CLS. Inline the *exact* emitted production stylesheet so
 * no network round trip blocks first paint. This preserves CSS cascade,
 * source map-independent paths and route design without guessing which
 * selectors happen to be needed before hydration.
 *
 * Tradeoff: HTML gets larger and CSS is not cached across route navigations;
 * monitor transfer costs and revisit if the stylesheet is properly split.
 */
import fs from 'node:fs';
import path from 'node:path';
import { INDEXABLE_PAGES } from './site-routes.mjs';

const root = process.cwd();
const outDir = path.join(root, 'out');
const stylesheetRe = /<link\b(?=[^>]*\brel=["']stylesheet["'])(?=[^>]*\bhref=["']([^"']+\.css(?:\?[^"']*)?)["'])[^>]*>/gi;
const quoteRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const readCache = new Map();
let optimized = 0;
let stylesInlined = 0;

if (!fs.existsSync(outDir)) {
  console.error('FAIL  CSS optimization requires a finished Next static export in ./out');
  process.exit(1);
}

for (const page of INDEXABLE_PAGES) {
  const htmlFile = path.join(outDir, page.out);
  if (!fs.existsSync(htmlFile)) {
    console.error(`FAIL  Missing indexable export: ${page.out}`);
    process.exitCode = 1;
    continue;
  }
  let html = fs.readFileSync(htmlFile, 'utf8');
  if (html.includes('data-indexable-inline-css=')) {
    optimized++;
    continue; // Idempotent for repeat build post-processing.
  }
  const matches = [...html.matchAll(stylesheetRe)];
  const localNextLinks = matches.filter((match) => match[1].startsWith('/_next/static/'));
  if (!localNextLinks.length) {
    // Some Next versions may emit the stylesheet under a different static path:
    // do not claim an optimization that did not occur.
    console.error(`FAIL  No Next CSS link located for ${page.route}; check emitted HTML format`);
    process.exitCode = 1;
    continue;
  }

  let valid = true;
  for (const match of localNextLinks) {
    const href = match[1];
    const cleanHref = href.split('?')[0];
    const filePath = path.join(outDir, cleanHref.replace(/^\//, ''));
    if (!fs.existsSync(filePath)) {
      console.error(`FAIL  CSS file missing for ${page.route}: ${cleanHref}`);
      valid = false;
      break;
    }
  }
  if (!valid) {
    process.exitCode = 1;
    continue;
  }

  for (const match of localNextLinks) {
    const href = match[1];
    const cleanHref = href.split('?')[0];
    const filePath = path.join(outDir, cleanHref.replace(/^\//, ''));
    if (!readCache.has(filePath)) readCache.set(filePath, fs.readFileSync(filePath, 'utf8'));
    let css = readCache.get(filePath);
    // CSS URLs resolve relative to the stylesheet directory by default;
    // rewrite those to absolute deployment paths when moving CSS inline.
    css = css.replace(/url\(\s*(["']?)(?!data:|https?:|\/|#)([^)"']+)\1\s*\)/gi, (_, _q, asset) => {
      return `url("${path.posix.normalize(path.posix.join(path.posix.dirname(cleanHref), asset.trim()))}")`;
    });
    html = html.replace(match[0], `<style data-indexable-inline-css="${path.basename(cleanHref)}">${css.replace(/<\//g, '<\\/')}</style>`);
    // Eliminate only duplicate style preloads: preload-as=style with an inline
    // replacement would otherwise cause a useless CSS fetch on first paint.
    const preload = new RegExp(`<link\\b(?=[^>]*\\brel=["']preload["'])(?=[^>]*\\bas=["']style["'])(?=[^>]*\\bhref=["']${quoteRegex(href)}["'])[^>]*>`, 'gi');
    html = html.replace(preload, '');
    stylesInlined++;
  }
  fs.writeFileSync(htmlFile, html);
  optimized++;
}

console.log(`${process.exitCode ? 'FAIL' : 'PASS'}  production CSS inlined for ${optimized}/${INDEXABLE_PAGES.length} indexable pages (${stylesInlined} stylesheet references).`);
if (process.exitCode) process.exit(process.exitCode);
