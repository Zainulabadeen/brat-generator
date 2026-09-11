# How to Test the On-Page SEO Update

## 1. Local visual check

Run:

```bash
npm run dev
```

Check Home, Features, How to Use, Brat Styles, Video Generator, Blog, Album Cover Guide and Troubleshooting. Confirm the layout is unchanged where expected and new FAQ/answer sections look normal on desktop and mobile.

## 2. Full build + existing technical SEO check

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

Because `npm run prelive` already creates `out/`, this is the quickest second check. Or run `npm run onpage` by itself to build and then audit.

Expected result:

```text
ON-PAGE SEO CHECK: PASS
```

The checker tests unique/title lengths, meta-description lengths, one H1, H2 structure, primary-keyword mapping, concise answer passages, image-alt coverage and internal-anchor hygiene.

## 4. Live checks after deployment

After Vercel deploys, inspect these pages in Google Search results / Search Console when access is available. Do not expect rankings to change instantly. Track impressions, clicks, CTR and average position by page/query, then refine titles or descriptions only when the data supports a change.
