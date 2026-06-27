import Link from "next/link";
import Logo from "./Logo";
import { SITE_NAME } from "@/lib/seo";

const COLS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Tools",
    links: [
      { href: "/image-converter/", label: "Image Converter" },
      { href: "/pixel-art-generator/", label: "Pixel Art Generator" },
      { href: "/block-list/", label: "Block Shopping List" },
      { href: "/map-art/", label: "Map Art Generator" },
    ],
  },
  {
    title: "Editions",
    links: [
      { href: "/java/", label: "Java Edition" },
      { href: "/bedrock/", label: "Bedrock Edition" },
      { href: "/templates/", label: "Templates" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/blog/pixel-art-tutorial/", label: "Pixel Art Tutorial" },
      { href: "/blog/how-to-make-pixel-art-from-image/", label: "Image to Pixel Art" },
      { href: "/blog/minecraft-map-art-tutorial/", label: "Map Art Tutorial" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Logo size={24} />
              <span>{SITE_NAME}</span>
            </Link>
            <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">
              Free, browser-based Minecraft pixel art generator. Your images never leave your device.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-[var(--color-ink)] mb-3">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent-dark)]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trademark disclaimer — required on every page. */}
        <div className="mt-10 pt-6 border-t border-[var(--color-line)] text-xs text-[var(--color-muted)] leading-relaxed">
          <div className="flex flex-wrap gap-4 mb-3">
            <Link href="/about/" className="hover:text-[var(--color-accent-dark)]">About</Link>
            <Link href="/privacy/" className="hover:text-[var(--color-accent-dark)]">Privacy Policy</Link>
            <Link href="/blog/" className="hover:text-[var(--color-accent-dark)]">Blog</Link>
          </div>
          <p>
            Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
            &ldquo;Minecraft&rdquo; is a trademark of Mojang Synergies AB.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
