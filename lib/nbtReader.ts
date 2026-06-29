// Minimal NBT reader (big-endian) — the inverse of lib/nbt.ts's writer.
// Returns plain JS values: compound→object, list→array, long(array)→bigint(s).

type NbtValue =
  | number | bigint | string | Uint8Array | number[] | bigint[]
  | NbtValue[] | { [k: string]: NbtValue };

class Reader {
  private dv: DataView;
  pos = 0;
  constructor(private buf: Uint8Array) { this.dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength); }
  u8() { return this.buf[this.pos++]; }
  i16() { const v = this.dv.getInt16(this.pos, false); this.pos += 2; return v; }
  i32() { const v = this.dv.getInt32(this.pos, false); this.pos += 4; return v; }
  i64() { const v = this.dv.getBigInt64(this.pos, false); this.pos += 8; return v; }
  f32() { const v = this.dv.getFloat32(this.pos, false); this.pos += 4; return v; }
  f64() { const v = this.dv.getFloat64(this.pos, false); this.pos += 8; return v; }
  str() { const len = this.dv.getUint16(this.pos, false); this.pos += 2; const s = new TextDecoder().decode(this.buf.subarray(this.pos, this.pos + len)); this.pos += len; return s; }

  payload(type: number): NbtValue {
    switch (type) {
      case 1: return this.dv.getInt8(this.pos++);
      case 2: return this.i16();
      case 3: return this.i32();
      case 4: return this.i64();
      case 5: return this.f32();
      case 6: return this.f64();
      case 7: { const n = this.i32(); const a = this.buf.subarray(this.pos, this.pos + n); this.pos += n; return a; }
      case 8: return this.str();
      case 9: { const it = this.u8(); const n = this.i32(); const arr: NbtValue[] = []; for (let i = 0; i < n; i++) arr.push(this.payload(it)); return arr; }
      case 10: { const o: { [k: string]: NbtValue } = {}; for (;;) { const t = this.u8(); if (t === 0) break; const name = this.str(); o[name] = this.payload(t); } return o; }
      case 11: { const n = this.i32(); const a: number[] = []; for (let i = 0; i < n; i++) a.push(this.i32()); return a; }
      case 12: { const n = this.i32(); const a: bigint[] = []; for (let i = 0; i < n; i++) a.push(this.i64()); return a; }
      default: throw new Error("Unknown NBT tag type " + type);
    }
  }
}

/** Parse uncompressed NBT bytes; returns the root compound value. */
export function readNbt(bytes: Uint8Array): { [k: string]: NbtValue } {
  const r = new Reader(bytes);
  const type = r.u8();
  if (type !== 10) throw new Error("NBT root is not a compound");
  r.str(); // root name (usually empty)
  return r.payload(10) as { [k: string]: NbtValue };
}
