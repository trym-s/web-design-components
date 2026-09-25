# useCollapsible

Reusable hook that encapsulates the collapsible state machine. Supports three modes: group-controlled (inside CollapsibleGroup), controlled (isOpen + onOpenChange), and uncontrolled (self-managed with defaultIsOpen). Used internally by Card and Section.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useCollapsible.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Reusable hook that encapsulates the collapsible state machine.
- Avoid when: Implement your own open/close state when useCollapsible already provides it; the hook handles group coordination automatically.
- Provides: useCollapsible
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: CollapsibleHookUsage
- Upstream: Astryx core · interaction
- Keywords: collapsible, collapse, expand, toggle, accordion, disclosure, fold

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

- `src/examples/CollapsibleHookUsage.tsx` — useCollapsible — Custom Disclosure: Custom disclosure UI built directly with useCollapsible for headless open/close state. · static: `static/CollapsibleHookUsage.html`

## Documentation

### useCollapsible

Import: `@astryxdesign/core/Collapsible`

Reusable hook that encapsulates the collapsible state machine. Supports three modes: group-controlled (inside CollapsibleGroup), controlled (isOpen + onOpenChange), and uncontrolled (self-managed with defaultIsOpen). Used internally by Card and Section.

**Do**

- Use the hook directly when building custom collapsible components that need Astryx collapsible behavior without Collapsible wrapper.
- For accordion behavior, wrap items in CollapsibleGroup and pass unique value props.

**Don't**

- Implement your own open/close state when useCollapsible already provides it; the hook handles group coordination automatically.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isCollapsible` | `boolean \| CollapsibleConfig` |  | Enable collapsible behavior. true = self-managed (starts open). Pass config object for controlled mode or custom defaults. |
| `value` | `string` |  | Unique identifier within an CollapsibleGroup. When present and inside a group, state is managed by the group. |

**Returns**

```ts
[
  {
    "name": "isEnabled",
    "type": "boolean",
    "description": "Whether collapsible behavior is active."
  },
  {
    "name": "isOpen",
    "type": "boolean",
    "description": "Whether the content is currently expanded."
  },
  {
    "name": "toggle",
    "type": "() => void",
    "description": "Toggle open/closed state. Dispatches to group, controlled callback, or internal state."
  }
]
```

## Files

- `src/useCollapsible.doc.mjs`
- `src/useCollapsible.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useCollapsible
