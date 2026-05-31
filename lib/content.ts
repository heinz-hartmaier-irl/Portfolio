import {
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Download,
  GraduationCap,
  Mail,
  PanelsTopLeft,
  UserRound
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type BentoSize = "sm" | "md" | "wide" | "lg" | "xl";
export type BentoAccent = "rose" | "orange" | "gold";

export type BentoItem = {
  title: string;
  href: string;
  description: string;
  size: BentoSize;
  icon: LucideIcon;
  accent: BentoAccent;
};

export const profile = {
  name: "Heinz Hartmaier",
  role: "Développeur informatique",
  baseline: "Interfaces web modernes, applications interactives et expériences numériques utiles.",
  email: "contact@exemple.fr",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  location: "France",
  cvPath: "/cv.pdf"
};

export const bentoItems: BentoItem[] = [
  {
    title: "Présentation",
    href: "/about",
    description: "Parcours, objectifs et façon de travailler.",
    size: "lg",
    icon: UserRound,
    accent: "rose"
  },
  {
    title: "Projets",
    href: "/projects",
    description: "Réalisations web, applicatives et jeu Unity.",
    size: "lg",
    icon: PanelsTopLeft,
    accent: "gold"
  },
  {
    title: "Compétences",
    href: "/skills",
    description: "Front-end, back-end, bases de données, outils.",
    size: "sm",
    icon: Code2,
    accent: "orange"
  },
  {
    title: "Expériences",
    href: "/experience",
    description: "Stages, missions, responsabilités et résultats.",
    size: "wide",
    icon: BriefcaseBusiness,
    accent: "rose"
  },
  {
    title: "Formation",
    href: "/education",
    description: "Diplômes, apprentissages et certifications.",
    size: "sm",
    icon: GraduationCap,
    accent: "gold"
  },
  {
    title: "CV",
    href: "/cv",
    description: "Consultation et téléchargement du CV PDF.",
    size: "wide",
    icon: Download,
    accent: "orange"
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Email, GitHub, LinkedIn et formulaire.",
    size: "wide",
    icon: Mail,
    accent: "rose"
  }
];

export const projects = [
  {
    slug: "portfolio-bento",
    title: "Portfolio Bento interactif",
    summary: "Portfolio Next.js organisé comme un hub de navigation en Bento Grid.",
    description:
      "Conception d'une interface personnelle interactive, responsive et maintenable avec contenu centralisé, animations sobres et pages dédiées.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    challenges: [
      "Créer une grille aléatoire qui reste lisible",
      "Conserver de bonnes performances malgré les interactions",
      "Prévoir des contenus faciles à mettre à jour"
    ],
    results: ["Navigation claire", "Base déployable sur Vercel", "Architecture évolutive"],
    github: "https://github.com/",
    demo: "/",
    image: "/project-placeholder.svg"
  },
  {
    slug: "jeu-unity",
    title: "Jeu Unity intégré",
    summary: "Emplacement prévu pour publier une build WebGL Unity dans le portfolio.",
    description:
      "La page projet documente le jeu et prévoit l'intégration d'une build Unity WebGL exportée dans `public/unity/jeu-unity`.",
    technologies: ["Unity", "C#", "WebGL"],
    challenges: [
      "Optimiser le poids de la build WebGL",
      "Gérer le chargement dans une page responsive",
      "Documenter gameplay, difficultés et résultats"
    ],
    results: ["Page dédiée prête", "Zone d'intégration WebGL", "Présentation adaptée aux recruteurs"],
    github: "https://github.com/",
    demo: "/projects/jeu-unity",
    image: "/unity-placeholder.svg",
    unity: true
  },
  {
    slug: "cartographie-web",
    title: "Prototype cartographie web",
    summary: "Application de visualisation de données géographiques.",
    description:
      "Prototype orienté données, filtres et affichage cartographique pour explorer des informations localisées.",
    technologies: ["React", "Leaflet", "API REST", "PostgreSQL"],
    challenges: [
      "Structurer les données géographiques",
      "Créer des filtres rapides",
      "Améliorer la lisibilité mobile"
    ],
    results: ["Carte interactive", "Filtres dynamiques", "Interface utilisable sur tablette"],
    github: "https://github.com/",
    demo: "#",
    image: "/map-placeholder.svg"
  }
];

export const skillGroups = [
  {
    title: "Front-end",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "TailwindCSS"]
  },
  {
    title: "Back-end",
    skills: ["Node.js", "API REST", "PHP", "C#", "Authentification", "Architecture MVC"]
  },
  {
    title: "Bases de données",
    skills: ["MySQL", "PostgreSQL", "Modélisation", "Requêtes SQL", "Prisma"]
  },
  {
    title: "Outils",
    skills: ["Git", "GitHub", "Vercel", "Docker", "Figma", "VS Code"]
  },
  {
    title: "Domaines",
    skills: ["CMS", "Cartographie web", "Mobile", "Unity", "SEO", "Accessibilité"]
  }
];

export const timeline = [
  {
    date: "2026",
    title: "Portfolio interactif",
    type: "Projet personnel",
    description: "Création d'un portfolio Bento Grid pour présenter projets, compétences et CV."
  },
  {
    date: "2025",
    title: "Stage développement",
    type: "Expérience",
    description: "Participation à la conception d'interfaces et à l'amélioration de fonctionnalités web."
  },
  {
    date: "2024",
    title: "Formation développement informatique",
    type: "Formation",
    description: "Apprentissage du développement web, des bases de données, de Git et des bonnes pratiques."
  }
];

export const tracks = [
  {
    title: "Focus synth",
    artist: "Local track",
    src: "/music/focus-synth.mp3"
  },
  {
    title: "Night compile",
    artist: "Local track",
    src: "/music/night-compile.mp3"
  },
  {
    title: "Soft pixels",
    artist: "Local track",
    src: "/music/soft-pixels.mp3"
  }
];

export const navigation = [
  { href: "/about", label: "À propos", icon: UserRound },
  { href: "/projects", label: "Projets", icon: PanelsTopLeft },
  { href: "/skills", label: "Compétences", icon: Code2 },
  { href: "/experience", label: "Expériences", icon: BriefcaseBusiness },
  { href: "/education", label: "Formation", icon: BookOpen },
  { href: "/cv", label: "CV", icon: Download },
  { href: "/contact", label: "Contact", icon: Mail }
];
