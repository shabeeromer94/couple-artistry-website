import type { GalleryCategory, GalleryImage } from "@/types/gallery";

// No real photography exists yet. Every entry below is a placeholder
// descriptor — Gallery/GalleryItem render a styled placeholder tile (never
// stock photography) whenever `src` is undefined. Drop real files into
// /public/images/{category}/ and set `src` here once available.

function buildPlaceholders(
  category: GalleryCategory,
  labels: string[],
  aspectRatios: GalleryImage["aspectRatio"][]
): GalleryImage[] {
  return labels.map((label, index) => ({
    id: `${category}-${index + 1}`,
    category,
    alt: `${label} — placeholder, real photography coming soon`,
    placeholderLabel: label,
    aspectRatio: aspectRatios[index % aspectRatios.length],
  }));
}

const ASPECTS: GalleryImage["aspectRatio"][] = ["portrait", "square", "landscape", "portrait"];

export const GALLERY_IMAGES: Record<GalleryCategory, GalleryImage[]> = {
  makeup: buildPlaceholders(
    "makeup",
    [
      "Bridal Look 01",
      "Bridal Look 02",
      "Reception Look 01",
      "Engagement Look 01",
      "Bridal Look 03",
      "Sangeet Look 01",
      "Bridal Look 04",
      "Reception Look 02",
    ],
    ASPECTS
  ),
  "colour-analysis": buildPlaceholders(
    "colour-analysis",
    [
      "Seasonal Palette 01",
      "Consultation Session 01",
      "Colour Draping 01",
      "Seasonal Palette 02",
      "Consultation Session 02",
      "Colour Draping 02",
    ],
    ASPECTS
  ),
  stitching: buildPlaceholders(
    "stitching",
    [
      "Blouse Design 01",
      "Lehenga Customization 01",
      "Blouse Design 02",
      "Skirt Stitching 01",
      "Lehenga Customization 02",
      "Rework Detail 01",
    ],
    ASPECTS
  ),
  about: buildPlaceholders(
    "about",
    ["The Couple 01", "Studio 01", "The Couple 02"],
    ASPECTS
  ),
};

export function getGalleryImages(category: GalleryCategory): GalleryImage[] {
  return GALLERY_IMAGES[category];
}
