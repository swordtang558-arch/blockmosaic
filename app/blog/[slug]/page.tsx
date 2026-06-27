import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { howToLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_SLUGS, getPost } from "@/lib/blog";
import { getTemplate } from "@/lib/templates";

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMeta({ title: p.title, description: p.description, path: `/blog/${slug}/` });
}

// Resolve a related ref (either a tool path like "/block-list/" or a blog slug).
function relatedLink(ref: string): { href: string; label: string } {
  if (ref.startsWith("/")) {
    const labels: Record<string, string> = {
      "/pixel-art-generator/": "Pixel Art Generator",
      "/block-list/": "Block Shopping List",
      "/map-art/": "Map Art Generator",
      "/templates/": "Templates & Ideas",
    };
    return { href: ref, label: labels[ref] ?? ref };
  }
  const post = getPost(ref);
  if (post) return { href: `/blog/${ref}/`, label: post.title };
  const tpl = getTemplate(ref);
  if (tpl) return { href: `/templates/${ref}/`, label: `${tpl.name} pixel art` };
  return { href: `/blog/${ref}/`, label: ref };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="container-page py-8">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
          { name: post.h1, path: `/blog/${slug}/` },
        ]}
      />
      {post.howTo && <JsonLd data={howToLd(post.howTo)} />}

      <article className="max-w-3xl mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{post.h1}</h1>
        <p className="text-sm text-[var(--color-muted)] mt-2">{post.date}</p>

        <div className="prose-content mt-6">
          {post.sections.map((s) => (
            <section key={s.h2}>
              <h2>{s.h2}</h2>
              {s.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <p className="mt-6">
            Ready to build? Open the <Link href="/pixel-art-generator/">pixel art generator</Link> and turn
            your image into blocks.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Related</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {post.related.map((ref) => {
              const { href, label } = relatedLink(ref);
              return (
                <Link key={ref} href={href} className="card p-4 hover:border-[var(--color-accent)] transition-colors">
                  <span className="font-semibold text-sm">{label}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </article>
    </main>
  );
}
