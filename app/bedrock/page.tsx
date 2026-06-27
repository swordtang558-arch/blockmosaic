import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { softwareAppLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import ToolLoader from "@/components/tool/ToolLoader";

export const metadata: Metadata = pageMeta({
  title: "Minecraft Pixel Art Generator for Bedrock Edition",
  description:
    "Make Minecraft pixel art for Bedrock Edition — pocket, console and Windows. Convert any image to blocks with a block list and PNG export. Free, no signup.",
  path: "/bedrock/",
});

const FAQS = [
  { q: "Does this work for Minecraft Bedrock?", a: "Yes. The color palettes are based on block colors shared across editions, so the generated pixel art looks the same when you build it in Bedrock." },
  { q: "Can I use it on mobile or console?", a: "You can generate the design and block list on any device with a browser, then build it in Bedrock on phone, tablet, console or Windows." },
  { q: "Are schematics supported on Bedrock?", a: "Schematic mods like Litematica are Java-only. On Bedrock, use the grid preview and block list to build by hand, or rebuild from the PNG." },
];

export default function BedrockPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Bedrock", path: "/bedrock/" }]} />
      <JsonLd data={softwareAppLd()} />

      <div className="mt-6 mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Minecraft Pixel Art Generator — Bedrock Edition</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Turn any image into Minecraft blocks for Bedrock — pocket, console and Windows. Build by hand
          using the grid and block list; no mods required.
        </p>
      </div>

      <ToolLoader />

      <section className="prose-content max-w-3xl mt-10">
        <h2>Building pixel art on Bedrock</h2>
        <p>
          Bedrock doesn&apos;t support schematic mods, so the workflow is build-by-hand: generate your
          design, turn on the <Link href="/templates/grid/">grid overlay</Link>, and place blocks row by
          row. Use the <Link href="/block-list/">block shopping list</Link> to gather everything first.
        </p>
        <p>
          Playing on Java instead? See the <Link href="/java/">Java Edition page</Link> for schematic
          export with Litematica and WorldEdit.
        </p>
      </section>

      <div className="max-w-3xl mt-8">
        <Faq items={FAQS} />
      </div>
    </main>
  );
}
