import { cn } from "@/lib/utils/cn";

interface LuxuryWavesProps {
  className?: string;
}

/**
 * A quiet gold flowing-line texture — self-drawn (no stock asset, so no
 * licensing concern), meant to sit behind a section's content at very low
 * opacity. Two loose "ribbon" bundles (a few parallel curves each) rather
 * than a tiled repeating pattern, so it reads as a soft ambient wash
 * instead of wallpaper. Absolutely positioned edge-to-edge — the section
 * using it needs `relative`, and its real content needs `relative z-10`.
 */
export function LuxuryWaves({ className }: LuxuryWavesProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 700"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <g fill="none" stroke="#C4A46A">
        <path
          d="M -50,120 C 250,40 450,220 700,140 S 1150,20 1500,100"
          strokeWidth="1.5"
          strokeOpacity="0.32"
        />
        <path
          d="M -50,155 C 250,75 450,255 700,175 S 1150,55 1500,135"
          strokeWidth="0.75"
          strokeOpacity="0.2"
        />
        <path
          d="M -50,185 C 250,105 450,285 700,205 S 1150,85 1500,165"
          strokeWidth="0.75"
          strokeOpacity="0.14"
        />

        <path
          d="M -50,600 C 300,680 500,480 750,580 S 1200,700 1500,600"
          strokeWidth="1.5"
          strokeOpacity="0.32"
        />
        <path
          d="M -50,635 C 300,715 500,515 750,615 S 1200,735 1500,635"
          strokeWidth="0.75"
          strokeOpacity="0.2"
        />
        <path
          d="M -50,665 C 300,745 500,545 750,645 S 1200,765 1500,665"
          strokeWidth="0.75"
          strokeOpacity="0.14"
        />
      </g>
    </svg>
  );
}
