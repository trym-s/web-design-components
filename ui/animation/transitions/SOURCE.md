# Source

- Upstream: https://github.com/Jakubantalik/transitions.dev
- Captured commit: `06f81950a67c1a89bd418be91f8a26ebca6472a9`
- Captured: 2026-08-11
- Live reference: https://transitions.dev/
- Terms: https://transitions.dev/terms.html

Each directory here contains the free transition's CSS. `reference.tsx` is the upstream React-tab code when available; the six newer CSS-only entries have a minimal React binding marked in their header.

The transition snippets may be used in products, but the collection or a substantial part of it may not be republished as a competing library, template pack, or component kit. Keep this directory private unless redistribution permission changes.

## Token mapping for `src/`

The transition CSS is mostly colour-free; each entry's `src/<slug>.css` keeps it verbatim (timings, easings and
distances stay `:root` custom properties) and moves the few colours out (AGENTS.md, Entry layout, rule 2). The demo
surfaces (cards, pills, menus, tooltips) use shadcn tokens: surfaces `card` / `popover`, text `foreground` /
`muted-foreground`, rings `border`, tracks `input` / `secondary`, fills `primary`, errors `destructive`. The colours that
carry the effect itself are declared by the component on its root with the upstream value as an oklch default:
`--like-color` (like button, upstream `#f40051`), `--shimmer-base` / `--shimmer-highlight` (shimmer text, mapped to
`muted-foreground` / `foreground`), `--tilt-glare` (card tilt, white). Mask-only stops use the `black` keyword; the one
fixed corner radius (plus-menu morph, 20 px) becomes `calc(var(--radius) * 2)`.
