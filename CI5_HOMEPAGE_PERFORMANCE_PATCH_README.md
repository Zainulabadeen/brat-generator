# Brat Generator Pro — Homepage CI #5 follow-up

This small update starts from the **Mobile Copy/Share/Export full project** ZIP, which includes the prior desktop restoration and mobile edits. It is *not* a guaranteed PageSpeed-100 fix.

## Evidence from user-provided CI #5 Lighthouse artifacts (2026-10-10)

| Metric | Local static export | Live domain |
|---|---:|---:|
| Performance | 78 | 50 |
| FCP | 1.06 s | 1.48 s |
| LCP | 2.39 s | 4.61 s |
| TBT | 835 ms | 4,702 ms |
| Main-thread work | 2.86 s | 8.04 s |
| SEO / Accessibility / Best Practices | 100 each | 100 each |

Twenty-one other indexable routes meet the minimum categories in *both* reports. Local and live failures concern only homepage Performance, not broken Next.js builds. Live homepage long tasks include 2,101 ms unattributable and two tasks in the main generator iframe (1,464 and 1,252 ms). The specific JavaScript function(s) causing these timings are NOT conclusively identified by Lighthouse's JSON alone.

## Changes

1. `public/brat-generator-embed/index.html` + mirrored `public/brat-generator-embed.html`: stop sending unchanged iframe heights, remove the document-wide high-frequency MutationObserver. ResizeObserver, load, input/change/click and scheduled initial height measurements remain.
2. `components/BratGenerator.tsx`: ignore transient initial about:blank iframe load instead of treating it as a failed embed and starting fallback loading. Genuine missing/blocked embed detection remains.
3. `scripts/lighthouse-mobile-all.mjs`: every below-threshold page, even one scoring 50, gets **three** Lighthouse samples and a median. Minimum Performance **85** is unchanged; persistent failures remain failed. All individual JSON reports are retained.

No visible copy, SEO, page structure, approved desktop styles, canvas export functionality, or mobile tool controls have been intentionally changed.

## Validation performed

- `npm run mobile:check`: 13/13 passed
- `npm run performance:check`: passed
- `npm run technical:check`: passed
- Script and embedded inline JS syntax: passed
- A simulated CI severe failure (homepage 50, 50, 50) correctly ran 3 tests and FAILED with unchanged 85 floor

NOT yet verified: real Next.js production build and a *new* genuine live Lighthouse run for this patch. Those need to run after applying and pushing it. If the homepage still fails, obtain new artifact and a Chrome performance trace to pinpoint the dominant script task(s). Do not lower the threshold or remove the generator solely to fake a better score.

## Apply

Extract the Changes Only ZIP into the **same VS Code project root**, preserving folders and confirming replacements. Or use the full ZIP as backup.

```powershell
npm ci
npm run mobile:check
npm run performance:check
npm run technical:check
npm run build
npm run dev
```

After checking the local main generator, including undo, preview, copy, share and download:

```powershell
git status
git add -A
git commit -m "Reduce homepage iframe work and verify all Lighthouse failures"
git push origin HEAD
```

Check the newest **Build and mobile Lighthouse** and **Live production mobile Lighthouse** GitHub runs, and download the `brat-mobile-lighthouse-N` and `brat-live-mobile-N` artifacts if still red.
