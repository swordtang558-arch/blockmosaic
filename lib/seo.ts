import type { Metadata } from "next";

// Single source of truth for site-wide SEO constants.
// SITE_URL drives metadataBase, canonicals, OG urls and the sitemap — set it
// via NEXT_PUBLIC_SITE_URL in production (see .env.example).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://blockmosaic.app"
).replace(/\/$/, "");

export const SITE_NAME = "BlockMosaic";
// Brand name (BlockMosaic) is intentionally distinct from the "Minecraft"
// trademark; page titles target the keyword, the brand does not impersonate it.

export const SITE_TAGLINE = "Minecraft Pixel Art Generator";

interface PageMetaInput {
  title: string; // <60 chars incl. brand suffix budget
  description: string; // 150–160 chars, with keyword + CTA
  /** Route path beginning with "/", e.g. "/block-list/". Used for canonical + OG url. */
  path: string;
  ogImage?: string;
}

/**
 * Builds per-page Metadata: unique title/description, canonical (avoids
 * duplicate-content penalties), and Open Graph + Twitter cards (social → backlinks).
 */
export function pageMeta({ title, description, path, ogImage }: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage || "/og-default.png";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
