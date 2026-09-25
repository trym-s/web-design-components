# The typer

- Most headlines fade in. The nice ones type in. A wave runs across the line, and as it passes each letter the letter flickers through a few states, a solid pill, a highlight, an outlined pill, then lands on plain text. Letters next to each other in the same state merge into one long rounded bar.
- Below you can type your own text and change the color, the speed, and which states are in the mix. The colors are three variables, so it drops onto any theme.

## Classification

- Category: `typography` — decorative
- Medium: vanilla TS + CSS
- Entry point: `upstream/typer/standalone/typer.html`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`
- `upstream/typer/standalone/typer.ts`
- `upstream/typer/standalone/typer.css`
- `upstream/typer/standalone/typer.html`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/typer

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and
`tailwind-merge`; `typer-engine.ts` is the framework-free upstream engine and `typer.css` the state styles. `src/demo.tsx`
replays three lines and a custom input.

### TyperText — `typer.tsx`

- Props: `text`, `play` (`in` | `out` | `inout`; omitted → reveal once when `threshold` (0.4) of the line scrolls into view),
  `replayKey` (change to replay the current phase), `fps` (20), `cycles` (3 random states per character), `cycleLength`
  (0.5 — share of frames spent settling), `delay` (s), `variations` (subset of `charFill`, `charInverse`, `charAccent`,
  `charAccentInverse`, `charAccentFill`, `charBorder`), `initVisible` (false), `className`, `style`.
- Structure: an inline `span[data-typer]`; the engine fills it with `.word` spans (white-space: pre) of inline-block `.char`
  spans. Theme variables on `[data-typer]` (override on the element or any ancestor): `--typer-fg` (`var(--foreground)`),
  `--typer-bg` (`var(--background)`), `--typer-accent` (`oklch(0.622 0.163 151)`), `--typer-accent-ink`
  (`oklch(0.991 0 0)`), `--typer-radius` (`--radius − 5px`).
- States (a class per character, swapped per frame — no tweening): `charInit` transparent; `charFill` ink pill with knockout
  text; `charInverse` plain ink; `charAccent` accent text; `charAccentFill` accent pill with accent-ink text;
  `charAccentInverse` / `charBorder` outlined variants. Adjacent characters in the same pill state merge: only the outer ends
  of a run are rounded, so a run reads as one bar. Before the first frame the whole line has opacity 0.
- Motion: a timer at `fps` walks the line left to right; the frame count is `fps × (1 + 1 % per character)`. A character the
  sweep has passed rolls through `cycles` random states from the pool, then settles to plain text (`in`) or `charInit`
  (`out`); `inout` runs in then out. Changing `text` rebuilds the spans and replays `in`.
- Keyboard: none (text effect); the final text is real text in the DOM.
