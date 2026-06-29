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
  title: "Image to Schematic – Convert Pictures to Minecraft Blueprints",
  description:
    "Convert any image to a Minecraft schematic. Generate a .litematic or .schem blueprint from a picture and build it with Litematica or WorldEdit. Free.",
  path: "/image-to-schematic/",
});

const FAQS = [
  { q: "How do I turn an image into a schematic?", a: "Upload your image, choose a block width and palette, generate, then use the export buttons to download a .litematic (Litematica) or .schem (WorldEdit) file." },
  { q: "Which schematic format should I pick?", a: "Use .litematic if you build with the Litematica mod (hologram overlay), or .schem if you paste with WorldEdit. Both are produced from the same design." },
  { q: "Already have a .litematic to convert?", a: "If you just need to convert an existing Litematica file to WorldEdit format, use the Litematica to Schematic converter instead." },
  { q: "What versions are supported?", a: "The schematics target a recent data version and work with current Litematica and WorldEdit on Minecraft 1.20+/1.21. Most blocks are version-agnostic." },
];

const HOWTO = howToLd({
  name: "How to convert an image to a Minecraft schematic",
  description: "Turn a picture into a buildable Minecraft schematic blueprint.",
  steps: [
    { name: "Upload an image", text: "Add a PNG or JPG." },
    { name: "Set width & palette", text: "Choose the block width and block palette." },
    { name: "Generate", text: "Convert the image into a block grid." },
    { name: "Export schematic", text: "Download a .litematic or .schem and load it in-game." },
  ],
});

export default function ImageToSchematicPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Image to Schematic", path: "/image-to-schematic/" }]} />
      <JsonLd data={softwareAppLd()} />
      <JsonLd data={HOWTO} />

      <div className="mt-6 mb-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Image to Schematic</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Convert a picture into a Minecraft blueprint. Generate the block design, then export a{" "}
          <strong>.litematic</strong> or <strong>.schem</strong> and build it instantly with Litematica or
          WorldEdit.
        </p>
      </div>

      <ToolLoader />

      <div className="my-10"><AdSlot slot="" label="i2s-mid" minHeight={120} /></div>

      <section className="prose-content max-w-3xl">
        <h2>From picture to buildable blueprint</h2>
        <p>
          This tool maps your image to Minecraft blocks and exports a schematic you can paste or project
          in-game — no placing blocks one by one. Generate the design above, then use the export buttons for{" "}
          <strong>.litematic</strong> (Litematica) or <strong>.schem</strong> (WorldEdit).
        </p>
        <h3>Related tools</h3>
        <p>
          Converting an existing Litematica file? Use{" "}
          <Link href="/litematica-to-schematic/">Litematica to Schematic</Link>. Just want pixel art without
          blocks? Try <Link href="/image-to-pixel-art/">image to pixel art</Link>.
        </p>
      </section>

      <div className="max-w-3xl mt-8"><Faq items={FAQS} /></div>
    </main>
  );
}
