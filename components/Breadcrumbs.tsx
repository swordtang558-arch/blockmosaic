import Link from "next/link";
import { breadcrumbLd } from "@/lib/jsonld";
import JsonLd from "./JsonLd";

export interface Crumb {
  name: string;
  path: string;
}

// Renders the visible breadcrumb trail AND its BreadcrumbList structured data,
// keeping the two in sync from one source.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(items)} />
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-muted)]">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span className="text-[var(--color-ink-soft)] font-medium" aria-current="page">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="hover:text-[var(--color-accent-dark)]">
                    {c.name}
                  </Link>
                )}
                {!last && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
