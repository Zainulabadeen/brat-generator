import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';

export const metadata: Metadata = {
  title: { absolute: 'Brat Album Cover Generator | Free Brat Cover Maker' },
  description: 'Create Brat-style album and playlist covers with custom text, colours, blur, optional photo backgrounds and square high-resolution export.',
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
    schemaDescription="Free browser-based Brat album cover generator with title and artist text, colours, blur, optional photo background and high-resolution square image export."
    howTo={[
      ['Enter the cover title', 'Use a short album, playlist or project name so the main text remains readable at thumbnail size.'],
      ['Add the artist line', 'Use the second field for your name, project name or a short subtitle.'],
      ['Style the cover', 'Choose the background, text colour, font and blur. You can also upload your own background image.'],
      ['Download the square cover', 'Preview the artwork small, then export the finished high-resolution square image.'],
    ]}
    features={[
      ['Square Cover Canvas', 'Build artwork specifically around the square format used by albums and playlists.'],
      ['Title & Artist Fields', 'Keep the main cover title separate from the artist, project or subtitle line.'],
      ['Optional Photo Background', 'Use your own image when a flat colour is not enough for the cover concept.'],
      ['Brat Colour & Blur Controls', 'Recreate the bright colour, condensed text and soft blur treatment with adjustable settings.'],
      ['High-Resolution Export', 'Generate a large square image suitable for further editing or platform resizing.'],
      ['No Watermark', 'Download the artwork without an added Brat Generator logo over the design.'],
    ]}
    useCases={[
      ['Album & Single Concepts', 'Create original cover concepts for demos, personal projects and music mockups.'],
      ['Playlist Covers', 'Make square Brat-style graphics for playlists and personal music collections.'],
      ['Social Announcements', 'Reuse the cover art in posts announcing a track, playlist or creative project.'],
    ]}
    tips={[
      'Keep important text near the centre so platform cropping is less risky.',
      'Preview the design small before export because cover art is often seen as a thumbnail.',
      'Use original wording and artwork for your own project rather than copying protected cover art.',
    ]}
    links={[
      ['Read the Brat album cover guide', '/blog/how-to-make-a-brat-album-cover-free/'],
      ['Try Brat Image Generator', '/brat-image-generator/'],
      ['Explore Brat Styles', '/brat-styles/'],
    ]}
  />;
}
