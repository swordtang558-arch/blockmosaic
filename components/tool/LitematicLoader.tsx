"use client";

import dynamic from "next/dynamic";

const LitematicConverter = dynamic(() => import("./LitematicConverter"), {
  ssr: false,
  loading: () => <div className="card p-6 max-w-xl text-[var(--color-muted)] text-sm">Loading converter…</div>,
});

export default function LitematicLoader() {
  return <LitematicConverter />;
}
