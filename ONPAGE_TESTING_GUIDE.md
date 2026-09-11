# On-Page SEO Testing Guide

Use this only after replacing the current project with the final ZIP.

## 1. Local build check

Run:

```bash
npm run dev
```

Open these pages and visually check the H1, quick-answer block, FAQ, related links and design:

- `/`
- `/features/`
- `/how-to-use/`
- `/brat-styles/`
- `/video-generator/`
- `/blog/`
- `/blog/how-to-make-a-brat-album-cover-free/`
- `/blog/brat-generator-not-working/`

Stop the dev server with `Ctrl + C`, then run:

```bash
npm run prelive
```

Do not deploy if the result says `PRE-LIVE BUILD CHECK: FAILED`.

## 2. After deployment

### Page source spot-check

On the homepage and at least one guide/article:

1. Open the page.
2. Press `Ctrl + U`.
3. Search for `<title>`.
4. Search for `name="description"`.
5. Search for `rel="canonical"`.
6. Search for `<h1`.

Confirm each page has a relevant unique title/description, the canonical points to itself, and there is one H1.

### Internal links

Click the contextual links inside Home, Features, How to Use, Brat Styles, Blog and both articles. They should open the final destination directly, not a 404 or old redirected URL.

### Rich Results / structured data

Re-run the homepage and both blog posts in Google Rich Results Test. A non-critical optional `aggregateRating` notice on the WebApplication is not a reason to invent ratings.

### Performance regression

Run PageSpeed Insights on the homepage in Mobile and Desktop. Focus on LCP, INP/TBT and CLS, not only the round score. This on-page update intentionally preserves the previous performance-critical implementation.

### Search-result preview

Check that titles are readable and page-specific. Google can rewrite title links/snippets, so a preview is only a formatting check, not proof of what Google will show.

## 3. When Google Search Console access is available

- Verify the domain property if still pending.
- Submit `/sitemap.xml`.
- Inspect the eight main SEO URLs.
- After enough impressions accumulate, open Performance → Search results and compare Queries, Pages, Impressions, Clicks, CTR and Average position.
- Use real query data for future CTR title/meta tests. Do not change titles every few days without enough data.

## Pass condition

On-Page SEO can be marked tested when:

- `npm run prelive` passes.
- Main pages render correctly.
- Internal links work.
- Page-source title/meta/canonical/H1 spot-check is correct.
- Rich Results has no critical schema errors.
- PageSpeed shows no meaningful regression.

Search Console CTR measurement can remain pending until account access and sufficient impressions are available.
