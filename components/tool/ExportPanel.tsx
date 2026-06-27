"use client";

import { useState } from "react";
import { ConversionResult } from "@/lib/converter";
import { downloadSchem, downloadLitematic } from "@/lib/schematic";

export default function ExportPanel({ result }: { result: ConversionResult }) {
  const [busy, setBusy] = useState<string | null>(null);

  async function run(fmt: "litematic" | "schem") {
    setBusy(fmt);
    try {
      if (fmt === "litematic") await downloadLitematic(result, "pixel-art");
      else await downloadSchem(result, "pixel-art");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="card p-4">
      <h3 className="text-sm font-semibold mb-1">Export to Minecraft</h3>
      <p className="text-sm text-[var(--color-muted)] mb-3 leading-relaxed">
        Download a schematic and build the whole thing in-game instantly — no placing blocks one by one.
      </p>
      <div className="flex gap-2">
        <button onClick={() => run("litematic")} disabled={busy !== null} className="btn btn-ghost flex-1 flex-col !items-start py-2.5">
          <span className="text-sm font-semibold">{busy === "litematic" ? "Building…" : "↓ .litematic"}</span>
          <span className="text-xs text-[var(--color-muted)] font-normal">Litematica mod</span>
        </button>
        <button onClick={() => run("schem")} disabled={busy !== null} className="btn btn-ghost flex-1 flex-col !items-start py-2.5">
          <span className="text-sm font-semibold">{busy === "schem" ? "Building…" : "↓ .schem"}</span>
          <span className="text-xs text-[var(--color-muted)] font-normal">WorldEdit</span>
        </button>
      </div>
    </div>
  );
}
