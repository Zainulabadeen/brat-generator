# Pre-Live Completion Status

## Completed in code / research
- On-page SEO, page intent and keyword mapping for supplied pages
- Unique titles, descriptions, H1/H2/H3 structure
- Self-canonicals
- Sitemap + robots
- WebSite, WebApplication, Breadcrumb and article/image schema where accurate
- Open Graph / Twitter metadata
- Trust pages and internal-link architecture
- Responsive/mobile code review
- OG/favicons/app icons
- Apache HTTPS + preferred-host rules
- Compression, browser caching, basic security headers
- Custom 404
- Starter legacy URL 301 map in `.htaccess`
- GA4-ready conditional integration with explicit analytics consent
- Download conversion event: `brat_design_download`
- Search Console/Bing meta verification hooks (optional)
- `.env.example` for final account IDs/tokens
- Public old-URL discovery attempt
- Competitor research
- Pre-live backlink/outreach opportunity planning

## Requires the site owner BEFORE launch
These cannot be done from the codebase alone:
- Download current WordPress files backup from hosting/cPanel
- Export current WordPress database
- Create/verify Google Search Console Domain property via DNS
- Create GA4 property/data stream and provide the Measurement ID
- Add/verify Bing Webmaster site (DNS/import/meta)

## Intentionally waits until AFTER launch
- Submit new sitemap to Google/Bing
- URL Inspection and indexing requests
- Live status-code/canonical/redirect crawl
- Live HTTPS and security-header verification
- Rich-results/schema validation against production URLs
- Real PageSpeed/Lighthouse production tests and Core Web Vitals field data
- Search Console performance/index coverage monitoring
- Execute backlink outreach/link acquisition
