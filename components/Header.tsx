import Link from "next/link";
import Logo from "./Logo";
import { SITE_NAME } from "@/lib/seo";

const NAV = [
  { href: "/image-converter/", label: "Image Converter" },
  { href: "/pixel-art-generator/", label: "Generator" },
  { href: "/block-list/", label: "Block List" },
  { href: "/map-art/", label: "Map Art" },
  { href: "/templates/", label: "Templates" },
  { href: "/blog/", label: "Blog" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[var(--color-line)]">
      <div className="container-page flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-[var(--color-ink)]">
          <Logo />
          <span className="text-lg tracking-tight">{SITE_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-accent-dark)] transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link href="/pixel-art-generator/" className="btn btn-primary text-sm py-2">
          Open Generator
        </Link>
      </div>
    </header>
  );
}
