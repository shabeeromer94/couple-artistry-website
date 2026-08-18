"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { JourneyEvent } from "@/types/journey";
import type { AvailabilityCheckResponse } from "@/types/api";
import { EVENT_COUNT_OPTIONS, MAX_EVENTS, type EventCountChoice } from "@/lib/config/eventTypes";
import { useJourney } from "@/lib/context/JourneyProvider";
import { generateId } from "@/lib/utils/format";
import { scrollFadeUpProps } from "@/lib/motion";
import { Button } from "@/components/shared/Button";
import { EventCountPicker } from "./EventCountPicker";
import { EventFieldset } from "./EventFieldset";
import { AvailabilityDisclaimer } from "./AvailabilityDisclaimer";

function emptyEvent(): JourneyEvent {
  return { id: generateId("evt"), date: "", eventType: "", city: "", areaVenue: "" };
}

interface AvailabilityFormProps {
  onResult: () => void;
}

export function AvailabilityForm({ onResult }: AvailabilityFormProps) {
  const journey = useJourney();
  const [countChoice, setCountChoice] = useState<EventCountChoice | null>(null);
  const [events, setEvents] = useState<JourneyEvent[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleCountChoice(choice: EventCountChoice) {
    setCountChoice(choice);
    const count = EVENT_COUNT_OPTIONS.find((o) => o.value === choice)?.count ?? 1;
    setEvents(Array.from({ length: count }, () => emptyEvent()));
  }

  function updateEvent(index: number, updated: JourneyEvent) {
    setEvents((prev) => prev.map((e, i) => (i === index ? updated : e)));
  }

  function addEvent() {
    if (events.length >= MAX_EVENTS) return;
    setEvents((prev) => [...prev, emptyEvent()]);
  }

  function removeEvent(index: number) {
    setEvents((prev) => prev.filter((_, i) => i !== index));
  }

  const isValid =
    events.length > 0 &&
    events.every(
      (e) =>
        e.date &&
        e.eventType &&
        e.city.trim() &&
        e.areaVenue.trim() &&
        (e.eventType !== "Other" || e.customEventType?.trim())
    );

  async function handleSubmit() {
    if (!isValid) {
      setError("Please complete every field for each event.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/availability/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events, utm: journey.utm }),
      });
      const data: AvailabilityCheckResponse | { success: false; error: string } = await res.json();
      if (!data.success) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      journey.setEvents(events);
      journey.setAvailabilityResult(data);
      onResult();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div {...scrollFadeUpProps} className="mx-auto max-w-2xl space-y-10">
      <div>
        <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-charcoal-light">
          How many events?
        </p>
        <EventCountPicker value={countChoice} onChange={handleCountChoice} />
      </div>

      {events.length > 0 && (
        <div className="space-y-6">
          {events.map((event, index) => (
            <EventFieldset
              key={event.id}
              index={index}
              value={event}
              onChange={(updated) => updateEvent(index, updated)}
              onRemove={countChoice === "multiple" && events.length > 1 ? () => removeEvent(index) : undefined}
            />
          ))}

          {countChoice === "multiple" && events.length < MAX_EVENTS && (
            <button
              type="button"
              onClick={addEvent}
              className="text-xs uppercase tracking-[0.2em] text-rose-dark hover:text-wine"
            >
              + Add Another Event
            </button>
          )}

          <AvailabilityDisclaimer />

          {error && <p className="text-center text-sm text-wine">{error}</p>}

          <div className="text-center">
            <Button onClick={handleSubmit} disabled={submitting} size="lg">
              {submitting ? "Checking…" : "Check Availability"}
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
