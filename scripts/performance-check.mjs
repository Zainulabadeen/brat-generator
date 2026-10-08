import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
let failures = 0;
const check = (ok, label) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok) failures += 1;
};

const nextConfig = read('next.config.mjs');
const packageJson = read('package.json');
const postbuild = read('scripts/postbuild-inline-home-css.mjs');
const home = read('app/page.tsx');
const generator = read('components/BratGenerator.tsx');
const header = read('components/SiteHeader.tsx');
const mainEmbed = read('public/brat-generator-embed/index.html');

console.log('\nPAGESPEED SOURCE REGRESSION CHECK\n');
check(!nextConfig.includes('inlineCss: true'), 'global experimental inlineCss is avoided because the site has a large shared stylesheet');
check(packageJson.includes('postbuild-inline-home-css.mjs'), 'production build runs the homepage-only CSS inliner');
check(postbuild.includes('out/index.html') && postbuild.includes('data-home-inline-css'), 'postbuild optimizer targets only the static homepage and preserves shared CSS files for other routes');
check(home.includes('<BratGenerator priority />'), 'homepage generator is explicitly marked as above-the-fold priority content');
check(generator.includes('loading={priority ? "eager" : "lazy"}'), 'priority generator loads eagerly while non-priority embeds stay lazy');
check(generator.includes('src={fallbackHtml ? undefined : "/brat-generator-embed.html"}'), 'main iframe uses the directly served public HTML file so localhost and production avoid directory-index 404s');
check(mainEmbed.includes('rel="icon" href="data:,"'), 'embedded tool suppresses unnecessary favicon discovery/request');
check((header.match(/prefetch=\{false\}/g) || []).length >= 3, 'visible primary navigation disables automatic route prefetching so it does not compete with first-load resources');
check(!generator.includes('src={fallbackHtml ? undefined : "/brat-generator-embed/"}'), 'directory-style embed URL is not used because Next dev does not serve public index.html as a directory index');

console.log(`\nResult: ${failures ? 'FAIL' : 'PASS'} — ${failures} failure(s).`);
process.exitCode = failures ? 1 : 0;
