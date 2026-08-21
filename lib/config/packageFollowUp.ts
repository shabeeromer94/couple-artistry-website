// The "you viewed our packages" follow-up nudge (see
// app/api/packages/view/route.ts) fires this long after someone views
// packages on the Makeup page, unless they've already reached out by then.
// Long enough to feel like a genuine follow-up rather than an instant push;
// short enough to still catch someone while the visit is fresh.
export const PACKAGE_VIEW_FOLLOWUP_DELAY_HOURS = 3;
