"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryImage } from "@/types/gallery";
import { PlaceholderTile } from "./PlaceholderTile";

interface LightboxProps {
  images: GalleryImage[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, selectedIndex, onClose, onNavigate }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const isOpen = selectedIndex !== null;
  const image = isOpen ? images[selectedIndex] : null;

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && selectedIndex !== null) {
        onNavigate((selectedIndex + 1) % images.length);
      }
      if (e.key === "ArrowLeft" && selectedIndex !== null) {
        onNavigate((selectedIndex - 1 + images.length) % images.length);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, selectedIndex, images.length, onClose, onNavigate]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || selectedIndex === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) onNavigate((selectedIndex + 1) % images.length);
      else onNavigate((selectedIndex - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
  }

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 px-4"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 text-sm uppercase tracking-[0.2em] text-ivory/80 hover:text-ivory"
            aria-label="Close gallery"
          >
            Close ✕
          </button>

          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-[3/4] max-h-[80vh] w-full max-w-md"
          >
            {image.src ? (
              <Image src={image.src} alt={image.alt} fill className="object-contain" />
            ) : (
              <PlaceholderTile label={image.placeholderLabel} />
            )}
          </motion.div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onNavigate((selectedIndex! - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-ivory/70 hover:text-ivory"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => onNavigate((selectedIndex! + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-ivory/70 hover:text-ivory"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
