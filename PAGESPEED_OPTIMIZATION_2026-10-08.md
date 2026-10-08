# Brat Generator — all-indexable-page performance optimization

Date: 2026-10-08
Base: the user-uploaded `Brat-Generator-SOURCE(1).zip` only. No previous patch or different project was merged.

## Scope

`INDEXABLE_PAGES` in `scripts/site-routes.mjs` enumerates 22 routes: homepage; video, meme, image, album cover, font generators; styles, examples; Help index and eight Help articles; about, contact, privacy, cookies, terms.

Preserved: all visible text, SEO metadata/canonical/schema, TOC, Related Posts, approved layout, mockup images, export UI, embeds, analytics consent, translation and tools. No images or article copy have been replaced.

## Audited source and confirmed causes

1. **Real production iframe 404**: live `https://bratgeneratorpro.net/brat-generator-embed.html` returned 404 during this audit, while `https://bratgeneratorpro.net/brat-generator-embed/` served the tool. The iframe requested the failing URL, then used a large dynamic `srcDoc` fallback after a 404 response. This can create a console error, waste a request, delay the visible generator and initialize more JavaScript than necessary. Both files exist in the uploaded source and are byte-identical; the deployment resolves the folder URL, not the `.html` URL.
2. **Render-blocking stylesheet on non-homepage pages**: pre-existing `scripts/postbuild-inline-home-css.mjs` targeted only `out/index.html`. All other 21 indexable routes retained blocking CSS. The same script only matched `/_next/static/css/`; modern Next builds can place CSS in `/_next/static/chunks/`, leaving the homepage unchanged when the emitted path differs.
3. **Large single shared stylesheet**: `app/globals.css` is ~150 KB raw/~30 KB gzip as a source file. It has multiple historic CSS override sections. No reliable dead-rule elimination was attempted without a fully rendered production coverage audit because JSX and iframe tooling use dynamic classes and preserving the approved look is mandatory.
4. **Page hero transitions**: `PageHero.tsx` attached staggered `hero-delay-*` fade transitions to every tool/info route hero text; the LCP candidate need not wait for them. The homepage already carried a prior animation override. Added a narrowly scoped static-paint guarantee for PageHero only, preserving final typography.
5. **Footer prefetch**: shared footer Next `<Link>` calls used default automatic prefetch. Disabled prefetch in footer only; all navigation still functions.
6. **Article table of contents**: scroll listener computed multiple bounding rectangles repeatedly during scroll. Requests are now coalesced into an animation frame; TOC active-section logic and scrolling remain the same.
7. **Images and below-fold rendering**: tutorial screenshots contain the correct 499×857 metadata; `HowToImage` already lazy-loads/decodes asynchronously; other images use explicit dimensions. Existing `main > .section`/footer `content-visibility` rules retained. No new aggressive containment was imposed on article sections because that could harm anchor scrolling and TOC accuracy.
8. **Embeds and runtime**: video iframe remains lazy; homepage iframe remains eager because the interactive tool is a first-screen feature. Large `lib/embedDocuments.ts` is dynamically imported only when an embed needs fallback; it is not blindly removed. Global language provider and client tool editors remain client-side for necessary interactions.
9. **Hosting cache**: added explicit caching for public `/images/` (one day browser / seven days CDN with revalidation) and content-hashed `/_next/static/` assets (one year immutable). Existing canonical redirects, CSP, favicon, and embed noindex directives remain.

## Changes made

- `components/BratGenerator.tsx`: development uses `/brat-generator-embed.html` (served by Next dev); production uses `/brat-generator-embed/` (confirmed accessible live). Fallback stays available.
- `scripts/postbuild-inline-home-css.mjs`: generalized to every indexable export; safely inlines actual built Next CSS with cascade intact, removes redundant CSS preload, normalizes any relative `url(...)`, fails visibly on missing indexable HTML or missing CSS, and is idempotent.
- `components/PageHero.tsx` and `app/globals.css`: remove artificial PageHero LCP delays without changing final visuals.
- `components/SiteFooter.tsx`: disable footer prefetch.
- `components/ArticleTableOfContents.tsx`: schedule active-heading updates with `requestAnimationFrame`.
- `vercel.json`: static asset cache headers.
- `scripts/performance-check.mjs` and `scripts/technical-check.mjs`: update assertions for the real production iframe and all-route CSS coverage.
- `scripts/performance-export-check.mjs`: validate all 22 generated HTML pages **after** an actual build, including inlined CSS, canonical metadata, main landmarks, and iframe assets.
- `scripts/test-postbuild-css.mjs`: dependency-free fixture test for all 22 pages, CSS paths, preload removal, rebase and idempotence.

### CSS trade-off (important)

The safest conservative solution inlines each route's emitted CSS in its HTML. This eliminates the separate render-blocking CSS fetch without resorting to unsafe async CSS that could cause flashes or layout shift. However, it **duplicates CSS bytes per HTML page**, reduces cross-route shared stylesheet caching, and does not itself prove the CSS has no unused selectors. Run a production build and Lighthouse across multiple pages to determine whether this wins over an extracted critical-CSS architecture. If field results degrade, restore external CSS or implement coverage-verified route-specific CSS splitting in a later deployment rather than stripping classes by guesswork.

## Tests executed here

- `npm run performance:test`: **PASS**, fixture rewrite for all 22 indexable pages; repeated invocation idempotent.
- `npm run performance:check`: **PASS**, 0 failures.
- `node scripts/technical-check.mjs`: **PASS**, 0 failures.
- TypeScript/TSX **syntax parsing** using locally available TypeScript: **PASS**, 62 files / 0 parse errors. This is NOT a typecheck.
- `node --check` on new/modified `.mjs`: **PASS**.
- Image metadata and public embed file checks performed by direct inspection.
- **BLOCKED**: `npm ci` and therefore real `npm run build`, TypeScript typecheck with project dependencies, `npm run performance:export`, full `npm run seo:check`, browser behavior and Lighthouse. Registry DNS/network access is unavailable in this sandbox; `npm ci --offline` failed on an uncached `undici-types` package. Do NOT describe the production build as tested/passing. Run the commands below before deploying.
- Current live PageSpeed score and post-deploy PageSpeed performance improvement were NOT measured here; the screenshots are the user's pre-change baseline.

## Apply on Windows / VS Code

1. Make a backup of your existing project.
2. Extract `Brat_Generator_PAGESPEED_CHANGES_ONLY.zip` into the root of the existing project and **replace files**. It contains relative project paths such as `components/...`, `scripts/...`, `vercel.json`, `package.json`.
3. Open VS Code terminal at the project root (the folder containing `package.json`).

### Local development

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000`. The dev embed intentionally uses `.html` because Next dev may not resolve public directory index URLs.

### Production / technical checks (run one command at a time)

```powershell
npm run performance:test
npm run performance:check
npm run technical:check
npm run build
npm run performance:export
npm run onpage:check
node scripts/prelive-check.mjs
npm run seo:check
```

The production build emits `out/` and automatically runs the **all-route CSS inliner**. The export check must show PASS for all 22 routes. An actual Next build is essential; the fixture test alone does not guarantee it.

### Local production-style server and browser performance test

```powershell
npm run lighthouse:serve
```

Open `http://localhost:3000/`, `http://localhost:3000/help/`, `http://localhost:3000/brat-font-generator/`, etc. In another terminal, run Chrome DevTools Lighthouse in mobile mode or PageSpeed Insights on the **deployed** URLs. Test all 22 routes if time permits. Confirm no console 404 from the homepage iframe, TOC links and translations still work, and all tools export correctly.

### GitHub / Vercel deployment

```powershell
git status
git add -A
git commit -m "Optimize PageSpeed across all indexable Brat Generator pages"
git push origin HEAD
```

After Vercel deployment: view source on the homepage and an interior Help page. Look for `data-indexable-inline-css`, canonical tag, schema and the iframe `src="/brat-generator-embed/"`. Retest a handful of URLs first, then the full route list. Lighthouse fluctuates; no exact score or all-100 promise is made.
