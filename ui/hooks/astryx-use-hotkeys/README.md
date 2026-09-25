# useHotkeys

Registers global keyboard shortcuts with a single window keydown listener per hook instance. Handlers live in a ref, so re-renders never re-subscribe. Skips events from typing targets (input, textarea, select, contenteditable) unless allowInInputs, skips defaultPrevented events, and calls preventDefault() on match. SSR-safe.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useHotkeys.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Registers global keyboard shortcuts with a single window keydown listener per hook instance.
- Avoid when: Use for focus-scoped keyboard navigation inside a widget; use useListFocus or useGridFocus instead.
- Provides: useHotkeys
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · interaction
- Keywords: hotkey, shortcut, keyboard, keydown, command, palette, mod, cmd, ctrl, kbd

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

### useHotkeys

Import: `@astryxdesign/core/hooks`

Registers global keyboard shortcuts with a single window keydown listener per hook instance. Handlers live in a ref, so re-renders never re-subscribe. Skips events from typing targets (input, textarea, select, contenteditable) unless allowInInputs, skips defaultPrevented events, and calls preventDefault() on match. SSR-safe.

**Do**

- Use for app-level shortcuts like command palettes (mod+k), help overlays (shift+/), and navigation keys.
- Pair with the Kbd component to display the same combo you register; both resolve "mod" per platform identically.
- Use isDisabled to suspend shortcuts while a modal or wizard owns the keyboard, instead of unmounting the hook.

**Don't**

- Use for focus-scoped keyboard navigation inside a widget; use useListFocus or useGridFocus instead.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `hotkeys` * | `Hotkey[]` |  | Shortcut registrations. Each entry: `{ keys, onPress, allowInInputs?, isDisabled? }`. `keys` is a "+"-separated combo like "mod+k", "shift+/", "escape"; "mod" is ⌘ on macOS and Ctrl elsewhere. `onPress` receives the KeyboardEvent after preventDefault(). `allowInInputs` (default false) lets the hotkey fire while typing in inputs/textareas/selects/contenteditable. `isDisabled` temporarily disables the entry. |

**Returns**

```ts
[]
```

## Files

- `src/useHotkeys.doc.mjs`
- `src/useHotkeys.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useHotkeys
