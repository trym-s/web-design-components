# Nav Icon

NavIcon is a circular icon container with an accent-colored background. Use it in navigation headers such as TopNavHeading and PageNavHeader to visually identify a section or application.

## Classification

- Category: `navigation` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/NavIcon.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: NavIcon is a circular icon container with an accent-colored background.
- Avoid when: Use NavIcon for interactive purposes; it is a display-only container, not a button.
- Provides: Container, Icon
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: NavIconShowcase, NavIconBasic
- Upstream: Astryx core · Navigation
- Keywords: navicon, iconbutton, toolbar icon, appbar icon, nav button

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

- `src/examples/NavIconShowcase.tsx` — Nav Icon: Circular icon containers for navigation headers with accent backgrounds. · static: `static/NavIconShowcase.html`
- `src/examples/NavIconBasic.tsx` — NavIcon — Basic: Circular icon containers wrapping semantic icons. Use as logos or accent icons in navigation headers such as TopNavHeading. · static: `static/NavIconBasic.html`

## Documentation

### Nav Icon

NavIcon is a circular icon container with an accent-colored background. Use it in navigation headers such as TopNavHeading and PageNavHeader to visually identify a section or application.

**Do**

- Use in navigation headers to provide a recognizable visual anchor for the section.
- Pass an Icon or similarly sized icon component to ensure proper proportions.

**Don't**

- Use NavIcon for interactive purposes; it is a display-only container, not a button.

**Anatomy**

- Container (required) — Circular painted container for the supplied icon.
- Icon (required) — Caller-supplied visual content rendered inside the container.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` * | `ReactNode` |  | The icon element to render inside the circular background. Should be an Icon or similar icon component. |

Styling hook class: `.astryx-nav-icon`, `.astryx-navicon`

### Nav Icon

NavIcon is a circular icon container with an accent-colored background. Use it in navigation headers such as TopNavHeading and PageNavHeader to visually identify a section or application.

**Do**

- Use in navigation headers to provide a recognizable visual anchor for the section.
- Pass an Icon or similarly sized icon component to ensure proper proportions.

**Don't**

- Use NavIcon for interactive purposes; it is a display-only container, not a button.

**Anatomy**

- Container (required) — Circular painted container for the supplied icon.
- Icon (required) — Caller-supplied visual content rendered inside the container.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` * | `ReactNode` |  | 在圆形背景内渲染的图标元素。应为 Icon 或类似的图标组件。 |

Styling hook class: `.astryx-nav-icon`, `.astryx-navicon`

## Files

- `src/NavIcon.doc.mjs`
- `src/NavIcon.spec.md`
- `src/NavIcon.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/NavIcon
