// Blog post data. Each entry becomes /blog/[slug]/ and feeds the /blog index,
// sitemap, and (where howTo is set) HowTo structured data.

export interface BlogSection {
  h2: string;
  body: string[]; // paragraphs
  list?: string[]; // optional bullet list rendered after paragraphs
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  h1: string;
  date: string; // ISO
  excerpt: string;
  keyword: string;
  sections: BlogSection[];
  /** If set, a HowTo JSON-LD block is emitted from these ordered steps. */
  howTo?: { name: string; description: string; steps: { name: string; text: string }[] };
  related: string[]; // slugs or tool paths for internal linking
}

export const POSTS: BlogPost[] = [
  {
    slug: "minecraft-concrete-colors",
    title: "All 16 Minecraft Concrete Colors (with RGB)",
    description:
      "The full list of all 16 Minecraft concrete colors with their RGB values, plus why concrete is the best block for pixel art and how to make it.",
    h1: "Minecraft Concrete Colors",
    date: "2026-06-29",
    excerpt: "Every concrete color, its RGB value, and why concrete is the go-to block for vibrant pixel art.",
    keyword: "minecraft concrete",
    sections: [
      {
        h2: "Why concrete is the best pixel-art block",
        body: [
          "Concrete comes in all 16 dye colors, each a flat, vivid, evenly-lit surface with no texture noise. That makes it the most popular block for Minecraft pixel art — colors read cleanly from a distance and the palette covers a wide gamut.",
        ],
      },
      {
        h2: "The 16 concrete colors",
        body: ["Here are the 16 concrete colors. Use these as your core palette when converting an image to blocks."],
        list: [
          "White, Light Gray, Gray, Black",
          "Red, Orange, Yellow, Lime, Green",
          "Cyan, Light Blue, Blue, Purple, Magenta, Pink, Brown",
        ],
      },
      {
        h2: "How to make concrete",
        body: [
          "Combine 4 sand, 4 gravel and 1 matching dye to craft 8 concrete powder, then place it next to water to harden it into concrete. For survival pixel art, a concrete duper or a bulk dye supply makes large builds practical.",
        ],
      },
    ],
    related: ["/pixel-art-generator/", "minecraft-block-palettes", "/block-list/"],
  },
  {
    slug: "minecraft-block-palettes",
    title: "Best Minecraft Block Palettes for Pixel Art",
    description:
      "A guide to Minecraft block palettes for pixel art and builds: concrete, wool, terracotta, glazed, and map-color palettes — when to use each.",
    h1: "Minecraft Block Palettes for Pixel Art",
    date: "2026-06-29",
    excerpt: "Concrete, wool, terracotta, glazed and map-color palettes — which to pick for vibrant, muted, or map-accurate builds.",
    keyword: "minecraft block palettes",
    sections: [
      {
        h2: "What is a block palette?",
        body: [
          "A block palette is the set of blocks you allow when building pixel art. The palette decides the colors available to match your image — a wider, more vivid palette captures detail; a tighter palette gives a cohesive, stylized look.",
        ],
      },
      {
        h2: "Common palettes and when to use them",
        body: ["Each block family has a different feel:"],
        list: [
          "Concrete — 16 vibrant flat colors; the all-round best for pixel art",
          "Wool — similar range, slightly softer; flammable in survival",
          "Terracotta & glazed — muted earth tones and patterns for backgrounds",
          "Map colors — used for map art so the in-game map renders accurately",
        ],
      },
      {
        h2: "Build with any palette",
        body: [
          "In our generator you can toggle whole block categories on or off and even auto-pick the palette that best matches your image, then export the result. Pick concrete for posters and characters, or map colors for map art.",
        ],
      },
    ],
    related: ["/pixel-art-generator/", "minecraft-concrete-colors", "/map-art/"],
  },
  {
    slug: "minecraft-height-limit",
    title: "Minecraft Height Limit & Build Limit Explained",
    description:
      "What is the Minecraft height limit? The current build limit, world height, the lowest build level, and how it differs across versions like 1.21.",
    h1: "Minecraft Height Limit & Build Limit",
    date: "2026-06-29",
    excerpt: "The current world height, build limit, and lowest build level — and what changed in recent versions.",
    keyword: "minecraft height limit",
    sections: [
      {
        h2: "The current height limit",
        body: [
          "In modern Minecraft (1.18 and later, including 1.21), the world is 384 blocks tall. You can build from Y = -64 at the bottom up to Y = 319 at the top, for a total height of 384 blocks.",
        ],
      },
      {
        h2: "How it changed",
        body: [
          "Before the 1.18 Caves & Cliffs update, the world ran from Y = 0 to Y = 255 (256 blocks). The update lowered the floor to -64 and raised the ceiling to 319, expanding both caves below and building space above.",
        ],
        list: ["Build limit (top): Y = 319", "Lowest build level: Y = -64", "Total world height: 384 blocks"],
      },
      {
        h2: "Why it matters for pixel art",
        body: [
          "A vertical pixel-art mural is limited by the build height. With 384 blocks of vertical room you can build very tall murals, but most pixel art fits comfortably — a 128-tall design uses only a third of the available height.",
        ],
      },
    ],
    related: ["/pixel-art-generator/", "/image-to-schematic/", "minecraft-block-palettes"],
  },
  {
    slug: "how-to-make-pixel-art-in-minecraft",
    title: "How to Make Pixel Art in Minecraft — The Complete Guide",
    description:
      "Learn how to make pixel art in Minecraft from scratch. Covers every method: image converters, schematic files, map art, and freehand building. Beginner friendly.",
    h1: "How to Make Pixel Art in Minecraft",
    date: "2026-06-28",
    excerpt: "Every method for building Minecraft pixel art — image converters, schematics, map art, and freehand — explained step by step.",
    keyword: "how to make pixel art in minecraft",
    sections: [
      {
        h2: "What is Minecraft pixel art?",
        body: [
          "Minecraft pixel art is a build where every block acts as one pixel in a larger image. Viewed from a distance, the blocks blend into a recognizable picture — a character face, a logo, a landscape, anything. It works because each Minecraft block has a single flat color when seen from far enough away, and a grid of colored blocks reads the same way a digital image does.",
          "Pixel art has been part of Minecraft since its earliest days. Players build murals on creative servers, decorate survival bases with wall art, create in-game map paintings, and share designs as schematic files for others to import. The core idea never changes: one block = one pixel.",
        ],
      },
      {
        h2: "Method 1 — Use an image converter (fastest, most accurate)",
        body: [
          "An image-to-Minecraft converter does all the color matching for you. Upload a picture, set the output width in blocks, pick a block palette, and the tool maps every pixel to the closest available block color. You get a pixel-perfect grid preview plus a block shopping list.",
          "This is the go-to method for almost all pixel art builders now. No manual color matching, no guessing which block shade is closest. A good converter handles thousands of color-to-block lookups in under a second.",
        ],
        list: [
          "Open the image converter and upload a PNG or JPG",
          "Set the block width — 64 blocks is a good starting point",
          "Choose your block palette (concrete gives the widest color range)",
          "Toggle the grid overlay on so you can count blocks row by row",
          "Download the preview PNG and export your block shopping list",
          "Gather the blocks listed, then build bottom to top using the grid as your guide",
        ],
      },
      {
        h2: "Method 2 — Build from a schematic file (modded / technical)",
        body: [
          "A schematic is a file that stores a Minecraft build as block-level data. Tools like WorldEdit and Litematica can load a schematic and either paste the build directly or show a hologram overlay for you to follow block by block. For large or complex pixel art, schematics save hours.",
          "You can generate a schematic from any image using a converter that supports schematic export. Load the .schem or .litematic file into your modded client, position the hologram where you want to build, and place blocks directly onto the ghost outline. It is like paint-by-numbers for Minecraft.",
        ],
      },
      {
        h2: "Method 3 — Build freehand with a reference grid",
        body: [
          "If you prefer the old-school approach or play on a vanilla server without mods, build freehand from a gridded reference image. Print the preview (or keep it open on a second screen), count rows, and place blocks one row at a time.",
          "This method is slower but satisfying. Start from the bottom row and work upward. Count carefully — a single misplaced block shifts everything above it. Use wool or concrete so mistakes are easy to break and replace.",
        ],
      },
      {
        h2: "Method 4 — Map art on a 128×128 canvas",
        body: [
          "Map art is a special type of pixel art designed to display on an in-game map item. A single Minecraft map covers a 128×128 block area, so you build your design flat on the ground at exactly that resolution. The map renders each block's map color — not its texture — so you need to work with the map-color palette specifically.",
          "Map art is displayable anywhere. Once captured on a map, you can hang it in an item frame and it renders as a flat painting regardless of where the original build lives. This is how servers create gallery walls and custom paintings.",
        ],
      },
      {
        h2: "Choosing the right blocks for your build",
        body: [
          "Block choice makes or breaks pixel art. Concrete comes in 16 vibrant, flat colors and is the most popular pixel art block — wide color range, no texture noise, available in both Java and Bedrock. Wool also has 16 colors but reads as slightly softer; it burns, so keep it away from lava in survival builds.",
          "Terracotta and glazed terracotta add muted earth tones and pattern options for backgrounds. Concrete powder has the same colors as concrete but falls like sand, which is occasionally useful for gravity-fed building techniques. For map art specifically, the block palette is different — blocks are chosen for their map color, not their appearance.",
        ],
      },
      {
        h2: "Survival vs Creative — what changes",
        body: [
          "In Creative mode you have unlimited blocks and flight, so you can build pixel art of any size without material constraints. In Survival, material gathering is the bottleneck. A 64×64 pixel art uses over 4,000 blocks — if half of those are a single concrete color, you need stacks and stacks of dye and sand.",
          "To make survival pixel art manageable: use a survival-friendly filter in your converter that limits the palette to easily obtainable blocks, build smaller (32×32 or 48×48), and set up a concrete duper or dye farm if you plan to build often. Wool from a sheep farm is the cheapest colored block option in survival.",
        ],
      },
    ],
    howTo: {
      name: "How to make pixel art in Minecraft",
      description: "Build Minecraft pixel art from any image using an image converter, schematic file, or freehand grid.",
      steps: [
        { name: "Pick an image", text: "Choose a picture with strong contrast and clear shapes. Logos, characters and simple icons convert best." },
        { name: "Choose a method", text: "Use an image converter for speed, a schematic for large builds, or a gridded reference for freehand building." },
        { name: "Set size and palette", text: "Pick a block width (64 for medium builds, 128 for detailed murals) and a block palette like concrete." },
        { name: "Generate the plan", text: "Convert the image to get a block grid and a shopping list of every block you need." },
        { name: "Gather blocks and build", text: "Collect the blocks from the shopping list, then build row by row from the bottom up." },
      ],
    },
    related: ["/pixel-art-generator/", "/block-list/", "pixel-art-tutorial", "how-to-make-pixel-art-from-image"],
  },
  {
    slug: "minecraft-picture-to-schematic",
    title: "Minecraft Picture to Schematic — Convert Any Image to a Build File",
    description:
      "Convert any picture to a Minecraft schematic file (.schem or .litematic). Use with WorldEdit or Litematica to paste or hologram your pixel art — full step-by-step guide.",
    h1: "How to Convert a Picture to a Minecraft Schematic",
    date: "2026-06-27",
    excerpt: "Turn any image into a .schem or .litematic file — build pixel art fast with WorldEdit paste or a Litematica hologram overlay.",
    keyword: "minecraft picture to schematic",
    sections: [
      {
        h2: "What is a schematic file?",
        body: [
          "A Minecraft schematic is a file that stores the exact block-by-block layout of a build. Think of it as a blueprint: every block type, position, and orientation is recorded. When you load a schematic into a mod like WorldEdit or Litematica, you can paste the build into your world instantly or view it as a transparent hologram overlay.",
          "For pixel art builders, schematics eliminate the need to count rows and place blocks from a reference image. Load the schematic, position the overlay, and place blocks directly onto the ghost outline. Large murals that would take hours to build from a grid become paint-by-numbers projects.",
          "The two most common schematic formats are .schem (used by WorldEdit) and .litematic (used by Litematica, a Fabric mod focused on building). Both store the same block-level data.",
        ],
      },
      {
        h2: "Why use a schematic for pixel art?",
        body: [
          "Building pixel art from a static reference image works — but it means counting rows, tracking your position, and inevitably fixing misplaced blocks. A schematic overlay shows you exactly which block goes where, floating in 3D space right where you need to build.",
          "A 64×64 pixel art contains 4,096 blocks. A 128×128 mural has 16,384. The error rate on manual row-counting grows with the build size. A schematic makes every block position unambiguous.",
        ],
        list: [
          "Zero counting errors — the hologram shows each block's exact position",
          "Faster building — place blocks directly onto the ghost outline",
          "Reusable — share one schematic with a whole server or community",
          "Perfect for large murals where manual counting is impractical",
        ],
      },
      {
        h2: "How to convert a picture to a schematic — step by step",
        body: [
          "The process starts the same as any pixel art project: pick your image and convert it to a block plan. The extra step is exporting the result as a schematic file instead of just a PNG preview.",
        ],
        list: [
          "Upload your image to a converter that supports schematic export",
          "Set the output width in blocks and choose a block palette",
          "Convert the image to generate the block-level layout",
          "Export as .schem (for WorldEdit) or .litematic (for Litematica)",
          "Place the schematic file in your Minecraft schematics folder",
          "Load it with WorldEdit //schem load or Litematica's load menu",
          "Position the hologram or paste the build into your world",
        ],
      },
      {
        h2: "WorldEdit vs Litematica — which to use",
        body: [
          "WorldEdit is the classic. Available as a plugin on most servers (Spigot, Paper, Fabric) and as a single-player mod. Use //schem load <filename> then //paste to place the build directly. WorldEdit pastes the blocks into the world — no manual building needed. Great for creative mode and server builds.",
          "Litematica is the survival builder's choice. Instead of pasting blocks, it renders a hologram overlay of the schematic. You place real blocks onto the ghost outlines manually. This matters in survival because blocks you paste with WorldEdit don't count as player-placed — they won't trigger achievements. Litematica also supports multi-layer schematics and material lists.",
        ],
      },
      {
        h2: "Schematic size and block count considerations",
        body: [
          "A schematic stores every single block. At small sizes (32×32 = 1,024 blocks) a .litematic file is under 50 KB. At 128×128 (16,384 blocks) the file grows to a few hundred KB. Both are tiny by modern storage standards — even a 256×256 schematic stays under 2 MB.",
          "The real constraint is in-game. WorldEdit paste operations on very large schematics (200+ blocks across) can cause server lag. If you are on a multiplayer server, paste in sections or warn other players first. Litematica holograms have virtually no performance cost since they are client-side renders.",
        ],
      },
    ],
    howTo: {
      name: "How to convert a picture to a Minecraft schematic",
      description: "Turn any image into a .schem or .litematic file for WorldEdit or Litematica building.",
      steps: [
        { name: "Upload your image", text: "Upload a PNG or JPG to an image-to-Minecraft converter with schematic export." },
        { name: "Configure the output", text: "Set the block width and choose a palette. Concrete works best for most builds." },
        { name: "Export as schematic", text: "Download the .schem file (WorldEdit) or .litematic file (Litematica)." },
        { name: "Load into Minecraft", text: "Place the file in your schematics folder, then load it with your mod of choice." },
        { name: "Build", text: "Paste with WorldEdit or use the Litematica hologram overlay to place blocks manually." },
      ],
    },
    related: ["/pixel-art-generator/", "/map-art/", "minecraft-map-art-tutorial", "how-to-make-pixel-art-in-minecraft"],
  },
  {
    slug: "how-to-make-128x128-map-minecraft",
    title: "How to Make a 128×128 Map in Minecraft — Complete Map Art Guide",
    description:
      "Learn how to make a 128×128 map in Minecraft. Convert any picture to map art, understand map colors, and build a displayable in-game painting step by step.",
    h1: "How to Make a 128×128 Map in Minecraft",
    date: "2026-06-27",
    excerpt: "Build a 128×128 Minecraft map from any picture — how map colors work, how to build it flat, and how to capture the perfect map item.",
    keyword: "how to make a 128x128 map in minecraft",
    sections: [
      {
        h2: "What is a 128×128 map?",
        body: [
          "A Minecraft map item captures a top-down view of a 128×128 block area. When you build pixel art flat on the ground at exactly 128×128 and then use an empty map on it, the map item renders your build as a painting — displayed in an item frame, it looks like artwork hanging on a wall.",
          "128×128 is the resolution of a default map at zoom level 0 (the most zoomed-in level). One pixel on the map = one block in the world. This is why map art is always built at 128×128 — it fills exactly one map with no wasted space and no scaling distortion.",
        ],
      },
      {
        h2: "Map colors vs block colors — the critical difference",
        body: [
          "This is the part that trips up most first-time map art builders: maps do not render block textures. They render each block's map color, which is a fixed value assigned by the game. A block that looks bright red in the world might render as a dull brown on a map.",
          "There are exactly 51 distinct map colors in Minecraft Java Edition (Bedrock has slight differences). Each block is assigned one of these 51 colors, and multiple different blocks can share the same map color. For example, white concrete, white wool, snow, and diorite all read as the same white on a map.",
          "This compressed color space is the core challenge of map art. You cannot use every block color that exists — you can only use the 51 map colors. A good map art converter accounts for this by matching your image pixels to the map-color palette instead of the full block palette.",
        ],
      },
      {
        h2: "Step by step — making your 128×128 map",
        body: [
          "The build process is straightforward once you understand the map-color constraint. The key is to plan for map output from the beginning, not to build regular pixel art and hope it looks good on a map.",
        ],
        list: [
          "Find a flat 128×128 area — a superflat creative world or a cleared plains biome works well",
          "Upload your image to a pixel art generator in map-art mode (uses the 51-color map palette)",
          "Set width to exactly 128 blocks",
          "Generate the block grid — every cell shows which block to place for the correct map color",
          "Export the block list and gather materials",
          "Build the design flat on the ground, one row at a time, 128 blocks per row",
          "Craft an empty map, hold it, and right-click while standing within the build area",
          "The map item now displays your art — place it in an item frame to hang it",
        ],
      },
      {
        h2: "Map zoom levels and why 128×128 is the sweet spot",
        body: [
          "Maps have five zoom levels (0 through 4). Level 0 is 128×128 blocks per map — one pixel = one block. Each zoom level doubles the coverage area but halves the resolution: level 1 covers 256×256 (one pixel = 2×2 blocks), level 2 covers 512×512, and so on.",
          "For pixel art, level 0 (128×128) is almost always the right choice. It gives you direct one-to-one control over every pixel. At higher zoom levels, each map pixel averages a larger area, which blurs detail. Start at 128×128 and only zoom out if the art is meant to be viewed as part of a larger map wall.",
        ],
      },
      {
        h2: "Tips for cleaner map art",
        body: [
          "Shadows from nearby blocks can darken parts of your map. Build in an open area with no overhangs — sky light level 15 across the entire 128×128 canvas. Torches and other light sources placed on or near the build can create unwanted brightness variations on the map, so light from below or from the edges only.",
          "If you need to correct a section, break and replace individual blocks — the map updates when you look at it again. For large map art projects, build a test section first (a 16×16 corner) and check how it reads on the map before committing to the full build.",
        ],
      },
      {
        h2: "Map art in survival — material planning",
        body: [
          "A full 128×128 map art uses 16,384 blocks. Even if each block averages cheap materials, that is over 256 stacks. The real challenge in survival is sourcing specific map-color blocks in bulk.",
          "Cheapest map-color sources: use terracotta (natural clay + smelting) for earthy map tones, concrete powder (sand + gravel + dye) for bright colors, and wool from a sheep farm for any color you can dye. Avoid blocks that require rare materials like netherite or prismarine unless you have a farm set up.",
        ],
      },
    ],
    howTo: {
      name: "How to make a 128×128 map in Minecraft",
      description: "Build a 128×128 pixel art map from any picture and capture it on an in-game map item.",
      steps: [
        { name: "Prepare the canvas", text: "Clear a flat 128×128 area with sky access and no shadows." },
        { name: "Generate a map-color plan", text: "Upload your image and convert it using the map-color palette at 128 blocks wide." },
        { name: "Gather blocks from the list", text: "Use the block shopping list to collect every block you need." },
        { name: "Build flat on the ground", text: "Place blocks row by row, 128 per row, matching the generated grid." },
        { name: "Capture the map", text: "Use an empty map on the build to record it, then hang it in an item frame." },
      ],
    },
    related: ["/map-art/", "/block-list/", "minecraft-map-art-tutorial", "minecraft-pixel-art-color-palette"],
  },
  {
    slug: "best-blocks-for-minecraft-pixel-art",
    title: "Best Blocks for Minecraft Pixel Art — Complete Color Guide",
    description:
      "Which blocks are best for Minecraft pixel art? A complete guide by color: concrete vs wool vs terracotta, plus survival cost, color accuracy, and map compatibility.",
    h1: "Best Blocks for Minecraft Pixel Art",
    date: "2026-06-26",
    excerpt: "The best block for every color in your palette — concrete vs wool vs terracotta, map colors, survival cost, and how to pick.",
    keyword: "best blocks for minecraft pixel art",
    sections: [
      {
        h2: "Why block choice defines your pixel art",
        body: [
          "The block palette you choose determines how vibrant, accurate, and buildable your pixel art will be. Pick the wrong block for a given color and your image looks washed out or wrong. Pick an expensive block and your survival build becomes a grind. Understanding the strengths and weaknesses of each block type is the fastest way to improve your pixel art output.",
          "Minecraft has over 60 distinct colored blocks when you count every variant, but not all of them are practical for pixel art. The best pixel art blocks have flat, uniform textures; rich, saturated colors; and are obtainable in bulk. Blocks with noisy textures (like ore blocks or grass) create visual clutter at pixel-art scale and should be avoided.",
        ],
      },
      {
        h2: "Concrete — the #1 pixel art block",
        body: [
          "Concrete is the undisputed champion of Minecraft pixel art. It comes in 16 bold, fully saturated colors with a near-flat texture that reads as a clean solid color from any distance. Every color is vibrant: red is red, blue is blue, white is bright white. No other block family matches concrete's combination of color range and visual clarity.",
          "In survival, concrete requires sand, gravel, and dye. Sand and gravel are abundant; the dye is the bottleneck. Set up a basic flower farm (bonemeal + bone meal on grass) and a squid farm for ink sacs, and you can produce most concrete colors in bulk. White, black, gray, and light gray are the cheapest concrete colors.",
          "The only downside: concrete is a solid block with no special properties. It breaks cleanly with a pickaxe but is not blast-resistant. For most pixel art this does not matter — you are building a display piece, not a fortress.",
        ],
        list: [
          "16 vibrant, flat-textured colors — the widest usable palette",
          "No texture noise — reads as pure color at any distance",
          "Same colors in Java and Bedrock",
          "Craftable in bulk with sand + gravel + dye",
        ],
      },
      {
        h2: "Wool — the budget and survival pick",
        body: [
          "Wool has the same 16-color range as concrete but with a slightly softer, more matte appearance. The texture has a faint noise pattern, but at viewing distance for pixel art (10+ blocks away) it reads as a clean solid color. Wool is significantly cheaper than concrete in survival — a basic sheep farm in every color produces wool automatically, requiring zero crafting after setup.",
          "The catch: wool is flammable and can be destroyed by fire or lava. Do not build wool pixel art near lava pools, fireplaces, or lightning-prone areas. For indoor pixel art or builds in peaceful biomes, wool is an excellent budget choice.",
        ],
      },
      {
        h2: "Terracotta and glazed terracotta",
        body: [
          "Terracotta (unstained and stained) offers a set of muted, earthy tones that concrete and wool do not. Brown, light gray, and the various stained terracotta colors are softer and more natural — good for backgrounds, skin tones, and landscape elements in pixel art. The texture is even flatter than concrete, with almost no visible grain.",
          "Glazed terracotta adds patterned blocks that can serve as decorative elements within a pixel art build or as a textured background. Use sparingly — the pattern reads as noise at a distance and disrupts the clean pixel look.",
          "In survival, terracotta requires clay (found in rivers and lush caves) plus smelting, and stained variants need dye. It is more labor-intensive than concrete but the muted colors are worth it for specific palette needs.",
        ],
      },
      {
        h2: "Best blocks by color — a quick reference",
        body: [
          "Here is a practical cheat sheet for which block to use when you need a specific color at full saturation.",
        ],
        list: [
          "White — White concrete or snow block (snow is cheaper in cold biomes)",
          "Black — Black concrete or black wool (both equally dark)",
          "Red — Red concrete (bright) or red terracotta (muted, earthy)",
          "Blue — Blue concrete or lapis block (lapis is expensive in survival)",
          "Yellow — Yellow concrete (bright) or yellow wool (softer)",
          "Green — Lime concrete or green concrete (emerald block is expensive)",
          "Orange — Orange concrete or orange terracotta",
          "Pink/Magenta — Pink concrete or magenta concrete (both vibrant)",
          "Brown — Brown terracotta or brown concrete (terracotta is cheaper)",
          "Gray tones — Stone, andesite, light gray concrete, gray concrete (graduated shades)",
        ],
      },
      {
        h2: "Concrete powder — the gravity option",
        body: [
          "Concrete powder has the same 16 colors as concrete but falls like sand when unsupported. This makes it harder to use for vertical pixel art (it needs a supporting block underneath) but useful for flat map art where gravity does not matter. In map art specifically, concrete powder and solid concrete often share the same map color, so you can use whichever is cheaper.",
          "Turning concrete powder into solid concrete requires contact with water. If your pixel art is in a dry area, you will need to place water, let the powder harden, then remove the water — an extra step that adds time to large builds.",
        ],
      },
      {
        h2: "Survival cost comparison",
        body: [
          "For a typical 64×64 pixel art (4,096 blocks), the material cost varies widely by block type. Wool from a sheep farm costs almost nothing per block. Concrete costs one sand + one gravel + one dye per block. Terracotta costs one clay ball (smelted) + dye.",
          "Budget survival tip: use wool for colors you need a lot of, concrete for the accent colors that make the image pop, and terracotta for earthy background tones. Mixing block types is not just budget-friendly — it adds subtle texture variety that can make a large pixel art look more interesting up close without affecting the distant view.",
        ],
      },
    ],
    related: ["/block-list/", "/pixel-art-generator/", "minecraft-pixel-art-color-palette", "how-to-make-pixel-art-in-minecraft"],
  },
  {
    slug: "minecraft-pixel-art-color-palette",
    title: "Minecraft Pixel Art Color Palette — How to Pick the Right Blocks",
    description:
      "Master the Minecraft pixel art color palette. Compare concrete, wool, and map-color palettes. Learn how color matching works so your pixel art looks accurate every time.",
    h1: "Minecraft Pixel Art Color Palette Guide",
    date: "2026-06-26",
    excerpt: "How Minecraft color palettes work — concrete, wool, terracotta, and map colors compared so your pixel art always reads accurately.",
    keyword: "minecraft pixel art color palette",
    sections: [
      {
        h2: "What is a Minecraft pixel art color palette?",
        body: [
          "A Minecraft pixel art color palette is the set of block colors available to represent the pixels in your image. Unlike digital art where you have millions of RGB values, Minecraft limits you to the colors of its blocks. A good palette maps every pixel in your source image to the closest available block color — and the quality of that mapping determines how accurate your pixel art looks.",
          "There is not one universal palette — there are several, each with a different set of available colors. The concrete palette has 16 colors. The wool palette has the same 16 but with slightly different saturation. The full block palette adds terracotta, concrete powder, glazed terracotta, and specialty blocks for roughly 50+ distinct usable colors. The map-color palette is entirely different — it uses the 51 fixed map colors that the game engine assigns to blocks.",
        ],
      },
      {
        h2: "The concrete palette — 16 colors, maximum vibrancy",
        body: [
          "Concrete gives you 16 highly saturated, flat-textured colors: white, light gray, gray, black, brown, red, orange, yellow, lime, green, cyan, light blue, blue, purple, magenta, and pink. This is the most popular pixel art palette because every color is bold and the flat texture means zero visual noise at any viewing distance.",
          "The limitation is clear: 16 colors is not enough for photorealistic reproduction or images with subtle gradients. But for logos, characters, icons, and most pixel art subjects, 16 vibrant colors is plenty. The converter handles dithering — combining two block colors in a checkerboard pattern — to approximate colors that fall between the 16 concrete options.",
        ],
      },
      {
        h2: "The full block palette — expanding the color range",
        body: [
          "When you need more than 16 colors, switch to a full block palette that includes terracotta, concrete powder, glazed terracotta, and specialty blocks like prismarine, nether bricks, and obsidian. This palette has roughly 50-60 distinct usable colors, depending on which blocks the converter includes.",
          "The full palette meaningfully improves accuracy for images with skin tones, natural landscapes, or subtle color variation. The trade-off is that some blocks in the full palette have textured surfaces or unusual properties that make building trickier. Glazed terracotta has directional patterns. Prismarine changes color. Nether wart blocks and leaves have busy textures. A good converter lets you toggle individual blocks on and off so you only include the ones you are willing to build with.",
        ],
        list: [
          "Concrete (16 colors) — vibrant, flat, the foundation",
          "Wool (16 colors) — matte, cheap in survival, same hues",
          "Terracotta (16 colors) — muted, earthy, good for skin tones",
          "Concrete powder (16 colors) — gravity-affected, same colors as concrete",
          "Specialty: prismarine, obsidian, nether bricks, end stone, purpur — niche tones",
        ],
      },
      {
        h2: "The map-color palette — a different system entirely",
        body: [
          "Map art uses a fundamentally different color system. Minecraft maps do not render a block's texture or in-world color — they render each block's fixed map color. There are 51 possible map colors (in Java; Bedrock has minor differences), and each block in the game is assigned to one of them.",
          "This means that in map art, your block choice is not about how the block looks — it is about what map color it produces. White concrete, white wool, snow, and diorite all produce the exact same map color. You pick whichever is cheapest or easiest to obtain. Map art is as much about material logistics as it is about color accuracy.",
          "A map-color palette converter pre-matches every pixel to one of the 51 map colors, then suggests the cheapest or most practical block that produces that map color. This is the only way to reliably convert images for map art — guessing which blocks produce which map colors leads to muddy, inaccurate results.",
        ],
      },
      {
        h2: "How the color matching works (and why dithering helps)",
        body: [
          "When you upload an image, the converter samples each pixel's RGB value and finds the closest block color using Euclidean distance in RGB space. For a 16-color palette like concrete, many image colors will not have a perfect match — the converter picks the nearest one. The result can look posterized if there are large areas of a color that falls between two block options.",
          "Dithering solves this. Instead of mapping every pixel in a smooth gradient to the same block color, dithering alternates between two nearby block colors in a pattern that the eye blends together. A sky gradient that would posterize into solid light blue and solid cyan can instead have a dithered transition zone that reads as a smooth blend from a distance. Enable dithering in the converter when your image has gradients, and disable it for images with flat, cartoon-like colors.",
        ],
      },
      {
        h2: "Picking the right palette for your project",
        body: [
          "If you want the most vibrant, punchy pixel art on a wall or building facade, use the concrete palette at 64-128 blocks wide. If your image has lots of skin tones, natural colors, or subtle shading, use the full block palette with terracotta enabled. If you are building map art for item frames, switch to the map-color palette and set the width to exactly 128.",
          "When in doubt, start with concrete. Its 16 colors cover the vast majority of pixel art subjects, and the results are consistently clean. You can always re-convert with a wider palette later.",
        ],
      },
    ],
    related: ["/pixel-art-generator/", "/map-art/", "best-blocks-for-minecraft-pixel-art", "minecraft-map-art-tutorial"],
  },
  {
    slug: "how-to-convert-image-to-minecraft",
    title: "How to Convert an Image to Minecraft Blocks",
    description:
      "Learn how to convert any image or photo to Minecraft blocks. Use a free image converter to turn pictures into pixel art, get a block list, and build it.",
    h1: "How to Convert an Image to Minecraft Blocks",
    date: "2026-06-24",
    excerpt: "The fastest way to turn any picture into Minecraft blocks — no mods, no manual color matching.",
    keyword: "how to convert image to minecraft blocks",
    sections: [
      {
        h2: "The quickest method: an image converter",
        body: [
          "The easiest way to convert a picture to Minecraft is an online image converter that matches every pixel to the closest block color. You upload an image, choose a block width, and get a ready-to-build grid plus a list of blocks — in seconds.",
        ],
      },
      {
        h2: "Step by step",
        body: ["Here's the whole workflow from picture to buildable design."],
        list: [
          "Open the image converter and upload a PNG or JPG.",
          "Set how many blocks wide you want the result (64 is a good default).",
          "Pick a palette — concrete gives the most vibrant colors.",
          "Convert, then download the PNG and the block list.",
        ],
      },
      {
        h2: "Tips for a clean conversion",
        body: ["A few choices make a big difference in how the result looks."],
        list: ["Use images with bold, flat colors", "Avoid tiny text and smooth gradients", "Go wider (128) for more detail, narrower (32) for fewer blocks"],
      },
    ],
    howTo: {
      name: "How to convert an image to Minecraft blocks",
      description: "Turn any picture into Minecraft blocks with a free online image converter.",
      steps: [
        { name: "Upload an image", text: "Open the image converter and upload a PNG or JPG." },
        { name: "Set block width", text: "Choose how many blocks wide the result should be." },
        { name: "Convert", text: "Match every pixel to the closest Minecraft block." },
        { name: "Download", text: "Save the PNG and export the block list." },
      ],
    },
    related: ["/image-converter/", "/pixel-art-generator/", "pixel-art-tutorial"],
  },
  {
    slug: "pixel-art-tutorial",
    title: "Minecraft Pixel Art Tutorial: Build Your First Mural",
    description:
      "A step-by-step Minecraft pixel art tutorial. Learn how to plan, generate, and build pixel art from any image — with a block list and grid. Beginner friendly.",
    h1: "Minecraft Pixel Art Tutorial",
    date: "2026-06-20",
    excerpt: "Plan, generate, and build your first pixel art mural from any image — the complete beginner walkthrough.",
    keyword: "minecraft pixel art tutorial",
    sections: [
      {
        h2: "What you'll need",
        body: [
          "Pixel art in Minecraft is just an image rebuilt one block per pixel. You don't need mods to start — a clear image and a block plan are enough.",
        ],
        list: ["An image with strong, simple shapes", "A flat wall or open area to build on", "A stack or two of colored blocks (concrete works great)"],
      },
      {
        h2: "Step 1 — Choose and prepare your image",
        body: [
          "Pick an image with bold colors and clear edges. Logos, characters, and simple icons convert far better than detailed photos. Smaller, simpler images keep your block list short.",
        ],
      },
      {
        h2: "Step 2 — Generate the block grid",
        body: [
          "Upload your image to the generator, set the output width in blocks (start with 64), and pick a palette. Turn on the grid overlay so you can read the design row by row.",
        ],
      },
      {
        h2: "Step 3 — Gather blocks and build",
        body: [
          "Open the block shopping list to see exactly how many of each block you need, then gather them. Build bottom-to-top, working one row at a time using the grid as your guide.",
        ],
      },
    ],
    howTo: {
      name: "How to build Minecraft pixel art from an image",
      description: "Convert any image into a Minecraft pixel art mural and build it block by block.",
      steps: [
        { name: "Choose an image", text: "Pick an image with bold colors and clear shapes." },
        { name: "Generate the grid", text: "Upload it, set a block width, choose a palette, and enable the grid overlay." },
        { name: "Get the block list", text: "Open the block shopping list to see how many of each block you need." },
        { name: "Build row by row", text: "Gather the blocks and build from the bottom up using the grid as a guide." },
      ],
    },
    related: ["/pixel-art-generator/", "/block-list/", "how-to-make-pixel-art-from-image"],
  },
  {
    slug: "how-to-make-pixel-art-from-image",
    title: "How to Make Minecraft Pixel Art From an Image",
    description:
      "Learn how to turn any photo or image into Minecraft pixel art. Convert images to blocks online, get a block list, and build it in survival or creative.",
    h1: "How to Make Pixel Art From an Image in Minecraft",
    date: "2026-06-21",
    excerpt: "Turn any photo or picture into buildable Minecraft blocks — no mods, no manual color matching.",
    keyword: "how to make pixel art from image minecraft",
    sections: [
      {
        h2: "The fast way: convert online",
        body: [
          "The quickest method is to let a generator match each pixel to the closest Minecraft block automatically. Upload your image, choose a block width, and you get a ready-to-build grid plus a block list.",
        ],
      },
      {
        h2: "Picking images that convert well",
        body: ["Not every image works. Favor images with flat colors and clear contrast; avoid gradients, fine text, and busy backgrounds."],
        list: ["High contrast between subject and background", "Few colors rather than smooth gradients", "Square or simple aspect ratios"],
      },
      {
        h2: "Survival vs creative",
        body: [
          "In creative you have every block instantly. In survival, enable the survival-friendly filter so the plan only uses obtainable blocks, then use the block list to gather materials before you start.",
        ],
      },
    ],
    related: ["/pixel-art-generator/", "/block-list/", "pixel-art-tutorial"],
  },
  {
    slug: "pixel-art-ideas",
    title: "30 Minecraft Pixel Art Ideas (Easy to Advanced)",
    description:
      "Need inspiration? Browse Minecraft pixel art ideas from easy beginner builds to large murals — characters, logos, emojis, map art and more.",
    h1: "Minecraft Pixel Art Ideas",
    date: "2026-06-22",
    excerpt: "From quick beginner builds to ambitious murals — a running list of pixel art subjects worth making.",
    keyword: "minecraft pixel art ideas",
    sections: [
      {
        h2: "Easy ideas to start with",
        body: ["If it's your first build, keep it small and iconic so the block list stays short."],
        list: ["Hearts and stars", "Emojis and smileys", "Game items (swords, potions)", "Simple food (apple, cake)"],
      },
      {
        h2: "Intermediate builds",
        body: ["Once you're comfortable counting rows, scale up to recognizable characters and logos."],
        list: ["Cartoon and anime characters", "Server or team logos", "Retro game sprites", "Flags and emblems"],
      },
      {
        h2: "Advanced murals & map art",
        body: ["For a showpiece, go big with full-color murals or map art that displays on an in-game map."],
        list: ["128×128 map art portraits", "Landscape scenes", "Multi-panel murals", "Album covers and posters"],
      },
    ],
    related: ["/templates/", "/map-art/", "/pixel-art-generator/"],
  },
  {
    slug: "minecraft-map-art-tutorial",
    title: "Minecraft Map Art Tutorial: Picture to Map (128×128)",
    description:
      "Make Minecraft map art from any picture. Learn how map colors work, why 128×128 matters, and how to convert and build map art step by step.",
    h1: "Minecraft Map Art Tutorial",
    date: "2026-06-23",
    excerpt: "Turn a picture into an in-game map painting — how map colors work and how to build a clean 128×128.",
    keyword: "minecraft map art tutorial",
    sections: [
      {
        h2: "What is map art?",
        body: [
          "Map art is pixel art designed to be displayed on a Minecraft map item. A single map renders a 128×128 grid, so map art is built at that exact resolution for a crisp result.",
        ],
      },
      {
        h2: "Why map colors are different",
        body: [
          "Maps don't show block textures — they show each block's map color. That's why map art uses a dedicated map-color palette so the colors on the map match your design.",
        ],
      },
      {
        h2: "Step by step",
        body: ["Use the map-art mode, set the width to 128, convert, then build the design flat and place a map to capture it."],
      },
    ],
    howTo: {
      name: "How to make Minecraft map art from a picture",
      description: "Convert a picture to a 128×128 map-color design and capture it on an in-game map.",
      steps: [
        { name: "Open map-art mode", text: "Switch the generator to the map-color palette." },
        { name: "Set width to 128", text: "Use a 128-block width to match one full map." },
        { name: "Convert and build", text: "Generate the grid and build the design flat in your world." },
        { name: "Capture the map", text: "Use a map item on the build to render the art." },
      ],
    },
    related: ["/map-art/", "/pixel-art-generator/", "pixel-art-ideas"],
  },
];

export const BLOG_SLUGS = POSTS.map((p) => p.slug);

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
