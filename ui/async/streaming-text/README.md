# Streaming Text

Token by token with a caret.

## Classification

- Category: `async` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/streaming-text.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/streaming-text.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/streaming-text

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--ring`, …). It imports only `react` and `motion` (`motion/react`). `src/demo.tsx` is sample data and wiring only.

### StreamingText — `streaming-text.tsx`

- Props: `text` (the full text; changing it restarts), `tokensPerSecond` (18; paced at 4 characters per token, i.e. `1000 / (tokensPerSecond × 4)` ms per character, frame deltas capped at 64 ms), `autoStart` (true), `showSkip` (true: shows the Skip / Replay button), `label` (`"Streamed response"`), `onDone()`, `className`. The file also exports `useStreamingText({ text, tokensPerSecond, autoStart, onDone })` → `{ tokens, index, total, status, visible, start, pause, skip, reset }`.
- Structure: a `role="group"` with `aria-label` and `aria-busy` while streaming; 13.5 px relaxed `--foreground` text. The paragraph (`aria-hidden`, `white-space: pre-line`) reserves the final height with an invisible copy of the whole text and overlays the revealed slice plus a caret (2 px wide, 1.1 em tall, `--primary`). A hidden `role="status" aria-live="polite"` span receives the full text when done. Optional button row (right-aligned, 10 px above): 28 px high, `px-2.5`, 11.5 px medium `--muted-foreground` text (hover `--foreground`), 1 px `--border`, radius `calc(var(--radius) - 4px)`, crossfading "Skip" ↔ "Replay".
- States: `idle` / `paused` (caret blinks: on 45 %, off 50 % of a 1.06 s cycle), `streaming` (caret solid), `done` (caret fades out). Crossfades use a spring (stiffness 260, damping 34, mass 0.8). Reduced motion: the whole text appears at once and the status is `done`.
- Interactions: Skip jumps to the end; Replay restarts from the first character.
- Keyboard: the button is a native button (Enter / Space); focus-visible 2 px `--ring` ring.
