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
  description: "Catalog of portfolio projects focused on web and audiovisual work, plus public GitHub stars."
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
    <article className="group glass-border relative overflow-visible rounded-lg">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="max-w-[calc(100%-6rem)] text-xl font-semibold text-text">{project.title}</h3>
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
      <div className="pointer-events-none absolute bottom-4 right-4 hidden h-40 w-60 overflow-hidden rounded-lg border border-line/30 bg-navy/90 shadow-[0_20px_50px_rgba(0,0,0,0.35)] opacity-0 transition duration-300 group-hover:opacity-100 group-hover:-translate-y-1 md:block">
        <Image src={project.image} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,0.25))]" />
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
  const visibleCategories = projectCategoryOrder.filter((category) => localByCategory[category].length > 0);

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
        {visibleCategories.map((category) => (
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

        <section className="glass-border rounded-lg border border-line/30 bg-navy/45 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {content.pages.projects.graphicGalleryLabel}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-text">
                {content.pages.projects.graphicGalleryTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                {content.pages.projects.graphicGalleryBody}
              </p>
            </div>
            <Link
              href="/creations-graphiques"
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-orange px-4 py-2 text-sm font-medium text-ink transition hover:bg-gold"
            >
              {locale === "fr" ? "Ouvrir la galerie" : "Open gallery"}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

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
