export const INDEXABLE_PAGES = [
  { route: '/', out: 'index.html', source: 'app/page.tsx', keyword: 'brat generator' },
  { route: '/video-generator/', out: 'video-generator/index.html', source: 'app/video-generator/page.tsx', keyword: 'brat video generator', schema: 'SoftwareApplication' },
  { route: '/brat-meme-generator/', out: 'brat-meme-generator/index.html', source: 'app/brat-meme-generator/page.tsx', keyword: 'brat meme generator', schema: 'SoftwareApplication' },
  { route: '/brat-image-generator/', out: 'brat-image-generator/index.html', source: 'app/brat-image-generator/page.tsx', keyword: 'brat image generator', schema: 'SoftwareApplication' },
  { route: '/brat-album-cover-generator/', out: 'brat-album-cover-generator/index.html', source: 'app/brat-album-cover-generator/page.tsx', keyword: 'brat album cover generator', schema: 'SoftwareApplication' },
  { route: '/brat-font-generator/', out: 'brat-font-generator/index.html', source: 'app/brat-font-generator/page.tsx', keyword: 'brat font generator', schema: 'SoftwareApplication' },
  { route: '/brat-styles/', out: 'brat-styles/index.html', source: 'app/brat-styles/page.tsx', keyword: 'brat styles', schema: 'CollectionPage' },
  { route: '/brat-examples/', out: 'brat-examples/index.html', source: 'app/brat-examples/page.tsx', keyword: 'brat examples', schema: 'CollectionPage' },
  { route: '/help/', out: 'help/index.html', source: 'app/help/page.tsx', keyword: 'brat generator', schema: 'ItemList' },
  { route: '/help/brat-video-audio-sync-formats/', out: 'help/brat-video-audio-sync-formats/index.html', source: 'app/help/brat-video-audio-sync-formats/page.tsx', keyword: 'brat video audio', schema: 'Article' },
  { route: '/help/how-to-make-a-brat-album-cover-free/', out: 'help/how-to-make-a-brat-album-cover-free/index.html', source: 'app/help/how-to-make-a-brat-album-cover-free/page.tsx', keyword: 'how to make a brat album cover', schema: 'Article' },
  { route: '/help/brat-generator-not-working/', out: 'help/brat-generator-not-working/index.html', source: 'app/help/brat-generator-not-working/page.tsx', keyword: 'brat generator not working', schema: 'Article' },
  { route: '/help/brat-video-export-guide/', out: 'help/brat-video-export-guide/index.html', source: 'app/help/brat-video-export-guide/page.tsx', keyword: 'brat video export', schema: 'Article' },
  { route: '/help/brat-video-tips/', out: 'help/brat-video-tips/index.html', source: 'app/help/brat-video-tips/page.tsx', keyword: 'brat video tips', schema: 'Article' },
  { route: '/help/brat-meme-ideas-templates/', out: 'help/brat-meme-ideas-templates/index.html', source: 'app/help/brat-meme-ideas-templates/page.tsx', keyword: 'brat meme ideas', schema: 'Article' },
  { route: '/help/which-brat-tool-should-you-use/', out: 'help/which-brat-tool-should-you-use/index.html', source: 'app/help/which-brat-tool-should-you-use/page.tsx', keyword: 'brat generator tool', schema: 'Article' },
  { route: '/help/brat-canvas-size-guide/', out: 'help/brat-canvas-size-guide/index.html', source: 'app/help/brat-canvas-size-guide/page.tsx', keyword: 'brat canvas size', schema: 'Article' },
  { route: '/about/', out: 'about/index.html', source: 'app/about/page.tsx', schema: 'AboutPage' },
  { route: '/contact/', out: 'contact/index.html', source: 'app/contact/page.tsx', schema: 'ContactPage' },
  { route: '/privacy-policy/', out: 'privacy-policy/index.html', source: 'app/privacy-policy/page.tsx', schema: 'WebPage' },
  { route: '/cookies/', out: 'cookies/index.html', source: 'app/cookies/page.tsx', schema: 'WebPage' },
  { route: '/terms/', out: 'terms/index.html', source: 'app/terms/page.tsx', schema: 'WebPage' },
];

export const RETIRED_ROUTES = [
  '/brat-text-generator/',
  '/how-to/',
  '/how-to-use/',
  '/styles/',
  '/features/',
  '/key-features/',
  '/brat-generator-features/',
  '/how-to-make-a-brat-album-cover/',
  '/blog/',
  '/blog/how-to-make-a-brat-album-cover-free/',
  '/blog/brat-generator-not-working/',
  '/blog/how-to-make-a-brat-album-cover/',
];

export const REDIRECT_SOURCES = RETIRED_ROUTES.map((route) => route === '/' ? route : route.replace(/\/$/, ''));

export const SOFTWARE_APP_ROUTES = INDEXABLE_PAGES
  .filter((page) => page.schema === 'SoftwareApplication')
  .map((page) => page.route);

export const LIVE_REDIRECTS = [
  ['/brat-text-generator', '/'],
  ['/how-to', '/#how-to'],
  ['/how-to-use', '/#how-to'],
  ['/styles', '/brat-styles/'],
  ['/features', '/#features'],
  ['/key-features', '/#features'],
  ['/brat-generator-features', '/#features'],
  ['/how-to-make-a-brat-album-cover', '/help/how-to-make-a-brat-album-cover-free/'],
  ['/blog', '/help/'],
  ['/blog/how-to-make-a-brat-album-cover-free', '/help/how-to-make-a-brat-album-cover-free/'],
  ['/blog/brat-generator-not-working', '/help/brat-generator-not-working/'],
  ['/blog/how-to-make-a-brat-album-cover', '/help/how-to-make-a-brat-album-cover-free/'],
];

export const SITEMAP_LASTMOD = {
  '/': '2026-10-05',
  '/video-generator/': '2026-10-05',
  '/brat-meme-generator/': '2026-10-04',
  '/brat-image-generator/': '2026-10-04',
  '/brat-album-cover-generator/': '2026-10-04',
  '/brat-font-generator/': '2026-10-04',
  '/brat-styles/': '2026-10-04',
  '/brat-examples/': '2026-10-04',
  '/help/': '2026-10-04',
  '/help/brat-video-audio-sync-formats/': '2026-10-04',
  '/help/brat-video-export-guide/': '2026-10-04',
  '/help/brat-video-tips/': '2026-10-04',
  '/help/brat-meme-ideas-templates/': '2026-10-04',
  '/help/brat-canvas-size-guide/': '2026-10-04',
  '/help/which-brat-tool-should-you-use/': '2026-10-04',
  '/help/how-to-make-a-brat-album-cover-free/': '2026-10-05',
  '/help/brat-generator-not-working/': '2026-10-05',
  '/about/': '2026-10-04',
  '/contact/': '2026-10-03',
  '/privacy-policy/': '2026-10-03',
  '/cookies/': '2026-10-03',
  '/terms/': '2026-10-03',
};
