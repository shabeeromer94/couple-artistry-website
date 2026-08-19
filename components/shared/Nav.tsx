"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/config/navigation";
import { cn } from "@/lib/utils/cn";
import { REVEAL_SESSION_KEY, REVEAL_SETTLED_EVENT } from "@/components/home/RevealGate";

// Pages that open on a full-bleed photo hero — the nav floats transparent
// over the image on these until the visitor scrolls, then settles into the
// normal solid bar. Every other page keeps the solid bar throughout.
const HERO_PAGES = ["/", "/makeup"];

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isHeroPage = HERO_PAGES.includes(pathname);
  // On every route except a first-time visit to "/", the nav renders
  // immediately. On "/" it waits for RevealGate to settle (or for the
  // sessionStorage flag from an earlier visit this session).
  const [visible, setVisible] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!isHeroPage);

  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(REVEAL_SESSION_KEY) === "true") {
      setVisible(true);
    }
    const onSettled = () => setVisible(true);
    window.addEventListener(REVEAL_SETTLED_EVENT, onSettled);
    return () => window.removeEventListener(REVEAL_SETTLED_EVENT, onSettled);
  }, [isHome]);

  useEffect(() => {
    if (!isHeroPage) {
      setScrolled(true);
      return;
    }
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHeroPage]);

  // Transparent + light text while floating over an unscrolled hero photo;
  // solid ivory bar + dark text everywhere else, and on scroll.
  const overlay = isHeroPage && !scrolled;

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "sticky top-0 z-40 border-b transition-colors duration-500",
            overlay ? "border-transparent bg-transparent" : "border-charcoal/10 bg-ivory/90 backdrop-blur"
          )}
        >
          <div className="mx-auto flex h-24 max-w-content items-center justify-between px-6">
            <Link href="/" className="leading-none">
              <span
                className={cn(
                  "block font-display text-2xl tracking-wide transition-colors duration-500 sm:text-3xl",
                  overlay ? "text-ivory" : "text-charcoal"
                )}
              >
                Couple Artistry
              </span>
              <span
                className={cn(
                  "mt-1 block text-xs uppercase tracking-[0.2em] transition-colors duration-500",
                  overlay ? "text-ivory/75" : "text-charcoal-light"
                )}
              >
                by Shaash
              </span>
            </Link>

            <nav className="hidden gap-8 md:flex">
              {NAV_LINKS.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-500",
                      overlay ? "text-ivory/85 hover:text-ivory" : "text-charcoal-light hover:text-wine"
                    )}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-500",
                      overlay ? "text-ivory/85 hover:text-ivory" : "text-charcoal-light hover:text-wine"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                "text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-500 md:hidden",
                overlay ? "text-ivory" : "text-charcoal"
              )}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-charcoal/10 bg-ivory md:hidden"
              >
                <div className="flex flex-col gap-1 px-6 py-4">
                  {NAV_LINKS.map((link) =>
                    link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMenuOpen(false)}
                        className="py-3 text-sm font-medium uppercase tracking-[0.15em] text-charcoal-light"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="py-3 text-sm font-medium uppercase tracking-[0.15em] text-charcoal-light"
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
