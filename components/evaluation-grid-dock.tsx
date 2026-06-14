"use client";

import Image from "next/image";
import { motion, useDragControls } from "framer-motion";
import {
  ChevronDown,
  Expand,
  FileText,
  GripVertical,
  Minus,
  Plus,
  Radio,
  ScanSearch,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type EvaluationGridDockProps = {
  title: string;
  subtitle: string;
  triggerLabel: string;
  emptyState: string;
  mediaSrc?: string;
  mediaType?: "image" | "pdf";
};

export function EvaluationGridDock({
  title,
  subtitle,
  triggerLabel,
  emptyState,
  mediaSrc,
  mediaType = "image"
}: EvaluationGridDockProps) {
  const panelRef = useRef<HTMLElement | null>(null);
  const dragControls = useDragControls();
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);

  async function closeDock() {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }

    setOpen(false);
    setZoom(1);
  }

  useEffect(() => {
    const syncFullscreen = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
          return;
        }

        closeDock().catch(() => {});
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleFullscreen = async () => {
    const panel = panelRef.current;
    if (!panel) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
      return;
    }

    await panel.requestFullscreen().catch(() => {});
  };

  const zoomOut = () => setZoom((value) => Math.max(0.75, Number((value - 0.15).toFixed(2))));
  const zoomIn = () => setZoom((value) => Math.min(2.5, Number((value + 0.15).toFixed(2))));
  const resetZoom = () => setZoom(1);

  const previewTransform = {
    transform: `scale(${zoom})`,
    transformOrigin: "top center"
  } as const;

  const previewFrame = mediaSrc ? (
    mediaType === "pdf" ? (
      <iframe
        title={title}
        src={mediaSrc}
        className="h-[72vh] w-full rounded-lg border border-line/25 bg-paper"
      />
    ) : (
      <Image
        src={mediaSrc}
        alt={title}
        width={1600}
        height={1200}
        className="block h-auto max-w-none rounded-lg border border-line/25 bg-paper shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
      />
    )
  ) : (
    <div className="grid min-h-[18rem] place-items-center rounded-lg border border-dashed border-line/35 bg-navy/55 p-6 text-center">
      <div className="max-w-sm space-y-3">
        <ScanSearch size={28} className="mx-auto text-gold" />
        <p className="text-sm font-medium text-text">{emptyState}</p>
        <p className="text-sm leading-6 text-muted">
          Ajoute ensuite une capture d&apos;écran ou un PDF dans le projet, puis renseigne son chemin dans la page.
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!open ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen(true)}
          className="relative grid h-12 w-12 place-items-center rounded-full border border-line/30 bg-navy/90 text-text shadow-glow backdrop-blur-xl"
          aria-label={triggerLabel}
          title={triggerLabel}
        >
          <span className="absolute inset-0 rounded-full border border-rose/25" />
          <Radio size={18} />
        </motion.button>
      ) : (
        <motion.aside
          ref={panelRef}
          drag
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          whileDrag={{ scale: 1.01 }}
          className={`relative isolate w-[min(38rem,calc(100vw-1rem))] overflow-hidden rounded-lg border border-line/30 bg-navy/92 p-3 pt-10 shadow-glow backdrop-blur-xl ${
            fullscreen ? "h-full w-full rounded-none border-0" : ""
          }`}
        >
          <button
            type="button"
            className="focus-ring absolute left-2 top-2 grid h-8 w-8 place-items-center rounded-md border border-line/30 text-muted"
            onPointerDown={(event) => dragControls.start(event)}
            aria-label="Déplacer la grille"
            title="Déplacer"
          >
            <GripVertical size={16} />
          </button>

          <div className="relative z-10 flex flex-wrap items-center gap-3 pr-2">
            <span className="relative grid h-10 w-10 place-items-center rounded-md bg-gold/[0.16] text-gold">
              <FileText size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-text">{title}</p>
              <p className="truncate text-xs text-muted">{subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-line/30 text-muted"
                onClick={zoomOut}
                aria-label="Réduire le zoom"
                title="Zoom arrière"
              >
                <Minus size={16} />
              </button>
              <button
                type="button"
                className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-line/30 text-muted"
                onClick={resetZoom}
                aria-label="Réinitialiser le zoom"
                title="Réinitialiser"
              >
                <span className="text-[11px] font-semibold">1x</span>
              </button>
              <button
                type="button"
                className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-line/30 text-muted"
                onClick={zoomIn}
                aria-label="Augmenter le zoom"
                title="Zoom avant"
              >
                <Plus size={16} />
              </button>
              <button
                type="button"
                className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-line/30 text-muted"
                onClick={toggleFullscreen}
                aria-label={fullscreen ? "Quitter le plein écran" : "Plein écran"}
                title={fullscreen ? "Quitter le plein écran" : "Plein écran"}
              >
                <Expand size={16} />
              </button>
              <button
                type="button"
                className="focus-ring grid h-9 w-9 place-items-center rounded-md bg-gold text-ink"
                onClick={closeDock}
                aria-label="Réduire la grille"
                title="Réduire"
              >
                <ChevronDown size={17} />
              </button>
            </div>
          </div>

          <div className="relative z-10 mt-3 max-h-[calc(100vh-8rem)] overflow-auto rounded-lg border border-line/20 bg-paper/70 p-3">
            <div className="flex justify-center">
              <div className="w-full" style={previewTransform}>
                {previewFrame}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="focus-ring absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-md border border-line/30 text-muted"
            onClick={closeDock}
            aria-label="Fermer la grille"
            title="Fermer"
          >
            <X size={16} />
          </button>
        </motion.aside>
      )}
    </div>
  );
}
