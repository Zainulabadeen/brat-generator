# Latest Changes — On-Page SEO Pass

Updated: 11 September 2026

- Completed page-to-keyword mapping and cannibalization separation for the main landing pages.
- Refined unique SEO titles and meta descriptions for clearer search intent and stronger SERP readability.
- Added/expanded direct-answer sections and FAQs for featured-snippet/PAA readiness.
- Strengthened semantic coverage for generator features, how-to steps, colours/styles, video-preview intent, album-cover workflow and troubleshooting.
- Audited contextual internal-link anchor text and kept links pointed at final canonical destinations.
- Added descriptive Open Graph image filename `brat-generator-free-online-tool.png` while retaining the old asset for compatibility.
- Updated article modified dates and sitemap lastmod values for substantively changed pages.
- Added on-page regression checks to `npm run prelive`.
- Preserved the previous performance-critical PageSpeed implementation unchanged.

See `ONPAGE_KEYWORD_MAP.csv`, `ONPAGE_SEO_AUDIT.md` and `ONPAGE_TESTING_GUIDE.md` for details.

---

# Latest Changes — 2026-09-11

This build starts from the previously successful `bratgenerator-pagespeed-layout-final-update-v2` codebase so the PageSpeed/layout implementation is preserved.

Added/updated:

- `public/robots.txt`: explicit Google allow group, AI search/reference allow group, selected high-volume crawler blocks, `Crawl-delay: 10` for other compliant crawlers, canonical sitemap declaration.
- `public/llms.txt`: rewritten to follow the Answer.AI llms.txt proposal structure with descriptive canonical page links and an `Optional` section.
- `public/sitemap.xml`: canonical-only sitemap; embed and error documents excluded; no priority/changefreq noise.
- `vercel.json`: 301 redirect rules, embed noindex headers, security headers, correct text/XML content types and cache policy.
- `scripts/prelive-check.mjs`: expanded technical SEO and PageSpeed safeguard checks.
- `FINAL_TECHNICAL_SEO_STATUS.md`: clear record of implemented items and account/live checks that still require the site owner.

The visible site layout/content and the performance-critical generator code were not replaced with a slower variant.
