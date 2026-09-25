# Gyro Rings

Nested rotating torus rings with a draggable overall orientation and hover-speed boost.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + Three.js
- Entry point: `upstream/gyro-rings.tsx`
- Nature: interactive; reuse its kinetic ornament treatment and pointer interaction.
- Added: 2026-08-18T11:42:20+03:00

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`
- `upstream/gyro-rings.tsx` — localized component source
- `upstream/demo.tsx` — dashboard demo
- `reference.tsx` — dashboard entry point
- `../../_sources/originkit/polished-metal-matcap.png` — localized matcap

Upstream: Originkit (source supplied by the user).

## Usage

Copy `src/` (including `polished-metal-matcap.png`) into a React + Vite project (Tailwind v4 for the root's variable classes).
It imports only `react` and `three`; `src/demo.tsx` mounts it in a 480 px box.

### GyroRings — `gyro-rings.tsx`

- Props (all optional): `rings` (6, 1–6), `finish` (`metal` matcap | `solid` Lambert), `tint` / `color` (override `--gyro-tint`
  `oklch(0.882 0 0)` for metal and `--gyro-color` `oklch(0.877 0.227 151.8)` for solid), `thickness` (5 → tube radius ×0.006),
  `innerRadius` (40 %), `gap` (13 %), `spin` (2), `hoverBoost` (10), `dragSensitivity` (1), `sizePercent` (104 — framing),
  `className`, `style`.
- Structure: a `role="img"` box ("Gyroscope rings", min 180×180) with a transparent WebGL canvas. Rings are tori nested
  outermost-first, each parented to the previous one and oriented on the y, x, z axes in turn; the metal finish uses the
  polished-metal matcap tinted by `--gyro-tint`.
- Motion: ring i spins about its axis at `(i+1)` × `spin` × 0.09 rad/s, alternating direction. Hover eases a boost up to
  ×(1 + hoverBoost/5) (time constant 0.25 s).
- Interactions: drag rotates the whole gyroscope (0.007 rad/px × sensitivity); on release it keeps the velocity and decays
  (e^−2.6t). Cursor `grab` / `grabbing`.
- Keyboard: none (decorative).
