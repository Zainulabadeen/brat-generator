import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'out');
const indexPath = path.join(outDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.log('SKIP  homepage CSS inline: out/index.html was not found');
  process.exit(0);
}

let html = fs.readFileSync(indexPath, 'utf8');
if (html.includes('data-home-inline-css=')) {
  console.log('PASS  homepage CSS is already inlined');
  process.exit(0);
}

const stylesheetRe = /<link\b(?=[^>]*\brel=["']stylesheet["'])(?=[^>]*\bhref=["']([^"']+\.css(?:\?[^"']*)?)["'])[^>]*>/gi;
const matches = [...html.matchAll(stylesheetRe)];

if (!matches.length) {
  console.log('SKIP  homepage CSS inline: no stylesheet link found');
  process.exit(0);
}

let inlined = 0;
for (const match of matches) {
  const href = match[1];
  if (!href.startsWith('/_next/static/css/')) continue;

  const cleanHref = href.split('?')[0];
  const cssPath = path.join(outDir, cleanHref.replace(/^\//, ''));
  if (!fs.existsSync(cssPath)) {
    console.warn(`WARN  stylesheet not found for homepage inline: ${cleanHref}`);
    continue;
  }

  const css = fs.readFileSync(cssPath, 'utf8');
  const styleTag = `<style data-home-inline-css="${path.basename(cleanHref)}">${css}</style>`;
  html = html.replace(match[0], styleTag);

  const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const preloadRe = new RegExp(`<link\\b(?=[^>]*\\brel=["']preload["'])(?=[^>]*\\bas=["']style["'])(?=[^>]*\\bhref=["']${escapedHref}["'])[^>]*>`, 'gi');
  html = html.replace(preloadRe, '');
  inlined += 1;
}

if (!inlined) {
  console.log('SKIP  homepage CSS inline: no local Next CSS file could be resolved');
  process.exit(0);
}

fs.writeFileSync(indexPath, html);
console.log(`PASS  inlined ${inlined} homepage stylesheet(s) into out/index.html`);
