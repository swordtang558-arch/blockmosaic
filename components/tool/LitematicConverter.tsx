"use client";

import { useRef, useState } from "react";
import { litematicToSchem } from "@/lib/litematicToSchem";

export default function LitematicConverter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handle(file: File) {
    setStatus("working"); setMsg(file.name);
    try {
      const bytes = await litematicToSchem(await file.arrayBuffer());
      const blob = new Blob([bytes as unknown as BlobPart], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.litematic$/i, "") + ".schem";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setMsg(e instanceof Error ? e.message : "Failed to convert file.");
    }
  }

  return (
    <div className="card p-6 max-w-xl">
      <div
        onClick={() => inputRef.current?.click()}
        className="rounded-xl border-2 border-dashed border-[var(--color-line)] bg-[var(--color-surface-alt)] hover:border-[var(--color-accent)] px-6 py-10 text-center cursor-pointer transition-colors"
      >
        <input ref={inputRef} type="file" accept=".litematic" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f); }} />
        <p className="font-semibold text-[var(--color-ink)]">Click to choose a .litematic file</p>
        <p className="text-sm text-[var(--color-muted)] mt-1">Converted to .schem in your browser — nothing uploaded</p>
      </div>

      {status !== "idle" && (
        <div className="mt-4 text-sm">
          {status === "working" && <span className="text-[var(--color-muted)]">Converting {msg}…</span>}
          {status === "done" && <span className="text-[var(--color-accent-dark)] font-medium">✓ Done — your .schem download has started.</span>}
          {status === "error" && <span className="text-red-600">⚠ {msg}</span>}
        </div>
      )}
    </div>
  );
}
