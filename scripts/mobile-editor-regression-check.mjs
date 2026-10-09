import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const read = (name) => fs.readFileSync(path.join(root,name),'utf8');
const checks = [
 ['main embed copies match', read('public/brat-generator-embed.html') === read('public/brat-generator-embed/index.html')],
 ['video embed copies match', read('public/brat-video-generator-embed.html') === read('public/brat-video-generator-embed/index.html')],
 ['main history snapshots exclude nested histories', read('public/brat-generator-embed.html').includes('JSON.stringify(snapshot())')],
 ['main history is bounded', read('public/brat-generator-embed.html').includes('S.hist.length > 40')],
 ['main generator draft recovery', read('public/brat-generator-embed.html').includes('restoreDraft();')],
 ['main gradient accessible on mobile', read('public/brat-generator-embed.html').includes('mobile-edit-nav') && read('public/brat-generator-embed.html').includes('g2Pick')],
 ['memory-safe export uses Blob URLs', read('public/brat-generator-embed.html').includes('dc.toBlob') && !read('public/brat-generator-embed.html').includes('dc.toDataURL')],
 ['mobile image/meme/font/album tab navigation', read('components/BratCreativeTool.tsx').includes('creative-mobile-tabs') && read('components/BratCreativeTool.tsx').includes('mobileTab')],
 ['all creative tools preserve lightweight settings', read('components/BratCreativeTool.tsx').includes('brat-creative-${mode}-v1')],
 ['video mobile lyrics/audio/export navigation', read('public/brat-video-generator-embed.html').includes('bvg-mobile-edit-nav')],
 ['video draft and height recovery', read('public/brat-video-generator-embed.html').includes('brat-video-lyrics-v1') && read('components/BratVideoGenerator.tsx').includes('brat-video-generator-height')],
 ['global mobile layout CSS included', read('app/globals.css').includes('Mobile editing workspace')],
 ['page-speed build postprocessing preserved', read('package.json').includes('postbuild-inline-home-css.mjs')],
];
let failures = 0;
for (const [name,ok] of checks) { console.log(`${ok?'PASS':'FAIL'}  ${name}`); if(!ok)failures++; }
console.log(`\nMobile source checks: ${checks.length-failures}/${checks.length} passed`);
process.exitCode = failures ? 1 : 0;
