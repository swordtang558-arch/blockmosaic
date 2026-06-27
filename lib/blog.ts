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
