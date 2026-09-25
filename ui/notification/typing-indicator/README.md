# Typing Indicator

Someone is writing.

## Classification

- Category: `notification` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/typing-indicator.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/typing-indicator.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/typing-indicator

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### TypingIndicator + useTypingPresence — `typing-indicator.tsx`

- `useTypingPresence({ timeout, minVisible })`: call `ping(name)` on every keystroke event from a participant; names expire after
  `timeout` (3000 ms) without a ping, but once shown the bubble stays at least `minVisible` (900 ms). `send(name)` plays the
  "sent" hand-off (340 ms) before clearing; `clear(name)` / `reset()` remove immediately. Returns `typists`, `sending`, `beat`.
- `TypingIndicator` props: `typists`, `sending`, `max` (2 names before "and n others"), `size` (34 px bubble height),
  `showLabel` (true), `announceAfter` (700 ms), `className`.
- Structure: a bubble `2 × size` wide (radius 47 % of `size`, `--foreground` at 10 %) with three `--muted-foreground` dots
  (23 % of `size`, 15 % gaps), and a 13 px `--muted-foreground` label ("Ana is typing", "Ana and Ben are typing",
  "Ana, Ben and 2 others are typing"). A polite status announces the label after it settles.
- Motion: the bubble grows in from its bottom-left corner (scale 0.74 → 1, spring 380 / 30 / 0.8) and on exit shrinks to 0.4
  (260 ms); when `sending` it collapses to 0.45 and fades over 340 ms (`cubic-bezier(0.4, 0, 1, 1)`). The dots ride one wave
  that loops every 1.25 s: each dot's lift (scale 0.74 → 1, opacity 0.32 → 1) peaks as the wave passes it. Label changes
  slide 7 px up with a cross-fade (spring 260 / 34 / 0.8). Reduced motion: static dots.
- Keyboard: none (status display).
