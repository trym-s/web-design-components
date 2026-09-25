# Menu Dropdown

Contextual menus, dropdowns, popovers — anything that opens from a trigger and should visually grow from that trigger's position.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the origin-aware scale in/out

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `lucide-react` (demo icons), `clsx` and `tailwind-merge` (through `lib/utils.ts`). `menu-dropdown.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### MenuDropdown / MenuDropdownItem — `menu-dropdown.tsx`

- `MenuDropdown` props: `open`, `origin` (`top-left` default, `top-center`, `top-right`, `bottom-left`, `bottom-center`,
  `bottom-right` — the corner nearest the trigger), `children`, `id`, `className`. `MenuDropdownItem`: `children`, `onSelect()`.
- Structure: a 224 px `role="menu"` panel (`--popover`, `rounded-xl`, 6 px padding, `shadow-lg` + `--border` ring); items are
  36 px `role="menuitem"` buttons (hover/focus `--accent`). The caller positions it next to its trigger.
- Motion: opening scales from `--dropdown-pre-scale` (0.97) and opacity 0 to 1 over `--dropdown-open-dur` (250 ms), growing
  from `transform-origin` = `origin`; closing goes to `--dropdown-closing-scale` (0.99) + opacity 0 over `--dropdown-close-dur`
  (150 ms), then the panel becomes `invisible`; easing `cubic-bezier(0.22, 1, 0.36, 1)`. `aria-hidden` while not open.
- Keyboard: items are buttons (Tab / Enter). Add Escape-to-close and arrow-key roving in the host, as the demo does.
