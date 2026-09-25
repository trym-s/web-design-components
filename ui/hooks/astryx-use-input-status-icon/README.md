# useInputStatusIcon

Builds the on-field status affordance for a bordered input and its accessibility wiring, so every input in the family behaves the same for a given status. The attached variant renders a plain glyph and leaves the text to the message box; the detached variant renders nothing here, because the message box already carries its own icon; the tooltip variant renders a real focusable button whose tooltip is reachable by keyboard, pointer, touch and assistive tech. Use it when building a bordered input, not for field-level messaging.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useInputStatusIcon.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Builds the on-field status affordance for a bordered input and its accessibility wiring, so every input in the family behaves the same for a given status.
- Avoid when: Use it to convey the status by icon alone; the tooltip variant is the only one that carries the message, so the others still need a message box.
- Provides: useInputStatusIcon
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · interaction
- Keywords: input, status, icon, error, warning, success, validation, tooltip, info tip, field, describedby, accessibility, a11y

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

### useInputStatusIcon

Import: `@astryxdesign/core/hooks`

Builds the on-field status affordance for a bordered input and its accessibility wiring, so every input in the family behaves the same for a given status. The attached variant renders a plain glyph and leaves the text to the message box; the detached variant renders nothing here, because the message box already carries its own icon; the tooltip variant renders a real focusable button whose tooltip is reachable by keyboard, pointer, touch and assistive tech. Use it when building a bordered input, not for field-level messaging.

**Do**

- Render statusIcon inside the input container and merge describedBy into the control's aria-describedby list.
- Let it decide when nothing should render; pass isInGroup and the variant through rather than branching at the call site.

**Don't**

- Use it to convey the status by icon alone; the tooltip variant is the only one that carries the message, so the others still need a message box.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` * | `UseInputStatusIconOptions` |  | Configuration object. |
| `options.status` | `InputStatus` |  | The input's status (type plus message), or undefined when there is none. |
| `options.statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | How the status is presented relative to the input. |
| `options.isInGroup` | `boolean` | `false` | Whether the input sits inside an InputGroup, which owns status rendering itself. |
| `options.size` | `IconSize` | `'md'` | Size of the on-field icon. |

**Returns**

```ts
[
  {
    "name": "statusIcon",
    "type": "ReactNode",
    "description": "The affordance to render inside the input container: a plain icon, or a focusable info-tip button with its tooltip. Null when no icon should render."
  },
  {
    "name": "describedBy",
    "type": "string | undefined",
    "description": "ID to add to the input's aria-describedby, present exactly when a tooltip element is in the DOM, so there is never a dangling reference."
  }
]
```

## Files

- `src/useInputStatusIcon.doc.mjs`
- `src/useInputStatusIcon.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useInputStatusIcon
