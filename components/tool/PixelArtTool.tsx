"use client";

import { useCallback, useState } from "react";
import ImageUploader from "./ImageUploader";
import PixelCanvas from "./PixelCanvas";
import MaterialList from "./MaterialList";
import ExportPanel from "./ExportPanel";
import { ConversionResult } from "@/lib/converter";
import { runConvert } from "@/lib/runConvert";
import { PaletteKey } from "@/lib/blocks";

const SIZES = [32, 64, 128];

interface Props {
  /** Lock to the official map-color palette and default to 128 width (for /map-art). */
  mapMode?: boolean;
  defaultWidth?: number;
}

export default function PixelArtTool({ mapMode = false, defaultWidth }: Props) {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [width, setWidth] = useState(defaultWidth ?? (mapMode ? 128 : 64));
  const [palette, setPalette] = useState<PaletteKey>(mapMode ? "map" : "concrete");
  const [survivalOnly, setSurvivalOnly] = useState(false);
  const [staircase, setStaircase] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [loading, setLoading] = useState(false);

  // Staircase shading only makes sense for map art (map colors at varied heights).
  const showStaircase = mapMode || palette === "map";

  const onImage = useCallback((data: ImageData, prev: string) => {
    setImageData(data);
    setPreview(prev);
    setResult(null);
  }, []);

  async function generate() {
    if (!imageData) return;
    setLoading(true);
    try {
      const r = await runConvert({
        imageData,
        outputWidth: width,
        paletteKey: palette,
        survivalOnly,
        staircase: showStaircase && staircase,
      });
      setResult(r);
    } finally {
      setLoading(false);
    }
  }

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
                type="number"
                min={8}
                max={256}
                value={width}
                onChange={(e) => setWidth(Math.max(8, Math.min(256, Number(e.target.value) || 8)))}
                className="w-20 py-2 px-2 rounded-lg text-sm border border-[var(--color-line)] text-center"
                aria-label="Custom width"
              />
            </div>
            {width === 128 && (
              <p className="text-xs text-[var(--color-accent-dark)] mt-1.5">📐 Map art size — one full Minecraft map (128×128).</p>
            )}
          </div>

          {!mapMode && (
            <div>
              <label className="text-xs text-[var(--color-muted)] block mb-1.5">Block palette</label>
              <select
                value={palette}
                onChange={(e) => setPalette(e.target.value as PaletteKey)}
                className="w-full py-2 px-3 rounded-lg text-sm border border-[var(--color-line)] bg-white"
              >
                <option value="all">All blocks (most accurate)</option>
                <option value="concrete">Concrete (most vibrant)</option>
                <option value="wool">Wool</option>
                <option value="terracotta">Terracotta (earthy)</option>
                <option value="map">Map colors</option>
              </select>
            </div>
          )}

          {showStaircase && (
            <div>
              <label className="text-xs text-[var(--color-muted)] block mb-1.5">Shading mode</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setStaircase(false)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${!staircase ? "bg-[var(--color-accent-light)] border-[var(--color-accent)] text-[var(--color-accent-dark)]" : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent)]"}`}
                >
                  Flat (~58 colors)
                </button>
                <button
                  onClick={() => setStaircase(true)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${staircase ? "bg-[var(--color-accent-light)] border-[var(--color-accent)] text-[var(--color-accent-dark)]" : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent)]"}`}
                >
                  Staircase (3D)
                </button>
              </div>
            </div>
          )}

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={survivalOnly} onChange={(e) => setSurvivalOnly(e.target.checked)} className="accent-[var(--color-accent)] w-4 h-4" />
            <span className="text-sm text-[var(--color-ink-soft)]">Survival-friendly blocks only</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} className="accent-[var(--color-accent)] w-4 h-4" />
            <span className="text-sm text-[var(--color-ink-soft)]">Show grid overlay</span>
          </label>

          <button onClick={generate} disabled={!imageData || loading} className="btn btn-primary w-full">
            {loading ? "Converting…" : "⛏ Generate Pixel Art"}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-5">
        {result ? (
          <>
            <PixelCanvas result={result} showGrid={showGrid} />
            <ExportPanel result={result} />
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
