# Brat Generator Pro — ONE final mobile update + automated production/Lighthouse verification

**Read this first.** This package supersedes the earlier `Brat_Generator_MOBILE_EDITOR_*` ZIPs. You do **not** need to apply those earlier mobile ZIPs first. The Changes Only ZIP in this release is deliberately created relative to the approved `Brat_Generator_PAGESPEED_FULL_PROJECT.zip`, so it includes ALL mobile improvements plus this release's validation scripts.

## What is included

- The existing mobile editor update: compact controls; preview-first layout where appropriate; undo/gradient improvements; bounded generator history; draft autosave; export memory protections; responsive Meme/Image/Font/Album/Video workflows.
- `scripts/production-route-smoke.mjs`: tests the **built static export** over actual HTTP, including the 22 indexable routes, embeds and linked Next static assets.
- `scripts/lighthouse-mobile-all.mjs`: invokes actual Chrome Lighthouse against the locally built static export on **all 22 indexable routes** and saves per-route JSON, CSV and summary. Supports `--live` after deployment.
- `.github/workflows/brat-mobile-production-audit.yml`: on push/pull request, installs dependencies, runs `next build`, source/built SEO checks, 22-route HTTP smoke checks and Lighthouse, and uploads results.
- `.github/workflows/brat-live-mobile-audit.yml`: audits the canonical live domain after a successful *Production* GitHub deployment-status event, **if** the deployment provider emits it. It can also be launched manually from GitHub Actions after Vercel deployment. Neither trigger proves a specific deployment revision unless verified against the Vercel commit.

## Tests completed in this restricted preparation environment

- `npm run mobile:check` — PASS (13/13 source checks).
- `npm run performance:check` — PASS.
- `npm run performance:test` — PASS (22-route CSS optimization fixtures).
- `npm run technical:check` — PASS.
- TypeScript syntax transpilation from previous update: 62 files, no parser errors (not a full typechecked Next build).
- Chromium standalone main editor at 320, 390, 768, 1200 px, and video editor at 320, 390, 768 px — 7 local browser interaction/overflow checks passed.
- Production HTTP smoke harness — PASS against 22 synthetic static-export route fixtures, plus generator endpoints and static asset resolution (this is a **test of the smoke-check runner**, not the actual Next build).
- Lighthouse report runner — PASS against 22 simulated CLI responses (this tests the **test runner and CSV output**, not Lighthouse scores).

## Unverified and why

- A real Next.js production build **could not be completed here** because registry.npmjs.org DNS is unavailable; `npm ci --offline` also fails with ENOTCACHED (`undici-types` and other packages absent). Source/fixture results must not be mistaken for build success.
- Real Chrome Lighthouse cannot run against a build that has not been produced. Real site browser navigation is also restricted in this environment.
- A **post-deployment** Lighthouse score cannot be measured for code that has not been deployed. Do not treat the currently public site's existing 99/100 screenshot as a measurement of this update. The live workflow is ready for deployment-time checking.
- No numeric PageSpeed score is guaranteed. Mobile CI lab results vary between devices, environment, network simulation and runs; production PageSpeed should be reviewed after Vercel has deployed the *correct commit*.

## Apply to your current project (one time only)

1. Keep an existing project backup, or use this release's **FULL PROJECT ZIP**.
2. Extract this release's **CHANGES ONLY ZIP** directly into the existing VS Code project root; replace matching files. Leave the rest of your project in place. Do not first install the old mobile ZIP.
3. Open PowerShell/VS Code terminal inside the project folder and run:

```powershell
npm ci
npm run release:verify
npm install -g lighthouse@12
npm run lighthouse:mobile:all
```

`release:verify` runs the source checks, **actual** Next.js production build, exported-file SEO checks and a real HTTP smoke test of all 22 pages. Lighthouse results are saved to `artifacts/lighthouse-mobile/`, with one JSON per URL, `results.csv` and `summary.json`. The Lighthouse commands run Chrome on the exported build, not the deployed Vercel site.

If any command fails, stop: do not push the release until the error has been fixed. Do not rely on a previous successful build when verifying this release.

4. Optional localhost editing preview:

```powershell
npm run dev
```

5. After tests pass, push to the existing GitHub branch:

```powershell
git status
git add -A
git commit -m "Finalize mobile editors and automate production Lighthouse audits"
git push origin HEAD
```

6. Check the **Actions** tab on GitHub for the real Next build + 22-route Lighthouse job. Once Vercel has deployed the exact commit, use `Actions > Live production mobile Lighthouse > Run workflow` if no automatic *Production* deployment-status event is emitted. Real deployed reports are in the GitHub Actions artifacts under `artifacts/lighthouse-live/`.

## What not to alter

Do not add/change existing visible copy, photos, approved mockup images, related posts, TOC, logos, schema, or page layouts while merely running validation. Existing Next.js code and mobile editor update are preserved in the full project.

## Score interpretation

The Chrome Lighthouse CI checks use safety floors of Performance 85, Accessibility 95, Best Practices 90, SEO 95 by default to catch major regressions. These are *automated minimum thresholds*, **not promises of scores**, and are configurable using `BRAT_MIN_PERFORMANCE`, `BRAT_MIN_ACCESSIBILITY`, `BRAT_MIN_BEST_PRACTICES`, `BRAT_MIN_SEO`. The desired mobile target remains the user's previously observed strong homepage performance; compare each URL against its own prior baseline where available.
