# useScrollLock

Locks body scroll when active by pinning the body with position: fixed. This prevents background scrolling behind modals and dialogs, which is necessary for iOS Safari where overscroll-behavior: contain does not work. Restores the original scroll position when unlocked. Pinning hides the document scrollbar, so where that scrollbar takes layout space (desktop) the hook holds its gutter open with scrollbar-gutter: stable for the duration of the lock. The page, including any position: fixed chrome, does not shift sideways.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useScrollLock.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Locks body scroll when active by pinning the body with position: fixed.
- Avoid when: Use for non-modal overlays like popovers or tooltips; users should be able to scroll away from those.
- Provides: useScrollLock
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · layout
- Keywords: scroll, lock, modal, dialog, body, prevent, background, ios, safari, fixed, scrollbar, gutter, layout shift, reflow

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

### useScrollLock

Import: `@astryxdesign/core/hooks`

Locks body scroll when active by pinning the body with position: fixed. This prevents background scrolling behind modals and dialogs, which is necessary for iOS Safari where overscroll-behavior: contain does not work. Restores the original scroll position when unlocked. Pinning hides the document scrollbar, so where that scrollbar takes layout space (desktop) the hook holds its gutter open with scrollbar-gutter: stable for the duration of the lock. The page, including any position: fixed chrome, does not shift sideways.

**Do**

- Use when opening full-screen modals or dialogs to prevent background content from scrolling.
- Pass the same boolean that controls dialog visibility (e.g., isOpen) as the isLocked parameter.

**Don't**

- Use for non-modal overlays like popovers or tooltips; users should be able to scroll away from those.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isLocked` * | `boolean` |  | whether body scroll should be locked. |

**Returns**

```ts
[]
```

## Files

- `upstream/useScrollLock.doc.mjs`
- `upstream/useScrollLock.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useScrollLock
