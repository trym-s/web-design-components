// Engine-level contracts shared by every mode implementation.

import type { ModeOpts } from './profiles';

import type { Ink } from './core';

export type { Dot, Line, Ink } from './core';

/** One frame painter: draws a mode into a 2D context at CSS-px `size`. */
export type ModeDraw = (
  ctx: CanvasRenderingContext2D,
  size: number,
  t: number,
  ink: Ink,
  opts: ModeOpts
) => void;
