# Banner

Banner shows a persistent message at the top of a page or section. Use it for form errors, system updates, maintenance notices, or success confirmations that the user needs to see until they act on it.

## Classification

- Category: `notification` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Banner.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Banner shows a persistent message at the top of a page or section.
- Avoid when: Use Banner for short-lived messages that disappear on their own; use Toast instead. Stack multiple banners with the same status; combine related messages into one banner. Rely on the status color or icon alone to carry meaning; say which status it is in the title text, because the icon is decorative to a screen reader.
- Provides: Banner frame, Status surface, Icon, Title, Description, Action button, Dismiss button, Content surface
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: BannerShowcase, BannerCollapsibleContent, BannerDismissable, BannerFloating, BannerSectionVariant, BannerStatuses, BannerWithActionButton
- Upstream: Astryx core · Feedback & Status
- Keywords: banner, alert, notification, callout, notice, status, message, info, warning, error, success, toast

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

## Examples

- `upstream/examples/BannerShowcase.tsx` — Banner — Statuses: All four status banners stacked: info, success, warning, and error. A quick visual reference for choosing the right status. · static: `static/BannerShowcase.html`
- `upstream/examples/BannerCollapsibleContent.tsx` — Banner — Collapsible: Combine an action button, dismiss control, and a collapsible detail area in one banner. Children sit behind the toggle by default; `collapsible={{defaultIsOpen: true}}` starts it open, and `collapsible={false}` drops the toggle entirely. Use for complex notifications like config changes or deployment summaries. · static: `static/BannerCollapsibleContent.html`
- `upstream/examples/BannerDismissable.tsx` — Banner — Dismiss: Let the user close a banner after reading it. Use for maintenance notices, feature tips, or any non-critical message the user can acknowledge. · static: `static/BannerDismissable.html`
- `upstream/examples/BannerFloating.tsx` — Banner — Floating: A floating banner raised with `elevation="med"`. Banners are inline by default; raise one when it should read as an overlay above content. · static: `static/BannerFloating.html`
- `upstream/examples/BannerSectionVariant.tsx` — Banner — Full Width: A full-width banner with no border radius for page-level notifications. Use at the top of a page for site-wide announcements or maintenance alerts. · static: `static/BannerSectionVariant.html`
- `upstream/examples/BannerStatuses.tsx` — Banner — Statuses: All 4 banner statuses: info, success, warning, and error. Use to show persistent messages like updates, confirmations, cautions, or problems at the top of a page or section. · static: `static/BannerStatuses.html`
- `upstream/examples/BannerWithActionButton.tsx` — Banner — Action: Add a button to a banner so the user can act on the message. Use for trial expirations, payment failures, or anything that needs a response. · static: `static/BannerWithActionButton.html`

## Documentation

### Banner

Banner shows a persistent message at the top of a page or section. Use it for form errors, system updates, maintenance notices, or success confirmations that the user needs to see until they act on it.

**Do**

- Pick a status that matches the message: info for updates, warning for caution, error for problems, success for confirmations.
- Use the card container inside page content and the section container for full-width messages that span the entire page.
- Make info and success banners dismissable. Keep error banners visible until the user fixes the issue.
- Keep titles short and scannable: "Payment failed" not "There was a problem processing your most recent payment."
- Set collapsible={false} when the user needs the content to act on the message, like the list of fields that failed validation. Keep the default toggle when the detail is long enough to bury the banner's own message.
- Error and warning banners render as role="alert"; info and success render as role="status". Mount an alert banner in response to an event rather than on first paint, so assistive tech has a change to report.

**Don't**

- Use Banner for short-lived messages that disappear on their own; use Toast instead.
- Stack multiple banners with the same status; combine related messages into one banner.
- Rely on the status color or icon alone to carry meaning; say which status it is in the title text, because the icon is decorative to a screen reader.

**Anatomy**

- Banner frame (required) — Outer frame that groups the status surface and optional content surface. It carries whole-banner elevation and, for elevated card banners, the radius that shapes that silhouette.
- Status surface (required) — The primary painted surface. It communicates status and contains the icon, title, description, actions, and controls.
- Icon (required) — Automatically set based on the status (info, warning, error, success).
- Title (required) — The main message. Always required.
- Description — Additional detail below the title.
- Action button — A button for the user to act on the message, like "Review" or "Retry".
- Dismiss button — Lets the user close the banner. Enabled by setting isDismissable.
- Content surface — Secondary surface for extra detail below the status surface, like a list of errors. Sits behind an expand/collapse toggle by default; set collapsible={false} to keep it visible.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status` * | `'info' \| 'warning' \| 'error' \| 'success'` |  | Status type controlling icon and color. |
| `title` * | `ReactNode` |  | Title text or ReactNode displayed in the header. |
| `description` | `ReactNode` |  | Description text rendered below the title in the header. |
| `icon` | `ReactNode` |  | Override the default status icon. |
| `isDismissable` | `boolean` | `false` | Whether the banner can be dismissed by the user. |
| `onDismiss` | `() => void` |  | Called when the dismiss button is clicked; banner hides itself regardless of whether this is provided. |
| `dismissLabel` | `string` |  | Accessible name and visible tooltip for the dismiss button (pass it already translated). Defaults to "Dismiss <title>" for a string title, so stacked banners are distinguishable; set it when the title is a ReactNode. |
| `endContent` | `ReactNode` |  | Action content rendered in the header area, end-aligned. Wraps to its own row below the text when the header is too narrow to hold both. |
| `container` | `'card' \| 'section'` | `'card'` | Container type: card has border-radius; section is full-width with no border-radius for page-level use. |
| `elevation` | `'none' \| 'low' \| 'med' \| 'high'` | `'none'` | Resting shadow depth. Use for a floating banner that hovers above content; `none` is the default inline banner. A `card`-container banner rounds its shadow to match. |
| `children` | `ReactNode` |  | Content rendered in the card-background area below the colored header. Sits behind an expand/collapse toggle unless `collapsible={false}`. |
| `collapsible` | `boolean \| {defaultIsOpen?: boolean; isOpen?: boolean; onOpenChange?: (isOpen: boolean) => void}` | `true` | Whether the content area (children) sits behind an expand/collapse toggle in the header. On by default, starting collapsed. `false` opts out: children are always visible with no toggle. `{defaultIsOpen: true}` starts open; `{isOpen, onOpenChange}` is controlled. Takes the same CollapsibleConfig as Collapsible. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-banner-frame`, `.astryx-banner`, `.astryx-banner-icon`, `.astryx-banner-description`, `.astryx-banner-content`

### Banner

Banner shows a persistent message at the top of a page or section. Use it for form errors, system updates, maintenance notices, or success confirmations that the user needs to see until they act on it.

**Do**

- Pick a status that matches the message: info for updates, warning for caution, error for problems, success for confirmations.
- Use the card container inside page content and the section container for full-width messages that span the entire page.
- Make info and success banners dismissable. Keep error banners visible until the user fixes the issue.
- Keep titles short and scannable: "Payment failed" not "There was a problem processing your most recent payment."

**Don't**

- Use Banner for short-lived messages that disappear on their own; use Toast instead.
- Stack multiple banners with the same status; combine related messages into one banner.

**Anatomy**

- Banner frame (required) — Outer frame that groups the status surface and optional content surface. It carries whole-banner elevation and, for elevated card banners, the radius that shapes that silhouette.
- Status surface (required) — The primary painted surface. It communicates status and contains the icon, title, description, actions, and controls.
- Icon (required) — Automatically set based on the status (info, warning, error, success).
- Title (required) — The main message. Always required.
- Description — Additional detail below the title.
- Action button — A button for the user to act on the message, like "Review" or "Retry".
- Dismiss button — Lets the user close the banner. Enabled by setting isDismissable.
- Content surface — Secondary surface for extra detail below the status surface, like a list of errors. Sits behind an expand/collapse toggle by default; set collapsible={false} to keep it visible.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status` * | `'info' \| 'warning' \| 'error' \| 'success'` |  | 状态类型，控制图标和颜色。 |
| `title` * | `ReactNode` |  | 显示在头部的标题文本或 ReactNode。 |
| `description` | `ReactNode` |  | 渲染在头部标题下方的描述文本。 |
| `icon` | `ReactNode` |  | 覆盖默认的状态图标。 |
| `isDismissable` | `boolean` | `false` | 横幅是否可被用户关闭。 |
| `onDismiss` | `() => void` |  | 点击关闭按钮时调用；无论是否提供此回调，横幅都会自动隐藏。 |
| `dismissLabel` | `string` |  | 关闭按钮的无障碍名称和可见工具提示（请传入已翻译的字符串）。字符串标题默认生成“关闭 <标题>”；富文本标题请设置此属性。 |
| `endContent` | `ReactNode` |  | 渲染在头部区域末端对齐的操作内容，通常是按钮或链接。头部过窄时会整体换行到文本下方，自成一行。 |
| `container` | `'card' \| 'section'` | `'card'` | 视觉变体：card 带圆角；section 无圆角全宽，适用于页面级场景。 |
| `elevation` | `'none' \| 'low' \| 'med' \| 'high'` | `'none'` | 静止阴影深度。用于悬浮于内容之上的浮动横幅；none 为默认内联横幅。 |
| `children` | `ReactNode` |  | 渲染在彩色头部下方卡片背景区域的内容。默认位于展开/折叠开关之后，除非设置 collapsible={false}。 |
| `collapsible` | `boolean \| {defaultIsOpen?: boolean; isOpen?: boolean; onOpenChange?: (isOpen: boolean) => void}` | `true` | 内容区域（children）是否位于头部的展开/折叠开关之后。默认开启，且初始为折叠状态。false 表示关闭：内容始终可见且没有开关。{defaultIsOpen: true} 表示初始展开；{isOpen, onOpenChange} 为受控模式。与 Collapsible 使用同一套 CollapsibleConfig。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（外边距、定位、尺寸）。必须是 stylex.create() 的值，而非内联样式对象如 style={{}}。 |

Styling hook class: `.astryx-banner-frame`, `.astryx-banner`, `.astryx-banner-icon`, `.astryx-banner-description`, `.astryx-banner-content`

## Files

- `upstream/Banner.doc.mjs`
- `upstream/Banner.spec.md`
- `upstream/Banner.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Banner
