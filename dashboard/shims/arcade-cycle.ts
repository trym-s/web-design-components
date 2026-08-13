/* Not a shim — a marker. `arcade/cycle.ts` drives the whole phase sequence and
   was never published on the vault page, so the engine cannot run. The named
   exports exist only so the import links; touching any of them fails loudly,
   which is what puts the "needs shim" badge on the card. */
const MISSING =
  "arcade/cycle.ts was not part of the upstream capture — the arcade-pixel engine is incomplete. Read src/ for the technique.";

const fail = (): never => {
  throw new Error(MISSING);
};

export type Phase = string;
export const SEQUENCE: Phase[] = [];
export const cellsAt = fail as unknown as (...a: unknown[]) => number;
export const nextPhase = fail as unknown as (...a: unknown[]) => Phase;
export const phaseMs = fail as unknown as (...a: unknown[]) => number;
