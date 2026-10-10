'use client';

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { CREATIVE_CANVAS_PRESETS as PRESETS, FONT_OPTIONS } from '@/lib/toolCapabilities';

type ToolMode = 'meme' | 'image' | 'font' | 'album';
type ExportFormat = 'png' | 'jpeg' | 'webp';
type ImageMobileTab = 'colours' | 'type' | 'effects';

type Props = { mode: ToolMode };

const modeConfig = {
  meme: {
    label: 'Meme Studio',
    defaultText: 'brat energy',
    helper: 'Upload a photo or use a flat background, then add top and bottom punchlines.',
  },
  image: {
    label: 'Image Studio',
    defaultText: 'make it brat',
    helper: 'Create text-led Brat graphics with custom colours, an optional background image, simple effects, and social-ready canvas sizes.',
  },
  font: {
    label: 'Font Studio',
    defaultText: 'brat',
    helper: 'Create Brat-style typography with font, spacing, blur, alignment, colour, and transparent export controls.',
  },
  album: {
    label: 'Album Cover Studio',
    defaultText: 'your album',
    helper: 'Build square cover art with a title, optional artist line, colour, blur, and high-resolution export.',
  },
} as const;

// Mobile-only tab artwork. Fixed-size strokes avoid distorted glyphs on small phones.
function MobileToolIcon({ kind }: { kind: string }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const };
  if (kind === 'text') return <svg {...common}><path d="M4 19 10 5l6 14M6 15h8M15 9h6M18 9v10" /></svg>;
  if (kind === 'colour' || kind === 'colours') return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M12 4a8 8 0 0 1 0 16Z" /></svg>;
  if (kind === 'type') return <svg {...common}><path d="M4 6h16M12 6v13M7 19h10" /></svg>;
  if (kind === 'effects') return <svg {...common}><path d="m12 2 2.1 7.9L22 12l-7.9 2.1L12 22l-2.1-7.9L2 12l7.9-2.1L12 2Z" /></svg>;
  return <svg {...common}><path d="M12 3v14m-5-5 5 5 5-5M4 19h16" /></svg>;
}

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

function measureWithSpacing(ctx: CanvasRenderingContext2D, text: string, letterSpacing: number) {
  if (!letterSpacing || text.length <= 1) return ctx.measureText(text || ' ').width;
  return text.split('').reduce((sum, char, index) => sum + ctx.measureText(char).width + (index < text.length - 1 ? letterSpacing : 0), 0);
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, letterSpacing = 0) {
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
      if (measureWithSpacing(ctx, test, letterSpacing) > maxWidth) {
        lines.push(line);
        line = words[i];
      } else line = test;
    }
    lines.push(line);
  }
  return lines.slice(0, 6);
}

function fitFont(ctx: CanvasRenderingContext2D, text: string, font: string, start: number, maxWidth: number, letterSpacing = 0) {
  let size = start;
  while (size > 18) {
    ctx.font = `700 ${size}px ${font}`;
    const longest = Math.max(...text.split(/\n/).map((line) => measureWithSpacing(ctx, line || ' ', letterSpacing)));
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
  letterSpacing = 0,
) {
  if (!text.trim()) return;
  ctx.save();
  ctx.font = `700 ${fontSize}px ${font}`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  const lines = wrapLines(ctx, text, maxWidth, letterSpacing);
  const actualLineHeight = fontSize * lineHeight;
  const total = (lines.length - 1) * actualLineHeight;
  if (mirror) {
    ctx.translate(x * 2, 0);
    ctx.scale(-1, 1);
  }
  lines.forEach((line, index) => {
    const lineY = y - total / 2 + index * actualLineHeight;
    const measuredWidth = Math.min(maxWidth, measureWithSpacing(ctx, line || ' ', letterSpacing));
    const blockW = Math.min(maxWidth, measuredWidth + fontSize * 0.45);
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
    if (!letterSpacing || line.length <= 1) {
      ctx.textAlign = align;
      ctx.fillText(line, x, lineY, maxWidth);
      return;
    }
    const chars = line.split('');
    let cursor = align === 'left' ? x : align === 'right' ? x - measuredWidth : x - measuredWidth / 2;
    ctx.textAlign = 'left';
    chars.forEach((char, charIndex) => {
      ctx.fillText(char, cursor, lineY);
      cursor += ctx.measureText(char).width + (charIndex < chars.length - 1 ? letterSpacing : 0);
    });
  });
  ctx.restore();
}

export default function BratCreativeTool({ mode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mobileImageCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mobileTextRef = useRef<HTMLDivElement | null>(null);
  const config = modeConfig[mode];
  const [text, setText] = useState<string>(config.defaultText);
  const [secondaryText, setSecondaryText] = useState<string>(mode === 'album' ? 'your name' : 'that was so brat');
  const [bgColor, setBgColor] = useState('#8ACE00');
  const [textColor, setTextColor] = useState('#101010');
  const [font, setFont] = useState('Arial Narrow');
  const [fontSize, setFontSize] = useState(mode === 'meme' ? 82 : mode === 'album' ? 104 : 96);
  const [blur, setBlur] = useState(1.5);
  const [lineHeight, setLineHeight] = useState(0.96);
  const [letterSpacing, setLetterSpacing] = useState(0);
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
  const [imageGenerated, setImageGenerated] = useState(mode !== 'image');
  const [mobileTab, setMobileTab] = useState<'text' | 'colour' | 'type' | 'effects'>('text');
  const [exportError, setExportError] = useState('');
  const [imageOptionsOpen, setImageOptionsOpen] = useState(false);
  const [imageMobileTab, setImageMobileTab] = useState<ImageMobileTab>('colours');
  const restoredDraftRef = useRef(false);

  // Store only lightweight settings. Uploaded images stay on the user's device and
  // deliberately never enter localStorage (large data URLs cause mobile crashes).
  useEffect(() => {
    try {
      const draft = JSON.parse(localStorage.getItem(`brat-creative-${mode}-v1`) || 'null');
      if (draft && typeof draft === 'object') {
        if (typeof draft.text === 'string') setText(draft.text.slice(0, 220));
        if (typeof draft.secondaryText === 'string') setSecondaryText(draft.secondaryText.slice(0, 140));
        if (/^#[0-9a-f]{6}$/i.test(draft.bgColor)) setBgColor(draft.bgColor);
        if (/^#[0-9a-f]{6}$/i.test(draft.textColor)) setTextColor(draft.textColor);
        if (FONT_OPTIONS.includes(draft.font)) setFont(draft.font);
        if (Number.isFinite(draft.fontSize)) setFontSize(Math.min(180, Math.max(32, draft.fontSize)));
        if (Number.isFinite(draft.blur)) setBlur(Math.min(8, Math.max(0, draft.blur)));
        if (Number.isFinite(draft.lineHeight)) setLineHeight(Math.min(1.45, Math.max(.75, draft.lineHeight)));
        if (Number.isFinite(draft.letterSpacing)) setLetterSpacing(Math.min(36, Math.max(-6, draft.letterSpacing)));
        if (['left', 'center', 'right'].includes(draft.align)) setAlign(draft.align);
        const match = PRESETS.find(p => p.label === draft.preset);
        if (match) setPreset(match);
        if (['png', 'jpeg', 'webp'].includes(draft.format)) setFormat(draft.format);
        if (typeof draft.lofi === 'boolean') setLofi(draft.lofi);
        if (typeof draft.mirror === 'boolean') setMirror(draft.mirror);
        if (typeof draft.whiteBlock === 'boolean') setWhiteBlock(draft.whiteBlock);
        if (typeof draft.transparent === 'boolean') setTransparent(draft.transparent);
        if (typeof draft.sticker === 'string') setSticker(draft.sticker);
        if (typeof draft.imageGenerated === 'boolean' && mode === 'image') setImageGenerated(draft.imageGenerated);
      }
    } catch { /* Storage can be disabled in private browsing. */ }
    restoredDraftRef.current = true;
  }, [mode]);

  useEffect(() => {
    if (!restoredDraftRef.current) return;
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(`brat-creative-${mode}-v1`, JSON.stringify({
          text, secondaryText, bgColor, textColor, font, fontSize, blur,
          lineHeight, letterSpacing, align, preset: preset.label, format,
          lofi, mirror, whiteBlock, transparent, sticker, imageGenerated,
        }));
      } catch { /* No fatal error if local storage is full or blocked. */ }
    }, 500);
    return () => window.clearTimeout(id);
  }, [mode, text, secondaryText, bgColor, textColor, font, fontSize, blur, lineHeight,
    letterSpacing, align, preset, format, lofi, mirror, whiteBlock, transparent, sticker, imageGenerated]);

  const actualPreset = useMemo(() => {
    if (mode === 'album') return { label: 'Album 3000', width: 3000, height: 3000 };
    return preset;
  }, [mode, preset]);

  const render = (canvas: HTMLCanvasElement, exportSize = false, forceOpaque = false) => {
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

    if (!(mode === 'font' && transparent && !forceOpaque)) {
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
    const scaledLetterSpacing = letterSpacing * width / 1080;
    const selectedFont = font.includes(' ') ? `"${font}"` : font;

    if (mode === 'meme') {
      const topSize = fitFont(ctx, text, selectedFont, scaledFont, maxWidth);
      const bottomSize = fitFont(ctx, secondaryText, selectedFont, scaledFont * .86, maxWidth);
      const memeX = align === 'left' ? margin : align === 'right' ? width - margin : width / 2;
      drawTextLines(ctx, text, memeX, height * .18, maxWidth, topSize, selectedFont, lineHeight, align, textColor, blurPx, mirror, whiteBlock);
      drawTextLines(ctx, secondaryText, memeX, height * .82, maxWidth, bottomSize, selectedFont, lineHeight, align, textColor, blurPx, mirror, whiteBlock);
    } else if (mode === 'album') {
      const titleSize = fitFont(ctx, text.toLowerCase(), selectedFont, scaledFont, maxWidth * .9);
      const titleX = align === 'left' ? margin : align === 'right' ? width - margin : width / 2;
      drawTextLines(ctx, text.toLowerCase(), titleX, height * .47, maxWidth * .9, titleSize, selectedFont, lineHeight, align, textColor, blurPx, mirror, whiteBlock);
      drawTextLines(ctx, secondaryText, titleX, height * .79, maxWidth * .78, Math.max(24, titleSize * .28), selectedFont, 1.1, align, textColor, Math.max(0, blurPx * .28));
    } else {
      const spacing = mode === 'font' ? scaledLetterSpacing : 0;
      const finalSize = fitFont(ctx, text, selectedFont, scaledFont, maxWidth, spacing);
      drawTextLines(ctx, text, align === 'left' ? margin : align === 'right' ? width - margin : width / 2, height / 2, maxWidth, finalSize, selectedFont, lineHeight, align, textColor, blurPx, mirror, whiteBlock, spacing);
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
    if (canvasRef.current && (mode !== 'image' || imageGenerated)) render(canvasRef.current);
    if (mode === 'image' && mobileImageCanvasRef.current && window.matchMedia('(max-width:620px)').matches) render(mobileImageCanvasRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, secondaryText, bgColor, textColor, font, fontSize, blur, lineHeight, letterSpacing, align, preset, backgroundImage, lofi, mirror, whiteBlock, transparent, sticker, mode, imageGenerated]);

  // Render when rotating/resizing into mobile mode without changing editor settings.
  useEffect(() => {
    if (mode !== 'image') return;
    const media = window.matchMedia('(max-width:620px)');
    const update = () => { if (media.matches && mobileImageCanvasRef.current) render(mobileImageCanvasRef.current); };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, text, secondaryText, bgColor, textColor, font, fontSize, blur, lineHeight,
    letterSpacing, align, preset, backgroundImage, lofi, mirror, whiteBlock, transparent, sticker]);

  const onBackground = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 16 * 1024 * 1024) { setExportError('This image is over 16 MB. Please choose a smaller JPG, PNG, or WebP.'); return; }
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      setBackgroundImage(image);
      setBackgroundName(file.name);
      setExportError('');
      URL.revokeObjectURL(url);
    };
    image.onerror = () => { URL.revokeObjectURL(url); setExportError('Could not open this image. Try a JPG, PNG or WebP file.'); };
    image.src = url;
  };

  const makeBlob = async (type: string, quality?: number) => {
    const exportCanvas = document.createElement('canvas');
    const mobile = window.matchMedia('(max-width:900px)').matches;
    if (mobile && actualPreset.width * actualPreset.height > 20_000_000) {
      throw new Error('This resolution is too large for a safe mobile export. Select a smaller canvas.');
    }
    try {
      render(exportCanvas, true, mode === 'font' && transparent && type === 'image/jpeg');
      return await new Promise<Blob | null>((resolve, reject) => {
        try { exportCanvas.toBlob(resolve, type, quality); }
        catch (error) { reject(error); }
      });
    } finally {
      // Release the 3000 x 3000 bitmap as soon as encoding is finished.
      if (mobile) { exportCanvas.width = 0; exportCanvas.height = 0; }
    }
  };

  const download = async () => {
    if (mode === 'image' && !imageGenerated && !window.matchMedia('(max-width:620px)').matches) return;
    const mime = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
    let blob: Blob | null = null;
    try { blob = await makeBlob(mime, format === 'jpeg' ? .94 : undefined); }
    catch { setExportError('Export needs more memory. Please try a smaller canvas or JPG.'); return; }
    if (!blob) { setExportError('Export failed. Try PNG or a smaller canvas size.'); return; }
    setExportError('');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brat-${mode}-${Date.now()}.${format === 'jpeg' ? 'jpg' : format}`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 30000);
  };

  const copyImage = async () => {
    if (mode === 'image' && !imageGenerated && !window.matchMedia('(max-width:620px)').matches) return;
    if (!('ClipboardItem' in window) || !navigator.clipboard?.write) {
      setExportError('This browser cannot copy a PNG image. On mobile, try Share Image or Download.');
      return;
    }
    const mobile = window.matchMedia('(max-width:900px)').matches;
    if (mobile) {
      // Do not await toBlob before clipboard.write: Android may lose the tap gesture.
      try {
        const pendingPng = makeBlob('image/png').then(blob => {
          if (!blob) throw new Error('PNG generation failed');
          return blob;
        });
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': pendingPng })]);
        setExportError('PNG copied. If WhatsApp cannot paste it, use Share Image to send the picture directly.');
      } catch {
        setExportError('Your browser could not copy the PNG. Use Share Image or Download instead.');
      }
      return;
    }
    // Preserve the approved desktop copying flow.
    try {
      const blob = await makeBlob('image/png');
      if (!blob) { setExportError('Copy failed. Try downloading PNG instead.'); return; }
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setExportError('');
    } catch { setExportError('Copy is unavailable in this browser. Use Download instead.'); }
  };

  const shareImageMobile = () => {
    if (!window.matchMedia('(max-width:900px)').matches) return;
    if (!navigator.share || !navigator.canShare) {
      setExportError('This browser does not support image sharing. Download and send the file from your Gallery.');
      return;
    }
    try {
      const preview = mode === 'image' ? mobileImageCanvasRef.current : canvasRef.current;
      if (!preview || !preview.width || !preview.height) throw new Error('No preview ready');
      // Prepare a real image File synchronously, then open the native share sheet
      // in this same user gesture (no await before navigator.share).
      const png = preview.toDataURL('image/png').split(',')[1];
      const binary = atob(png);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
      const file = new File([bytes], `brat-${mode}.png`, { type: 'image/png' });
      if (!navigator.canShare({ files: [file] })) {
        setExportError('Native image sharing is not supported. Download the PNG and share it from your Gallery.');
        return;
      }
      setExportError('');
      void navigator.share({ files: [file], title: 'Brat design' }).catch(error => {
        if (error.name !== 'AbortError') setExportError('Could not open sharing. Download the PNG to share from your Gallery.');
      });
    } catch {
      setExportError('Could not prepare the image for sharing. Download the PNG instead.');
    }
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
    setLetterSpacing(0);
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
    setImageGenerated(mode !== 'image');
    setExportError('');
    try { localStorage.removeItem(`brat-creative-${mode}-v1`); } catch {}
  };

  if (mode === 'image') {
    const generateImage = () => {
      setImageGenerated(true);
      window.requestAnimationFrame(() => { if (canvasRef.current) render(canvasRef.current); });
    };

    return (
      <div className="creative-tool creative-tool-image image-prompt-tool">
        <div className="image-prompt-main">
          <label className="image-prompt-field">
            <span>Enter your text or idea</span>
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value.slice(0, 220)); setImageGenerated(false); }}
              rows={4}
              placeholder="Type a word, phrase, mood or short idea…"
            />
          </label>

          <p className="tool-inline-note">Your text becomes the artwork. This is a text-led design tool, not an AI scene or photo generator.</p>

          {/* This mobile editor is independent of the approved desktop Create/Preview layout. */}
          <div className="image-mobile-live-preview" aria-label="Live Brat image preview">
            <canvas ref={mobileImageCanvasRef} />
          </div>
          <div className="image-mobile-editor">
            <nav className="creative-mobile-tabs image-mobile-tabbar" aria-label="Image editing categories">
              {([['colours','Colours'],['type','Type'],['effects','Effects']] as const).map(([id,label]) => (
                <button key={id} type="button" className={imageMobileTab === id ? 'active' : ''} aria-pressed={imageMobileTab === id} onClick={() => setImageMobileTab(id)}>
                  <MobileToolIcon kind={id}/><span>{label}</span>
                </button>
              ))}
            </nav>
            <div className="image-mobile-edit-panels">
              <div className={imageMobileTab === 'colours' ? 'shown' : ''}>
                <div className="tool-row two">
                  <label className="tool-field"><span>Background</span><div className="color-input"><input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}/><code>{bgColor.toUpperCase()}</code></div></label>
                  <label className="tool-field"><span>Text colour</span><div className="color-input"><input type="color" value={textColor} onChange={e => setTextColor(e.target.value)}/><code>{textColor.toUpperCase()}</code></div></label>
                </div>
                <div className="tool-preset-row">
                  {['#8ACE00','#f17ac6','#ffffff','#111111','#6d66ff','#18b8ec','#ff4b18'].map(color => <button key={color} type="button" aria-label={`Use ${color}`} style={{background:color}} onClick={() => setBgColor(color)}/>)}
                </div>
              </div>
              <div className={imageMobileTab === 'type' ? 'shown' : ''}>
                <label className="tool-field"><span>Canvas size</span><select value={preset.label} onChange={e => setPreset(PRESETS.find(p => p.label === e.target.value) || PRESETS[0])}>{PRESETS.map(item => <option key={item.label} value={item.label}>{item.shortLabel}</option>)}</select></label>
                <div className="tool-row two">
                  <label className="tool-field"><span>Font</span><select value={font} onChange={e => setFont(e.target.value)}>{FONT_OPTIONS.map(item => <option key={item}>{item}</option>)}</select></label>
                  <label className="tool-field"><span>Alignment</span><select value={align} onChange={e => setAlign(e.target.value as CanvasTextAlign)}><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></label>
                </div>
                <label className="tool-slider"><span>Text size <b>{fontSize}px</b></span><input type="range" min="32" max="180" value={fontSize} onChange={e => setFontSize(Number(e.target.value))}/></label>
              </div>
              <div className={imageMobileTab === 'effects' ? 'shown' : ''}>
                <label className="tool-slider"><span>Blur <b>{blur.toFixed(1)}px</b></span><input type="range" min="0" max="8" step="0.5" value={blur} onChange={e => setBlur(Number(e.target.value))}/></label>
                <label className="tool-field tool-upload"><span>Background image (optional)</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={onBackground}/><small>{backgroundName || 'PNG, JPG or WebP'}</small></label>
                <div className="tool-toggle-row">
                  <label><input type="checkbox" checked={lofi} onChange={e => setLofi(e.target.checked)}/> Lo-fi photo</label>
                  <label><input type="checkbox" checked={mirror} onChange={e => setMirror(e.target.checked)}/> Mirror</label>
                  <label><input type="checkbox" checked={whiteBlock} onChange={e => setWhiteBlock(e.target.checked)}/> White block</label>
                </div>
              </div>
            </div>
            <div className="creative-tool-actions image-mobile-export-actions">
              <select aria-label="Download format" value={format} onChange={e => setFormat(e.target.value as ExportFormat)}><option value="png">PNG</option><option value="jpeg">JPG</option><option value="webp">WebP</option></select>
              <button className="tool-action primary" type="button" onClick={download}>Download</button>
              <button className="tool-action" type="button" onClick={copyImage}>Copy Image</button>
              <button className="tool-action mobile-share-image" type="button" onClick={shareImageMobile}>Share Image</button>
              <button className="tool-action subtle" type="button" onClick={reset}>Reset</button>
            </div>
            {exportError ? <p className="tool-export-error" role="alert">{exportError}</p> : null}
          </div>

          <details className={`image-mobile-settings ${imageOptionsOpen ? 'mobile-open' : ''}`} open>
          <summary onClick={(event) => { event.preventDefault(); setImageOptionsOpen((v) => !v); }}>Design settings <span>Colours, size, font and effects</span></summary>
          <div className="image-quick-settings">
            <label className="tool-field"><span>Background</span><div className="color-input"><input type="color" value={bgColor} onChange={(e) => { setBgColor(e.target.value); setImageGenerated(false); }} /><code>{bgColor.toUpperCase()}</code></div></label>
            <label className="tool-field"><span>Text colour</span><div className="color-input"><input type="color" value={textColor} onChange={(e) => { setTextColor(e.target.value); setImageGenerated(false); }} /><code>{textColor.toUpperCase()}</code></div></label>
            <label className="tool-field"><span>Canvas size</span><select value={preset.label} onChange={(e) => { setPreset(PRESETS.find((p) => p.label === e.target.value) || PRESETS[0]); setImageGenerated(false); }}>{PRESETS.map((item) => <option key={item.label} value={item.label}>{item.shortLabel}</option>)}</select></label>
          </div>

          <div className="tool-row two">
            <label className="tool-field"><span>Font</span><select value={font} onChange={(e) => { setFont(e.target.value); setImageGenerated(false); }}>{FONT_OPTIONS.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="tool-slider"><span>Blur <b>{blur.toFixed(1)}px</b></span><input type="range" min="0" max="8" step="0.5" value={blur} onChange={(e) => { setBlur(Number(e.target.value)); setImageGenerated(false); }} /></label>
          </div>

          <label className="tool-field tool-upload"><span>Background image (optional)</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => { onBackground(event); setImageGenerated(false); }} /><small className="tool-help">{backgroundName || 'PNG, JPG or WebP — the file stays in your browser'}</small></label>

          <div className="tool-toggle-row">
            <label><input type="checkbox" checked={lofi} onChange={(e) => { setLofi(e.target.checked); setImageGenerated(false); }} /> Lo-fi photo</label>
            <label><input type="checkbox" checked={mirror} onChange={(e) => { setMirror(e.target.checked); setImageGenerated(false); }} /> Mirror text</label>
            <label><input type="checkbox" checked={whiteBlock} onChange={(e) => { setWhiteBlock(e.target.checked); setImageGenerated(false); }} /> White block</label>
          </div>

          </details>
          <button className="image-generate-btn" type="button" onClick={generateImage}>Create Brat Image</button>

          <div className={`image-output ${imageGenerated ? 'has-image' : ''}`}>
            {imageGenerated ? (
              <>
                <div className="image-output-canvas"><canvas ref={canvasRef} /></div>
                <div className="creative-tool-actions image-output-actions">
                  <select aria-label="Download format" value={format} onChange={(e) => setFormat(e.target.value as ExportFormat)}><option value="png">PNG</option><option value="jpeg">JPG</option><option value="webp">WebP</option></select>
                  <button className="tool-action primary" type="button" onClick={download}>Download</button>
                  <button className="tool-action" type="button" onClick={copyImage}>Copy Image</button>
              <button className="tool-action mobile-share-image" type="button" onClick={shareImageMobile}>Share Image</button>
                  <button className="tool-action subtle" type="button" onClick={reset}>Reset</button>
                </div>
                {exportError ? <p className="tool-export-error" role="alert">{exportError}</p> : null}
              </>
            ) : (
              <div className="image-output-placeholder">
                <span className="image-placeholder-icon">▧</span>
                <strong>Your Brat image will appear here</strong>
                <small>Enter your text above, choose your colours and press Create Brat Image.</small>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`creative-tool creative-tool-${mode}`}>
      <div className="creative-tool-head">
        <div><span className="tool-live-dot" /> <strong>{config.label}</strong></div>
        <span>{config.helper}</span>
      </div>

      <div className="creative-tool-mobile-primary" ref={mobileTextRef}>
        <label className="tool-field">
          <span>{mode === 'album' ? 'Cover title' : mode === 'meme' ? 'Top text' : 'Your text'}</span>
          <textarea value={text} onChange={e => setText(e.target.value.slice(0,220))} rows={2}/>
        </label>
        {(mode === 'meme' || mode === 'album') && (
          <label className="tool-field"><span>{mode === 'album' ? 'Artist / subtitle' : 'Bottom text'}</span><input value={secondaryText} onChange={e => setSecondaryText(e.target.value.slice(0,140))}/></label>
        )}
      </div>

      <div className="creative-tool-grid">
        <div className="creative-tool-controls">
          <nav className="creative-mobile-tabs" aria-label="Editing options">
            {([['text','Text'],['colour','Colours'],['type','Type'],['effects','Effects']] as const).map(([id,label]) => (
              <button key={id} type="button" onClick={() => { setMobileTab(id); if (id === 'text') mobileTextRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} className={mobileTab === id ? 'active' : ''} aria-pressed={mobileTab === id}>
                <MobileToolIcon kind={id}/><span>{label}</span>
              </button>
            ))}
          </nav>
          <div className={`mobile-control-group ${mobileTab === 'text' ? 'selected' : ''}`} data-mobile-group="text">
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

          <button className="creative-mobile-edit-text-cta" type="button" onClick={() => mobileTextRef.current?.scrollIntoView({ behavior:'smooth', block:'center' })}>Edit text above preview ↑</button>
          </div>
          <div className={`mobile-control-group ${mobileTab === 'colour' ? 'selected' : ''}`} data-mobile-group="colour">
          <div className="tool-row two">
            <label className="tool-field"><span>Background</span><div className="color-input"><input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} /><code>{bgColor.toUpperCase()}</code></div></label>
            <label className="tool-field"><span>Text colour</span><div className="color-input"><input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} /><code>{textColor.toUpperCase()}</code></div></label>
          </div>

          <div className="tool-preset-row">
            {['#8ACE00','#f17ac6','#ffffff','#111111','#6d66ff','#18b8ec','#ff4b18'].map((color) => <button key={color} type="button" aria-label={`Use ${color}`} style={{ background: color }} onClick={() => setBgColor(color)} />)}
          </div>

          </div>
          <div className={`mobile-control-group ${mobileTab === 'type' ? 'selected' : ''}`} data-mobile-group="type">
          <div className="tool-row two">
            <label className="tool-field"><span>Font</span><select value={font} onChange={(e) => setFont(e.target.value)}>{FONT_OPTIONS.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="tool-field"><span>Alignment</span><select value={align} onChange={(e) => setAlign(e.target.value as CanvasTextAlign)}><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></label>
          </div>

          <label className="tool-slider"><span>Text size <b>{fontSize}px</b></span><input type="range" min="32" max="180" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} /></label>
          <label className="tool-slider"><span>Blur <b>{blur.toFixed(1)}px</b></span><input type="range" min="0" max="8" step="0.5" value={blur} onChange={(e) => setBlur(Number(e.target.value))} /></label>
          <label className="tool-slider"><span>Line height <b>{lineHeight.toFixed(2)}</b></span><input type="range" min="0.75" max="1.45" step="0.05" value={lineHeight} onChange={(e) => setLineHeight(Number(e.target.value))} /></label>

          {mode === 'font' ? (
            <label className="tool-slider"><span>Letter spacing <b>{letterSpacing}px</b></span><input type="range" min="-6" max="36" step="1" value={letterSpacing} onChange={(e) => setLetterSpacing(Number(e.target.value))} /></label>
          ) : null}

          </div>
          <div className={`mobile-control-group ${mobileTab === 'effects' ? 'selected' : ''}`} data-mobile-group="effects">
          {mode !== 'font' ? (
            <label className="tool-field tool-upload"><span>Background image (optional)</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={onBackground} /><small>{backgroundName || 'PNG, JPG or WebP — stays in your browser'}</small></label>
          ) : null}

          {mode !== 'album' ? (
            <label className="tool-field"><span>Canvas size</span><select value={preset.label} onChange={(e) => setPreset(PRESETS.find((p) => p.label === e.target.value) || PRESETS[0])}>{PRESETS.map((item) => <option key={item.label} value={item.label}>{item.shortLabel}</option>)}</select></label>
          ) : <div className="tool-static-note">Album export: 3000 × 3000 px square</div>}

          <div className="tool-toggle-row">
            {mode === 'meme' ? <label><input type="checkbox" checked={lofi} onChange={(e) => setLofi(e.target.checked)} /> Lo-fi photo</label> : null}
            <label><input type="checkbox" checked={mirror} onChange={(e) => setMirror(e.target.checked)} /> Mirror</label>
            <label><input type="checkbox" checked={whiteBlock} onChange={(e) => setWhiteBlock(e.target.checked)} /> White block</label>
            {mode === 'font' ? <label><input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} /> Transparent BG</label> : null}
          </div>
          </div>
        </div>

        <div className="creative-tool-preview-wrap">
          <div className="creative-tool-preview-head"><span>Live preview</span><span>{actualPreset.width} × {actualPreset.height}</span></div>
          <div className="creative-tool-canvas-shell"><canvas ref={canvasRef} /></div>
          <div className="creative-tool-actions">
            <select aria-label="Download format" value={format} onChange={(e) => setFormat(e.target.value as ExportFormat)}><option value="png">PNG</option><option value="jpeg">JPG</option><option value="webp">WebP</option></select>
            <button className="tool-action primary" type="button" onClick={download}>Download</button>
            <button className="tool-action" type="button" onClick={copyImage}>Copy Image</button>
              <button className="tool-action mobile-share-image" type="button" onClick={shareImageMobile}>Share Image</button>
            <button className="tool-action subtle" type="button" onClick={reset}>Reset</button>
          </div>
          {exportError ? <p className="tool-export-error" role="alert">{exportError}</p> : null}
        </div>
      </div>
      <div className="creative-tool-mobile-export">
        <div className="creative-tool-actions">
          <select aria-label="Download format" value={format} onChange={e => setFormat(e.target.value as ExportFormat)}><option value="png">PNG</option><option value="jpeg">JPG</option><option value="webp">WebP</option></select>
          <button className="tool-action primary" type="button" onClick={download}>Download</button>
          <button className="tool-action" type="button" onClick={copyImage}>Copy Image</button>
              <button className="tool-action mobile-share-image" type="button" onClick={shareImageMobile}>Share Image</button>
          <button className="tool-action subtle" type="button" onClick={reset}>Reset</button>
        </div>
        {exportError ? <p className="tool-export-error" role="alert">{exportError}</p> : null}
      </div>
    </div>
  );
}
