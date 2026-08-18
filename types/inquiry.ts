import type { JourneyEvent, SelectedPackage, UtmParams } from "./journey";

export type FlowType = "makeup" | "classes" | "colour-analysis" | "stitching";

export type FieldType = "text" | "tel" | "email" | "textarea" | "select" | "date" | "radio";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldSchemaEntry {
  /** Maps to details.<name> in the submitted payload. */
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  /** Pulls an initial value from JourneyContext on mount; stays editable. */
  prefillFromContext?: "events" | "selectedPackage";
  /** Show this field only when the predicate over current form values is true. */
  showIf?: (values: Record<string, unknown>) => boolean;
}

export interface MakeupInquiryDetails {
  events: JourneyEvent[];
  eventCount: number;
  availabilityCheckId?: string;
  availabilityOverallStatus?: string;
  /** Free-text edits the visitor made to the auto-filled event summary. */
  eventsSummary?: string;
}

export interface ClassesInquiryDetails {
  classType: string;
  level: string;
  location: string;
  preferredDate?: string;
  preferredTiming?: string;
}

export interface ColourAnalysisInquiryDetails {
  preferredDate: string;
  preferredSlot?: string;
  slotCheckId?: string;
}

export interface StitchingInquiryDetails {
  serviceRequired: string;
  location: string;
  preferredDate?: string;
  referenceDescription?: string;
}

export type InquiryDetails =
  | MakeupInquiryDetails
  | ClassesInquiryDetails
  | ColourAnalysisInquiryDetails
  | StitchingInquiryDetails;

export interface InquiryPayload {
  flowType: FlowType;
  fullName: string;
  whatsappNumber: string;
  email?: string;
  message?: string;
  details: InquiryDetails;
  selectedPackage?: SelectedPackage;
  utm?: UtmParams;
  sourcePage: string;
}

export interface InquirySuccessResponse {
  success: true;
  inquiryId: string;
  whatsappUrl: string;
}

export interface InquiryErrorResponse {
  success: false;
  error: string;
}

export type InquiryApiResponse = InquirySuccessResponse | InquiryErrorResponse;
