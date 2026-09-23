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
    description: 'Create custom Brat-style images from your prompt with colours, canvas sizes and instant browser-based downloads.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Image Generator preview' }],
  },
  twitter: { card: 'summary_large_image', title: 'Brat Image Generator', description: 'Create prompt-based Brat-style images in your browser.', images: ['/og-image.png'] },
};

export default function Page() {
  return <ToolPageShell
    mode="image"
    name="Brat Image Generator"
    slug="brat-image-generator"
    title="Brat Image Generator"
    schemaDescription="Free browser-based Brat image generator that turns a short prompt into a Brat-style graphic with custom colours, multiple canvas ratios and image downloads."
    howTo={[
      ['Enter your text', 'Type the word or phrase you want to place on the design. Short text usually gives the cleanest Brat-style result.'],
      ['Choose your colours', 'Pick the background and text colours that fit the Brat-style look you want.'],
      ['Generate the image', 'Press Generate Brat Image to turn the prompt into a clean Brat-style graphic directly in your browser.'],
      ['Choose a size and export', 'Pick the canvas ratio that matches your destination, then download PNG, JPG or WebP.'],
    ]}
    features={[
      ['Prompt-Based Creation', 'Enter a word, phrase, mood or short idea and turn it into a Brat-style graphic.'],
      ['Custom Colours', 'Choose the background and text colours before generating the image.'],
      ['Multiple Canvas Ratios', 'Switch between square, portrait, Story and landscape-style outputs.'],
      ['Instant Local Generation', 'Generate the finished Brat-style image in your browser without uploading your prompt to a server.'],
      ['Simple Prompt Workflow', 'A focused prompt, Generate button and preview keep the tool easy to understand.'],
      ['PNG, JPG & WebP Export', 'Choose the format that best fits social sharing, web use or image quality.'],
    ]}
    useCases={[
      ['Profile & Social Images', 'Make Brat-style profile graphics, square posts and visual captions.'],
      ['Wallpapers & Story Graphics', 'Use portrait or Story ratios for phone wallpapers, Reels and TikTok-style visuals.'],
      ['Quick Custom Graphics', 'Turn short ideas, names, moods and captions into simple shareable Brat-style images.'],
    ]}
    tips={[
      'Keep the prompt short and specific so the generated text remains easy to read.',
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
