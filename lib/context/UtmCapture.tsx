"use client";

import { useEffect } from "react";

const UTM_STORAGE_KEY = "ca_utm_v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/**
 * Renders nothing. On first mount, captures utm_* query params for
 * first-touch attribution and persists them to sessionStorage — but only if
 * nothing is stored yet this session, so internal navigation never
 * overwrites the visit's original source. A client effect (not middleware)
 * is enough here: this only needs to run once per session on first paint,
 * with zero server cost.
 */
export function UtmCapture() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (existing) return;

    const params = new URLSearchParams(window.location.search);
    const captured: Record<string, string> = {};
    let hasAny = false;
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) {
        captured[key] = value;
        hasAny = true;
      }
    }
    if (!hasAny) return;

    captured.capturedAt = new Date().toISOString();
    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
    window.dispatchEvent(new Event("ca:utm-captured"));
  }, []);

  return null;
}
