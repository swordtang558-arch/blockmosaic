export type BlockCategory =
  | "concrete"
  | "wool"
  | "terracotta"
  | "glazed"
  | "stained_glass"
  | "glass"
  | "ore"
  | "mineral"
  | "stone"
  | "wood"
  | "soil"
  | "misc";

export interface MinecraftBlock {
  id: string;
  name: string;
  r: number;
  g: number;
  b: number;
  category: BlockCategory;
  // Optional attribute flags used by the block-picker filters.
  transparent?: boolean; // glass etc. — light passes through
  falling?: boolean; // sand/gravel — affected by gravity
  light?: boolean; // emits light
  redstone?: boolean; // redstone component
  survival?: boolean; // false = not obtainable in survival (default true)
}

// Display order + labels for the block-picker category groups.
export const CATEGORY_ORDER: BlockCategory[] = [
  "concrete", "wool", "terracotta", "glazed", "stained_glass", "glass",
  "stone", "wood", "soil", "ore", "mineral", "misc",
];
export const CATEGORY_LABELS: Record<BlockCategory, string> = {
  concrete: "Concrete",
  wool: "Wool",
  terracotta: "Terracotta",
  glazed: "Glazed Terracotta",
  stained_glass: "Stained Glass",
  glass: "Glass",
  stone: "Stone & Brick",
  wood: "Wood",
  soil: "Soil & Natural",
  ore: "Ore",
  mineral: "Mineral Block",
  misc: "Misc",
};

// Curated palette of Minecraft blocks with representative average colors.
// NOTE: RGB values are hand-estimated for Phase 1; they can be recomputed
// precisely from a texture pack later (see README / blocks data notes).
export const BLOCKS: MinecraftBlock[] = [
  // ───────── Concrete (vibrant, flat) ─────────
  { id: "white_concrete", name: "White Concrete", r: 207, g: 213, b: 214, category: "concrete" },
  { id: "orange_concrete", name: "Orange Concrete", r: 224, g: 97, b: 0, category: "concrete" },
  { id: "magenta_concrete", name: "Magenta Concrete", r: 169, g: 48, b: 159, category: "concrete" },
  { id: "light_blue_concrete", name: "Light Blue Concrete", r: 36, g: 137, b: 199, category: "concrete" },
  { id: "yellow_concrete", name: "Yellow Concrete", r: 240, g: 175, b: 21, category: "concrete" },
  { id: "lime_concrete", name: "Lime Concrete", r: 94, g: 168, b: 24, category: "concrete" },
  { id: "pink_concrete", name: "Pink Concrete", r: 213, g: 101, b: 142, category: "concrete" },
  { id: "gray_concrete", name: "Gray Concrete", r: 54, g: 57, b: 61, category: "concrete" },
  { id: "light_gray_concrete", name: "Light Gray Concrete", r: 125, g: 125, b: 115, category: "concrete" },
  { id: "cyan_concrete", name: "Cyan Concrete", r: 21, g: 119, b: 136, category: "concrete" },
  { id: "purple_concrete", name: "Purple Concrete", r: 100, g: 32, b: 156, category: "concrete" },
  { id: "blue_concrete", name: "Blue Concrete", r: 45, g: 47, b: 143, category: "concrete" },
  { id: "brown_concrete", name: "Brown Concrete", r: 96, g: 59, b: 31, category: "concrete" },
  { id: "green_concrete", name: "Green Concrete", r: 73, g: 91, b: 36, category: "concrete" },
  { id: "red_concrete", name: "Red Concrete", r: 142, g: 33, b: 33, category: "concrete" },
  { id: "black_concrete", name: "Black Concrete", r: 8, g: 10, b: 15, category: "concrete" },
  // ───────── Wool ─────────
  { id: "white_wool", name: "White Wool", r: 233, g: 236, b: 236, category: "wool" },
  { id: "orange_wool", name: "Orange Wool", r: 240, g: 118, b: 19, category: "wool" },
  { id: "magenta_wool", name: "Magenta Wool", r: 189, g: 68, b: 179, category: "wool" },
  { id: "light_blue_wool", name: "Light Blue Wool", r: 58, g: 175, b: 217, category: "wool" },
  { id: "yellow_wool", name: "Yellow Wool", r: 248, g: 197, b: 39, category: "wool" },
  { id: "lime_wool", name: "Lime Wool", r: 112, g: 185, b: 25, category: "wool" },
  { id: "pink_wool", name: "Pink Wool", r: 237, g: 141, b: 172, category: "wool" },
  { id: "gray_wool", name: "Gray Wool", r: 62, g: 68, b: 71, category: "wool" },
  { id: "light_gray_wool", name: "Light Gray Wool", r: 142, g: 142, b: 134, category: "wool" },
  { id: "cyan_wool", name: "Cyan Wool", r: 21, g: 137, b: 145, category: "wool" },
  { id: "purple_wool", name: "Purple Wool", r: 121, g: 42, b: 172, category: "wool" },
  { id: "blue_wool", name: "Blue Wool", r: 53, g: 57, b: 157, category: "wool" },
  { id: "brown_wool", name: "Brown Wool", r: 114, g: 71, b: 40, category: "wool" },
  { id: "green_wool", name: "Green Wool", r: 84, g: 109, b: 27, category: "wool" },
  { id: "red_wool", name: "Red Wool", r: 160, g: 39, b: 34, category: "wool" },
  { id: "black_wool", name: "Black Wool", r: 20, g: 21, b: 25, category: "wool" },
  // ───────── Terracotta (dyed, earthy) ─────────
  { id: "white_terracotta", name: "White Terracotta", r: 209, g: 178, b: 161, category: "terracotta" },
  { id: "orange_terracotta", name: "Orange Terracotta", r: 161, g: 83, b: 37, category: "terracotta" },
  { id: "magenta_terracotta", name: "Magenta Terracotta", r: 149, g: 88, b: 108, category: "terracotta" },
  { id: "light_blue_terracotta", name: "Light Blue Terracotta", r: 113, g: 108, b: 137, category: "terracotta" },
  { id: "yellow_terracotta", name: "Yellow Terracotta", r: 186, g: 133, b: 35, category: "terracotta" },
  { id: "lime_terracotta", name: "Lime Terracotta", r: 103, g: 117, b: 52, category: "terracotta" },
  { id: "pink_terracotta", name: "Pink Terracotta", r: 161, g: 78, b: 78, category: "terracotta" },
  { id: "gray_terracotta", name: "Gray Terracotta", r: 57, g: 42, b: 35, category: "terracotta" },
  { id: "light_gray_terracotta", name: "Light Gray Terracotta", r: 135, g: 107, b: 98, category: "terracotta" },
  { id: "cyan_terracotta", name: "Cyan Terracotta", r: 87, g: 91, b: 91, category: "terracotta" },
  { id: "purple_terracotta", name: "Purple Terracotta", r: 118, g: 70, b: 86, category: "terracotta" },
  { id: "blue_terracotta", name: "Blue Terracotta", r: 74, g: 60, b: 91, category: "terracotta" },
  { id: "brown_terracotta", name: "Brown Terracotta", r: 77, g: 51, b: 35, category: "terracotta" },
  { id: "green_terracotta", name: "Green Terracotta", r: 76, g: 83, b: 42, category: "terracotta" },
  { id: "red_terracotta", name: "Red Terracotta", r: 143, g: 61, b: 46, category: "terracotta" },
  { id: "black_terracotta", name: "Black Terracotta", r: 37, g: 22, b: 16, category: "terracotta" },
  // ───────── Glazed Terracotta (patterned — representative color) ─────────
  { id: "white_glazed_terracotta", name: "White Glazed", r: 188, g: 207, b: 202, category: "glazed" },
  { id: "orange_glazed_terracotta", name: "Orange Glazed", r: 154, g: 116, b: 73, category: "glazed" },
  { id: "yellow_glazed_terracotta", name: "Yellow Glazed", r: 234, g: 192, b: 88, category: "glazed" },
  { id: "lime_glazed_terracotta", name: "Lime Glazed", r: 161, g: 196, b: 64, category: "glazed" },
  { id: "pink_glazed_terracotta", name: "Pink Glazed", r: 235, g: 154, b: 181, category: "glazed" },
  { id: "cyan_glazed_terracotta", name: "Cyan Glazed", r: 52, g: 119, b: 125, category: "glazed" },
  { id: "blue_glazed_terracotta", name: "Blue Glazed", r: 47, g: 65, b: 135, category: "glazed" },
  { id: "red_glazed_terracotta", name: "Red Glazed", r: 178, g: 53, b: 44, category: "glazed" },
  { id: "black_glazed_terracotta", name: "Black Glazed", r: 67, g: 39, b: 39, category: "glazed" },
  // ───────── Stained Glass (transparent) ─────────
  { id: "white_stained_glass", name: "White Glass", r: 255, g: 255, b: 255, category: "stained_glass", transparent: true },
  { id: "orange_stained_glass", name: "Orange Glass", r: 216, g: 127, b: 51, category: "stained_glass", transparent: true },
  { id: "magenta_stained_glass", name: "Magenta Glass", r: 178, g: 76, b: 216, category: "stained_glass", transparent: true },
  { id: "light_blue_stained_glass", name: "Light Blue Glass", r: 102, g: 153, b: 216, category: "stained_glass", transparent: true },
  { id: "yellow_stained_glass", name: "Yellow Glass", r: 229, g: 229, b: 51, category: "stained_glass", transparent: true },
  { id: "lime_stained_glass", name: "Lime Glass", r: 127, g: 204, b: 25, category: "stained_glass", transparent: true },
  { id: "pink_stained_glass", name: "Pink Glass", r: 242, g: 127, b: 165, category: "stained_glass", transparent: true },
  { id: "gray_stained_glass", name: "Gray Glass", r: 76, g: 76, b: 76, category: "stained_glass", transparent: true },
  { id: "cyan_stained_glass", name: "Cyan Glass", r: 76, g: 127, b: 153, category: "stained_glass", transparent: true },
  { id: "purple_stained_glass", name: "Purple Glass", r: 127, g: 63, b: 178, category: "stained_glass", transparent: true },
  { id: "blue_stained_glass", name: "Blue Glass", r: 51, g: 76, b: 178, category: "stained_glass", transparent: true },
  { id: "green_stained_glass", name: "Green Glass", r: 102, g: 127, b: 51, category: "stained_glass", transparent: true },
  { id: "red_stained_glass", name: "Red Glass", r: 153, g: 51, b: 51, category: "stained_glass", transparent: true },
  { id: "black_stained_glass", name: "Black Glass", r: 25, g: 25, b: 25, category: "stained_glass", transparent: true },
  // ───────── Glass ─────────
  { id: "glass", name: "Glass", r: 175, g: 213, b: 219, category: "glass", transparent: true },
  { id: "tinted_glass", name: "Tinted Glass", r: 39, g: 33, b: 44, category: "glass", transparent: true },
  // ───────── Stone & Brick ─────────
  { id: "stone", name: "Stone", r: 125, g: 125, b: 125, category: "stone" },
  { id: "cobblestone", name: "Cobblestone", r: 127, g: 127, b: 127, category: "stone" },
  { id: "smooth_stone", name: "Smooth Stone", r: 158, g: 158, b: 158, category: "stone" },
  { id: "stone_bricks", name: "Stone Bricks", r: 122, g: 121, b: 122, category: "stone" },
  { id: "granite", name: "Granite", r: 149, g: 103, b: 85, category: "stone" },
  { id: "diorite", name: "Diorite", r: 188, g: 188, b: 190, category: "stone" },
  { id: "andesite", name: "Andesite", r: 132, g: 134, b: 132, category: "stone" },
  { id: "deepslate", name: "Deepslate", r: 77, g: 77, b: 82, category: "stone" },
  { id: "cobbled_deepslate", name: "Cobbled Deepslate", r: 71, g: 71, b: 76, category: "stone" },
  { id: "tuff", name: "Tuff", r: 108, g: 109, b: 102, category: "stone" },
  { id: "calcite", name: "Calcite", r: 223, g: 224, b: 220, category: "stone" },
  { id: "basalt", name: "Basalt", r: 73, g: 73, b: 80, category: "stone" },
  { id: "blackstone", name: "Blackstone", r: 42, g: 36, b: 41, category: "stone" },
  { id: "bricks", name: "Bricks", r: 150, g: 97, b: 83, category: "stone" },
  { id: "sandstone", name: "Sandstone", r: 216, g: 203, b: 155, category: "stone" },
  { id: "red_sandstone", name: "Red Sandstone", r: 184, g: 98, b: 31, category: "stone" },
  { id: "nether_bricks", name: "Nether Bricks", r: 44, g: 22, b: 26, category: "stone" },
  { id: "quartz_block", name: "Quartz Block", r: 235, g: 229, b: 222, category: "stone" },
  { id: "prismarine", name: "Prismarine", r: 99, g: 156, b: 143, category: "stone" },
  { id: "dark_prismarine", name: "Dark Prismarine", r: 51, g: 91, b: 75, category: "stone" },
  { id: "purpur_block", name: "Purpur Block", r: 169, g: 125, b: 169, category: "stone" },
  { id: "end_stone", name: "End Stone", r: 219, g: 222, b: 158, category: "stone" },
  // ───────── Wood (planks & logs) ─────────
  { id: "oak_planks", name: "Oak Planks", r: 162, g: 130, b: 78, category: "wood" },
  { id: "spruce_planks", name: "Spruce Planks", r: 114, g: 84, b: 47, category: "wood" },
  { id: "birch_planks", name: "Birch Planks", r: 192, g: 175, b: 121, category: "wood" },
  { id: "jungle_planks", name: "Jungle Planks", r: 160, g: 115, b: 80, category: "wood" },
  { id: "acacia_planks", name: "Acacia Planks", r: 168, g: 90, b: 50, category: "wood" },
  { id: "dark_oak_planks", name: "Dark Oak Planks", r: 66, g: 43, b: 20, category: "wood" },
  { id: "mangrove_planks", name: "Mangrove Planks", r: 119, g: 54, b: 49, category: "wood" },
  { id: "cherry_planks", name: "Cherry Planks", r: 226, g: 178, b: 171, category: "wood" },
  { id: "bamboo_planks", name: "Bamboo Planks", r: 195, g: 173, b: 100, category: "wood" },
  { id: "crimson_planks", name: "Crimson Planks", r: 101, g: 48, b: 70, category: "wood" },
  { id: "warped_planks", name: "Warped Planks", r: 43, g: 104, b: 99, category: "wood" },
  { id: "oak_log", name: "Oak Log", r: 109, g: 86, b: 51, category: "wood" },
  // ───────── Soil & Natural ─────────
  { id: "grass_block", name: "Grass Block", r: 130, g: 149, b: 68, category: "soil" },
  { id: "dirt", name: "Dirt", r: 134, g: 96, b: 67, category: "soil" },
  { id: "coarse_dirt", name: "Coarse Dirt", r: 119, g: 85, b: 59, category: "soil" },
  { id: "podzol", name: "Podzol", r: 91, g: 64, b: 27, category: "soil" },
  { id: "mycelium", name: "Mycelium", r: 111, g: 99, b: 100, category: "soil" },
  { id: "sand", name: "Sand", r: 219, g: 207, b: 163, category: "soil", falling: true },
  { id: "red_sand", name: "Red Sand", r: 190, g: 102, b: 33, category: "soil", falling: true },
  { id: "gravel", name: "Gravel", r: 130, g: 127, b: 127, category: "soil", falling: true },
  { id: "clay", name: "Clay", r: 159, g: 164, b: 177, category: "soil" },
  { id: "mud", name: "Mud", r: 60, g: 57, b: 61, category: "soil" },
  { id: "soul_sand", name: "Soul Sand", r: 81, g: 62, b: 50, category: "soil" },
  { id: "moss_block", name: "Moss Block", r: 89, g: 109, b: 45, category: "soil" },
  // ───────── Ore ─────────
  { id: "coal_ore", name: "Coal Ore", r: 105, g: 105, b: 105, category: "ore" },
  { id: "iron_ore", name: "Iron Ore", r: 165, g: 142, b: 124, category: "ore" },
  { id: "copper_ore", name: "Copper Ore", r: 124, g: 130, b: 110, category: "ore" },
  { id: "gold_ore", name: "Gold Ore", r: 151, g: 138, b: 100, category: "ore" },
  { id: "redstone_ore", name: "Redstone Ore", r: 142, g: 110, b: 110, category: "ore" },
  { id: "lapis_ore", name: "Lapis Ore", r: 107, g: 117, b: 135, category: "ore" },
  { id: "diamond_ore", name: "Diamond Ore", r: 124, g: 154, b: 152, category: "ore" },
  { id: "emerald_ore", name: "Emerald Ore", r: 110, g: 145, b: 110, category: "ore" },
  { id: "deepslate_coal_ore", name: "Deepslate Coal Ore", r: 73, g: 73, b: 78, category: "ore" },
  { id: "deepslate_iron_ore", name: "Deepslate Iron Ore", r: 110, g: 99, b: 92, category: "ore" },
  { id: "deepslate_gold_ore", name: "Deepslate Gold Ore", r: 110, g: 99, b: 66, category: "ore" },
  { id: "deepslate_diamond_ore", name: "Deepslate Diamond Ore", r: 78, g: 102, b: 102, category: "ore" },
  // ───────── Mineral Blocks ─────────
  { id: "coal_block", name: "Coal Block", r: 16, g: 16, b: 16, category: "mineral" },
  { id: "iron_block", name: "Iron Block", r: 220, g: 220, b: 220, category: "mineral" },
  { id: "copper_block", name: "Copper Block", r: 192, g: 107, b: 79, category: "mineral" },
  { id: "gold_block", name: "Gold Block", r: 249, g: 236, b: 77, category: "mineral" },
  { id: "diamond_block", name: "Diamond Block", r: 99, g: 219, b: 213, category: "mineral" },
  { id: "emerald_block", name: "Emerald Block", r: 71, g: 201, b: 98, category: "mineral" },
  { id: "lapis_block", name: "Lapis Block", r: 29, g: 73, b: 151, category: "mineral" },
  { id: "redstone_block", name: "Redstone Block", r: 175, g: 25, b: 8, category: "mineral", redstone: true },
  { id: "netherite_block", name: "Netherite Block", r: 66, g: 60, b: 62, category: "mineral" },
  // ───────── Misc / Light / Decorative ─────────
  { id: "glowstone", name: "Glowstone", r: 214, g: 176, b: 105, category: "misc", light: true },
  { id: "sea_lantern", name: "Sea Lantern", r: 172, g: 199, b: 190, category: "misc", light: true },
  { id: "shroomlight", name: "Shroomlight", r: 240, g: 146, b: 70, category: "misc", light: true },
  { id: "jack_o_lantern", name: "Jack o'Lantern", r: 213, g: 153, b: 49, category: "misc", light: true },
  { id: "magma_block", name: "Magma Block", r: 142, g: 74, b: 47, category: "misc", light: true },
  { id: "redstone_lamp", name: "Redstone Lamp", r: 95, g: 58, b: 30, category: "misc", redstone: true },
  { id: "snow_block", name: "Snow Block", r: 249, g: 255, b: 254, category: "misc" },
  { id: "ice", name: "Ice", r: 145, g: 183, b: 222, category: "misc", transparent: true },
  { id: "packed_ice", name: "Packed Ice", r: 141, g: 180, b: 226, category: "misc" },
  { id: "blue_ice", name: "Blue Ice", r: 116, g: 167, b: 253, category: "misc" },
  { id: "obsidian", name: "Obsidian", r: 15, g: 10, b: 25, category: "misc" },
  { id: "netherrack", name: "Netherrack", r: 114, g: 54, b: 54, category: "misc" },
  { id: "bone_block", name: "Bone Block", r: 209, g: 205, b: 179, category: "misc" },
  { id: "honeycomb_block", name: "Honeycomb Block", r: 229, g: 148, b: 39, category: "misc" },
  { id: "pumpkin", name: "Pumpkin", r: 200, g: 118, b: 28, category: "misc" },
  { id: "melon", name: "Melon", r: 110, g: 143, b: 51, category: "misc" },
  { id: "hay_block", name: "Hay Block", r: 197, g: 162, b: 18, category: "misc" },
  { id: "nether_wart_block", name: "Nether Wart Block", r: 114, g: 13, b: 13, category: "misc" },
  { id: "dried_kelp_block", name: "Dried Kelp Block", r: 51, g: 54, b: 41, category: "misc" },
  { id: "sponge", name: "Sponge", r: 195, g: 192, b: 75, category: "misc" },
];

// ───────────────────────── Official map-color palette ─────────────────────────
// Minecraft maps don't show block textures — they show each block's "map color".
// These are the documented base map colors at the normal map shade (×220/255),
// each paired with a common block that produces it. Used by /map-art so the
// in-game map matches the design. Refine RGB values here if you spot a mismatch.
export const MAP_COLORS: MinecraftBlock[] = [
  { id: "grass_block", name: "Grass", r: 127, g: 178, b: 56, category: "soil" },
  { id: "sand", name: "Sand", r: 247, g: 233, b: 163, category: "soil" },
  { id: "white_wool", name: "Wool (White)", r: 199, g: 199, b: 199, category: "wool" },
  { id: "redstone_block", name: "Fire / Redstone", r: 255, g: 0, b: 0, category: "mineral" },
  { id: "ice", name: "Ice", r: 160, g: 160, b: 255, category: "misc" },
  { id: "iron_block", name: "Metal / Iron", r: 167, g: 167, b: 167, category: "mineral" },
  { id: "oak_leaves", name: "Plant", r: 0, g: 124, b: 0, category: "misc" },
  { id: "snow_block", name: "Snow", r: 255, g: 255, b: 255, category: "misc" },
  { id: "clay", name: "Clay", r: 164, g: 168, b: 184, category: "soil" },
  { id: "dirt", name: "Dirt", r: 151, g: 109, b: 77, category: "soil" },
  { id: "stone", name: "Stone", r: 112, g: 112, b: 112, category: "stone" },
  { id: "oak_planks", name: "Wood", r: 143, g: 119, b: 72, category: "wood" },
  { id: "quartz_block", name: "Quartz", r: 255, g: 252, b: 245, category: "stone" },
  { id: "orange_wool", name: "Orange", r: 216, g: 127, b: 51, category: "wool" },
  { id: "magenta_wool", name: "Magenta", r: 178, g: 76, b: 216, category: "wool" },
  { id: "light_blue_wool", name: "Light Blue", r: 102, g: 153, b: 216, category: "wool" },
  { id: "yellow_wool", name: "Yellow", r: 229, g: 229, b: 51, category: "wool" },
  { id: "lime_wool", name: "Lime", r: 127, g: 204, b: 25, category: "wool" },
  { id: "pink_wool", name: "Pink", r: 242, g: 127, b: 165, category: "wool" },
  { id: "gray_wool", name: "Gray", r: 76, g: 76, b: 76, category: "wool" },
  { id: "light_gray_wool", name: "Light Gray", r: 153, g: 153, b: 153, category: "wool" },
  { id: "cyan_wool", name: "Cyan", r: 76, g: 127, b: 153, category: "wool" },
  { id: "purple_wool", name: "Purple", r: 127, g: 63, b: 178, category: "wool" },
  { id: "blue_wool", name: "Blue", r: 51, g: 76, b: 178, category: "wool" },
  { id: "brown_wool", name: "Brown", r: 102, g: 76, b: 51, category: "wool" },
  { id: "green_wool", name: "Green", r: 102, g: 127, b: 51, category: "wool" },
  { id: "red_wool", name: "Red", r: 153, g: 51, b: 51, category: "wool" },
  { id: "black_wool", name: "Black", r: 25, g: 25, b: 25, category: "wool" },
  { id: "gold_block", name: "Gold", r: 250, g: 238, b: 77, category: "mineral" },
  { id: "diamond_block", name: "Diamond", r: 92, g: 219, b: 213, category: "mineral" },
  { id: "lapis_block", name: "Lapis", r: 74, g: 128, b: 255, category: "mineral" },
  { id: "emerald_block", name: "Emerald", r: 0, g: 217, b: 58, category: "mineral" },
  { id: "podzol", name: "Podzol", r: 129, g: 86, b: 49, category: "soil" },
  { id: "netherrack", name: "Nether", r: 112, g: 2, b: 0, category: "misc" },
  { id: "white_terracotta", name: "Terracotta White", r: 209, g: 177, b: 161, category: "terracotta" },
  { id: "orange_terracotta", name: "Terracotta Orange", r: 159, g: 82, b: 36, category: "terracotta" },
  { id: "crimson_planks", name: "Crimson", r: 148, g: 63, b: 97, category: "wood" },
  { id: "warped_planks", name: "Warped", r: 58, g: 142, b: 140, category: "wood" },
];

// Map-art height shades. Minecraft renders each map color at one of these
// brightness multipliers depending on the block's height relative to its
// neighbor (the "staircase" technique). Flat mode uses only the middle shade;
// staircase mode expands every color into these three variants.
export const SHADE_MULTIPLIERS = [180 / 255, 220 / 255, 255 / 255];

export function isSurvivalBlock(b: MinecraftBlock): boolean {
  return b.survival !== false;
}

// Default selection seed for the picker: vibrant concrete is the most popular.
export const DEFAULT_SELECTED_IDS = BLOCKS.filter((b) => b.category === "concrete").map((b) => b.id);

// Legacy preset palettes (kept for any references); the tool now uses the
// granular block picker for selection.
export const PALETTES = {
  all: BLOCKS,
  concrete: BLOCKS.filter((b) => b.category === "concrete"),
  wool: BLOCKS.filter((b) => b.category === "wool"),
  terracotta: BLOCKS.filter((b) => b.category === "terracotta"),
  map: MAP_COLORS,
};
export type PaletteKey = keyof typeof PALETTES;
