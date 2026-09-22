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
    schemaDescription="Free browser-based Brat meme generator with photo upload, top and bottom text, colour controls, blur, lo-fi effects and image export."
    howTo={[
      ['Write the meme text', 'Add a short setup on top and a clear punchline on the bottom so the meme stays easy to read.'],
      ['Choose the background', 'Upload a JPG, PNG or WebP photo from your device, or keep a flat Brat-style colour background.'],
      ['Style the meme', 'Adjust text colour, font, blur and optional lo-fi, mirror or white-block effects while watching the live preview.'],
      ['Download or copy', 'Export the finished meme as an image or copy the PNG to your clipboard for chats and social posts.'],
    ]}
    features={[
      ['Photo Upload', 'Use your own image as the meme background without needing a separate editor.'],
      ['Top & Bottom Text', 'Keep the classic meme structure with separate setup and punchline fields.'],
      ['Brat-Style Effects', 'Combine colour presets, blur, lo-fi treatment, mirror and white-block effects.'],
      ['Live Preview', 'See text and visual changes immediately before downloading.'],
      ['Browser Processing', 'Uploaded images are handled in the browser for the current editing workflow.'],
      ['No-Watermark Export', 'Save the finished meme without an added Brat Generator watermark.'],
    ]}
    useCases={[
      ['Reaction Memes', 'Turn a photo and short punchline into a quick reaction image for chats or social feeds.'],
      ['Music & Pop-Culture Posts', 'Create Brat-inspired jokes and references while keeping your own wording and image.'],
      ['Social Media Graphics', 'Make square meme graphics for Instagram, X, Discord and messaging apps.'],
    ]}
    tips={[
      'Use a short setup on top and a stronger punchline on the bottom.',
      'The lo-fi effect works best when the original photo still has enough contrast.',
      'Keep important text away from the edges so social apps do not crop it.',
    ]}
    links={[
      ['Create a Brat Image', '/brat-image-generator/'],
      ['Create Brat Text on the Homepage', '/#generator'],
      ['Explore Brat Styles', '/brat-styles/'],
    ]}
  />;
}
