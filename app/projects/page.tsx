import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { projects } from "@/lib/content";

export const metadata = {
  title: "Projets",
  description: "Liste des projets réalisés avec technologies, résultats et liens."
};

export default function ProjectsPage() {
  return (
    <PageShell
      eyebrow="Réalisations"
      title="Projets présentés comme des études de cas."
      description="Chaque projet met en avant le contexte, les choix techniques, les difficultés et les résultats."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.slug} className="glass-border overflow-hidden rounded-lg">
            <div className="relative h-44 border-b border-line/30">
              <Image src={project.image} alt="" fill className="object-cover" />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold text-text">{project.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="rounded-md bg-navy/70 px-2 py-1 text-xs text-muted">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <a href={project.github} className="focus-ring rounded-md text-muted hover:text-gold" aria-label="GitHub">
                  <Github size={18} />
                </a>
                <Link
                  href={`/projects/${project.slug}`}
                  className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-medium text-orange hover:text-gold"
                >
                  Voir le projet
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
