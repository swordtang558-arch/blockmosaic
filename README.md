# BlockMosaic — Minecraft Pixel Art Generator

A free, SEO-first tool site that converts images into Minecraft pixel art. Built with
**Next.js (App Router) + TypeScript + Tailwind CSS**, statically exported for fast,
crawlable pages. All image processing runs in the browser (Canvas + Web Worker) — user
images are never uploaded.

> Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
> "Minecraft" is a trademark of Mojang Synergies AB. "BlockMosaic" is this site's own brand.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3001
npm run build                # static export → ./out
```

`npm run build` outputs a fully static site to `out/` (configured via `output: "export"`
in `next.config.ts`). No server runtime is required to host it.

---

## Environment variables

Copy `.env.example` to `.env.local`. All are optional except the site URL in production.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public origin (no trailing slash). Drives canonical tags, Open Graph URLs, and `sitemap.xml`. **Set this in production.** |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (`G-XXXXXXXXXX`). Empty = analytics disabled. |
| `NEXT_PUBLIC_ADSENSE_ID` | AdSense publisher ID (`ca-pub-…`). Empty = ad slots show as labeled placeholders. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML-tag token. Optional (sitemap verification also works). |

Never commit real values — `.env.local` is gitignored.

---

## Deploying

### Cloudflare Pages
1. Connect the repo. Build command: `npm run build`. Output directory: `out`.
2. Add the environment variables above in the Pages project settings.
3. Deploy. Clean URLs work out of the box (`trailingSlash: true` emits `route/index.html`).

### Vercel
1. Import the repo — Vercel auto-detects Next.js.
2. Add the environment variables in Project Settings → Environment Variables.
3. Deploy. The static export is served directly.

---

## Configure analytics & Search Console

**GA4** — set `NEXT_PUBLIC_GA_ID`. The gtag script (in `app/layout.tsx`) loads only when
the ID is present, using `next/script` with `afterInteractive` so it never blocks first paint.

**Search Console** — two options:
- **Sitemap method (recommended):** deploy, then in Search Console add your property and
  submit `https://your-domain/sitemap.xml`.
- **HTML-tag method:** set `NEXT_PUBLIC_GSC_VERIFICATION` to the token from the
  `<meta name="google-site-verification" content="…">` tag Google gives you, then redeploy.

**AdSense** — set `NEXT_PUBLIC_ADSENSE_ID`, create ad units in the AdSense dashboard, and
pass each unit's slot id into the `<AdSlot slot="…" />` placeholders (see `components/AdSlot.tsx`).
Until then, ad slots render as reserved placeholders so there's no layout shift.

---

## Project structure

```
app/
  layout.tsx            Global metadata, fonts (Inter), GA4, Header/Footer
  page.tsx              Home (content landing + CTA)
  pixel-art-generator/  Core tool page
  block-list/           Block shopping list page (CSV export)
  map-art/              Map-art landing (locks tool to map-color palette)
  bedrock/  java/       Edition landing pages
  templates/            Index + [slug] template pages
  blog/                 Index + [slug] posts (HowTo schema where relevant)
  sitemap.ts robots.ts  Auto-generated sitemap.xml & robots.txt
components/
  Header Footer Breadcrumbs Faq AdSlot JsonLd Logo
  tool/                 Client-only generator (lazy-loaded)
    ToolLoader.tsx        dynamic(ssr:false) wrapper — keeps heavy code off first load
    PixelArtTool.tsx      orchestrates upload → convert → preview → export
    ImageUploader PixelCanvas MaterialList ExportPanel
lib/
  seo.ts                pageMeta() factory + site constants
  jsonld.ts             Schema.org builders (WebApplication/HowTo/FAQPage/Breadcrumb)
  blocks.ts             Block palette data + official map colors  ← edit colors here
  converter.ts          Image → blocks (RGB nearest-match) + survival filter
  runConvert.ts         Runs conversion in a Web Worker (fallback to main thread)
  worker/convert.worker.ts
  schematic.ts nbt.ts   .litematic / .schem export (gzipped NBT)
  templates.ts blog.ts  Long-tail page content/data  ← add pages here
```

---

## SEO implementation notes

- **Static HTML for every route** (`output: "export"`); page text is server-rendered, the
  interactive tool hydrates after load via `dynamic(ssr:false)`.
- **Per-page metadata** through `pageMeta()` in `lib/seo.ts`: unique title/description,
  canonical, Open Graph + Twitter cards.
- **Structured data** via `lib/jsonld.ts` + `<JsonLd>`: `WebApplication` on tool pages,
  `HowTo` on tutorials, `FAQPage` on FAQ sections, `BreadcrumbList` site-wide.
- **Internal linking**: blog ↔ tools ↔ templates are cross-linked to build a topical web.
- **Sitemap & robots** auto-generated and kept in sync with the page lists.

---

## Adding a new long-tail page

**A template page** (e.g. `/templates/anime/`): add an entry to `TEMPLATES` in
`lib/templates.ts`. The route, metadata, sitemap entry, and internal links are generated
automatically.

**A blog post**: add an entry to `POSTS` in `lib/blog.ts` (set `howTo` to emit HowTo schema).
It appears in `/blog`, the sitemap, and related-link sections automatically.

**A brand-new section**: create `app/<route>/page.tsx`, export `metadata` via `pageMeta()`,
add a `<Breadcrumbs>` trail, and add the path to `app/sitemap.ts`.

---

## Backlink strategy (few but relevant)

Competitor analysis shows this niche is dominated by low-quality backlinks (Yahoo SERP
pages, low-grade JP/KR sites), and those sites are declining — while the fastest-growing
competitor took off with almost zero backlinks, purely on precise low-KD content. So the
strategy here is **few but relevant**:

- Front-load effort on content accuracy and tool quality, not link volume.
- When pursuing links, target **real, relevant** sources: Product Hunt, AI/tool directories,
  Minecraft subreddits and Discords, and related tool sites.
- Do **not** buy bulk low-quality links — it's what's sinking the incumbents.

Note on monetization: the `converter` keyword cluster has very high CPC (~$18), so the
`/image-converter` page reserves prominent ad slots. Most niche traffic is informational
("use and leave"), so any future subscription tier should gate genuinely payable features
(batch export, PDF merge, HD export) rather than a generic paywall.

## Roadmap / extension points

- **Monetization**: `AdSlot` components are placed (home, generator, block-list); wire real
  AdSense units. Export has a natural free-vs-subscription split (e.g. gated batch/PDF export).
- **Palette accuracy**: refine RGB values and the map-color set in `lib/blocks.ts`.
- **More exports**: `mcfunction` export can be added alongside the existing `.schem`/`.litematic`.
