"use client";

import { EVENT_COUNT_OPTIONS, type EventCountChoice } from "@/lib/config/eventTypes";
import { cn } from "@/lib/utils/cn";

interface EventCountPickerProps {
  value: EventCountChoice | null;
  onChange: (value: EventCountChoice) => void;
}

export function EventCountPicker({ value, onChange }: EventCountPickerProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3" role="radiogroup" aria-label="How many events?">
      {EVENT_COUNT_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "border px-6 py-5 text-left transition-colors",
            value === option.value
              ? "border-wine bg-ivory-dark"
              : "border-charcoal/15 hover:border-charcoal/40"
          )}
        >
          <span className="block font-display text-lg text-charcoal">{option.label}</span>
          <span className="mt-1 block text-xs text-charcoal-light">
            {option.value === "multiple" ? "Add as many as you need" : `${option.count} event${option.count > 1 ? "s" : ""}`}
          </span>
        </button>
      ))}
    </div>
  );
}
