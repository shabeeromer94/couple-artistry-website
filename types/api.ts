import type { AvailabilityStatus, OverallAvailabilityStatus } from "./journey";

export interface AvailabilityCheckRequestEvent {
  id: string;
  date: string;
  timing: string;
  city: string;
}

export interface AvailabilityCheckRequest {
  fullName: string;
  whatsappNumber: string;
  events: AvailabilityCheckRequestEvent[];
  sessionId?: string;
  utm?: Record<string, string | undefined>;
}

export interface AvailabilityCheckResponse {
  success: true;
  checkId: string;
  overallStatus: OverallAvailabilityStatus;
  results: Array<{ id: string; date: string; status: AvailabilityStatus }>;
  checkedAt: string;
  disclaimer: string;
}

export interface SlotCheckRequest {
  date: string;
  slotTimes?: string[];
  sessionId?: string;
  utm?: Record<string, string | undefined>;
}

export interface SlotCheckResponse {
  success: true;
  checkId: string;
  date: string;
  slots: Array<{ time: string; status: AvailabilityStatus }>;
  checkedAt: string;
  disclaimer: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}
