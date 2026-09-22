import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';

export const metadata: Metadata = {
  title: { absolute: 'Brat Image Generator | Free Brat-Style Image Maker' },
  description: 'Create Brat-style images with custom text, uploaded backgrounds, colour presets, blur, effects, multiple canvas sizes and free downloads.',
  alternates: { canonical: '/brat-image-generator/' },
  openGraph: {
    type: 'website',
    url: '/brat-image-generator/',
    title: 'Brat Image Generator | Free Brat-Style Image Maker',
    description: 'Create custom Brat-style images with text, backgrounds, effects and multiple export sizes.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Image Generator preview' }],
  },
  twitter: { card: 'summary_large_image', title: 'Brat Image Generator', description: 'Create custom Brat-style images in your browser.', images: ['/og-image.png'] },
};

export default function Page() {
  return <ToolPageShell
    mode="image"
    name="Brat Image Generator"
    slug="brat-image-generator"
    title="Brat Image Generator"
    schemaDescription="Free browser-based Brat image generator with text, background upload, colour presets, blur, effects, stickers, multiple ratios and image downloads."
    howTo={[
      ['Enter your text', 'Type the word or phrase you want to place on the design. Short text usually gives the cleanest Brat-style result.'],
      ['Choose a background', 'Use a flat colour or upload a JPG, PNG or WebP image from your device.'],
      ['Add the Brat treatment', 'Adjust font, colour, blur, alignment, mirror, white block and optional sticker settings.'],
      ['Choose a size and export', 'Pick the canvas ratio that matches your destination, then download PNG, JPG or WebP.'],
    ]}
    features={[
      ['Custom Text', 'Create a personalised Brat-style image with your own word, phrase or caption.'],
      ['Image Background Upload', 'Use a photo from your device instead of a flat colour background.'],
      ['Multiple Canvas Ratios', 'Switch between square, portrait, Story and landscape-style outputs.'],
      ['Colour & Blur Controls', 'Fine-tune the background, text colour and signature soft-focus treatment.'],
      ['Creative Effects', 'Add optional mirror, white-block and sticker effects when they fit the design.'],
      ['PNG, JPG & WebP Export', 'Choose the format that best fits social sharing, web use or image quality.'],
    ]}
    useCases={[
      ['Profile & Social Images', 'Make Brat-style profile graphics, square posts and visual captions.'],
      ['Wallpapers & Story Graphics', 'Use portrait or Story ratios for phone wallpapers, Reels and TikTok-style visuals.'],
      ['Photo-Based Brat Designs', 'Apply Brat-style text and effects over your own photo without opening a full design suite.'],
    ]}
    tips={[
      'Use a simple photo with enough empty space behind the main text.',
      'Keep text away from the edge on Story and portrait sizes.',
      'PNG is a strong default when you want cleaner text edges.',
    ]}
    links={[
      ['Make a Brat Meme', '/brat-meme-generator/'],
      ['Make an Album Cover', '/brat-album-cover-generator/'],
      ['Create Brat Text on the Homepage', '/#generator'],
    ]}
  />;
}
