# Twin Galaxy Rings

A pointer-reactive two-color particle galaxy with scroll-like spiral motion.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + Canvas 2D
- Entry point: `upstream/twin-galaxy-rings.tsx`
- Nature: interactive; reuse its particle-field visual treatment and pointer response.
- Added: 2026-08-18T11:42:20+03:00

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`
- `upstream/twin-galaxy-rings.tsx` — localized component source
- `upstream/demo.tsx` — dashboard demo
- `reference.tsx` — dashboard entry point

Upstream: Originkit (source supplied by the user).

## Usage

Copy `src/` into a React project (Tailwind v4 for the root's variable classes). It imports only `react`; `src/demo.tsx`
mounts it in a 560 px box.

### TwinGalaxyRings — `twin-galaxy-rings.tsx`

- Props (all optional): `colors` (dot colours; default `--galaxy-a` `oklch(0.618 0.245 300.1)` and `--galaxy-b`
  `oklch(0.872 0.029 256.5)`), `background` (default `var(--galaxy-bg)` `oklch(0.144 0.024 260.2)`; a `--galaxy-glow`
  radial highlight sits in the top-left), `density` (29 → 160–800 samples per arm), `dotSize` (2), `speed` (47), `hoverSpeed`
  (85), `direction` (`cw` | `ccw`), `innerVoid` (14 % empty centre), `armThickness` (100 %), `armCount` (5),
  `tilt` (`{ tilt: 26°, sideTilt: −8° }`), `className`, `style`.
- Structure: a box (min 320×320) with the backdrop and a 2D canvas (DPR ≤ 1.5). Each arm is a logarithmic spiral from the
  inner void to 58 % of the shorter side, five turns, dots jittered across and along the arm with a fixed seed, projected
  with pitch `tilt` and roll `sideTilt`, additive blending.
- Motion: dots stream along the arms at `speed`/50 (hover eases to `hoverSpeed`, ~0.2 s); dot alpha fades in/out at the
  arm ends.
- Interactions: on hover, dots near the pointer brighten and grow (Gaussian falloff).
- Keyboard: none (decorative).
