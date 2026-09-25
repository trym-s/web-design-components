# useInputContainer

Makes an input container wrapper clickable, delegating focus to the inner input/textarea when the user clicks non-interactive areas (icons, padding, status indicators). Built on top of useClickableContainer, so nested interactive elements (clear buttons, calendar toggles, links) are handled safely; clicking them does NOT steal focus from the input. Automatically detects input type: text-like inputs receive .focus(), while other types (checkbox, radio, file) receive .click().

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useInputContainer.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Makes an input container wrapper clickable, delegating focus to the inner input/textarea when the user clicks non-interactive areas (icons, padding, status indicators).
- Avoid when: Use on bare inputs without a wrapper; there is no benefit if the input already fills the full clickable area.
- Provides: useInputContainer
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · interaction
- Keywords: input, container, focus, delegate, wrapper, text, textarea, click, icon, padding

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

- None of its own upstream; the demo is its family's: `ui/hooks/astryx-use-container-reveal`.

## Documentation

### useInputContainer

Import: `@astryxdesign/core/hooks`

Makes an input container wrapper clickable, delegating focus to the inner input/textarea when the user clicks non-interactive areas (icons, padding, status indicators). Built on top of useClickableContainer, so nested interactive elements (clear buttons, calendar toggles, links) are handled safely; clicking them does NOT steal focus from the input. Automatically detects input type: text-like inputs receive .focus(), while other types (checkbox, radio, file) receive .click().

**Do**

- Use inside input wrapper components (TextInput, NumberInput, TimeInput, TextArea) to make the full container area clickable.
- Attach both onClick and onMouseUp to the wrapper div for full interaction handling.

**Don't**

- Use on bare inputs without a wrapper; there is no benefit if the input already fills the full clickable area.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` * | `UseInputContainerOptions` |  | Configuration object for the input container. |
| `options.containerRef` * | `RefObject<HTMLElement \| null>` |  | Ref to the outer container/wrapper element. |
| `options.inputRef` * | `RefObject<HTMLInputElement \| HTMLTextAreaElement \| HTMLElement \| null>` |  | Ref to the inner input or textarea element. |
| `options.disabled` | `boolean` | `false` | Whether the input is disabled. |

**Returns**

```ts
[
  {
    "name": "onClick",
    "type": "(event: MouseEvent<HTMLElement>) => void",
    "description": "Click handler to attach to the container wrapper."
  },
  {
    "name": "onMouseUp",
    "type": "(event: MouseEvent<HTMLElement>) => void",
    "description": "Mouse up handler to attach to the container wrapper."
  }
]
```

## Files

- `src/useInputContainer.doc.mjs`
- `src/useInputContainer.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useInputContainer
