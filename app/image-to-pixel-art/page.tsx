import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { softwareAppLd, howToLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import AdSlot from "@/components/AdSlot";
import GenericLoader from "@/components/tool/GenericLoader";

export const metadata: Metadata = pageMeta({
  title: "Image to Pixel Art Converter – Free Online Tool",
  description:
    "Turn any image into pixel art online for free. Choose pixel size, reduce colors, add dithering, and download a crisp PNG. No signup, runs in your browser.",
  path: "/image-to-pixel-art/",
});

const FAQS = [
  { q: "How do I turn an image into pixel art?", a: "Upload your image, choose a pixel width, optionally reduce the color count, and convert. You get a pixelated version you can download as a PNG — at actual size or upscaled." },
  { q: "Is it free?", a: "Yes, completely free with no signup and no watermark. Everything runs in your browser, so your image is never uploaded." },
  { q: "What does the color setting do?", a: "It reduces the image to a limited palette using median-cut quantization — fewer colors give a more retro, stylized pixel-art look. Choose Full color to keep the original palette." },
  { q: "Can I make Minecraft pixel art instead?", a: "Yes — use the Minecraft pixel art generator to map your image to real Minecraft blocks with a block list and schematic export." },
];

const HOWTO = howToLd({
  name: "How to convert an image to pixel art",
  description: "Convert any image into downloadable pixel art online.",
  steps: [
    { name: "Upload an image", text: "Drag and drop a PNG or JPG." },
    { name: "Set pixel size", text: "Pick how many pixels wide the result should be." },
    { name: "Reduce colors (optional)", text: "Choose a limited palette for a retro look, or keep full color." },
    { name: "Convert and download", text: "Convert, then download the PNG at actual size or upscaled." },
  ],
});

export default function ImageToPixelArtPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Image to Pixel Art", path: "/image-to-pixel-art/" }]} />
      <JsonLd data={softwareAppLd()} />
      <JsonLd data={HOWTO} />

      <div className="mt-6 mb-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Image to Pixel Art Converter</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Turn any photo or image into pixel art. Pick a pixel size, reduce the color palette, add
          dithering, and download a crisp PNG — all in your browser, free.
        </p>
      </div>

      <div className="mb-6"><AdSlot slot="" label="i2pa-top" minHeight={120} /></div>

      <GenericLoader />

      <div className="my-10"><AdSlot slot="" label="i2pa-mid" minHeight={250} /></div>

      <section className="prose-content max-w-3xl">
        <h2>Make pixel art from any picture</h2>
        <p>
          This free <strong>image to pixel art converter</strong> downsamples your picture into a grid of
          pixels and can quantize it to a limited palette for that classic retro look. Lower pixel sizes and
          fewer colors give a more stylized result; higher values keep detail.
        </p>
        <h3>Dithering for smoother gradients</h3>
        <p>
          When you reduce colors, dithering blends the limited palette so gradients look smoother. Try
          Floyd–Steinberg for photos, or Ordered for a patterned, retro feel.
        </p>
        <h3>Building in Minecraft?</h3>
        <p>
          If you want to build your pixel art out of blocks, use the{" "}
          <Link href="/pixel-art-generator/">Minecraft pixel art generator</Link> — it maps your image to
          real blocks and gives you a <Link href="/block-list/">block shopping list</Link> and{" "}
          <Link href="/image-to-schematic/">schematic export</Link>.
        </p>
      </section>

      <div className="max-w-3xl mt-8"><Faq items={FAQS} /></div>
    </main>
  );
}
