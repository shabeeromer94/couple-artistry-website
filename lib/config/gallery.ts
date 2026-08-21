import type { GalleryCategory, GalleryCategoryGroup, GalleryImage } from "@/types/gallery";

// Makeup and Colour Analysis now have real photography under
// /public/images/{category}/ — every entry below points at a real file.
// Stitching and About still have none yet, so those stay placeholder
// descriptors; Gallery/GalleryItem render a styled placeholder tile
// (never stock photography) whenever `src` is undefined.

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

// --- Makeup: real photos, grouped into the 3 folders supplied ---

interface RealPhoto {
  file: string;
  aspectRatio: GalleryImage["aspectRatio"];
}

function buildRealGroup(
  category: GalleryCategory,
  groupId: string,
  groupLabel: string,
  folder: string,
  photos: RealPhoto[]
): GalleryCategoryGroup {
  return {
    id: groupId,
    label: groupLabel,
    images: photos.map((photo, index) => ({
      id: `${category}-${groupId}-${index + 1}`,
      category,
      alt: `${groupLabel} ${index + 1}`,
      placeholderLabel: `${groupLabel} ${index + 1}`,
      src: `/images/${category}/${folder}/${photo.file}`,
      aspectRatio: photo.aspectRatio,
      tags: [groupId],
    })),
  };
}

const MAKEUP_BRIDAL_LOOKS = buildRealGroup("makeup", "bridal-looks", "Bridal Looks", "Bridal Looks", [
  { file: "img-1.jpg", aspectRatio: "portrait" },
  { file: "img-2.jpg", aspectRatio: "landscape" },
  { file: "img-3.jpg", aspectRatio: "portrait" },
  { file: "img-4.jpg", aspectRatio: "portrait" },
  { file: "img-5.jpg", aspectRatio: "portrait" },
  { file: "img-6.jpg", aspectRatio: "portrait" },
  { file: "img-7.jpg", aspectRatio: "portrait" },
  { file: "img-8.jpg", aspectRatio: "portrait" },
  { file: "img-9.jpg", aspectRatio: "portrait" },
  { file: "img-10.jpg", aspectRatio: "portrait" },
  { file: "img-11.jpg", aspectRatio: "square" },
  { file: "img-12.jpg", aspectRatio: "landscape" },
  { file: "img-13.jpg", aspectRatio: "portrait" },
]);

const MAKEUP_MAKEUP_AND_HAIR = buildRealGroup("makeup", "makeup-and-hair", "Makeup & Hair", "Makeup and Hair", [
  { file: "img-1.jpg", aspectRatio: "portrait" },
  { file: "img-2.jpg", aspectRatio: "portrait" },
  { file: "img-3.jpg", aspectRatio: "portrait" },
  { file: "img-4.jpg", aspectRatio: "portrait" },
  { file: "img-5.jpg", aspectRatio: "portrait" },
  { file: "img-6.jpg", aspectRatio: "portrait" },
]);

const MAKEUP_BEFORE_AND_AFTER = buildRealGroup("makeup", "before-and-after", "Before & After", "Before and After", [
  { file: "img-1.jpg", aspectRatio: "portrait" },
  { file: "img-2.jpg", aspectRatio: "portrait" },
  { file: "img-3.jpg", aspectRatio: "portrait" },
  { file: "img-4.jpg", aspectRatio: "portrait" },
  { file: "img-5.jpg", aspectRatio: "portrait" },
  { file: "img-6.jpg", aspectRatio: "portrait" },
  { file: "img-7.jpg", aspectRatio: "portrait" },
  { file: "img-8.jpg", aspectRatio: "portrait" },
  { file: "img-9.jpg", aspectRatio: "portrait" },
  { file: "img-10.jpg", aspectRatio: "portrait" },
]);

const MAKEUP_GALLERY_GROUPS: GalleryCategoryGroup[] = [
  MAKEUP_BRIDAL_LOOKS,
  MAKEUP_MAKEUP_AND_HAIR,
  MAKEUP_BEFORE_AND_AFTER,
];

export function getMakeupGalleryGroups(): GalleryCategoryGroup[] {
  return MAKEUP_GALLERY_GROUPS;
}

// --- Colour Analysis: real photos, single flat set ---

const COLOUR_ANALYSIS_PHOTOS: GalleryImage[] = ["img-1.jpg", "img-2.jpg", "img-3.jpg", "img-4.jpg"].map(
  (file, index) => ({
    id: `colour-analysis-${index + 1}`,
    category: "colour-analysis",
    alt: `Colour Analysis ${index + 1}`,
    placeholderLabel: `Colour Analysis ${index + 1}`,
    src: `/images/colour-analysis/${file}`,
    aspectRatio: "portrait",
  })
);

export const GALLERY_IMAGES: Record<GalleryCategory, GalleryImage[]> = {
  makeup: MAKEUP_GALLERY_GROUPS.flatMap((group) => group.images),
  "colour-analysis": COLOUR_ANALYSIS_PHOTOS,
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
  about: buildPlaceholders("about", ["The Couple 01", "Studio 01", "The Couple 02"], ASPECTS),
};

export function getGalleryImages(category: GalleryCategory): GalleryImage[] {
  return GALLERY_IMAGES[category];
}
