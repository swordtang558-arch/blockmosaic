import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { softwareAppLd, howToLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import AdSlot from "@/components/AdSlot";
import ToolLoader from "@/components/tool/ToolLoader";

// Head core page — targets the high-value, low-KD "converter" keyword cluster
// (minecraft image converter, convert picture to minecraft, etc.). High CPC, so
// ad slots are placed prominently above and within the content.
export const metadata: Metadata = pageMeta({
  title: "Minecraft Image Converter – Picture to Blocks (Free)",
  description:
    "Free Minecraft image converter. Convert any picture or photo to Minecraft blocks instantly — with a grid preview, block list, and PNG export. No signup.",
  path: "/image-converter/",
});

const FAQS = [
  { q: "What is a Minecraft image converter?", a: "It's a free tool that converts any picture or photo into Minecraft blocks. Upload an image and it matches every pixel to the closest block, giving you a buildable grid plus a list of blocks used." },
  { q: "How do I convert a picture to Minecraft?", a: "Upload your image, choose how many blocks wide the result should be, pick a block palette, and click convert. You'll get a block-by-block preview you can download as a PNG." },
  { q: "Is the image converter free?", a: "Yes — it's completely free with no signup and no watermark. Your image is processed in your browser and never uploaded to a server." },
  { q: "What image formats can I convert?", a: "PNG, JPG/JPEG, WEBP and GIF. For best results use a clear image with bold colors rather than a blurry or very detailed photo." },
];

const HOWTO = howToLd({
  name: "How to convert an image to Minecraft blocks",
  description: "Convert any picture into Minecraft blocks with the image converter.",
  steps: [
    { name: "Upload a picture", text: "Drag and drop a PNG or JPG, or click to browse." },
    { name: "Set the block width", text: "Choose how many blocks wide the result should be (32, 64, 128 or custom)." },
    { name: "Convert", text: "Click convert to match every pixel to the closest Minecraft block." },
    { name: "Download", text: "Save the PNG, export the block list as CSV, or download a schematic." },
  ],
});

export default function ImageConverterPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Image Converter", path: "/image-converter/" }]} />
      <JsonLd data={softwareAppLd()} />
      <JsonLd data={HOWTO} />

      <div className="mt-6 mb-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Minecraft Image Converter</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Convert any picture or photo to Minecraft blocks in seconds. Upload an image, preview the block
          grid, and download it — everything runs in your browser, nothing is uploaded.
        </p>
      </div>

      {/* High-CPC keyword cluster — prominent ad placement above the tool */}
      <div className="mb-6">
        <AdSlot slot="" label="converter-top" minHeight={120} />
      </div>

      <ToolLoader />

      <div className="my-10">
        <AdSlot slot="" label="converter-mid" minHeight={250} />
      </div>

      <section className="prose-content max-w-3xl">
        <h2>Convert a picture to Minecraft blocks</h2>
        <p>
          This <strong>Minecraft image converter</strong> turns photos, logos and artwork into blocks by
          matching every pixel to the closest Minecraft block color. It&apos;s the fastest way to go from a
          picture to a buildable design — no manual color matching, no mods.
        </p>
        <h3>Photo to pixel art</h3>
        <p>
          Want a portrait or photo as <strong>Minecraft pixel art</strong>? Upload it, pick a larger width
          like 128 for more detail, and convert. For a polished mural, use the{" "}
          <Link href="/pixel-art-generator/">pixel art generator</Link>; for an in-game map, use the{" "}
          <Link href="/map-art/">map art converter</Link>.
        </p>
        <h3>Get your block list</h3>
        <p>
          Building in survival? After converting, open the{" "}
          <Link href="/block-list/">block shopping list</Link> to see exactly how many of each block you
          need. New here? Follow the{" "}
          <Link href="/blog/how-to-convert-image-to-minecraft/">guide to converting images to Minecraft</Link>.
        </p>
      </section>

      <div className="max-w-3xl mt-8">
        <Faq items={FAQS} />
      </div>
    </main>
  );
}
