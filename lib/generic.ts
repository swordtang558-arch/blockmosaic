// Generic image → pixel-art conversion (NOT Minecraft blocks). Downsamples to a
// block grid, optionally reduces colors via median-cut quantization, and applies
// dithering. Output is a grid of colors → pixelated PNG. Runs on the main thread
// (fast enough for the supported widths) — no worker needed.

import { DitherMethod } from "./converter";

export interface GenericCell { x: number; y: number; r: number; g: number; b: number }
export interface GenericResult { cells: GenericCell[][]; width: number; height: number; colorCount: number }

const BAYER4 = [
  [0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5],
].map((row) => row.map((v) => v / 16 - 0.5));

interface RGB { r: number; g: number; b: number }

// Median-cut quantization → up to `max` representative colors.
function medianCut(pixels: RGB[], max: number): RGB[] {
  if (pixels.length === 0) return [{ r: 0, g: 0, b: 0 }];
  let boxes: RGB[][] = [pixels];
  while (boxes.length < max) {
    // pick the box with the largest channel range to split
    let bi = -1, bestRange = -1, bestCh: "r" | "g" | "b" = "r";
    boxes.forEach((box, i) => {
      if (box.length < 2) return;
      for (const ch of ["r", "g", "b"] as const) {
        let lo = 255, hi = 0;
        for (const p of box) { const v = p[ch]; if (v < lo) lo = v; if (v > hi) hi = v; }
        const range = hi - lo;
        if (range > bestRange) { bestRange = range; bi = i; bestCh = ch; }
      }
    });
    if (bi < 0) break;
    const box = boxes[bi].slice().sort((a, b) => a[bestCh] - b[bestCh]);
    const mid = box.length >> 1;
    boxes.splice(bi, 1, box.slice(0, mid), box.slice(mid));
  }
  return boxes.map((box) => {
    let r = 0, g = 0, b = 0;
    for (const p of box) { r += p.r; g += p.g; b += p.b; }
    const n = box.length || 1;
    return { r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n) };
  });
}

function nearest(r: number, g: number, b: number, pal: RGB[]): RGB {
  let best = pal[0], bd = Infinity;
  for (const c of pal) {
    const dr = r - c.r, dg = g - c.g, db = b - c.b;
    const d = dr * dr + dg * dg + db * db;
    if (d < bd) { bd = d; best = c; }
  }
  return best;
}

export function convertGeneric(
  imageData: ImageData,
  outputWidth: number,
  options: { colors: number; dither: DitherMethod } = { colors: 0, dither: "none" }
): GenericResult {
  const { colors, dither } = options;
  const srcWidth = imageData.width, srcHeight = imageData.height;
  const outputHeight = Math.max(1, Math.round((srcHeight / srcWidth) * outputWidth));

  // Box-average downsample to a float grid.
  const grid = new Float32Array(outputWidth * outputHeight * 3);
  for (let py = 0; py < outputHeight; py++) {
    const sy0 = Math.floor((py / outputHeight) * srcHeight);
    const sy1 = Math.max(sy0 + 1, Math.floor(((py + 1) / outputHeight) * srcHeight));
    for (let px = 0; px < outputWidth; px++) {
      const sx0 = Math.floor((px / outputWidth) * srcWidth);
      const sx1 = Math.max(sx0 + 1, Math.floor(((px + 1) / outputWidth) * srcWidth));
      let r = 0, g = 0, b = 0, n = 0;
      for (let sy = sy0; sy < sy1; sy++) for (let sx = sx0; sx < sx1; sx++) {
        const i = (sy * srcWidth + sx) * 4;
        r += imageData.data[i]; g += imageData.data[i + 1]; b += imageData.data[i + 2]; n++;
      }
      const gi = (py * outputWidth + px) * 3;
      grid[gi] = r / n; grid[gi + 1] = g / n; grid[gi + 2] = b / n;
    }
  }

  // Optional palette (colors === 0 means keep downsampled colors as-is).
  let palette: RGB[] | null = null;
  if (colors >= 2) {
    const samples: RGB[] = [];
    for (let i = 0; i < grid.length; i += 3) samples.push({ r: grid[i], g: grid[i + 1], b: grid[i + 2] });
    palette = medianCut(samples, colors);
  }

  const cells: GenericCell[][] = [];
  const used = new Set<string>();
  for (let py = 0; py < outputHeight; py++) {
    const row: GenericCell[] = [];
    for (let px = 0; px < outputWidth; px++) {
      const gi = (py * outputWidth + px) * 3;
      let r = grid[gi], g = grid[gi + 1], b = grid[gi + 2];
      if (dither === "ordered") { const t = BAYER4[py & 3][px & 3] * 48; r += t; g += t; b += t; }

      let cr: number, cg: number, cb: number;
      if (palette) {
        const c = nearest(r, g, b, palette);
        cr = c.r; cg = c.g; cb = c.b;
        if (dither === "floyd") {
          const er = r - cr, eg = g - cg, eb = b - cb;
          const spread = (nx: number, ny: number, f: number) => {
            if (nx < 0 || nx >= outputWidth || ny >= outputHeight) return;
            const ni = (ny * outputWidth + nx) * 3;
            grid[ni] += er * f; grid[ni + 1] += eg * f; grid[ni + 2] += eb * f;
          };
          spread(px + 1, py, 7 / 16); spread(px - 1, py + 1, 3 / 16); spread(px, py + 1, 5 / 16); spread(px + 1, py + 1, 1 / 16);
        }
      } else {
        cr = Math.round(Math.max(0, Math.min(255, r)));
        cg = Math.round(Math.max(0, Math.min(255, g)));
        cb = Math.round(Math.max(0, Math.min(255, b)));
      }
      row.push({ x: px, y: py, r: cr, g: cg, b: cb });
      used.add(`${cr},${cg},${cb}`);
    }
    cells.push(row);
  }

  return { cells, width: outputWidth, height: outputHeight, colorCount: used.size };
}
