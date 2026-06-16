"use client";

import Image from "next/image";
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
  Sparkles,
  X
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
    ? "Creations graphiques, audio-visuelles et diffusions publiques."
    : "Graphic work, audiovisual pieces and public releases.";
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

function CreationPreview({ item }: { item: CreationItem }) {
  if (item.kind === "image") {
    return <Image src={item.source} alt={item.title} fill className="object-cover" />;
  }

  if (item.kind === "video") {
    return <video src={item.source} className="h-full w-full object-cover" muted loop playsInline />;
  }

  if (item.kind === "document") {
    return (
      <div className="grid h-full place-items-center bg-ink/25">
        <PlaySquare size={30} className="text-white/85" />
      </div>
    );
  }

  return (
    <div className="grid h-full place-items-center bg-ink/25">
      <Share2 size={30} className="text-white/85" />
    </div>
  );
}

function CreationBentoCard({ item, onOpen }: { item: CreationItem; onOpen: (item: CreationItem) => void }) {
  const Icon = iconMap[item.iconKey];
  const external = item.kind === "external";

  return (
    <button
      type="button"
      onClick={() => (external && item.href ? window.open(item.href, "_blank", "noreferrer") : onOpen(item))}
      className={`focus-ring glass-border relative overflow-hidden rounded-lg border border-line/30 p-5 text-left shadow-glow ${previewSizes[item.size]}`}
    >
      {item.kind !== "external" ? (
        <div className="absolute inset-0 opacity-75">
          <CreationPreview item={item} />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f172a,#f7c46b,#c85c8e)] opacity-90" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.1),rgba(15,23,42,0.72))]" />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <span className={`grid h-11 w-11 place-items-center rounded-md border ${accentClasses[item.accent]}`}>
            <Icon size={20} />
          </span>
          <span className="rounded-md border border-white/15 bg-ink/35 px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-white/90">
            {item.format}
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            {external ? "Reseau" : item.category === "graphique" ? "Studio" : "Video"}
          </p>
          <h2 className="mt-2 max-w-xs text-2xl font-semibold text-white drop-shadow-[0_2px_10px_rgba(15,23,42,0.35)]">
            {item.title}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/85">{item.summary}</p>
        </div>
      </div>
    </button>
  );
}

function CreationEditorialCard({
  item,
  locale,
  onOpen
}: {
  item: CreationItem;
  locale: Locale;
  onOpen: (item: CreationItem) => void;
}) {
  const Icon = iconMap[item.iconKey];
  const isExternal = item.kind === "external" && item.href;

  return (
    <article className="group glass-border flex h-full flex-col overflow-hidden rounded-lg border border-line/30 bg-navy/60 p-5 shadow-glow transition hover:-translate-y-1 hover:border-orange/40">
      {item.kind !== "external" ? (
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="focus-ring relative mb-4 aspect-[16/10] overflow-hidden rounded-lg border border-line/25 bg-paper/50"
        >
          <CreationPreview item={item} />
        </button>
      ) : null}

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
          <span>Source</span>
          <span className="truncate text-right">{item.source}</span>
        </div>
        <div className="flex items-center justify-between gap-3 text-xs text-muted">
          <span>Format</span>
          <span>{item.kind === "external" ? (locale === "fr" ? "Lien externe" : "External link") : item.kind.toUpperCase()}</span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 pt-5">
        <span className="inline-flex items-center gap-2 rounded-md bg-gold/[0.12] px-3 py-2 text-xs font-medium text-gold">
          {item.kind === "external" ? <Share2 size={14} /> : <PlaySquare size={14} />}
          {item.kind === "external"
            ? locale === "fr"
              ? "Diffusion publique"
              : "Public release"
            : locale === "fr"
              ? "Apercu local"
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
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-medium text-orange transition hover:text-gold"
          >
            {locale === "fr" ? "Apercu" : "Preview"}
            <ExternalLink size={16} />
          </button>
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
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Catalogue</p>
        <h2 className="mt-2 text-2xl font-semibold text-text">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
      </div>
      <span className="inline-flex items-center gap-2 rounded-md bg-gold/[0.12] px-3 py-2 text-xs font-medium text-gold">
        <Palette size={14} />
        {count} {locale === "fr" ? "elements" : "items"}
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
          ? "Les filtres isolent rapidement une famille de contenus. Clique sur une case locale pour ouvrir l'apercu."
          : "Filters isolate one content family quickly. Click a local tile to open the preview."}
      </p>
    </div>
  );
}

function CreationModal({
  item,
  locale,
  onClose
}: {
  item: CreationItem | null;
  locale: Locale;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-ink/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true">
      <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-lg border border-line/30 bg-navy/95 shadow-glow">
        <div className="flex items-center justify-between gap-4 border-b border-line/20 p-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{item.format}</p>
            <h2 className="truncate text-xl font-semibold text-text">{item.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-line/30 text-muted"
            aria-label={locale === "fr" ? "Fermer" : "Close"}
          >
            <X size={18} />
          </button>
        </div>
        <div className="min-h-0 flex-1 bg-ink/30 p-4">
          {item.kind === "image" ? (
            <div className="relative h-full min-h-[60vh]">
              <Image src={item.source} alt={item.title} fill className="object-contain" />
            </div>
          ) : item.kind === "video" ? (
            <video src={item.source} className="h-full max-h-[75vh] w-full rounded-lg bg-black object-contain" controls />
          ) : (
            <iframe title={item.title} src={item.source} className="h-full min-h-[75vh] w-full rounded-lg bg-paper" />
          )}
        </div>
      </div>
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
  const [selectedCreation, setSelectedCreation] = useState<CreationItem | null>(null);

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
    <PageShell
      eyebrow={locale === "fr" ? "Creations" : "Creative work"}
      title={locale === "fr" ? "Creations" : "Creations"}
      description={pickHeadline(locale)}
    >
      <div className="space-y-10">
        <SectionCard className="relative overflow-hidden">
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {locale === "fr" ? "Vue d'ensemble" : "Overview"}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-text sm:text-4xl">
                {locale === "fr"
                  ? "Un espace unique pour les creations, les videos et les contenus publies."
                  : "One place for creations, videos and published work."}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                {locale === "fr"
                  ? "Les cases affichent maintenant les fichiers locaux quand ils existent, avec un apercu en popup au clic."
                  : "Tiles now display local files when available, with a click-to-preview modal."}
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
            <CreationBentoCard key={item.slug} item={item} onOpen={setSelectedCreation} />
          ))}
        </section>

        <SectionCard>
          <SectionHeading
            title={locale === "fr" ? "Filtrer par famille de contenu" : "Filter by content family"}
            description={
              locale === "fr"
                ? "Les trois categories gardent les creations separees: graphique, audio-visuel et reseaux."
                : "The three categories keep content separated: graphic, audiovisual and social."
            }
            count={creations.length}
            locale={locale}
          />

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
                      ? "Videos et sequences audio-visuelles."
                      : "Videos and audiovisual pieces."
                    : locale === "fr"
                      ? "Contenus publies sur YouTube et TikTok."
                      : "Content published on YouTube and TikTok."
              }
              count={filteredByCategory[category].length}
              locale={locale}
            />

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredByCategory[category].map((item) => (
                <CreationEditorialCard key={item.slug} item={item} locale={locale} onOpen={setSelectedCreation} />
              ))}
            </div>
          </SectionCard>
        ))}
      </div>
      <CreationModal item={selectedCreation} locale={locale} onClose={() => setSelectedCreation(null)} />
    </PageShell>
  );
}
