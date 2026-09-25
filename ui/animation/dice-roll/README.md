# Dice Roll

An interactive WebGL dice throw with configurable count, face colors, hop, spin, shadow, and idle sway.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + Three.js
- Entry point: `upstream/dice-roll.tsx`
- Nature: interactive; reuse the click-to-roll behavior and die animation, then adapt colors and scale.
- Added: 2026-08-18T11:32:29+03:00

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`
- `upstream/dice-roll.tsx` — localized component source
- `upstream/demo.tsx` — dashboard demo
- `reference.tsx` — dashboard entry point

Upstream: Originkit (source supplied by the user).

## Usage

Copy `src/` into a React project (Tailwind v4 for the root's variable classes). It imports only `react` and `three`;
`src/demo.tsx` mounts it in a 420 px box.

### DiceRoll — `dice-roll.tsx`

- Props (all optional): `count` (2, 1–5 dice), `bodyColor` / `numberColor` (override `--dice-body` / `--dice-pip`),
  `spread` (55 — gap between dice, % of a die), `turns` (3 full spins per throw, 1–8), `hop` (45 — jump height, 0–100),
  `transition` (`{ duration: 1.1 s, ease: "circOut" | named ease | cubic-bezier array }`), `shadow` (true), `idleSpin` (20 —
  idle sway amount, 0–40), `sizePercent` (90 — framing), `className`, `style`.
- Structure: a `role="img"` box ("Rolling dice", min 200×160) holding a transparent WebGL canvas. Each die is a unit cube with
  six 256 px canvas textures: body colour, a faint dark edge, round pips (radius 21, 62.7 px grid) in the pip colour; lit by a
  directional light (0.85) and an ambient light (0.72). A soft radial shadow sits under each die. Colours come from
  `--dice-body` (`oklch(0.961 0.011 89.7)`) and `--dice-pip` (`oklch(0.196 0 0)`), declared on the root.
- Motion: a throw picks a random face and a random quarter yaw per die, spins `turns` turns about a random axis while easing
  into the final orientation over `duration` (dice staggered 70 ms), hops on a half-sine (shadow grows and fades with height).
  Between throws the group sways (sin 0.4 Hz); sway fades out during a throw.
- Interactions: click / tap anywhere on the canvas throws (ignored while rolling). The first layout is shown already landed.
- Keyboard: none upstream — wrap it in a button (or add `tabIndex` + Enter/Space) if throws must be keyboard-reachable.
