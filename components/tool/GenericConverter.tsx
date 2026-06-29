"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ImageUploader from "./ImageUploader";
import { convertGeneric, GenericResult } from "@/lib/generic";
import { DitherMethod } from "@/lib/converter";

const SIZES = [32, 64, 128, 256];
const COLOR_OPTS = [
  { v: 0, label: "Full color" },
  { v: 8, label: "8 colors" },
  { v: 16, label: "16 colors" },
  { v: 32, label: "32 colors" },
  { v: 64, label: "64 colors" },
];

export default function GenericConverter() {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState<GenericResult | null>(null);
  const [width, setWidth] = useState(64);
  const [colors, setColors] = useState(0);
  const [dither, setDither] = useState<DitherMethod>("none");
  const [zoom, setZoom] = useState(6);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onImage = useCallback((data: ImageData, prev: string) => {
    setImageData(data); setPreview(prev); setResult(null);
  }, []);

  function generate() {
    if (!imageData) return;
    setResult(convertGeneric(imageData, width, { colors, dither }));
  }

  useEffect(() => {
    if (result) setZoom(result.width <= 32 ? 12 : result.width <= 64 ? 8 : result.width <= 128 ? 5 : 3);
  }, [result]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !result) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = result.width * zoom;
    canvas.height = result.height * zoom;
    for (const row of result.cells) for (const c of row) {
      ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
      ctx.fillRect(c.x * zoom, c.y * zoom, zoom, zoom);
    }
  }, [result, zoom]);

  function downloadPNG(scale: number) {
    if (!result) return;
    const off = document.createElement("canvas");
    off.width = result.width * scale; off.height = result.height * scale;
    const ctx = off.getContext("2d")!;
    for (const row of result.cells) for (const c of row) {
      ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
      ctx.fillRect(c.x * scale, c.y * scale, scale, scale);
    }
    const a = document.createElement("a");
    a.download = "pixel-art.png";
    a.href = off.toDataURL("image/png");
    a.click();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-5">
        <ImageUploader onImageLoaded={onImage} />
        {preview && (
          <div className="card overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Original uploaded image" className="w-full max-h-44 object-contain bg-[var(--color-surface-alt)]" />
          </div>
        )}
        <div className="card p-4 space-y-4">
          <h2 className="text-sm font-semibold">Settings</h2>
          <div>
            <label className="text-xs text-[var(--color-muted)] block mb-1.5">Pixel size (width)</label>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button key={s} onClick={() => setWidth(s)} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${width === s ? "bg-[var(--color-accent-light)] border-[var(--color-accent)] text-[var(--color-accent-dark)]" : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent)]"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-[var(--color-muted)] block mb-1.5">Colors (palette)</label>
            <select value={colors} onChange={(e) => setColors(Number(e.target.value))} className="w-full py-2 px-3 rounded-lg text-sm border border-[var(--color-line)] bg-white">
              {COLOR_OPTS.map((o) => <option key={o.v} value={o.v}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-[var(--color-muted)] block mb-1.5">Dithering</label>
            <select value={dither} onChange={(e) => setDither(e.target.value as DitherMethod)} className="w-full py-2 px-3 rounded-lg text-sm border border-[var(--color-line)] bg-white">
              <option value="none">None</option>
              <option value="floyd">Floyd–Steinberg</option>
              <option value="ordered">Ordered</option>
            </select>
          </div>
          <button onClick={generate} disabled={!imageData} className="btn btn-primary w-full">
            {imageData ? "✨ Convert to Pixel Art" : "Upload an image first"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {result ? (
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-line)]">
              <span className="text-sm font-semibold">Result <span className="text-[var(--color-muted)] font-normal">· {result.width}×{result.height} · {result.colorCount} colors</span></span>
              <div className="flex gap-1">
                <button onClick={() => setZoom((z) => Math.max(1, z - 1))} className="w-7 h-7 rounded border border-[var(--color-line)] text-[var(--color-muted)]">−</button>
                <button onClick={() => setZoom((z) => Math.min(20, z + 1))} className="w-7 h-7 rounded border border-[var(--color-line)] text-[var(--color-muted)]">+</button>
              </div>
            </div>
            <div className="bg-[var(--color-surface-alt)] overflow-auto max-h-[420px] flex items-center justify-center p-3">
              <canvas ref={canvasRef} style={{ imageRendering: "pixelated", maxWidth: "100%" }} />
            </div>
            <div className="p-3 border-t border-[var(--color-line)] flex gap-2">
              <button onClick={() => downloadPNG(1)} className="btn btn-ghost flex-1">PNG (actual)</button>
              <button onClick={() => downloadPNG(8)} className="btn btn-primary flex-1">PNG (8× upscaled)</button>
            </div>
          </div>
        ) : (
          <div className="card h-full min-h-[300px] flex items-center justify-center text-center p-8">
            <p className="text-[var(--color-muted)] text-sm">Upload an image and convert to see your pixel art here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
