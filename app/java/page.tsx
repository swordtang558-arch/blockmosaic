import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { softwareAppLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import ToolLoader from "@/components/tool/ToolLoader";

export const metadata: Metadata = pageMeta({
  title: "Minecraft Pixel Art Generator for Java Edition",
  description:
    "Make Minecraft pixel art for Java Edition and export a schematic. Convert images to blocks, get a block list, and build with Litematica or WorldEdit. Free.",
  path: "/java/",
});

const FAQS = [
  { q: "Can I export a schematic on Java?", a: "Yes. Download a .litematic file for the Litematica mod or a .schem file for WorldEdit, load it in your Java world, and build the whole design instantly." },
  { q: "Which palette is best for Java?", a: "Concrete gives the most vibrant, evenly-lit colors. For map art, switch to the map-color palette so it renders correctly on a map item." },
  { q: "Is it free and safe?", a: "Yes — it's free and runs entirely in your browser. Your images are never uploaded anywhere." },
];

export default function JavaPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Java", path: "/java/" }]} />
      <JsonLd data={softwareAppLd()} />

      <div className="mt-6 mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Minecraft Pixel Art Generator — Java Edition</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Convert images to Minecraft blocks for Java Edition and export a schematic you can paste with
          Litematica or WorldEdit — no manual block placing.
        </p>
      </div>

      <ToolLoader />

      <section className="prose-content max-w-3xl mt-10">
        <h2>Schematic export for Java</h2>
        <p>
          After generating, download a <strong>.litematic</strong> (Litematica mod) or{" "}
          <strong>.schem</strong> (WorldEdit) file. Load it in your world and the entire pixel art appears
          as a ghost projection or pastes directly — ideal for large murals.
        </p>
        <p>
          Want it on a map? Use the <Link href="/map-art/">map art generator</Link>. Building in survival?
          Grab the <Link href="/block-list/">block shopping list</Link> first.
        </p>
      </section>

      <div className="max-w-3xl mt-8">
        <Faq items={FAQS} />
      </div>
    </main>
  );
}
