import { faqLd } from "@/lib/jsonld";
import JsonLd from "./JsonLd";

export interface FaqItem {
  q: string;
  a: string;
}

// Renders an accessible FAQ section AND its FAQPage structured data from one
// source — keeps visible copy and rich-result markup identical.
export default function Faq({ items, heading = "Frequently asked questions" }: { items: FaqItem[]; heading?: string }) {
  return (
    <section className="py-4">
      <JsonLd data={faqLd(items)} />
      <h2 className="text-2xl font-bold tracking-tight mb-6">{heading}</h2>
      <div className="space-y-3">
        {items.map((f) => (
          <details key={f.q} className="card p-4 group">
            <summary className="cursor-pointer font-semibold text-[var(--color-ink)] list-none flex items-center justify-between">
              {f.q}
              <span className="text-[var(--color-muted)] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-[var(--color-ink-soft)] leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
