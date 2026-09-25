# Collapsible Banner

Folds to its title, or lets go entirely.

## Classification

- Category: `notification` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/collapsible-banner.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/collapsible-banner.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/collapsible-banner

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### CollapsibleBanner — `collapsible-banner.tsx`

- Props: `title`, `description`, `children`, `action` (e.g. a button), `icon` (default an info glyph), `dismissible` (true),
  `state` / `defaultState` (`open` | `folded` | `dismissed`) / `onStateChange(state)`, `onDismiss()`, `dismissLabel`
  ("Dismiss notice"), `dismissedMessage` ("Notice dismissed."), `className`. Also exports `useCollapsibleBanner(options)`
  (`fold`, `expand`, `toggle`, `dismiss`, `restore`).
- Structure: a `role="region"` `--card` box (radius `--radius + 1px`, 1 px `--border`, `shadow-sm`). Header row (10 px padding,
  10 px gaps): a 26 px icon tile (`--muted` at 70 %, inner shadow, radius `--radius − 3px`), the title as a full-width toggle
  button (13 px medium, truncated) with a 14 px caret, and a 26 px × button. The body is indented to the title (46 px left
  padding): description 12.5 px relaxed `--muted-foreground`, children, and the action 8 px below.
- States / motion: folding animates the body's height to 0 and fades it (height spring 190 / 30 / 1, opacity 140 ms after a
  50 ms delay when opening) while the content drifts 6 px up; the caret rotates 180° (spring 700 / 46 / 0.5). Dismissing
  collapses the whole banner to 0 height and fades it; a polite status announces `dismissedMessage`. The folded body is
  `inert`.
- Keyboard: the title button has `aria-expanded` / `aria-controls`; Enter / Space toggles; Escape on it folds an open banner;
  × is a labelled button. Focus-visible: 1 px `--primary` inset ring.
