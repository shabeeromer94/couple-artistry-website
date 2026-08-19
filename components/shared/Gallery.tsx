"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/types/gallery";
import { GalleryItem } from "./GalleryItem";
import { Lightbox } from "./Lightbox";
import { GALLERY_PLACEHOLDER_CAPTION } from "@/lib/config/copy";
import { cn } from "@/lib/utils/cn";

interface GalleryProps {
  images: GalleryImage[];
}

// A horizontally-scrolling filmstrip rather than a tall stacked grid — every
// item is the same compact 3:4 frame (cropped face-first, not center), so
// the whole portfolio stays within one tidy band, several tiles are visible
// at once even on a phone, and people scroll sideways to browse instead of
// pulling the page down through a wall of images.
export function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const hasRealPhotos = images.some((img) => img.src);

  function updateScrollState() {
    const el = railRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  // Re-check whenever the image set changes (e.g. a different gallery
  // category is opened) — a freshly-mounted rail starts scrolled to 0.
  useEffect(() => {
    updateScrollState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  function scrollByPage(direction: 1 | -1) {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <div>
      {!hasRealPhotos && (
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-charcoal-light/70">
          {GALLERY_PLACEHOLDER_CAPTION}
        </p>
      )}

      {images.length > 1 && (
        <div className="mb-4 flex items-center justify-end gap-3">
          <span className="mr-auto text-xs uppercase tracking-[0.2em] text-charcoal-light/70">
            Scroll or use the arrows to see more
          </span>
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll gallery left"
            className={cn(
              "flex h-10 w-10 items-center justify-center border border-charcoal/15 font-display text-lg text-charcoal transition-colors duration-300",
              canScrollLeft ? "hover:border-wine hover:text-wine" : "cursor-default opacity-25"
            )}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={!canScrollRight}
            aria-label="Scroll gallery right"
            className={cn(
              "flex h-10 w-10 items-center justify-center border border-charcoal/15 font-display text-lg text-charcoal transition-colors duration-300",
              canScrollRight ? "hover:border-wine hover:text-wine" : "cursor-default opacity-25"
            )}
          >
            →
          </button>
        </div>
      )}

      <div
        ref={railRef}
        onScroll={updateScrollState}
        className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-2 sm:gap-4"
      >
        {images.map((image, index) => (
          <GalleryItem
            key={image.id}
            image={image}
            onOpen={() => setSelectedIndex(index)}
            aspectRatio="portrait"
            className="h-48 shrink-0 snap-start sm:h-64 md:h-80"
          />
        ))}
      </div>
      <Lightbox
        images={images}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={setSelectedIndex}
      />
    </div>
  );
}
