import type { BentoAccent } from "@/lib/content";

export type CreationCategory = "graphique" | "audiovisuel" | "reseaux";
export type CreationKind = "image" | "video" | "document" | "external";
export type CreationSize = "sm" | "md" | "wide" | "lg";
export type CreationIconKey =
  | "palette"
  | "sparkles"
  | "image"
  | "playSquare"
  | "film"
  | "clapperboard"
  | "share2";

export type CreationItem = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: CreationCategory;
  kind: CreationKind;
  source: string;
  accent: BentoAccent;
  size: CreationSize;
  iconKey: CreationIconKey;
  href?: string;
  gallery?: {
    src: string;
    alt: string;
  }[];
};

export const creationItems: CreationItem[] = [
  {
    slug: "spiderverse-illustration",
    title: "Illustration Spiderverse",
    summary: "Illustration graphique inspirée d'un univers de super-héros.",
    description: "Composition visuelle servant à travailler l'atmosphère, les couleurs et la lecture finale.",
    category: "graphique",
    kind: "image",
    source: "/assets/creations/spiderverse_illustration.png",
    accent: "gold",
    size: "lg",
    iconKey: "image"
  },
  {
    slug: "coffee-shop",
    title: "Coffee shop",
    summary: "Maquette visuelle pour un univers de café.",
    description: "Rendu exploratoire utilisé pour vérifier une ambiance, une hiérarchie et une direction graphique.",
    category: "graphique",
    kind: "image",
    source: "/assets/creations/coffee_shop.png",
    accent: "rose",
    size: "md",
    iconKey: "palette"
  },
  {
    slug: "vergil-brutalism",
    title: "Vergil brutalism",
    summary: "Axe esthetique plus contraste et brut.",
    description: "Piece visuelle orientee composition forte, typographie et contraste.",
    category: "graphique",
    kind: "image",
    source: "/assets/creations/Vergil brutalism.jpg",
    accent: "orange",
    size: "wide",
    iconKey: "sparkles"
  },
  {
    slug: "publicite-alone",
    title: "Publicite Alone",
    summary: "Creation publicitaire au format PDF.",
    description: "Piece consultable en lecture, pensee comme support de communication.",
    category: "graphique",
    kind: "document",
    source: "/assets/creations/Publicite Alone.pdf",
    accent: "gold",
    size: "md",
    iconKey: "playSquare"
  },
  {
    slug: "publicite-discovery",
    title: "Publicite Discovery",
    summary: "Support de communication mis en page.",
    description: "Variante publicitaire avec un traitement editorial propre et exploitable.",
    category: "graphique",
    kind: "document",
    source: "/assets/creations/Publicite Discovery.pdf",
    accent: "rose",
    size: "md",
    iconKey: "playSquare"
  },
  {
    slug: "publicite-lost",
    title: "Publicite Lost",
    summary: "Composition publicitaire plus narrative.",
    description: "Mise en page axee sur l'ambiance et la structure de lecture.",
    category: "graphique",
    kind: "document",
    source: "/assets/creations/Publicite Lost.pdf",
    accent: "orange",
    size: "wide",
    iconKey: "playSquare"
  },
  {
    slug: "publicite-up",
    title: "Publicite Up",
    summary: "Derniere variante de la serie publicitaire.",
    description: "Declinaison publicitaire gardant une serie homogene avec une intention visuelle distincte.",
    category: "graphique",
    kind: "document",
    source: "/assets/creations/Publicite Up.pdf",
    accent: "gold",
    size: "sm",
    iconKey: "playSquare"
  },
  {
    slug: "test2-2",
    title: "Test 2.2",
    summary: "Maquette graphique de travail.",
    description: "Visuel local pour iterer sur les formes, la composition et la lecture generale.",
    category: "graphique",
    kind: "image",
    source: "/assets/creations/test2_2.png",
    accent: "orange",
    size: "sm",
    iconKey: "image"
  },
  {
    slug: "clip-musical-montage",
    title: "Montage clip musical",
    summary: "Série d'images issues d'un montage vidéo.",
    description: "Captures d'écran d'un clip musical monté pour présenter le rythme, les coupes et l'ambiance visuelle.",
    category: "audiovisuel",
    kind: "video",
    source: "/assets/creations/clip_musical_montage.mp4",
    accent: "gold",
    size: "lg",
    iconKey: "film",
    gallery: [
      {
        src: "/assets/creations/clip_musical_montage_01.png",
        alt: "Capture 1 du montage du clip musical"
      },
      {
        src: "/assets/creations/clip_musical_montage_02.png",
        alt: "Capture 2 du montage du clip musical"
      },
      {
        src: "/assets/creations/clip_musical_montage_03.png",
        alt: "Capture 3 du montage du clip musical"
      }
    ]
  },
  {
    slug: "youtube-mn1u0vu42f4",
    title: "Projet diffuse sur YouTube",
    summary: "Publication video sur YouTube.",
    description: "Lien public integre au portfolio pour montrer une diffusion externe.",
    category: "reseaux",
    kind: "external",
    source: "https://youtu.be/Mn1u0Vu42F4?si=ehNHpZkvZ_0KSex0",
    href: "https://youtu.be/Mn1u0Vu42F4?si=ehNHpZkvZ_0KSex0",
    accent: "gold",
    size: "md",
    iconKey: "share2"
  },
  {
    slug: "youtube-ho01sauatk",
    title: "Autre projet YouTube",
    summary: "Deuxieme lien video a mettre en avant.",
    description: "Publication externe supplementaire pour documenter une autre contribution.",
    category: "reseaux",
    kind: "external",
    source: "https://youtu.be/hO01SauATKk?si=3-ZHKL9XUUmRjHNH",
    href: "https://youtu.be/hO01SauATKk?si=3-ZHKL9XUUmRjHNH",
    accent: "orange",
    size: "md",
    iconKey: "share2"
  },
  {
    slug: "tiktok-7307012401470131457",
    title: "Publication TikTok 1",
    summary: "Video publiee sur le compte ESNC.",
    description: "Premier lien TikTok integre dans la section des projets publies sur les reseaux.",
    category: "reseaux",
    kind: "external",
    source: "https://www.tiktok.com/@esnc_official/video/7307012401470131457?is_from_webapp=1&sender_device=pc",
    href: "https://www.tiktok.com/@esnc_official/video/7307012401470131457?is_from_webapp=1&sender_device=pc",
    accent: "rose",
    size: "sm",
    iconKey: "share2"
  },
  {
    slug: "tiktok-7308509891302264066",
    title: "Publication TikTok 2",
    summary: "Autre contenu court diffuse sur TikTok.",
    description: "Autre publication externe pour completer la partie reseaux.",
    category: "reseaux",
    kind: "external",
    source: "https://www.tiktok.com/@esnc_official/video/7308509891302264066?is_from_webapp=1&sender_device=pc",
    href: "https://www.tiktok.com/@esnc_official/video/7308509891302264066?is_from_webapp=1&sender_device=pc",
    accent: "gold",
    size: "sm",
    iconKey: "share2"
  },
  {
    slug: "tiktok-7307384268307680513",
    title: "Publication TikTok 3",
    summary: "Troisieme lien de diffusion publique.",
    description: "Dernier lien TikTok pour montrer plusieurs contributions d'une meme famille de contenu.",
    category: "reseaux",
    kind: "external",
    source: "https://www.tiktok.com/@esnc_official/video/7307384268307680513?is_from_webapp=1&sender_device=pc",
    href: "https://www.tiktok.com/@esnc_official/video/7307384268307680513?is_from_webapp=1&sender_device=pc",
    accent: "orange",
    size: "md",
    iconKey: "share2"
  }
];

export function shuffleCreations(creations: CreationItem[]) {
  return [...creations].sort(() => Math.random() - 0.5);
}

export function pickCreations(creations: CreationItem[], count: number) {
  return shuffleCreations(creations).slice(0, Math.min(count, creations.length));
}

export function formatCreationCategory(category: CreationCategory, locale: "fr" | "en") {
  if (locale === "fr") {
    switch (category) {
      case "graphique":
        return "Graphique";
      case "audiovisuel":
        return "Audio-visuel";
      case "reseaux":
        return "Reseaux";
    }
  }

  switch (category) {
    case "graphique":
      return "Graphic";
    case "audiovisuel":
      return "Audiovisual";
    case "reseaux":
      return "Published";
  }
}
