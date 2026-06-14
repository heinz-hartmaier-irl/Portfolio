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
  format: string;
  source: string;
  accent: BentoAccent;
  size: CreationSize;
  iconKey: CreationIconKey;
  href?: string;
};

export const creationItems: CreationItem[] = [
  {
    slug: "illustration",
    title: "Illustration",
    summary: "Composition visuelle simple et lisible.",
    description:
      "Export graphique local utilisé comme base pour tester la hiérarchie, les couleurs et le rendu final.",
    category: "graphique",
    kind: "image",
    format: "PNG",
    source: "lib/creation/illustration.png",
    accent: "gold",
    size: "lg",
    iconKey: "image"
  },
  {
    slug: "rig",
    title: "Rig",
    summary: "Visuel technique et exploratoire.",
    description:
      "Un rendu local qui me sert à documenter une étape de production et à tester la cohérence d’un style graphique.",
    category: "graphique",
    kind: "image",
    format: "PNG",
    source: "lib/creation/Rig.png",
    accent: "rose",
    size: "md",
    iconKey: "palette"
  },
  {
    slug: "vergil-brutalism",
    title: "Vergil brutalism",
    summary: "Axe esthétique plus contrasté et brut.",
    description:
      "Une pièce visuelle orientée composition forte, typographie et contraste pour explorer une direction plus marquée.",
    category: "graphique",
    kind: "image",
    format: "JPG",
    source: "lib/creation/Vergil brutalism.jpg",
    accent: "orange",
    size: "wide",
    iconKey: "sparkles"
  },
  {
    slug: "publicite-alone",
    title: "Publicité Alone",
    summary: "Création publicitaire au format PDF.",
    description:
      "Pièce imprimable ou consultable en lecture, pensée comme un support de communication à part entière.",
    category: "graphique",
    kind: "document",
    format: "PDF",
    source: "lib/creation/Publicité Alone.pdf",
    accent: "gold",
    size: "md",
    iconKey: "playSquare"
  },
  {
    slug: "publicite-discovery",
    title: "Publicité Discovery",
    summary: "Support de communication mis en page.",
    description:
      "Variante de publicité avec un traitement plus éditorial pour garder un rendu propre et exploitable.",
    category: "graphique",
    kind: "document",
    format: "PDF",
    source: "lib/creation/Publicité Discovery.pdf",
    accent: "rose",
    size: "md",
    iconKey: "playSquare"
  },
  {
    slug: "publicite-lost",
    title: "Publicité Lost",
    summary: "Composition publicitaire plus narrative.",
    description:
      "Une mise en page qui mise davantage sur l’ambiance et la structure de lecture.",
    category: "graphique",
    kind: "document",
    format: "PDF",
    source: "lib/creation/Publicité Lost.pdf",
    accent: "orange",
    size: "wide",
    iconKey: "playSquare"
  },
  {
    slug: "publicite-up",
    title: "Publicité Up",
    summary: "Dernière variante de la série publicitaire.",
    description:
      "Une autre déclinaison de publicité pour garder une série homogène tout en variant les intentions visuelles.",
    category: "graphique",
    kind: "document",
    format: "PDF",
    source: "lib/creation/Publicité Up.pdf",
    accent: "gold",
    size: "sm",
    iconKey: "playSquare"
  },
  {
    slug: "portrait-ia",
    title: "Portrait IA",
    summary: "Document de recherche visuelle.",
    description:
      "Un PDF lié à une exploration visuelle qui peut servir de support de présentation ou de référence.",
    category: "graphique",
    kind: "document",
    format: "PDF",
    source: "lib/creation/portrait_ia.pdf",
    accent: "rose",
    size: "md",
    iconKey: "sparkles"
  },
  {
    slug: "test2-2",
    title: "Test 2.2",
    summary: "Maquette graphique de travail.",
    description:
      "Un visuel local pour itérer rapidement sur les formes, la composition et la lecture générale.",
    category: "graphique",
    kind: "image",
    format: "PNG",
    source: "lib/creation/test2_2.png",
    accent: "orange",
    size: "sm",
    iconKey: "image"
  },
  {
    slug: "montage-0001-0250",
    title: "Montage 0001-0250",
    summary: "Séquence vidéo courte.",
    description:
      "Extrait vidéo local que tu peux utiliser pour illustrer une étape de montage ou une ambiance visuelle.",
    category: "audiovisuel",
    kind: "video",
    format: "MP4",
    source: "lib/creation/0001-0250.mp4",
    accent: "gold",
    size: "lg",
    iconKey: "film"
  },
  {
    slug: "bref-fantome-naoki",
    title: "Bref, Fantôme Naoki",
    summary: "Pièce audiovisuelle plus longue.",
    description:
      "Une création vidéo locale qui peut servir de projet principal dans la section audio-visuelle.",
    category: "audiovisuel",
    kind: "video",
    format: "MP4",
    source: "lib/creation/Bref, Fantôme Naoki.mp4",
    accent: "rose",
    size: "lg",
    iconKey: "clapperboard"
  },
  {
    slug: "youtube-mn1u0vu42f4",
    title: "Projet diffusé sur YouTube",
    summary: "Publication vidéo sur YouTube.",
    description:
      "Lien public à intégrer dans le portfolio pour montrer une participation ou une diffusion externe.",
    category: "reseaux",
    kind: "external",
    format: "YouTube",
    source: "https://youtu.be/Mn1u0Vu42F4?si=ehNHpZkvZ_0KSex0",
    href: "https://youtu.be/Mn1u0Vu42F4?si=ehNHpZkvZ_0KSex0",
    accent: "gold",
    size: "md",
    iconKey: "share2"
  },
  {
    slug: "youtube-ho01sauatk",
    title: "Autre projet YouTube",
    summary: "Deuxième lien vidéo à mettre en avant.",
    description:
      "Publication externe supplémentaire pour documenter une autre contribution ou une autre version du projet.",
    category: "reseaux",
    kind: "external",
    format: "YouTube",
    source: "https://youtu.be/hO01SauATKk?si=3-ZHKL9XUUmRjHNH",
    href: "https://youtu.be/hO01SauATKk?si=3-ZHKL9XUUmRjHNH",
    accent: "orange",
    size: "md",
    iconKey: "share2"
  },
  {
    slug: "tiktok-7307012401470131457",
    title: "Publication TikTok 1",
    summary: "Vidéo publiée sur le compte ESNC.",
    description:
      "Premier lien TikTok à intégrer dans la section des projets publiés sur les réseaux.",
    category: "reseaux",
    kind: "external",
    format: "TikTok",
    source: "https://www.tiktok.com/@esnc_official/video/7307012401470131457?is_from_webapp=1&sender_device=pc",
    href: "https://www.tiktok.com/@esnc_official/video/7307012401470131457?is_from_webapp=1&sender_device=pc",
    accent: "rose",
    size: "sm",
    iconKey: "share2"
  },
  {
    slug: "tiktok-7308509891302264066",
    title: "Publication TikTok 2",
    summary: "Autre contenu court diffusé sur TikTok.",
    description:
      "Une autre publication externe à lier dans le portfolio pour compléter la partie réseaux.",
    category: "reseaux",
    kind: "external",
    format: "TikTok",
    source: "https://www.tiktok.com/@esnc_official/video/7308509891302264066?is_from_webapp=1&sender_device=pc",
    href: "https://www.tiktok.com/@esnc_official/video/7308509891302264066?is_from_webapp=1&sender_device=pc",
    accent: "gold",
    size: "sm",
    iconKey: "share2"
  },
  {
    slug: "tiktok-7307384268307680513",
    title: "Publication TikTok 3",
    summary: "Troisième lien de diffusion publique.",
    description:
      "Dernier lien TikTok pour montrer plusieurs contributions ou versions de la même famille de contenu.",
    category: "reseaux",
    kind: "external",
    format: "TikTok",
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
        return "Réseaux";
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
