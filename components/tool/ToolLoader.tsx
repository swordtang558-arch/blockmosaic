"use client";

import dynamic from "next/dynamic";

// Client-only, lazily-loaded tool. Keeps the heavy image-processing code out of
// the server-rendered HTML and the initial JS bundle — pages stay fast & indexable
// while the interactive tool hydrates on demand.
const PixelArtTool = dynamic(() => import("./PixelArtTool"), {
  ssr: false,
  loading: () => (
    <div className="card min-h-[360px] flex items-center justify-center text-[var(--color-muted)] text-sm">
      Loading generator…
    </div>
  ),
});

export default function ToolLoader(props: { mapMode?: boolean; defaultWidth?: number }) {
  return <PixelArtTool {...props} />;
}
