"use client";

import { useEffect, useRef, useState } from "react";
import { ConversionResult } from "@/lib/converter";

interface Props {
  result: ConversionResult;
  showGrid: boolean;
}

export default function PixelCanvas({ result, showGrid }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const texCache = useRef<Map<string, HTMLImageElement>>(new Map());
  const [zoom, setZoom] = useState(8);
  const [textured, setTextured] = useState(true);
  const [texReady, setTexReady] = useState(0); // bump to trigger redraw as textures load
  const [hover, setHover] = useState<{ x: number; y: number; name: string } | null>(null);

  // Auto-fit initial zoom to the block width so large outputs stay readable.
  useEffect(() => {
    const fit = result.width <= 32 ? 12 : result.width <= 64 ? 8 : 5;
    setZoom(fit);
  }, [result.width]);

  // Preload textures for every block used in this result.
  useEffect(() => {
    const ids = new Set<string>();
    for (const row of result.pixels) for (const c of row) ids.add(c.block.id);
    let pending = 0;
    ids.forEach((id) => {
      if (texCache.current.has(id)) return;
      pending++;
      const img = new Image();
      img.onload = () => setTexReady((n) => n + 1);
      img.onerror = () => setTexReady((n) => n + 1);
      img.src = `/textures/${id}.png`;
      texCache.current.set(id, img);
    });
    if (pending === 0) setTexReady((n) => n + 1);
  }, [result]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const { pixels, width, height } = result;
    canvas.width = width * zoom;
    canvas.height = height * zoom;
    ctx.imageSmoothingEnabled = false;

    for (const row of pixels) {
      for (const { block, x, y, r, g, b } of row) {
        const px = x * zoom, py = y * zoom;
        const img = textured ? texCache.current.get(block.id) : undefined;
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, px, py, zoom, zoom);
        } else {
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(px, py, zoom, zoom);
        }
      }
    }
    if (showGrid && zoom >= 4) {
      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= width; x++) { ctx.beginPath(); ctx.moveTo(x * zoom, 0); ctx.lineTo(x * zoom, height * zoom); ctx.stroke(); }
      for (let y = 0; y <= height; y++) { ctx.beginPath(); ctx.moveTo(0, y * zoom); ctx.lineTo(width * zoom, y * zoom); ctx.stroke(); }
    }
  }, [result, showGrid, zoom, textured, texReady]);

  function onMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const gx = Math.floor((((e.clientX - rect.left) * (canvas.width / rect.width)) / zoom));
    const gy = Math.floor((((e.clientY - rect.top) * (canvas.height / rect.height)) / zoom));
    if (gx >= 0 && gy >= 0 && gy < result.pixels.length && gx < result.pixels[0].length) {
      setHover({ x: e.clientX - rect.left, y: e.clientY - rect.top, name: result.pixels[gy][gx].block.name });
    }
  }

  function downloadPNG() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = "minecraft-pixel-art.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-line)]">
        <span className="text-sm font-semibold">
          Preview <span className="text-[var(--color-muted)] font-normal">· {result.width}×{result.height} blocks</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTextured((t) => !t)}
            className={`text-xs px-2 py-1 rounded border transition-colors ${textured ? "border-[var(--color-accent)] text-[var(--color-accent-dark)] bg-[var(--color-accent-light)]" : "border-[var(--color-line)] text-[var(--color-muted)]"}`}
          >
            {textured ? "Textured" : "Flat color"}
          </button>
          <button onClick={() => setZoom((z) => Math.max(2, z - 2))} className="w-7 h-7 rounded border border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-accent)]" aria-label="Zoom out">−</button>
          <button onClick={() => setZoom((z) => Math.min(24, z + 2))} className="w-7 h-7 rounded border border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-accent)]" aria-label="Zoom in">+</button>
        </div>
      </div>

      <div className="relative bg-[var(--color-surface-alt)] overflow-auto max-h-[460px] flex items-center justify-center p-3">
        <canvas
          ref={canvasRef}
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
          style={{ imageRendering: "pixelated", maxWidth: "100%" }}
        />
        {hover && (
          <div className="pointer-events-none absolute z-10 px-2 py-1 rounded bg-[var(--color-ink)] text-white text-xs whitespace-nowrap" style={{ left: hover.x + 12, top: hover.y + 12 }}>
            {hover.name}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-[var(--color-line)]">
        <button onClick={downloadPNG} className="btn btn-primary w-full">⬇ Download PNG</button>
      </div>
    </div>
  );
}
