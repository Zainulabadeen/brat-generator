# Brat Generator V34 Growth Implementation

Implemented on the V33 cleaned project base while preserving the approved visual system and shared page components.

## Product and traffic-growth work
- Real `/brat-font-generator/` tool page using the shared ToolPageShell and existing creative engine.
- New `/brat-examples/` gallery with 12 original WebP examples and preconfigured “Use this look” links.
- Main generator: Auto Fit Text, Wrap Long Text, overflow guidance, 4:5 portrait and 16:9 wide presets, and Share Link state URLs.
- Video generator: per-line timing controls and audio trim controls integrated into preview/export timing.
- New `/help/brat-video-audio-sync-formats/` guide with the existing Help article design, TOC, Related Posts, FAQ, CTA and structured data.
- Help hub topic clusters and contextual internal links.

## Technical / SEO work
- Real font route replaces its old redirect.
- Sitemap generator added and wired to `prebuild`; 22 canonical URLs generated.
- Sitemap, robots.txt and llms.txt updated for the new canonical routes.
- New pages have canonical metadata, Open Graph/Twitter metadata and appropriate JSON-LD.
- Dependency ranges pinned to tested versions in package.json/root lock metadata.
- Technical checker extended for new routes/features and currently passes with 0 failures.

## Validation completed in the working environment
- `node scripts/technical-check.mjs`: PASS — 0 failures.
- TS/TSX syntax scan: 60 source files, 0 syntax errors.
- Embedded main-generator JavaScript parse: PASS.
- Embedded video-generator JavaScript parse: PASS.
- Full Next/TypeScript build was not completed in the sandbox because dependency installation timed out and left incomplete local type packages. Run the commands below in the normal project environment.

## Local verification
```powershell
npm install
npm run dev
```

Check at minimum:
- `/`
- `/brat-font-generator/`
- `/brat-examples/`
- `/video-generator/`
- `/help/`
- `/help/brat-video-audio-sync-formats/`

Then stop dev server and run:
```powershell
npm run technical:check
npx tsc --noEmit
npm run build
node scripts/prelive-check.mjs
```
