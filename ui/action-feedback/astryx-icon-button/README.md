# Icon Button

A button that shows only an icon with no visible text. Use IconButton in toolbars, table rows, and compact UI where space is tight and the icon is universally understood.

## Classification

- Category: `action-feedback` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/IconButton.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A button that shows only an icon with no visible text.
- Avoid when: Use IconButton if the action isn't obvious from the icon alone; use Button with text. Skip the tooltip; label only reaches screen readers, sighted users need the hover hint.
- Provides: IconButton
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: IconButtonShowcase, IconButtonActionBar, IconButtonFloating, IconButtonLoadingToggle, IconButtonTooltipIconButton
- Upstream: Astryx core · Action
- Keywords: icon-button, icon, button, toolbar, action, compact

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

- `src/examples/IconButtonShowcase.tsx` — Icon Button: An icon button with a wrench icon. · static: `static/IconButtonShowcase.html`
- `src/examples/IconButtonActionBar.tsx` — IconButton — Action Bar: Row of ghost icon buttons for a compact action toolbar · static: `static/IconButtonActionBar.html`
- `src/examples/IconButtonFloating.tsx` — IconButton — Floating: A floating action button (FAB). The most common floating-button shape is icon-only. Raised here with `elevation="high"`. · static: `static/IconButtonFloating.html`
- `src/examples/IconButtonLoadingToggle.tsx` — IconButton — Loading State: Icon buttons that show a loading spinner on click for async feedback · static: `static/IconButtonLoadingToggle.html`
- `src/examples/IconButtonTooltipIconButton.tsx` — IconButton — With Tooltips: Icon buttons with tooltips that explain each action on hover · static: `static/IconButtonTooltipIconButton.html`

## Documentation

### Icon Button

A button that shows only an icon with no visible text. Use IconButton in toolbars, table rows, and compact UI where space is tight and the icon is universally understood.

**Do**

- Make the aria-label specific: a trash icon labeled "Delete conversation" is clearer than just "Delete" for screen readers.
- Add a tooltip: even a gear icon can mean Settings, Preferences, or Configure.
- Use ghost in toolbars and dense areas to reduce visual clutter.

**Don't**

- Use IconButton if the action isn't obvious from the icon alone; use Button with text.
- Skip the tooltip; label only reaches screen readers, sighted users need the hover hint.

**Accessibility**

- Essential icon or spinner arc — WCAG 1.4.11 Non-text Contrast (3:1): IconButton has no visible label. Its icon must have at least 3:1 contrast with the button background in Rest, Hover, and Pointer down. The moving spinner arc must also meet 3:1 while loading.
- Visible control boundary — WCAG 1.4.11 Non-text Contrast (3:1 if needed): The button edge needs 3:1 contrast only when users need it to see the control.
- Keyboard focus indicator — WCAG 1.4.11 Non-text Contrast (3:1): The focus outline must have at least 3:1 contrast with the area around the button. Check the red outline on destructive buttons too.
- Disabled appearance — WCAG 1.4.3 and 1.4.11 exceptions (Not required): Disabled controls do not need to meet these contrast ratios.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Accessible label. Used as aria-label (not rendered as visible text). |
| `icon` * | `ReactNode` |  | Icon element rendered inside the button. An Astryx Icon with no explicit size defaults to sm for sm/md buttons and md for lg buttons. |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive'` | `'secondary'` | Visual style variant. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant. |
| `elevation` | `'none' \| 'low' \| 'med' \| 'high'` | `'none'` | Resting shadow depth. The most common FAB shape is an icon-only button, so raise it with `low`/`med`/`high` for a floating action button. `none` is the default flat button. |
| `isLoading` | `boolean` | `false` | Shows a loading spinner and disables interaction. |
| `isDisabled` | `boolean` | `false` | Disables the button. |
| `tooltip` | `string` |  | Tooltip text shown on hover. |
| `onClick` | `(e: MouseEvent) => void` |  | Standard click handler. |
| `clickAction` | `(e: MouseEvent) => void \| Promise<void>` |  | Async click handler with automatic loading state. |

## Files

- `src/IconButton.doc.mjs`
- `src/IconButton.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/IconButton
