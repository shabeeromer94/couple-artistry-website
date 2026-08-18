import { cn } from "@/lib/utils/cn";

interface PlaceholderTileProps {
  label: string;
  className?: string;
}

/**
 * A consistent "no real photo yet" tile — an ivory→blush gradient with a
 * thin serif label and a simple line-art icon. Used by Gallery/GalleryItem
 * and by home ServiceCards, so every placeholder spot on the site looks
 * intentional rather than broken. Never stock photography.
 */
export function PlaceholderTile({ label, className }: PlaceholderTileProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-ivory-dark to-rose-light/40 text-charcoal-light",
        className
      )}
    >
      <svg
        aria-hidden="true"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="opacity-60"
      >
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span className="font-display text-sm tracking-wide">{label}</span>
    </div>
  );
}
