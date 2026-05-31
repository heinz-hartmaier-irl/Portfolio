import type { ProjectCategory } from "@/lib/project-categories";

export const GITHUB_USERNAME = "heinz-hartmaier-irl";

export type GitHubOwner = {
  login: string;
  avatar_url: string;
  html_url: string;
};

export type GitHubStarredRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  homepage: string | null;
  topics?: string[];
  owner: GitHubOwner;
};

export type CatalogProjectSource = "portfolio" | "github-star";

export type CatalogProject = {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: ProjectCategory;
  source: CatalogProjectSource;
  href: string;
  image?: string;
  imageAlt?: string;
  technologies: string[];
  github?: string;
  demo?: string;
  ownedByProfile?: boolean;
};

const WEB_KEYWORDS = [
  "web",
  "website",
  "frontend",
  "front-end",
  "react",
  "next",
  "html",
  "css",
  "javascript",
  "typescript",
  "api",
  "portfolio",
  "pokedex",
  "gestion"
];

const AUDIOVISUAL_KEYWORDS = [
  "audio",
  "audiovis",
  "video",
  "motion",
  "unity",
  "3d",
  "blender",
  "after effects",
  "premiere",
  "sound",
  "music",
  "montage"
];

const GRAPHIC_KEYWORDS = [
  "graphic",
  "graphique",
  "design",
  "ui",
  "ux",
  "illustration",
  "illustrator",
  "photoshop",
  "logo",
  "brand",
  "visual"
];

function normalize(value: string | null | undefined) {
  return (value ?? "").toLowerCase();
}

function compileSearchSpace(repo: GitHubStarredRepo) {
  return [
    repo.full_name,
    repo.name,
    repo.description ?? "",
    repo.language ?? "",
    ...(repo.topics ?? [])
  ]
    .join(" ")
    .toLowerCase();
}

export function classifyStarredRepo(repo: GitHubStarredRepo): ProjectCategory {
  const searchSpace = compileSearchSpace(repo);

  if (GRAPHIC_KEYWORDS.some((keyword) => searchSpace.includes(keyword))) {
    return "graphique";
  }

  if (AUDIOVISUAL_KEYWORDS.some((keyword) => searchSpace.includes(keyword))) {
    return "audiovisuel";
  }

  if (WEB_KEYWORDS.some((keyword) => searchSpace.includes(keyword))) {
    return "web";
  }

  return repo.language && normalize(repo.language) === "markdown" ? "web" : "web";
}

export function summarizeStarredRepo(repo: GitHubStarredRepo, category: ProjectCategory) {
  if (repo.description) return repo.description;

  switch (category) {
    case "audiovisuel":
      return "Dépôt orienté image, animation ou expérience multimédia.";
    case "graphique":
      return "Création visuelle ou prototype centré sur le rendu graphique.";
    default:
      return "Projet public classé automatiquement dans le pôle web.";
  }
}

export async function fetchStarredRepositories(username = GITHUB_USERNAME) {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/starred?per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-bento"
      },
      cache: "no-store"
    }
  );

  if (!response.ok) return [];

  const payload = (await response.json()) as unknown;
  if (!Array.isArray(payload)) return [];

  return payload as GitHubStarredRepo[];
}

