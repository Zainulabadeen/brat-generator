import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';

export const metadata: Metadata = {
  title: { absolute: 'Brat Font Generator | Free Brat-Style Text Maker' },
  description: 'Create Brat-style typography with font choices, blur, size, spacing, alignment, colours and transparent PNG export. Free and browser-based.',
  alternates: { canonical: '/brat-font-generator/' },
  openGraph: {
    type: 'website',
    url: '/brat-font-generator/',
    title: 'Brat Font Generator | Free Brat-Style Text Maker',
    description: 'Create Brat-style typography with font, blur, colour, spacing and transparent export controls.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Font Generator preview' }],
  },
  twitter: { card: 'summary_large_image', title: 'Brat Font Generator', description: 'Create Brat-style typography and transparent text graphics.', images: ['/og-image.png'] },
};

export default function Page() {
  return <ToolPageShell
    mode="font"
    name="Brat Font Generator"
    slug="brat-font-generator"
    title="Brat Font Generator"
    schemaDescription="Free browser-based Brat font-style image generator with font choices, size, spacing, alignment, blur, colours, transparent background and image export."
    howTo={[
      ['Type your words', 'Enter the word, name or phrase you want to turn into a Brat-style typography graphic.'],
      ['Choose a font style', 'Try the available condensed and bold system-font options and pick the closest visual fit.'],
      ['Fine-tune the text', 'Adjust size, spacing, blur, line height, alignment and colour until the text stays readable.'],
      ['Export the graphic', 'Use a solid background or transparent background and download the finished text image.'],
    ]}
    features={[
      ['Condensed Typography', 'Use narrow font options as a practical starting point for the familiar Brat-style look.'],
      ['Size & Spacing Controls', 'Adjust text scale, letter spacing and line height instead of relying on a fixed preset.'],
      ['Blur Control', 'Add a light soft-focus effect while keeping the wording readable.'],
      ['Alignment Options', 'Place text left, centre or right depending on the graphic you are building.'],
      ['Transparent Background', 'Create a text graphic that can be placed over another image or design.'],
      ['Image Export', 'Download the rendered typography as a reusable graphic rather than a font file.'],
    ]}
    useCases={[
      ['Text Overlays', 'Create transparent Brat-style lettering to place over another design or photo.'],
      ['Titles & Captions', 'Make short display text for social posts, covers and profile graphics.'],
      ['Style Testing', 'Compare font weight, blur and spacing before using the look in a larger composition.'],
    ]}
    tips={[
      'Arial Narrow is a useful practical starting point in this tool; the visual treatment matters as much as the font.',
      'Use only a little blur so the text keeps its shape at small sizes.',
      'Choose transparent PNG when you want to place the text over another design.',
    ]}
    links={[
      ['See Brat Styles', '/brat-styles/'],
      ['Create Brat Text on the Homepage', '/#generator'],
      ['Try the Brat Image Generator', '/brat-image-generator/'],
    ]}
  />;
}
