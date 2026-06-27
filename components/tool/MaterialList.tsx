"use client";

import { ConversionResult } from "@/lib/converter";

export default function MaterialList({ result }: { result: ConversionResult }) {
  const sorted = Object.values(result.materialCounts).sort((a, b) => b.count - a.count);
  const total = sorted.reduce((s, m) => s + m.count, 0);

  function downloadCSV() {
    const rows = [["Block", "Block ID", "Count", "Stacks"]];
    for (const { block, count } of sorted) {
      rows.push([block.name, block.id, String(count), String(Math.ceil(count / 64))]);
    }
    const csv = rows.map((r) => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.download = "minecraft-block-list.csv";
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.click();
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-line)]">
        <h3 className="text-sm font-semibold">Block Shopping List</h3>
        <button onClick={downloadCSV} className="btn btn-ghost text-xs py-1.5 px-3">⬇ CSV</button>
      </div>

      <div className="grid grid-cols-3 divide-x divide-[var(--color-line)] border-b border-[var(--color-line)]">
        {[
          { label: "Total blocks", value: total.toLocaleString() },
          { label: "Block types", value: String(sorted.length) },
          { label: "Stacks", value: Math.ceil(total / 64).toLocaleString() },
        ].map((s) => (
          <div key={s.label} className="px-4 py-3">
            <div className="text-xs text-[var(--color-muted)]">{s.label}</div>
            <div className="text-lg font-bold text-[var(--color-accent-dark)] tabular-nums">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="max-h-64 overflow-y-auto">
        {sorted.map(({ block, count }, i) => (
          <div
            key={block.id}
            className={`flex items-center gap-3 px-4 py-2 text-sm ${i % 2 ? "" : "bg-[var(--color-surface-alt)]"}`}
          >
            <span
              className="w-4 h-4 rounded-sm flex-shrink-0 ring-1 ring-black/10"
              style={{ backgroundColor: `rgb(${block.r},${block.g},${block.b})` }}
            />
            <span className="flex-1 truncate text-[var(--color-ink-soft)]">{block.name}</span>
            <span className="font-medium tabular-nums">{count.toLocaleString()}</span>
            <span className="text-xs text-[var(--color-muted)] w-16 text-right tabular-nums">{Math.ceil(count / 64)} stacks</span>
          </div>
        ))}
      </div>
    </div>
  );
}
