"use client";

import dynamic from "next/dynamic";

// Client-only, lazily-loaded generic pixel-art converter — keeps the heavy
// conversion code out of the server HTML and initial bundle.
const GenericConverter = dynamic(() => import("./GenericConverter"), {
  ssr: false,
  loading: () => (
    <div className="card min-h-[360px] flex items-center justify-center text-[var(--color-muted)] text-sm">
      Loading converter…
    </div>
  ),
});

export default function GenericLoader() {
  return <GenericConverter />;
}
