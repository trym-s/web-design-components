# Overlay

Overlay layers action or supporting content over media, cards, video, or other bounded surfaces with an optional scrim and reveal behavior.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Overlay.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Overlay layers action or supporting content over media, cards, video, or other bounded surfaces with an optional scrim and reveal behavior.
- Avoid when: Do not use Overlay for floating content anchored outside the surface. Use Popover, Tooltip, or Dialog for those patterns.
- Provides: Base content, Scrim, Overlay content
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: OverlayShowcase, OverlayBottomStrip, OverlayHoverReveal
- Upstream: Astryx core · Overlay
- Keywords: overlay, scrim, media, hover, focus, image, card

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

- `src/examples/OverlayShowcase.tsx` — Overlay: A media card with an always-visible scrim and centered action content. · static: `static/OverlayShowcase.html`
- `src/examples/OverlayBottomStrip.tsx` — Overlay — Bottom Strip: Places compact supporting content in a bottom scrim strip without covering the entire image. · static: `static/OverlayBottomStrip.html`
- `src/examples/OverlayHoverReveal.tsx` — Overlay — Hover Reveal: Reveals an overlay action on hover or keyboard focus. Use when actions should stay visually quiet until the media receives attention. · static: `static/OverlayHoverReveal.html`

## Documentation

### Overlay

Overlay layers action or supporting content over media, cards, video, or other bounded surfaces with an optional scrim and reveal behavior.

**Do**

- Use overlays for short, contextual actions or labels that belong directly to the underlying media or surface.
- Keep overlay content compact so it remains legible over the scrim and does not obscure important visual information.

**Don't**

- Do not use Overlay for floating content anchored outside the surface. Use Popover, Tooltip, or Dialog for those patterns.

**Anatomy**

- Base content — The media, card, or bounded surface that the overlay sits on top of.
- Scrim — Optional dark or light overlay background that improves content contrast.
- Overlay content (required) — Actions, labels, or supporting content rendered above the base surface.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` * | `ReactNode` |  | Content rendered inside the overlay scrim. |
| `children` | `ReactNode` |  | Base content such as an image, video, card, or media surface that the overlay sits on top of. |
| `showOn` | `'hover' \| 'always' \| 'focus' \| 'hover-or-focus'` | `'always'` | Visibility trigger. Hover mode also reveals on focus for keyboard accessibility; hover-or-focus is an alias for hover. |
| `isOpen` | `boolean` |  | Controlled visibility override. When set, this takes precedence over showOn and touch toggle behavior. |
| `scrim` | `'dark' \| 'light' \| false` | `'dark'` | Scrim background mode. Set to false to render overlay content without a scrim background. |
| `position` | `'fill' \| 'bottom' \| 'top'` | `'fill'` | Where the scrim appears within the base surface. |
| `align` | `'start' \| 'center' \| 'end'` | `'end'` | Alignment of the overlay content within the scrim. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |
| `className` | `string` |  | CSS class name(s) appended to the root element. Prefer xstyle for styling when possible. |
| `style` | `React.CSSProperties` |  | Inline styles applied to the root element. Prefer xstyle for design-system styling. |
| `ref` | `Ref<HTMLDivElement>` |  | Ref forwarded to the overlay root element. |

Styling hook class: `.astryx-overlay`, `.astryx-overlay-scrim`

## Files

- `src/Overlay.doc.mjs`
- `src/Overlay.tsx`
- `src/OverlayScrim.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Overlay
