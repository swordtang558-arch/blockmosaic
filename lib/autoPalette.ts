import { BLOCKS, MinecraftBlock } from "./blocks";

/**
 * Auto-selects the block palette that best matches an uploaded image.
 * Downsamples the image, maps every sample to its nearest block (over the full
 * catalog), tallies usage, and returns the blocks that together cover most of
 * the image — so the picker is pre-filled with exactly the blocks this picture needs.
 */
export function autoPaletteFromImage(
  imageData: ImageData,
  pool: MinecraftBlock[] = BLOCKS,
  maxBlocks = 28
): string[] {
  const { width, height, data } = imageData;
  const step = Math.max(1, Math.floor(Math.max(width, height) / 64)); // sample ~64px grid

  const counts = new Map<string, number>();
  let total = 0;
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) * 4;
      if (data[i + 3] < 16) continue; // skip transparent
      const r = data[i], g = data[i + 1], b = data[i + 2];
      let best = pool[0], bestD = Infinity;
      for (const blk of pool) {
        const dr = r - blk.r, dg = g - blk.g, db = b - blk.b;
        const d = dr * dr + dg * dg + db * db;
        if (d < bestD) { bestD = d; best = blk; }
      }
      counts.set(best.id, (counts.get(best.id) ?? 0) + 1);
      total++;
    }
  }

  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const picked: string[] = [];
  let covered = 0;
  for (const [id, n] of sorted) {
    picked.push(id);
    covered += n;
    // Stop once we cover 97% of sampled pixels or hit the cap (keep at least 4).
    if (picked.length >= maxBlocks) break;
    if (picked.length >= 4 && covered / total >= 0.97) break;
  }
  return picked;
}
