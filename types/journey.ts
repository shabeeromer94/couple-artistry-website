// Shared types for the availability/journey session layer.
// See lib/context/JourneyProvider.tsx for how these are stored and read.

export type EventTypeValue =
  | "Wedding"
  | "Reception"
  | "Engagement"
  | "Sangeet"
  | "Mehendi"
  | "Haldi"
  | "Baby Shower"
  | "Seemantham"
  | "Photoshoot"
  | "Birthday"
  | "Other";

export interface JourneyEvent {
  id: string;
  date: string; // ISO yyyy-mm-dd
  eventType: EventTypeValue | "";
  customEventType?: string; // required when eventType === "Other"
  city: string;
  areaVenue: string;
}

export type AvailabilityStatus = "available" | "unavailable";
export type OverallAvailabilityStatus = "available" | "unavailable" | "partial";

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

export interface JourneyContextValue {
  events: JourneyEvent[];
  setEvents: (events: JourneyEvent[]) => void;
  availabilityResult?: AvailabilityCheckResult;
  setAvailabilityResult: (result: AvailabilityCheckResult | undefined) => void;
  selectedPackage?: SelectedPackage;
  setSelectedPackage: (pkg: SelectedPackage | undefined) => void;
  selectedSlot?: SelectedSlot;
  setSelectedSlot: (slot: SelectedSlot | undefined) => void;
  utm: UtmParams;
  clearJourney: () => void;
}
