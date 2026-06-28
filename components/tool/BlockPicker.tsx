"use client";

import { useMemo } from "react";
import { BLOCKS, CATEGORY_ORDER, CATEGORY_LABELS, BlockCategory, MinecraftBlock } from "@/lib/blocks";

interface Props {
  selected: Set<string>;
  /** Blocks excluded by attribute filters (shown dimmed, not selectable). */
  isDisabled: (b: MinecraftBlock) => boolean;
  onToggle: (id: string) => void;
  onSetCategory: (ids: string[], select: boolean) => void;
}

export default function BlockPicker({ selected, isDisabled, onToggle, onSetCategory }: Props) {
  const grouped = useMemo(() => {
    const m = new Map<BlockCategory, MinecraftBlock[]>();
    for (const b of BLOCKS) {
      const arr = m.get(b.category) ?? [];
      arr.push(b);
      m.set(b.category, arr);
    }
    return m;
  }, []);

  return (
    <div className="max-h-72 overflow-y-auto pr-1 space-y-3">
      {CATEGORY_ORDER.map((cat) => {
        const blocks = grouped.get(cat);
        if (!blocks || !blocks.length) return null;
        const selectable = blocks.filter((b) => !isDisabled(b));
        const selCount = selectable.filter((b) => selected.has(b.id)).length;
        const allOn = selectable.length > 0 && selCount === selectable.length;

        return (
          <div key={cat}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-[var(--color-ink-soft)]">
                {CATEGORY_LABELS[cat]}{" "}
                <span className="text-[var(--color-muted)] font-normal">({selCount}/{selectable.length})</span>
              </span>
              <button
                type="button"
                onClick={() => onSetCategory(selectable.map((b) => b.id), !allOn)}
                className="text-xs text-[var(--color-accent-dark)] hover:underline"
              >
                {allOn ? "Clear" : "All"}
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {blocks.map((b) => {
                const disabled = isDisabled(b);
                const on = selected.has(b.id) && !disabled;
                return (
                  <button
                    key={b.id}
                    type="button"
                    title={b.name}
                    disabled={disabled}
                    onClick={() => onToggle(b.id)}
                    className={`w-6 h-6 rounded-sm transition-all ${
                      disabled
                        ? "opacity-20 cursor-not-allowed"
                        : on
                          ? "ring-2 ring-[var(--color-accent)] ring-offset-1"
                          : "ring-1 ring-black/10 opacity-55 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: `rgb(${b.r},${b.g},${b.b})` }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
