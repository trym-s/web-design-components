# Recommendation Card

An agent suggestion needs confidence, alternatives, and an explicit accept action.

## Classification

- Category: `ai` — agent decision
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the fixed-shape card with confidence meter, alternatives drawer and primary accept action
- Use when: an agent suggestion needs confidence, alternatives, and an explicit accept action.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site
- Shared styles: `ui/_sources/beautiful-ui/styles.css` (token mapping in `ui/_sources/beautiful-ui/SOURCE.md`)

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--muted`, `--primary`, `--input`, …).
It imports only `react`, `clsx` and `tailwind-merge`; `recommendation-card.css` holds the `fade-in` keyframes.
`src/demo.tsx` is sample data only (three options; the inline code chips are styled there with `--primary` / `--warning`).

### RecommendationCard — `recommendation-card.tsx`

- Props: `title`, `options` (`{ key, body, short, signal 0–3, tone: "success" | "warning" | "muted", label, cta,
  ctaVariant?: "primary" | "foreground" }[]`), `defaultSelected` (0), `onSelect(option)` when an alternative is promoted,
  `onAccept(option)`, `alternativesLabel` ("Alternatives"), `acceptedLabel` ("Accepted"), `className`.
- Structure: card, max-width 380 px, `--card` fill, `rounded-lg`, `shadow-xs` + 1 px `--border` ring, overflow hidden.
  Body (12 px padding): title 13 px semibold `--foreground`; the active option's body below (6 px gap, 13 px, relaxed
  line-height, `--muted-foreground`, min-height 48 px). Drawer (hidden by default): top border, `--muted` fill, 8 px
  padding, an 11 px "Other options" caption and one full-width row per non-active option — meter, `short` (12.5 px,
  truncates) and `label` (11 px `--muted-foreground`), `rounded-md`, hover `--accent`. Footer (10×12 px padding, top border,
  `--muted` fill): meter + label (12.5 px medium `--muted-foreground`) on the left; on the right an "Alternatives" button
  (28 px high, 10 px side padding, `--card`, `shadow-xs` + `--input` ring) and the CTA (28 px high, 12 px side padding,
  `--recommendation-card-shadow`: a 14 % white top highlight, a 12 % dark hairline and a soft drop).
- Meter: three 4×10 px round bars, 2 px apart; the first `signal` bars take the tone colour (`--success`, `--warning`
  or `--muted-foreground`), the rest `--input`; colour changes in 300 ms.
- States: body text swaps with `fade-in` 180 ms ease-out. Drawer opens by animating `grid-template-rows` 0fr→1fr and
  opacity over 300 ms `cubic-bezier(0.16,1,0.3,1)`; "Alternatives" shows `--accent` while open (`aria-expanded`). CTA:
  `primary` → `--primary` / `--primary-foreground`; `foreground` → `--foreground` fill with `--muted` text; after
  accepting → `--success` fill, white text, label "Accepted" until another option is picked. `--success` / `--warning`
  are declared on the root (light `oklch(0.603 0.155 150.9)` / `oklch(0.689 0.179 49.9)`, dark
  `oklch(0.705 0.154 153.8)` / `oklch(0.746 0.156 55.6)`).
- Interactions: "Alternatives" toggles the drawer; picking a row makes it the active option, clears the accepted state and
  closes the drawer. Buttons scale to 0.96 while pressed.
- Keyboard: native buttons; drawer rows are removed from the Tab order while the drawer is closed.
