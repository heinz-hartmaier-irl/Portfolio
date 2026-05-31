import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, Star } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { classifyStarredRepo, fetchStarredRepositories, GITHUB_USERNAME } from "@/lib/github-stars";
import { siteContent } from "@/lib/site-content";
import { getServerLocale } from "@/lib/server-locale";
import {
  projectCategoryOrder,
  type ProjectCategory
} from "@/lib/project-categories";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects",
  description: "Catalog of portfolio projects, grouped by domain and enriched with public GitHub stars."
};

function EmptyState({ label, locale }: { label: string; locale: "fr" | "en" }) {
  return (
    <div className="glass-border rounded-lg border-dashed p-5 text-sm text-muted">
      {locale === "fr"
        ? `Aucun projet n’est actuellement listé dans ${label.toLowerCase()}.`
        : `No project is currently listed in ${label.toLowerCase()}.`}
    </div>
  );
}

function LocalProjectCard({
  project,
  viewLabel,
  portfolioLabel,
  locale
}: {
  project: (typeof siteContent.fr.projects)[number];
  viewLabel: string;
  portfolioLabel: string;
  locale: "fr" | "en";
}) {
  return (
    <article className="glass-border overflow-hidden rounded-lg">
      <div className="relative h-44 border-b border-line/30">
        <Image src={project.image} alt="" fill className="object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-text">{project.title}</h3>
          <span className="rounded-md bg-gold/[0.14] px-2 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
            {portfolioLabel}
          </span>
        </div>
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
            {viewLabel}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function StarredProjectCard({
  project,
  starredLabel,
  openLabel,
  locale
}: {
  project: Awaited<ReturnType<typeof fetchStarredRepositories>>[number];
  starredLabel: string;
  openLabel: string;
  locale: "fr" | "en";
}) {
  return (
    <article className="glass-border flex h-full flex-col rounded-lg p-5">
      <div className="flex items-start gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-line/30 bg-navy/70">
          <Image src={project.owner.avatar_url} alt="" fill className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-lg font-semibold text-text">{project.name}</h3>
            <span className="rounded-md bg-rose/[0.14] px-2 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-rose">
              {starredLabel}
            </span>
          </div>
          <p className="truncate text-xs text-muted">{project.full_name}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted">{project.description || project.language || "GitHub repository"}</p>
      <p className="mt-4 text-sm leading-6 text-muted">
        {locale === "fr" ? "Dépôt GitHub public." : "Public GitHub repository."}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(project.topics ?? []).slice(0, 3).map((tech) => (
          <span key={tech} className="rounded-md bg-navy/70 px-2 py-1 text-xs text-muted">
            {tech}
          </span>
        ))}
        {project.language ? (
          <span className="rounded-md bg-navy/70 px-2 py-1 text-xs text-muted">{project.language}</span>
        ) : null}
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 pt-5">
        <span className="inline-flex items-center gap-2 rounded-md bg-gold/[0.12] px-3 py-2 text-xs font-medium text-gold">
          <Star size={14} />
          GitHub Star
        </span>
        <a
          href={project.html_url}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-medium text-orange hover:text-gold"
        >
          {openLabel}
        </a>
      </div>
    </article>
  );
}

export default async function ProjectsPage() {
  const locale = await getServerLocale();
  const content = siteContent[locale];
  const starredRepos = await fetchStarredRepositories();

  const localByCategory = Object.fromEntries(
    projectCategoryOrder.map((category) => [
      category,
      content.projects.filter((project) => project.category === category)
    ])
  ) as Record<ProjectCategory, (typeof content.projects)[number][]>;

  const starredWebRepos = starredRepos.filter(
    (repo) => repo.owner.login.toLowerCase() === GITHUB_USERNAME && classifyStarredRepo(repo) === "web"
  );

  return (
    <PageShell
      eyebrow={content.pages.projects.eyebrow}
      title={content.pages.projects.heading}
      description={content.pages.projects.description}
    >
      <div className="space-y-10">
        {projectCategoryOrder.map((category) => (
          <section key={category} className="space-y-5">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                  {content.pages.projects.categories[category]}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-text">
                  {content.pages.projects.categoryDescriptions[category]}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-muted">
                {locale === "fr"
                  ? `${localByCategory[category].length} projet${localByCategory[category].length > 1 ? "s" : ""} personnel${localByCategory[category].length > 1 ? "s" : ""}.`
                  : `${localByCategory[category].length} personal project${localByCategory[category].length > 1 ? "s" : ""}.`}
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {localByCategory[category].length ? (
                localByCategory[category].map((project) => (
                  <LocalProjectCard
                    key={project.slug}
                    project={project}
                    viewLabel={locale === "fr" ? "Voir le projet" : "View project"}
                    portfolioLabel="Portfolio"
                    locale={locale}
                  />
                ))
              ) : (
                <EmptyState label={content.pages.projects.categories[category]} locale={locale} />
              )}
            </div>
          </section>
        ))}

        <section className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              {content.pages.projects.starredTitle}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text">
              {locale === "fr" ? "Repos GitHub personnels mis en favori." : "Personal GitHub repositories you starred."}
            </h2>
          </div>
          {starredWebRepos.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {starredWebRepos.map((project) => (
                <StarredProjectCard
                  key={project.full_name}
                  project={project}
                  starredLabel={locale === "fr" ? "Étoilé" : "Starred"}
                  openLabel={locale === "fr" ? "Ouvrir" : "Open"}
                  locale={locale}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              label={locale === "fr" ? "tes étoiles web personnelles" : "your personal web stars"}
              locale={locale}
            />
          )}
        </section>
      </div>
    </PageShell>
  );
}
