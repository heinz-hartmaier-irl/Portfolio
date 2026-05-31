"use client";

import { motion } from "framer-motion";
import { Grip, Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteContent } from "@/lib/site-content";
import { useLocale } from "@/lib/use-locale";
import type { BentoItem } from "@/lib/content";

const accentClasses = {
  rose: "text-rose bg-rose/[0.14] border-rose/30",
  orange: "text-orange bg-orange/[0.14] border-orange/30",
  gold: "text-gold bg-gold/[0.16] border-gold/40"
};

const compactLayouts: Array<Record<string, string>> = [
  {
    "/about": "md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-2",
    "/projects": "md:col-start-3 md:col-span-2 md:row-start-1 md:row-span-2",
    "/skills": "md:col-start-1 md:col-span-1 md:row-start-3 md:row-span-1",
    "/experience": "md:col-start-2 md:col-span-2 md:row-start-3 md:row-span-1",
    "/education": "md:col-start-4 md:col-span-1 md:row-start-3 md:row-span-1",
    "/cv": "md:col-start-1 md:col-span-2 md:row-start-4 md:row-span-1",
    "/contact": "md:col-start-3 md:col-span-2 md:row-start-4 md:row-span-1"
  },
  {
    "/projects": "md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-2",
    "/about": "md:col-start-3 md:col-span-2 md:row-start-1 md:row-span-2",
    "/experience": "md:col-start-1 md:col-span-2 md:row-start-3 md:row-span-1",
    "/skills": "md:col-start-3 md:col-span-1 md:row-start-3 md:row-span-1",
    "/education": "md:col-start-4 md:col-span-1 md:row-start-3 md:row-span-1",
    "/contact": "md:col-start-1 md:col-span-2 md:row-start-4 md:row-span-1",
    "/cv": "md:col-start-3 md:col-span-2 md:row-start-4 md:row-span-1"
  },
  {
    "/cv": "md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-1",
    "/contact": "md:col-start-3 md:col-span-2 md:row-start-1 md:row-span-1",
    "/about": "md:col-start-1 md:col-span-2 md:row-start-2 md:row-span-2",
    "/projects": "md:col-start-3 md:col-span-2 md:row-start-2 md:row-span-2",
    "/skills": "md:col-start-1 md:col-span-1 md:row-start-4 md:row-span-1",
    "/experience": "md:col-start-2 md:col-span-2 md:row-start-4 md:row-span-1",
    "/education": "md:col-start-4 md:col-span-1 md:row-start-4 md:row-span-1"
  }
];

function shuffleItems(items: BentoItem[]) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function randomLayout() {
  return compactLayouts[Math.floor(Math.random() * compactLayouts.length)];
}

function swapLayoutAreas(layout: Record<string, string>, sourceHref: string, targetHref: string) {
  if (sourceHref === targetHref) return layout;

  return {
    ...layout,
    [sourceHref]: layout[targetHref],
    [targetHref]: layout[sourceHref]
  };
}

export function BentoGrid() {
  const router = useRouter();
  const locale = useLocale();
  const [items, setItems] = useState(siteContent[locale].bentoItems);
  const [layout, setLayout] = useState(compactLayouts[0]);
  const [editMode, setEditMode] = useState(false);
  const [draggedHref, setDraggedHref] = useState<string | null>(null);
  const [openingHref, setOpeningHref] = useState<string | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const hasSeenBento = window.localStorage.getItem("hasSeenBento");
      if (hasSeenBento) {
        setLayout(randomLayout());
        setItems(shuffleItems(siteContent[locale].bentoItems));
        return;
      }

      window.localStorage.setItem("hasSeenBento", "true");
    });

    return () => cancelAnimationFrame(frame);
  }, [locale]);

  const openCard = (href: string) => {
    if (editMode || openingHref) return;
    setOpeningHref(href);
    window.setTimeout(() => router.push(href), 560);
  };

  const swapCards = (targetHref: string) => {
    if (!draggedHref) return;
    setLayout((current) => swapLayoutAreas(current, draggedHref, targetHref));
    setItems((current) => {
      const next = [...current];
      const sourceIndex = next.findIndex((item) => item.href === draggedHref);
      const targetIndex = next.findIndex((item) => item.href === targetHref);
      if (sourceIndex >= 0 && targetIndex >= 0) {
        [next[sourceIndex], next[targetIndex]] = [next[targetIndex], next[sourceIndex]];
      }
      return next;
    });
    setDraggedHref(null);
  };

  return (
    <section aria-label="Navigation portfolio Bento" className="relative">
      <div className="mb-4 flex justify-end gap-2">
        <LanguageToggle />
        <ThemeToggle />
        <button
          type="button"
          onClick={() => {
            setLayout(randomLayout());
            setItems(shuffleItems(items));
          }}
          className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-line/30 bg-navy/80 text-text shadow-glow backdrop-blur-xl transition hover:text-orange"
          aria-label="Mélanger le bento"
          title="Mélanger"
        >
          <Shuffle size={16} />
        </button>
        <button
          type="button"
          onClick={() => setEditMode((value) => !value)}
          className={`focus-ring grid h-10 w-10 place-items-center rounded-md border shadow-glow backdrop-blur-xl transition ${
            editMode ? "border-gold bg-gold text-ink" : "border-line/30 bg-navy/80 text-text hover:text-gold"
          }`}
          aria-label={editMode ? "Valider le bento" : "Composer le bento"}
          title={editMode ? "Valider" : "Composer"}
        >
          <Grip size={16} />
        </button>
      </div>

      <div
        className={`relative grid grid-cols-1 gap-3 rounded-xl transition duration-300 md:mx-auto md:aspect-square md:w-[min(100%,56rem)] md:grid-cols-4 md:grid-rows-4 ${
          editMode ? "bg-ink/25 p-2 ring-2 ring-gold/40 shadow-glow backdrop-blur-sm" : ""
        }`}
      >
        {editMode ? (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-gold/10 via-orange/10 to-rose/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            aria-hidden="true"
          />
        ) : null}
        {items.map((item, index) => {
          const Icon = item.icon;
          const accent = accentClasses[item.accent];
          const isOpening = openingHref === item.href;
          const itemLayout = layout[item.href];

          return (
            <motion.div
              key={item.href}
              layout
              initial={{ opacity: 0, y: 24, rotateX: -8 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                x: editMode ? [0, -1.5, 1.5, -1, 1, 0] : 0
              }}
              transition={{ delay: index * 0.04, duration: 0.42, type: "spring", stiffness: 180, damping: 22 }}
              className={`min-h-[8.5rem] ${itemLayout}`}
              draggable={editMode}
              onDragStart={() => setDraggedHref(item.href)}
              onDragOver={(event) => {
                if (editMode) event.preventDefault();
              }}
              onDrop={() => swapCards(item.href)}
              onDragEnd={() => setDraggedHref(null)}
            >
              <motion.button
                type="button"
                disabled={Boolean(openingHref)}
                onClick={() => openCard(item.href)}
                animate={isOpening ? { scale: 1.045 } : { scale: 1 }}
                whileHover={editMode || isOpening ? { scale: 1.01 } : { y: -6, scale: 1.015, rotateX: 3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.26, ease: "easeOut" }}
                className={`focus-ring group relative flex h-full w-full overflow-hidden rounded-lg border bg-navy/85 p-5 text-left shadow-glow transition hover:border-orange/60 ${
                  editMode ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                } ${editMode ? "bento-edit-card border-gold/55 ring-1 ring-gold/30" : "border-line/30"}`}
              >
                <motion.div
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose via-orange to-gold opacity-90"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 4.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                />
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gold/[0.12] blur-3xl transition group-hover:bg-orange/[0.18]" />
                </div>
                <motion.div
                  className="absolute inset-x-0 top-0 z-20 h-1/2 origin-top rounded-t-lg border-b border-gold/35 bg-gradient-to-br from-gold/35 via-orange/25 to-rose/25 shadow-glow backdrop-blur-sm"
                  initial={false}
                  animate={
                    isOpening
                      ? { rotateX: 78, y: -6, opacity: 0.72 }
                      : { rotateX: 0, y: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    transformPerspective: 950,
                    transformOrigin: "50% 0%"
                  }}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute inset-3 z-0 rounded-md bg-ink/10"
                  initial={false}
                  animate={isOpening ? { opacity: 1, scale: 0.94 } : { opacity: 0, scale: 1 }}
                  transition={{ duration: 0.24 }}
                  aria-hidden="true"
                />
                <motion.div
                  className="relative z-10 flex h-full w-full flex-col justify-between"
                  initial={false}
                  animate={isOpening ? { y: 6, scale: 0.98, opacity: 0.88 } : { y: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-md border ${accent}`}>
                    <Icon size={21} />
                  </span>
                  <h2 className="text-2xl font-semibold text-text sm:text-3xl">{item.title}</h2>
                </motion.div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
