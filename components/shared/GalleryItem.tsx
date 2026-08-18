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
}

export function GalleryItem({ image, onOpen }: GalleryItemProps) {
  const aspectClass = ASPECT_CLASS[image.aspectRatio ?? "portrait"];

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "group relative w-full overflow-hidden rounded-sm text-left",
        aspectClass
      )}
      aria-label={`Open ${image.alt}`}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <PlaceholderTile label={image.placeholderLabel} />
      )}
    </motion.button>
  );
}
