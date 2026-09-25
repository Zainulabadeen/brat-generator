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
      {
        title: 'Enter the main cover title',
        body: 'Start with the name that should dominate the artwork: an album, single, playlist, demo or project title. The title is the first thing that needs to stay readable when the cover becomes a tiny thumbnail.',
        points: [
          'Keep the main title concise whenever possible.',
          'Check how the title wraps before spending time on colours and effects.',
          'Use the title field only for the primary name so the visual hierarchy stays clear.',
        ],
        tip: 'Zoom your browser out or glance at the cover from a distance; if the title disappears, simplify or enlarge it.',
        image: '',
        alt: '',
      },
      {
        title: 'Add the artist or subtitle line',
        body: 'Use the second field for the artist name, project name, edition label or a short subtitle. Keeping it separate lets the main title stay dominant while the supporting line remains controlled.',
        points: [
          'Use a short artist or subtitle line rather than repeating the title.',
          'Treat the second line as supporting information, not a second headline.',
          'Check that both lines remain distinct when the cover is viewed small.',
        ],
        tip: 'A clear title-and-artist hierarchy usually looks more intentional than two equally loud text blocks.',
        image: '',
        alt: '',
      },
      {
        title: 'Style the background and typography',
        body: 'Now choose the visual direction: a flat colour for a cleaner Brat-inspired look, or an uploaded image when the cover needs extra context. Then tune the text over it.',
        points: [
          'Choose background and text colours with enough contrast.',
          'Adjust font, alignment, text size, line height and blur while watching the live preview.',
          'Upload JPG, PNG or WebP when you want a photo or texture behind the title.',
        ],
        tip: 'If you use a photo, make sure the title does not sit over the busiest part of the image.',
        image: '',
        alt: '',
      },
      {
        title: 'Review the 3000×3000 cover and export',
        body: 'The album tool uses a large square 3000×3000 canvas. Review the whole composition at both full size and thumbnail size before downloading the final file.',
        points: [
          'Use PNG for a high-quality master with crisp text.',
          'Use JPG or WebP when you need a smaller file for previews or web use.',
          'Check the current artwork rules of the service you plan to publish to before a commercial release.',
        ],
        tip: 'Keep one clean master export before making platform-specific copies or compressing the artwork elsewhere.',
        image: '',
        alt: '',
      },
    ]}
    guideDetails={[
      {
        eyebrow: 'Hierarchy',
        title: 'Title and Artist Placement',
        body: 'Cover art has to communicate at thumbnail size, so the title should lead and the artist line should support it without competing for attention.',
        points: [
          'Short titles can use more visual space and feel bolder.',
          'Long titles need more breathing room and may require smaller text.',
          'Keep the artist line visually secondary so the cover does not feel crowded.',
        ],
      },
      {
        eyebrow: 'Background',
        title: 'Flat Colour or Photo',
        body: 'A flat background keeps the cover closest to the stripped-back Brat look, while an uploaded image creates a more personalised variation. Both can work if the text remains the focus.',
        points: [
          'Flat colour gives the cleanest contrast and fastest setup.',
          'Photos work best when they have calm areas behind the text.',
          'Blur and text colour should be adjusted after the background is chosen, not before.',
        ],
      },
      {
        eyebrow: 'Delivery',
        title: '3000×3000 Export',
        body: 'The tool produces a large square canvas so you have a useful master file for music artwork, playlists, mockups and follow-on edits.',
        points: [
          'Keep PNG as a quality-first master when possible.',
          'Create compressed copies only when a destination requires smaller files.',
          'Always verify the current technical and rights requirements of the platform where the artwork will be published.',
        ],
      },
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
