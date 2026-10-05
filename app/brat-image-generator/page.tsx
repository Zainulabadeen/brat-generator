import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import { CREATIVE_CANVAS_SIZE_SUMMARY } from '@/lib/toolCapabilities';

export const metadata: Metadata = {
  title: { absolute: 'Brat Image Generator | Free Brat-Style Image Maker' },
  description: 'Create text-led Brat-style graphics with custom colours, optional background images, simple effects, five canvas sizes and PNG, JPG or WebP export.',
  alternates: { canonical: '/brat-image-generator/' },
  openGraph: {
    type: 'website',
    url: '/brat-image-generator/',
    title: 'Brat Image Generator | Free Brat-Style Image Maker',
    description: 'Create text-led Brat graphics with colours, optional background images, simple effects and social-ready canvas sizes.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Image Generator preview' }],
  },
  twitter: { card: 'summary_large_image', title: 'Brat Image Generator', description: 'Create text-led Brat-style graphics in your browser.', images: ['/og-image.png'] },
};

export default function Page() {
  return <ToolPageShell
    mode="image"
    name="Brat Image Generator"
    slug="brat-image-generator"
    title="Brat Image Generator"
    description="Create a text-led Brat-style graphic with custom colours, an optional background image, simple effects and social-ready canvas sizes. Your text becomes the artwork; this tool does not generate AI scenes or photos."
    schemaDescription="Free browser-based Brat image generator for text-led graphics with custom colours, optional background image upload, font and blur controls, simple effects, five canvas sizes and PNG, JPG or WebP export."
    howTo={[
      {
        title: 'Enter the text you want to show',
        body: 'Type the exact word, phrase or short message that should appear in the artwork. This is a text-led design tool, not an AI scene generator.',
        points: [
          'A single word or short phrase gives the strongest compact composition.',
          'Longer captions can work, but they may need more canvas space or smaller type.',
          'Write the wording exactly as you want it before styling the image.',
        ],
        tip: 'Start short. It is easier to add another word later than to rescue a crowded layout.',
        image: '',
        alt: '',
      },
      {
        title: 'Choose the colours or add a background image',
        body: 'Set the background and text colours, or upload a JPG, PNG or WebP image when the graphic needs a photo or texture behind the words.',
        points: [
          'Use a flat colour when the wording should remain the main visual.',
          'Upload a background image when the photo adds useful context.',
          'Keep enough contrast between the text and the busiest part of the background.',
        ],
        tip: 'If the text disappears into the image, fix the contrast before adding more effects.',
        image: '',
        alt: '',
      },
      {
        title: 'Set the canvas and visual treatment',
        body: 'Choose the final aspect ratio, then use the font, blur and optional effects only where they improve the design.',
        points: [
          `The tool includes ${CREATIVE_CANVAS_SIZE_SUMMARY}.`,
          'Use blur lightly so the text still reads at thumbnail size.',
          'Lo-fi Photo, Mirror Text and White Block are optional accents rather than required settings.',
        ],
        tip: 'Choose the destination first. That avoids cropping a finished design into the wrong shape later.',
        image: '',
        alt: '',
      },
      {
        title: 'Create, review and export',
        body: 'Press Create Brat Image to render the design. Check the result, then download it or copy the PNG when everything reads clearly.',
        points: [
          'Use PNG when text quality is the priority.',
          'Use JPG or WebP when a smaller web-friendly file is more useful.',
          'Use Copy Image to paste the finished PNG into another supported app.',
        ],
        tip: 'Do one final phone-size check before export; small-screen readability catches problems quickly.',
        image: '',
        alt: '',
      },
    ]}
    guideDetails={[
      {
        eyebrow: 'Input',
        title: 'Text-Led, Not AI Scene Generation',
        body: 'The text field is the wording of the artwork itself. It is not a prompt for a model to invent a person, place or photorealistic scene.',
        points: [
          'Names, short captions, moods and one-line statements work well.',
          'The result is drawn locally in the browser.',
          'Add your own background image when the graphic needs a photo rather than asking the tool to invent one.',
        ],
        note: 'No remote AI image service is required to render the text-led design.',
      },
      {
        eyebrow: 'Composition',
        title: 'Background, Font and Effects',
        body: 'Start with contrast, then add styling. The visual effects should support the wording rather than make it harder to read.',
        points: [
          'Flat colour is the quickest route to a minimal Brat-style graphic.',
          'Uploaded images work best when they leave a calm area behind the text.',
          'Blur, Lo-fi Photo, Mirror Text and White Block are there for specific variations, not because every design needs them.',
        ],
      },
      {
        eyebrow: 'Output',
        title: 'Five Canvas Sizes and Export',
        body: 'Choose the canvas before generating the final version so the design is already built for its destination.',
        points: [
          `Available presets: ${CREATIVE_CANVAS_SIZE_SUMMARY}.`,
          'PNG is a strong default for text-heavy graphics.',
          'JPG and WebP can reduce file size for web use.',
        ],
      },
    ]}
    features={[
      ['Text-Led Image Creation', 'Turn a word, phrase or short caption into a Brat-style graphic without pretending to generate an AI scene.'],
      ['Optional Background Image', 'Upload your own JPG, PNG or WebP photo or texture when a flat colour is not enough.'],
      ['Font, Colour & Blur Controls', 'Choose the typeface, text and background colours, then adjust blur while watching the result.'],
      ['Simple Visual Effects', 'Use Lo-fi Photo, Mirror Text or White Block when the effect supports the idea.'],
      ['Five Canvas Sizes', `Create ${CREATIVE_CANVAS_SIZE_SUMMARY} graphics.`],
      ['PNG, JPG & WebP Export', 'Download the finished image or copy a PNG directly to the clipboard.'],
    ]}
    useCases={[
      ['Profile & Feed Graphics', 'Make text-led profile graphics, square posts and visual captions from short phrases.'],
      ['Stories, Wallpapers & Wide Posts', 'Use the vertical or 16:9 presets for phone screens, Stories, wallpapers and wider social graphics.'],
      ['Photo-Backed Text Graphics', 'Upload a photo or texture when the words need a visual background but the layout should stay simple.'],
    ]}
    tips={[
      'One to four words usually gives the strongest compact composition.',
      'Fix contrast before adding blur or effects; readable text matters more than decoration.',
      'Use PNG for crisp text, and JPG or WebP when smaller file size matters more.',
    ]}
    faqs={[
      ['Is the Brat Image Generator an AI image generator?', 'No. It creates text-led Brat-style graphics in the browser. It does not invent photorealistic scenes or people from a prompt.'],
      ['Can I upload my own background image?', 'Yes. You can use a JPG, PNG or WebP image as the background, then add your text and styling over it.'],
      ['What sizes are available?', `The tool includes ${CREATIVE_CANVAS_SIZE_SUMMARY}.`],
      ['Which visual controls are available?', 'You can choose the background and text colours, font, blur and canvas size, plus optional Lo-fi Photo, Mirror Text and White Block effects.'],
      ['What file formats can I download?', 'You can download PNG, JPG or WebP. PNG is a strong default for text-heavy graphics.'],
      ['Does my text get uploaded to create the image?', 'The tool draws the graphic in your browser. It does not need a remote AI image service to render the design.'],
    ]}
    faqIntro="Quick answers about what the image tool creates, background uploads, effects, sizes and export."
  />;
}
