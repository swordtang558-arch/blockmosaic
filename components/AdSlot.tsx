"use client";

import { useEffect, useRef } from "react";

// AdSense placeholder. With NEXT_PUBLIC_ADSENSE_ID set, renders a real <ins>
// ad unit; otherwise shows a labeled placeholder so layout is reserved (no CLS).
// Pass the slot id once you create ad units in the AdSense dashboard.

interface Props {
  slot?: string;
  /** Visual height reserved to avoid layout shift. */
  minHeight?: number;
  label?: string;
}

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

export default function AdSlot({ slot, minHeight = 100, label = "Advertisement" }: Props) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!ADSENSE_ID || !slot) return;
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* no-op */
    }
  }, [slot]);

  if (!ADSENSE_ID || !slot) {
    return (
      <div
        className="w-full rounded-lg border border-dashed border-[var(--color-line)] bg-[var(--color-surface-alt)] flex items-center justify-center text-xs text-[var(--color-muted)] uppercase tracking-widest"
        style={{ minHeight }}
        aria-hidden="true"
      >
        Ad slot — {label}
      </div>
    );
  }

  return (
    <ins
      ref={ref}
      className="adsbygoogle block"
      style={{ display: "block", minHeight }}
      data-ad-client={ADSENSE_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
