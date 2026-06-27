import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = pageMeta({
  title: "Minecraft Pixel Art Templates & Ideas",
  description:
    "Browse Minecraft pixel art templates and ideas — characters, logos, easy beginner builds, and grid templates. Pick a category and generate your own.",
  path: "/templates/",
});

export default function TemplatesIndex() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Templates", path: "/templates/" }]} />

      <div className="mt-6 mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Minecraft Pixel Art Templates & Ideas</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">
          Not sure what to build? Pick a category for inspiration, then turn your image into blocks with
          the <Link href="/pixel-art-generator/" className="text-[var(--color-accent-dark)] underline">generator</Link>.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {TEMPLATES.map((t) => (
          <Link key={t.slug} href={`/templates/${t.slug}/`} className="card p-6 hover:border-[var(--color-accent)] transition-colors">
            <h2 className="text-lg font-semibold mb-1.5">{t.name} pixel art</h2>
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">{t.intro}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
