// Self-made blocky brand mark (no Mojang assets). 2×2 colored blocks = pixel-art nod.
export default function Logo({ size = 28 }: { size?: number }) {
  const cells = [
    { x: 0, y: 0, c: "#16a34a" },
    { x: 1, y: 0, c: "#22c55e" },
    { x: 0, y: 1, c: "#15803d" },
    { x: 1, y: 1, c: "#4ade80" },
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" style={{ imageRendering: "pixelated" }}>
      {cells.map((c, i) => (
        <rect key={i} x={c.x * 10 + 1} y={c.y * 10 + 1} width={8} height={8} rx={1.5} fill={c.c} />
      ))}
    </svg>
  );
}
