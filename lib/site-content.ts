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
import { bentoItems as frBentoItems, profile as frProfile, projects as frProjects, skillGroups as frSkillGroups, timeline as frTimeline } from "@/lib/content";
import type { BentoAccent, BentoItem, BentoSize, PortfolioProject } from "@/lib/content";
import type { ProjectCategory } from "@/lib/project-categories";

export type Locale = "fr" | "en";

export const defaultLocale: Locale = "fr";

export function normalizeLocale(value: string | null | undefined): Locale {
  return value === "en" ? "en" : defaultLocale;
}

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN"
};

const icons = {
  UserRound,
  PanelsTopLeft,
  Code2,
  BriefcaseBusiness,
  GraduationCap,
  Download,
  Mail,
  BookOpen
} satisfies Record<string, LucideIcon>;

const enProfile = {
  name: "Heinz Hartmaier",
  role: "Web developer",
  baseline: "Modern web interfaces, interactive applications and useful digital experiences.",
  email: "heinzhartmaier.pro@gmail.com",
  github: "https://github.com/heinz-hartmaier-irl",
  linkedin: "https://www.linkedin.com/in/heinz-hartmaier-9b911326b/",
  location: "France",
  cvPath: "/cv.pdf"
};

const enBentoItems: BentoItem[] = [
  {
    title: "Profile",
    href: "/about",
    description: "Background, goals and working style.",
    size: "lg" as BentoSize,
    icon: icons.UserRound,
    accent: "rose" as BentoAccent
  },
  {
    title: "Projects",
    href: "/projects",
    description: "Web, audiovisual and visual work.",
    size: "lg" as BentoSize,
    icon: icons.PanelsTopLeft,
    accent: "gold" as BentoAccent
  },
  {
    title: "Skills",
    href: "/skills",
    description: "Front-end, back-end, databases and tools.",
    size: "sm" as BentoSize,
    icon: icons.Code2,
    accent: "orange" as BentoAccent
  },
  {
    title: "Experience",
    href: "/experience",
    description: "Roles, responsibilities and outcomes.",
    size: "wide" as BentoSize,
    icon: icons.BriefcaseBusiness,
    accent: "rose" as BentoAccent
  },
  {
    title: "Education",
    href: "/education",
    description: "Diplomas, learning and certifications.",
    size: "sm" as BentoSize,
    icon: icons.GraduationCap,
    accent: "gold" as BentoAccent
  },
  {
    title: "CV",
    href: "/cv",
    description: "View and download the PDF CV.",
    size: "wide" as BentoSize,
    icon: icons.Download,
    accent: "orange" as BentoAccent
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Email, GitHub, LinkedIn and form.",
    size: "wide" as BentoSize,
    icon: icons.Mail,
    accent: "rose" as BentoAccent
  }
];

const enProjects: PortfolioProject[] = [
  {
    slug: "portfolio-bento",
    title: "Interactive Bento portfolio",
    summary: "A Next.js portfolio organized as a Bento-style navigation hub.",
    description:
      "A personal interface built to stay interactive, responsive and maintainable with centralized content, restrained motion and dedicated pages.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    challenges: [
      "Keep a randomized grid readable",
      "Preserve good performance under interaction",
      "Make content easy to update"
    ],
    results: ["Clear navigation", "Deployable on Vercel", "Scalable architecture"],
    github: "https://github.com/",
    demo: "/",
    image: "/project-placeholder.svg",
    category: "web" as ProjectCategory
  },
  {
    slug: "cartographie-web",
    title: "Web mapping prototype",
    summary: "A geographic data visualization application.",
    description:
      "A data-oriented prototype with filters and map rendering to explore localized information.",
    technologies: ["React", "Leaflet", "REST API", "PostgreSQL"],
    challenges: [
      "Structure geographic data",
      "Build fast filters",
      "Improve mobile readability"
    ],
    results: ["Interactive map", "Dynamic filters", "Tablet-friendly UI"],
    github: "https://github.com/",
    demo: "#",
    image: "/map-placeholder.svg",
    category: "web" as ProjectCategory
  }
];

const enSkillGroups = [
  {
    title: "Front-end",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "TailwindCSS"]
  },
  {
    title: "Back-end",
    skills: ["Node.js", "REST API", "PHP", "C#", "Authentication", "MVC architecture"]
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "Modeling", "SQL queries", "Prisma"]
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Vercel", "Docker", "Figma", "VS Code"]
  },
  {
    title: "Domains",
    skills: ["CMS", "Web mapping", "Mobile", "Unity", "SEO", "Accessibility"]
  }
];

const enTimeline = [
  {
    date: "2026",
    title: "Interactive portfolio",
    type: "Personal project",
    description: "Building a Bento Grid portfolio to present projects, skills and CV."
  },
  {
    date: "2025",
    title: "Development internship",
    type: "Experience",
    description: "Contributing to interface design and web feature improvements."
  },
  {
    date: "2023",
    title: "Bachelor's degree in Multimedia and Internet Professions",
    type: "Education",
    description: "Learning web development, digital creation and communication."
  }
];

export const siteContent = {
  fr: {
    profile: frProfile,
    navigation: [
      { href: "/about", label: "À propos", icon: icons.UserRound },
      { href: "/projects", label: "Projets", icon: icons.PanelsTopLeft },
      { href: "/skills", label: "Compétences", icon: icons.Code2 },
      { href: "/experience", label: "Expériences", icon: icons.BriefcaseBusiness },
      { href: "/education", label: "Formation", icon: icons.BookOpen },
      { href: "/cv", label: "CV", icon: icons.Download },
      { href: "/contact", label: "Contact", icon: icons.Mail }
    ],
    bentoItems: frBentoItems,
    projects: frProjects,
    skillGroups: frSkillGroups,
    timeline: frTimeline,
    pages: {
      home: {
        title: "Portfolio développeur - Bento interactif",
        description:
          "Portfolio personnel interactif en Bento Grid pour présenter projets, compétences, expériences, formation, CV et contact."
      },
      about: {
        title: "À propos",
        eyebrow: "Présentation",
        heading: "Un développeur qui découvre le monde.",
        description:
          "Cette page sert de base éditable pour présenter le parcours, les méthodes de travail et les objectifs professionnels.",
        sectionOneTitle: "Qui suis-je ?",
        sectionOneText:
          "Je suis {name}, développeur web qui a débuté dans le développement d'applications web interactives il y a quelques années et qui cherche à trouver l'équilibre entre créativité et fonctionnalité.",
        sectionTwoTitle: "Objectifs",
        sectionTwoText:
          "Consolider mes compétences en développement web moderne, rejoindre des projets intéressants et continuer à progresser sur l'architecture, la performance, l'accessibilité et la qualité des interfaces.",
        sectionThreeTitle: "Parcours",
        sectionThreeText:
          "Le portfolio est structuré pour être utilisé pendant des candidatures ou entretiens : projets détaillés, difficultés rencontrées, technologies utilisées, résultats obtenus et liens vers les réalisations. Les textes peuvent être personnalisés dans lib/content.ts."
      },
      contact: {
        title: "Contact",
        eyebrow: "Contact",
        heading: "Échanger autour d'un projet, stage ou entretien.",
        description:
          "Le formulaire est prêt côté interface. Il peut être connecté ensuite à Formspree, Resend, une route API Next.js ou un service équivalent.",
        linksTitle: "Liens directs",
        form: { name: "Nom", email: "Email", message: "Message", submit: "Envoyer" }
      },
      cv: {
        title: "CV",
        eyebrow: "CV",
        heading: "CV consultable et téléchargeable.",
        description: "Mon cv le plus récent.",
        titleCard: "Curriculum vitae",
        body: "Le bouton pointe vers le fichier attendu : {path}.",
        download: "Télécharger",
        preview: "Aperçu du CV"
      },
      education: {
        title: "Formation",
        eyebrow: "Formation",
        heading: "Diplômes, apprentissages et progression.",
        description: "Une page dédiée au parcours scolaire, aux modules techniques et aux certifications.",
        moduleTitle: "Modules clés",
        skillsTitle: "Compétences travaillées",
        firstTitle: "BUT MMI - Spécialité développement web",
        firstText: "Développement web, bases de données, gestion de projet, Git et mise en production d'applications.",
        secondText: "Interfaces responsive, API, SQL, sécurité de base, accessibilité, documentation et présentation de projet."
      },
      experience: {
        title: "Expériences",
        eyebrow: "Expériences",
        heading: "Parcours professionnel et projets marquants.",
        description: "Une timeline pour présenter les stages, missions, responsabilités et résultats."
      },
      skills: {
        title: "Compétences",
        eyebrow: "Compétences",
        heading: "Une vue claire des technologies maîtrisées.",
        description: "Les compétences sont organisées par familles et reliées aux projets qui les utilisent.",
        projectsTitle: "Compétences reliées aux projets"
      },
      projects: {
        title: "Projets",
        eyebrow: "Réalisations",
        heading: "Mes projets, classés par domaine et enrichis avec mes étoiles GitHub.",
        description:
          "La page sépare les projets web, audio-visuels et graphiques, puis rassemble les dépôts GitHub publics que tu as marqués d'une étoile.",
        starredTitle: "Étoiles GitHub",
        inspirationTitle: "Inspirations GitHub",
        inspirationBody: "Dépôts étoilés hors de ton espace personnel.",
        categories: {
          web: "Web",
          audiovisuel: "Audio-visuel",
          graphique: "Graphique"
        },
        categoryDescriptions: {
          web: "Interfaces, applications et prototypes orientés produit.",
          audiovisuel: "Jeux, animation, image et expériences multimédia.",
          graphique: "Créations visuelles, direction artistique et composition."
        }
      }
    }
  },
  en: {
    profile: enProfile,
    navigation: [
      { href: "/about", label: "About", icon: icons.UserRound },
      { href: "/projects", label: "Projects", icon: icons.PanelsTopLeft },
      { href: "/skills", label: "Skills", icon: icons.Code2 },
      { href: "/experience", label: "Experience", icon: icons.BriefcaseBusiness },
      { href: "/education", label: "Education", icon: icons.BookOpen },
      { href: "/cv", label: "CV", icon: icons.Download },
      { href: "/contact", label: "Contact", icon: icons.Mail }
    ],
    bentoItems: enBentoItems,
    projects: enProjects,
    skillGroups: enSkillGroups,
    timeline: enTimeline,
    pages: {
      home: {
        title: "Developer portfolio - Interactive Bento",
        description:
          "An interactive Bento Grid portfolio to present projects, skills, experience, education, CV and contact."
      },
      about: {
        title: "About",
        eyebrow: "Profile",
        heading: "A developer discovering the world.",
        description:
          "This page is an editable base for presenting background, working methods and professional goals.",
        sectionOneTitle: "Who am I?",
        sectionOneText:
          "I am {name}, a web developer who began building interactive web applications a few years ago and is looking for the balance between creativity and functionality.",
        sectionTwoTitle: "Goals",
        sectionTwoText:
          "Strengthen my modern web development skills, join demanding projects and keep improving architecture, performance, accessibility and interface quality.",
        sectionThreeTitle: "Background",
        sectionThreeText:
          "The portfolio is structured to be used during applications or interviews: detailed projects, challenges, technologies, outcomes and links to the work. The texts can be customized in lib/content.ts."
      },
      contact: {
        title: "Contact",
        eyebrow: "Contact",
        heading: "Talk about a project, internship or interview.",
        description:
          "The form is ready on the UI side. It can later be connected to Formspree, Resend, a Next.js API route or an equivalent service.",
        linksTitle: "Direct links",
        form: { name: "Name", email: "Email", message: "Message", submit: "Send" }
      },
      cv: {
        title: "CV",
        eyebrow: "CV",
        heading: "View and download the CV.",
        description: "My most recent CV.",
        titleCard: "Curriculum vitae",
        body: "The button points to the expected file: {path}.",
        download: "Download",
        preview: "CV preview"
      },
      education: {
        title: "Education",
        eyebrow: "Education",
        heading: "Diplomas, learning and progression.",
        description: "A page dedicated to academic background, technical modules and certifications.",
        moduleTitle: "Key modules",
        skillsTitle: "Skills practiced",
        firstTitle: "Bachelor's degree in Multimedia and Internet Professions",
        firstText: "Web development, databases, project management, Git and deployment of applications.",
        secondText: "Responsive interfaces, APIs, SQL, basic security, accessibility, documentation and project presentation."
      },
      experience: {
        title: "Experience",
        eyebrow: "Experience",
        heading: "Professional background and notable projects.",
        description: "A timeline for internships, tasks, responsibilities and outcomes."
      },
      skills: {
        title: "Skills",
        eyebrow: "Skills",
        heading: "A clear view of the technologies I use.",
        description: "Skills are grouped by families and linked to the projects that use them.",
        projectsTitle: "Skills linked to projects"
      },
      projects: {
        title: "Projects",
        eyebrow: "Work",
        heading: "My projects, organized by domain and enriched with my GitHub stars.",
        description:
          "The page separates web, audiovisual and graphic work, then highlights the public GitHub repositories you have starred.",
        starredTitle: "GitHub stars",
        inspirationTitle: "GitHub inspirations",
        inspirationBody: "Starred repositories outside your personal space.",
        categories: {
          web: "Web",
          audiovisuel: "Audiovisual",
          graphique: "Graphic"
        },
        categoryDescriptions: {
          web: "Interfaces, applications and product-oriented prototypes.",
          audiovisuel: "Games, animation, image and multimedia experiences.",
          graphique: "Visual creation, art direction and composition."
        }
      }
    }
  }
} as const;

export function getSiteContent(locale: Locale) {
  return siteContent[locale];
}

