# Inline Validation

Error message that does not shove the form.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/inline-validation.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/inline-validation.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/inline-validation

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### InlineValidation — `inline-validation.tsx`

- Props: `label`, `value`, `onChange(value)`, `validate(value) → error string | null`, `hint`, `id`, `name`, `type`, `placeholder`,
  `autoComplete`, `inputMode`, `debounce` (400 ms), `reserveLines` (1 — message lines reserved so the layout never jumps),
  `disabled`, `required`, `className`. Also exports `useInlineValidation({ value, validate, debounce })` → `status`
  (`idle` | `pending` | `valid` | `invalid`), `error`, `message`, `touched`, `commit()`, `reset()`, `fieldProps`.
- Structure: a 13 px medium label, a 40 px input (radius `--radius`, 2 px border, right padding for a 14 px status icon),
  and a message area `reserveLines × 16` px high where the hint and the error share one grid cell.
- States / timing: nothing is judged until the first blur (`commit`). After that, typing that fixes the value turns it `valid`
  at once; typing that breaks it goes `pending` and only shows the error after `debounce` ms (an already visible error stays
  up). Valid shows a check (`--muted-foreground`), invalid an exclamation mark (`--destructive`), each fading in from scale
  0.7; the hint fades out and moves 3 px down while the error fades in from −3 px (spring 260 / 34 / 0.8). Input: resting
  `--border` on `--muted` 70 %, focused `--primary` on `--card`, invalid `--destructive` on `--card`.
- Keyboard: native input; `aria-invalid`, `aria-describedby` (hint + error), and a polite live region announces the error.
