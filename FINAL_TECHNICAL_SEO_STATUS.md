# Brat Generator — Final Technical SEO Status

Updated: 2026-09-11
Canonical site: https://bratgeneratorpro.net/

## Implemented in this project

- Canonical domain metadata and self-referencing canonicals on indexable pages.
- HTTPS-first canonical URLs throughout metadata, sitemap and llms.txt.
- Vercel 301 redirects for known legacy/alternate slugs.
- Custom 404 page for the static export.
- robots.txt with explicit Google crawler access, AI search/reference access, selected high-volume crawler blocks, and a 10-second crawl-delay preference for other compliant crawlers.
- XML sitemap containing only the 12 intended canonical/indexable public pages; embed and 404 URLs are excluded.
- llms.txt written to the Answer.AI llms.txt proposal structure: H1, summary blockquote, explanatory notes, H2 file-list sections, descriptive Markdown links, and an Optional section.
- JSON-LD already present in the site for WebSite, WebApplication, BreadcrumbList, Article and BlogPosting where appropriate.
- No fake review or aggregateRating data added. Google may require real rating/review data for a SoftwareApplication rich-result path; the site does not fabricate it.
- Standalone generator embed HTML files remain noindex through both meta robots and Vercel X-Robots-Tag headers.
- Security headers: HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy and SAMEORIGIN framing.
- Cache headers for robots.txt, sitemap.xml, llms.txt, embed HTML and stable public image/icon assets.
- Correct Content-Type headers for robots.txt, sitemap.xml and llms.txt.
- Existing PageSpeed safeguards preserved from the previously successful V2 build: system fonts, no Google Fonts in embeds, lazy/near-viewport iframe loading, no large srcDoc embed bundle, no iframe height animation, reduced mobile hero animation and reduced-motion support.
- Expanded `npm run prelive` checks for output files, canonical URLs, metadata, H1 count, duplicate metadata, schema presence, redirects, crawler rules, sitemap integrity, llms.txt format, manifest, Vercel headers and performance safeguards.

## Important robots.txt limitation

robots.txt is voluntary. A bot that lies about its identity or ignores robots.txt cannot be reliably blocked by this file. The selected high-volume crawler groups only affect crawlers that identify themselves and respect robots.txt. Real unknown/malicious-bot blocking must be enforced at the CDN/firewall layer (for this site, Cloudflare is the appropriate place).

`Crawl-delay: 10` is intentionally included because the site owner requested it for basic/non-Google crawlers. It is a non-standard directive. Google does not process Crawl-delay, and some robots.txt validators may display it as an unknown rule. The explicit Google groups contain no crawl delay.

## Still requires live/account access after deployment

These cannot be truthfully completed inside the project ZIP:

- Verify the Google Search Console Domain property through DNS.
- Submit `https://bratgeneratorpro.net/sitemap.xml` in Search Console.
- Use URL Inspection on the homepage, Features, How to Use, Brat Styles, Video Generator, Blog and both blog posts.
- Confirm live HTTP -> HTTPS and www -> non-www redirects.
- Confirm the custom not-found route returns a real 404 HTTP status on Vercel.
- Run Google Rich Results Test against the production pages.
- Monitor Search Console indexing reports, manual actions and security issues.
- Monitor real-user Core Web Vitals field data (LCP, INP, CLS). A Lighthouse/PageSpeed lab score can vary between runs even when code is unchanged.
- Configure Cloudflare firewall/bot controls if hard blocking of unknown or abusive crawlers is required.

## Deployment check

Run:

```bash
npm run prelive
```

Only deploy after the command reports `PRE-LIVE BUILD CHECK: PASS`.
