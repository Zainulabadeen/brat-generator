# How to Test the On-Page SEO Update

## 1. Local visual check

Run:

```bash
npm run dev
```

Check Home, Features, How to Use, Brat Styles, Video Generator, Blog, Album Cover Guide and Troubleshooting.

Confirm:

- Existing visible copy and FAQs look the same as before.
- No “Quick answer” block appears on any page.
- The Video Generator keeps its approved explanatory sections and those sections match the site’s existing visual style.
- The Blog index ends after the real blog-post cards and does not show the redundant page-navigation card block.

## 2. Full build + technical pre-live check

Stop the dev server with Ctrl+C, then run:

```bash
npm run prelive
```

Expected result:

```text
PRE-LIVE BUILD CHECK: PASS
```

## 3. Automated On-Page SEO check

Run:

```bash
npm run onpage:check
```

If `out/` does not exist yet, run:

```bash
npm run onpage
```

Expected result:

```text
ON-PAGE SEO CHECK: PASS
```

The checker validates title/description length and uniqueness, canonical URLs, indexability, Open Graph/Twitter metadata, structured data, H1/H2 structure, keyword mapping, image-alt coverage, keyword overuse and internal-anchor hygiene. It does **not** require adding “Quick answer” copy.

## 4. Live checks after deployment

After deployment, use Search Console data for impressions, clicks, CTR and average position. Do not rewrite visible content simply to satisfy a guessed SEO rule; use real data and get approval before content changes.
