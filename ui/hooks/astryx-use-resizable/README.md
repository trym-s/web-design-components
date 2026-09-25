# useResizable

Hook for adding drag-to-resize behavior to layout regions. Supports single-region and multi-region configurations with snap points, collapsible panels, localStorage persistence, and cascade resize ordering.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useResizable.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Hook for adding drag-to-resize behavior to layout regions.
- Avoid when: Set minSize too small; content becomes unreadable. Prefer collapsible for panels that can hide entirely.
- Provides: useResizable
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (layout/astryx-resizable)
- Upstream: Astryx core · layout
- Keywords: resize, resizable, drag, split, panel, sidebar, divider, splitter

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
- Hooks carry behavior only: port the logic, keep the accessibility contract.

## Examples

- None of its own upstream; the demo is its family's: `ui/layout/astryx-resizable`.

## Documentation

### useResizable

Import: `@astryxdesign/core/Resizable`

Hook for adding drag-to-resize behavior to layout regions. Supports single-region and multi-region configurations with snap points, collapsible panels, localStorage persistence, and cascade resize ordering.

**Do**

- Use percent(40, {min: pixel(333)}) for a 40% size with a 333px floor, or percent(10, {max: pixel(400)}) for a 10% size with a 400px ceiling. The options argument is required and carries a floor XOR a ceiling.
- A structured default is an initial choice only; a structured minSize or maxSize remains live. State, persistence, callbacks, resize(), paint, and ARIA all use resolved pixel numbers.
- Import percent and Table’s same pixel binding from @astryxdesign/core/Resizable/utils when constructing configuration in a Server Component; the root package exposes one pixel symbol and one percent symbol without collision.
- Use with Layout or AppShell sidebar for resizable navigation panels.
- Set autoSaveId to persist user-chosen sizes across page reloads.

**Don't**

- Set minSize too small; content becomes unreadable. Prefer collapsible for panels that can hide entirely.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultSize` | `SizeValue \| ResizableSize` | `250` | Initial size. Numbers, exact "Npx", and pixel(value) are pixels. Exact "N%" has no additional pixel bound. percent(value, {min: pixel(value)}) or percent(value, {max: pixel(value)}) adds one pixel floor or ceiling. A percentage resolves ONCE into pixels — against containerRef when supplied, against the viewport otherwise — and does not track its basis afterwards. The released broad number \| string type remains compatible; runtime validation is authoritative. |
| `minSize` | `ResizableSize` | `50` | Minimum size. Numbers, exact "Npx", and pixel(value) remain pixels; exact "N%" has no additional pixel bound; percent(value, {min: pixel(value)}) or percent(value, {max: pixel(value)}) adds exactly one. Percentage minimums re-resolve when their basis changes and clamp the current pixel selection. |
| `maxSize` | `ResizableSize` | `Infinity` | Maximum size. Numbers, exact "Npx", and pixel(value) remain pixels; exact "N%" has no additional pixel bound; percent(value, {min: pixel(value)}) or percent(value, {max: pixel(value)}) adds exactly one. Percentage maximums re-resolve when their basis changes and clamp the current pixel selection. |
| `containerRef` | `RefObject<HTMLElement \| null>` |  | The element a percentage is a share of. Caller-owned: the hook never infers one. Omitted, percentages use the viewport, which is the released behaviour. The ref may point at a different element over time — the basis follows it. Until that element is actually laid out (not yet mounted, display:none, detached) percentages use a temporary 1200px basis rather than its zero measurement, and nothing is persisted from it. |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Which axis this region resizes along. Selects the container's inline or block content-box size as the percentage basis, and must match the direction given to ResizeHandle. |
| `collapsible` | `boolean` | `false` | Whether dragging below the collapsed threshold collapses the region to zero. |
| `snaps` | `number[]` |  | Pixel values to snap to during drag. |
| `autoSaveId` | `string` |  | Key for localStorage persistence of size and collapse state across sessions. |
| `defaultIsCollapsed` | `boolean` | `false` | Initial collapse state (uncontrolled). A persisted entry wins over it. |
| `isCollapsed` | `boolean` |  | Controlled collapse state. collapse(), expand() and a drag past the threshold then report through onCollapseChange instead of changing state internally. |
| `onCollapseChange` | `(isCollapsed: boolean) => void` |  | Called once per collapse state change, via drag or programmatically. |

**Returns**

```ts
[
  {
    "name": "size",
    "type": "number",
    "description": "Current size in pixels."
  },
  {
    "name": "isCollapsed",
    "type": "boolean",
    "description": "Whether the region is currently collapsed."
  },
  {
    "name": "collapse",
    "type": "() => void",
    "description": "Programmatically collapse the region."
  },
  {
    "name": "expand",
    "type": "() => void",
    "description": "Expand from collapsed state."
  },
  {
    "name": "resize",
    "type": "(size: number) => void",
    "description": "Resize to a specific pixel value."
  },
  {
    "name": "props",
    "type": "ResizableProps",
    "description": "Props to spread on the resizable component or pass to ResizeHandle."
  }
]
```

## Files

- `src/useResizable.doc.mjs`
- `src/useResizable.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useResizable
