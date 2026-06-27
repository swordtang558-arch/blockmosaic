import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { softwareAppLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = pageMeta({
  title: "Minecraft Pixel Art Generator & Image Converter",
  description:
    "Free Minecraft pixel art generator and image converter. Turn any picture into Minecraft blocks with a grid, block list, and PNG export. No signup, no upload.",
  path: "/",
});

const FEATURES = [
  { title: "Image → blocks instantly", body: "Upload any picture and we match every pixel to the closest Minecraft block automatically." },
  { title: "Block shopping list", body: "See exactly how many of each block you need — and how many stacks — before you start building." },
  { title: "Grid & map art", body: "Toggle a grid to build row by row, or switch to map colors for crisp 128×128 map art." },
  { title: "100% in your browser", body: "Your images never leave your device. No upload, no signup, no watermark." },
];

const FAQS = [
  { q: "What is a Minecraft pixel art generator?", a: "It's a free tool that converts any image into a pixel art design made of Minecraft blocks. You get a block-by-block grid, a shopping list of blocks, and a PNG you can save." },
  { q: "Is it free?", a: "Yes — completely free, no account needed, and no watermark. Everything runs in your browser." },
  { q: "Do you upload my images?", a: "No. All image processing happens locally in your browser, so your pictures never leave your device." },
  { q: "Which Minecraft editions are supported?", a: "Both. The block palettes work for Java and Bedrock — see our Java and Bedrock pages for edition-specific tips." },
];

export default function Home() {
  return (
    <main>
      <JsonLd data={softwareAppLd()} />

      {/* Hero */}
      <section className="pixel-grid border-b border-[var(--color-line)]">
        <div className="container-page py-16 md:py-24 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-dark)] bg-[var(--color-accent-light)] px-3 py-1 rounded-full mb-5">
            Free · No signup · No watermark
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-[1.1]">
            Minecraft Pixel Art Generator
          </h1>
          <p className="mt-5 text-lg text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
            The free Minecraft pixel art generator and image converter. Turn any picture into Minecraft
            blocks — with a buildable grid, an exact block shopping list, and PNG export, all in your browser.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Link href="/image-converter/" className="btn btn-primary text-base px-7 py-3">
              Convert an Image →
            </Link>
            <Link href="/pixel-art-generator/" className="btn btn-ghost text-base px-7 py-3">
              Open the Generator
            </Link>
          </div>
        </div>
      </section>

      <div className="container-page py-14 space-y-16">
        {/* Features */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-center mb-10">Everything you need to build pixel art</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-5">
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="" label="home-mid" minHeight={120} />

        {/* How it works */}
        <section className="prose-content max-w-3xl mx-auto">
          <h2>How to make Minecraft pixel art</h2>
          <ol>
            <li><strong>Upload an image</strong> — pick something with bold, clear colors for the best result.</li>
            <li><strong>Choose a width</strong> in blocks (64 is great for most murals; 128 = one full map).</li>
            <li><strong>Pick a palette</strong> — concrete is the most vibrant, or use map colors for map art.</li>
            <li><strong>Generate</strong> and review the block grid, then grab your <Link href="/block-list/">block shopping list</Link>.</li>
            <li><strong>Build it</strong> in survival or creative, or export a schematic to place it instantly.</li>
          </ol>
          <p>
            New to this? Start with our <Link href="/blog/pixel-art-tutorial/">pixel art tutorial</Link> or browse{" "}
            <Link href="/templates/">pixel art templates and ideas</Link>. Want it on an in-game map? See the{" "}
            <Link href="/map-art/">map art generator</Link>.
          </p>
        </section>

        {/* Internal-link cards */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Explore the tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { href: "/image-converter/", title: "Image Converter", body: "Convert any picture or photo to Minecraft blocks instantly." },
              { href: "/pixel-art-generator/", title: "Pixel Art Generator", body: "The full image-to-blocks converter with live preview." },
              { href: "/block-list/", title: "Block Shopping List", body: "Count every block and export a CSV for survival builds." },
              { href: "/map-art/", title: "Map Art Generator", body: "128×128 map-color art that displays on a Minecraft map." },
              { href: "/java/", title: "Java Edition", body: "Tips and palettes tuned for Minecraft Java." },
              { href: "/bedrock/", title: "Bedrock Edition", body: "Make pixel art for Minecraft Bedrock and consoles." },
              { href: "/templates/", title: "Templates & Ideas", body: "Characters, logos, easy builds and grid templates." },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="card p-5 hover:border-[var(--color-accent)] transition-colors">
                <h3 className="font-semibold mb-1.5">{c.title}</h3>
                <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">{c.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="max-w-3xl mx-auto">
          <Faq items={FAQS} />
        </div>
      </div>
    </main>
  );
}
