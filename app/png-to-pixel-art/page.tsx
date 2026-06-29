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
  title: "PNG to Pixel Art Converter – Free Online",
  description:
    "Convert PNG images to pixel art free. Upload a PNG, set pixel size and palette, add dithering, and download pixel-art PNG. Handles transparency. No signup.",
  path: "/png-to-pixel-art/",
});

const FAQS = [
  { q: "How do I convert a PNG to pixel art?", a: "Upload your PNG, choose a pixel width and color count, then convert. Download the pixelated PNG at actual size or upscaled for crisp display." },
  { q: "Does it keep PNG transparency?", a: "The converter samples visible pixels; fully transparent areas are ignored when building the palette. For solid pixel-art sprites, use an image with a clean background." },
  { q: "Why PNG instead of JPG?", a: "PNG is lossless, so edges and flat colors stay sharp — ideal input for clean pixel art. JPG also works but can introduce compression noise around edges." },
];

export default function PngToPixelArtPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "PNG to Pixel Art", path: "/png-to-pixel-art/" }]} />
      <JsonLd data={softwareAppLd()} />

      <div className="mt-6 mb-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">PNG to Pixel Art Converter</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Convert PNG images into clean pixel art. Set the pixel size and palette, add dithering, and export
          a sharp PNG — free, no signup, processed in your browser.
        </p>
      </div>

      <div className="mb-6"><AdSlot slot="" label="png-top" minHeight={120} /></div>

      <GenericLoader />

      <div className="my-10"><AdSlot slot="" label="png-mid" minHeight={250} /></div>

      <section className="prose-content max-w-3xl">
        <h2>Turn a PNG into pixel art</h2>
        <p>
          PNG is the best input format for pixel art because it&apos;s lossless — flat colors and sharp edges
          survive the conversion cleanly. Upload your PNG, pick a pixel width, optionally reduce colors for a
          retro palette, and download the result.
        </p>
        <h3>Other formats and tools</h3>
        <p>
          Got a JPG or photo? The <Link href="/image-to-pixel-art/">image to pixel art converter</Link> works
          the same way. Want to build it in Minecraft? Use the{" "}
          <Link href="/pixel-art-generator/">Minecraft pixel art generator</Link>.
        </p>
      </section>

      <div className="max-w-3xl mt-8"><Faq items={FAQS} /></div>
    </main>
  );
}
