export type GalleryCategory = "makeup" | "colour-analysis" | "stitching" | "about";

export interface GalleryImage {
  id: string;
  category: GalleryCategory;
  alt: string;
  /** Shown on the placeholder tile until a real photo is supplied. */
  placeholderLabel: string;
  /** Undefined until a real file exists under /public/images/{category}/. */
  src?: string;
  aspectRatio?: "portrait" | "square" | "landscape";
  tags?: string[];
}
