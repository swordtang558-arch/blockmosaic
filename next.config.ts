import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → ships plain HTML for every route. Required for SEO
  // (full server-rendered HTML) and for Cloudflare Pages / Vercel static hosting.
  output: "export",
  // next/image optimization needs a server; disable it for static export.
  images: { unoptimized: true },
  // Emit /route/index.html so static hosts serve clean URLs without config.
  trailingSlash: true,
};

export default nextConfig;
