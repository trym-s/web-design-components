# Plus Menu Morph

A small circular trigger (a "+" FAB, a compose button, an add-action affordance) that **morphs into the menu / panel it opens** instead of popping a separate surface next to it.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the button-to-panel morph

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `lucide-react` (demo icons), `clsx` and `tailwind-merge` (through `lib/utils.ts`). `plus-menu-morph.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### PlusMenu — `plus-menu-morph.tsx`

- Props: `children` (menu items), `open` / `defaultOpen` / `onOpenChange(open)`, `aria-label` ("Open menu"), `className`.
- Structure: a `--popover` surface (`shadow-md` + `--border` ring) that is a 40 px circle when closed and a 183×172 px panel
  (radius `--morph-r-open` = 2 × `--radius`) when open; a 20 px "+" button pinned bottom-right; a `role="menu"` layer
  filling the panel (inert while closed).
- Motion: open — width/height/radius grow over `--morph-open-dur` (350 ms) on the springy `cubic-bezier(0.34, 1.25, 0.64, 1)`;
  the + slides left `--morph-slide` (40 px), blurs 2 px, fades out (`--morph-fade-dur` 200 ms) and rotates 45° / scales 0.97;
  the menu slides in from +40 px and scale 0.97 with a blur-to-sharp fade. Close reverses over `--morph-close-dur` (250 ms,
  `cubic-bezier(0.22, 1, 0.36, 1)`).
- Keyboard: the + is a button with `aria-expanded`; Escape and any click outside close it.
