export type CreativeToolMode = 'meme' | 'image' | 'font' | 'album';

export type CanvasPreset = {
  label: string;
  width: number;
  height: number;
  shortLabel: string;
};


export const MAIN_CANVAS_PRESETS: CanvasPreset[] = [
  { label: 'Square 800', width: 800, height: 800, shortLabel: 'Square 800×800' },
  { label: 'Square 1000', width: 1000, height: 1000, shortLabel: 'Square 1000×1000' },
  { label: 'Square 1200', width: 1200, height: 1200, shortLabel: 'Square 1200×1200' },
  { label: 'Portrait 4:5', width: 1080, height: 1350, shortLabel: 'Portrait 1080×1350' },
  { label: 'Story 9:16', width: 1080, height: 1920, shortLabel: 'Story 1080×1920' },
  { label: 'Wide 16:9', width: 1920, height: 1080, shortLabel: 'Wide 1920×1080' },
  { label: 'Banner 1.91:1', width: 1200, height: 630, shortLabel: 'Banner 1200×630' },
];

export const MAIN_CANVAS_SIZE_SUMMARY = '800×800, 1000×1000 and 1200×1200 square; 1080×1350 portrait; 1080×1920 Story; 1920×1080 wide; and 1200×630 banner';

export const CREATIVE_CANVAS_PRESETS: CanvasPreset[] = [
  { label: 'Square 1080', width: 1080, height: 1080, shortLabel: 'Square 1080×1080' },
  { label: 'Portrait 4:5', width: 1080, height: 1350, shortLabel: 'Portrait 1080×1350' },
  { label: 'Story 9:16', width: 1080, height: 1920, shortLabel: 'Story 1080×1920' },
  { label: 'Landscape 1.91:1', width: 1200, height: 630, shortLabel: 'Landscape 1200×630' },
  { label: 'Wide 16:9', width: 1920, height: 1080, shortLabel: 'Wide 1920×1080' },
];

export const FONT_OPTIONS = [
  'Arial Narrow',
  'Arial Black',
  'Impact',
  'Helvetica',
  'Trebuchet MS',
  'Georgia',
  'Courier New',
  'Verdana',
] as const;

export const CREATIVE_CANVAS_SIZE_SUMMARY = '1080×1080 square, 1080×1350 portrait, 1080×1920 Story, 1200×630 landscape and 1920×1080 wide';

export const TOOL_CAPABILITIES = {
  meme: {
    photoUpload: true,
    letterSpacing: false,
    lineHeight: true,
    alignment: true,
    transparentBackground: false,
    exportFormats: ['PNG', 'JPG', 'WebP'],
  },
  image: {
    photoUpload: true,
    letterSpacing: false,
    lineHeight: false,
    alignment: false,
    transparentBackground: false,
    exportFormats: ['PNG', 'JPG', 'WebP'],
  },
  font: {
    photoUpload: false,
    letterSpacing: true,
    lineHeight: true,
    alignment: true,
    transparentBackground: true,
    exportFormats: ['PNG', 'JPG', 'WebP'],
  },
  album: {
    photoUpload: true,
    letterSpacing: false,
    lineHeight: true,
    alignment: true,
    transparentBackground: false,
    exportFormats: ['PNG', 'JPG', 'WebP'],
    fixedCanvas: '3000×3000',
  },
} as const;
