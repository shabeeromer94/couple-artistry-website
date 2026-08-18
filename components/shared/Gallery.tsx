"use client";

import { useState } from "react";
import type { GalleryImage } from "@/types/gallery";
import { GalleryItem } from "./GalleryItem";
import { Lightbox } from "./Lightbox";
import { GALLERY_PLACEHOLDER_CAPTION } from "@/lib/config/copy";

interface GalleryProps {
  images: GalleryImage[];
}

// A horizontally-scrolling filmstrip rather than a tall stacked grid — every
// item shares one height (varying by aspect ratio instead), so the whole
// portfolio stays within one compact band and people scroll sideways to
// browse instead of pulling the page down through a wall of images.
export function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const hasRealPhotos = images.some((img) => img.src);

  return (
    <div>
      {!hasRealPhotos && (
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-charcoal-light/70">
          {GALLERY_PLACEHOLDER_CAPTION}
        </p>
      )}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2">
        {images.map((image, index) => (
          <GalleryItem
            key={image.id}
            image={image}
            onOpen={() => setSelectedIndex(index)}
            className="h-64 shrink-0 snap-start sm:h-80 md:h-96"
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
