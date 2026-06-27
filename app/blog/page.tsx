import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { POSTS } from "@/lib/blog";

export const metadata: Metadata = pageMeta({
  title: "Minecraft Pixel Art Blog – Tutorials & Ideas",
  description:
    "Guides for Minecraft pixel art: step-by-step tutorials, how to convert images to blocks, build ideas, and a map art walkthrough. Learn and start building.",
  path: "/blog/",
});

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }]} />

      <div className="mt-6 mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Pixel Art Guides & Tutorials</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Learn how to plan, generate and build Minecraft pixel art — from your first mural to full map art.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}/`} className="card p-6 block hover:border-[var(--color-accent)] transition-colors">
            <h2 className="text-xl font-semibold mb-1.5">{p.title}</h2>
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">{p.excerpt}</p>
            <span className="text-xs text-[var(--color-muted)] mt-2 inline-block">{p.date}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
