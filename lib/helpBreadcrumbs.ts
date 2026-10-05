import { siteConfig } from '@/lib/site';

type HelpBreadcrumbConfig = {
  currentLabel: string;
  parent?: {
    label: string;
    href: string;
  };
};

/*
 * Visible breadcrumbs follow the actual Help hierarchy and end on the current
 * article. The current article is intentionally not linked because the visitor
 * is already on that page. A related tool is included only when it is a useful,
 * truthful parent context for the guide.
 */
const helpBreadcrumbMap: Record<string, HelpBreadcrumbConfig> = {
  'brat-video-audio-sync-formats': { parent: { label: 'Brat Video Generator', href: '/video-generator/' }, currentLabel: 'Audio Sync & Formats' },
  'how-to-make-a-brat-album-cover-free': {
    parent: { label: 'Brat Album Cover Generator', href: '/brat-album-cover-generator/' },
    currentLabel: 'Album Cover Guide',
  },
  'brat-generator-not-working': {
    parent: { label: 'Brat Generator', href: '/' },
    currentLabel: 'Troubleshooting',
  },
  'brat-video-export-guide': {
    parent: { label: 'Brat Video Generator', href: '/video-generator/' },
    currentLabel: 'Video Export Guide',
  },
  'brat-video-tips': {
    parent: { label: 'Brat Video Generator', href: '/video-generator/' },
    currentLabel: 'Video Tips',
  },
  'brat-meme-ideas-templates': {
    parent: { label: 'Brat Meme Generator', href: '/brat-meme-generator/' },
    currentLabel: 'Meme Ideas & Templates',
  },
  'which-brat-tool-should-you-use': {
    currentLabel: 'Tool Selection Guide',
  },
  'brat-canvas-size-guide': {
    parent: { label: 'Brat Image Generator', href: '/brat-image-generator/' },
    currentLabel: 'Canvas Size Guide',
  },
};

export function getHelpBreadcrumbUi(slug: string) {
  const config = helpBreadcrumbMap[slug];
  if (!config) {
    return [
      { label: 'Home', href: '/' },
      { label: 'Help', href: '/help/' },
    ];
  }

  return [
    { label: 'Home', href: '/' },
    { label: 'Help', href: '/help/' },
    ...(config.parent ? [{ label: config.parent.label, href: config.parent.href }] : []),
    { label: config.currentLabel },
  ];
}

export function getHelpBreadcrumbSchema(slug: string, canonical: string) {
  const config = helpBreadcrumbMap[slug];
  if (!config) {
    return [
      { name: 'Home', url: `${siteConfig.url}/` },
      { name: 'Help', url: `${siteConfig.url}/help/` },
      { name: 'Help article', url: canonical },
    ];
  }

  return [
    { name: 'Home', url: `${siteConfig.url}/` },
    { name: 'Help', url: `${siteConfig.url}/help/` },
    ...(config.parent
      ? [{ name: config.parent.label, url: `${siteConfig.url}${config.parent.href}` }]
      : []),
    { name: config.currentLabel, url: canonical },
  ];
}
