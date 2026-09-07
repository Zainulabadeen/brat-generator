# Brat Generator — Pre-Deployment Readiness

Updated: 2026-09-07

## Completed before deployment

- [x] Main content pages and Brat Styles page created.
- [x] About, Privacy Policy, Terms & Disclaimer, and Contact pages created.
- [x] Header/footer navigation cleaned and internally connected.
- [x] Designed cross-page CTA cards and related-page sections added.
- [x] Self-referencing canonicals configured.
- [x] `robots.txt` and XML sitemap routes configured.
- [x] Open Graph/Twitter metadata configured.
- [x] WebSite/WebApplication/Breadcrumb/BlogPosting structured data added where relevant.
- [x] Static-export configuration enabled.
- [x] Custom 404 page configured.
- [x] Apache HTTPS + www-to-non-www redirect rules prepared.
- [x] Apache compression/caching baseline prepared.
- [x] Safe baseline security response headers prepared.
- [x] Current route/anchor audit previously found 0 missing internal targets.
- [x] Current OG image verified at 1200×630 and only ~36 KB.

## User-side build test — next action

From the project folder:

```bash
npm install
npm run build
```

Expected result: Next.js creates an `out` folder.

Check that `out` contains at least:

- `index.html`
- `features/index.html`
- `how-to-use/index.html`
- `brat-styles/index.html`
- `blog/index.html`
- `blog/how-to-make-a-brat-album-cover-free/index.html`
- `blog/brat-generator-not-working/index.html`
- `about/index.html`
- `privacy-policy/index.html`
- `terms/index.html`
- `contact/index.html`
- `404.html`
- `robots.txt`
- `sitemap.xml`
- `og-image.png`
- `favicon.svg`

Also confirm `.htaccess` is present in `out`. If Windows does not show it, enable hidden-file viewing or check from VS Code/terminal.

## Do not deploy yet if

- `npm run build` reports any error.
- Any expected route is missing from `out`.
- `.htaccess` is missing and the hosting is Apache/cPanel.
- The contact email has not been created/forwarded or changed to a working address.

## After a clean build

The next stage is the together/live stage:

1. Back up the current WordPress/public_html site.
2. Preserve a list of old indexable URLs for redirect checking.
3. Upload the **contents** of `out` to the final web root.
4. Confirm HTTPS + non-www redirect.
5. Crawl/check live 200/301/404 responses.
6. Verify canonicals, robots.txt, sitemap.xml, schema, mobile rendering, and PageSpeed.
7. Verify Google Search Console by DNS and submit the sitemap.
8. Set up GA4/Bing if desired.
9. Start backlink/competitor/off-page work only after the site is stable.
