// Minimal NBT (Named Binary Tag) writer — big-endian, used by Minecraft
// schematic formats (.schem, .litematic). Pure browser, no dependencies.

export type NbtTag =
  | { t: "byte"; v: number }
  | { t: "short"; v: number }
  | { t: "int"; v: number }
  | { t: "long"; v: bigint }
  | { t: "float"; v: number }
  | { t: "double"; v: number }
  | { t: "byteArray"; v: Uint8Array }
  | { t: "string"; v: string }
  | { t: "list"; itemType: number; v: NbtTag[] }
  | { t: "compound"; v: Record<string, NbtTag> }
  | { t: "intArray"; v: number[] }
  | { t: "longArray"; v: bigint[] };

const TYPE_ID: Record<string, number> = {
  byte: 1, short: 2, int: 3, long: 4, float: 5, double: 6,
  byteArray: 7, string: 8, list: 9, compound: 10, intArray: 11, longArray: 12,
};

// Convenience constructors
export const nbt = {
  byte: (v: number): NbtTag => ({ t: "byte", v }),
  short: (v: number): NbtTag => ({ t: "short", v }),
  int: (v: number): NbtTag => ({ t: "int", v }),
  long: (v: bigint): NbtTag => ({ t: "long", v }),
  string: (v: string): NbtTag => ({ t: "string", v }),
  byteArray: (v: Uint8Array): NbtTag => ({ t: "byteArray", v }),
  intArray: (v: number[]): NbtTag => ({ t: "intArray", v }),
  longArray: (v: bigint[]): NbtTag => ({ t: "longArray", v }),
  list: (itemType: number, v: NbtTag[]): NbtTag => ({ t: "list", itemType, v }),
  compound: (v: Record<string, NbtTag>): NbtTag => ({ t: "compound", v }),
  typeId: (key: string) => TYPE_ID[key],
};

class Writer {
  private buf = new Uint8Array(1024);
  private len = 0;

  private ensure(n: number) {
    if (this.len + n <= this.buf.length) return;
    let cap = this.buf.length * 2;
    while (cap < this.len + n) cap *= 2;
    const next = new Uint8Array(cap);
    next.set(this.buf.subarray(0, this.len));
    this.buf = next;
  }

  u8(v: number) { this.ensure(1); this.buf[this.len++] = v & 0xff; }
  i16(v: number) { this.ensure(2); this.buf[this.len++] = (v >> 8) & 0xff; this.buf[this.len++] = v & 0xff; }
  i32(v: number) {
    this.ensure(4);
    this.buf[this.len++] = (v >> 24) & 0xff;
    this.buf[this.len++] = (v >> 16) & 0xff;
    this.buf[this.len++] = (v >> 8) & 0xff;
    this.buf[this.len++] = v & 0xff;
  }
  i64(v: bigint) {
    this.ensure(8);
    const u = v & 0xffffffffffffffffn;
    for (let i = 7; i >= 0; i--) {
      this.buf[this.len++] = Number((u >> BigInt(i * 8)) & 0xffn);
    }
  }
  f32(v: number) {
    this.ensure(4);
    const dv = new DataView(new ArrayBuffer(4));
    dv.setFloat32(0, v, false);
    for (let i = 0; i < 4; i++) this.buf[this.len++] = dv.getUint8(i);
  }
  f64(v: number) {
    this.ensure(8);
    const dv = new DataView(new ArrayBuffer(8));
    dv.setFloat64(0, v, false);
    for (let i = 0; i < 8; i++) this.buf[this.len++] = dv.getUint8(i);
  }
  bytes(arr: Uint8Array) { this.ensure(arr.length); this.buf.set(arr, this.len); this.len += arr.length; }
  str(s: string) {
    const enc = new TextEncoder().encode(s);
    this.i16(enc.length);
    this.bytes(enc);
  }

  payload(tag: NbtTag) {
    switch (tag.t) {
      case "byte": this.u8(tag.v); break;
      case "short": this.i16(tag.v); break;
      case "int": this.i32(tag.v); break;
      case "long": this.i64(tag.v); break;
      case "float": this.f32(tag.v); break;
      case "double": this.f64(tag.v); break;
      case "string": this.str(tag.v); break;
      case "byteArray": this.i32(tag.v.length); this.bytes(tag.v); break;
      case "intArray": this.i32(tag.v.length); for (const n of tag.v) this.i32(n); break;
      case "longArray": this.i32(tag.v.length); for (const n of tag.v) this.i64(n); break;
      case "list": {
        this.u8(tag.v.length ? tag.itemType : 0);
        this.i32(tag.v.length);
        for (const item of tag.v) this.payload(item);
        break;
      }
      case "compound": {
        for (const [name, child] of Object.entries(tag.v)) {
          this.u8(TYPE_ID[child.t]);
          this.str(name);
          this.payload(child);
        }
        this.u8(0); // TAG_End
        break;
      }
    }
  }

  result(): Uint8Array {
    return this.buf.subarray(0, this.len);
  }
}

/** Serialize a root compound tag into uncompressed NBT bytes. */
export function writeNbt(rootName: string, root: NbtTag): Uint8Array {
  const w = new Writer();
  w.u8(TYPE_ID.compound);
  w.str(rootName);
  w.payload(root);
  return w.result();
}

/** Gzip-compress bytes using the browser's built-in CompressionStream. */
export async function gzip(data: Uint8Array): Promise<Uint8Array> {
  const cs = new CompressionStream("gzip");
  const writer = cs.writable.getWriter();
  writer.write(data as unknown as Uint8Array<ArrayBuffer>);
  writer.close();
  const ab = await new Response(cs.readable).arrayBuffer();
  return new Uint8Array(ab);
}

/** Gzip-decompress bytes using the browser's built-in DecompressionStream. */
export async function gunzip(data: Uint8Array): Promise<Uint8Array> {
  const ds = new DecompressionStream("gzip");
  const writer = ds.writable.getWriter();
  writer.write(data as unknown as Uint8Array<ArrayBuffer>);
  writer.close();
  const ab = await new Response(ds.readable).arrayBuffer();
  return new Uint8Array(ab);
}
