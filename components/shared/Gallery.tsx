"use client";

import { useState } from "react";
import type { GalleryImage } from "@/types/gallery";
import { GalleryItem } from "./GalleryItem";
import { Lightbox } from "./Lightbox";
import { GALLERY_PLACEHOLDER_CAPTION } from "@/lib/config/copy";

interface GalleryProps {
  images: GalleryImage[];
  /** One of the presets below — keep literal Tailwind class strings so JIT can find them. */
  columnPreset?: "default" | "wide";
}

// Full, literal class strings only — Tailwind's compiler scans source text
// for complete utility names, so these can't be built from interpolated
// pieces (e.g. `columns-${n}`) at runtime.
const COLUMN_PRESETS: Record<NonNullable<GalleryProps["columnPreset"]>, string> = {
  default: "columns-2 md:columns-3 lg:columns-4",
  wide: "columns-1 md:columns-2 lg:columns-3",
};

export function Gallery({ images, columnPreset = "default" }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const hasRealPhotos = images.some((img) => img.src);

  return (
    <div>
      {!hasRealPhotos && (
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-charcoal-light/70">
          {GALLERY_PLACEHOLDER_CAPTION}
        </p>
      )}
      <div className={`${COLUMN_PRESETS[columnPreset]} gap-4 space-y-4`}>
        {images.map((image, index) => (
          <div key={image.id} className="break-inside-avoid">
            <GalleryItem image={image} onOpen={() => setSelectedIndex(index)} />
          </div>
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
