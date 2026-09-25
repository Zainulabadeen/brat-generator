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
      {
        title: 'Enter the text idea',
        body: 'Describe the Brat-style graphic with the exact word, phrase, mood or short message you want to appear on the finished image. This tool draws a text-led graphic rather than inventing a photorealistic scene.',
        points: [
          'Use a single word or short phrase for the strongest classic composition.',
          'Longer captions can work, but check the preview for wrapping and smaller text.',
          'Write the wording exactly as you want it before choosing colours and size.',
        ],
        tip: 'Start with the shortest version of your phrase; you can always add more words after you see how the first layout feels.',
        image: '',
        alt: '',
      },
      {
        title: 'Choose background and text colours',
        body: 'Set the colour pair before generating so the preview begins with the contrast and mood you want instead of forcing you to fix readability later.',
        points: [
          'Use the background picker for Brat green, black, white, pink, blue or any custom colour.',
          'Choose a text colour that remains visible at thumbnail size.',
          'Dark-on-light and light-on-dark combinations are the safest starting point for readability.',
        ],
        tip: 'If you have to stare at the text to read it, increase the contrast before generating the final version.',
        image: '',
        alt: '',
      },
      {
        title: 'Pick the canvas size',
        body: 'Match the canvas to where the image will actually be used. The same phrase can feel very different on a square post, portrait feed card, Story or landscape banner.',
        points: [
          'Square 1080×1080 is a flexible all-purpose social format.',
          'Portrait 1080×1350 uses more vertical feed space.',
          'Story 1080×1920 fills a phone screen, while 1200×630 works for wider banners and previews.',
        ],
        tip: 'Choose the final destination first, then generate; this avoids cropping a finished design into the wrong shape later.',
        image: '',
        alt: '',
      },
      {
        title: 'Generate, review and export',
        body: 'Press Generate Brat Image to render the design, inspect the result, then download or copy it once the wording, colours and canvas all look right.',
        points: [
          'Use PNG when crisp text edges are the priority.',
          'Use JPG or WebP when you want a smaller web-friendly file.',
          'Use Copy Image to paste the generated PNG directly into another supported app.',
        ],
        tip: 'Do one final thumbnail-size check before downloading; a design that works small usually works well almost everywhere else too.',
        image: '',
        alt: '',
      },
    ]}
    guideDetails={[
      {
        eyebrow: 'Input',
        title: 'What the Prompt Actually Controls',
        body: 'The prompt field is the wording of the artwork itself. It is not an AI scene description, so the best input is the exact phrase you want people to see.',
        points: [
          'Short phrases create the clearest text-led layouts.',
          'Mood words, names, captions and one-line statements all work well.',
          'If the phrase is long, expect the text to scale down to fit the canvas.',
        ],
        note: 'The graphic is rendered in the browser; no remote image-generation service is needed for the text design.',
      },
      {
        eyebrow: 'Composition',
        title: 'Colour and Canvas Choices',
        body: 'Colour sets the mood while canvas shape decides how much room the text has. Choose both together instead of treating the canvas as an afterthought.',
        points: [
          'Bright backgrounds create the strongest Brat-style impact.',
          'High-contrast text stays readable on small screens.',
          'Vertical canvases need more breathing room above and below the main phrase than square graphics do.',
        ],
      },
      {
        eyebrow: 'Reuse',
        title: 'Download and Copy Options',
        body: 'Once the design is generated, you can keep the high-quality version for later or copy it directly into another workflow without recreating it.',
        points: [
          'PNG is a strong default for text-heavy graphics.',
          'JPG and WebP can reduce file size for web use.',
          'Copy Image is useful for chats, documents and editors that accept pasted images.',
        ],
      },
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
