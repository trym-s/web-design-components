"use client";

import { $webAudio } from "../lib/web-audio";

/**
 * Access the Web Audio API instance — synthesis, effects, one-shot sounds.
 *
 * @example
 * ```tsx
 * const webAudio = useWebAudio();
 * const ctx = webAudio.getContext();
 * const oscillator = ctx.createOscillator();
 * ```
 */
export function useWebAudio() {
  return $webAudio;
}
