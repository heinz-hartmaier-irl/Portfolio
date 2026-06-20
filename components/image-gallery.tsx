"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useState, useSyncExternalStore } from "react";

export type GalleryImage = {
  src: string;
  alt: string;
};

type ImageGalleryProps = {
  title: string;
  images: GalleryImage[];
  locale?: "fr" | "en";
};

export function ImageGallery({ title, images, locale = "fr" }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!images.length) return null;

  const selectedImage = selectedIndex === null ? null : images[selectedIndex];

  const open = (index: number) => setSelectedIndex(index);
  const close = () => setSelectedIndex(null);
  const previous = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };
  const next = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  return (
    <>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => open(index)}
            className="focus-ring overflow-hidden rounded-lg border border-line/25 bg-paper/55 text-left transition hover:-translate-y-0.5 hover:border-gold/60"
            aria-label={`${locale === "fr" ? "Ouvrir l'image" : "Open image"} ${index + 1}`}
          >
            <div className="relative aspect-[4/3]">
              <Image src={image.src} alt={image.alt} fill className="object-cover" />
            </div>
            <p className="border-t border-line/20 px-3 py-2 text-sm text-muted">{image.alt}</p>
          </button>
        ))}
      </div>

      {mounted && selectedImage
        ? createPortal(
            <div className="fixed inset-0 z-[200] bg-ink/90 p-4 backdrop-blur-md">
              <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-lg border border-line/30 bg-navy/95 shadow-glow">
                <div className="flex items-center justify-between gap-4 border-b border-line/20 p-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{title}</p>
                    <h3 className="truncate text-lg font-semibold text-text">{selectedImage.alt}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-line/30 text-muted"
                    aria-label={locale === "fr" ? "Fermer" : "Close"}
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="relative min-h-0 flex-1 bg-ink/30">
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <button
                      type="button"
                      onClick={previous}
                      className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-line/30 bg-navy/80 text-text"
                      aria-label={locale === "fr" ? "Image précédente" : "Previous image"}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-line/30 bg-navy/80 text-text"
                      aria-label={locale === "fr" ? "Image suivante" : "Next image"}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="relative h-full min-h-[65vh] p-4">
                    <Image src={selectedImage.src} alt={selectedImage.alt} fill className="object-contain" />
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
