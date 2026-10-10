# Brat Generator Pro — Mobile Clipboard, Share and High-resolution Export Update

## Base
Built on `Brat_Generator_LIGHTHOUSE_CI_FIX_FULL_PROJECT.zip` (latest available project backup). The previous mobile layout, desktop restoration and Lighthouse CI stabilization are retained.

## Changes

### Main Brat Generator (phones, <=800 px)
- **Copy Image:** Call `navigator.clipboard.write()` in the original click event with a lazy `ClipboardItem` PNG blob Promise. This avoids losing tap activation while awaiting canvas encoding. A failure gives a useful fallback rather than a misleading success.
- **Share Link:** Native OS share panel via `navigator.share({title,url})` when available; desktop retains Copy Link behavior. Shareable design settings stay in the URL.
- **Share Image:** Dedicated mobile-only button sends a real PNG `File` to native share targets (such as WhatsApp) via `navigator.share({files})`. Uses a mobile-friendly maximum 1200px shared graphic; choose **Download Image** for the selected full export resolution.
- **High resolution:** Removes the fixed 8-megapixel resize prompt. 3000×3000 (9 MP) now exports at **exactly 3000×3000** if the browser has enough memory. Other selected sizes up to 20 million pixels are attempted on phones. Larger mobile sizes show a clear message rather than silently changing dimensions.
- **Noise effect:** Mobile exports process noise in strips to avoid a second massive pixel buffer. Output canvas buffers are released after toBlob.

### Meme, Image, Font and Album tools (phones, <=900 px)
- Clipboard write starts directly from the tap with deferred PNG data, not after awaiting an encoded blob.
- **Share Image** button appears only in existing mobile export controls; a real PNG file is sent to native sharing. Unsupported browsers receive a download/gallery fallback.
- After encoding, the full-resolution mobile export canvas is released; 3000×3000 album covers preserve their full dimensions.
- No change to desktop editor layouts or desktop copy/share controls.

### Video generator (phones, <=800 px)
- After successful Video/GIF/Frames export, a **Share last export** control appears. Where the phone accepts the file type, it opens native sharing with the generated file. Unsupported file types tell users to share the downloaded file from Files/Gallery.
- No desktop UI changes. Existing export formats, durations and behavior remain intact.

## Tests performed in this environment
- Main generator in Chromium mobile emulation, 320px and 390px: no horizontal overflow or JS errors; native share link and file payloads dispatched; clipboard write invoked in the click handler.
- Exported actual 3000×3000 PNG at 390px viewport with no low-memory scaling confirmation.
- Desktop viewport 1280px: original desktop Copy control visible, mobile Share Image hidden.
- Video mobile browser export: actual GIF downloaded and then passed as a native-share File; no runtime JS errors.
- `npm run mobile:check`, `npm run performance:check`, `npm run technical:check`: passed.
- TypeScript TSX parsing: passed.

## Limitations
- Android/iOS native Share and WhatsApp target selection were simulated in Chromium and must be verified on a real phone after deployment. Clipboard implementations differ by browser; Chrome's internal `content://...FileProvider` URI can represent a copied image rather than ordinary text, but some apps will not paste the image. Use **Share Image** for direct sharing.
- On low-memory devices, large exports may still fail. Failures should not silently shrink the image. Some share targets cannot receive WebM or ZIP files.
- Complete Next.js production build and deployed mobile Lighthouse tests were **not** executed in this isolated environment (npm project dependencies are not installed). The earlier GitHub Actions audit issues remain a separate task.

## Apply
Extract the CHANGES_ONLY ZIP into your existing VS Code project folder, preserving paths and replacing matching files. The FULL_PROJECT ZIP is a backup/replacement of the latest available project.

## Localhost
```powershell
npm ci
npm run dev
```
Open `http://localhost:3000` in Chrome mobile device emulation and also test on a physical phone.

## Technical/build
```powershell
npm run mobile:check
npm run performance:check
npm run technical:check
npm run build
```

## Git push
```powershell
git status
git add -A
git commit -m "Fix mobile image copy, native sharing and high-res exports"
git push origin HEAD
```
