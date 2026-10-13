// Media manifest. Every image on the page is looked up here by key, so a real
// photograph can replace a generated one by editing this file only:
// put the new files in /public/assets/img/ (same widths), change `base`,
// set sourceType to "photo" and fill `replacement` with where it came from.
// Generated masters stay in the Higgsfield library under `jobId`.

export type SourceType = "generated" | "photo";
export type MediaEntry = {
  key: string;
  menuItemId: string | null; // id in content/menu.ts, null for scene images
  base: string; // "/assets/img/<name>" + "-<width>.webp"
  widths: number[];
  width: number; // intrinsic size of the largest served file ratio
  height: number;
  crop: string; // how the served files were cut from the master
  sourceType: SourceType;
  model?: string;
  jobId?: string;
  masterSize?: string; // real output size of the generation master
  alt: string;
  replacement: string | null;
};

const W3x2 = {
  widths: [640, 1280, 1920],
  width: 1920,
  height: 1275,
  crop: "full frame 3:2 (master 2048x1360)",
};
const G = {
  sourceType: "generated" as const,
  model: "gpt_image_2_5 (2k, medium)",
  masterSize: "2048x1360",
  replacement: null,
};

export const MEDIA: Record<string, MediaEntry> = {
  "lomo-saltado": {
    key: "lomo-saltado",
    menuItemId: "lomo-saltado",
    base: "/assets/img/lomo-saltado",
    ...W3x2,
    ...G,
    jobId: "c3dba7ea-f127-496a-82d3-40c1958bbe8b",
    alt: "Lomo saltado: seared beef strips with red onion and tomato, a dome of white rice and golden fries on a white plate",
  },
  "ceviche-mixto": {
    key: "ceviche-mixto",
    menuItemId: "ceviche-mixto",
    base: "/assets/img/ceviche-mixto",
    ...W3x2,
    ...G,
    jobId: "21fa8895-890a-4377-ae7a-ffa3abfa560c",
    alt: "Ceviche mixto: shrimp, mussels, calamari and fish in lime juice with sliced red onion and lime wedges",
  },
  "papa-a-la-huancaina": {
    key: "papa-a-la-huancaina",
    menuItemId: "papa-a-la-huancaina",
    base: "/assets/img/papa-a-la-huancaina",
    ...W3x2,
    ...G,
    jobId: "071914f0-95ac-4a76-8362-2235c2d9972d",
    alt: "Papa a la huancaína: sliced potatoes under creamy yellow ají amarillo sauce with boiled egg and black olives",
  },
  "yucas-fritas": {
    key: "yucas-fritas",
    menuItemId: "yucas-fritas",
    base: "/assets/img/yucas-fritas",
    ...W3x2,
    ...G,
    jobId: "4430bca6-eba1-43b8-8378-c37c84e4ae1f",
    alt: "Yucas fritas: golden fried yuca batons with a small cup of huancaína dipping sauce",
  },
  "aji-de-gallina": {
    key: "aji-de-gallina",
    menuItemId: "aji-de-gallina",
    base: "/assets/img/aji-de-gallina",
    ...W3x2,
    ...G,
    jobId: "9220c738-537c-4262-ba58-ed90f52418d3",
    alt: "Ají de gallina: shredded chicken in creamy golden ají amarillo sauce beside white rice",
  },
  "tallarines-verdes": {
    key: "tallarines-verdes",
    menuItemId: "tallarines-verdes",
    base: "/assets/img/tallarines-verdes-milanesa",
    ...W3x2,
    ...G,
    jobId: "d2dfaf35-5234-46f2-92a1-5c0864914cd7",
    alt: "Tallarines verdes with milanesa: green basil-spinach linguini with parmesan, topped with a sliced breaded chicken cutlet",
  },
  "arroz-con-mariscos": {
    key: "arroz-con-mariscos",
    menuItemId: "arroz-con-mariscos",
    base: "/assets/img/arroz-con-mariscos",
    ...W3x2,
    ...G,
    jobId: "d387cb23-ecbb-42c5-a43d-28c3d5351cfd",
    alt: "Arroz con mariscos: ají panca rice with shrimp, mussels and calamari, green onion and red pepper strips",
  },
  "jalea-mixta": {
    key: "jalea-mixta",
    menuItemId: "jalea-mixta",
    base: "/assets/img/jalea-mixta",
    ...W3x2,
    ...G,
    jobId: "48ef45f4-9cc8-47de-9240-2aee1539e3eb",
    alt: "Jalea mixta: crispy fried fish, calamari and shrimp topped with red onion, with lime and tartar sauce",
  },
  quesabirrias: {
    key: "quesabirrias",
    menuItemId: "quesabirrias",
    base: "/assets/img/quesabirrias",
    ...W3x2,
    ...G,
    jobId: "2471ef20-fa0a-47da-aa58-68578d166b1c",
    alt: "Three quesabirrias with melted cheese and shredded beef, a cup of consommé with onion and cilantro, and lime",
  },
  "street-tacos": {
    key: "street-tacos",
    menuItemId: "street-tacos",
    base: "/assets/img/street-tacos",
    ...W3x2,
    ...G,
    jobId: "6074b033-fda9-4958-9891-4a6750853328",
    alt: "Three street tacos with carne asada, chopped onion and cilantro, red salsa and lime wedges",
  },
  "wet-burrito": {
    key: "wet-burrito",
    menuItemId: "wet-burrito",
    base: "/assets/img/wet-burrito",
    ...W3x2,
    ...G,
    jobId: "dba8ced8-3edf-491b-9757-2f4af1cb180a",
    alt: "Wet burrito smothered in red sauce and melted cheese with drizzles of sour cream",
  },
  "carne-asada": {
    key: "carne-asada",
    menuItemId: "carne-asada",
    base: "/assets/img/carne-asada",
    ...W3x2,
    ...G,
    jobId: "b5ad6546-3098-4886-b635-b083e180ca91",
    alt: "Carne asada plate: sliced grilled steak with rice, beans, sour cream, guacamole, lettuce, pico de gallo and tortillas",
  },
  "dragon-roll": {
    key: "dragon-roll",
    menuItemId: "dragon-roll",
    base: "/assets/img/dragon-roll",
    ...W3x2,
    ...G,
    jobId: "7a924b77-5039-41e8-8d4f-4e515c722e4d",
    alt: "Dragon roll: eight pieces filled with crab mix, shrimp tempura and cucumber, topped with sliced avocado",
  },
  "fireworks-roll": {
    key: "fireworks-roll",
    menuItemId: "fireworks-roll",
    base: "/assets/img/fireworks-roll",
    ...W3x2,
    ...G,
    jobId: "b7f21a5d-961e-4360-8761-bb95fb5ec077",
    alt: "Fireworks roll: torched spicy tuna and green onion topping over crab, shrimp tempura, avocado and cream cheese",
  },
  "chicha-morada": {
    key: "chicha-morada",
    menuItemId: "chicha-morada",
    base: "/assets/img/chicha-morada",
    ...W3x2,
    ...G,
    jobId: "9fd5084f-d67e-420b-9ce2-6ff841f22026",
    alt: "A tall glass of deep purple chicha morada over ice",
  },
  horchata: {
    key: "horchata",
    menuItemId: "horchata",
    base: "/assets/img/horchata",
    ...W3x2,
    ...G,
    jobId: "6449b987-3233-43e9-ad22-4f97e8edbb67",
    alt: "A tall glass of creamy white horchata over ice",
  },
  "crema-volteada": {
    key: "crema-volteada",
    menuItemId: "crema-volteada",
    base: "/assets/img/crema-volteada",
    ...W3x2,
    ...G,
    jobId: "7353b7ba-9b6f-45ac-af84-06cab7cbc9c7",
    alt: "A slice of crema volteada, Peruvian caramel flan, with amber caramel sauce",
  },
  "shared-table": {
    key: "shared-table",
    menuItemId: null,
    base: "/assets/img/shared-table",
    widths: [640, 1280, 1920],
    width: 1920,
    height: 1086,
    crop: "full frame (master 2688x1520)",
    sourceType: "generated",
    model: "gpt_image_2_5 (2k, medium)",
    jobId: "692a02f6-373a-4c59-9244-6db3d78cae40",
    masterSize: "2688x1520",
    alt: "A shared table with lomo saltado, street tacos, a dragon roll, chicha morada, horchata and flan on a woven runner",
    replacement: null,
  },
};

// Hero flame. Still master 3840x2160 (native, gpt_image_2_5 4k high, job 0289fa39-c8e3-499e-bc48-1bf9e1cbcbdf).
// Clip master 2560x1440, 24 fps, 6.6 s (native 2K, minimax_h3, job db58e45d-f6b0-47e8-aff9-acd63e2b03ed);
// served as a 13 s forward-and-back loop. Nothing here is upscaled.
export const HERO = {
  poster: {
    desktop: "/assets/hero/flame-poster-1920.webp",
    desktopSmall: "/assets/hero/flame-poster-1280.webp",
    mobile: "/assets/hero/flame-poster-mobile-540.webp",
  },
  video: {
    desktop: { mp4: "/assets/hero/flame-1080.mp4", webm: "/assets/hero/flame-1080.webm" },
    mobile: {
      mp4: "/assets/hero/flame-mobile-540.mp4",
      webm: "/assets/hero/flame-mobile-540.webm",
    },
  },
  still: {
    base: "/assets/hero/flame-still",
    widths: [1280, 1920, 2560],
    mobile: [
      "/assets/hero/flame-still-mobile-720.webp",
      "/assets/hero/flame-still-mobile-1080.webp",
    ],
  },
  alt: "A cooking flame rising from a dark wok of seared beef, red onion and tomato for lomo saltado",
};

export function srcSet(m: MediaEntry) {
  return m.widths.map((w) => `${m.base}-${w}.webp ${w}w`).join(", ");
}
export function src(m: MediaEntry, w = 1280) {
  return `${m.base}-${w}.webp`;
}
