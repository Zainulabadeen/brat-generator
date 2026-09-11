ROBOTS.TXT CLEAN REBUILD
========================

Only public/robots.txt was rebuilt for this update. The speed/performance files
and page layout were left untouched.

Origin robots policy:
- Explicitly allows Google's Search/media/testing/product crawlers.
- Explicitly allows Google Ads and publisher crawlers.
- Blocks a short list of known high-volume/low-value crawlers.
- Asks all other compliant/basic crawlers to wait 10 seconds between requests.
- Declares https://bratgeneratorpro.net/sitemap.xml.
- Does NOT contain Content-Signal or Google-Extended rules, so the origin file
  itself has no Google-Extended allow/disallow contradiction.

IMPORTANT ABOUT CLOUDFLARE
--------------------------
If the live robots.txt still starts with '# BEGIN Cloudflare Managed content',
those lines are being injected by Cloudflare at the edge and are not coming
from public/robots.txt in this project.

For a completely clean Rank Math test with no Content-Signal warning, turn off
Cloudflare's Managed robots.txt / 'block training in robots.txt' feature. If it
stays enabled, Cloudflare may prepend Content-Signal and AI crawler rules even
when this project file is clean.

NOTE ABOUT CRAWL-DELAY
----------------------
Crawl-delay: 10 is included because it was requested for basic crawlers.
Google does not support Crawl-delay, so Google crawling is not slowed by it.
Other crawlers may or may not honor it.

NOTE ABOUT UNKNOWN BAD BOTS
---------------------------
robots.txt cannot technically stop a malicious or unknown bot that ignores
robots rules. Use Cloudflare WAF / Bot controls / rate limiting for enforcement.
