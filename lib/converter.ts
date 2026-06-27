import { MinecraftBlock, PALETTES, PaletteKey, isSurvivalBlock, SHADE_MULTIPLIERS } from "./blocks";

// A color target the matcher aims at. In flat mode there's one per block; in
// staircase mode each block expands into shaded variants (map-art technique:
// the same block placed at different heights reads as a different map color).
interface Target {
  block: MinecraftBlock;
  r: number;
  g: number;
  b: number;
}

function buildTargets(palette: MinecraftBlock[], staircase: boolean): Target[] {
  if (!staircase) return palette.map((b) => ({ block: b, r: b.r, g: b.g, b: b.b }));
  const out: Target[] = [];
  for (const block of palette) {
    for (const m of SHADE_MULTIPLIERS) {
      out.push({
        block,
        r: Math.round(block.r * m),
        g: Math.round(block.g * m),
        b: Math.round(block.b * m),
      });
    }
  }
  return out;
}

function findClosest(r: number, g: number, b: number, targets: Target[]): Target {
  let best = targets[0];
  let bestDist = Infinity;
  for (const t of targets) {
    const dr = r - t.r, dg = g - t.g, db = b - t.b;
    const dist = dr * dr + dg * dg + db * db;
    if (dist < bestDist) { bestDist = dist; best = t; }
  }
  return best;
}

export interface PixelBlock {
  block: MinecraftBlock;
  x: number;
  y: number;
  // Rendered color — equals the block color in flat mode, or the shaded color
  // in staircase mode. Used for preview/PNG; material counts use block.id.
  r: number;
  g: number;
  b: number;
}

export interface ConversionResult {
  pixels: PixelBlock[][];
  width: number;
  height: number;
  materialCounts: Record<string, { block: MinecraftBlock; count: number }>;
}

export interface ConvertOptions {
  /** Only match against blocks obtainable in survival mode. */
  survivalOnly?: boolean;
  /** Expand the palette into shaded variants (map-art "staircase" shading). */
  staircase?: boolean;
}

export function convertImage(
  imageData: ImageData,
  outputWidth: number,
  paletteKey: PaletteKey,
  options: ConvertOptions = {}
): ConversionResult {
  let palette = PALETTES[paletteKey];
  if (options.survivalOnly) {
    const filtered = palette.filter(isSurvivalBlock);
    if (filtered.length) palette = filtered;
  }
  const targets = buildTargets(palette, !!options.staircase);

  const srcWidth = imageData.width;
  const srcHeight = imageData.height;
  const outputHeight = Math.round((srcHeight / srcWidth) * outputWidth);

  const pixels: PixelBlock[][] = [];
  const materialCounts: Record<string, { block: MinecraftBlock; count: number }> = {};

  for (let py = 0; py < outputHeight; py++) {
    const row: PixelBlock[] = [];
    for (let px = 0; px < outputWidth; px++) {
      const sx = Math.floor((px / outputWidth) * srcWidth);
      const sy = Math.floor((py / outputHeight) * srcHeight);
      const idx = (sy * srcWidth + sx) * 4;
      const r = imageData.data[idx];
      const g = imageData.data[idx + 1];
      const b = imageData.data[idx + 2];

      const t = findClosest(r, g, b, targets);
      row.push({ block: t.block, x: px, y: py, r: t.r, g: t.g, b: t.b });

      if (!materialCounts[t.block.id]) {
        materialCounts[t.block.id] = { block: t.block, count: 0 };
      }
      materialCounts[t.block.id].count++;
    }
    pixels.push(row);
  }

  return { pixels, width: outputWidth, height: outputHeight, materialCounts };
}
