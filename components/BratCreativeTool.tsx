'use client';

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';

type ToolMode = 'meme' | 'image' | 'font' | 'album';
type ExportFormat = 'png' | 'jpeg' | 'webp';

type Props = { mode: ToolMode };

type Preset = { label: string; width: number; height: number };

const PRESETS: Preset[] = [
  { label: 'Square 1080', width: 1080, height: 1080 },
  { label: 'Portrait 4:5', width: 1080, height: 1350 },
  { label: 'Story 9:16', width: 1080, height: 1920 },
  { label: 'Landscape', width: 1200, height: 630 },
];

const FONT_OPTIONS = [
  'Arial Narrow',
  'Arial Black',
  'Impact',
  'Helvetica',
  'Trebuchet MS',
  'Georgia',
  'Courier New',
  'Verdana',
];

const modeConfig = {
  meme: {
    label: 'Meme Studio',
    defaultText: 'brat energy',
    helper: 'Upload a photo or use a flat background, then add top and bottom punchlines.',
  },
  image: {
    label: 'Image Studio',
    defaultText: 'make it brat',
    helper: 'Combine text, a colour or uploaded image, simple effects, and social-ready canvas sizes.',
  },
  font: {
    label: 'Font Studio',
    defaultText: 'brat',
    helper: 'Create Brat-style typography with font, spacing, blur, alignment, colour, and transparent export controls.',
  },
  album: {
    label: 'Album Cover Studio',
    defaultText: 'your album',
    helper: 'Build square cover art with a title, optional artist line, colour, blur, and platform-ready export.',
  },
} as const;

function coverDraw(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawW = image.width * scale;
  const drawH = image.height * scale;
  ctx.drawImage(image, (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radius: number) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const paragraphs = text.split(/\n/);
  const lines: string[] = [];
  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (!words.length) {
      lines.push('');
      continue;
    }
    let line = words[0];
    for (let i = 1; i < words.length; i += 1) {
      const test = `${line} ${words[i]}`;
      if (ctx.measureText(test).width > maxWidth) {
        lines.push(line);
        line = words[i];
      } else line = test;
    }
    lines.push(line);
  }
  return lines.slice(0, 6);
}

function fitFont(ctx: CanvasRenderingContext2D, text: string, font: string, start: number, maxWidth: number) {
  let size = start;
  while (size > 18) {
    ctx.font = `700 ${size}px ${font}`;
    const longest = Math.max(...text.split(/\n/).map((line) => ctx.measureText(line || ' ').width));
    if (longest <= maxWidth) break;
    size -= 4;
  }
  return size;
}

function drawTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number,
  font: string,
  lineHeight: number,
  align: CanvasTextAlign,
  color: string,
  blur: number,
  mirror = false,
  whiteBlock = false,
) {
  if (!text.trim()) return;
  ctx.save();
  ctx.font = `700 ${fontSize}px ${font}`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  const lines = wrapLines(ctx, text, maxWidth);
  const actualLineHeight = fontSize * lineHeight;
  const total = (lines.length - 1) * actualLineHeight;
  if (mirror) {
    ctx.translate(x * 2, 0);
    ctx.scale(-1, 1);
  }
  lines.forEach((line, index) => {
    const lineY = y - total / 2 + index * actualLineHeight;
    const metrics = ctx.measureText(line || ' ');
    const blockW = Math.min(maxWidth, metrics.width + fontSize * 0.45);
    if (whiteBlock) {
      const left = align === 'left' ? x : align === 'right' ? x - blockW : x - blockW / 2;
      ctx.save();
      ctx.filter = 'none';
      ctx.fillStyle = 'rgba(255,255,255,.92)';
      roundedRect(ctx, left, lineY - fontSize * 0.58, blockW, fontSize * 1.18, fontSize * 0.08);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = color;
    ctx.filter = blur > 0 ? `blur(${blur}px)` : 'none';
    ctx.fillText(line, x, lineY, maxWidth);
  });
  ctx.restore();
}

export default function BratCreativeTool({ mode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const config = modeConfig[mode];
  const [text, setText] = useState<string>(config.defaultText);
  const [secondaryText, setSecondaryText] = useState<string>(mode === 'album' ? 'your name' : 'that was so brat');
  const [bgColor, setBgColor] = useState('#8ACE00');
  const [textColor, setTextColor] = useState('#101010');
  const [font, setFont] = useState('Arial Narrow');
  const [fontSize, setFontSize] = useState(mode === 'meme' ? 82 : mode === 'album' ? 104 : 96);
  const [blur, setBlur] = useState(1.5);
  const [lineHeight, setLineHeight] = useState(0.96);
  const [align, setAlign] = useState<CanvasTextAlign>('center');
  const [preset, setPreset] = useState(PRESETS[0]);
  const [format, setFormat] = useState<ExportFormat>('png');
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [backgroundName, setBackgroundName] = useState('');
  const [lofi, setLofi] = useState(false);
  const [mirror, setMirror] = useState(false);
  const [whiteBlock, setWhiteBlock] = useState(false);
  const [transparent, setTransparent] = useState(false);
  const [sticker, setSticker] = useState('none');

  const actualPreset = useMemo(() => {
    if (mode === 'album') return { label: 'Album 3000', width: 3000, height: 3000 };
    return preset;
  }, [mode, preset]);

  const render = (canvas: HTMLCanvasElement, exportSize = false) => {
    const ratio = actualPreset.width / actualPreset.height;
    const width = exportSize ? actualPreset.width : ratio >= 1 ? 900 : Math.round(820 * ratio);
    const height = exportSize ? actualPreset.height : ratio >= 1 ? Math.round(900 / ratio) : 820;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    const scale = width / actualPreset.width;
    const blurPx = Math.max(0, blur * (exportSize ? 1 : Math.max(scale, .45)));

    if (!(mode === 'font' && transparent)) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
    }

    if (backgroundImage) {
      ctx.save();
      if (lofi) ctx.filter = 'contrast(1.12) saturate(1.18) brightness(.92)';
      coverDraw(ctx, backgroundImage, width, height);
      ctx.restore();
      if (mode !== 'font') {
        ctx.fillStyle = 'rgba(0,0,0,.08)';
        ctx.fillRect(0,0,width,height);
      }
    }

    const margin = width * .09;
    const maxWidth = width - margin * 2;
    const scaledFont = Math.max(22, fontSize * width / 1080);
    const selectedFont = font.includes(' ') ? `"${font}"` : font;

    if (mode === 'meme') {
      const topSize = fitFont(ctx, text.toUpperCase(), selectedFont, scaledFont, maxWidth);
      const bottomSize = fitFont(ctx, secondaryText.toUpperCase(), selectedFont, scaledFont * .86, maxWidth);
      drawTextLines(ctx, text.toUpperCase(), width / 2, height * .18, maxWidth, topSize, selectedFont, .98, 'center', textColor, blurPx, mirror, whiteBlock);
      drawTextLines(ctx, secondaryText.toUpperCase(), width / 2, height * .82, maxWidth, bottomSize, selectedFont, .98, 'center', textColor, blurPx, mirror, whiteBlock);
    } else if (mode === 'album') {
      const titleSize = fitFont(ctx, text.toLowerCase(), selectedFont, scaledFont, maxWidth * .9);
      drawTextLines(ctx, text.toLowerCase(), width / 2, height * .47, maxWidth * .9, titleSize, selectedFont, lineHeight, align, textColor, blurPx, mirror, whiteBlock);
      drawTextLines(ctx, secondaryText, width / 2, height * .79, maxWidth * .78, Math.max(24, titleSize * .28), selectedFont, 1.1, 'center', textColor, Math.max(0, blurPx * .28));
    } else {
      const finalSize = fitFont(ctx, text, selectedFont, scaledFont, maxWidth);
      drawTextLines(ctx, text, align === 'left' ? margin : align === 'right' ? width - margin : width / 2, height / 2, maxWidth, finalSize, selectedFont, lineHeight, align, textColor, blurPx, mirror, whiteBlock);
    }

    if (mode === 'image' && sticker !== 'none') {
      ctx.save();
      ctx.filter = 'none';
      ctx.font = `${Math.round(width * .095)}px sans-serif`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText(sticker, width * .9, height * .9);
      ctx.restore();
    }
  };

  useEffect(() => {
    if (canvasRef.current) render(canvasRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, secondaryText, bgColor, textColor, font, fontSize, blur, lineHeight, align, preset, backgroundImage, lofi, mirror, whiteBlock, transparent, sticker, mode]);

  const onBackground = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      setBackgroundImage(image);
      setBackgroundName(file.name);
      URL.revokeObjectURL(url);
    };
    image.src = url;
  };

  const makeBlob = async (type: string, quality?: number) => {
    const exportCanvas = document.createElement('canvas');
    render(exportCanvas, true);
    return await new Promise<Blob | null>((resolve) => exportCanvas.toBlob(resolve, type, quality));
  };

  const download = async () => {
    const mime = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
    const blob = await makeBlob(mime, format === 'jpeg' ? .94 : undefined);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brat-${mode}-${Date.now()}.${format === 'jpeg' ? 'jpg' : format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyImage = async () => {
    if (!('ClipboardItem' in window) || !navigator.clipboard?.write) return;
    const blob = await makeBlob('image/png');
    if (!blob) return;
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
  };

  const reset = () => {
    setText(config.defaultText);
    setSecondaryText(mode === 'album' ? 'your name' : 'that was so brat');
    setBgColor('#8ACE00');
    setTextColor('#101010');
    setFont('Arial Narrow');
    setFontSize(mode === 'meme' ? 82 : mode === 'album' ? 104 : 96);
    setBlur(1.5);
    setLineHeight(.96);
    setAlign('center');
    setPreset(PRESETS[0]);
    setFormat('png');
    setBackgroundImage(null);
    setBackgroundName('');
    setLofi(false);
    setMirror(false);
    setWhiteBlock(false);
    setTransparent(false);
    setSticker('none');
  };

  return (
    <div className={`creative-tool creative-tool-${mode}`}>
      <div className="creative-tool-head">
        <div><span className="tool-live-dot" /> <strong>{config.label}</strong></div>
        <span>{config.helper}</span>
      </div>

      <div className="creative-tool-grid">
        <div className="creative-tool-controls">
          <label className="tool-field">
            <span>{mode === 'album' ? 'Cover title' : mode === 'meme' ? 'Top text' : 'Your text'}</span>
            <textarea value={text} onChange={(e) => setText(e.target.value.slice(0, 220))} rows={mode === 'meme' ? 2 : 3} />
          </label>

          {(mode === 'meme' || mode === 'album') ? (
            <label className="tool-field">
              <span>{mode === 'album' ? 'Artist / subtitle' : 'Bottom text'}</span>
              <input value={secondaryText} onChange={(e) => setSecondaryText(e.target.value.slice(0, 140))} />
            </label>
          ) : null}

          <div className="tool-row two">
            <label className="tool-field"><span>Background</span><div className="color-input"><input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} /><code>{bgColor.toUpperCase()}</code></div></label>
            <label className="tool-field"><span>Text colour</span><div className="color-input"><input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} /><code>{textColor.toUpperCase()}</code></div></label>
          </div>

          <div className="tool-preset-row">
            {['#8ACE00','#f17ac6','#ffffff','#111111','#6d66ff','#18b8ec','#ff4b18'].map((color) => <button key={color} type="button" aria-label={`Use ${color}`} style={{ background: color }} onClick={() => setBgColor(color)} />)}
          </div>

          <div className="tool-row two">
            <label className="tool-field"><span>Font</span><select value={font} onChange={(e) => setFont(e.target.value)}>{FONT_OPTIONS.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="tool-field"><span>Alignment</span><select value={align} onChange={(e) => setAlign(e.target.value as CanvasTextAlign)}><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></label>
          </div>

          <label className="tool-slider"><span>Text size <b>{fontSize}px</b></span><input type="range" min="32" max="180" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} /></label>
          <label className="tool-slider"><span>Blur <b>{blur.toFixed(1)}px</b></span><input type="range" min="0" max="8" step="0.5" value={blur} onChange={(e) => setBlur(Number(e.target.value))} /></label>
          <label className="tool-slider"><span>Line height <b>{lineHeight.toFixed(2)}</b></span><input type="range" min="0.75" max="1.45" step="0.05" value={lineHeight} onChange={(e) => setLineHeight(Number(e.target.value))} /></label>

          {mode !== 'font' ? (
            <label className="tool-field tool-upload"><span>Background image (optional)</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={onBackground} /><small>{backgroundName || 'PNG, JPG or WebP — stays in your browser'}</small></label>
          ) : null}

          {mode !== 'album' ? (
            <label className="tool-field"><span>Canvas size</span><select value={preset.label} onChange={(e) => setPreset(PRESETS.find((p) => p.label === e.target.value) || PRESETS[0])}>{PRESETS.map((item) => <option key={item.label} value={item.label}>{item.label} · {item.width}×{item.height}</option>)}</select></label>
          ) : <div className="tool-static-note">Album export: 3000 × 3000 px square</div>}

          {mode === 'image' ? (
            <label className="tool-field"><span>Sticker</span><select value={sticker} onChange={(e) => setSticker(e.target.value)}><option value="none">None</option><option value="✦">Sparkle ✦</option><option value="★">Star ★</option><option value="♡">Heart ♡</option><option value="☻">Smile ☻</option></select></label>
          ) : null}

          <div className="tool-toggle-row">
            {(mode === 'meme' || mode === 'image') ? <label><input type="checkbox" checked={lofi} onChange={(e) => setLofi(e.target.checked)} /> Lo-fi photo</label> : null}
            <label><input type="checkbox" checked={mirror} onChange={(e) => setMirror(e.target.checked)} /> Mirror</label>
            <label><input type="checkbox" checked={whiteBlock} onChange={(e) => setWhiteBlock(e.target.checked)} /> White block</label>
            {mode === 'font' ? <label><input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} /> Transparent BG</label> : null}
          </div>
        </div>

        <div className="creative-tool-preview-wrap">
          <div className="creative-tool-preview-head"><span>Live preview</span><span>{actualPreset.width} × {actualPreset.height}</span></div>
          <div className="creative-tool-canvas-shell"><canvas ref={canvasRef} /></div>
          <div className="creative-tool-actions">
            <select aria-label="Download format" value={format} onChange={(e) => setFormat(e.target.value as ExportFormat)}><option value="png">PNG</option><option value="jpeg">JPG</option><option value="webp">WebP</option></select>
            <button className="tool-action primary" type="button" onClick={download}>Download</button>
            <button className="tool-action" type="button" onClick={copyImage}>Copy Image</button>
            <button className="tool-action subtle" type="button" onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}
