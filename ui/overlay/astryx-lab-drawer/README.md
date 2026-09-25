# Drawer

A side panel that floats above page content for inspectors and detail views: the "click a table row, see its details" pattern. Unlike a docked panel it overlays the layout instead of reflowing it. Works on desktop and touch: the width budget applies on desktop and the panel preserves a 56px page reveal below 640px without exceeding the width budget. Escape closes the drawer and focus returns to the element that opened it. Entry/exit slide animation respects prefers-reduced-motion. Stacking contract: sibling drawers stack last-opened on top, Escape closes only the topmost, and closing peels innermost-first; render them as siblings, never nested.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Drawer.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A side panel that floats above page content for inspectors and detail views: the "click a table row, see its details" pattern.
- Avoid when: Use a Drawer for short confirmations or small forms; use Dialog or AlertDialog instead. Reach for a Drawer when the content should push the page aside; a Drawer floats over content, so use a docked panel or layout column instead. Use a Drawer as a bottom or top sheet; it is inline-axis only, so use BottomSheet for block-axis sheets. Nest a Drawer inside another Drawer; render drawers as siblings; the last-opened stacks on top and Escape closes it first.
- Provides: Drawer
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: Drawer
- Upstream: Astryx lab (experimental, canary-only upstream) · Overlay
- Keywords: drawer, side panel, panel, inspector, detail view, overlay, slide, sidebar, dialog, side drawer

## How an agent uses this reference

- **React 19 target** — install `@astryxdesign/core` + a theme and copy the example from
  `src/examples/` as-is, or read `src/` to own the component (upstream calls this "swizzle").
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the
  rendered DOM of each example with every class resolved by the local stylesheets in
  `ui/_sources/astryx/` (`frame.css` pulls fonts, reset, component CSS and all seven themes).
  Keep the markup, the `data-astryx-theme` wrapper and the `--*` tokens; re-implement behavior
  from the Props / Accessibility sections below, never from the minified class names.
- Design rules shared by every component: `ui/_sources/astryx/docs/` (principles, tokens, color,
  spacing, typography, motion, layout).

## Examples

- `src/stories/Drawer.stories.tsx` — Storybook — Drawer

## Documentation

### Drawer

A side panel that floats above page content for inspectors and detail views: the "click a table row, see its details" pattern. Unlike a docked panel it overlays the layout instead of reflowing it. Works on desktop and touch: the width budget applies on desktop and the panel preserves a 56px page reveal below 640px without exceeding the width budget. Escape closes the drawer and focus returns to the element that opened it. Entry/exit slide animation respects prefers-reduced-motion. Stacking contract: sibling drawers stack last-opened on top, Escape closes only the topmost, and closing peels innermost-first; render them as siblings, never nested.

**Do**

- Use for contextual detail views (row inspectors, entity details) where the user should keep the underlying list in sight.
- Keep the caller as the source of truth: derive isOpen from selection state and clear the selection in onOpenChange.
- Use hasScrim={false} for master-detail flows; non-modal drawers do not trap focus and the page behind stays interactive.
- Keep the last-selected item rendered on close: children stay mounted during the exit animation, so nulling content mid-close blanks the panel while it slides out.

**Don't**

- Use a Drawer for short confirmations or small forms; use Dialog or AlertDialog instead.
- Reach for a Drawer when the content should push the page aside; a Drawer floats over content, so use a docked panel or layout column instead.
- Use a Drawer as a bottom or top sheet; it is inline-axis only, so use BottomSheet for block-axis sheets.
- Nest a Drawer inside another Drawer; render drawers as siblings; the last-opened stacks on top and Escape closes it first.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isOpen` * | `boolean` |  | Whether the drawer is open. Fully controlled; pair with onOpenChange. |
| `onOpenChange` * | `(isOpen: boolean) => void` |  | Called when the drawer requests an open-state change. Escape, scrim click, and the built-in close button call it with false. The caller owns the open state. With sibling drawers open, Escape only closes the last-opened one. |
| `label` * | `string` |  | Accessible label for the drawer. Required; the drawer has no built-in heading to derive a name from. |
| `children` * | `ReactNode` |  | Drawer content, rendered inside a full-height scrollable area. Compose your own header/body/footer; an element with data-autofocus is focused on open. Children stay mounted during the exit animation; keep the last-selected item rendered instead of nulling content on close. |
| `side` | `'start' \| 'end'` | `'end'` | Edge the drawer slides from: 'end' is right in LTR (the inspector convention), 'start' is left. Inline axis only; for a bottom sheet use BottomSheet. |
| `width` | `number \| string` | `400` | Desktop width budget. A number is pixels; a string is any CSS length ('50%', '32rem'). Below the 640px mobile breakpoint this remains the maximum while the drawer preserves a 56px reveal of the page behind. |
| `isFullWidthOnMobile` | `boolean` | `false` | Cover the full viewport width below the 640px mobile breakpoint instead of preserving the default 56px reveal of the page behind. The reveal makes the drawer read as an overlay, not a navigation. |
| `hasScrim` | `boolean` | `true` | Modal scrim behind the drawer. true uses showModal() (top layer, focus trap, scroll lock; clicking the scrim closes; modal only); false uses show() for a non-modal overlay that does NOT trap focus and keeps the page behind interactive. |
| `hasCloseButton` | `boolean` | `true` | Built-in close button in the top-trailing corner. Enabled by default for both modal and non-modal drawers so every overlay has an obvious dismissal affordance. |

Styling hook class: `.astryx-drawer`

**Example — Wide desktop panel, full-width on mobile**

```tsx
const [isOpen, setIsOpen] = useState(false);
<Drawer
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  label="Filters"
  width={560}
  isFullWidthOnMobile>
  <FilterControls />
</Drawer>
```

**Example — Stacked drill-in (siblings, not nested)**

```tsx
const [order, setOrder] = useState(null);
const [lineItem, setLineItem] = useState(null);
<>
  <Drawer
    isOpen={order != null}
    onOpenChange={isOpen => !isOpen && setOrder(null)}
    label="Order details"
    hasScrim={false}>
    <OrderDetails order={order} onSelectLineItem={setLineItem} />
  </Drawer>
  <Drawer
    isOpen={lineItem != null}
    onOpenChange={isOpen => !isOpen && setLineItem(null)}
    label="Line item"
    hasScrim={false}>
    <LineItemDetails item={lineItem} />
  </Drawer>
</>
// Last-opened stacks on top; Escape closes the line item first.
```

## Files

- `src/Drawer.doc.mjs`
- `src/Drawer.spec.md`
- `src/Drawer.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
