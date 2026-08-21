"use client";

import type { JourneyEvent } from "@/types/journey";

interface EventFieldsetProps {
  index: number;
  value: JourneyEvent;
  onChange: (updated: JourneyEvent) => void;
  onRemove?: () => void;
}

const fieldClass =
  "w-full border-b border-charcoal/25 bg-transparent py-2 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:border-wine focus:outline-none";
const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-charcoal-light";

export function EventFieldset({ index, value, onChange, onRemove }: EventFieldsetProps) {
  function set<K extends keyof JourneyEvent>(key: K, next: JourneyEvent[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <div className="border border-charcoal/10 p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-display text-sm text-charcoal">Event {index + 1}</p>
        {onRemove && (
          <button type="button" onClick={onRemove} className="text-xs uppercase tracking-[0.15em] text-charcoal-light hover:text-wine">
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Date</span>
          <input
            type="date"
            value={value.date}
            onChange={(e) => set("date", e.target.value)}
            className={fieldClass}
            required
          />
        </label>

        <label className="block">
          <span className={labelClass}>Event Start Time</span>
          <input
            type="time"
            value={value.timing}
            onChange={(e) => set("timing", e.target.value)}
            className={fieldClass}
            required
          />
          <span className="mt-1 block text-xs text-charcoal-light/70">
            When the ceremony/function itself begins — we&rsquo;ll block the 4 hours before this for hair &amp; makeup.
          </span>
        </label>

        <label className="block sm:col-span-2">
          <span className={labelClass}>City</span>
          <input
            type="text"
            value={value.city}
            onChange={(e) => set("city", e.target.value)}
            className={fieldClass}
            required
          />
        </label>
      </div>
    </div>
  );
}
