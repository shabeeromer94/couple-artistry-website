// Colour Analysis slots are restricted to an 11:00 AM–5:00 PM window, per
// business rule. Slots are generated, not hand-listed, so the window is a
// single source of truth.

export const SLOT_WINDOW_START_HOUR = 11; // 11:00 AM
export const SLOT_WINDOW_END_HOUR = 17; // 5:00 PM (exclusive end of last start time)
export const SLOT_DURATION_MINUTES = 60;

export function formatSlotLabel(hour24: number, minute: number): string {
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const minuteLabel = minute === 0 ? "00" : String(minute).padStart(2, "0");
  return `${hour12}:${minuteLabel} ${period}`;
}

export function slotTimeValue(hour24: number, minute: number): string {
  return `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export interface SlotDefinition {
  time: string; // "HH:MM" 24h, stable identifier
  label: string; // "11:00 AM"
}

export function generateSlots(): SlotDefinition[] {
  const slots: SlotDefinition[] = [];
  for (
    let hour = SLOT_WINDOW_START_HOUR;
    hour < SLOT_WINDOW_END_HOUR;
    hour += SLOT_DURATION_MINUTES / 60
  ) {
    slots.push({
      time: slotTimeValue(hour, 0),
      label: formatSlotLabel(hour, 0),
    });
  }
  return slots;
}

export const COLOUR_ANALYSIS_SLOTS = generateSlots();
