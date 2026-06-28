"use client";

import { useCallback, useMemo, useState } from "react";
import ImageUploader from "./ImageUploader";
import PixelCanvas from "./PixelCanvas";
import MaterialList from "./MaterialList";
import ExportPanel from "./ExportPanel";
import BlockPicker from "./BlockPicker";
import { ConversionResult, DitherMethod } from "@/lib/converter";
import { Orientation } from "@/lib/schematic";
import { runConvert } from "@/lib/runConvert";
import { autoPaletteFromImage } from "@/lib/autoPalette";
import { BLOCKS, MAP_COLORS, DEFAULT_SELECTED_IDS, isSurvivalBlock, MinecraftBlock } from "@/lib/blocks";

const SIZES = [32, 64, 128];

interface Props {
  /** Lock to the official map-color palette and default to 128 width (for /map-art). */
  mapMode?: boolean;
  defaultWidth?: number;
}

interface Filters {
  survivalOnly: boolean;
  noFalling: boolean;
  noTransparent: boolean;
  noLight: boolean;
  noRedstone: boolean;
}

export default function PixelArtTool({ mapMode = false, defaultWidth }: Props) {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [width, setWidth] = useState(defaultWidth ?? (mapMode ? 128 : 64));
  const [dither, setDither] = useState<DitherMethod>("none");
  const [staircase, setStaircase] = useState(false);
  const [orientation, setOrientation] = useState<Orientation>(mapMode ? "floor" : "wall");
  const [showGrid, setShowGrid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<Set<string>>(() => new Set(DEFAULT_SELECTED_IDS));
  const [filters, setFilters] = useState<Filters>({
    survivalOnly: false, noFalling: false, noTransparent: false, noLight: false, noRedstone: false,
  });

  const onImage = useCallback((data: ImageData, prev: string) => {
    setImageData(data);
    setPreview(prev);
    setResult(null);
  }, []);

  // A block is filtered out (disabled) if it fails any active attribute filter.
  const isDisabled = useCallback(
    (b: MinecraftBlock) =>
      (filters.survivalOnly && !isSurvivalBlock(b)) ||
      (filters.noFalling && !!b.falling) ||
      (filters.noTransparent && !!b.transparent) ||
      (filters.noLight && !!b.light) ||
      (filters.noRedstone && !!b.redstone),
    [filters]
  );

  // Effective palette: map mode uses official map colors; otherwise the picked
  // blocks minus anything excluded by the active filters.
  const palette = useMemo<MinecraftBlock[]>(() => {
    if (mapMode) return MAP_COLORS;
    return BLOCKS.filter((b) => selected.has(b.id) && !isDisabled(b));
  }, [mapMode, selected, isDisabled]);

  const showStaircase = mapMode;

  function toggleBlock(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function setCategory(ids: string[], select: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const id of ids) { if (select) next.add(id); else next.delete(id); }
      return next;
    });
  }

  async function generate() {
    if (!imageData || palette.length === 0) return;
    setLoading(true);
    try {
      const r = await runConvert({
        imageData, outputWidth: width, palette,
        staircase: showStaircase && staircase, dither,
      });
      setResult(r);
    } finally {
      setLoading(false);
    }
  }

  const filterDefs: { key: keyof Filters; label: string }[] = [
    { key: "survivalOnly", label: "Survival only" },
    { key: "noFalling", label: "No falling" },
    { key: "noTransparent", label: "No transparent" },
    { key: "noLight", label: "No light sources" },
    { key: "noRedstone", label: "No redstone" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="space-y-5">
        <ImageUploader onImageLoaded={onImage} />

        {preview && (
          <div className="card overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Original uploaded image preview" className="w-full max-h-44 object-contain bg-[var(--color-surface-alt)]" />
          </div>
        )}

        <div className="card p-4 space-y-4">
          <h2 className="text-sm font-semibold">Settings</h2>

          {/* Width */}
          <div>
            <label className="text-xs text-[var(--color-muted)] block mb-1.5">Output width (blocks)</label>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setWidth(s)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    width === s
                      ? "bg-[var(--color-accent-light)] border-[var(--color-accent)] text-[var(--color-accent-dark)]"
                      : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent)]"
                  }`}
                >
                  {s}
                </button>
              ))}
              <input
                type="number" min={8} max={256} value={width}
                onChange={(e) => setWidth(Math.max(8, Math.min(256, Number(e.target.value) || 8)))}
                className="w-20 py-2 px-2 rounded-lg text-sm border border-[var(--color-line)] text-center"
                aria-label="Custom width"
              />
            </div>
            {width === 128 && (
              <p className="text-xs text-[var(--color-accent-dark)] mt-1.5">📐 Map art size — one full Minecraft map (128×128).</p>
            )}
          </div>

          {/* Dithering */}
          <div>
            <label className="text-xs text-[var(--color-muted)] block mb-1.5">Dithering</label>
            <select
              value={dither}
              onChange={(e) => setDither(e.target.value as DitherMethod)}
              className="w-full py-2 px-3 rounded-lg text-sm border border-[var(--color-line)] bg-white"
            >
              <option value="none">None (flat blocks)</option>
              <option value="floyd">Floyd–Steinberg (smoothest)</option>
              <option value="ordered">Ordered (retro pattern)</option>
            </select>
          </div>

          {showStaircase && (
            <div>
              <label className="text-xs text-[var(--color-muted)] block mb-1.5">Shading mode</label>
              <div className="flex gap-2">
                <button onClick={() => setStaircase(false)} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${!staircase ? "bg-[var(--color-accent-light)] border-[var(--color-accent)] text-[var(--color-accent-dark)]" : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent)]"}`}>Flat (2D)</button>
                <button onClick={() => setStaircase(true)} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${staircase ? "bg-[var(--color-accent-light)] border-[var(--color-accent)] text-[var(--color-accent-dark)]" : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent)]"}`}>Staircase (3D)</button>
              </div>
            </div>
          )}

          {/* Build orientation — affects exported schematic/mcfunction coordinates */}
          <div>
            <label className="text-xs text-[var(--color-muted)] block mb-1.5">Build orientation (export)</label>
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value as Orientation)}
              className="w-full py-2 px-3 rounded-lg text-sm border border-[var(--color-line)] bg-white"
            >
              <option value="wall">Vertical wall (mural)</option>
              <option value="floor">Flat on ground (map art)</option>
            </select>
          </div>

          {/* Block palette picker (hidden in map mode) */}
          {!mapMode && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-[var(--color-muted)]">Blocks ({palette.length} active)</label>
                <div className="flex gap-2 text-xs">
                  <button
                    onClick={() => imageData && setSelected(new Set(autoPaletteFromImage(imageData)))}
                    disabled={!imageData}
                    className="text-[var(--color-accent-dark)] font-medium hover:underline disabled:opacity-40 disabled:no-underline"
                    title="Pick the blocks that best match your uploaded image"
                  >
                    ✨ Auto-pick
                  </button>
                  <button onClick={() => setSelected(new Set(BLOCKS.map((b) => b.id)))} className="text-[var(--color-accent-dark)] hover:underline">All</button>
                  <button onClick={() => setSelected(new Set())} className="text-[var(--color-muted)] hover:underline">Clear</button>
                </div>
              </div>

              {/* Attribute filters */}
              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2.5">
                {filterDefs.map((f) => (
                  <label key={f.key} className="flex items-center gap-1.5 cursor-pointer text-xs text-[var(--color-ink-soft)]">
                    <input
                      type="checkbox"
                      checked={filters[f.key]}
                      onChange={(e) => setFilters((p) => ({ ...p, [f.key]: e.target.checked }))}
                      className="accent-[var(--color-accent)] w-3.5 h-3.5"
                    />
                    {f.label}
                  </label>
                ))}
              </div>

              <BlockPicker selected={selected} isDisabled={isDisabled} onToggle={toggleBlock} onSetCategory={setCategory} />
            </div>
          )}

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} className="accent-[var(--color-accent)] w-4 h-4" />
            <span className="text-sm text-[var(--color-ink-soft)]">Show grid overlay</span>
          </label>

          <button onClick={generate} disabled={!imageData || loading || palette.length === 0} className="btn btn-primary w-full">
            {loading ? "Converting…" : palette.length === 0 ? "Select at least one block" : "⛏ Generate Pixel Art"}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-5">
        {result ? (
          <>
            <PixelCanvas result={result} showGrid={showGrid} brushBlocks={palette} onResultChange={setResult} />
            <ExportPanel result={result} orientation={orientation} />
            <MaterialList result={result} />
          </>
        ) : (
          <div className="card h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8">
            <div className="grid grid-cols-6 gap-1 opacity-25 mb-4">
              {["#16a34a","#22c55e","#a16207","#16a34a","#22c55e","#15803d","#a16207","#16a34a","#15803d","#22c55e","#a16207","#16a34a"].map((c, i) => (
                <span key={i} className="w-4 h-4 rounded-sm" style={{ background: c }} />
              ))}
            </div>
            <p className="text-[var(--color-muted)] text-sm">Upload an image and hit generate to see your pixel art here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
