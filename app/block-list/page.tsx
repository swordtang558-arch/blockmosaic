import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { softwareAppLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import AdSlot from "@/components/AdSlot";
import ToolLoader from "@/components/tool/ToolLoader";

export const metadata: Metadata = pageMeta({
  title: "Minecraft Pixel Art Block List & Count (CSV Export)",
  description:
    "Get an exact block count for any Minecraft pixel art. Generate a shopping list of every block and how many stacks, then export to CSV. Free, survival-ready.",
  path: "/block-list/",
});

const FAQS = [
  { q: "What is a block shopping list?", a: "It's a breakdown of every block your pixel art uses and how many of each you need — including the number of 64-block stacks — so you can gather materials before building in survival." },
  { q: "Can I export the block list?", a: "Yes. After generating, click Export CSV to download the full list with block names, IDs, counts and stacks. Open it in any spreadsheet app." },
  { q: "Does it only show survival blocks?", a: "Enable the survival-friendly filter and the generator restricts matching to blocks you can obtain in survival, so your shopping list is buildable." },
  { q: "How are stacks calculated?", a: "Minecraft stacks most blocks in groups of 64, so stacks = ceil(count ÷ 64). The list rounds up so you always gather enough." },
];

export default function BlockListPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Block List", path: "/block-list/" }]} />
      <JsonLd data={softwareAppLd()} />

      <div className="mt-6 mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Minecraft Pixel Art Block List</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Planning a survival build? Generate your pixel art and get an exact block count for every
          block — plus stacks — then export the whole shopping list to CSV.
        </p>
      </div>

      <ToolLoader />

      <div className="my-10">
        <AdSlot slot="" label="blocklist-mid" minHeight={120} />
      </div>

      <section className="prose-content max-w-3xl">
        <h2>Know exactly what to gather before you build</h2>
        <p>
          The biggest pain in survival pixel art is running out of a block halfway through. This tool
          solves that: after you convert an image, the <strong>block shopping list</strong> shows every
          block used, the total count, and how many stacks to bring.
        </p>
        <h3>Export to CSV</h3>
        <p>
          Click <strong>Export CSV</strong> to download a spreadsheet with block names, IDs, counts and
          stacks — handy for organizing a gathering trip or sharing a build plan with friends.
        </p>
        <h3>Make it survival-friendly</h3>
        <p>
          Turn on the survival filter so the palette only uses obtainable blocks. Then head to the{" "}
          <Link href="/pixel-art-generator/">full generator</Link> for more palettes, or learn the workflow
          in our <Link href="/blog/pixel-art-tutorial/">pixel art tutorial</Link>.
        </p>
      </section>

      <div className="max-w-3xl mt-8">
        <Faq items={FAQS} />
      </div>
    </main>
  );
}
