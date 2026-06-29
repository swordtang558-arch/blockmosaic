import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { softwareAppLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import LitematicLoader from "@/components/tool/LitematicLoader";

export const metadata: Metadata = pageMeta({
  title: "Litematica to Schematic Converter (.litematic → .schem)",
  description:
    "Free Litematica to schematic converter. Turn a .litematic file into a WorldEdit .schem in your browser — no upload, no signup. Fast and private.",
  path: "/litematica-to-schematic/",
});

const FAQS = [
  { q: "What does this converter do?", a: "It converts a Litematica .litematic file into a Sponge .schem file that WorldEdit can load. The conversion runs entirely in your browser — your file is never uploaded." },
  { q: "How do I use the .schem afterwards?", a: "Place the .schem in your WorldEdit schematics folder, run //schem load <name>, then //paste to build it. Many plugins and tools accept the Sponge .schem format." },
  { q: "Does it preserve block states?", a: "Yes — block states (like log axis or stair facing) stored in the litematic palette are carried over into the schematic." },
  { q: "Is there a size limit?", a: "It works on typical builds. Extremely large litematics may take a few seconds since everything is processed locally in your browser." },
];

export default function LitematicaToSchematicPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Litematica to Schematic", path: "/litematica-to-schematic/" }]} />
      <JsonLd data={softwareAppLd()} />

      <div className="mt-6 mb-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Litematica to Schematic Converter</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Convert a Litematica <strong>.litematic</strong> file into a WorldEdit <strong>.schem</strong> in
          seconds. Everything runs in your browser — no upload, no signup.
        </p>
      </div>

      <LitematicLoader />

      <section className="prose-content max-w-3xl mt-10">
        <h2>From Litematica to WorldEdit</h2>
        <p>
          Litematica and WorldEdit use different schematic formats. This tool reads the block palette and
          block data from your <strong>.litematic</strong> and re-encodes it as a Sponge{" "}
          <strong>.schem</strong>, so you can paste a build made for Litematica with WorldEdit&apos;s{" "}
          <code>//schem load</code> and <code>//paste</code>.
        </p>
        <h3>Related tools</h3>
        <p>
          Want to create a schematic from a picture instead? Use the{" "}
          <Link href="/image-to-schematic/">image to schematic</Link> tool, or build Minecraft pixel art with
          the <Link href="/pixel-art-generator/">generator</Link>.
        </p>
      </section>

      <div className="max-w-3xl mt-8"><Faq items={FAQS} /></div>
    </main>
  );
}
