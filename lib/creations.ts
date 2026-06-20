import type { BentoAccent } from "@/lib/content";
import { creationAssetUrl } from "@/lib/creation-assets";

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
    source: creationAssetUrl("graphic/illustration_spiderverse.png"),
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
    source: creationAssetUrl("graphic/coffe_shop.png"),
    accent: "rose",
    size: "md",
    iconKey: "palette"
  },
  {
    slug: "vergil-brutalism",
    title: "Vergil brutalism",
    summary: "Axe esthétique plus contrasté et brut.",
    description: "Pièce visuelle orientée composition forte, typographie et contraste.",
    category: "graphique",
    kind: "image",
    source: creationAssetUrl("graphic/Vergil brutalism.jpg"),
    accent: "orange",
    size: "wide",
    iconKey: "sparkles"
  },
  {
    slug: "publicite-alone",
    title: "Publicité Alone",
    summary: "Création publicitaire au format PDF.",
    description: "Pièce consultable en lecture, pensée comme support de communication.",
    category: "graphique",
    kind: "document",
    source: creationAssetUrl("graphic/Publicité Alone.pdf"),
    accent: "gold",
    size: "md",
    iconKey: "playSquare"
  },
  {
    slug: "publicite-discovery",
    title: "Publicité Discovery",
    summary: "Support de communication mis en page.",
    description: "Variante publicitaire avec un traitement éditorial propre et exploitable.",
    category: "graphique",
    kind: "document",
    source: creationAssetUrl("graphic/Publicité Discovery.pdf"),
    accent: "rose",
    size: "md",
    iconKey: "playSquare"
  },
  {
    slug: "publicite-lost",
    title: "Publicité Lost",
    summary: "Composition publicitaire plus narrative.",
    description: "Mise en page axée sur l'ambiance et la structure de lecture.",
    category: "graphique",
    kind: "document",
    source: creationAssetUrl("graphic/Publicité Lost.pdf"),
    accent: "orange",
    size: "wide",
    iconKey: "playSquare"
  },
  {
    slug: "publicite-up",
    title: "Publicité Up",
    summary: "Dernière variante de la série publicitaire.",
    description: "Déclinaison publicitaire gardant une série homogène avec une intention visuelle distincte.",
    category: "graphique",
    kind: "document",
    source: creationAssetUrl("graphic/Publicité Up.pdf"),
    accent: "gold",
    size: "sm",
    iconKey: "playSquare"
  },
  {
    slug: "rig",
    title: "Rig",
    summary: "Maquette graphique de travail.",
    description: "Visuel local pour itérer sur les formes, la composition et la lecture générale.",
    category: "graphique",
    kind: "image",
    source: creationAssetUrl("graphic/Rig.png"),
    accent: "orange",
    size: "sm",
    iconKey: "image"
  },
  {
    slug: "modelisation-flamme",
    title: "Modélisation flamme",
    summary: "Projet audio-visuel centré sur une animation vidéo.",
    description: "Lecture directe d'une animation vidéo séparée des autres captures de clip.",
    category: "audiovisuel",
    kind: "video",
    source: creationAssetUrl("audiovisuel/modelisation_flamme.mp4"),
    accent: "gold",
    size: "lg",
    iconKey: "film"
  },
  {
    slug: "clip-musical-montage",
    title: "Captures de montage clip",
    summary: "Série de captures issues d'un montage de clip.",
    description: "Captures d'écran d'un clip musical monté pour présenter le rythme, les coupes et l'ambiance visuelle.",
    category: "audiovisuel",
    kind: "image",
    source: creationAssetUrl("audiovisuel/Montage clip video.png"),
    accent: "gold",
    size: "lg",
    iconKey: "film",
    gallery: [
      {
        src: creationAssetUrl("audiovisuel/Montage clip video.png"),
        alt: "Capture 1 du montage du clip musical"
      },
      {
        src: creationAssetUrl("audiovisuel/Montage clip video 2.png"),
        alt: "Capture 2 du montage du clip musical"
      },
      {
        src: creationAssetUrl("audiovisuel/Montage clip video 3.png"),
        alt: "Capture 3 du montage du clip musical"
      }
    ]
  },
  {
    slug: "youtube-mn1u0vu42f4",
    title: "YouTube - publication 1",
    summary: "Publication vidéo sur YouTube.",
    description: "Lien public intégré au portfolio pour montrer une diffusion externe.",
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
    title: "YouTube - publication 2",
    summary: "Deuxième publication vidéo sur YouTube.",
    description: "Publication externe supplémentaire pour documenter une autre contribution.",
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
    title: "TikTok - publication 1",
    summary: "Vidéo publiée sur le compte ESNC.",
    description: "Premier lien TikTok intégré dans la section des projets publiés sur les réseaux.",
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
    title: "TikTok - publication 2",
    summary: "Autre contenu court diffusé sur TikTok.",
    description: "Autre publication externe pour compléter la partie réseaux.",
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
    title: "TikTok - publication 3",
    summary: "Troisième lien de diffusion publique.",
    description: "Dernier lien TikTok pour montrer plusieurs contributions d'une même famille de contenu.",
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
