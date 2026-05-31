export type ProjectCategory = "web" | "audiovisuel" | "graphique";

export const projectCategoryOrder: ProjectCategory[] = ["web", "audiovisuel", "graphique"];

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  web: "Web",
  audiovisuel: "Audio-visuel",
  graphique: "Graphique"
};

export const projectCategoryDescriptions: Record<ProjectCategory, string> = {
  web: "Interfaces, applications et prototypes orientés produit.",
  audiovisuel: "Jeux, animation, image et expériences multimédia.",
  graphique: "Créations visuelles, direction artistique et composition."
};
