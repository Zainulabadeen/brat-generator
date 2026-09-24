import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';

export const metadata: Metadata = {
  title: { absolute: 'Brat Image Generator | Free Brat-Style Image Maker' },
  description: 'Create Brat-style images from a short prompt with custom colours, multiple canvas sizes and free PNG, JPG or WebP downloads in your browser.',
  alternates: { canonical: '/brat-image-generator/' },
  openGraph: {
    type: 'website',
    url: '/brat-image-generator/',
    title: 'Brat Image Generator | Free Brat-Style Image Maker',
    description: 'Create custom Brat-style text images from your prompt with colours, social sizes and instant browser-based downloads.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Image Generator preview' }],
  },
  twitter: { card: 'summary_large_image', title: 'Brat Image Generator', description: 'Create prompt-based Brat-style text images in your browser.', images: ['/og-image.png'] },
};

export default function Page() {
  return <ToolPageShell
    mode="image"
    name="Brat Image Generator"
    slug="brat-image-generator"
    title="Brat Image Generator"
    schemaDescription="Free browser-based Brat image generator that turns a short text prompt into a Brat-style graphic with custom colours, multiple social canvas ratios and PNG, JPG or WebP downloads."
    howTo={[
      ['Enter your text idea', 'Type the word, phrase, mood or short message you want to appear in the design. This tool creates Brat-style text artwork rather than AI-generated photo scenes.'],
      ['Choose your colours', 'Pick the background and text colours before generating so the result already matches the mood you want.'],
      ['Choose the canvas size', 'Use square, 4:5 portrait, 9:16 Story or landscape depending on where you plan to use the image.'],
      ['Generate and export', 'Press Generate Brat Image, check the result, then download PNG, JPG or WebP or copy the PNG.'],
    ]}
    features={[
      ['Simple Text Prompt', 'Turn a short word, phrase, mood or caption into a focused Brat-style text graphic.'],
      ['Custom Colours', 'Choose background and text colours before generation instead of being locked to one green preset.'],
      ['Four Canvas Ratios', 'Create square, 4:5 portrait, 9:16 Story and landscape graphics for different placements.'],
      ['Instant Browser Preview', 'Generate the design locally and check it immediately without waiting for a remote render queue.'],
      ['Copy to Clipboard', 'Copy the finished PNG when your browser supports image clipboard access for faster reuse in other apps.'],
      ['PNG, JPG & WebP Export', 'Choose a lossless or smaller web-friendly format depending on where the graphic will be used.'],
    ]}
    useCases={[
      ['Profile & Feed Images', 'Make Brat-style profile graphics, square posts and visual captions from short phrases.'],
      ['Stories & Wallpapers', 'Use the 9:16 canvas for phone wallpapers, Stories and vertical social graphics.'],
      ['Banners & Quick Graphics', 'Use the landscape canvas for banners, headers, link previews and simple announcement art.'],
    ]}
    tips={[
      'One to four words usually gives the strongest classic Brat-style composition.',
      'Choose high contrast between the text and background so the design still reads at thumbnail size.',
      'Use PNG when text-edge quality matters most; JPG or WebP can be useful when a smaller file is more important.',
    ]}
    faqs={[
      ['Is the Brat Image Generator an AI image generator?', 'No. It is a focused Brat-style graphic generator: your text becomes the main visual on a coloured canvas. It does not create photorealistic scenes from a text prompt.'],
      ['Is the Brat Image Generator free?', 'Yes. You can generate and download images in the browser without creating an account.'],
      ['What sizes are available?', 'The tool includes 1080×1080 square, 1080×1350 portrait, 1080×1920 Story and 1200×630 landscape canvases.'],
      ['What file formats can I download?', 'You can download the generated graphic as PNG, JPG or WebP. PNG is a strong default when you want crisp text.'],
      ['Can I use custom colours?', 'Yes. Choose both the background colour and text colour before you generate the image.'],
      ['Does my text prompt get uploaded to generate the image?', 'The current generator draws the Brat-style graphic in your browser. It does not require a remote AI image service to render the text design.'],
    ]}
    faqIntro="Quick answers about what this image tool creates, the available canvas sizes, colour controls and download formats."
    links={[
      ['Make a Brat Meme', '/brat-meme-generator/'],
      ['Make an Album Cover', '/brat-album-cover-generator/'],
      ['Create Brat Text on the Homepage', '/#generator'],
    ]}
  />;
}
