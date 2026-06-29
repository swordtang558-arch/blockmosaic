# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> Heed AGENTS.md above: this is Next.js 16 (App Router) with breaking changes from older versions — verify APIs against `node_modules/next/dist/docs/` before writing Next-specific code.

## What this is

**BlockMosaic** (brand) — an SEO-first English tool site that converts images into Minecraft blocks. Live at **mcimagetool.com** (Vercel, auto-deploys on push to `master`). The brand name is deliberately distinct from the "Minecraft" trademark; every page footer carries a Mojang disclaimer.

## Commands

```bash
npm run dev      # dev server on PORT 3001 (3000 is used by a sibling project)
npm run build    # next build → static export to ./out/
npm run lint     # eslint
```

No test suite. Verify changes by building and/or driving the dev server. There is no separate export step — `output: "export"` makes `next build` emit the static site to `out/`.

## Build / config gotchas (will bite you)

- **Static export**: `next.config.ts` sets `output: "export"`, `images.unoptimized`, `trailingSlash: true`. All routes are SSG; no server runtime. Dynamic routes need `generateStaticParams`.
- **`tsconfig.json` must keep `target: "ES2020"`** (BigInt literals in `lib/nbt.ts`) and **`exclude: ["out"]`** — the build copies the worker `.ts` into `out/`, and without the exclude the next type-check re-checks that stale copy and fails. If a build fails on a file under `out/`, delete `out/` and rebuild.
- Env vars (all `NEXT_PUBLIC_*`, see `.env.example`): `NEXT_PUBLIC_SITE_URL` drives canonical/OG/sitemap URLs (set in Vercel to `https://mcimagetool.com`); `GA_ID`, `ADSENSE_ID`, `GSC_VERIFICATION` are optional and degrade gracefully when empty.

## Architecture

**SEO-first rendering split.** Page content (text, FAQ, internal links, JSON-LD) lives in **server components** so it is in the initial HTML for crawlers. The interactive tool is loaded client-only and lazily via `components/tool/ToolLoader.tsx` (`dynamic(ssr: false)`), keeping the heavy image-processing code out of the first-load bundle. Pages embed `<ToolLoader />`; pass `mapMode`/`defaultWidth` to specialize (e.g. `/map-art`).

**Conversion pipeline** (all client-side; user images never leave the browser):
`PixelArtTool` resolves a palette → `runConvert` (`lib/runConvert.ts`) runs `convertImage` in a **Web Worker** (`lib/worker/convert.worker.ts`), falling back to the main thread → returns a `ConversionResult` (grid of `PixelBlock` + `materialCounts`).
- `lib/converter.ts` — `convertImage(imageData, outputWidth, palette: MinecraftBlock[], { staircase, dither })`. Box-average downsample, then nearest-color match with optional Floyd–Steinberg / ordered dithering. The caller passes an explicit resolved palette array (not a preset key).
- `PixelArtTool` builds that palette from the `BlockPicker` selection minus active attribute filters; in `mapMode` it uses `MAP_COLORS` instead.

**Block data** — `lib/blocks.ts` is the single source: ~160 blocks each with `category` + attribute flags (`transparent/falling/light/redstone/survival`), plus `MAP_COLORS` (official map palette) and `SHADE_MULTIPLIERS` (staircase shading). **RGB values were computed from real Minecraft textures**, not hand-tuned — the matching `public/textures/<id>.png` thumbnails were extracted from the official client jar. To refresh colors/textures, re-extract from a client jar and recompute averages (the extraction/recolor script is ad-hoc, not kept in the repo).

**Export** — `lib/schematic.ts` + `lib/nbt.ts` (a from-scratch big-endian NBT writer + browser `CompressionStream` gzip) produce `.litematic` (Litematica), `.schem` (Sponge/WorldEdit), and `.mcfunction`. `buildGrid` takes an `Orientation` (`"wall"` upright mural vs `"floor"` flat map art) that changes the exported coordinate layout.

**SEO plumbing**:
- `lib/seo.ts` `pageMeta()` — per-page title/description/canonical/OG/Twitter factory.
- `lib/jsonld.ts` + `components/JsonLd.tsx` — `WebApplication` / `HowTo` / `FAQPage` / `BreadcrumbList` structured data. `components/Breadcrumbs.tsx` renders the trail and emits its JSON-LD from one source.
- `app/sitemap.ts` + `app/robots.ts` — generated at build; sitemap pulls static paths plus `TEMPLATE_SLUGS` and `BLOG_SLUGS`.

**Data-driven long-tail pages.** Template and blog pages are generated from data, not hand-authored per file:
- Add a `/templates/<slug>/` page → add an entry to `TEMPLATES` in `lib/templates.ts`.
- Add a `/blog/<slug>/` post → add an entry to `POSTS` in `lib/blog.ts` (set `howTo` to emit HowTo schema).
Both automatically appear in their index page, the sitemap, and related-link sections. For a brand-new section, create `app/<route>/page.tsx`, export metadata via `pageMeta()`, add `<Breadcrumbs>`, and add the path to `app/sitemap.ts`.

**Monetization hooks** — `components/AdSlot.tsx` renders reserved ad placeholders (no layout shift) until `NEXT_PUBLIC_ADSENSE_ID` is set; then it emits real AdSense `<ins>` units (pass the `slot` id).
