'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

const presets = [
  { name: 'Brat green', bg: '#8ACE00', fg: '#111111' },
  { name: 'Pink', bg: '#FF7AB6', fg: '#111111' },
  { name: 'Electric blue', bg: '#3DB7FF', fg: '#111111' },
  { name: 'White', bg: '#FFFFFF', fg: '#111111' },
  { name: 'Black', bg: '#111111', fg: '#FFFFFF' },
];

const canvases = [
  { id: 'square', label: 'Square 1:1', width: 1500, height: 1500 },
  { id: 'portrait', label: 'Portrait 4:5', width: 1080, height: 1350 },
  { id: 'story', label: 'Story 9:16', width: 1080, height: 1920 },
  { id: 'wide', label: 'Wide 16:9', width: 1920, height: 1080 },
];

type ExportFormat = 'png' | 'jpeg' | 'webp';

function drawSpacedText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, spacing: number) {
  if (!text) return;
  const chars = [...text];
  const widths = chars.map((ch) => ctx.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + Math.max(0, chars.length - 1) * spacing;
  let cursor = x - total / 2;
  chars.forEach((ch, i) => {
    const width = widths[i];
    ctx.fillText(ch, cursor + width / 2, y);
    cursor += width + spacing;
  });
}

export default function BratGenerator() {
  const [text, setText] = useState('brat summer');
  const [bg, setBg] = useState('#8ACE00');
  const [fg, setFg] = useState('#111111');
  const [blur, setBlur] = useState(2);
  const [size, setSize] = useState(180);
  const [spacing, setSpacing] = useState(-3);
  const [canvasId, setCanvasId] = useState('square');
  const [format, setFormat] = useState<ExportFormat>('png');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasPreset = useMemo(() => canvases.find((item) => item.id === canvasId) ?? canvases[0], [canvasId]);

  const draw = (canvas: HTMLCanvasElement, exportMode = false) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvasPreset;
    const previewScale = exportMode ? 1 : Math.min(1, 900 / Math.max(width, height));
    const drawWidth = Math.max(1, Math.round(width * previewScale));
    const drawHeight = Math.max(1, Math.round(height * previewScale));
    canvas.width = drawWidth;
    canvas.height = drawHeight;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, drawWidth, drawHeight);

    const minDim = Math.min(drawWidth, drawHeight);
    const baseScale = minDim / 1500;
    const lines = (text || 'brat').toLowerCase().split('\n').slice(0, 4);
    let px = Math.max(48 * baseScale, size * baseScale);
    const maxTextWidth = drawWidth * 1.15;

    ctx.save();
    ctx.translate(drawWidth / 2, drawHeight / 2);
    ctx.scale(0.76, 1);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = fg;
    ctx.font = `400 ${px}px "Arial Narrow", "Liberation Sans Narrow", Arial, sans-serif`;

    const longest = lines.reduce((a, b) => (a.length > b.length ? a : b), '');
    const measured = ctx.measureText(longest).width + Math.max(0, longest.length - 1) * spacing * baseScale;
    if (measured > maxTextWidth) {
      px *= maxTextWidth / measured;
      ctx.font = `400 ${px}px "Arial Narrow", "Liberation Sans Narrow", Arial, sans-serif`;
    }

    ctx.filter = blur > 0 ? `blur(${Math.max(0.35, blur * baseScale)}px)` : 'none';
    const lineHeight = px * 0.96;
    const startY = -((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => drawSpacedText(ctx, line || ' ', 0, startY + i * lineHeight, spacing * baseScale));
    ctx.restore();
  };

  useEffect(() => {
    if (canvasRef.current) draw(canvasRef.current);
  }, [text, bg, fg, blur, size, spacing, canvasId]);

  const download = () => {
    const canvas = document.createElement('canvas');
    draw(canvas, true);
    const mime = format === 'png' ? 'image/png' : format === 'jpeg' ? 'image/jpeg' : 'image/webp';
    const ext = format === 'jpeg' ? 'jpg' : format;
    const a = document.createElement('a');
    a.download = `brat-design-${canvasPreset.width}x${canvasPreset.height}.${ext}`;
    a.href = canvas.toDataURL(mime, 0.94);
    document.body.appendChild(a);
    a.click();
    a.remove();
    trackEvent('brat_design_download', {
      export_format: ext,
      canvas_width: canvasPreset.width,
      canvas_height: canvasPreset.height,
      canvas_ratio: canvasId,
    });
  };

  const selectPreset = (p: typeof presets[number]) => {
    setBg(p.bg);
    setFg(p.fg);
  };

  return (
    <div className="generator-grid">
      <div className="reveal">
        <div className="glass generator-controls">
          <div className="control-group">
            <label className="control-label" htmlFor="bratText">Your text</label>
            <textarea id="bratText" rows={2} maxLength={60} placeholder="brat summer" value={text} onChange={(e) => setText(e.target.value)} />
            <p className="control-note">{text.length}/60 · use Enter for a new line</p>
          </div>

          <div className="control-group">
            <p className="control-label">Colour preset</p>
            <div className="preset-row">
              {presets.map((p) => (
                <button
                  type="button"
                  key={p.name}
                  aria-label={`Use ${p.name} preset`}
                  title={p.name}
                  className={`preset-dot ${bg.toUpperCase() === p.bg.toUpperCase() ? 'active' : ''}`}
                  style={{ background: p.bg }}
                  onClick={() => selectPreset(p)}
                />
              ))}
            </div>
          </div>

          <div className="color-grid">
            <label className="control-label">Background<input aria-label="Background colour" type="color" value={bg} onChange={(e) => setBg(e.target.value)} /></label>
            <label className="control-label">Text colour<input aria-label="Text colour" type="color" value={fg} onChange={(e) => setFg(e.target.value)} /></label>
          </div>

          <div className="range-group">
            <div><span className="control-label">Blur</span><span className="control-note">{blur}px</span></div>
            <input aria-label="Blur amount" type="range" min="0" max="8" step="0.5" value={blur} onChange={(e) => setBlur(Number(e.target.value))} />
          </div>

          <div className="range-group">
            <div><span className="control-label">Text size</span><span className="control-note">{size}</span></div>
            <input aria-label="Text size" type="range" min="80" max="300" step="5" value={size} onChange={(e) => setSize(Number(e.target.value))} />
          </div>

          <div className="range-group">
            <div><span className="control-label">Letter spacing</span><span className="control-note">{spacing}px</span></div>
            <input aria-label="Letter spacing" type="range" min="-10" max="12" step="1" value={spacing} onChange={(e) => setSpacing(Number(e.target.value))} />
          </div>

          <div className="generator-options-grid">
            <label className="control-label">Canvas size
              <select value={canvasId} onChange={(e) => setCanvasId(e.target.value)}>
                {canvases.map((item) => <option key={item.id} value={item.id}>{item.label} · {item.width}×{item.height}</option>)}
              </select>
            </label>
            <div>
              <p className="control-label">Export format</p>
              <div className="format-row" role="group" aria-label="Export format">
                {(['png', 'jpeg', 'webp'] as ExportFormat[]).map((item) => (
                  <button type="button" key={item} className={format === item ? 'active' : ''} onClick={() => setFormat(item)}>{item === 'jpeg' ? 'JPG' : item.toUpperCase()}</button>
                ))}
              </div>
            </div>
          </div>

          <button type="button" className="download-btn glow-brat" onClick={download}>Download {format === 'jpeg' ? 'JPG' : format.toUpperCase()} ({canvasPreset.width}×{canvasPreset.height})</button>
        </div>
      </div>

      <div className="reveal reveal-delay-1">
        <div className="glass preview-shell">
          <div className="preview-top"><span className="dot pink"/><span className="dot brat"/><span className="dot electric"/><span>live preview</span></div>
          <div className="preview-canvas-wrap" style={{ aspectRatio: `${canvasPreset.width}/${canvasPreset.height}` }}><canvas ref={canvasRef} /></div>
          <p>Exports at {canvasPreset.width}×{canvasPreset.height} with no watermark. Rendering stays in your browser.</p>
        </div>
      </div>
    </div>
  );
}
