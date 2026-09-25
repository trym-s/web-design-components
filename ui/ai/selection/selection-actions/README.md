# Selection Actions

Selected text needs an anchored AI toolbar for explaining, improving, shortening, changing tone, or fixing grammar.

## Classification

- Category: `ai` — inline editing
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the anchored pill toolbar, its width morphs, and the busy / confirm states
- Use when: selected text needs an anchored AI toolbar for explaining, improving, shortening, changing tone, or fixing grammar.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site
- Shared styles: `ui/_sources/beautiful-ui/styles.css` (token mapping in `ui/_sources/beautiful-ui/SOURCE.md`)

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--foreground`, `--primary`, …).
It imports only `react`, `lucide-react` (replacing the upstream `iconoir-react` icons), `clsx` and `tailwind-merge`;
`selection-actions.css` holds the keyframes and the stream tail/caret styles. `src/demo.tsx` simulates the model: 700 ms
thinking, then the rewrite streams in.

### SelectionActions — `selection-actions.tsx`

- Props: `before` / `selection` / `after` (paragraph content; `selection` is highlighted and the bar anchors to it), `open`
  (bar shown), `mode` (`idle` | `thinking` | `streaming` | `result`), `busyLabel` ("Editing"; the demo uses Improving /
  Shortening / Changing tone), `onAction("explain" | "improve" | "shorten" | "tone" | "grammar")`, `onPrompt(text)`, `onKeep()`,
  `onDiscard()`, `onRetry()`, `className`.
- Structure: a 460 px column; the paragraph is 13 px relaxed `--foreground`; the selection has a `--primary` 15 % background
  with a 3 px radius (`--radius − 7px`) cloned per line. The bar is absolutely positioned: centred on the selection's bounds,
  8 px below its last line; a 36 px `--card` pill (4 px padding, `shadow-lg` + 1 px `--border` ring) holding 28 px controls
  (12 px text, 14 px icons, hover `--accent`, press scale 0.96). Idle: a 145 px "Describe edits" input, a divider, Explain,
  Improve, a collapsed group (Shorten, Tone, Grammar), a divider and a 28 px chevron toggle; typing hides the presets and
  shows a 28 px `--foreground` send button. Busy: a 12 px spinner (`--input` ring, `--muted-foreground` top, 700 ms) and
  "{busyLabel}…" — with a text shimmer while thinking. Result: Keep (`--foreground` fill), Discard, divider, retry icon.
- States / motion: the bar fades in (180 ms) and pops in (scale 0.95→1, 220 ms) once positioned; it follows the selection with
  a 320 ms `cubic-bezier(0.77,0,0.175,1)` transform (re-measured on resize and whenever the selection text changes). Mode
  changes animate the pill width from the old to the new intrinsic width (320 ms `cubic-bezier(0.23,1,0.32,1)`). Expanding
  the presets rotates the chevron 180° and animates max-width/opacity over 400 ms; the input slides away (−8 px). Leaving idle
  collapses the presets; returning to idle clears the prompt.
- `StreamText` (also exported): reveals `text` `charsPerTick` (2) characters every `tickMs` (9) ms; the last `blurTail` (6)
  characters are blurred 1.6 px with a fading mask; a 2 px caret follows and blinks once done; `onDone` fires at the end.
- Keyboard: every control is a native button; the input submits on Enter (the prompt, or Improve when empty); the chevron
  exposes `aria-expanded` and "Show more / fewer actions"; retry and send have `aria-label`s.
