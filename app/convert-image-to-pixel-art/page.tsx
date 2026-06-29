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
  title: "Convert Image to Pixel Art – Free, No Signup",
  description:
    "Convert any image to pixel art free and instantly. Adjust pixel size, colors and dithering, then download a PNG. Works in your browser — nothing uploaded.",
  path: "/convert-image-to-pixel-art/",
});

const FAQS = [
  { q: "How do I convert an image to pixel art?", a: "Upload the image, set the pixel width and number of colors, choose a dithering style, then click convert and download the PNG." },
  { q: "Is anything uploaded to a server?", a: "No. All processing happens locally in your browser, so your images stay private." },
  { q: "What's the best size for an avatar or sprite?", a: "Try 32 or 64 pixels wide with 16–32 colors for a clean sprite look. Use the upscaled PNG export so it stays crisp when displayed." },
];

const HOWTO = howToLd({
  name: "How to convert an image to pixel art",
  description: "Step-by-step conversion of any image into pixel art.",
  steps: [
    { name: "Upload", text: "Add your image (PNG, JPG, WEBP or GIF)." },
    { name: "Choose size & colors", text: "Set the pixel width and palette size." },
    { name: "Convert", text: "Apply optional dithering and convert." },
    { name: "Download", text: "Export the pixel-art PNG, actual size or upscaled." },
  ],
});

export default function ConvertImageToPixelArtPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Convert Image to Pixel Art", path: "/convert-image-to-pixel-art/" }]} />
      <JsonLd data={softwareAppLd()} />
      <JsonLd data={HOWTO} />

      <div className="mt-6 mb-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Convert Image to Pixel Art</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Drop in any image and convert it to pixel art instantly. Control the pixel size, color palette and
          dithering, then download a PNG. Free, private, no signup.
        </p>
      </div>

      <div className="mb-6"><AdSlot slot="" label="ci2pa-top" minHeight={120} /></div>

      <GenericLoader />

      <div className="my-10"><AdSlot slot="" label="ci2pa-mid" minHeight={250} /></div>

      <section className="prose-content max-w-3xl">
        <h2>The fastest way to convert an image to pixel art</h2>
        <p>
          Upload, pick a pixel size, and convert — that&apos;s it. Reduce the palette for a retro sprite look
          or keep full color for a faithful pixelated photo. Export at actual size for sprites or upscaled for
          posters and avatars.
        </p>
        <h3>More pixel-art tools</h3>
        <p>
          Prefer a specific entry point? See <Link href="/image-to-pixel-art/">image to pixel art</Link>,{" "}
          <Link href="/png-to-pixel-art/">PNG to pixel art</Link>, or build it in blocks with the{" "}
          <Link href="/pixel-art-generator/">Minecraft pixel art generator</Link>.
        </p>
      </section>

      <div className="max-w-3xl mt-8"><Faq items={FAQS} /></div>
    </main>
  );
}
