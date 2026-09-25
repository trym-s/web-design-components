# Tag Input

Enter adds, backspace highlights then removes.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/tag-input.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/tag-input.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/tag-input

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### TagInput — `tag-input.tsx`

- Props: `label`, `placeholder` ("Add a tag"), `hint` ("Enter adds · Backspace removes"), `className`, plus the hook options:
  `value` / `defaultValue` / `onChange(tags)`, `max` (adds a `n / max` counter and a limit), `separators` ([","] — keys that
  commit, also used to split pastes, with newlines and tabs), `allowDuplicates` (false; case-insensitive), `validate(candidate,
  tags) → boolean`. Also exports `useTagInput(options)`.
- Structure: an optional 12.5 px medium label; a wrapping list box (min 40 px, max 116 px then scrolls; radius `--radius`, 2 px
  `--border` on `--muted` 70 % with an inner shadow; focus-within `--primary` on `--card`) holding 24 px chips (radius
  `--radius − 4px`, 1 px `--border`, `--card`, 12.5 px, a 14 px × button) and a growing input sized to its text. Below: the hint
  (11.5 px `--muted-foreground`) cross-fading with the rejection message (`--foreground`), and the counter.
- States / motion: chips pop in (opacity 0, scale 0.9 → 1, spring 700 / 46 / 0.5) and reflow with a layout spring; removed
  chips fade and shrink (180 ms, `cubic-bezier(0.4, 0, 1, 1)`). The armed chip (and a duplicate, flashed for 460 ms) turns
  `--primary` / `--primary-foreground`. Rejections ("x is already in the list", "That is the limit of n tags", "x is not
  allowed here") show for 2.4 s. Whitespace is trimmed and collapsed.
- Keyboard: Enter or a separator adds the draft; Backspace in an empty input arms the last chip, a second Backspace removes
  it (key repeat ignored); ArrowLeft at the start of the input arms chips leftward, ArrowRight moves right and back to the
  input; Delete removes the armed chip; Escape disarms. Chip × buttons are mouse-only (`tabIndex -1`). A polite live region
  announces additions, removals and rejections.
