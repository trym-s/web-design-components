# Button

Button triggers an action when clicked. Use it for form submissions, confirmations, navigation, or any interaction that needs a clear call to action.

## Classification

- Category: `action-feedback` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Button.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Button triggers an action when clicked.
- Avoid when: Place more than one primary button in the same view; this dilutes the visual hierarchy. Use the destructive variant without a confirmation step for irreversible actions like deleting data. Use a button for navigation. If it only takes the user to another page, use a link instead. Buttons are for actions like saving, deleting, or submitting.
- Provides: Icon, Label, End content, Spinner
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ButtonShowcase, ButtonFloating, ButtonSizeVariants, ButtonVariants, ButtonWithEndSlot, ButtonWithIcon
- Upstream: Astryx core · Action
- Keywords: button, btn, cta, submit, action, loading, primary, secondary, ghost, destructive, danger

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

- `src/examples/ButtonShowcase.tsx` — Button — Variants: All four button variants side by side: primary, secondary, ghost, and destructive. A quick visual reference for choosing the right variant. · static: `static/ButtonShowcase.html`
- `src/examples/ButtonFloating.tsx` — Button — Floating: A floating action button raised with `elevation="med"`. Use elevation for buttons that hover above content, like a FAB. · static: `static/ButtonFloating.html`
- `src/examples/ButtonSizeVariants.tsx` — Button — Sizes: Small, medium, and large buttons side by side. Use small in dense UIs like toolbars, medium for most cases, and large for prominent CTAs. · static: `static/ButtonSizeVariants.html`
- `src/examples/ButtonVariants.tsx` — Button — Variants: All 4 button variants in default, disabled, and loading states. Use primary for the main action, secondary for most others, ghost for low-emphasis, and destructive for dangerous actions. · static: `static/ButtonVariants.html`
- `src/examples/ButtonWithEndSlot.tsx` — Button — End Slot: Buttons with a trailing badge showing a count or status. Use for notification counts, unread messages, or any button that needs a visual indicator. · static: `static/ButtonWithEndSlot.html`
- `src/examples/ButtonWithIcon.tsx` — Button — Icon: Buttons with a leading icon that reinforces the label. Use when the icon helps the user identify the action faster, like a plus for "New" or a trash can for "Delete". · static: `static/ButtonWithIcon.html`

## Documentation

### Button

Button triggers an action when clicked. Use it for form submissions, confirmations, navigation, or any interaction that needs a clear call to action.

**Do**

- Reserve primary for the single most important action in the view. Use secondary or ghost for everything else based on emphasis.
- Write labels that describe the action ("Save changes", "Delete account", "Send invite"), not vague labels like "OK" or "Click here".
- Show a loading state for actions that take time, like saving or submitting, so the user knows it is working.
- Always provide a label for icon-only buttons so screen readers can announce what the button does. Add a tooltip for sighted users.
- For a dedicated icon-only button, use IconButton from '@astryxdesign/core/IconButton'. It is a separate component, not exported from '@astryxdesign/core/Button'.

**Don't**

- Place more than one primary button in the same view; this dilutes the visual hierarchy.
- Use the destructive variant without a confirmation step for irreversible actions like deleting data.
- Use a button for navigation. If it only takes the user to another page, use a link instead. Buttons are for actions like saving, deleting, or submitting.

**Anatomy**

- Icon — A leading icon that reinforces the label, like a trash icon on a Delete button.
- Label (required) — The visible text describing the action. Also used as the accessible name.
- End content — A trailing badge or icon after the label, like a notification count or dropdown arrow.
- Spinner — Replaces the icon during loading to show the action is in progress.

**Accessibility**

- Text label — WCAG 1.4.3 Contrast (Minimum) (4.5:1): Button text must have at least 4.5:1 contrast with the button background in every state. For Hover and Pointer down, measure the final background after the overlay is applied.
- Essential icon or spinner arc — WCAG 1.4.11 Non-text Contrast (3:1): An icon used instead of text must have at least 3:1 contrast with the button background. The moving spinner arc must also meet 3:1. An icon beside a visible label does not need its own check.
- Badge text — WCAG 1.4.3 Contrast (Minimum) (4.5:1): Badge text inside a button must have at least 4.5:1 contrast with the Badge background. Check all 14 built-in Badge colors in Rest, Hover, and Pointer down on page and surface backgrounds. This covers 336 pairs per mode. Check custom end content separately.
- Visible control boundary — WCAG 1.4.11 Non-text Contrast (3:1 if needed): The button edge needs 3:1 contrast only when users need it to see the control. A text-only button can rely on its label.
- Keyboard focus indicator — WCAG 1.4.11 Non-text Contrast (3:1): The focus outline needs at least 3:1 contrast with the area around the button. Check every style. Destructive buttons use a red outline.
- Disabled appearance — WCAG 1.4.3 and 1.4.11 exceptions (Not required): Disabled controls do not need to meet these contrast ratios.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Accessible label. Rendered as visible text by default; used as aria-label when isIconOnly is true. |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive'` | `'secondary'` | Visual style variant. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant. |
| `elevation` | `'none' \| 'low' \| 'med' \| 'high'` | `'none'` | Resting shadow depth for floating buttons (e.g. a FAB). `none` is the default flat button; `low`/`med`/`high` map to the shadow token scale. Ignored inside a ButtonGroup, where elevation is owned by the group. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type attribute. |
| `name` | `string` |  | HTML name attribute for form submission. |
| `value` | `string \| number \| readonly string[]` |  | HTML value attribute for form submission. |
| `form` | `string` |  | Associates the button with a form element by ID. |
| `isLoading` | `boolean` | `false` | Shows a loading spinner and disables interaction. Announces "Loading" via a live region. |
| `isInterruptible` | `boolean` | `false` | Keep the button clickable while a clickAction is pending: the spinner and aria-busy still show, but the button is not disabled and the action is not deduped, so a re-click lands and interrupts the in-flight action with a fresh one. |
| `isDisabled` | `boolean` | `false` | Disables the button. When a tooltip is present, uses aria-disabled instead of native disabled so the button stays focusable. |
| `icon` | `ReactNode` |  | Icon element rendered before the label text. An Astryx Icon with no explicit size defaults to sm for sm/md buttons and md for lg buttons. |
| `isIconOnly` | `boolean` | `false` | When true, renders as a square icon-only button with label as aria-label. Requires icon. Tip: for a dedicated icon-only button component, use IconButton from '@astryxdesign/core/IconButton' instead. |
| `width` | `SizeValue` |  | Width of the button. Numbers are treated as pixels, strings are used as-is (e.g., '100%' for a full-width button). By default the button sizes to its content. |
| `children` | `ReactNode` |  | Optional override for visible text. When provided, displayed instead of label, but label is still required (it provides the accessible name). For most cases, just use label alone: <Button label="Save" />. |
| `endContent` | `ReactElement<IconProps> \| ReactElement<BadgeProps>` |  | Trailing icon or badge rendered after the label. Ignored when isIconOnly is true. Color is inherited from the button variant. |
| `tooltip` | `string` |  | Tooltip text shown on hover. |
| `onClick` | `(e: MouseEvent) => void` |  | Standard click handler (passed through from ButtonHTMLAttributes). |
| `clickAction` | `(e: MouseEvent) => void \| Promise<void>` |  | Async click handler. Shows loading state while the returned promise is pending. |
| `href` | `string` |  | When provided, renders the button as a link element (<a> or custom link component). The destination follows the shared navigation rule described on the Link `href` prop. |
| `as` | `ComponentType` |  | Custom link component to use when href is provided (e.g. Next.js Link). |
| `target` | `string` |  | HTML target attribute when rendered as a link (e.g. "_blank"). |
| `rel` | `string` |  | HTML rel attribute when rendered as a link (e.g. "noopener noreferrer"). |

**Theming variables**

- `--button-focus-offset` — Focus ring outline offset (default `var(--focus-outline-offset)`)
- `--button-icon-only-aspect` — Aspect ratio for icon-only buttons (default `1 / 1`)

Styling hook class: `.astryx-button`

### Button

Button triggers an action when clicked. Use it for form submissions, confirmations, navigation, or any interaction that needs a clear call to action.

**Do**

- Reserve primary for the single most important action in the view. Use secondary or ghost for everything else based on emphasis.
- Write labels that describe the action ("Save changes", "Delete account", "Send invite"), not vague labels like "OK" or "Click here".
- Show a loading state for actions that take time, like saving or submitting, so the user knows it is working.
- Always provide a label for icon-only buttons so screen readers can announce what the button does. Add a tooltip for sighted users.

**Don't**

- Place more than one primary button in the same view; this dilutes the visual hierarchy.
- Use the destructive variant without a confirmation step for irreversible actions like deleting data.
- Use a button for navigation. If it only takes the user to another page, use a link instead. Buttons are for actions like saving, deleting, or submitting.

**Anatomy**

- Icon — A leading icon that reinforces the label, like a trash icon on a Delete button.
- Label (required) — The visible text describing the action. Also used as the accessible name.
- End content — A trailing badge or icon after the label, like a notification count or dropdown arrow.
- Spinner — Replaces the icon during loading to show the action is in progress.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 无障碍标签；纯图标按钮时用作 aria-label。 |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive'` | `'secondary'` | 视觉样式变体。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸变体。 |
| `elevation` | `'none' \| 'low' \| 'med' \| 'high'` | `'none'` | 浮动按钮（如 FAB）的静止阴影深度。`none` 为默认扁平按钮；在 ButtonGroup 内忽略。 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML 按钮类型属性。 |
| `name` | `string` |  | 表单提交的 HTML name 属性。 |
| `value` | `string \| number \| readonly string[]` |  | 表单提交的 HTML value 属性。 |
| `form` | `string` |  | 通过 ID 将按钮与表单元素关联。 |
| `isLoading` | `boolean` | `false` | 显示加载旋转器并禁用交互。通过实时区域播报"Loading"。 |
| `isDisabled` | `boolean` | `false` | 禁用按钮。存在工具提示时，使用 aria-disabled 代替原生 disabled 以保持可聚焦。 |
| `icon` | `ReactNode` |  | 图标元素。未显式指定尺寸的 Astryx Icon 在 sm/md 按钮中默认为 sm，在 lg 按钮中默认为 md。仅提供 icon 而不提供 children 时，按钮渲染为正方形的纯图标按钮。 |
| `width` | `SizeValue` |  | 按钮宽度。数字按像素处理，字符串按原样使用（如 '100%' 表示全宽按钮）。默认按内容自适应宽度。 |
| `children` | `ReactNode` |  | 可选的可见内容覆盖；label 仍然是必需的（用于无障碍名称）。大多数情况使用 <Button label="Save" />。 |
| `endContent` | `ReactElement<IconProps> \| ReactElement<BadgeProps>` |  | 标签后方渲染的尾部图标或徽章。仅接受 <Icon> 或 <Badge>。纯图标按钮时忽略。颜色继承自按钮变体。 |
| `tooltip` | `string` |  | 悬停时显示的提示文本。 |
| `onClick` | `(e: MouseEvent) => void` |  | 标准点击处理函数（从 ButtonHTMLAttributes 透传）。 |
| `clickAction` | `(e: MouseEvent) => void \| Promise<void>` |  | 异步点击处理函数。返回的 Promise 处于 pending 状态时显示加载状态。 |

**Theming variables**

- `--button-focus-offset` — 焦点环轮廓偏移 (default `var(--focus-outline-offset)`)
- `--button-icon-only-aspect` — 纯图标按钮的宽高比 (default `1 / 1`)

Styling hook class: `.astryx-button`

## Files

- `src/Button.doc.mjs`
- `src/Button.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Button
