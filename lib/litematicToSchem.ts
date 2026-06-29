import { gunzip } from "./nbt";
import { readNbt } from "./nbtReader";
import { schemBytes } from "./schematic";

// Converts a Litematica .litematic file into a Sponge .schem (WorldEdit).
// Parses the gzipped NBT, reads the first region's palette + packed block
// states, unpacks them, and re-emits as a schematic.

interface AnyObj { [k: string]: unknown }

function blockKey(entry: AnyObj): string {
  const name = String(entry.Name ?? "minecraft:air");
  const props = entry.Properties as AnyObj | undefined;
  if (!props || typeof props !== "object") return name;
  const parts = Object.entries(props).map(([k, v]) => `${k}=${String(v)}`);
  return parts.length ? `${name}[${parts.join(",")}]` : name;
}

// Unpack a Litematica long-packed bit array into `count` palette indices.
function unpack(longs: bigint[], bits: number, count: number): number[] {
  const mask = (1n << BigInt(bits)) - 1n;
  const u = longs.map((l) => l & 0xffffffffffffffffn); // treat as unsigned
  const out = new Array<number>(count);
  for (let i = 0; i < count; i++) {
    const bitIndex = i * bits;
    const startLong = Math.floor(bitIndex / 64);
    const startOffset = bitIndex % 64;
    const endLong = Math.floor((bitIndex + bits - 1) / 64);
    let val: bigint;
    if (startLong === endLong) {
      val = (u[startLong] >> BigInt(startOffset)) & mask;
    } else {
      val = ((u[startLong] >> BigInt(startOffset)) | (u[endLong] << BigInt(64 - startOffset))) & mask;
    }
    out[i] = Number(val);
  }
  return out;
}

export async function litematicToSchem(input: ArrayBuffer): Promise<Uint8Array> {
  const root = readNbt(await gunzip(new Uint8Array(input))) as AnyObj;
  const regions = root.Regions as AnyObj | undefined;
  if (!regions || typeof regions !== "object") throw new Error("No Regions found — is this a .litematic file?");
  const regionName = Object.keys(regions)[0];
  if (!regionName) throw new Error("Litematic has no regions.");
  const region = regions[regionName] as AnyObj;

  const size = region.Size as AnyObj;
  const dimX = Math.abs(Number(size.x)), dimY = Math.abs(Number(size.y)), dimZ = Math.abs(Number(size.z));
  const volume = dimX * dimY * dimZ;
  if (!volume) throw new Error("Region has zero volume.");

  const paletteRaw = region.BlockStatePalette as AnyObj[];
  const paletteKeys = paletteRaw.map(blockKey);

  const states = (region.BlockStates as bigint[]) || [];
  const bits = Math.max(2, Math.ceil(Math.log2(paletteKeys.length)));
  const indices = unpack(states, bits, volume);

  // Litematica index order is x + z*W + y*W*L — the same order .schem expects.
  return schemBytes(dimX, dimY, dimZ, paletteKeys, indices, regionName || "converted");
}
