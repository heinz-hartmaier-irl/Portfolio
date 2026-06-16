import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, FileText, Github } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/lib/site-content";
import { getServerLocale } from "@/lib/server-locale";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return siteContent.fr.projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const locale = await getServerLocale();
  const content = siteContent[locale];
  const project = content.projects.find((item) => item.slug === params.slug);

  if (!project) notFound();

  return (
    <PageShell eyebrow={locale === "fr" ? "Projet" : "Project"} title={project.title} description={project.description}>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard className="overflow-hidden p-0">
          <div className="relative h-72">
            <Image src={project.image} alt="" fill className="object-cover" />
          </div>
        </SectionCard>
        <SectionCard>
          <span className="inline-flex rounded-md bg-gold/[0.12] px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-gold">
            {content.pages.projects.categories[project.category]}
          </span>
          <h2 className="mt-4 text-2xl font-semibold text-text">
            {locale === "fr" ? "Technologies" : "Technologies"}
          </h2>
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
              {locale === "fr" ? "Démonstration" : "Demo"}
            </Link>
          </div>
        </SectionCard>
        <SectionCard>
          <h2 className="text-2xl font-semibold text-text">
            {locale === "fr" ? "Difficultés rencontrées" : "Challenges"}
          </h2>
          <ul className="mt-4 space-y-3 text-muted">
            {project.challenges.map((challenge) => (
              <li key={challenge} className="rounded-md border border-line/30 bg-navy/50 px-3 py-2">
                {challenge}
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard>
          <h2 className="text-2xl font-semibold text-text">
            {locale === "fr" ? "Résultats obtenus" : "Outcomes"}
          </h2>
          <ul className="mt-4 space-y-3 text-muted">
            {project.results.map((result) => (
              <li key={result} className="rounded-md border border-line/30 bg-navy/50 px-3 py-2">
                {result}
              </li>
            ))}
          </ul>
        </SectionCard>
        {project.gallery?.length ? (
          <SectionCard className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-text">
              {locale === "fr" ? "Captures du projet" : "Project screenshots"}
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {project.gallery.map((item) => (
                <div key={item.src} className="glass-border overflow-hidden rounded-lg">
                  <div className="relative aspect-[4/3]">
                    <Image src={item.src} alt={item.alt} fill className="object-cover" />
                  </div>
                  <p className="border-t border-line/20 px-3 py-2 text-sm text-muted">{item.alt}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        ) : null}
        {project.evaluationGrid?.length ? (
          <SectionCard className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-gold/[0.12] text-gold">
                <FileText size={18} />
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-text">
                  {locale === "fr" ? "Grilles d'evaluation" : "Evaluation grids"}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {locale === "fr"
                    ? "Documents integres pour presenter les competences associees au projet."
                    : "Documents included to present the skills connected to the project."}
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {project.evaluationGrid.map((item) => (
                <a
                  key={item.src}
                  href={item.src}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring group glass-border overflow-hidden rounded-lg"
                >
                  <div className="relative aspect-[4/3] bg-paper">
                    <Image src={item.src} alt={item.title} fill className="object-contain p-2 transition group-hover:scale-[1.02]" />
                  </div>
                  <p className="border-t border-line/20 px-3 py-2 text-sm font-medium text-text">{item.title}</p>
                </a>
              ))}
            </div>
          </SectionCard>
        ) : null}
      </div>
    </PageShell>
  );
}
