# Brat Generator Pro — Mobile editor and crash-resilience update

**Base:** Brat_Generator_PAGESPEED_FULL_PROJECT.zip (previous approved PageSpeed release). The original source ZIP and older files were not mixed in. All existing site pages, copy, schemas, TOC, Related Posts, photos and the approved desktop visuals remain present. No new visible marketing sections were added.

## Root causes confirmed by source inspection

1. `public/brat-generator-embed.html`: mobile mode strip was fixed-height but allowed wrapping. Wrapped presets, including Gradient, could be clipped.
2. Undo was absolutely positioned over the canvas. It overlapped the preview on small screens.
3. The main generator stacked every control, toggle, colour and export option in one long panel after the canvas. This forced repeated back-and-forth scrolling.
4. Critical history bug: `pushHist()` previously did `JSON.stringify(S)` where `S` itself contained `hist`, embedding all older snapshots inside every new snapshot. Repeated edits could cause exponential memory growth and browser failure.
5. Export created TWO huge canvases by temporarily resizing the live preview to full dimensions, copying it to another canvas, then encoding a base64 data URL, causing large transient allocations. Mobile Chrome can terminate such tabs.
6. No local draft autosave in the main embed; unsaved work disappeared on browser restart/reload.
7. The Meme, Font and Album React tools originally put every input above the canvas on mobile; preview was below all controls.
8. The Video Generator exposed long lyrics, audio, format and FPS settings together. Its parent iframe measured height only once, potentially clipping expanded timing panels.

## Changes made

### Main Generator (homepage)

- Mobile presets use a readable **4-column/two-row strip**. All seven modes including Gradient are visible, not clipped or hidden behind an invisible horizontal scroll.
- Mobile Undo has a dedicated row, above the canvas, instead of absolute overlapping positioning.
- Smaller preview and compact copy/share/download/reset actions. Controls are behind accessible Text, Colours, Type, Effects and Export mobile tabs. Desktop control layout remains unchanged.
- Added the **gradient secondary colour picker** when Gradient is selected (was present in the state but had no editor).
- Undo keeps up to 40 **flat design snapshots**; excludes history from history. This removes exponential memory growth.
- Direct single-canvas export using `toBlob` and a temporary Blob URL rather than `toDataURL`; the editor preview stays at preview resolution.
- Before oversized exports, the user gets a **choice**: confirm a safe-sized version or cancel and lower resolution. Safety caps: 8 megapixels on mobile and 25 megapixels on desktop. Normal desktop 3000×3000 exports remain exact. A status message flags a downscaled export. The requested original size is never silently changed.
- Saves lightweight design settings in browser localStorage and restores on refresh unless a specific shared-design query is supplied. Browsers with storage disabled continue to work without recovery.
- Same changes synced to both public embed URLs and fallback TS documents.

### Meme, Font and Album tools

- Only on mobile, live preview appears **before the editor**.
- Controls use compact tabs: Text, Colours, Type and Effects. One selected category shown at a time.
- Export actions placed immediately below live preview, with mobile-friendly touch sizes.
- Local lightweight settings autosave and restore after refresh. User-uploaded photos are NOT stored to avoid private data persistence and memory overload; they must be selected again after a reload.
- Export/copy errors report understandable messages; Blob download URLs remain alive long enough for slower mobile browsers.

### Image Generator

- Keeps the existing text-first Create Brat Image workflow. On mobile, Design settings becomes an expandable section. Desktop keeps all existing controls visible.
- Stores text and lightweight settings locally; does not store uploaded photo bytes. Oversized (>16 MB) or invalid image files show a message.

### Video Generator

- Compact live lyric preview inside the mobile editing view.
- Lyrics, Audio and Export as small mobile tabs; existing desktop tabs and export functionality preserved.
- Lightweight lyric text draft autosave; uploaded audio must be selected again after a reload.
- ResizeObserver sends iframe height changes to parent when lyrics and timing rows expand; prevents nested iframe clipping.
- Public and fallback embed copies kept consistent.

## Tests actually run in this environment

- Chromium headless rendering and interaction for main generator at 320, 390, 768 and 1200 CSS pixels: no horizontal overflow, mode toggling, Gradient + secondary picker, Undo, 100 edit history snapshots (40 retained), no page script errors in tested paths.
- Chromium headless video tool at 320, 390 and 768 pixels: no horizontal overflow, edit tab switching, text update and mini live preview, no page script errors in tested paths.
- Browser mock-localStorage test: main generator text survives simulated reload.
- Browser oversized export test: memory cap respected, user consent requested; desktop 1000x1000 at 3x stays exact 3000x3000.
- TypeScript/TSX syntax transpilation for 62 source files: 0 parser errors.
- `npm run mobile:check`: PASS (13 checks).
- `npm run performance:check`: PASS.
- `npm run technical:check`: PASS.
- `npm run performance:test`: PASS for all 22 indexable route fixtures.

**Not claimed/limitations:** A real `next build` and Lighthouse/PageSpeed run were **not** completed here: the npm registry was inaccessible, so the exact Next/React dependencies could not be installed in this execution sandbox. The full React tool pages were source-reviewed, but could not be interactively rendered as a Next.js app in this sandbox. Source and standalone-browser tests are not a replacement for checking a deployed build on a real iPhone/Android device, especially low-memory Safari/Chrome and audio/video export. A Chrome Out-of-Memory screen can also arise from browser/device conditions unrelated to site code. Exact PageSpeed 99 on every run cannot be guaranteed.

## Installation — Paste and replace

1. Make a copy of your VS Code project folder or keep the Full Project ZIP as backup.
2. Unzip the `CHANGES_ONLY` archive directly into the same project root. **Replace matching files** without removing other files.
3. In VS Code terminal:

```powershell
npm ci
npm run mobile:check
npm run performance:check
npm run technical:check
npm run performance:test
npm run dev
```

4. Open localhost and test homepage generator, Meme, Image, Font, Album, Video at Chrome DevTools device widths 320, 375, 390 and 768, plus desktop. Change text/effects, try Undo and Gradient, save/download, reload to confirm design draft recovery; try separate browser profiles.
5. Before deployment:

```powershell
npm run build
npm run performance:export
npm run seo:check
```

6. If all pass, commit and push:

```powershell
git status
git add -A
git commit -m "Improve mobile tool editors and prevent generator memory crashes"
git push origin HEAD
```

7. Retest production `/`, `/brat-meme-generator/`, `/brat-image-generator/`, `/brat-font-generator/`, `/brat-album-cover-generator/`, `/video-generator/`, then all other indexable routes for mobile PageSpeed, CLS, export and accessibility before declaring the change production-verified.

## Recovery / privacy

Drafts stay on the browser/device; private-window deletion, browser clearing site data, or switching devices removes access to those local drafts. Uploaded audio/image files cannot be restored after a browser crash or full reload; reselect them. The main generator Share Link remains available to save and reopen ordinary design settings across devices.
