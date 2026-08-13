# The typer

- Most headlines fade in. The nice ones type in. A wave runs across the line, and as it passes each letter the letter flickers through a few states, a solid pill, a highlight, an outlined pill, then lands on plain text. Letters next to each other in the same state merge into one long rounded bar.
- Below you can type your own text and change the color, the speed, and which states are in the mix. The colors are three variables, so it drops onto any theme.

## Classification

- Category: `typography` — decorative
- Medium: vanilla TS + CSS
- Entry point: `src/typer/standalone/typer.html`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/typer/standalone/typer.ts`
- `src/typer/standalone/typer.css`
- `src/typer/standalone/typer.html`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `src/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/typer
