# Swipe Deck

A stack you decide through.

## Classification

- Category: `gesture` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/swipe-deck.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/swipe-deck.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/swipe-deck

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--border`, `--muted`, `--accent`,
`--primary`, `--foreground`, `--muted-foreground`, `--radius`). It imports only `react` and `motion` (`motion/react`).
`src/demo.tsx` is sample data and wiring only (a stack of cards and their content).

### SwipeDeck — `swipe-deck.tsx`

- Props: `items`, `itemKey(item)`, `itemLabel(item)` (spoken), `children(item)` (card content), `onDecide(item, "left" |
  "right")`, `onUndo(item)`, `label` ("Card deck"), `leftLabel` ("Skip"), `rightLabel` ("Keep"), `undoLabel` ("Undo"),
  `emptyLabel` ("Deck cleared"), `height` (card px, 180), `threshold` (px of drag that commits, 92), `steps` (intent
  granularity, 6), `peek` (cards rendered, 3), `className`. `useSwipeDeck({ count, threshold, steps, flick (px/s, 520),
  onDecide, onUndo, disabled })` is exported (index, intent, decide/undo/report/release, `deckProps`).
- Structure: a focusable deck (`role="group"`, `aria-roledescription="card deck"`, height `height + 26`, radius
  `calc(var(--radius) + 4px)`, edges masked 20 px on each side). Cards are absolutely stacked, inset 20 px, radius
  `calc(var(--radius) + 4px)`, 1 px `--border`, `--card`; top card `shadow-lg`, the ones behind `shadow-sm`, each deeper card
  10 px lower and 4.5 % smaller. The top card shows "Skip"/"Keep" badges (10.5 px semibold uppercase, tracking 0.08em, `--card`,
  `--border` outline, `--foreground`) top-left/right whose opacity follows the drag; at the threshold they turn `--primary`.
  Behind the stack an empty panel (`--muted` at 70 %, `shadow-inner`, 12.5 px `--muted-foreground`) fades in when done.
  Below: `h-8` Skip (× icon) and Keep (✓ icon) buttons (radius `calc(var(--radius) - 1px)`, `--border`, `--card`, hover
  `--accent`) and a 10.5 px mono "N left" counter with an Undo text button.
- States: dragging — rotation ±8° per 200 px, fading out past 150 px, scale 1.03; the card below rises and grows in proportion to
  the intent. Release past `threshold`, or a flick ≥ 520 px/s after ≥ 35 % of it, throws the card 560 px sideways (300 ms,
  `cubic-bezier(0.4, 0, 1, 1)`); otherwise it springs back (bounce stiffness 260 / damping 34). Undo brings the last card back
  in from its side (spring 150 / 27 / 1). Stack moves use spring 260 / 34 / 0.8 (the new top card after a 100 ms delay); badges
  spring 520 / 34 / 0.45. Done: side buttons fade out and go inert; Undo hides when nothing to undo. A polite live region reads
  "<label>. Card N of M." or the empty label. Reduced motion: no transitions.
- Interactions: horizontal drag (direction-locked, `touch-action: pan-y`) on the top card; buttons decide/undo.
- Keyboard: focus the deck (focus-visible: 1 px `--primary` ring); ArrowLeft = left, ArrowRight = right, Backspace/Delete = undo,
  Escape clears a pending intent. Buttons are native (Tab, Enter/Space).
