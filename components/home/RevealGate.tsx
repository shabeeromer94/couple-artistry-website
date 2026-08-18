"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BRAND_NAME } from "@/lib/config/copy";
import { EASE_EDITORIAL } from "@/lib/motion";

export const REVEAL_SESSION_KEY = "ca_reveal_seen_v1";
export const REVEAL_SETTLED_EVENT = "ca:reveal-settled";

type Stage = "cover" | "revealing" | "settled";

interface RevealGateProps {
  children: React.ReactNode;
  brandWordmark?: string;
}

/**
 * Home-page gateway: a near-blank cover with the brand wordmark, opened by
 * a tap/scroll/keyboard interaction into a slow, layered reveal of the real
 * home content. Interaction pattern only (progressive-disclosure cover →
 * staged fade reveal) is adapted from the cinematic wedding-invite pattern
 * referenced during planning — no visual identity borrowed from it.
 *
 * Plays once per session: if REVEAL_SESSION_KEY is already set, this skips
 * straight to "settled" so repeat visits within the same session don't
 * replay the intro. prefers-reduced-motion collapses the whole sequence to
 * an instant/opacity-only transition.
 */
export function RevealGate({ children, brandWordmark = BRAND_NAME }: RevealGateProps) {
  const [stage, setStage] = useState<Stage>("cover");
  const [skipIntro, setSkipIntro] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const hasSettledRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(REVEAL_SESSION_KEY) === "true") {
      setSkipIntro(true);
      setStage("settled");
    }
  }, []);

  function settle() {
    if (hasSettledRef.current) return;
    hasSettledRef.current = true;
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(REVEAL_SESSION_KEY, "true");
      window.dispatchEvent(new Event(REVEAL_SETTLED_EVENT));
    }
    setStage("settled");
  }

  function beginReveal() {
    if (stage !== "cover") return;
    if (prefersReducedMotion) {
      settle();
      return;
    }
    setStage("revealing");
    window.setTimeout(settle, 900);
  }

  useEffect(() => {
    if (stage !== "cover" || skipIntro) return;

    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) > 8) beginReveal();
    }
    function onTouchMove() {
      beginReveal();
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === " ") beginReveal();
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, skipIntro]);

  const coverVisible = stage === "cover" || stage === "revealing";

  return (
    <div className="relative">
      <AnimatePresence>
        {coverVisible && (
          <motion.div
            key="cover"
            initial={false}
            animate={{ opacity: stage === "revealing" ? 0 : 1, scale: stage === "revealing" ? 1.03 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: EASE_EDITORIAL }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory"
            onClick={beginReveal}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 1.2, ease: EASE_EDITORIAL }}
              className="px-8 text-center font-display text-3xl tracking-wide text-charcoal sm:text-4xl"
            >
              {brandWordmark}
            </motion.p>

            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                beginReveal();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.6, 1] }}
              transition={{
                opacity: { delay: 1.4, duration: 2.2, times: [0, 0.3, 0.6, 1], repeat: Infinity },
              }}
              className="mt-10 text-xs uppercase tracking-[0.3em] text-charcoal-light"
            >
              Tap or scroll to enter
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={skipIntro ? false : { opacity: 0 }}
        animate={{ opacity: stage === "settled" ? 1 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, ease: EASE_EDITORIAL, delay: skipIntro ? 0 : 0.3 }}
        aria-hidden={coverVisible}
        style={{ pointerEvents: coverVisible ? "none" : "auto" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
