# Indicator

Indicators are the componentized selection visuals shared by CheckboxInput, RadioList, and menu selection rows. They are decorative: the owning component keeps the input, role, accessible name, focus, and keyboard behavior, while the indicator turns state into a picture. That split is what makes them themeable: restyle one through its class targets, or replace the component outright.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Indicator.doc.mjs`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Indicators are the componentized selection visuals shared by CheckboxInput, RadioList, and menu selection rows.
- Avoid when: Thread hover or pressed state in as props. Interaction state reaches an indicator through the owner's CSS ancestor marker, so hovering the row tints the control with no props involved. Assume you are only mounted when selected. The host renders its indicator unconditionally and passes `state`, in every state; that is what lets a replacement draw where the default draws nothing (a radio's empty circle on an unchosen row). Drawing nothing in a state is a decision the indicator makes, not one the host makes for it.
- Provides: Chrome, State mark
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: default
- Upstream: Astryx core · Form Controls
- Keywords: indicator, checkbox, radio, control, selection, mark, tick, themeable, swap

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

- None upstream; the demo mounts the documented playground defaults.

## Documentation

### Indicator

Indicators are the componentized selection visuals shared by CheckboxInput, RadioList, and menu selection rows. They are decorative: the owning component keeps the input, role, accessible name, focus, and keyboard behavior, while the indicator turns state into a picture. That split is what makes them themeable: restyle one through its class targets, or replace the component outright.

**Do**

- Reach for component overrides first (components: {checkbox}). Replacing the component is the heavier path, for when the shape itself is wrong.
- A replacement must render `children` when they will actually draw something: use `isRenderable(children)`, not `children != null` or `children ?? mark`. The owning control passes its loading Spinner through as `children={isBusy && <Spinner/>}`, so the value is `false` whenever it is not busy: a nullish check takes the children branch, renders nothing, and deletes your state mark on every chosen row (#4893).
- A replacement must set aria-hidden. The owning control provides the role and accessible name; a visible indicator would be announced twice.
- Use theme tokens for every color, radius, and border width in a replacement. Run `npx astryx docs tokens` for the set.
- Render a single root ELEMENT, and let it keep the border-radius you want the focus ring to follow. A control whose real input is visually hidden cannot show focus on that input, so the owner paints the standard ring onto the indicator element itself at focus time (useIndicatorFocusRing), and `outline` then picks up that element's radius. A replacement needs no cooperation and can forget nothing: the ring is never missing (WCAG 2.4.7), it is only the wrong shape if the root has no radius of its own. Do not draw a focus ring yourself; the owner already did.

**Don't**

- Thread hover or pressed state in as props. Interaction state reaches an indicator through the owner's CSS ancestor marker, so hovering the row tints the control with no props involved.
- Assume you are only mounted when selected. The host renders its indicator unconditionally and passes `state`, in every state; that is what lets a replacement draw where the default draws nothing (a radio's empty circle on an unchosen row). Drawing nothing in a state is a decision the indicator makes, not one the host makes for it.

**Anatomy**

- Chrome (required) — The persistent box or circle, present in every state. Carries the astryx-checkbox-indicator / astryx-radio-indicator theme target (the pre-indicator astryx-checkbox / astryx-radio names are still emitted on the same element).
- State mark — The checkmark, indeterminate bar, or radio dot shown inside the chrome for the current state.

Styling hook class: `.astryx-checkbox-indicator`, `.astryx-checkbox-indicator-check`, `.astryx-checkbox-indicator-dash`, `.astryx-radio-indicator`, `.astryx-radio-indicator-dot`, `.astryx-checkbox`, `.astryx-radio`, `.astryx-radio-dot`

**Example — Restyle an indicator (the common path)**

```tsx
// Indicators render the same stable class targets wherever they appear, so
// one component override reaches the form control, the menu row, and any
// selection slot themed to use it. No indicator-specific API needed.
defineTheme({
  name: 'brand',
  components: {
    'checkbox-indicator': {
      base: {borderRadius: 'var(--radius-full)', borderWidth: '2px'},
      checked: {
        backgroundColor: 'var(--color-accent)',
        borderColor: 'var(--color-accent)',
      },
      'checked+disabled': {backgroundColor: 'var(--color-background-muted)'},
    },
    'radio-indicator': {base: {borderWidth: '2px'}},
    'radio-indicator-dot': {base: {borderRadius: '2px'}},
  },
});
```

**Example — Replace an indicator with your own component**

```tsx
// When the shape itself is wrong, hand the theme a component. It receives
// {state, size, isDisabled, children} and nothing else.
//
// Use theme tokens, never raw values — run `npx astryx docs tokens` for the
// full set. Color: --color-accent, --color-on-accent, --color-border,
// --color-border-emphasized, --color-background-surface,
// --color-background-muted. Radius: --radius-inner, --radius-full.
// Border width: --border-width.
import {isRenderable} from '@astryxdesign/core/utils';

function BrandCheckbox({state, size = 'md', isDisabled, children}) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size === 'sm' ? 20 : 24,
        height: size === 'sm' ? 20 : 24,
        borderRadius: 'var(--radius-inner)',
        border: 'var(--border-width) solid var(--color-border-emphasized)',
        color: 'var(--color-accent)',
        opacity: isDisabled ? 0.5 : 1,
      }}>
      {/* children first: the owner passes a loading Spinner through it.
          isRenderable, NOT `children ??` — a host writes
          children={isBusy && <Spinner/>}, and `false` is neither null nor
          caught by ??, so a nullish check takes the children branch, renders
          nothing in it, and deletes your mark on every chosen row. */}
      {isRenderable(children)
        ? children
        : state === 'checked' && <StarGlyph />}
    </span>
  );
}

defineTheme({name: 'brand', indicators: {checkbox: BrandCheckbox}});
```

**Example — Use radio visuals for single selection**

```tsx
// Replacement is by NAME, so one entry reaches every component that draws
// that indicator. Here every option in a Selector listbox draws a radio —
// including the unselected ones, which a check mark cannot do.
import {RadioIndicator} from '@astryxdesign/core/Indicator';

defineTheme({name: 'brand', indicators: {check: RadioIndicator}});
```

## Files

- `src/Indicator.doc.mjs`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Indicator
