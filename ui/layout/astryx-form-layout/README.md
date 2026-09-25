# Form Layout

A layout container that arranges form fields with consistent spacing and direction. FormLayout handles where fields go, not state or submission. Wrap it in a <form> for that. Supports vertical (default), horizontal, and horizontal-labels directions, and can be nested to mix them.

## Classification

- Category: `layout` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/FormLayout.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A layout container that arranges form fields with consistent spacing and direction.
- Avoid when: Use FormLayout for form state or submission. It's just layout. Wrap it in a <form> for that. Put unrelated fields side by side in a horizontal layout. Save it for fields that belong together. Nest horizontal-labels inside another FormLayout. It uses CSS Grid and needs to be the outermost container.
- Provides: Form title, Fields, Footer
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: FormLayoutShowcase, FormLayoutHorizontal, FormLayoutHorizontalLabels, FormLayoutMixedControls, FormLayoutNested
- Upstream: Astryx core · Layout
- Keywords: formlayout, form, fieldset, formgroup, formcontainer, fields, vertical, horizontal

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

- `src/examples/FormLayoutShowcase.tsx` — Form Layout: A vertical form layout with text input fields. · static: `static/FormLayoutShowcase.html`
- `src/examples/FormLayoutHorizontal.tsx` — FormLayout — Horizontal: Two fields side by side for naturally paired inputs like first and last name · static: `static/FormLayoutHorizontal.html`
- `src/examples/FormLayoutHorizontalLabels.tsx` — FormLayout — Settings Form: Settings form with labels placed beside their inputs · static: `static/FormLayoutHorizontalLabels.html`
- `src/examples/FormLayoutMixedControls.tsx` — FormLayout — Mixed Controls: Form with different control types: text input, selector, and checkboxes · static: `static/FormLayoutMixedControls.html`
- `src/examples/FormLayoutNested.tsx` — FormLayout — Nested Address Form: Address form mixing vertical and horizontal layouts for grouped fields · static: `static/FormLayoutNested.html`

## Documentation

### Form Layout

A layout container that arranges form fields with consistent spacing and direction. FormLayout handles where fields go, not state or submission. Wrap it in a <form> for that. Supports vertical (default), horizontal, and horizontal-labels directions, and can be nested to mix them.

**Do**

- Stack fields vertically for most forms. It's the easiest to scan top to bottom.
- Nest a horizontal FormLayout inside a vertical one when fields naturally pair up, like First Name + Last Name or City + State + ZIP.
- Use horizontal-labels for settings pages where labels sit beside their inputs.

**Don't**

- Use FormLayout for form state or submission. It's just layout. Wrap it in a <form> for that.
- Put unrelated fields side by side in a horizontal layout. Save it for fields that belong together.
- Nest horizontal-labels inside another FormLayout. It uses CSS Grid and needs to be the outermost container.

**Anatomy**

- Form title — Heading that describes the purpose of the form.
- Fields (required) — Input components with labels for collecting user data.
- Footer — Contains confirmation buttons such as Submit or Cancel.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `'vertical' \| 'horizontal' \| 'horizontal-labels'` | `'vertical'` | Controls field arrangement. Vertical stacks top-to-bottom, horizontal arranges left-to-right with equal flex-grow, and horizontal-labels uses CSS Grid with labels to the left of inputs (collapses to vertical on narrow viewports <=480px). |
| `defaultOptionality` | `'optional' \| 'required'` |  | The state the form treats as its default, so only the exception shows an optional/required indicator. With "optional", only fields marked isRequired show an indicator; with "required", only fields marked isOptional do. A field that restates the default shows nothing. Under "required" the unmarked fields also expose aria-required so screen readers match the visual default; aria-required only, never the native required attribute. Leave unset for today's per-field behavior. |
| `children` | `ReactNode` |  | Form fields to arrange. Accepts Astryx inputs (TextInput, Selector, etc.) and Field-wrapped custom controls. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-form-layout`

### Form Layout

A layout container that arranges form fields with consistent spacing and direction. FormLayout handles where fields go, not state or submission. Wrap it in a <form> for that. Supports vertical (default), horizontal, and horizontal-labels directions, and can be nested to mix them.

**Do**

- Stack fields vertically for most forms. It's the easiest to scan top to bottom.
- Nest a horizontal FormLayout inside a vertical one when fields naturally pair up, like First Name + Last Name or City + State + ZIP.
- Use horizontal-labels for settings pages where labels sit beside their inputs.

**Don't**

- Use FormLayout for form state or submission. It's just layout. Wrap it in a <form> for that.
- Put unrelated fields side by side in a horizontal layout. Save it for fields that belong together.
- Nest horizontal-labels inside another FormLayout. It uses CSS Grid and needs to be the outermost container.

**Anatomy**

- Form title — Heading that describes the purpose of the form.
- Fields (required) — Input components with labels for collecting user data.
- Footer — Contains confirmation buttons such as Submit or Cancel.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `'vertical' \| 'horizontal' \| 'horizontal-labels'` | `'vertical'` | 控制字段排列方式。vertical 从上到下堆叠，horizontal 从左到右排列且等比弹性增长，horizontal-labels 使用 CSS Grid 将标签放在输入框左侧（在窄视口 <=480px 时折叠为垂直布局）。 |
| `defaultOptionality` | `'optional' \| 'required'` |  | 表单视为默认的状态，因此仅例外字段显示可选/必填指示器。设为 "optional" 时，仅标记 isRequired 的字段显示指示器；设为 "required" 时，仅标记 isOptional 的字段显示。与默认一致的字段不显示任何内容。设为 "required" 时，未标记的字段仍会暴露 aria-required，使屏幕阅读器与视觉默认一致——仅作用于 aria-required，不改变原生 required 属性。不设置则保持当前逐字段行为。 |
| `children` | `ReactNode` |  | 要排列的表单字段。接受 Astryx 输入组件（TextInput、Selector 等）和 Field 包装的自定义控件。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义（外边距、定位、尺寸）的 StyleX 样式。必须是 stylex.create() 的值，而非内联样式对象如 style={{}}。 |

Styling hook class: `.astryx-form-layout`

## Files

- `src/FormLayout.doc.mjs`
- `src/FormLayout.tsx`
- `src/FormLayoutContext.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/FormLayout
