"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type {
  AvailabilityCheckResult,
  JourneyContact,
  JourneyContextValue,
  JourneyEvent,
  SelectedPackage,
  SelectedSlot,
  UtmParams,
} from "@/types/journey";

const JOURNEY_STORAGE_KEY = "ca_journey_v1";
const UTM_STORAGE_KEY = "ca_utm_v1";

interface StoredJourney {
  events: JourneyEvent[];
  contact?: JourneyContact;
  availabilityResult?: AvailabilityCheckResult;
  selectedPackage?: SelectedPackage;
  selectedSlot?: SelectedSlot;
}

function readStoredJourney(): StoredJourney {
  if (typeof window === "undefined") return { events: [] };
  try {
    const raw = window.sessionStorage.getItem(JOURNEY_STORAGE_KEY);
    if (!raw) return { events: [] };
    return JSON.parse(raw) as StoredJourney;
  } catch {
    return { events: [] };
  }
}

function readStoredUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
}

const JourneyContext = createContext<JourneyContextValue | undefined>(undefined);

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [events, setEventsState] = useState<JourneyEvent[]>([]);
  const [contact, setContactState] = useState<JourneyContact | undefined>(undefined);
  const [availabilityResult, setAvailabilityResultState] = useState<
    AvailabilityCheckResult | undefined
  >(undefined);
  const [selectedPackage, setSelectedPackageState] = useState<SelectedPackage | undefined>(
    undefined
  );
  const [selectedSlot, setSelectedSlotState] = useState<SelectedSlot | undefined>(undefined);
  const [utm, setUtm] = useState<UtmParams>({});
  const [hydrated, setHydrated] = useState(false);

  // Lazy-hydrate from sessionStorage after mount to avoid an SSR mismatch.
  useEffect(() => {
    const stored = readStoredJourney();
    setEventsState(stored.events ?? []);
    setContactState(stored.contact);
    setAvailabilityResultState(stored.availabilityResult);
    setSelectedPackageState(stored.selectedPackage);
    setSelectedSlotState(stored.selectedSlot);
    setUtm(readStoredUtm());
    setHydrated(true);

    const onUtmUpdate = () => setUtm(readStoredUtm());
    window.addEventListener("ca:utm-captured", onUtmUpdate);
    return () => window.removeEventListener("ca:utm-captured", onUtmUpdate);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    const toStore: StoredJourney = { events, contact, availabilityResult, selectedPackage, selectedSlot };
    window.sessionStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(toStore));
  }, [events, contact, availabilityResult, selectedPackage, selectedSlot, hydrated]);

  const setEvents = useCallback((next: JourneyEvent[]) => setEventsState(next), []);
  const setContact = useCallback((next: JourneyContact | undefined) => setContactState(next), []);
  const setAvailabilityResult = useCallback(
    (next: AvailabilityCheckResult | undefined) => setAvailabilityResultState(next),
    []
  );
  const setSelectedPackage = useCallback(
    (next: SelectedPackage | undefined) => setSelectedPackageState(next),
    []
  );
  const setSelectedSlot = useCallback(
    (next: SelectedSlot | undefined) => setSelectedSlotState(next),
    []
  );
  const clearJourney = useCallback(() => {
    setEventsState([]);
    setAvailabilityResultState(undefined);
    setSelectedPackageState(undefined);
    setSelectedSlotState(undefined);
  }, []);

  const value = useMemo<JourneyContextValue>(
    () => ({
      events,
      setEvents,
      contact,
      setContact,
      availabilityResult,
      setAvailabilityResult,
      selectedPackage,
      setSelectedPackage,
      selectedSlot,
      setSelectedSlot,
      utm,
      clearJourney,
    }),
    [
      events,
      setEvents,
      contact,
      setContact,
      availabilityResult,
      setAvailabilityResult,
      selectedPackage,
      setSelectedPackage,
      selectedSlot,
      setSelectedSlot,
      utm,
      clearJourney,
    ]
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}

export function useJourney(): JourneyContextValue {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used within a JourneyProvider");
  return ctx;
}
