"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryImage } from "@/types/gallery";
import { PlaceholderTile } from "./PlaceholderTile";
import { cn } from "@/lib/utils/cn";

const ASPECT_CLASS: Record<NonNullable<GalleryImage["aspectRatio"]>, string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

interface GalleryItemProps {
  image: GalleryImage;
  onOpen: () => void;
  /** Overrides the default "w-full" sizing — e.g. "h-full shrink-0" for a horizontal rail. */
  className?: string;
  /** Overrides image.aspectRatio — e.g. force every tile in a rail to the same 3:4 frame. */
  aspectRatio?: GalleryImage["aspectRatio"];
}

export function GalleryItem({ image, onOpen, className, aspectRatio }: GalleryItemProps) {
  const aspectClass = ASPECT_CLASS[aspectRatio ?? image.aspectRatio ?? "portrait"];

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "group relative overflow-hidden rounded-sm text-left",
        aspectClass,
        className ?? "w-full"
      )}
      aria-label={`Open ${image.alt}`}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 40vw, 240px"
          // Biased toward the top so a tight 3:4 crop keeps the face in
          // frame, trimming from lower down (outfit/saree) first.
          className="object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <PlaceholderTile label={image.placeholderLabel} />
      )}
    </motion.button>
  );
}
