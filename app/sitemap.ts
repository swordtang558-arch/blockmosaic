import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { TEMPLATE_SLUGS } from "@/lib/templates";
import { BLOG_SLUGS } from "@/lib/blog";

// Auto-generated sitemap.xml — rebuilt on every `next build`. Add new long-tail
// routes to the lists below (or their source data) and they appear here.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "/",
    "/image-converter/",
    "/pixel-art-generator/",
    "/block-list/",
    "/bedrock/",
    "/java/",
    "/map-art/",
    "/templates/",
    "/blog/",
    "/about/",
    "/privacy/",
  ];

  const templatePaths = TEMPLATE_SLUGS.map((s) => `/templates/${s}/`);
  const blogPaths = BLOG_SLUGS.map((s) => `/blog/${s}/`);

  return [...staticPaths, ...templatePaths, ...blogPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority:
      path === "/"
        ? 1
        : path === "/image-converter/" || path === "/pixel-art-generator/"
          ? 0.9
          : 0.7,
  }));
}
