# Password Strength

Strength read segment by segment.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/password-strength.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/password-strength.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/password-strength

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### PasswordStrength — `password-strength.tsx`

- Props: `value` (the password — pair it with your own input), `rules` (default: 12+ characters, upper and lower case, a
  number, a symbol; each `{ id, label, test(value) }`), `labels` (`Empty`, `Weak`, `Fair`, `Good`, `Strong`), `announceDelay`
  (700 ms), `showRules` (true), `className`. Also exports `usePasswordStrength(value, options)` → `score`, `max`, `label`,
  `rules` (with `met`), `guessable`, `announcement`, and `defaultPasswordRules`.
- Scoring: 0 when empty; 1 when the value starts with a common password or contains a 4× repeated character or a keyboard /
  alphabet run (1234, abcd, qwer, asdf …) — flagged "Commonly guessed"; otherwise the number of rules met (at least 1).
- Structure: a `role="meter"` (`aria-valuenow` = score, `aria-valuetext` = label) of `max` equal 6 px segments, 6 px apart
  (`--foreground` at 10 % track, radius `--radius − 8px`); a 20 px row with the strength label (12.5 px medium) and the
  "Commonly guessed" note (11.5 px `--warning`); then a checklist: 14 px box (1 px `--border`, fills `--success` with a white
  check when met) and the rule label (`--foreground` met, `--muted-foreground` not).
- States / motion: segments fill left to right (scaleX from the left, spring 520 / 34 / 0.45, 30 ms apart). Tone by ratio
  score/max: ≤ 0.34 `--destructive`, ≤ 0.67 `--warning`, above `--success` (bars and label, colour transition 200 ms). Labels
  and the note cross-fade (spring 260 / 34 / 0.8); checks pop from scale 0.6. `--success` / `--warning` are declared on the
  root (upstream emerald / amber, light and dark).
- Accessibility: a polite live region reads "Password strength fair. Still needed: …" once typing pauses for `announceDelay`.
