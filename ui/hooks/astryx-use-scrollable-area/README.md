# useScrollableArea

Adds canonical axis-aware scroll behavior to structure owned by the caller. An axis is effective only when its computed overflow is scroll-capable and geometry exceeds the shared 1px tolerance. Both viewport and content boxes are observed.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useScrollableArea.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Adds canonical axis-aware scroll behavior to structure owned by the caller.
- Avoid when: Attach only the viewport getter. A real observed content box is required for live overflow changes.
- Provides: useScrollableArea
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · layout
- Keywords: scroll, overflow, logical axis, keyboard, overscroll, sticky, resize

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

- None of its own upstream; the demo is its family's: `ui/hooks/astryx-use-container-reveal`.

## Documentation

### useScrollableArea

Import: `@astryxdesign/core/hooks`

Adds canonical axis-aware scroll behavior to structure owned by the caller. An axis is effective only when its computed overflow is scroll-capable and geometry exceeds the shared 1px tolerance. Both viewport and content boxes are observed.

**Do**

- Pass already-resolved props and refs through both prop getters, then spread each returned object once.
- Use viewport keyboard ownership only when the viewport itself should enter the tab order; provide a concise accessible label.
- Use contentOrViewport to delegate forward Tab entry to the first sequential native link or button when it preserves native scroll keys. Inputs, composite widgets, and nested scroll areas retain the named viewport stop. Shift+Tab from the delegated first child skips the viewport; pointer and programmatic focus stay on it.
- Use content keyboard ownership when your integration already supplies keyboard access to the full scroll range. Automatic delegation checks current content at each keyboard entry without continuously tracking its focusability.
- Pass caller `xstyle` through `getViewportProps`; the getter composes it with fitting clip, active overflow, and Sticky containment.

**Don't**

- Attach only the viewport getter. A real observed content box is required for live overflow changes.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` * | `UseScrollableAreaOptions` |  | Logical scroll intent, fixed or automatic keyboard owner, overscroll policy, and fitting Sticky containment. |

**Returns**

```ts
[
  {
    "name": "getViewportProps",
    "type": "<E extends HTMLElement>(props?: ScrollableElementProps<E>) => ScrollableElementProps<E>",
    "description": "Consumes caller viewport props, xstyle, and refs; composes fitting/active overflow, Sticky containment, accessibility, chaining, and owner registration."
  },
  {
    "name": "getContentProps",
    "type": "<E extends HTMLElement>(props?: ScrollableElementProps<E>) => ScrollableElementProps<E>",
    "description": "Composes caller content-box props and refs with content observation."
  },
  {
    "name": "state",
    "type": "ScrollableAreaState",
    "description": "Stable inline and block effective-scroll and logical-edge state."
  }
]
```

## Files

- `upstream/useScrollableArea.doc.mjs`
- `upstream/useScrollableArea.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useScrollableArea
