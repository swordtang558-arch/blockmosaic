import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { softwareAppLd, howToLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import AdSlot from "@/components/AdSlot";
import ToolLoader from "@/components/tool/ToolLoader";

export const metadata: Metadata = pageMeta({
  title: "Minecraft Pixel Art Generator – Photo to Blocks",
  description:
    "Convert photos to Minecraft blocks with this free pixel art maker. Live grid preview, block list, survival filter, PNG & schematic export. No signup.",
  path: "/pixel-art-generator/",
});

const FAQS = [
  { q: "How does the pixel art generator work?", a: "It samples your image at the chosen block width and matches each pixel to the nearest Minecraft block by color (RGB distance). The result is a block-by-block grid plus a list of every block used." },
  { q: "Can I export a schematic?", a: "Yes. Download a .litematic file for the Litematica mod or a .schem file for WorldEdit and build the whole design in-game instantly." },
  { q: "What image formats are supported?", a: "PNG, JPG/JPEG, WEBP and GIF. Images are processed locally in your browser and never uploaded." },
  { q: "What's the best block width?", a: "32 for small icons, 64 for most murals, and 128 for detailed art or a full Minecraft map. You can also enter a custom width." },
];

const HOWTO = howToLd({
  name: "How to convert an image to Minecraft pixel art",
  description: "Use the generator to turn any image into a buildable Minecraft block grid.",
  steps: [
    { name: "Upload an image", text: "Drag and drop a PNG or JPG, or click to browse." },
    { name: "Set the block width", text: "Choose 32, 64, 128 or a custom width in blocks." },
    { name: "Pick a palette", text: "Select concrete, wool, terracotta, all blocks, or map colors." },
    { name: "Generate", text: "Click generate to see the block grid and shopping list." },
    { name: "Export", text: "Download a PNG, CSV block list, or a schematic to build in-game." },
  ],
});

export default function GeneratorPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Pixel Art Generator", path: "/pixel-art-generator/" }]} />
      <JsonLd data={softwareAppLd()} />
      <JsonLd data={HOWTO} />

      <div className="mt-6 mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Minecraft Pixel Art Generator</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Upload a photo and convert it into Minecraft blocks. Preview the grid, hover any block to
          see its name, and export a PNG, a CSV block list, or a schematic.
        </p>
      </div>

      {/* The tool (lazy, client-only) */}
      <ToolLoader />

      <div className="my-10">
        <AdSlot slot="" label="generator-mid" minHeight={120} />
      </div>

      {/* Indexable supporting content */}
      <section className="prose-content max-w-3xl">
        <h2>A pixel art maker, creator and designer in one</h2>
        <p>
          This free <strong>Minecraft pixel art maker</strong> matches every pixel of your image to the
          closest Minecraft block, so you can rebuild photos, logos and characters out of blocks. Whether
          you call it a pixel art creator or designer, the workflow is the same — and it works entirely in
          your browser, so your image is never uploaded. Just want a quick conversion? Try the{" "}
          <Link href="/image-converter/">image converter</Link>.
        </p>
        <h3>Choose the right palette</h3>
        <p>
          Concrete gives the most vibrant, evenly-lit colors and is the most popular choice. Wool and
          terracotta offer softer, earthier tones. Switch to <Link href="/map-art/">map colors</Link> when
          you&apos;re building art meant to be viewed on an in-game map.
        </p>
        <h3>Build it in survival</h3>
        <p>
          Turn on the survival-friendly filter to restrict the palette to obtainable blocks, then open the{" "}
          <Link href="/block-list/">block shopping list</Link> to gather exactly what you need. For a head
          start, read the <Link href="/blog/pixel-art-tutorial/">pixel art tutorial</Link>.
        </p>
      </section>

      <div className="max-w-3xl mt-8">
        <Faq items={FAQS} />
      </div>
    </main>
  );
}
