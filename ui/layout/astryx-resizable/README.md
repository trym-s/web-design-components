# Resizable

Hook-based resizable panel system. useResizable() manages size state and ResizeHandle provides the interactive pill-grip separator. Pass resize props to existing layout components via their resizable prop.

## Classification

- Category: `layout` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Resizable.doc.mjs`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Hook-based resizable panel system.
- Avoid when: Wrap panels in extra container components for resize. The hook-first architecture avoids extra DOM; use it directly on existing components.
- Provides: Handle, Grip pill, Grab zone
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ResizableShowcase, ResizableSidebar
- Upstream: Astryx core · Layout
- Keywords: resize, resizable, split, splitter, panel, drag, separator, divider, handle, grip

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

- `src/examples/ResizableShowcase.tsx` — Resizable: Horizontal resizable split with a draggable handle between two panels. · static: `static/ResizableShowcase.html`
- `src/examples/ResizableSidebar.tsx` — Resizable — Collapsible with snap points: A collapsible sidebar with snap points, driven by useResizable. Dragging snaps to preset widths, dragging past the minimum collapses the panel, and the expand method restores it programmatically. · static: `static/ResizableSidebar.html`

## Documentation

### Resizable

Hook-based resizable panel system. useResizable() manages size state and ResizeHandle provides the interactive pill-grip separator. Pass resize props to existing layout components via their resizable prop.

**Do**

- Use percent(value, {min: pixel(value)}) or percent(value, {max: pixel(value)}) when a percentage needs exactly one pixel floor or ceiling. Reuse Table’s pixel() helper; numbers, exact Npx, and pixel(value) remain pixels. State, persistence, callbacks, paint, and ARIA remain resolved pixels.
- Use useResizable() with existing Astryx layout components. Pass the returned props to the resizable prop on LayoutPanel or SideNav.
- Provide an accessible label on each ResizeHandle when multiple handles exist (e.g. "Resize sidebar", "Resize terminal").

**Don't**

- Wrap panels in extra container components for resize. The hook-first architecture avoids extra DOM; use it directly on existing components.

**Anatomy**

- Handle (required) — Focusable separator that owns pointer and keyboard resize interaction.
- Grip pill — Default visible grip indicator; custom handle content can replace it.
- Grab zone (required) — Invisible enlarged pointer region aligned with the grip or divider.

Styling hook class: `.astryx-resize-handle`, `.astryx-resize-handle-pill`

## Files

- `src/Resizable.doc.mjs`
- `src/Resizable.spec.md`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Resizable
