# Brat Generator — Mobile-only changes + desktop restore

## What was corrected

- Desktop Meme, Album Cover, Font and Image tools use the prior approved component/layout and controls.
- Desktop Main Generator Undo/Export are visible in their original places.
- Desktop article content, mockups, SEO and tool functionality are retained from the previous PageSpeed/mobile-approved project.
- Mobile Meme, Album and Font editors: text fields before preview, organized editor categories afterward, export controls at the end, and no duplicate text field below.
- Mobile Image Generator: live canvas preview while editing; no extra Generate click required; compact Colours/Type/Effects tabs; PNG/JPG/WebP, Copy, Reset at the end. The desktop Create button, placeholder and original settings remain unchanged.
- SVG category icons have a fixed size for narrow screens.
- Main Generator mobile text, Undo, responsive canvas sizing and export actions remain available. The desktop Undo control is restored.
- Restored previous all-indexable-page CSS build performance and related technical-check workflow files missing from the v2 package.

## Install

1. Back up your existing project folder.
2. Unzip the **CHANGES ONLY** archive into that existing folder (keeping folders intact) and replace files when prompted.
3. Run:

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000` and check the homepage, `/brat-meme-generator/`, `/brat-image-generator/`, `/brat-album-cover-generator/`, `/brat-font-generator/`, and `/video-generator/` at desktop and mobile widths.

## Verify before deployment

```powershell
npm run mobile:check
npm run performance:check
npm run performance:test
npm run technical:check
npm run build
npm run performance:export
```

If everything passes:

```powershell
git status
git add -A
git commit -m "Restore desktop tools and limit editor improvements to mobile"
git push origin HEAD
```

## Verified in the packaging environment

- Main Generator standalone browser interactions: 390px, 768px and 1280px viewports, desktop/mobile Undo visibility, text mirroring, mobile tabs and overflow: passed.
- CSS difference scan: approved desktop stylesheet preserved verbatim before added mobile-specific overrides: passed.
- Source checks: mobile 13/13; all-indexable CSS 22/22; performance 12/12; technical SEO source checks: passed.
- All TS/TSX source syntax parsing: passed.

**Not verified here:** actual Next.js production build, React creative-tool live rendering, Vercel deployment or new mobile Lighthouse scores. The required npm package installations are not available in this environment. Please test on localhost and verify the Vercel deployment before considering this production validated.
