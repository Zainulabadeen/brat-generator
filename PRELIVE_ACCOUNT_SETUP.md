# Pre-Live Account Setup — Prepared

These are the only pre-live items that cannot be completed inside the codebase because they require the site owner's Google/Bing/domain/hosting accounts.

## 1) Google Search Console — recommended before launch
- Create a **Domain property** for `bratgeneratorpro.net`.
- Google will provide a DNS TXT record.
- Add that TXT record at the domain/DNS provider and verify.
- Domain-property verification does not require the new Next.js site to be live.
- Do **not** submit the new sitemap until the Next.js site is live.

Optional alternative: if using an HTML verification token instead of Domain/DNS verification, put the token in `.env.local` as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` before the production build.

## 2) Google Analytics 4 — code is ready
- Create a GA4 property and Web data stream for `https://bratgeneratorpro.net`.
- Copy the Measurement ID (format `G-XXXXXXXXXX`).
- Put it in `.env.local` as `NEXT_PUBLIC_GA_MEASUREMENT_ID` before the final production build.
- The project only loads GA4 after the visitor accepts the optional analytics consent banner.
- Generator downloads fire the event `brat_design_download` with export format and canvas dimensions.

## 3) Bing Webmaster Tools — verification can be prepared before launch
- Add `bratgeneratorpro.net` in Bing Webmaster Tools.
- Prefer DNS verification or import from Search Console after GSC is verified.
- If Bing provides a meta verification token, set `NEXT_PUBLIC_BING_SITE_VERIFICATION` before the final build.
- Submit the sitemap only after the new site is live.

## 4) Hosting / WordPress backup — owner access required
Before deleting or replacing anything in `public_html`, download:
1. a ZIP backup of all existing WordPress files;
2. a SQL export of the WordPress database.

The project itself cannot access cPanel/hosting credentials from this chat.
