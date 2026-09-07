# Final Pre-Live SEO & Structure Audit

Date: 7 September 2026
Status: READY FOR LOCAL BUILD VERIFICATION

## Latest requested UX/content changes — completed
- [x] Removed standalone source-link rows that looked detached from the article copy.
- [x] External citations are now naturally embedded in supporting sentences.
- [x] Converted the Homepage `Common Problems & Quick Fixes` Help section into a dedicated blog post.
- [x] New post URL: `/blog/brat-generator-not-working/`.
- [x] Added unique title, meta description, canonical, Open Graph, Twitter metadata, BlogPosting schema, breadcrumbs, internal links, and CTA to the new post.
- [x] Added the troubleshooting post to `/blog/`.
- [x] Removed Album Cover Guide from the Blog card listing.
- [x] Kept Album Cover Guide as a direct primary-header destination.
- [x] Moved Blog to the final position in primary navigation.
- [x] Removed Album Cover Guide from footer Learn links to keep its main promotion in the header.
- [x] Added the new troubleshooting URL to the sitemap.
- [x] Added the new route to the automated pre-live build checker.

## Route metadata check
| Route | Title chars | Description chars | Canonical |
|---|---:|---:|---|
| `/` | 49 | 152 | `/` |
| `/features/` | 53 | 145 | `/features/` |
| `/how-to-use/` | 52 | 149 | `/how-to-use/` |
| `/brat-styles/` | 55 | 140 | `/brat-styles/` |
| `/blog/how-to-make-a-brat-album-cover-free/` | 52 | 157 | self |
| `/blog/` | 21 | 116 | `/blog/` |
| `/blog/brat-generator-not-working/` | 57 | 148 | self |
| `/about/` | 53 | 141 | self |
| `/privacy-policy/` | 31 | 141 | self |
| `/terms/` | 42 | 145 | self |
| `/contact/` | 50 | 114 | self |

## Link audit
- 11 indexable routes.
- 98 internal route/anchor references checked at source level.
- 0 missing route targets.
- 0 missing anchor targets.

## Syntax check
A TypeScript syntax pass was run over the changed TSX files. No TypeScript parser/syntax errors were reported. Full Next.js build still needs dependencies available locally, so run `npm run prelive` on the user's PC before upload.

## What still requires account/live access
- WordPress files/database backup.
- Search Console domain verification and later sitemap/indexing actions.
- GA4 property/Measurement ID and live event verification.
- Bing verification.
- Production deployment.
- Live crawl/status/redirect/schema/PageSpeed/Core Web Vitals checks.
- Backlink/off-page execution and ongoing performance monitoring.
