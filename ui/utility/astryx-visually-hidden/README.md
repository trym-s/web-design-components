# VisuallyHidden

Renders content in the accessibility tree while hiding it visually. Use for accessible names on icon-only controls, aria-live announcement regions, and supplementary screen-reader context. Deliberately has no styling props; the whole point is to stay invisible.

## Classification

- Category: `utility` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/VisuallyHidden.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Renders content in the accessibility tree while hiding it visually.
- Avoid when: Use it to hide content from everyone; it stays in the accessibility tree; use conditional rendering or `hidden` to remove content entirely. Put interactive controls inside it; the content is not visible and cannot receive pointer input.
- Provides: VisuallyHidden, VisuallyHidden
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: VisuallyHiddenShowcase, VisuallyHiddenLiveRegion, VisuallyHiddenStructuralHeading, VisuallyHiddenSupplementaryContext
- Upstream: Astryx core · Utility
- Keywords: visually hidden, sr-only, screen reader, accessibility, a11y, aria-live, hidden label, assistive technology

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

## Examples

- `upstream/examples/VisuallyHiddenShowcase.tsx` — VisuallyHidden · static: `static/VisuallyHiddenShowcase.html`
- `upstream/examples/VisuallyHiddenLiveRegion.tsx` — VisuallyHidden — Live Region: A polite aria-live region announces visual-only state changes to assistive technology. · static: `static/VisuallyHiddenLiveRegion.html`
- `upstream/examples/VisuallyHiddenStructuralHeading.tsx` — VisuallyHidden — Structural Heading: Give a visually implicit section an accessible name so screen-reader users can navigate to it. · static: `static/VisuallyHiddenStructuralHeading.html`
- `upstream/examples/VisuallyHiddenSupplementaryContext.tsx` — VisuallyHidden — Supplementary Context: Add screen-reader-only context to terse visual data, like spelling out what a trend arrow means. · static: `static/VisuallyHiddenSupplementaryContext.html`

## Documentation

### VisuallyHidden

Renders content in the accessibility tree while hiding it visually. Use for accessible names on icon-only controls, aria-live announcement regions, and supplementary screen-reader context. Deliberately has no styling props; the whole point is to stay invisible.

**Do**

- Use to give icon-only buttons and controls an accessible name that screen readers announce.
- Render as a block element (as="div") with aria-live to announce dynamic updates like drag-and-drop or result counts.

**Don't**

- Use it to hide content from everyone; it stays in the accessibility tree; use conditional rendering or `hidden` to remove content entirely.
- Put interactive controls inside it; the content is not visible and cannot receive pointer input.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | Content exposed to assistive technology while hidden from sight. |
| `as` | `ElementType` | `'span'` | HTML tag to render as. Use a block element for live regions. |

### VisuallyHidden

Renders content in the accessibility tree while hiding it visually. Use for accessible names on icon-only controls, aria-live announcement regions, and supplementary screen-reader context.

**Do**

- Use to give icon-only buttons and controls an accessible name that screen readers announce.
- Render as a block element (as="div") with aria-live to announce dynamic updates like drag-and-drop or result counts.

**Don't**

- Use it to hide content from everyone; it stays in the accessibility tree; use conditional rendering or `hidden` to remove content entirely.
- Put interactive controls inside it; the content is not visible and cannot receive pointer input.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | 对辅助技术公开但对视觉隐藏的内容。 |
| `as` | `ElementType` | `'span'` | 要渲染的 HTML 标签。实时区域请使用块级元素。 |

## Files

- `upstream/VisuallyHidden.doc.mjs`
- `upstream/VisuallyHidden.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/VisuallyHidden
