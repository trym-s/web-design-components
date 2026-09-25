# Live Activity

The system's ongoing work, worn as a small object.

## Classification

- Category: `notification` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/live-activity.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/live-activity.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/live-activity

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### LiveActivity — `live-activity.tsx`

- Props: `activity` (`{ id, title, detail?, progress? (0–1 | null), phase: running | success | error, action?: { label, onClick } }`
  or `null`), `onDismiss()`, `width` (300 px expanded), `dismissLabel`, `label` ("Activity"), `className`. The file also exports
  `useLiveActivity({ linger })` — `start(input)`, `update(patch)`, `succeed(patch)` (auto-clears after `linger`, 2000 ms),
  `fail(patch, action)`, `dismiss()` — so a host can drive it from any async job.
- Structure: a centred `role="region"` with one floating pod (`--card`, radius `--radius + 1px`, 1 px `--border`, `shadow-lg`)
  that holds two faces and animates its own width/height between them. Compact face (32 px high): an 18 px phase glyph and
  either the percentage (mono 10.5 px) or the title (12 px medium, max 120 px). Expanded face (`width` wide, 14 × 12 px padding):
  glyph, title (13 px medium), optional 24 px outlined action button and a 22 px × (not while running); detail line (11.5 px
  `--muted-foreground`); a progress row with a 4 px `--primary` bar in a `--foreground` 10 % trough and the percentage.
- States / motion: the pod enters from y −10 px, scale 0.9, blur 6 px (surface spring 420 / 36 / 0.9, fades 200 ms) and leaves
  upward (160 ms). It expands while hovered (collapse waits 160 ms after leaving), focused, for 2.6 s after each new activity or
  phase change ("peek"), and permanently on error. Faces cross-fade (spring 260 / 34 / 0.8). Glyphs: running — a `--primary` arc
  spinning every 0.85 s; success — a `--success` check drawn in 300 ms; error — a `--destructive` exclamation; they swap with a
  0.7 → 1 scale (spring 700 / 46 / 0.5). Progress fills with spring 210 / 34 / 0.9. `--success` is declared on the root.
- Keyboard / a11y: Tab into the pod expands it; Escape collapses a running activity or dismisses a finished one; the action and
  × are buttons (tabbable only while expanded). A polite live region says "title started / finished / failed" once per phase.
