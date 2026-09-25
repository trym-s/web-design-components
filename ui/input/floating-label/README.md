# Floating Label

The label makes room instead of disappearing.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/floating-label.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/floating-label.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/floating-label

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### FloatingLabelInput — `floating-label.tsx`

- Props: `label`, `value` / `defaultValue` / `onChange(value, event)`, `onFocus`, `onBlur`, `hint`, `invalid`, `id`, `name`,
  `type` (text, email, password, search, tel, url), `autoComplete`, `inputMode`, `maxLength` (adds a `n / max` counter),
  `required` (adds a `*`), `disabled`, `readOnly`, `inputRef`, `className`. Also exports `useFloatingLabel({ value,
  defaultValue, disabled })` → `raised`, `focused`, `filled`, `length`, `instant`, `fieldProps`.
- Structure: 20 px of headroom, then a 40 px field box (radius `--radius`, 2 px border) with a transparent 13 px input
  (12 px side padding). The label (13 px, `--muted-foreground`, `--destructive` when invalid) starts inside the box at 32 px
  from the top of the wrapper. Below: a 16 px row with the 11.5 px hint (truncated) and a mono 10.5 px counter whose width is
  reserved for the full `max / max`.
- States: the label rises when the field is focused or has text: y −32 px, x −12 px, scale 0.92 from its top-left, on a spring
  760 / 46 / 0.5 (a value present on first render places it without animation). Field: resting `--border` on `--muted` 70 % with
  an inner shadow; focused `--primary` on `--card`; invalid `--destructive` on `--card`; disabled 55 % opacity.
- Keyboard: native input; the label is a real `<label for>`; the hint is linked with `aria-describedby`; `aria-invalid` and
  `aria-required` follow the props.
