import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ImageGallery } from "@/components/image-gallery";
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
  const supportingDocuments = project?.supportingDocuments ?? project?.evaluationGrid;

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
              {locale === "fr" ? "Galerie du projet" : "Project gallery"}
            </h2>
            <div className="mt-5">
              <ImageGallery
                title={locale === "fr" ? "Captures du projet" : "Project screenshots"}
                images={project.gallery}
                locale={locale}
              />
            </div>
          </SectionCard>
        ) : null}
        {supportingDocuments?.length ? (
          <SectionCard className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-text">
              {locale === "fr" ? "Grille d'évaluation" : "Evaluation grid"}
            </h2>
            <div className="mt-5">
              <ImageGallery
                title={locale === "fr" ? "Grille d'évaluation" : "Evaluation grid"}
                images={(supportingDocuments ?? []).map((item) => ({
                  src: item.src,
                  alt: item.title
                }))}
                locale={locale}
              />
            </div>
          </SectionCard>
        ) : null}
      </div>
    </PageShell>
  );
}
