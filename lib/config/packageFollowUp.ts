// The "you viewed our packages" follow-up nudge (see
// app/api/packages/view/route.ts) fires this long after someone views
// packages on the Makeup page, unless they've already reached out by then.
// Short on purpose (was 3 hours — cut down to near-instant) — just long
// enough that someone who clicks "Connect on WhatsApp" right away still
// gets skipped (see app/api/packages/interest), not a real waiting period.
export const PACKAGE_VIEW_FOLLOWUP_DELAY_MINUTES = 5;
