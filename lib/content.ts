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
import type { ProjectCategory } from "@/lib/project-categories";

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

export type PortfolioProject = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  challenges: string[];
  results: string[];
  github: string;
  demo: string;
  image: string;
  gallery?: {
    src: string;
    alt: string;
  }[];
  supportingDocuments?: {
    title: string;
    src: string;
  }[];
  unity?: boolean;
  category: ProjectCategory;
};

export const profile = {
  name: "Heinz Hartmaier",
  role: "Développeur Web ",
  baseline: "Interfaces web modernes, applications interactives et expériences numériques utiles.",
  email: "heinzhartmaier.pro@gmail.com",
  github: "https://github.com/heinz-hartmaier-irl",
  linkedin: "https://www.linkedin.com/in/heinz-hartmaier-9b911326b/",
  location: "France",
  cvPath: "/cv.pdf"
};

export const bentoItems = [
  {
    title: "Présentation",
    href: "/about",
    description: "Parcours, objectifs et façon de travailler.",
    size: "lg" as BentoSize,
    icon: UserRound,
    accent: "rose" as BentoAccent
  },
  {
    title: "Projets",
    href: "/projects",
    description: "Réalisations web, applicatives et visuelles.",
    size: "lg" as BentoSize,
    icon: PanelsTopLeft,
    accent: "gold" as BentoAccent
  },
  {
    title: "Compétences",
    href: "/skills",
    description: "Front-end, back-end, bases de données, outils.",
    size: "sm" as BentoSize,
    icon: Code2,
    accent: "orange" as BentoAccent
  },
  {
    title: "Expériences",
    href: "/experience",
    description: "Stages, missions, responsabilités et résultats.",
    size: "wide" as BentoSize,
    icon: BriefcaseBusiness,
    accent: "rose" as BentoAccent
  },
  {
    title: "Formation",
    href: "/education",
    description: "Diplômes, apprentissages et certifications.",
    size: "sm" as BentoSize,
    icon: GraduationCap,
    accent: "gold" as BentoAccent
  },
  {
    title: "CV",
    href: "/cv",
    description: "Consultation et téléchargement du CV PDF.",
    size: "wide" as BentoSize,
    icon: Download,
    accent: "orange" as BentoAccent
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Email, GitHub, LinkedIn et formulaire.",
    size: "wide" as BentoSize,
    icon: Mail,
    accent: "rose" as BentoAccent
  }
] satisfies BentoItem[];

export const projects: PortfolioProject[] = [
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
    image: "/project-placeholder.svg",
    category: "web" as ProjectCategory
  },
  {
    slug: "cartographie-web",
    title: "Carte interactive de la Viti de Beaune",
    summary: "Application de visualisation de données géographiques.",
    description:
      "Prototype orienté données, filtres et affichage cartographique pour explorer des informations localisées, dans le cadre de journée porte ouverte.",
    technologies: ["JavaScript", "Leaflet", "Joomla"],
    challenges: [
      "Structurer les données géographiques",
      "Créer des filtres rapides",
      "Améliorer la lisibilité mobile"
    ],
    results: ["Carte interactive", "Filtres dynamiques", "Interface utilisable sur tablette"],
    github: "https://lavitibeaune.com/mobile",
    demo: "#",
    image: "/assets/projects/carte/figma.png",
    gallery: [
      {
        src: "/assets/projects/carte/figma.png",
        alt: "Maquette Figma de la carte interactive"
      },
      {
        src: "/assets/projects/carte/carte_phone.png",
        alt: "Version mobile de la carte interactive"
      },
      {
        src: "/assets/projects/carte/hud.png",
        alt: "Interface et filtres de la carte"
      }
    ],
    supportingDocuments: [
      { title: "Comprendre", src: "/assets/evaluation/comprendre.png" },
      { title: "Concevoir", src: "/assets/evaluation/concevoir.png" },
      { title: "Developper", src: "/assets/evaluation/developper.png" }
    ],
    category: "web" as ProjectCategory
  },
  {
    slug: "jeu-unity",
    title: "Jeu Unity",
    summary: "Prototype de jeu realise avec Unity et C#.",
    description:
      "Projet de jeu video centre sur la creation d'une scene jouable, l'integration d'assets, les interactions joueur et la presentation d'une boucle de gameplay claire.",
    technologies: ["Unity", "C#", "Game design", "UI"],
    challenges: [
      "Structurer une scene jouable dans Unity",
      "Mettre en place les interactions principales",
      "Presenter le gameplay avec une capture claire"
    ],
    results: ["Prototype jouable", "Interface integree", "Projet documente avec captures"],
    github: "https://github.com/",
    demo: "#",
    image: "/assets/projects/unity/screenshot.png",
    gallery: [
      {
        src: "/assets/projects/unity/screenshot.png",
        alt: "Capture d'ecran du jeu Unity"
      }
    ],
    supportingDocuments: [
      { title: "Exprimer", src: "/assets/evaluation/exprimer.png" },
      { title: "Entreprendre", src: "/assets/evaluation/entreprendre.png" }
    ],
    unity: true,
    category: "audiovisuel" as ProjectCategory
  }
] satisfies PortfolioProject[];

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
    description: "Participation à un projet de carte interactive et à la conception d'interfaces d'une application web."
  },
  {
    date: "2023",
    title: "BUT Métier du Multimédia et de l'Internet",
    type: "Formation",
    description: "Apprentissage du développement web, de la création numérique et de la communication."
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
