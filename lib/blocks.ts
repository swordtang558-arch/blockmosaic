export interface MinecraftBlock {
  id: string;
  name: string;
  r: number;
  g: number;
  b: number;
}

// Curated palette of common Minecraft blocks with representative colors
export const BLOCKS: MinecraftBlock[] = [
  // Concrete
  { id: "white_concrete", name: "White Concrete", r: 207, g: 213, b: 214 },
  { id: "orange_concrete", name: "Orange Concrete", r: 224, g: 97, b: 0 },
  { id: "magenta_concrete", name: "Magenta Concrete", r: 169, g: 48, b: 159 },
  { id: "light_blue_concrete", name: "Light Blue Concrete", r: 36, g: 137, b: 199 },
  { id: "yellow_concrete", name: "Yellow Concrete", r: 240, g: 175, b: 21 },
  { id: "lime_concrete", name: "Lime Concrete", r: 94, g: 168, b: 24 },
  { id: "pink_concrete", name: "Pink Concrete", r: 213, g: 101, b: 142 },
  { id: "gray_concrete", name: "Gray Concrete", r: 54, g: 57, b: 61 },
  { id: "light_gray_concrete", name: "Light Gray Concrete", r: 125, g: 125, b: 115 },
  { id: "cyan_concrete", name: "Cyan Concrete", r: 21, g: 119, b: 136 },
  { id: "purple_concrete", name: "Purple Concrete", r: 100, g: 32, b: 156 },
  { id: "blue_concrete", name: "Blue Concrete", r: 45, g: 47, b: 143 },
  { id: "brown_concrete", name: "Brown Concrete", r: 96, g: 59, b: 31 },
  { id: "green_concrete", name: "Green Concrete", r: 73, g: 91, b: 36 },
  { id: "red_concrete", name: "Red Concrete", r: 142, g: 33, b: 33 },
  { id: "black_concrete", name: "Black Concrete", r: 8, g: 10, b: 15 },
  // Wool
  { id: "white_wool", name: "White Wool", r: 233, g: 236, b: 236 },
  { id: "orange_wool", name: "Orange Wool", r: 240, g: 118, b: 19 },
  { id: "magenta_wool", name: "Magenta Wool", r: 189, g: 68, b: 179 },
  { id: "light_blue_wool", name: "Light Blue Wool", r: 58, g: 175, b: 217 },
  { id: "yellow_wool", name: "Yellow Wool", r: 248, g: 197, b: 39 },
  { id: "lime_wool", name: "Lime Wool", r: 112, g: 185, b: 25 },
  { id: "pink_wool", name: "Pink Wool", r: 237, g: 141, b: 172 },
  { id: "gray_wool", name: "Gray Wool", r: 62, g: 68, b: 71 },
  { id: "light_gray_wool", name: "Light Gray Wool", r: 142, g: 142, b: 134 },
  { id: "cyan_wool", name: "Cyan Wool", r: 21, g: 137, b: 145 },
  { id: "purple_wool", name: "Purple Wool", r: 121, g: 42, b: 172 },
  { id: "blue_wool", name: "Blue Wool", r: 53, g: 57, b: 157 },
  { id: "brown_wool", name: "Brown Wool", r: 114, g: 71, b: 40 },
  { id: "green_wool", name: "Green Wool", r: 84, g: 109, b: 27 },
  { id: "red_wool", name: "Red Wool", r: 160, g: 39, b: 34 },
  { id: "black_wool", name: "Black Wool", r: 20, g: 21, b: 25 },
  // Terracotta
  { id: "white_terracotta", name: "White Terracotta", r: 209, g: 178, b: 161 },
  { id: "orange_terracotta", name: "Orange Terracotta", r: 161, g: 83, b: 37 },
  { id: "yellow_terracotta", name: "Yellow Terracotta", r: 186, g: 133, b: 35 },
  { id: "red_terracotta", name: "Red Terracotta", r: 143, g: 61, b: 46 },
  { id: "brown_terracotta", name: "Brown Terracotta", r: 77, g: 51, b: 35 },
  { id: "green_terracotta", name: "Green Terracotta", r: 76, g: 83, b: 42 },
  { id: "black_terracotta", name: "Black Terracotta", r: 37, g: 22, b: 16 },
  // Natural blocks
  { id: "grass_block", name: "Grass Block", r: 130, g: 149, b: 68 },
  { id: "dirt", name: "Dirt", r: 134, g: 96, b: 67 },
  { id: "sand", name: "Sand", r: 219, g: 207, b: 163 },
  { id: "gravel", name: "Gravel", r: 130, g: 127, b: 127 },
  { id: "stone", name: "Stone", r: 125, g: 125, b: 125 },
  { id: "cobblestone", name: "Cobblestone", r: 127, g: 127, b: 127 },
  { id: "oak_planks", name: "Oak Planks", r: 162, g: 130, b: 78 },
  { id: "spruce_planks", name: "Spruce Planks", r: 114, g: 84, b: 47 },
  { id: "birch_planks", name: "Birch Planks", r: 192, g: 175, b: 121 },
  { id: "jungle_planks", name: "Jungle Planks", r: 160, g: 115, b: 80 },
  { id: "acacia_planks", name: "Acacia Planks", r: 168, g: 90, b: 50 },
  { id: "dark_oak_planks", name: "Dark Oak Planks", r: 66, g: 43, b: 20 },
  { id: "snow_block", name: "Snow Block", r: 249, g: 255, b: 254 },
  { id: "ice", name: "Ice", r: 145, g: 183, b: 222 },
  { id: "obsidian", name: "Obsidian", r: 15, g: 10, b: 25 },
  { id: "netherrack", name: "Netherrack", r: 114, g: 54, b: 54 },
  { id: "soul_sand", name: "Soul Sand", r: 81, g: 62, b: 50 },
  { id: "glowstone", name: "Glowstone", r: 214, g: 176, b: 105 },
  { id: "gold_block", name: "Gold Block", r: 249, g: 236, b: 77 },
  { id: "iron_block", name: "Iron Block", r: 220, g: 220, b: 220 },
  { id: "diamond_block", name: "Diamond Block", r: 99, g: 219, b: 213 },
  { id: "emerald_block", name: "Emerald Block", r: 71, g: 201, b: 98 },
  { id: "lapis_block", name: "Lapis Block", r: 29, g: 73, b: 151 },
  { id: "redstone_block", name: "Redstone Block", r: 175, g: 25, b: 8 },
  { id: "pumpkin", name: "Pumpkin", r: 200, g: 118, b: 28 },
  { id: "melon", name: "Melon", r: 110, g: 143, b: 51 },
  { id: "hay_block", name: "Hay Block", r: 197, g: 162, b: 18 },
  { id: "quartz_block", name: "Quartz Block", r: 235, g: 229, b: 222 },
  { id: "prismarine", name: "Prismarine", r: 99, g: 156, b: 143 },
  { id: "end_stone", name: "End Stone", r: 219, g: 222, b: 158 },
];

// ───────────────────────── Official map-color palette ─────────────────────────
// Minecraft maps don't show block textures — they show each block's "map color".
// These are the documented base map colors at the normal map shade (×220/255),
// each paired with a common block that produces it. Used by /map-art so the
// in-game map matches the design. Refine RGB values here if you spot a mismatch.
export const MAP_COLORS: MinecraftBlock[] = [
  { id: "grass_block", name: "Grass", r: 127, g: 178, b: 56 },
  { id: "sand", name: "Sand", r: 247, g: 233, b: 163 },
  { id: "white_wool", name: "Wool (White)", r: 199, g: 199, b: 199 },
  { id: "redstone_block", name: "Fire / Redstone", r: 255, g: 0, b: 0 },
  { id: "ice", name: "Ice", r: 160, g: 160, b: 255 },
  { id: "iron_block", name: "Metal / Iron", r: 167, g: 167, b: 167 },
  { id: "oak_leaves", name: "Plant", r: 0, g: 124, b: 0 },
  { id: "snow_block", name: "Snow", r: 255, g: 255, b: 255 },
  { id: "clay", name: "Clay", r: 164, g: 168, b: 184 },
  { id: "dirt", name: "Dirt", r: 151, g: 109, b: 77 },
  { id: "stone", name: "Stone", r: 112, g: 112, b: 112 },
  { id: "oak_planks", name: "Wood", r: 143, g: 119, b: 72 },
  { id: "quartz_block", name: "Quartz", r: 255, g: 252, b: 245 },
  { id: "orange_wool", name: "Orange", r: 216, g: 127, b: 51 },
  { id: "magenta_wool", name: "Magenta", r: 178, g: 76, b: 216 },
  { id: "light_blue_wool", name: "Light Blue", r: 102, g: 153, b: 216 },
  { id: "yellow_wool", name: "Yellow", r: 229, g: 229, b: 51 },
  { id: "lime_wool", name: "Lime", r: 127, g: 204, b: 25 },
  { id: "pink_wool", name: "Pink", r: 242, g: 127, b: 165 },
  { id: "gray_wool", name: "Gray", r: 76, g: 76, b: 76 },
  { id: "light_gray_wool", name: "Light Gray", r: 153, g: 153, b: 153 },
  { id: "cyan_wool", name: "Cyan", r: 76, g: 127, b: 153 },
  { id: "purple_wool", name: "Purple", r: 127, g: 63, b: 178 },
  { id: "blue_wool", name: "Blue", r: 51, g: 76, b: 178 },
  { id: "brown_wool", name: "Brown", r: 102, g: 76, b: 51 },
  { id: "green_wool", name: "Green", r: 102, g: 127, b: 51 },
  { id: "red_wool", name: "Red", r: 153, g: 51, b: 51 },
  { id: "black_wool", name: "Black", r: 25, g: 25, b: 25 },
  { id: "gold_block", name: "Gold", r: 250, g: 238, b: 77 },
  { id: "diamond_block", name: "Diamond", r: 92, g: 219, b: 213 },
  { id: "lapis_block", name: "Lapis", r: 74, g: 128, b: 255 },
  { id: "emerald_block", name: "Emerald", r: 0, g: 217, b: 58 },
  { id: "podzol", name: "Podzol", r: 129, g: 86, b: 49 },
  { id: "netherrack", name: "Nether", r: 112, g: 2, b: 0 },
  { id: "white_terracotta", name: "Terracotta White", r: 209, g: 177, b: 161 },
  { id: "orange_terracotta", name: "Terracotta Orange", r: 159, g: 82, b: 36 },
  { id: "crimson_planks", name: "Crimson", r: 148, g: 63, b: 97 },
  { id: "warped_planks", name: "Warped", r: 58, g: 142, b: 140 },
];

// Map-art height shades. Minecraft renders each map color at one of these
// brightness multipliers depending on the block's height relative to its
// neighbor (the "staircase" technique). Flat mode uses only the middle shade
// implicitly; staircase mode expands every color into these three variants.
export const SHADE_MULTIPLIERS = [180 / 255, 220 / 255, 255 / 255];

// Blocks that cannot reasonably be obtained in Survival mode. Used by the
// survival-friendly filter. Extend this set as the palette grows.
const NON_SURVIVAL = new Set<string>([
  // (current palette is all survival-obtainable; e.g. barrier/light/command
  //  blocks would go here once added)
]);

export function isSurvivalBlock(b: MinecraftBlock): boolean {
  return !NON_SURVIVAL.has(b.id);
}

export const PALETTES = {
  all: BLOCKS,
  concrete: BLOCKS.filter((b) => b.id.includes("concrete")),
  wool: BLOCKS.filter((b) => b.id.includes("wool")),
  terracotta: BLOCKS.filter((b) => b.id.includes("terracotta")),
  map: MAP_COLORS,
};

export type PaletteKey = keyof typeof PALETTES;
