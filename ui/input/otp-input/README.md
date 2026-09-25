# OTP Input

Auto advance, paste, error recovery.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/otp-input.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/otp-input.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/otp-input

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### OtpInput — `otp-input.tsx`

- Props: `length` (6), `mode` (`numeric` | `alphanumeric` — other characters are dropped), `defaultValue`, `onChange(value)`,
  `onComplete(value)` (every cell filled), `status` (`idle` | `error` | `success` — the caller verifies), `errorMessage`,
  `successMessage`, `hint`, `label` ("Verification code"), `groupEvery` (3 — extra 12 px gap between groups), `disabled`,
  `autoFocus`, `focusOnError` (true — jumps back to the first cell when `status` turns `error`), `className`, `ref`
  (`{ clear(), focus() }`). Also exports `useOtpInput(options)` → `chars`, `value`, `complete`, `focusedIndex`,
  `getCellProps(i)`, `focusAt(i)`, `clear()`.
- Structure: a `role="group"` row of 40×48 px cells, 8 px apart; each is a real one-character `<input>` (radius `--radius`, 2 px
  border, transparent text and caret) with an overlay that renders the character (mono 15 px tabular) or, in the focused
  empty cell, a 1.5×17 px `--foreground` caret blinking at 1.06 s. The first cell has `autocomplete="one-time-code"`. Below,
  a 16 px message line (11.5 px): hint in `--muted-foreground`, error in `--destructive`, success in `--success`.
- States: empty cell `--border` on `--muted` 70 % with an inner shadow; filled `--border` on `--card`; focused `--primary`;
  every cell `--destructive` on error, `--success` on success (`--success` declared on the root: `oklch(0.596 0.145 163.2)`,
  dark `oklch(0.765 0.177 163.2)`). A new character rises in (opacity 0, y 10 px, scale 0.97, blur 6 px → rest, 220 ms,
  `cubic-bezier(0.23, 1, 0.32, 1)`); a removed one leaves upward (y −6 px, blur 3 px). On error the row shakes x 0 → −5 → 4 →
  −3 → 0 px over 320 ms. Messages cross-fade with a 3 px slide (spring 260 / 34 / 0.8).
- Interactions: typing fills and advances; typing into a filled cell replaces it; pasting (or an SMS autofill) spreads the
  code from the current cell, or from the first when it is a full code; focusing a cell after an empty one jumps to the first
  empty cell.
- Keyboard: Backspace clears the cell, or the previous one when already empty (and moves back); Delete clears in place;
  ArrowLeft / ArrowRight move; Home / End jump to the first / last cell. Each cell is labelled "label, character i of n";
  the message is announced through a status region.
