"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ExternalLink,
  Filter,
  Film,
  Image as ImageIcon,
  Palette,
  PlaySquare,
  Clapperboard,
  Share2,
  Sparkles
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import {
  formatCreationCategory,
  type CreationCategory,
  type CreationIconKey,
  type CreationItem
} from "@/lib/creations";

type Locale = "fr" | "en";
type FilterValue = "all" | CreationCategory;

const accentClasses = {
  rose: "border-rose/30 bg-rose/[0.14] text-rose",
  orange: "border-orange/30 bg-orange/[0.14] text-orange",
  gold: "border-gold/40 bg-gold/[0.16] text-gold"
};

const previewSizes = {
  sm: "md:col-span-1 md:row-span-1",
  md: "md:col-span-2 md:row-span-1",
  wide: "md:col-span-2 md:row-span-1",
  lg: "md:col-span-2 md:row-span-2"
} as const;

const creationCategoryOrder: CreationCategory[] = ["graphique", "audiovisuel", "reseaux"];

const iconMap: Record<CreationIconKey, LucideIcon> = {
  palette: Palette,
  sparkles: Sparkles,
  image: ImageIcon,
  playSquare: PlaySquare,
  film: Film,
  clapperboard: Clapperboard,
  share2: Share2
};

function pickHeadline(locale: Locale) {
  return locale === "fr"
    ? "CrÃ©ations graphiques, audio-visuelles et diffusions publiques."
    : "Graphic work, audiovisual pieces and public releases.";
}

function gradientFromTitle(title: string) {
  const normalized = title.length % 3;
  if (normalized === 0) return "linear-gradient(135deg, #0f172a, #f7c46b, #c85c8e)";
  if (normalized === 1) return "linear-gradient(135deg, #111827, #f08a5d, #f7c46b)";
  return "linear-gradient(135deg, #1e2a3a, #8e6cff, #ffb347)";
}

function categoryTone(category: CreationCategory) {
  if (category === "graphique") return "text-gold";
  if (category === "audiovisuel") return "text-orange";
  return "text-rose";
}

function FilterButton({
  active,
  label,
  onClick,
  count
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
        active ? "border-gold bg-gold text-ink shadow-glow" : "border-line/30 bg-navy/70 text-muted hover:border-orange/40 hover:text-text"
      }`}
    >
      <Filter size={14} />
      <span>{label}</span>
      <span className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-ink/15" : "bg-navy/90 text-muted"}`}>{count}</span>
    </button>
  );
}

function CreationBentoCard({ item }: { item: CreationItem }) {
  const Icon = iconMap[item.iconKey];
  const external = item.kind === "external";

  return (
    <article
      className={`glass-border relative overflow-hidden rounded-lg border border-line/30 p-5 shadow-glow ${previewSizes[item.size]}`}
    >
      <div className="absolute inset-0 opacity-90" style={{ backgroundImage: gradientFromTitle(item.title) }} aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_42%),linear-gradient(180deg,transparent,rgba(15,23,42,0.56))]" />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <span className={`grid h-11 w-11 place-items-center rounded-md border ${accentClasses[item.accent]}`}>
            <Icon size={20} />
          </span>
          <span className="rounded-md border border-white/15 bg-ink/25 px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-white/90">
            {item.format}
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            {external ? "RÃ©seau" : item.category === "graphique" ? "Studio" : "VidÃ©o"}
          </p>
          <h2 className="mt-2 max-w-xs text-2xl font-semibold text-white drop-shadow-[0_2px_10px_rgba(15,23,42,0.35)]">
            {item.title}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/85">{item.summary}</p>
        </div>
      </div>
    </article>
  );
}

function CreationEditorialCard({
  item,
  locale
}: {
  item: CreationItem;
  locale: Locale;
}) {
  const Icon = iconMap[item.iconKey];
  const isExternal = item.kind === "external" && item.href;

  return (
    <article className="group glass-border flex h-full flex-col overflow-hidden rounded-lg border border-line/30 bg-navy/60 p-5 shadow-glow transition hover:-translate-y-1 hover:border-orange/40">
      <div className="flex items-start justify-between gap-3">
        <div className={`grid h-12 w-12 place-items-center rounded-md border ${accentClasses[item.accent]}`}>
          <Icon size={21} />
        </div>
        <div className="text-right">
          <div className="rounded-md bg-navy/80 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">
            {item.format}
          </div>
          <div className={`mt-2 text-xs font-semibold uppercase tracking-[0.16em] ${categoryTone(item.category)}`}>
            {formatCreationCategory(item.category, locale)}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold text-text">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
      </div>

      <div className="mt-5 grid gap-3 rounded-lg border border-line/20 bg-ink/10 p-4">
        <div className="flex items-center justify-between gap-3 text-xs text-muted">
          <span>{locale === "fr" ? "Source" : "Source"}</span>
          <span className="truncate text-right">{item.source}</span>
        </div>
        <div className="flex items-center justify-between gap-3 text-xs text-muted">
          <span>{locale === "fr" ? "Format" : "Format"}</span>
          <span>{item.kind === "external" ? (locale === "fr" ? "Lien externe" : "External link") : item.kind.toUpperCase()}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.kind === "external" ? (
          <span className="rounded-md bg-rose/[0.14] px-2 py-1 text-xs text-rose">
            {locale === "fr" ? "Projet publié" : "Published work"}
          </span>
        ) : (
          <span className="rounded-md bg-gold/[0.12] px-2 py-1 text-xs text-gold">
            {locale === "fr" ? "Fichier local" : "Local file"}
          </span>
        )}
        {item.kind === "document" ? (
          <span className="rounded-md bg-navy/80 px-2 py-1 text-xs text-muted">PDF</span>
        ) : null}
        {item.kind === "video" ? (
          <span className="rounded-md bg-navy/80 px-2 py-1 text-xs text-muted">MP4</span>
        ) : null}
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 pt-5">
        <span className="inline-flex items-center gap-2 rounded-md bg-gold/[0.12] px-3 py-2 text-xs font-medium text-gold">
          {item.kind === "external" ? <Share2 size={14} /> : <PlaySquare size={14} />}
          {item.kind === "external"
            ? locale === "fr"
              ? "Diffusion publique"
              : "Public release"
            : locale === "fr"
              ? "Consultation locale"
              : "Local preview"}
        </span>
        {isExternal ? (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-medium text-orange transition hover:text-gold"
          >
            {locale === "fr" ? "Ouvrir" : "Open"}
            <ExternalLink size={16} />
          </a>
        ) : (
          <span className="text-xs text-muted">
            {locale === "fr" ? "Fichier présent dans le dossier `lib/creation`." : "File stored in `lib/creation`."}
          </span>
        )}
      </div>
    </article>
  );
}

function SectionHeading({
  title,
  description,
  count,
  locale
}: {
  title: string;
  description: string;
  count: number;
  locale: Locale;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
          {locale === "fr" ? "Catalogue" : "Catalogue"}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-text">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
      </div>
      <span className="inline-flex items-center gap-2 rounded-md bg-gold/[0.12] px-3 py-2 text-xs font-medium text-gold">
        <Palette size={14} />
        {count} {locale === "fr" ? "éléments" : "items"}
      </span>
    </div>
  );
}

function SectionNote({ locale }: { locale: Locale }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-line/20 bg-ink/10 p-4 text-sm leading-6 text-muted">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-gold/[0.12] text-gold">
        <Filter size={16} />
      </div>
      <p>
        {locale === "fr"
          ? "Les filtres servent à isoler rapidement une famille de contenus. Le mode 'Tous' garde le rendu éditorial complet."
          : "Filters help isolate one content family quickly. The 'All' mode keeps the full editorial layout."}
      </p>
    </div>
  );
}

export function CreationsGallery({
  locale,
  creations,
  featuredCreations
}: {
  locale: Locale;
  creations: CreationItem[];
  featuredCreations: CreationItem[];
}) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const counts = useMemo(
    () =>
      creationCategoryOrder.reduce(
        (acc, category) => {
          acc[category] = creations.filter((item) => item.category === category).length;
          return acc;
        },
        {} as Record<CreationCategory, number>
      ),
    [creations]
  );

  const visibleCategories = activeFilter === "all" ? creationCategoryOrder : [activeFilter];
  const filteredByCategory = visibleCategories.reduce(
    (acc, category) => {
      acc[category] = creations.filter((item) => item.category === category);
      return acc;
    },
    {} as Record<CreationCategory, CreationItem[]>
  );

  return (
    <PageShell eyebrow={locale === "fr" ? "Créations" : "Creative work"} title={locale === "fr" ? "Créations" : "Creations"} description={pickHeadline(locale)}>
      <div className="space-y-10">
        <SectionCard className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(247,196,107,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(200,92,142,0.12),transparent_30%)]" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {locale === "fr" ? "Vue d’ensemble" : "Overview"}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-text sm:text-4xl">
                {locale === "fr"
                  ? "Un espace unique pour les créations, les vidéos et les contenus publiés."
                  : "One place for creations, videos and published work."}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                {locale === "fr"
                  ? "Le haut de page mélange quelques éléments au hasard pour garder une entrée vivante, puis les filtres permettent de passer d’une famille de contenu à l’autre sans perdre le style éditorial."
                  : "The top section mixes a few items at random to keep the entrance lively, then the filters let you switch between content families without losing the editorial feel."}
              </p>
            </div>
            <Link
              href="/projects"
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-orange px-4 py-2 text-sm font-medium text-ink transition hover:bg-gold"
            >
              <ArrowRight size={16} />
              {locale === "fr" ? "Voir les projets" : "View projects"}
            </Link>
          </div>
        </SectionCard>

        <section className="grid gap-4 md:grid-cols-4 md:auto-rows-[11rem]">
          {featuredCreations.map((item) => (
            <CreationBentoCard key={item.slug} item={item} />
          ))}
        </section>

        <SectionCard>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeading
              title={
                locale === "fr"
                  ? "Filtrer par famille de contenu"
                  : "Filter by content family"
              }
              description={
                locale === "fr"
                  ? "Les trois catégories servent à garder les créations bien séparées: graphique, audio-visuel et réseaux."
                  : "The three categories keep the content clearly separated: graphic, audiovisual and social."
              }
              count={creations.length}
              locale={locale}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <FilterButton
              active={activeFilter === "all"}
              label={locale === "fr" ? "Tous" : "All"}
              count={creations.length}
              onClick={() => setActiveFilter("all")}
            />
            {creationCategoryOrder.map((category) => (
              <FilterButton
                key={category}
                active={activeFilter === category}
                label={formatCreationCategory(category, locale)}
                count={counts[category]}
                onClick={() => setActiveFilter(category)}
              />
            ))}
          </div>

          <div className="mt-6">
            <SectionNote locale={locale} />
          </div>
        </SectionCard>

        {visibleCategories.map((category) => (
          <SectionCard key={category}>
            <SectionHeading
              title={formatCreationCategory(category, locale)}
              description={
                category === "graphique"
                  ? locale === "fr"
                    ? "Images, PDFs et compositions graphiques locales."
                    : "Images, PDFs and local graphic compositions."
                  : category === "audiovisuel"
                    ? locale === "fr"
                      ? "Vidéos et séquences audio-visuelles."
                      : "Videos and audiovisual pieces."
                    : locale === "fr"
                      ? "Contenus publiés sur YouTube et TikTok."
                      : "Content published on YouTube and TikTok."
              }
              count={filteredByCategory[category].length}
              locale={locale}
            />

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredByCategory[category].map((item) => (
                <CreationEditorialCard key={item.slug} item={item} locale={locale} />
              ))}
            </div>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}
