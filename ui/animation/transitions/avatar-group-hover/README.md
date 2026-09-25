# Avatar Group Hover

Hovering an item in a horizontal stack (avatar row, chip group, badge cluster, segmented button) should lift the hovered item, gently lift its neighbors with a power-falloff, then snap everything back with an overshoot spring on `mouseleave`.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the falloff lift and overshoot return

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `avatar-group-hover.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### AvatarGroup — `avatar-group-hover.tsx`

- Props: `items` (nodes: avatars, chips, badges), `itemClassName` (e.g. the overlap `-ml-1.5 first:ml-0`), `className`.
- Structure: a horizontal flex row; each item is wrapped in a `.t-avatar` whose transform is
  `translateY(var(--shift)) scale(var(--scale-active))`.
- Motion: hovering item i lifts it by `--avatar-lift` (−4 px) and scales it `--avatar-scale` (1.05); every other item j lifts
  by `lift × --avatar-falloff^|i−j|` (0.45 power falloff). Transitions last `--avatar-dur` (320 ms): entering uses
  `--avatar-ease-in` `cubic-bezier(0.22, 1, 0.36, 1)`; leaving the row snaps everything back with the overshooting
  `--avatar-ease-out` `cubic-bezier(0.34, 3.85, 0.64, 1)`. Reduced motion: no transform.
- Keyboard: none (hover cue); items keep their own semantics.
