import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolLoader from "@/components/tool/ToolLoader";
import { TEMPLATES, TEMPLATE_SLUGS, getTemplate } from "@/lib/templates";

// Pre-render every template page at build time (required for static export).
export function generateStaticParams() {
  return TEMPLATE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) return {};
  return pageMeta({ title: t.title, description: t.description, path: `/templates/${slug}/` });
}

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) notFound();

  const others = TEMPLATES.filter((x) => x.slug !== slug);

  return (
    <main className="container-page py-8">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Templates", path: "/templates/" },
          { name: t.name, path: `/templates/${slug}/` },
        ]}
      />

      <div className="mt-6 mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t.h1}</h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] leading-relaxed">{t.intro}</p>
      </div>

      <ToolLoader />

      <section className="prose-content max-w-3xl mt-10">
        <h2>Ideas for {t.name.toLowerCase()} pixel art</h2>
        <ul>
          {t.ideas.map((idea) => (
            <li key={idea}>{idea}</li>
          ))}
        </ul>
        <p>
          Upload your image above to generate a buildable grid and a{" "}
          <Link href="/block-list/">block shopping list</Link>. New to pixel art? Read the{" "}
          <Link href="/blog/pixel-art-tutorial/">tutorial</Link>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">More templates</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {others.map((o) => (
            <Link key={o.slug} href={`/templates/${o.slug}/`} className="card p-4 hover:border-[var(--color-accent)] transition-colors">
              <span className="font-semibold text-sm">{o.name} pixel art</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
