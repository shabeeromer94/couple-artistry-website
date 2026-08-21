import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-wine to-wine-dark text-ivory border border-wine shadow-soft hover:shadow-lift hover:-translate-y-0.5 hover:brightness-110",
  secondary:
    "bg-transparent text-charcoal border border-charcoal/40 hover:border-wine hover:text-wine hover:shadow-soft",
  ghost: "bg-transparent text-charcoal hover:text-wine",
};

const SIZE_CLASSES: Record<Size, string> = {
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-sm",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 uppercase tracking-[0.15em] font-bold transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none disabled:translate-y-0 disabled:shadow-none";

interface ButtonAsButton extends BaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  external?: boolean;
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", children, className } = props;
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", disabled, onClick } = props as ButtonAsButton;
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
