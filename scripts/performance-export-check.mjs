/** Read-only post-build audit of every indexable static export. */
import fs from 'node:fs';
import path from 'node:path';
import { INDEXABLE_PAGES } from './site-routes.mjs';
const root = path.join(process.cwd(), 'out');
const errors = [];
const report = (ok, msg) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`); if (!ok) errors.push(msg); };
report(fs.existsSync(root), 'production static export ./out exists');
if (!fs.existsSync(root)) process.exit(1);
const mainEmbed = path.join(root, 'brat-generator-embed', 'index.html');
report(fs.existsSync(mainEmbed), 'production generator /brat-generator-embed/ exists (avoids confirmed deployed .html 404)');
report(fs.existsSync(path.join(root, 'brat-video-generator-embed', 'index.html')), 'video generator /brat-video-generator-embed/ exists');
let inlineCount = 0;
let canonicalCount = 0;
for (const { route, out } of INDEXABLE_PAGES) {
  const filepath = path.join(root, out);
  if (!fs.existsSync(filepath)) { report(false, `${route} was exported`); continue; }
  const html = fs.readFileSync(filepath, 'utf8');
  const cssInlined = html.includes('data-indexable-inline-css=');
  const noBlockingNextCss = !/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']\/_next\/static\/[^"']+\.css/i.test(html);
  const hasCanonical = /<link\b[^>]*rel=["']canonical["']/.test(html);
  const hasTitle = /<title>[\s\S]*?<\/title>/.test(html);
  const hasMain = /id=["']main-content["']/.test(html);
  if (cssInlined && noBlockingNextCss) inlineCount++;
  if (hasCanonical) canonicalCount++;
  report(cssInlined && noBlockingNextCss && hasCanonical && hasTitle && hasMain,
    `${route}: inline CSS, no blocking Next stylesheet, title, canonical, main landmark`);
  if (route === '/') {
    report(html.includes('/brat-generator-embed/') && !html.includes('src="/brat-generator-embed.html"'),
      'homepage iframe uses production /brat-generator-embed/ URL');
  }
}
report(inlineCount === INDEXABLE_PAGES.length, `all ${INDEXABLE_PAGES.length} indexable pages have inlined CSS`);
report(canonicalCount === INDEXABLE_PAGES.length, `all ${INDEXABLE_PAGES.length} indexable pages keep canonical metadata`);
console.log(`\nEXPORT AUDIT: ${errors.length ? 'FAIL' : 'PASS'} (${errors.length} errors)`);
process.exitCode = errors.length ? 1 : 0;
