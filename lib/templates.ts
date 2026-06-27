// Template-library data. Each entry becomes /templates/[slug]/ and feeds the
// /templates index + sitemap. Add an entry here to ship a new long-tail page.

export interface TemplateDef {
  slug: string;
  name: string;
  title: string; // <title>
  description: string; // meta description
  h1: string;
  /** Target long-tail keyword for this page. */
  keyword: string;
  intro: string;
  ideas: string[];
}

export const TEMPLATES: TemplateDef[] = [
  {
    slug: "character",
    name: "Character",
    title: "Minecraft Character Pixel Art Templates & Ideas",
    description:
      "Free Minecraft character pixel art templates and ideas. Turn any character image into buildable blocks with a grid and block list. Start creating now.",
    h1: "Minecraft Character Pixel Art Templates",
    keyword: "minecraft character pixel art",
    intro:
      "Characters are the most popular pixel art subject in Minecraft — from game mascots to cartoon faces. Upload a character image and convert it to a block grid you can build in survival or creative.",
    ideas: ["Game characters & mascots", "Cartoon and anime faces", "Pixel sprites from retro games", "Your own skin as wall art"],
  },
  {
    slug: "logo",
    name: "Logo",
    title: "Minecraft Logo Pixel Art Generator & Templates",
    description:
      "Build any logo in Minecraft. Convert a logo image to pixel art blocks with a grid preview and exact block shopping list. Free, no signup.",
    h1: "Minecraft Logo Pixel Art Templates",
    keyword: "minecraft logo pixel art",
    intro:
      "Logos make bold, recognizable builds for servers, bases and spawn areas. Upload a logo (PNG with a clean background works best) and turn it into a block-by-block plan.",
    ideas: ["Server and team logos", "Brand and esports logos", "Flat icon-style marks", "Text and wordmarks"],
  },
  {
    slug: "easy",
    name: "Easy",
    title: "Easy Minecraft Pixel Art — Simple Templates for Beginners",
    description:
      "Easy Minecraft pixel art templates for beginners. Small, simple designs with short block lists you can build fast. Generate your own in seconds.",
    h1: "Easy Minecraft Pixel Art for Beginners",
    keyword: "easy minecraft pixel art",
    intro:
      "New to pixel art? Start small. Use a 32-block width and a simple image so the block list stays short and the build finishes fast.",
    ideas: ["Hearts, stars and simple icons", "Emojis and smileys", "Small food items", "Single-color shapes"],
  },
  {
    slug: "grid",
    name: "Grid",
    title: "Minecraft Pixel Art Grid Maker — Templates with Grid",
    description:
      "Generate Minecraft pixel art with a grid overlay so you can count blocks row by row. Free grid templates and a printable-friendly preview.",
    h1: "Minecraft Pixel Art Templates with Grid",
    keyword: "minecraft pixel art grid",
    intro:
      "A grid overlay turns any image into an easy-to-follow building guide — count blocks row by row, just like a paper template. Toggle the grid on in the generator and start building.",
    ideas: ["Row-by-row building guides", "Printable grid references", "Coordinate-based map art", "Large mural planning"],
  },
];

export const TEMPLATE_SLUGS = TEMPLATES.map((t) => t.slug);

export function getTemplate(slug: string) {
  return TEMPLATES.find((t) => t.slug === slug);
}
