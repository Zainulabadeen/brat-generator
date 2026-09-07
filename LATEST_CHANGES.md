# Latest Design + Blog Update

1. Standalone source rows removed; citations are inline and natural.
2. Homepage Help accordion removed and converted into a full troubleshooting article.
3. New blog article: `/blog/brat-generator-not-working/`.
4. Blog listing now shows the troubleshooting article, not the Album Cover Guide.
5. Header order is now: Home, Features, How to Use, Brat Styles, Album Cover Guide, Blog.
6. Blog is now the last primary nav item.
7. Album Cover Guide stays promoted in the header.
8. Sitemap and pre-live checker include the new article.
9. Internal route/anchor audit passes with no missing targets.
10. Header active-state logic updated so Album Cover Guide and Blog are not highlighted at the same time on the Album Cover Guide page.


## Static export build fix
- Replaced dynamic `app/sitemap.ts` with static `public/sitemap.xml`.
- Replaced dynamic `app/robots.ts` with static `public/robots.txt`.
- Replaced dynamic `app/manifest.ts` with static `public/manifest.webmanifest`.
- Added the manifest URL to root metadata.
- Updated the pre-live checker to verify `manifest.webmanifest`.
- This avoids Next.js static-export metadata-route errors on `/sitemap.xml` and keeps the project fully compatible with `output: 'export'`.
