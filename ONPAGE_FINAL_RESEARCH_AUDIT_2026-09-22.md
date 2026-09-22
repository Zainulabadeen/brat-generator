# Brat Generator — Final On-Page Research Implementation

Date: 22 September 2026

This update applies the remaining practical on-page improvements identified from the four research documents covering the homepage, feature page, how-to guide, album-cover guide, keywords, outlines, and competitor audits.

## Implemented

- Homepage metadata spelling consistency: `Customise colours`.
- Homepage CTA brand casing corrected to `Brat`.
- Homepage use-case copy now naturally covers `Brat meme generator` without changing page intent.
- Features page clarifies `Brat font generator` intent accurately: the tool creates a visual text effect but does not provide an installable font file.
- How-to page freshness date updated to 22 September 2026.
- How-to page adds contextual internal links to Features and the album-cover guide.
- How-to page adds an original output example with descriptive alt text.
- How-to page adds dedicated troubleshooting coverage for:
  - Brat Generator text not fitting
  - Brat Generator blurry image
  - downloading a Brat Generator image
  - colours appearing differently across screens
- How-to page strengthens platform-use guidance for TikTok, Instagram Stories, and PFPs.
- How-to page adds a neutral Brat Generator vs Canva vs Photoshop comparison.
- How-to page links to the dedicated troubleshooting article and album-cover guide.
- Album-cover article freshness date updated to 22 September 2026.
- Album-cover article now naturally uses `Brat album cover maker` while preserving the main keyword `how to make a Brat album cover`.
- Album-cover article adds three original Brat-style cover examples with descriptive alt text and captions.
- Album-cover article adds a dedicated `Brat Album Cover Ideas` section.
- Album-cover article adds a neutral Brat album cover generator vs Canva vs Photoshop comparison.
- Album-cover article adds concise troubleshooting for blur/readability, cropping, and pixelated exports.
- Album-cover article strengthens contextual internal links to How-to, Features, and Troubleshooting.
- The on-page checker no longer treats FAQPage schema as a mandatory homepage requirement and now checks the researched intent terms on the How-to and album-cover pages.

## Keyword Ownership Preserved

- `/` → Brat Generator
- `/features/` → Brat Generator features / key features
- `/how-to-use/` → how to use Brat Generator
- `/brat-styles/` → Brat styles and colour variations
- `/video-generator/` → Brat video generator
- `/blog/how-to-make-a-brat-album-cover-free/` → how to make a Brat album cover
- `/blog/brat-generator-not-working/` → Brat Generator not working / troubleshooting

The update intentionally avoids forcing every research keyword into the homepage, which would increase cannibalisation and keyword-stuffing risk.

## Validation Completed in This Workspace

- TSX syntax parse: PASS for Homepage, Features, How-to, and Album-cover pages.
- CSS parser check: PASS.
- Meta title lengths for the four reviewed pages: within the 30–65 character target.
- Meta description lengths for the four reviewed pages: within the 100–165 character target.
- Added images include descriptive alt text.
- New internal links point directly to canonical site routes.

A full Next.js build could not be completed in this workspace because project dependencies were not available locally and dependency installation timed out. Run `npm run build` and `npm run onpage` in the existing VS Code project after applying the patch; no dependency or package changes are included in this update.
