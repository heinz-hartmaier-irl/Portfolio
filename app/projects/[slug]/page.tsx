import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { projects } from "@/lib/content";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.slug === params.slug);
  return {
    title: project?.title ?? "Projet",
    description: project?.summary ?? "Détail d'un projet du portfolio."
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) notFound();

  return (
    <PageShell eyebrow="Projet" title={project.title} description={project.description}>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard className="overflow-hidden p-0">
          <div className="relative h-72">
            <Image src={project.image} alt={`Aperçu du projet ${project.title}`} fill className="object-cover" />
          </div>
        </SectionCard>
        <SectionCard>
          <h2 className="text-2xl font-semibold text-text">Technologies</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-md bg-gold/[0.12] px-3 py-2 text-sm text-gold">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.github}
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-navy/70 px-4 py-2 text-sm text-text hover:text-gold"
            >
              <Github size={16} />
              GitHub
            </a>
            <Link
              href={project.demo}
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-orange px-4 py-2 text-sm font-medium text-ink"
            >
              <ExternalLink size={16} />
              Démonstration
            </Link>
          </div>
        </SectionCard>
        <SectionCard>
          <h2 className="text-2xl font-semibold text-text">Difficultés rencontrées</h2>
          <ul className="mt-4 space-y-3 text-muted">
            {project.challenges.map((challenge) => (
              <li key={challenge} className="rounded-md border border-line/30 bg-navy/50 px-3 py-2">
                {challenge}
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard>
          <h2 className="text-2xl font-semibold text-text">Résultats obtenus</h2>
          <ul className="mt-4 space-y-3 text-muted">
            {project.results.map((result) => (
              <li key={result} className="rounded-md border border-line/30 bg-navy/50 px-3 py-2">
                {result}
              </li>
            ))}
          </ul>
        </SectionCard>
        {project.unity ? (
          <SectionCard className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-text">Intégration Unity WebGL</h2>
            <p className="mt-4 leading-7 text-muted">
              Pour intégrer le jeu, exporte la build Unity en WebGL puis place les fichiers dans
              <span className="text-gold"> public/unity/jeu-unity</span>. Tu pourras ensuite
              remplacer ce bloc par le loader Unity généré ou une iframe locale.
            </p>
            <div className="mt-5 grid min-h-64 place-items-center rounded-lg border border-dashed border-orange/[0.45] bg-navy/50 text-center text-muted">
              Zone prête pour la build Unity WebGL
            </div>
          </SectionCard>
        ) : null}
      </div>
    </PageShell>
  );
}
