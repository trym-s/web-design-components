# useLayer

Core positioning hook for rendering overlay content using CSS Anchor Positioning and the Popover API. Use it as the foundation for custom popovers, hover cards, tooltips, and fixed-position layers when higher-level components are not enough.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useLayer.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Core positioning hook for rendering overlay content using CSS Anchor Positioning and the Popover API.
- Avoid when: Implement ARIA patterns directly in a Layer unless you also own the full accessibility behavior.
- Provides: useLayer
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: LayerHookUsage
- Upstream: Astryx core · interaction
- Keywords: layer, overlay, popover, positioning, anchor, floating, dropdown, popper, popup, portal

## How an agent uses this reference

- **React 19 target** — install `@astryxdesign/core` + a theme and copy the example from
  `upstream/examples/` as-is, or read `upstream/` to own the component (upstream calls this "swizzle").
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the
  rendered DOM of each example with every class resolved by the local stylesheets in
  `ui/_sources/astryx/` (`frame.css` pulls fonts, reset, component CSS and all seven themes).
  Keep the markup, the `data-astryx-theme` wrapper and the `--*` tokens; re-implement behavior
  from the Props / Accessibility sections below, never from the minified class names.
- Design rules shared by every component: `ui/_sources/astryx/docs/` (principles, tokens, color,
  spacing, typography, motion, layout).
- Hooks carry behavior only: port the logic, keep the accessibility contract.

## Examples

- `upstream/examples/LayerHookUsage.tsx` — useLayer — Anchored Layer: Low-level anchored overlay rendered with useLayer and a custom surface. · static: `static/LayerHookUsage.html`

## Documentation

### useLayer

Import: `@astryxdesign/core/Layer`

Core positioning hook for rendering overlay content using CSS Anchor Positioning and the Popover API. Use it as the foundation for custom popovers, hover cards, tooltips, and fixed-position layers when higher-level components are not enough.

**Do**

- Use context mode for anchor-positioned overlays relative to a trigger element, and fixed mode for manually positioned overlays at specific coordinates.
- Build on higher-level components like Popover, HoverCard, and Tooltip for common overlay patterns.
- Rely on the Popover API top layer to escape ancestor clipping and stacking, and host the layer near its trigger rather than in the body so it inherits the trigger's theme cascade and keeps a natural focus order.

**Don't**

- Implement ARIA patterns directly in a Layer unless you also own the full accessibility behavior.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` * | `'context' \| 'fixed'` |  | Positioning strategy: context uses CSS anchor positioning relative to a trigger ref; fixed uses explicit x/y coordinates. |
| `onShow` | `() => void` |  | Callback fired when the layer becomes visible. |
| `onHide` | `() => void` |  | Callback fired when the layer is hidden. |
| `lightDismiss` | `boolean` | `false` | Whether clicking outside should dismiss the layer using native popover light-dismiss behavior. |
| `lazyMount` | `boolean` | `false` | Context mode only. Wait until show() to resolve the inline/portal position and mount content; hide unmounts the content while the inert marker remains. |

**Returns**

```ts
[
  {
    "name": "ref",
    "type": "RefCallback<HTMLElement> | undefined",
    "description": "Trigger ref for context mode. Undefined in fixed mode."
  },
  {
    "name": "anchorId",
    "type": "string",
    "description": "CSS anchor name for context mode positioning."
  },
  {
    "name": "show",
    "type": "() => void",
    "description": "Imperatively show the layer."
  },
  {
    "name": "hide",
    "type": "() => void",
    "description": "Imperatively hide the layer."
  },
  {
    "name": "isOpen",
    "type": "boolean",
    "description": "Whether the layer is currently open."
  },
  {
    "name": "id",
    "type": "string",
    "description": "Unique ID for aria-describedby or other ARIA relationships."
  },
  {
    "name": "render",
    "type": "(children: ReactNode, props: ContextRenderProps | FixedRenderProps) => ReactNode",
    "description": "Render function for the popover element. Pass placement/alignment in context mode or x/y in fixed mode. Placement/alignment are logical: they map to the self-* position-area keyword family, which resolves against the popover's own inherited direction, so RTL contexts mirror automatically in pure CSS. Pass `positioning: \"custom\"` in context mode to author position styles yourself via `style` (e.g. explicit anchor() insets or an anchor-size() cover): the hook keeps the popover behavior and position-anchor wiring but derives no position styles, including the automatic RTL mirroring, which becomes your responsibility. Pass `offset` (a CSS length; a number is px) in context mode for clearance from the anchor: it applies to both edges of the placement axis, so the gap survives a flip. Layers are flush by default. Context mode first renders an inert `<template>` marker in matching server and client markup. The final layer stays at that JSX position if its parent is safe; otherwise it is portaled to the nearest ancestor outside paragraphs, links, buttons, inline formatting, and structurally restricted containers. The nearest safe host keeps CSS custom properties inheriting live, while the layer preserves direction and writing mode from its JSX position. By default this resolution occurs after hydration so closed-layer DOM remains available; `lazyMount` defers it until `show()` and unmounts the content again on hide while the marker remains. The Popover API promotes the layer to the top layer when shown, so it escapes ancestor clipping and stacking wherever it is hosted. When the layer would overflow the viewport, position-try fallbacks flip it to the opposite side; centered layers additionally slide along the alignment axis (span fallbacks) so they stay on-screen near viewport edges."
  }
]
```

## Files

- `upstream/useLayer.doc.mjs`
- `upstream/useLayer.tsx`
- `upstream/useLayerDismissal.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useLayer
