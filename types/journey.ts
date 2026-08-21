// Shared types for the availability/journey session layer.
// See lib/context/JourneyProvider.tsx for how these are stored and read.

export interface JourneyEvent {
  id: string;
  date: string; // ISO yyyy-mm-dd
  timing: string; // "HH:MM" 24h — the event's own start time (ceremony/function), not the makeup start time
  city: string;
}

export type AvailabilityStatus = "available" | "unavailable";
// "not_checked" — no calendar lookup ran at all, because she marked
// "not sure of my event details yet" on the form (see AvailabilityForm).
export type OverallAvailabilityStatus = "available" | "unavailable" | "partial" | "not_checked";

export interface AvailabilityCheckResult {
  success: true;
  checkId: string;
  overallStatus: OverallAvailabilityStatus;
  results: Array<{ id: string; date: string; status: AvailabilityStatus }>;
  checkedAt: string;
  disclaimer: string;
}

export interface SelectedPackage {
  category: string;
  tierId: string;
  tierName: string;
}

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  capturedAt?: string;
}

export interface SelectedSlot {
  date: string;
  time: string;
  checkId?: string;
}

/** Captured once, directly on the availability check form — reused wherever the visitor's name/number is useful afterward (e.g. the package-selection WhatsApp CTA). */
export interface JourneyContact {
  fullName: string;
  whatsappNumber: string;
}

export interface JourneyContextValue {
  events: JourneyEvent[];
  setEvents: (events: JourneyEvent[]) => void;
  contact?: JourneyContact;
  setContact: (contact: JourneyContact | undefined) => void;
  availabilityResult?: AvailabilityCheckResult;
  setAvailabilityResult: (result: AvailabilityCheckResult | undefined) => void;
  selectedPackage?: SelectedPackage;
  setSelectedPackage: (pkg: SelectedPackage | undefined) => void;
  selectedSlot?: SelectedSlot;
  setSelectedSlot: (slot: SelectedSlot | undefined) => void;
  utm: UtmParams;
  clearJourney: () => void;
}
