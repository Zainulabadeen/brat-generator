import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';

export const metadata: Metadata = {
  title: { absolute: 'Brat Album Cover Generator | Free Brat Cover Maker' },
  description: 'Create Brat-style album and playlist covers with custom title, artist text, colours, blur, optional photo backgrounds and 3000×3000 export.',
  alternates: { canonical: '/brat-album-cover-generator/' },
  openGraph: {
    type: 'website',
    url: '/brat-album-cover-generator/',
    title: 'Brat Album Cover Generator | Free Brat Cover Maker',
    description: 'Create square Brat-style album and playlist cover art free in your browser.',
    images: [{ url: '/images/brat-cover-example-green.webp', width: 1200, height: 1200, alt: 'Green Brat-style album cover example' }],
  },
  twitter: { card: 'summary_large_image', title: 'Brat Album Cover Generator', description: 'Create square Brat-style cover art free in your browser.', images: ['/images/brat-cover-example-green.webp'] },
};

export default function Page() {
  return <ToolPageShell
    mode="album"
    name="Brat Album Cover Generator"
    slug="brat-album-cover-generator"
    title="Brat Album Cover Generator"
    schemaDescription="Free browser-based Brat album cover generator with title and artist text, custom colours, blur, optional photo background and 3000×3000 square image export."
    howTo={[
      ['Enter the cover title', 'Use a short album, single, playlist or project name so the main text remains clear when the artwork is shown as a small thumbnail.'],
      ['Add the artist line', 'Use the second field for your artist name, project name or a short subtitle without mixing it into the main title.'],
      ['Style the cover', 'Choose background and text colours, font, size, alignment and blur, or upload a JPG, PNG or WebP background image.'],
      ['Preview and export', 'Check the cover at a smaller size, then download the finished 3000×3000 artwork as PNG, JPG or WebP.'],
    ]}
    features={[
      ['3000×3000 Cover Canvas', 'Create on a large square canvas designed around the format commonly used for digital cover artwork.'],
      ['Title & Artist Fields', 'Edit the main title and smaller artist or subtitle line independently for a cleaner cover hierarchy.'],
      ['Optional Photo Background', 'Upload your own JPG, PNG or WebP image when you want more than a flat colour behind the text.'],
      ['Colour, Font & Blur Controls', 'Tune the palette, typography, text size, alignment and blur while keeping the Brat-inspired treatment.'],
      ['Live Cover Preview', 'See the artwork update while you edit so you can catch weak contrast or crowded text before exporting.'],
      ['PNG, JPG & WebP Export', 'Download the high-resolution square cover in the image format that fits your next editing or publishing step.'],
    ]}
    useCases={[
      ['Album & Single Concepts', 'Create original cover concepts for demos, personal projects, singles and music mockups.'],
      ['Playlist Covers', 'Make square Brat-style artwork for playlists and personal music collections.'],
      ['Release & Social Artwork', 'Reuse your cover as the visual starting point for release announcements and music-related posts.'],
    ]}
    tips={[
      'Keep the main title short enough to stay readable when the cover is viewed as a small thumbnail.',
      'Use strong contrast between the text and any uploaded photo, especially behind the main title.',
      'Check the final artwork against the current requirements of the music platform you plan to upload to.',
    ]}
    faqs={[
      ['Is the Brat Album Cover Generator free?', 'Yes. You can create and export cover artwork in the browser without creating an account.'],
      ['What size is the exported album cover?', 'The album tool uses a 3000×3000 pixel square export, giving you a large image to use as a starting file for music platforms or further editing.'],
      ['Can I upload my own background photo?', 'Yes. You can use a JPG, PNG or WebP image as the cover background, then place your title and artist line over it.'],
      ['Can I change the colours and font?', 'Yes. The tool includes custom background and text colours, several font choices, text-size controls, alignment and blur.'],
      ['Which formats can I download?', 'The finished cover can be exported as PNG, JPG or WebP. Choose the format based on the platform or editor you plan to use next.'],
      ['Can I use the cover on Spotify or another music service?', 'The 3000×3000 square output is a useful starting size, but each service can have its own current artwork rules. Check the destination platform before publishing commercially.'],
    ]}
    faqIntro="Answers about cover size, background images, typography controls and export formats before you publish or continue editing."
    links={[
      ['Read the Brat album cover guide', '/blog/how-to-make-a-brat-album-cover-free/'],
      ['Try Brat Image Generator', '/brat-image-generator/'],
      ['Explore Brat Styles', '/brat-styles/'],
    ]}
  />;
}
