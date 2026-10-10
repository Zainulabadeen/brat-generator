# Brat Generator — Lighthouse CI stability correction

Based on the uploaded GitHub Actions artifact `brat-mobile-lighthouse-4.zip` dated 10 October 2026.

## Verified issue

- All 22 indexable routes completed the Lighthouse test.
- 21/22 routes passed all configured floors.
- Homepage `/` performance was **83** versus required **85**. Its TBT was **589 ms**; FCP **1054 ms**, LCP **2366 ms**, CLS **0**.
- Homepage accessibility, best practices, and SEO were **100 each**.
- The production build, built HTML/SEO audits, and 22-route HTTP smoke tests had passed in that GitHub run.
- The Lighthouse test runs against locally served static export in GitHub's Linux runner, **not the deployed Vercel production site**.

The source code has **not** been identified as definitively defective based on one borderline performance reading. Do not interpret this as proof the website is down.

## Exactly what this update does

1. Keeps the current floors (performance 85, accessibility 95, best practices 90, SEO 95).
2. When a category score fails *within 4 points of its floor*, it runs that URL **two more times** and judges by the **median of three**. A persistent below-floor median continues to fail.
3. Saves each JSON (`home.json`, `home-retry-2.json`, `home-retry-3.json`) and adds per-page samples to CSV and JSON summary.
4. Adds readable GitHub job summary table so failed URLs are visible without downloading every JSON.
5. Pins CI to `ubuntu-24.04` instead of the changing `ubuntu-latest` alias (to avoid a surprise OS migration).
6. Does **not** change any website UI, performance score settings, content, SEO, redirects, or embedded generator functionality.

## Apply / test in VS Code

Extract the `CHANGES_ONLY.zip` directly inside the **existing project root** and replace the matching two files (the `.github` folder might be hidden in File Explorer).

```
npm ci
npm run mobile:check
npm run performance:check
npm run technical:check
npm run build
```

To execute a real local Lighthouse audit you need Lighthouse installed and Chrome available:

```
npm install -g lighthouse@12
npm run lighthouse:mobile:all
```

Then push:

```
git status
git add -A
git commit -m "Stabilize borderline Lighthouse CI audits without lowering thresholds"
git push origin HEAD
```

Check GitHub → Actions → latest **Build and mobile Lighthouse** run. The workflow runs real CI Lighthouse there. This package was syntax-checked and the retry pass/fail behavior was tested with synthetic Lighthouse CLI fixtures, but the new real GitHub run cannot be declared passed until the push executes.

## If homepage still fails

Download the new `brat-mobile-lighthouse-N` artifact and inspect `summary.json`, `results.csv`, and all `home*.json` files. If the median stays under 85, improve actual TBT rather than weakening the threshold. The previous report showed 9 long tasks involving Next.js runtime/main document and the embedded generator, but it does not isolate one definitive function as the cause.
