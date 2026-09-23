import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'out');
const expected = [
  'index.html','404.html',
  'features/index.html','brat-styles/index.html','blog/index.html',
  'blog/how-to-make-a-brat-album-cover-free/index.html','blog/brat-generator-not-working/index.html',
  'about/index.html','contact/index.html','privacy-policy/index.html','terms/index.html',
  'brat-generator-embed/index.html','brat-video-generator-embed/index.html','robots.txt','sitemap.xml','sitemap_index.xml','manifest.webmanifest','og-image.png','favicon.ico','favicon.svg','.htaccess'
];
const failures=[];
if(!fs.existsSync(out)){ console.error('PRE-LIVE CHECK FAILED: out/ folder not found. Run npm run build first.'); process.exit(1); }
for(const rel of expected) if(!fs.existsSync(path.join(out,rel))) failures.push(`Missing: out/${rel}`);

for(const rel of expected.filter(x=>x.endsWith('.html') && x!=='404.html' && !x.includes('-embed/'))){
  const fp=path.join(out,rel); if(!fs.existsSync(fp)) continue; const html=fs.readFileSync(fp,'utf8');
  if(!/<title>[^<]+<\/title>/i.test(html)) failures.push(`No title: out/${rel}`);
  if(!/rel="canonical"/i.test(html)) failures.push(`No canonical: out/${rel}`);
  if(!/application\/ld\+json/i.test(html)) failures.push(`No JSON-LD: out/${rel}`);
  if(/brategenrator\.lovable\.app|bratgenerator\.app/i.test(html)) failures.push(`Old/wrong domain found: out/${rel}`);
}
for(const rel of ['brat-generator-embed/index.html','brat-video-generator-embed/index.html']){
  const fp=path.join(out,rel); if(!fs.existsSync(fp)) continue; const html=fs.readFileSync(fp,'utf8');
  if(!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) failures.push(`Embed file is not noindex: out/${rel}`);
}

const sitemap=fs.readFileSync(path.join(out,'sitemap.xml'),'utf8');
for(const url of [
]) if(!sitemap.includes(url)) failures.push(`Sitemap missing: ${url}`);
for(const retired of ['https://bratgeneratorpro.net/brat-text-generator/','https://bratgeneratorpro.net/brat-font-generator/','https://bratgeneratorpro.net/how-to-use/']) if(sitemap.includes(retired)) failures.push(`Sitemap should not include retired URL: ${retired}`);

const robots=fs.readFileSync(path.join(out,'robots.txt'),'utf8');
if(!robots.includes('https://bratgeneratorpro.net/sitemap.xml')) failures.push('robots.txt does not reference final sitemap URL');
const sitemapIndex=fs.readFileSync(path.join(out,'sitemap_index.xml'),'utf8');
if(!sitemapIndex.includes('https://bratgeneratorpro.net/sitemap.xml')) failures.push('sitemap_index.xml does not reference canonical sitemap.xml');

if(failures.length){ console.error('\nPRE-LIVE CHECK FAILED'); failures.forEach(x=>console.error(`- ${x}`)); process.exit(1); }
console.log('\n==============================================');
console.log(' PRE-LIVE BUILD CHECK: PASS');
console.log('==============================================');
console.log(`Checked ${expected.length} required output files, metadata, JSON-LD, embed noindex rules, robots and sitemap.`);
