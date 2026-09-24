import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';

export const metadata: Metadata = {
  title: { absolute: 'Brat Meme Generator | Free Brat-Style Meme Maker' },
  description: 'Create Brat-style memes with your own photo, top and bottom text, colour controls, blur, lo-fi effects and free no-watermark downloads.',
  alternates: { canonical: '/brat-meme-generator/' },
  openGraph: {
    type: 'website',
    url: '/brat-meme-generator/',
    title: 'Brat Meme Generator | Free Brat-Style Meme Maker',
    description: 'Make Brat-style memes with photo upload, punchline text, effects and instant browser-based image export.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Meme Generator preview' }],
  },
  twitter: { card: 'summary_large_image', title: 'Brat Meme Generator', description: 'Create free Brat-style memes with photos, text and effects.', images: ['/og-image.png'] },
};

export default function Page() {
  return <ToolPageShell
    mode="meme"
    name="Brat Meme Generator"
    slug="brat-meme-generator"
    title="Brat Meme Generator"
    schemaDescription="Free browser-based Brat meme generator with photo upload, top and bottom text, colour controls, blur, lo-fi effects, social-ready canvas sizes and image export."
    howTo={[
      ['Write the meme text', 'Add a short setup on top and a clear punchline on the bottom. Shorter wording is easier to read when the meme is viewed on a phone.'],
      ['Choose the background', 'Upload a JPG, PNG or WebP photo from your device, or keep a flat Brat-style colour background.'],
      ['Style the meme', 'Adjust colour, font, text size and blur, then try lo-fi, mirror or white-block effects while watching the live preview.'],
      ['Choose a size and export', 'Pick a social-ready canvas size, then download PNG, JPG or WebP or copy the PNG to your clipboard.'],
    ]}
    features={[
      ['Photo Upload', 'Use your own JPG, PNG or WebP image as the background without opening a separate photo editor.'],
      ['Top & Bottom Text', 'Keep setup and punchline text separate so the classic meme structure stays quick to edit.'],
      ['Live Preview', 'See text, colour and effect changes immediately before you download the final meme.'],
      ['Brat-Style Effects', 'Combine blur, lo-fi photo treatment, mirror and white-block options for different meme looks.'],
      ['Social-Ready Sizes', 'Create square, 4:5 portrait, 9:16 Story or landscape graphics from the same meme workflow.'],
      ['PNG, JPG & WebP Export', 'Download in a practical image format or copy a PNG directly to the clipboard with no added watermark.'],
    ]}
    useCases={[
      ['Reaction Memes', 'Turn a photo and short punchline into a fast reaction image for chats, comments or social feeds.'],
      ['Music & Pop-Culture Posts', 'Create Brat-inspired jokes, lyric reactions and references while keeping your own wording and image.'],
      ['Social Media Graphics', 'Make square posts, portrait feed graphics, Stories and landscape meme images without rebuilding the design.'],
    ]}
    tips={[
      'Use a short setup on top and let the bottom line carry the strongest punchline.',
      'Choose a text colour that stays readable over the brightest and darkest parts of your photo.',
      'Keep important words away from the edges so social apps have room to crop the image.',
    ]}
    faqs={[
      ['Is the Brat Meme Generator free?', 'Yes. You can create and export memes in the browser without creating an account, and the tool does not add a Brat Generator watermark to the image.'],
      ['Can I upload my own photo?', 'Yes. The meme tool accepts JPG, PNG and WebP background images from your device. You can also skip the upload and use a flat colour background.'],
      ['What image sizes can I make?', 'You can switch between square 1080×1080, portrait 1080×1350, Story 1080×1920 and landscape 1200×630 canvases.'],
      ['Which download formats are available?', 'The meme can be downloaded as PNG, JPG or WebP. You can also copy a PNG to the clipboard when your browser supports clipboard image writing.'],
      ['Do uploaded photos leave my browser?', 'The current meme editing workflow loads and renders the selected photo in your browser. The tool does not need to upload that image to a server just to build the canvas.'],
      ['What makes a Brat meme easier to read?', 'Keep the wording short, use strong contrast between text and background, and preview the meme at a smaller size before exporting.'],
    ]}
    faqIntro="Answers about photo uploads, social sizes, export formats and the quickest way to keep Brat-style memes readable."
    links={[
      ['Create a Brat Image', '/brat-image-generator/'],
      ['Create Brat Text on the Homepage', '/#generator'],
      ['Explore Brat Styles', '/brat-styles/'],
    ]}
  />;
}
