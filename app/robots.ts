import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Generates /robots.txt at build time: allow full crawl, point to the sitemap.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
