"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[var(--color-line)]">
      <div className="container-page flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-[var(--color-ink)]" onClick={() => setOpen(false)}>
          <Logo />
          <span className="text-lg tracking-tight">{SITE_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-accent-dark)] transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/pixel-art-generator/" className="btn btn-primary text-sm py-2 hidden sm:inline-flex">
            Open Generator
          </Link>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--color-line)] text-[var(--color-ink)]"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                    : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="md:hidden border-t border-[var(--color-line)] bg-white">
          <div className="container-page py-2 flex flex-col">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2.5 text-sm font-medium text-[var(--color-ink-soft)] border-b border-[var(--color-line)] last:border-0">
                {n.label}
              </Link>
            ))}
            <Link href="/pixel-art-generator/" onClick={() => setOpen(false)} className="btn btn-primary mt-3 mb-1">
              Open Generator
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
