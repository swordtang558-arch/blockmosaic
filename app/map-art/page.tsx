import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { softwareAppLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import ToolLoader from "@/components/tool/ToolLoader";

export const metadata: Metadata = pageMeta({
  title: "Minecraft Map Art Generator – Picture to Map (128×128)",
  description:
    "Convert any picture into Minecraft map art. Uses official map colors at 128×128 so it renders crisply on an in-game map. Free generator with block list.",
  path: "/map-art/",
});

const FAQS = [
  { q: "What is Minecraft map art?", a: "Map art is pixel art designed to be displayed on a Minecraft map item. A single map shows a 128×128 grid, so map art is built at that resolution using each block's map color." },
  { q: "Why use map colors instead of normal blocks?", a: "Maps show a block's map color, not its texture. The map-color palette ensures the colors you see on the map match your design." },
  { q: "What size should map art be?", a: "128 blocks wide equals one full map. For larger art, build a grid of multiple maps (e.g. 256×256 = 4 maps)." },
];

export default function MapArtPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Map Art", path: "/map-art/" }]} />
      <JsonLd data={softwareAppLd()} />

      <div className="mt-6 mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Minecraft Map Art Generator</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Turn a picture into map art that displays on an in-game map. This generator uses official map
          colors at 128×128 for crisp, accurate results.
        </p>
      </div>

      {/* Map mode: locks palette to official map colors, defaults to 128 width */}
      <ToolLoader mapMode defaultWidth={128} />

      <section className="prose-content max-w-3xl mt-10">
        <h2>Picture to Minecraft map art</h2>
        <p>
          The generator matches each pixel to its closest Minecraft <strong>map color</strong>, so the art
          renders correctly when you place a map on it. Build the design flat, then use an empty map to
          capture it.
        </p>
        <p>
          Step-by-step in our <Link href="/blog/minecraft-map-art-tutorial/">map art tutorial</Link>. For
          textured wall murals instead, use the <Link href="/pixel-art-generator/">standard generator</Link>.
        </p>
      </section>

      <div className="max-w-3xl mt-8">
        <Faq items={FAQS} />
      </div>
    </main>
  );
}
