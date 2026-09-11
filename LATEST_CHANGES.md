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
