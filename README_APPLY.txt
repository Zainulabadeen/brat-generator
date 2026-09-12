BRAT GENERATOR — LIVE TOOL PRODUCTION FIX

Why this patch exists:
- Localhost could show the generator correctly.
- The live site was loading the website's custom 404 page inside the generator iframe.
- The cause is the production iframe URL (/brat-generator-embed.html) not resolving correctly on the live deployment/CDN path.

What this patch changes:
1. components/BratGenerator.tsx
2. components/BratVideoGenerator.tsx
3. lib/embedDocuments.ts

The two tools are now self-contained with iframe srcDoc, so production no longer depends on separate /brat-generator-embed.html or /brat-video-generator-embed.html URLs.
The existing tool UI and functionality are preserved.

APPLY:
1. Extract this ZIP.
2. Paste the components and lib folders into the project root.
3. Choose Replace files in destination.
4. Run: npm run dev
5. Check homepage generator AND /video-generator/ locally.
6. Push to GitHub.
7. After deployment, open the live site and press Ctrl+F5.

GITHUB:
git status
git add .
git commit -m "Fix production generator embeds"
git push origin main
