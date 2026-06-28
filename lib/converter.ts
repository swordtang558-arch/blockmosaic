import { MinecraftBlock, SHADE_MULTIPLIERS } from "./blocks";

export type DitherMethod = "none" | "floyd" | "ordered";

// A color target the matcher aims at. In flat mode there's one per block; in
// staircase mode each block expands into shaded variants (map-art technique).
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
  // Rendered color — block color in flat mode, shaded color in staircase mode.
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
  staircase?: boolean;
  dither?: DitherMethod;
}

// 4×4 Bayer matrix (normalized to roughly [-0.5, 0.5]) for ordered dithering.
const BAYER4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => v / 16 - 0.5));

export function convertImage(
  imageData: ImageData,
  outputWidth: number,
  palette: MinecraftBlock[],
  options: ConvertOptions = {}
): ConversionResult {
  const dither = options.dither ?? "none";
  const targets = buildTargets(palette, !!options.staircase);

  const srcWidth = imageData.width;
  const srcHeight = imageData.height;
  const outputHeight = Math.max(1, Math.round((srcHeight / srcWidth) * outputWidth));

  // 1) Downsample to the output grid with box-average pooling (float RGB).
  const grid = new Float32Array(outputWidth * outputHeight * 3);
  for (let py = 0; py < outputHeight; py++) {
    const sy0 = Math.floor((py / outputHeight) * srcHeight);
    const sy1 = Math.max(sy0 + 1, Math.floor(((py + 1) / outputHeight) * srcHeight));
    for (let px = 0; px < outputWidth; px++) {
      const sx0 = Math.floor((px / outputWidth) * srcWidth);
      const sx1 = Math.max(sx0 + 1, Math.floor(((px + 1) / outputWidth) * srcWidth));
      let r = 0, g = 0, b = 0, n = 0;
      for (let sy = sy0; sy < sy1; sy++) {
        for (let sx = sx0; sx < sx1; sx++) {
          const i = (sy * srcWidth + sx) * 4;
          r += imageData.data[i];
          g += imageData.data[i + 1];
          b += imageData.data[i + 2];
          n++;
        }
      }
      const gi = (py * outputWidth + px) * 3;
      grid[gi] = r / n;
      grid[gi + 1] = g / n;
      grid[gi + 2] = b / n;
    }
  }

  // 2) Map each cell to the nearest target, applying the chosen dithering.
  const pixels: PixelBlock[][] = [];
  const materialCounts: Record<string, { block: MinecraftBlock; count: number }> = {};

  for (let py = 0; py < outputHeight; py++) {
    const row: PixelBlock[] = [];
    for (let px = 0; px < outputWidth; px++) {
      const gi = (py * outputWidth + px) * 3;
      let r = grid[gi], g = grid[gi + 1], b = grid[gi + 2];

      if (dither === "ordered") {
        const t = BAYER4[py & 3][px & 3] * 48; // spread strength
        r += t; g += t; b += t;
      }

      const target = findClosest(r, g, b, targets);

      if (dither === "floyd") {
        // Distribute quantization error to neighboring cells (Floyd–Steinberg).
        const er = r - target.r, eg = g - target.g, eb = b - target.b;
        const spread = (nx: number, ny: number, f: number) => {
          if (nx < 0 || nx >= outputWidth || ny >= outputHeight) return;
          const ni = (ny * outputWidth + nx) * 3;
          grid[ni] += er * f; grid[ni + 1] += eg * f; grid[ni + 2] += eb * f;
        };
        spread(px + 1, py, 7 / 16);
        spread(px - 1, py + 1, 3 / 16);
        spread(px, py + 1, 5 / 16);
        spread(px + 1, py + 1, 1 / 16);
      }

      row.push({ block: target.block, x: px, y: py, r: target.r, g: target.g, b: target.b });

      if (!materialCounts[target.block.id]) {
        materialCounts[target.block.id] = { block: target.block, count: 0 };
      }
      materialCounts[target.block.id].count++;
    }
    pixels.push(row);
  }

  return { pixels, width: outputWidth, height: outputHeight, materialCounts };
}
