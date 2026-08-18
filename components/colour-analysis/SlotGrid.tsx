"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SlotCheckResponse } from "@/types/api";
import { COLOUR_ANALYSIS_SLOTS } from "@/lib/config/slots";
import { SLOT_DISCLAIMER } from "@/lib/config/copy";
import { useJourney } from "@/lib/context/JourneyProvider";
import { scrollFadeUpProps } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/shared/Button";

type SlotStatusMap = Record<string, "available" | "unavailable">;

interface SlotGridProps {
  onSlotSelected: () => void;
}

export function SlotGrid({ onSlotSelected }: SlotGridProps) {
  const journey = useJourney();
  const [date, setDate] = useState("");
  const [statuses, setStatuses] = useState<SlotStatusMap>({});
  const [checkId, setCheckId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  async function handleCheckSlots() {
    if (!date) {
      setError("Please choose a date first.");
      return;
    }
    setError(null);
    setLoading(true);
    setSelectedTime(null);
    try {
      const res = await fetch("/api/slots/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, utm: journey.utm }),
      });
      const data: SlotCheckResponse | { success: false; error: string } = await res.json();
      if (!data.success) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      const map: SlotStatusMap = {};
      for (const slot of data.slots) map[slot.time] = slot.status;
      setStatuses(map);
      setCheckId(data.checkId);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSelectSlot(time: string) {
    if (statuses[time] !== "available") return;
    setSelectedTime(time);
    journey.setSelectedSlot({ date, time, checkId });
    onSlotSelected();
  }

  return (
    <motion.div {...scrollFadeUpProps} className="mx-auto max-w-2xl space-y-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-charcoal-light">
            Preferred Date
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-b border-charcoal/25 bg-transparent py-2 text-sm text-charcoal focus:border-wine focus:outline-none"
          />
        </label>
        <Button onClick={handleCheckSlots} disabled={loading} className="mt-2 sm:mt-6">
          {loading ? "Checking…" : "Check Slots"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-wine">{error}</p>}

      {Object.keys(statuses).length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {COLOUR_ANALYSIS_SLOTS.map((slot) => {
            const status = statuses[slot.time];
            const isAvailable = status === "available";
            return (
              <button
                key={slot.time}
                type="button"
                disabled={!isAvailable}
                onClick={() => handleSelectSlot(slot.time)}
                className={cn(
                  "flex items-center justify-between border px-4 py-3 text-sm transition-colors",
                  selectedTime === slot.time
                    ? "border-wine bg-ivory-dark"
                    : isAvailable
                      ? "border-charcoal/20 hover:border-charcoal/40"
                      : "cursor-not-allowed border-charcoal/10 text-charcoal-light/40"
                )}
              >
                <span>{slot.label}</span>
                <span aria-hidden="true">{isAvailable ? "✓" : "✕"}</span>
              </button>
            );
          })}
        </div>
      )}

      <p className="text-center text-xs leading-relaxed text-charcoal-light/80">{SLOT_DISCLAIMER}</p>
    </motion.div>
  );
}
