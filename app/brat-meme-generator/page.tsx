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
      {
        title: 'Write the setup and punchline',
        body: 'Start with the two text fields before touching the visual controls. The top line should set up the idea; the bottom line should deliver the reaction, contrast or punchline.',
        points: [
          'Keep each line short enough to read without pausing on a phone screen.',
          'Use the top and bottom fields separately instead of forcing the whole joke into one block.',
          'Watch the live preview while you type so you can catch wrapping or crowded text early.',
        ],
        tip: 'If the joke still works after removing two or three words, the shorter version will usually read better as a meme.',
        image: '',
        alt: '',
      },
      {
        title: 'Choose a photo or flat background',
        body: 'Decide whether the meme needs a real image behind the text or whether a simple Brat-style colour is enough. Both options use the same text and export controls.',
        points: [
          'Upload JPG, PNG or WebP when the reaction depends on a specific photo.',
          'Use the background colour picker or preset dots when you want a cleaner text-first meme.',
          'Check that the chosen background leaves enough contrast behind both text areas.',
        ],
        tip: 'A busy photo can be funny, but a flat background often makes a short punchline faster to understand.',
        image: '',
        alt: '',
      },
      {
        title: 'Style the text and effects',
        body: 'Fine-tune the meme after the wording and background are settled. Font, alignment, size, blur and the optional effects all change how quickly the joke can be read.',
        points: [
          'Adjust text size and line height until neither line feels cramped.',
          'Use blur lightly when you want the Brat look without sacrificing readability.',
          'Try Lo-fi Photo, Mirror or White Block only when the effect supports the joke instead of distracting from it.',
        ],
        tip: 'Preview the meme at roughly phone size before exporting; readable desktop text can still feel too small on social feeds.',
        image: '',
        alt: '',
      },
      {
        title: 'Pick the canvas and export',
        body: 'Finish by matching the canvas to where the meme will be posted, then choose the image format that fits your next step.',
        points: [
          'Use square for general posts, 4:5 for portrait feeds, 9:16 for Stories, or landscape for wider placements.',
          'Choose PNG when you want crisp text, or JPG/WebP when a smaller file is more useful.',
          'Use Copy Image when you want to paste the finished PNG straight into another supported app.',
        ],
        tip: 'Leave a little breathing room near the edges because some social apps crop previews differently.',
        image: '',
        alt: '',
      },
    ]}
    guideDetails={[
      {
        eyebrow: 'Backgrounds',
        title: 'Photo and Colour Setup',
        body: 'The meme tool can work as either a photo meme editor or a simple coloured Brat card, so the first visual decision is whether the background carries meaning or simply supports the words.',
        points: [
          'Use a photo when the expression, object or scene is part of the joke.',
          'Use a flat colour when the wording itself is the main idea.',
          'Change text colour when bright or dark areas make either caption hard to read.',
        ],
        note: 'Uploaded images are rendered in the browser as part of the meme canvas.',
      },
      {
        eyebrow: 'Readability',
        title: 'Text, Blur and Effects',
        body: 'Brat-inspired styling works best when the effect is visible but the joke is still instantly readable. Small changes to size, line height and blur usually matter more than stacking every effect.',
        points: [
          'Keep strong contrast between caption and background.',
          'Use alignment to keep the captions away from important faces or objects.',
          'Treat Lo-fi, Mirror and White Block as optional accents rather than required settings.',
        ],
      },
      {
        eyebrow: 'Output',
        title: 'Social Sizes and Export',
        body: 'The same meme can be prepared for different placements without rebuilding it from scratch. Switch the canvas size, re-check the preview and then export the version you need.',
        points: [
          'Square works well for general feeds and messaging.',
          'Portrait and Story sizes make better use of vertical phone screens.',
          'PNG, JPG and WebP let you balance text sharpness against file size.',
        ],
      },
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
