import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import { CREATIVE_CANVAS_SIZE_SUMMARY } from '@/lib/toolCapabilities';

export const metadata: Metadata = {
  title: { absolute: 'Brat Font Generator | Free Brat-Style Text Maker' },
  description: 'Create Brat-style typography with font, letter spacing, line height, blur, alignment, colour and transparent PNG controls in your browser.',
  alternates: { canonical: '/brat-font-generator/' },
  openGraph: {
    type: 'website', url: '/brat-font-generator/', title: 'Brat Font Generator | Free Brat-Style Text Maker',
    description: 'Make Brat-style typography with spacing, line height, blur, colours, alignment and transparent PNG export.',
    images: [{ url: '/images/og/brat-font-generator.webp', width: 1200, height: 630, alt: 'Brat Font Generator typography preview' }],
  },
  twitter: { card: 'summary_large_image', title: 'Brat Font Generator', description: 'Create Brat-style typography free in your browser.', images: ['/images/og/brat-font-generator.webp'] },
};

export default function Page() {
  return <ToolPageShell
    mode="font"
    name="Brat Font Generator"
    slug="brat-font-generator"
    title="Brat Font Generator"
    description="Create Brat-style typography with font, letter spacing, line height, blur, alignment and colour controls, then export it on a solid background or as a transparent PNG."
    schemaDescription="Free browser-based Brat font generator with live typography preview, font choices, letter spacing, line height, blur, alignment, colour controls, transparent background and PNG, JPG or WebP export."
    howTo={[
      { title:'Enter the text you want to style', body:'Type the exact word, phrase or short line you want to turn into a Brat-style type graphic. The preview updates while you edit.', points:['Short wording is easiest to keep bold and readable.','Use the case you want to see in the final graphic.','Watch the live preview so wrapping or crowding is obvious before export.'], tip:'Start with the shortest version of the phrase. Add extra context outside the image when the graphic does not need to carry every word.', image:'', alt:'' },
      { title:'Set the font, spacing and alignment', body:'Choose a typeface, then adjust letter spacing, line height and alignment until the word shape feels balanced.', points:['Arial Narrow is a useful condensed starting point when it is available on your device.','Use letter spacing to tighten or open the characters instead of forcing a different font size.','Line height matters most when the text wraps onto more than one line.'], tip:'Change one typography control at a time so you can see which adjustment actually improves the composition.', image:'', alt:'' },
      { title:'Choose colour, blur and background', body:'Set the text and background colours, then add only enough blur to soften the edges without making the lettering hard to read.', points:['Lime with dark text is the classic starting direction.','Black, white, pink, blue and custom colours can use the same typography treatment.','Turn on Transparent Background when the type will be placed over another design later.'], tip:'If the phrase becomes hard to read at thumbnail size, reduce blur before shrinking the text.', image:'', alt:'' },
      { title:'Choose a canvas and export', body:'Pick the canvas that matches the final placement, then choose the file format you need.', points:[`The available presets are ${CREATIVE_CANVAS_SIZE_SUMMARY}.`,'Use PNG when you need a transparent background. JPG always exports with a solid background.','Use Copy Image when you want to paste the PNG into another supported app.'], tip:'Keep a PNG master if the typography will be reused in other layouts.', image:'', alt:'' },
    ]}
    guideDetails={[
      { eyebrow:'Typography', title:'Font, Letter Spacing and Alignment', body:'The look depends on the whole treatment, not one magic font. Start with a condensed face, then use spacing and alignment to shape the word without losing readability.', points:['Negative or small spacing keeps short words compact.','Wider spacing can help a very short phrase breathe, but large gaps can make the letters feel disconnected.','Font rendering can vary slightly between devices when a selected system font is unavailable.'] },
      { eyebrow:'Effects', title:'Blur Without Losing Readability', body:'Blur works best as a small finishing adjustment. The text should still be readable on a phone and at thumbnail size.', points:['Start near zero and increase gradually.','Check the preview at a smaller size before export.','Increase text/background contrast before adding more blur.'] },
      { eyebrow:'Export', title:'Transparent and Social-Ready Output', body:'Transparent PNG is useful when the type needs to sit over a photo, poster or video. Solid backgrounds work better for a finished standalone card.', points:['PNG preserves transparency.','JPG does not preserve transparency and will use a solid background.','Choose the canvas ratio before exporting instead of stretching the image afterward.'] },
    ]}
    features={[
      ['Live Typography Preview','See font, letter spacing, line height, alignment, blur and colour changes immediately.'],
      ['Multiple Font Choices','Compare condensed, bold, serif, mono and clean system typefaces without leaving the tool.'],
      ['Letter Spacing & Line Height','Adjust character spacing and multi-line readability directly in the exported result.'],
      ['Transparent Background','Export the lettering without a solid background when you need a reusable overlay.'],
      ['Five Canvas Sizes',`Create ${CREATIVE_CANVAS_SIZE_SUMMARY} typography graphics.`],
      ['PNG, JPG & WebP Export','Download the finished type graphic or copy a PNG directly to the clipboard.'],
    ]}
    useCases={[
      ['Poster & Cover Titles','Create a Brat-style title treatment to reuse in posters, playlists and cover graphics.'],
      ['Transparent Text Overlays','Export a PNG with no background and place the lettering over a photo or video.'],
      ['Social Typography Posts','Build short quote, reaction and title graphics in square, portrait, Story, landscape or 16:9 wide formats.'],
    ]}
    tips={[
      'Use one to four words for the clearest compact composition.',
      'Reduce blur before shrinking the text if readability starts to disappear.',
      'Export PNG when transparency matters; use JPG or WebP only when a solid background is acceptable.',
    ]}
    faqs={[
      ['What font is closest to the Brat look?','Arial Narrow is a practical condensed starting point when it is available. The final look also depends on size, letter spacing, line height, colour and blur.'],
      ['Can I make a transparent Brat text image?','Yes. Turn on Transparent Background and export PNG so the lettering can be placed over another image or design. JPG does not preserve transparency.'],
      ['Can I change letter spacing?','Yes. The Letter Spacing slider changes the spacing between characters in the live preview and the exported image.'],
      ['Which canvas sizes are available?',`The tool includes ${CREATIVE_CANVAS_SIZE_SUMMARY}.`],
      ['Will every font look identical on every device?','Not always. These are system font choices, so rendering can vary slightly if a selected font is not installed and the browser uses a fallback.'],
      ['Does the tool add a watermark?','No. The browser-based export does not add a Brat Generator watermark to the image.'],
    ]}
    faqIntro="Answers about fonts, letter spacing, transparent backgrounds, canvas sizes and export."
  />;
}
