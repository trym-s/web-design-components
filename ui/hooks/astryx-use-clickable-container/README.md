# useClickableContainer

Makes a container element clickable while preserving nested interactive element behavior. Solves the "nested interactive elements" problem: when a card is clickable but contains buttons/links, clicking those should NOT trigger the card's action. Detects interactive ancestors between the click target and the container, and ignores text selections. Supports href navigation (including middle-click and Ctrl/Cmd+click for new tabs).

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useClickableContainer.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Makes a container element clickable while preserving nested interactive element behavior.
- Avoid when: Use when the entire container is a single interactive element; just use a <button> or <a> directly.
- Provides: useClickableContainer
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · interaction
- Keywords: click, container, card, pressable, interactive, nested, link, button, delegate

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

### useClickableContainer

Import: `@astryxdesign/core/hooks`

Makes a container element clickable while preserving nested interactive element behavior. Solves the "nested interactive elements" problem: when a card is clickable but contains buttons/links, clicking those should NOT trigger the card's action. Detects interactive ancestors between the click target and the container, and ignores text selections. Supports href navigation (including middle-click and Ctrl/Cmd+click for new tabs).

**Do**

- Attach both onClick and onMouseUp to the container element for full click handling including middle-click.
- Use inside ClickableCard or SelectableCard for the standard card interaction pattern.

**Don't**

- Use when the entire container is a single interactive element; just use a <button> or <a> directly.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` * | `UseClickableContainerOptions` |  | Configuration object for the clickable container. |
| `options.containerRef` * | `RefObject<HTMLElement \| null>` |  | Ref to the outer container element. |
| `options.interactiveRef` | `RefObject<HTMLElement \| null>` |  | Ref to the primary interactive element inside (link, button). If no onClick or href is provided, clicks are proxied to this element. |
| `options.onClick` | `(event: MouseEvent<HTMLElement>) => void` |  | Click handler fired when the container surface (not a nested interactive element) is clicked. |
| `options.href` | `string` |  | Navigation URL. When provided, clicking the container navigates to this URL. |
| `options.target` | `string` |  | Link target (e.g., '_blank'). Used with href for navigation behavior. |
| `options.disabled` | `boolean` | `false` | Whether the container is disabled. |

**Returns**

```ts
[
  {
    "name": "onClick",
    "type": "(event: MouseEvent<HTMLElement>) => void",
    "description": "Click handler to attach to the container element."
  },
  {
    "name": "onMouseUp",
    "type": "(event: MouseEvent<HTMLElement>) => void",
    "description": "Mouse up handler to attach to the container (handles middle-click navigation for href)."
  }
]
```

## Files

- `upstream/useClickableContainer.doc.mjs`
- `upstream/useClickableContainer.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useClickableContainer
