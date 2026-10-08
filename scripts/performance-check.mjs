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
check(packageJson.includes('postbuild-inline-home-css.mjs'), 'production build runs the all-indexable-route CSS inliner');
check(postbuild.includes('INDEXABLE_PAGES') && postbuild.includes('data-indexable-inline-css') && postbuild.includes('/_next/static/'), 'postbuild inliner handles both CSS and chunk locations on all indexable pages');
check(home.includes('<BratGenerator priority />'), 'homepage generator is explicitly marked as above-the-fold priority content');
check(generator.includes('loading={priority ? "eager" : "lazy"}'), 'priority generator loads eagerly while non-priority embeds stay lazy');
check(generator.includes('? "/brat-generator-embed.html" : "/brat-generator-embed/"'), 'main iframe uses a working URL separately in Next dev and Vercel production');
check(mainEmbed.includes('rel="icon" href="data:,"'), 'embedded tool suppresses unnecessary favicon discovery/request');
check((header.match(/prefetch=\{false\}/g) || []).length >= 3, 'visible primary navigation disables automatic route prefetching so it does not compete with first-load resources');
check(generator.includes('process.env.NODE_ENV === "development"'), 'directory-style embed is not used in Next dev, where the direct HTML resource works');

check(read('components/PageHero.tsx').includes('inner-hero-title reveal is-visible') && !read('components/PageHero.tsx').includes('hero-delay-1'), 'PageHero LCP text is not artificially delayed on tool and collection pages');
check(read('components/SiteFooter.tsx').includes('prefetch={false}'), 'footer links do not prefetch offscreen routes on every page');
check(read('components/ArticleTableOfContents.tsx').includes('requestAnimationFrame'), 'article TOC scroll updates are frame-throttled');
console.log(`\nResult: ${failures ? 'FAIL' : 'PASS'} — ${failures} failure(s).`);
process.exitCode = failures ? 1 : 0;
