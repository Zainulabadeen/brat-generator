import fs from 'node:fs';
import { INDEXABLE_PAGES, SITEMAP_LASTMOD } from './site-routes.mjs';

const base = 'https://bratgeneratorpro.net';
const routes = INDEXABLE_PAGES.map((page) => page.route);
const latestLastmod = Object.values(SITEMAP_LASTMOD).sort().at(-1) || '2026-10-05';

const urls = routes.map((route) => {
  const lastmod = SITEMAP_LASTMOD[route];
  if (!lastmod) throw new Error(`Missing sitemap lastmod for ${route}`);
  return `  <url><loc>${base}${route}</loc><lastmod>${lastmod}</lastmod></url>`;
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
fs.writeFileSync('public/sitemap.xml', xml);
fs.writeFileSync('public/sitemap_index.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${base}/sitemap.xml</loc><lastmod>${latestLastmod}</lastmod></sitemap>\n</sitemapindex>\n`);
console.log(`Generated sitemap with ${routes.length} canonical URLs.`);
