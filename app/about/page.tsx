import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta, SITE_NAME } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "About BlockMosaic — a free, browser-based Minecraft pixel art generator and image converter built for players who want to turn pictures into blocks.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about/" }]} />

      <article className="prose-content max-w-3xl mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">About {SITE_NAME}</h1>

        <p>
          {SITE_NAME} is a free, browser-based toolkit for turning pictures into Minecraft blocks. It
          started from a simple frustration: converting an image into pixel art by hand — matching colors
          block by block and counting materials — takes hours. These tools do it in seconds.
        </p>

        <h2>What you can do here</h2>
        <ul>
          <li><Link href="/image-converter/">Image Converter</Link> — turn any photo or picture into Minecraft blocks.</li>
          <li><Link href="/pixel-art-generator/">Pixel Art Generator</Link> — create murals with a live grid preview.</li>
          <li><Link href="/block-list/">Block Shopping List</Link> — get an exact block count and CSV for survival builds.</li>
          <li><Link href="/map-art/">Map Art Generator</Link> — make 128×128 map art using official map colors.</li>
        </ul>

        <h2>Our approach</h2>
        <p>
          Everything runs in your browser. Your images are never uploaded to a server — they are processed
          on your own device and never leave it. The tools are free to use, with no account required. We
          keep the site fast, simple, and focused on doing one thing well: getting you from a picture to a
          buildable design.
        </p>

        <h2>Who makes this</h2>
        <p>
          {SITE_NAME} is an independent project maintained by a small team of Minecraft players and web
          developers. We&apos;re not affiliated with Mojang or Microsoft — see the disclaimer below — and we
          build these tools because we use them ourselves.
        </p>

        <h2>Contact</h2>
        <p>
          Found a bug, have a feature request, or want to say hello? Email us at{" "}
          <a href="mailto:swordtang558@gmail.com">swordtang558@gmail.com</a>. We read everything and use your
          feedback to decide what to build next.
        </p>

        <p className="text-sm text-[var(--color-muted)]">
          Read how we handle data in our <Link href="/privacy/">Privacy Policy</Link>.
        </p>
      </article>
    </main>
  );
}
