# Brat Generator SEO Implementation Status

Updated: 2026-09-07
Preferred domain: https://bratgeneratorpro.net
Framework: Next.js static export

## Keyword / Page Mapping

| URL | Primary intent / keyword | Supporting targets |
|---|---|---|
| `/` | brat generator | brat text generator, brat generator free, brat generator online, brat green, brat album cover generator, brat font generator |
| `/features/` | Brat Generator features / key features of Brat Generator | real-time preview, no watermark, no sign-up, Brat green hex, Brat Generator vs Canva |
| `/how-to-use/` | how to use Brat Generator | how to make Brat text, Brat Generator for beginners, download Brat Generator image, text not fitting, blurry image |
| `/blog/how-to-make-a-brat-album-cover-free/` | how to make a Brat album cover | Brat album cover generator, Brat album cover maker, Brat green hex, Brat font, Brat album cover sizes |

The pages intentionally target different search intents to reduce keyword cannibalisation.

## Completed in Code

### On-page SEO
- [x] One clear H1 per indexable page.
- [x] Logical H2/H3 hierarchy.
- [x] Natural primary and supporting keyword placement.
- [x] Distinct page intent and content depth.
- [x] Unique title tags.
- [x] Unique meta descriptions.
- [x] Clean descriptive URLs.
- [x] Internal links between Home, Features, How-to, Blog, and the album-cover guide.
- [x] Descriptive CTA anchor text.
- [x] Helpful troubleshooting and limitation sections.
- [x] Non-affiliation and commercial-use caution language.
- [x] Removed/avoided unsupported claims such as fake review scores and fake user counts.
- [x] Source links added for notable cultural claims (Collins Dictionary and BRIT Awards).

### Technical SEO
- [x] Preferred canonical domain set to `https://bratgeneratorpro.net`.
- [x] Self-referencing canonical URL metadata on indexable pages.
- [x] `robots.txt` metadata route.
- [x] XML sitemap metadata route.
- [x] Static-export-compatible route structure.
- [x] HTTPS + non-www redirect rules prepared in `.htaccess` for Apache/cPanel deployment.
- [x] Custom 404 page.
- [x] `en-GB` document language.
- [x] Mobile viewport and theme colour.
- [x] No accidental `noindex` directives.
- [x] Open Graph metadata.
- [x] Twitter/X card metadata.
- [x] Favicon.
- [x] 1200×630 social preview image.
- [x] Web app manifest.
- [x] Breadcrumb navigation on inner pages.
- [x] Breadcrumb structured data.
- [x] `WebSite` structured data on the homepage.
- [x] `WebApplication` schema.org markup without fabricated ratings/reviews.
- [x] `Article` / `BlogPosting` structured data for guide content.
- [x] No deprecated HowTo rich-result markup.
- [x] No FAQ rich-result markup (Google removed the FAQ rich-result feature in 2026).
- [x] No obsolete meta-keywords tag.

### JavaScript / Next.js SEO
- [x] Important page copy is server-rendered/static HTML, not client-only content.
- [x] Generator is the main client-side component; informational content remains crawlable without interaction.
- [x] Real `<a>`/Next.js links used for crawlable navigation.
- [x] No external JavaScript tracking scripts added yet.
- [x] No external font dependency; system UI typography keeps rendering fast.
- [x] Reduced-motion CSS support.
- [x] Semantic sections, tables, lists, and accessible labels.
- [x] Skip-to-content accessibility link.

### Tool Quality / Content Accuracy
- [x] Live preview.
- [x] Brat Green + custom colour controls.
- [x] Blur control.
- [x] Text-size control.
- [x] Letter-spacing control.
- [x] 60-character limit shown to users.
- [x] 1:1, 4:5, 9:16, and 16:9 canvas presets.
- [x] PNG, JPG, and WebP export.
- [x] No watermark.
- [x] No account requirement.
- [x] Browser-side canvas generation.
- [x] Page copy updated so feature claims match the working tool.

### Site Architecture
- [x] Homepage `/`
- [x] Features `/features/`
- [x] How-to guide `/how-to-use/`
- [x] Blog index `/blog/`
- [x] Album-cover guide `/blog/how-to-make-a-brat-album-cover-free/`
- [x] Dedicated Brat Styles page `/brat-styles/`.

## Deliberately Not Added

- Fake star ratings, fake review counts, or fake creator counts.
- Keyword-stuffed meta keywords.
- FAQ rich-result schema: Google removed this Search feature in May 2026.
- HowTo rich-result schema: Google deprecated/removed HowTo rich results earlier.
- SoftwareApplication fake aggregateRating: Google requires real rating/review data for that rich-result path, so no rating was invented.
- Links to “Font Generator”, “Meme Generator”, or other dedicated tools that do not currently exist.

## Must Be Done Together After Deployment

These depend on the live domain, DNS, accounts, or real field data and cannot be truthfully completed offline:

- [ ] Back up the current WordPress/public_html site before replacement.
- [ ] Build the static Next.js `out/` folder.
- [ ] Upload the final build to `bratgeneratorpro.net` hosting.
- [ ] Confirm HTTPS and non-www canonical redirect works live.
- [ ] Confirm no old WordPress/PHP critical-error response remains.
- [ ] Crawl the live production site for 200/301/404 status codes.
- [ ] Verify final canonical tags from the live HTML.
- [ ] Verify `robots.txt` and `sitemap.xml` live.
- [ ] Google Search Console DNS verification.
- [ ] Submit sitemap in Search Console.
- [ ] URL Inspection + rendered-page check for key URLs.
- [ ] Request indexing where appropriate.
- [ ] Review indexing reports after Google recrawls.
- [ ] Google Analytics 4 property + event tracking, if you want analytics.
- [ ] Update privacy wording if GA4 or another analytics service is enabled.
- [ ] Bing Webmaster Tools verification + sitemap.
- [ ] PageSpeed Insights live test.
- [ ] Core Web Vitals field-data monitoring (LCP, INP, CLS).
- [ ] Rich Results Test / Schema validation on live URLs.
- [ ] Search Console manual actions/security issues check.
- [ ] Backlink baseline and referring-domain audit using live data.
- [ ] Competitor backlink gap research.
- [ ] Quality outreach/digital PR/link earning after the site is stable.
- [ ] Monthly Search Console + GA4 SEO reporting.


## Brat Styles page
- [x] Dedicated crawlable route: /brat-styles/
- [x] Unique title, meta description, canonical, Open Graph/Twitter metadata
- [x] Breadcrumb structured data
- [x] Natural colour-intent keywords: black, white, pink, different colours
- [x] Brat Green #8ACE00 colour guide
- [x] Typography/blur guidance
- [x] Export sizes/formats section
- [x] Internal links from homepage, header/footer and album-cover guide
- [x] Added to XML sitemap

## Cohesion + Trust Pages Update
- [x] Header navigation includes Home, Features, How to Use, Brat Styles, Album Cover Guide, and Blog (Blog last).
- [x] Active-page navigation state added for easier orientation.
- [x] Mobile menu now includes FAQ, Privacy, Terms, and Contact.
- [x] Footer reorganized into Create, Learn, and Trust groups.
- [x] Plain internal text links upgraded into designed pill/card links.
- [x] Reusable related-page cards added to Features, How-to, Brat Styles, and Album Cover Guide pages.
- [x] About page: `/about/`
- [x] Privacy Policy: `/privacy-policy/`
- [x] Terms of Use & Disclaimer: `/terms/`
- [x] Contact page: `/contact/`
- [x] New trust pages have unique metadata, canonicals, breadcrumbs, and sitemap entries.
- [x] Dedicated Brat Styles page is now complete and linked across the site.

### One user-side item before launch
- [ ] Create or forward the mailbox `contact@bratgeneratorpro.net` before the production site goes live, or replace `siteConfig.contactEmail` with another working address.

## Navigation + Internal Linking Audit Update
- [x] Primary header now starts with `Home` instead of labeling the homepage as `Generator`.
- [x] Removed the desktop `More` dropdown.
- [x] Promoted `Album Cover Guide` (the first former More item) directly into the primary desktop/mobile navigation.
- [x] Former More destinations remain available in the footer: FAQ, About, Privacy Policy, Terms & Disclaimer, and Contact.
- [x] Footer now includes both `Home` and `Open Generator` so the homepage and generator anchor have distinct labels.
- [x] Blog hub now includes designed related-page cards to How-to, Brat Styles, and Features.
- [x] Internal trust-page link on Privacy Policy converted to a crawlable Next.js `Link`.
- [x] Cross-page CTAs use designed pill/card styling instead of plain underlined text.
- [x] Key route and anchor targets checked in source for the current static route set: 71 internal references checked, 0 missing route/anchor targets found.

## Image SEO — Current Asset Set
- [x] 1200×630 social preview image is present.
- [x] Open Graph image dimensions and descriptive alt text are set on key SEO pages.
- [x] Googlebot is allowed `max-image-preview: large`.
- [x] Article structured data now describes the social image as an `ImageObject` with width, height, and caption.
- [x] Favicon has a dedicated SVG asset.
- [x] Current site content primarily uses CSS/canvas-generated visuals rather than content `<img>` elements, so there are no missing content-image alt attributes to repair in the present build.
- [ ] Re-audit image compression, intrinsic dimensions, lazy loading, and alt text if/when real content screenshots or image files are added later.

## Pre-Deployment Hardening Update
- [x] Apache text compression rules prepared with `mod_deflate` fallbacks.
- [x] Static asset browser caching rules prepared with `mod_headers` / `mod_expires` fallbacks.
- [x] HTML is kept revalidation-friendly with `no-cache` rather than long-lived page caching.
- [x] Safe baseline headers prepared: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and restricted camera/microphone/geolocation permissions.
- [x] CSP intentionally deferred until live analytics/third-party requirements are known, avoiding accidental breakage.
- [x] OG image verified as 1200×630 and approximately 36 KB.
- [x] Added `DEPLOYMENT_READINESS.md` with the exact build-output checks to perform before upload.

### Troubleshooting content update
- [x] Dedicated troubleshooting article created at `/blog/brat-generator-not-working/`.
- [x] Targets the natural problem-intent phrase `brat generator not working` plus download, blur, text-fitting, colour, and mobile-download issues.
- [x] Homepage Help accordion removed to avoid duplicated presentation; a designed CTA now points to the article.
- [x] Blog listing now features the troubleshooting article; Album Cover Guide remains promoted in the primary header.
- [x] Standalone source rows replaced with natural inline citations inside relevant content.
