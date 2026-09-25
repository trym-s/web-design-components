# shadcn/ui Mira style

One of the eight shadcn/ui styles. The bank's component references are captured in Nova; this file maps the same `cn-*` slots to the Mira look.

## Classification

- Category: `theme` — decorative
- Medium: CSS (`@apply` map from `cn-*` component slots to Tailwind utilities)
- Framework: css
- Entry point: `src/style-mira.css`
- Nature: decorative; supplies look-and-feel only — never lift layout or interaction from it.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: The Mira visual style of shadcn/ui is wanted for the same components.
- Provides: per-slot utility classes for every shadcn component under `.style-mira`
- Requires: Tailwind v4 and the shadcn tokens; components written against the `cn-*` slots (`registry/bases/*`)
- Variants: default

## How an agent uses this reference

- Install components in this style: `npx shadcn@latest init` and pick Mira, or read
  `https://ui.shadcn.com/r/styles/radix-mira/<component>.json` — the registry resolves each `cn-*` slot into the utilities below.
- Hand-port: take the utilities of a slot, e.g. `.cn-button` → `focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding text-xs/relaxed font-medium focus-visible:ring-2 aria-invalid:ring-2 active:not-aria-[haspopup]:translate-y-px [&_svg:not([class*='size-'])]:size-4`.

## Files

- `src/style-mira.css`

Upstream page: https://ui.shadcn.com/create
