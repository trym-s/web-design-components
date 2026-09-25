# Fade motion

- Thought this was a blur. It's two hundred copies of the word stacked almost invisibly, and the fade is just where a lot of them piled up.
- Did it the dumb way first, two hundred draws a frame, and it choked exactly when you moved your cursor. Now every pixel just walks back up the trail and counts.

## Classification

- Category: `effects` — decorative
- Medium: WebGL canvas
- Entry point: `upstream/smear/SmearCard.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`
- `upstream/smear/shaders.ts`
- `upstream/smear/text-mask.ts`
- `upstream/smear/engine.ts`
- `upstream/smear/SmearCard.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/fade-motion

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`; `engine.ts`,
`shaders.ts` and `text-mask.ts` are the upstream WebGL engine, taking one or more palettes and the word from the component
instead of a built-in preset list. `src/demo.tsx` shows the default dark "Afterglow" world and the light "Graphite" world
(set through inline-style variable overrides — the reliable way to override a variable the root declares).

### SmearFade — `smear-fade.tsx`

- Props: `word` ("motion"), `mode` (`add`: glow on a dark wall; `subtract`: ink pressed into a light wall), `trail` (HSL ramp
  `{ hue, sat, light, dHue, dSat, dLight }` — value at the word and its travel to the tail; default 132/46/52 → +26/−14/−26),
  `alphaScale` (1; ~0.42 for subtractive worlds), `autoplay` (true — a ghost cursor sweeps the card until a real pointer
  takes over), `aria-label`, `className`, `style`.
- Structure: a `role="img"` card, aspect 1344∶620, radius `--radius + 2px`, 1 px `--border`, background `--smear-bg`, holding
  a WebGL canvas. The word (element's mono font) becomes a white mask; ~210 copies stepped ~1 px apart along the trail angle
  (straight down), each at ~1.9 % alpha, accumulate additively (or multiply in `subtract`) into a continuous ramp from the
  word to the tail, tinted along the trail ramp, with three word layers (`--smear-bleed` wide bleed, `--smear-halo` tight
  halo, `--smear-core` hot core), an atmosphere pool (`--smear-pool-a/b`) and a multiplied vignette (`--smear-vignette`).
  Afterglow defaults: bg `oklch(0.160 0.006 156.4)`, bleed `oklch(0.599 0.113 158.3)`, halo `oklch(0.798 0.143 156.1)`,
  core `oklch(0.953 0.017 156.9)`, pools `oklch(0.788 0.154 153.2 / 0.16)` and `oklch(0.607 0.107 161.7 / 0.06)`, vignette
  `oklch(0.564 0.023 156.4)`.
- Motion: the trail bends and wavers toward the pointer (x/y normalised over the card); loops pause off screen and on hidden
  tabs; `prefers-reduced-motion` renders one still frame.
- Keyboard: none (decorative).
