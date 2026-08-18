"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/config/navigation";
import { BRAND_NAME } from "@/lib/config/copy";
import { REVEAL_SESSION_KEY, REVEAL_SETTLED_EVENT } from "@/components/home/RevealGate";

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // On every route except a first-time visit to "/", the nav renders
  // immediately. On "/" it waits for RevealGate to settle (or for the
  // sessionStorage flag from an earlier visit this session).
  const [visible, setVisible] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-0 z-40 border-b border-charcoal/10 bg-ivory/90 backdrop-blur"
        >
          <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5">
            <Link href="/" className="font-display text-lg tracking-wide text-charcoal">
              {BRAND_NAME}
            </Link>

            <nav className="hidden gap-8 md:flex">
              {NAV_LINKS.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.15em] text-charcoal-light transition-colors hover:text-wine"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs uppercase tracking-[0.15em] text-charcoal-light transition-colors hover:text-wine"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="text-xs uppercase tracking-[0.15em] text-charcoal md:hidden"
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
                className="overflow-hidden border-t border-charcoal/10 md:hidden"
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
                        className="py-3 text-sm uppercase tracking-[0.15em] text-charcoal-light"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="py-3 text-sm uppercase tracking-[0.15em] text-charcoal-light"
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
