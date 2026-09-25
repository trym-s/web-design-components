# useIndicatorFocusRing

Draws the standard focus ring on the indicator of a control whose real input is visually hidden; a checkbox or radio focuses an opacity-0 input, so the ring has to appear on the picture beside it. The ring is painted imperatively on the indicator's own element, which is the only element whose border-radius can shape it, and only on :focus-visible, so pointer clicks stay quiet. Owning it here means a theme-supplied indicator cannot ship a control with no visible focus (WCAG 2.4.7) by ignoring a prop.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useIndicatorFocusRing.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Draws the standard focus ring on the indicator of a control whose real input is visually hidden; a checkbox or radio focuses an opacity-0 input, so the ring has to appear on the picture beside it.
- Avoid when: Ask a themeable indicator to draw its own focus ring; a replacement that ignores the prop leaves the control with no visible focus.
- Provides: useIndicatorFocusRing
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · focus
- Keywords: focus ring, focus, focus-visible, outline, indicator, checkbox, radio, visually hidden input, keyboard, accessibility, a11y, wcag

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

### useIndicatorFocusRing

Import: `@astryxdesign/core/hooks`

Draws the standard focus ring on the indicator of a control whose real input is visually hidden; a checkbox or radio focuses an opacity-0 input, so the ring has to appear on the picture beside it. The ring is painted imperatively on the indicator's own element, which is the only element whose border-radius can shape it, and only on :focus-visible, so pointer clicks stay quiet. Owning it here means a theme-supplied indicator cannot ship a control with no visible focus (WCAG 2.4.7) by ignoring a prop.

**Do**

- Wrap only the indicator in the ref'd element; a wrapper holding label text would ring the whole row.
- Spread focusProps on the element that contains the hidden input, not on the input itself.

**Don't**

- Ask a themeable indicator to draw its own focus ring; a replacement that ignores the prop leaves the control with no visible focus.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `containerRef` * | `RefObject<HTMLElement \| null>` |  | Ref to an element wrapping only the indicator, so its single element child is unambiguously the thing to ring. |
| `isDisabled` | `boolean` | `false` | Skip the ring; a disabled control is not focusable. |

**Returns**

```ts
[
  {
    "name": "focusProps",
    "type": "{onFocus: (event: FocusEvent<HTMLElement>) => void; onBlur: () => void}",
    "description": "Spread onto the element that owns the focusable input."
  }
]
```

## Files

- `src/useIndicatorFocusRing.doc.mjs`
- `src/useIndicatorFocusRing.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useIndicatorFocusRing
