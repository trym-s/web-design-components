# Fine-Tune Card

An agent adjusts layout, numeric, opacity, radius, or type properties in a compact inspector.

## Classification

- Category: `inspector` — interactive
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the scrub fields, sliding segmented control and edited/adjust header state.
- Use when: an agent adjusts layout, numeric, opacity, radius, or type properties in a compact inspector.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--muted`, `--primary`, `--border`, `--input`, …).
It imports only `react`, `clsx` and `tailwind-merge`; `fine-tune-card.css` holds the `pop-in` and `shimmer-text`
keyframes. `src/demo.tsx` is sample data only.

### FineTuneCard — `fine-tune-card.tsx`

- Props: `title`, `defaultValue` (`{ layout: "row" | "col" | "grid", width, height, radius, opacity, type: string | null }` —
  also the baseline the "Edited" state compares against), `value` / `onValueChange(next)` (controlled when `value` is set),
  `typeOptions`, `typePlaceholder` ("Select type"), `className`.
- Structure: card up to 240 px wide, `--card`, `rounded-lg`, `shadow-sm` + 1 px `--border` ring. Header (padding 10×12 px,
  bottom border): title 13 px medium; right side either "Adjust" (an 18 px `rounded-[radius−5px]` chip with `--primary`
  30 % border and 10 % fill holding a 9 px `--primary` sparkle, then 12 px medium text filled by a moving gradient
  `--primary` 35 % → `--primary` at 45 % alpha 50 % → `--primary` 65 %, 200 % wide, `shimmer-text` 1.4 s linear infinite) or
  "Edited" (`--success`, 10 px check, `pop-in` 250 ms `cubic-bezier(0.23,1,0.32,1)`). `--success` is declared on the root
  (light `oklch(0.603 0.155 150.9)`, dark `oklch(0.705 0.154 153.8)`). Layout section (padding 12 px, 8 px gaps, bottom
  border): "Layout" 12.5 px medium; a 3-column segmented control (`--muted` track, `rounded-md`, 2 px padding, 24 px
  buttons with row / column / grid glyphs of 6 px outlined squares) with a sliding thumb (`--card`, `rounded-sm`,
  `shadow-xs` + `--input` ring, width (100 % − 4 px)/3, translateX by index over 300 ms `cubic-bezier(0.23,1,0.32,1)`);
  two rows of two scrub fields (W 40–999, H 24–999, Radius 0–64, Opacity 0–100 %). Footer (padding 10×12 px): "Type"
  12 px muted and a 120 px select button (26 px, `rounded-sm`, `--muted`, 1 px `--border` ring, 11 px chevron).
- States: header switches to "Edited" as soon as any value differs from `defaultValue`. Active segment glyph `--primary`,
  others `--muted-foreground` (200 ms). Select open: ring `--primary`, chevron rotated 180° (200 ms); menu above it
  (bottom 32 px, right-aligned, 120 px, `--card`, `rounded-lg`, `shadow-sm` + ring, 4 px padding, `pop-in` 200 ms from
  bottom right) with 26 px items (12.5 px, `rounded-sm`, `--muted` on hover and on the current value).
- Interactions: segment click sets `layout`; picking a menu item sets `type` and closes the menu.
- Keyboard: segments and select are native buttons (`aria-pressed`, `aria-expanded`).

### ScrubField — `fine-tune-card.tsx`

- Props: `label`, `value`, `onChange(v)`, `min`, `max`, `step` (1), `suffix`, `active`.
- Structure: 26 px row, `rounded-sm`, `--muted` fill, padding 4 px / 2 px left / 4 px right, 4 px gap: the label
  (`role="slider"`, 12 px `--muted-foreground`, `ew-resize` cursor), a borderless numeric input (12 px tabular
  `--foreground`), optional suffix (11.5 px muted).
- States: `active` → `--primary` 10 % fill + 1 px `--primary` ring (200 ms). Label hover `--foreground`, focus `--primary`.
- Interactions: drag the label horizontally — the value changes by `step` per 2 px from where the drag started (pointer
  capture); typing keeps digits and `-`; every value is rounded and clamped to `min…max`.
- Keyboard: label focused: ArrowUp/ArrowRight +`step`, ArrowDown/ArrowLeft −`step`, with Shift ×10.
