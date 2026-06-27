import { SITE_URL, SITE_NAME } from "./seo";

// Structured-data builders (Schema.org / JSON-LD). Injected via <JsonLd> so
// Google can render rich results and understand each page's purpose.

export function softwareAppLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${SITE_NAME} — Minecraft Pixel Art Generator`,
    url: SITE_URL,
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free browser-based tool that converts any image into Minecraft pixel art, with a block shopping list and PNG export.",
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function howToLd(input: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** Breadcrumb trail. Pass items in order, each with a label + absolute-ish path. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
