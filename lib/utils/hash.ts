// Small deterministic string hash (djb2). Used by the availability/slot
// stubs so repeated checks of the same inputs return the same answer within
// a session, instead of flickering on every call like Math.random() would.
export function deterministicHash(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return Math.abs(hash);
}

/** Returns a value in [0, 100) deterministically derived from `input`. */
export function deterministicPercent(input: string): number {
  return deterministicHash(input) % 100;
}
