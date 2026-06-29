import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { softwareAppLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import AdSlot from "@/components/AdSlot";
import GenericLoader from "@/components/tool/GenericLoader";

export const metadata: Metadata = pageMeta({
  title: "Pixel Art Converter – Turn Photos Into Pixel Art Free",
  description:
    "Free online pixel art converter. Convert JPG, PNG or WEBP photos into pixel art with adjustable size, palette and dithering, then export a PNG. No signup.",
  path: "/pixel-art-converter/",
});

const FAQS = [
  { q: "What is a pixel art converter?", a: "A tool that transforms an ordinary image into pixel art by reducing its resolution to a grid of pixels and optionally limiting its color palette. The result is a stylized, retro version of your picture." },
  { q: "Which file types are supported?", a: "JPG/JPEG, PNG, WEBP and GIF. Files are processed locally in your browser — nothing is uploaded." },
  { q: "How many colors should I use?", a: "8–16 colors give a strong retro look; 32–64 keep more nuance. Full color skips palette reduction and just pixelates the image." },
];

export default function PixelArtConverterPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Pixel Art Converter", path: "/pixel-art-converter/" }]} />
      <JsonLd data={softwareAppLd()} />

      <div className="mt-6 mb-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Pixel Art Converter</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Convert any photo into pixel art in seconds. Adjustable pixel size, color palette and dithering,
          with instant PNG export — free and private, right in your browser.
        </p>
      </div>

      <div className="mb-6"><AdSlot slot="" label="pac-top" minHeight={120} /></div>

      <GenericLoader />

      <div className="my-10"><AdSlot slot="" label="pac-mid" minHeight={250} /></div>

      <section className="prose-content max-w-3xl">
        <h2>Convert photos to pixel art</h2>
        <p>
          A <strong>pixel art converter</strong> reduces an image to a grid of square pixels and a smaller
          color palette, recreating the look of classic sprite art. Use a smaller pixel width for a chunkier,
          more retro result, or a larger one to keep detail.
        </p>
        <h3>Related tools</h3>
        <p>
          Need it as blocks? See the <Link href="/image-to-pixel-art/">image to pixel art tool</Link> or the{" "}
          <Link href="/pixel-art-generator/">Minecraft pixel art generator</Link>. Working with PNGs
          specifically? Try <Link href="/png-to-pixel-art/">PNG to pixel art</Link>.
        </p>
      </section>

      <div className="max-w-3xl mt-8"><Faq items={FAQS} /></div>
    </main>
  );
}
