import type { CSSProperties, CanvasHTMLAttributes } from 'react';

/**
 * The nine shipped states — each a hand-tuned animation:
 * - `working`    — particles on tilted orbits
 * - `searching`  — a scan meridian sweeps a dotted globe
 * - `solving`    — bands scramble in quarter turns, then click back
 * - `listening`  — a waveform rolls through latitude rings
 * - `connecting` — a constellation wires itself, packets running the edges
 * - `weaving`    — three strands plait around the sphere
 * - `composing`  — an undulating multi-band sash
 * - `breathing`  — a face-on ring slowly morphing
 * - `shaping`    — a dotted outline morphs circle → triangle → square
 */
export type OrbState =
  | 'working'
  | 'searching'
  | 'solving'
  | 'listening'
  | 'connecting'
  | 'weaving'
  | 'composing'
  | 'breathing'
  | 'shaping';

/**
 * Rendered size in CSS pixels. Exactly two tuned presets ship:
 * 64 (chat-avatar scale) and 20 (inline-text scale). Each size carries
 * its own dot count, dot size and speed tuning — they are separate
 * designs, not a scale factor.
 */
export type OrbSize = 64 | 20;

/** Props for the ThinkingOrb React component. */
export interface ThinkingOrbProps extends Omit<CanvasHTMLAttributes<HTMLCanvasElement>, 'style'> {
  /** Which animation to show. @default 'working' */
  state?: OrbState;

  /** Tuned size preset — 64 or 20 CSS px. @default 64 */
  size?: OrbSize;

  /**
   * Animation speed multiplier on top of the preset's baked speed.
   * @default 1
   */
  speed?: number;

  /** Freeze the animation on the current frame. @default false */
  paused?: boolean;

  style?: CSSProperties;
}
