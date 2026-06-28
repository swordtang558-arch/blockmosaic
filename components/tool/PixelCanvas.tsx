"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ConversionResult, PixelBlock } from "@/lib/converter";
import { MinecraftBlock } from "@/lib/blocks";

interface Props {
  result: ConversionResult;
  showGrid: boolean;
  brushBlocks: MinecraftBlock[];
  onResultChange: (r: ConversionResult) => void;
}

export default function PixelCanvas({ result, showGrid, brushBlocks, onResultChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const texCache = useRef<Map<string, HTMLImageElement>>(new Map());
  // Live editable copy of the grid (mutated during brush strokes, committed on mouse-up).
  const gridRef = useRef<PixelBlock[][]>(result.pixels);
  const paintingRef = useRef(false);
  const dirtyRef = useRef(false);

  const [zoom, setZoom] = useState(8);
  const [textured, setTextured] = useState(true);
  const [texReady, setTexReady] = useState(0);
  const [hover, setHover] = useState<{ x: number; y: number; name: string } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [brushId, setBrushId] = useState<string>(brushBlocks[0]?.id ?? "");
  const [brushSize, setBrushSize] = useState(1);

  // Sync the editable grid whenever the result object changes (new conversion or commit).
  useEffect(() => { gridRef.current = result.pixels; }, [result]);
  // Re-fit zoom only when the grid dimensions change — not on every brush commit.
  useEffect(() => {
    const fit = result.width <= 32 ? 12 : result.width <= 64 ? 8 : 5;
    setZoom(fit);
  }, [result.width, result.height]);

  useEffect(() => {
    if (brushBlocks.length && !brushBlocks.some((b) => b.id === brushId)) setBrushId(brushBlocks[0].id);
  }, [brushBlocks, brushId]);

  // Preload textures for every block that could appear (result + brush palette).
  useEffect(() => {
    const ids = new Set<string>();
    for (const row of result.pixels) for (const c of row) ids.add(c.block.id);
    for (const b of brushBlocks) ids.add(b.id);
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
    if (!pending) setTexReady((n) => n + 1);
  }, [result, brushBlocks]);

  const drawCell = useCallback((ctx: CanvasRenderingContext2D, cell: PixelBlock, z: number) => {
    const px = cell.x * z, py = cell.y * z;
    const img = textured ? texCache.current.get(cell.block.id) : undefined;
    if (img && img.complete && img.naturalWidth > 0) ctx.drawImage(img, px, py, z, z);
    else { ctx.fillStyle = `rgb(${cell.r},${cell.g},${cell.b})`; ctx.fillRect(px, py, z, z); }
  }, [textured]);

  const fullDraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const grid = gridRef.current;
    const width = result.width, height = result.height;
    canvas.width = width * zoom;
    canvas.height = height * zoom;
    ctx.imageSmoothingEnabled = false;
    for (const row of grid) for (const cell of row) drawCell(ctx, cell, zoom);
    if (showGrid && zoom >= 4) {
      ctx.strokeStyle = "rgba(0,0,0,0.18)"; ctx.lineWidth = 0.5;
      for (let x = 0; x <= width; x++) { ctx.beginPath(); ctx.moveTo(x * zoom, 0); ctx.lineTo(x * zoom, height * zoom); ctx.stroke(); }
      for (let y = 0; y <= height; y++) { ctx.beginPath(); ctx.moveTo(0, y * zoom); ctx.lineTo(width * zoom, y * zoom); ctx.stroke(); }
    }
  }, [result, zoom, showGrid, drawCell]);

  useEffect(() => { fullDraw(); }, [fullDraw, texReady]);

  function cellAt(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const gx = Math.floor(((e.clientX - rect.left) * (canvas.width / rect.width)) / zoom);
    const gy = Math.floor(((e.clientY - rect.top) * (canvas.height / rect.height)) / zoom);
    return { gx, gy, lx: e.clientX - rect.left, ly: e.clientY - rect.top };
  }

  function paintAt(gx: number, gy: number) {
    const block = brushBlocks.find((b) => b.id === brushId);
    if (!block) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const grid = gridRef.current;
    const rad = brushSize - 1;
    for (let dy = -rad; dy <= rad; dy++) for (let dx = -rad; dx <= rad; dx++) {
      const x = gx + dx, y = gy + dy;
      if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) continue;
      const cell = grid[y][x];
      cell.block = block; cell.r = block.r; cell.g = block.g; cell.b = block.b;
      drawCell(ctx, cell, zoom);
    }
    dirtyRef.current = true;
  }

  function commit() {
    if (!dirtyRef.current) return;
    dirtyRef.current = false;
    const materialCounts: ConversionResult["materialCounts"] = {};
    for (const row of gridRef.current) for (const c of row) {
      if (!materialCounts[c.block.id]) materialCounts[c.block.id] = { block: c.block, count: 0 };
      materialCounts[c.block.id].count++;
    }
    onResultChange({ pixels: gridRef.current, width: result.width, height: result.height, materialCounts });
  }

  function onMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!editMode) return;
    paintingRef.current = true;
    const { gx, gy } = cellAt(e);
    paintAt(gx, gy);
  }
  function onMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const { gx, gy, lx, ly } = cellAt(e);
    if (editMode && paintingRef.current) { paintAt(gx, gy); return; }
    const grid = gridRef.current;
    if (gx >= 0 && gy >= 0 && gy < grid.length && gx < grid[0].length) {
      setHover({ x: lx, y: ly, name: grid[gy][gx].block.name });
    }
  }
  function endStroke() {
    if (paintingRef.current) { paintingRef.current = false; commit(); }
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
          <button onClick={() => setEditMode((v) => !v)} className={`text-xs px-2 py-1 rounded border transition-colors ${editMode ? "border-[var(--color-accent)] text-[var(--color-accent-dark)] bg-[var(--color-accent-light)]" : "border-[var(--color-line)] text-[var(--color-muted)]"}`}>
            {editMode ? "✏️ Editing" : "Edit"}
          </button>
          <button onClick={() => setTextured((t) => !t)} className={`text-xs px-2 py-1 rounded border transition-colors ${textured ? "border-[var(--color-accent)] text-[var(--color-accent-dark)] bg-[var(--color-accent-light)]" : "border-[var(--color-line)] text-[var(--color-muted)]"}`}>
            {textured ? "Textured" : "Flat color"}
          </button>
          <button onClick={() => setZoom((z) => Math.max(2, z - 2))} className="w-7 h-7 rounded border border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-accent)]" aria-label="Zoom out">−</button>
          <button onClick={() => setZoom((z) => Math.min(24, z + 2))} className="w-7 h-7 rounded border border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-accent)]" aria-label="Zoom in">+</button>
        </div>
      </div>

      {/* Brush toolbar */}
      {editMode && (
        <div className="px-4 py-2.5 border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[var(--color-muted)]">Brush</span>
            <button onClick={() => setBrushSize((s) => Math.max(1, s - 1))} className="w-6 h-6 rounded border border-[var(--color-line)] text-[var(--color-muted)]">−</button>
            <span className="text-xs w-4 text-center tabular-nums">{brushSize}</span>
            <button onClick={() => setBrushSize((s) => Math.min(8, s + 1))} className="w-6 h-6 rounded border border-[var(--color-line)] text-[var(--color-muted)]">+</button>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto max-w-full">
            {brushBlocks.map((b) => (
              <button
                key={b.id}
                title={b.name}
                onClick={() => setBrushId(b.id)}
                className={`w-6 h-6 rounded-sm flex-shrink-0 transition-all ${brushId === b.id ? "ring-2 ring-[var(--color-accent)] ring-offset-1" : "ring-1 ring-black/10 opacity-60 hover:opacity-100"}`}
                style={{ backgroundColor: `rgb(${b.r},${b.g},${b.b})`, backgroundImage: `url(/textures/${b.id}.png)`, backgroundSize: "cover", imageRendering: "pixelated" }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="relative bg-[var(--color-surface-alt)] overflow-auto max-h-[460px] flex items-center justify-center p-3">
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMove}
          onMouseUp={endStroke}
          onMouseLeave={() => { setHover(null); endStroke(); }}
          style={{ imageRendering: "pixelated", maxWidth: "100%", cursor: editMode ? "crosshair" : "default" }}
        />
        {hover && !editMode && (
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
