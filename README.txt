BRAT GENERATOR — NEXT.JS SEO BUILD
=================================

LOCAL RUN
1. Open this folder in VS Code.
2. First time only in this folder:
   npm install
3. Run:
   npm run dev
4. Open:
   http://localhost:3000

PRODUCTION BUILD
1. Stop the dev server with Ctrl+C.
2. Run:
   npm run build
3. Because next.config.mjs uses output: 'export', Next.js creates an `out` folder.
4. Back up the current hosting before replacing anything.
5. Upload the CONTENTS of `out` to the final web root (usually public_html).

IMPORTANT
- Do not delete the current WordPress site until a backup is saved.
- Check that `.htaccess` is present in the deployed web root. It contains HTTPS + non-www redirect rules and the custom 404 setup for Apache/cPanel.
- Search Console, GA4, Bing, live PageSpeed, indexing and DNS work should be done only after this final build is live on https://bratgeneratorpro.net.
- See SEO_IMPLEMENTATION.md for the full completed/pending SEO checklist.
