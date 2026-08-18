"use client";

import type { JourneyEvent } from "@/types/journey";
import { EVENT_TYPE_OPTIONS } from "@/lib/config/eventTypes";

interface EventFieldsetProps {
  index: number;
  value: JourneyEvent;
  onChange: (updated: JourneyEvent) => void;
  onRemove?: () => void;
}

const fieldClass =
  "w-full border-b border-charcoal/25 bg-transparent py-2 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:border-wine focus:outline-none";
const labelClass = "mb-2 block text-xs uppercase tracking-[0.15em] text-charcoal-light";

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
          <span className={labelClass}>Event Type</span>
          <select
            value={value.eventType}
            onChange={(e) => set("eventType", e.target.value as JourneyEvent["eventType"])}
            className={fieldClass}
            required
          >
            <option value="" disabled>
              Select…
            </option>
            {EVENT_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        {value.eventType === "Other" && (
          <label className="block sm:col-span-2">
            <span className={labelClass}>Describe the event</span>
            <input
              type="text"
              value={value.customEventType ?? ""}
              onChange={(e) => set("customEventType", e.target.value)}
              className={fieldClass}
              required
            />
          </label>
        )}

        <label className="block">
          <span className={labelClass}>City</span>
          <input
            type="text"
            value={value.city}
            onChange={(e) => set("city", e.target.value)}
            className={fieldClass}
            required
          />
        </label>

        <label className="block">
          <span className={labelClass}>Area / Venue</span>
          <input
            type="text"
            value={value.areaVenue}
            onChange={(e) => set("areaVenue", e.target.value)}
            className={fieldClass}
            required
          />
        </label>
      </div>
    </div>
  );
}
