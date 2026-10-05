export type HelpArticle = {
  slug: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  readTime: string;
  published: string;
  modified: string;
  accent: 'green' | 'pink' | 'blue' | 'purple';
};

export const helpArticles: HelpArticle[] = [
  {
    slug: 'brat-video-audio-sync-formats',
    href: '/help/brat-video-audio-sync-formats/',
    eyebrow: 'Video Audio Guide',
    title: 'Brat Video Audio Sync & Supported Formats',
    description: 'Learn how audio timing works in the Brat Video Generator, which file formats are safest, how to trim audio, and what to try when browser decoding or sync goes wrong.',
    image: '/images/help/video-audio-sync.webp',
    imageAlt: 'Brat Video Generator audio waveform with MP3, WAV and M4A format labels',
    readTime: '7 min read',
    published: '3 October 2026',
    modified: '3 October 2026',
    accent: 'green',
  },
  {
    slug: 'how-to-make-a-brat-album-cover-free',
    href: '/help/how-to-make-a-brat-album-cover-free/',
    eyebrow: 'Album Cover Guide',
    title: 'How to Make a Brat Album Cover Free',
    description: 'Learn the Brat-inspired colour, typography, blur, sizing, and four-step workflow for creating an album cover in your browser.',
    image: '/images/help/album-cover-guide.webp',
    imageAlt: 'Three Brat-inspired album cover examples in green, black, and pink',
    readTime: '6 min read',
    published: '18 July 2026',
    modified: '5 October 2026',
    accent: 'green',
  },
  {
    slug: 'brat-generator-not-working',
    href: '/help/brat-generator-not-working/',
    eyebrow: 'Troubleshooting',
    title: 'Brat Generator Not Working? Common Problems & Quick Fixes',
    description: 'Fix download issues, excessive blur, clipped text, colour differences, and confusing mobile download locations with a simple checklist.',
    image: '/images/help/troubleshooting-guide.webp',
    imageAlt: 'Brat Generator troubleshooting checklist with browser and warning graphics',
    readTime: '5 min read',
    published: '7 September 2026',
    modified: '5 October 2026',
    accent: 'blue',
  },
  {
    slug: 'brat-video-export-guide',
    href: '/help/brat-video-export-guide/',
    eyebrow: 'Video Guide',
    title: 'Brat Video Export Guide: Video vs GIF vs PNG Frames',
    description: 'Understand the three export choices in the Brat Video Generator and choose the right format for sharing, looping, or editing.',
    image: '/images/help/video-export-guide.webp',
    imageAlt: 'Video, GIF, and PNG frame export cards for the Brat Video Generator',
    readTime: '8 min read',
    published: '2 October 2026',
    modified: '4 October 2026',
    accent: 'purple',
  },
  {
    slug: 'brat-video-tips',
    href: '/help/brat-video-tips/',
    eyebrow: 'Video Tips',
    title: 'Brat Video Tips: Text Length, Timing, FPS & Better Motion',
    description: 'Make cleaner Brat-style videos with practical guidance for line length, previewing, audio, frame rate, and browser-friendly exports.',
    image: '/images/help/video-tips.webp',
    imageAlt: 'Brat-style video preview with frame-rate and timing controls',
    readTime: '7 min read',
    published: '2 October 2026',
    modified: '4 October 2026',
    accent: 'green',
  },
  {
    slug: 'brat-meme-ideas-templates',
    href: '/help/brat-meme-ideas-templates/',
    eyebrow: 'Meme Ideas',
    title: 'Brat Meme Ideas & Templates You Can Create',
    description: 'Use original Brat-style meme formats for reactions, POVs, before-and-after jokes, mood posts, and other short-form ideas.',
    image: '/images/help/meme-ideas-templates.webp',
    imageAlt: 'Grid of colourful Brat-style meme idea cards',
    readTime: '8 min read',
    published: '2 October 2026',
    modified: '4 October 2026',
    accent: 'pink',
  },
  {
    slug: 'which-brat-tool-should-you-use',
    href: '/help/which-brat-tool-should-you-use/',
    eyebrow: 'Tool Guide',
    title: 'Which Brat Generator Tool Should You Use?',
    description: 'Compare the text, font, meme, image, video, and album-cover tools so you can start with the workflow that matches your project.',
    image: '/images/help/which-brat-tool.webp',
    imageAlt: 'Cards representing the Brat text, font, meme, image, video, and album-cover tools',
    readTime: '6 min read',
    published: '2 October 2026',
    modified: '4 October 2026',
    accent: 'blue',
  },
  {
    slug: 'brat-canvas-size-guide',
    href: '/help/brat-canvas-size-guide/',
    eyebrow: 'Size Guide',
    title: 'Brat Canvas Size Guide: Square vs Portrait vs Story vs Wide',
    description: 'Choose the right canvas ratio for covers, feed posts, vertical stories, banners, and other Brat-style graphics without stretching the design.',
    image: '/images/help/canvas-size-guide.webp',
    imageAlt: 'Square, portrait, story, and wide Brat canvas size examples',
    readTime: '7 min read',
    published: '2 October 2026',
    modified: '4 October 2026',
    accent: 'green',
  },
];

export function getHelpArticle(slug: string) {
  return helpArticles.find((article) => article.slug === slug);
}
