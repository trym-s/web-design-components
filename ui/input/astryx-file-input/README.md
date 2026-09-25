# File Input

FileInput provides file upload with optional drag-and-drop support. Use it for single or multiple file selection with built-in validation for file type, size, and count. Pair with validation status for upload feedback.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/FileInput.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: FileInput provides file upload with optional drag-and-drop support.
- Avoid when: Don't use FileInput for directory or folder uploads; that is not supported in v1. Don't avoid dropzone mode unless space is constrained; drag-and-drop is the expected interaction for file uploads. Don't wrap a disabled FileInput in Tooltip to explain why it's disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Label, Description, Drop zone, Upload icon, Placeholder, File name display, Clear button, Spinner, Status message
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: FileInputShowcase, FileInputBasic
- Upstream: Astryx core · Form Controls
- Keywords: fileinput, file, upload, drag, drop, dropzone, attachment, browse

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

- `upstream/examples/FileInputShowcase.tsx` — File Input · static: `static/FileInputShowcase.html`
- `upstream/examples/FileInputBasic.tsx` — FileInput — Basic: A controlled single-file upload with accepted types, a size limit, and helper text. Use for standard document upload fields in forms. · static: `static/FileInputBasic.html`

## Documentation

### File Input

FileInput provides file upload with optional drag-and-drop support. Use it for single or multiple file selection with built-in validation for file type, size, and count. Pair with validation status for upload feedback.

**Do**

- Always specify an accept prop to guide users toward valid file types.
- Use maxSize and maxFiles to prevent oversized uploads; the component handles validation and error display automatically.
- Add a description to communicate constraints like file size limits or accepted formats.
- Use changeAction for immediate upload workflows that benefit from optimistic UI.

**Don't**

- Don't use FileInput for directory or folder uploads; that is not supported in v1.
- Don't avoid dropzone mode unless space is constrained; drag-and-drop is the expected interaction for file uploads.
- Don't wrap a disabled FileInput in Tooltip to explain why it's disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Label (required) — Text that identifies the field. Always rendered for accessibility even when visually hidden.
- Description — Helper text between the label and the drop zone explaining accepted formats or size limits.
- Drop zone (required) — The clickable area for file selection. In dropzone mode, also accepts dragged files.
- Upload icon — An arrow icon in the drop zone hinting at the upload action.
- Placeholder — Hint text shown when no files are selected.
- File name display — Shows the name(s) of selected files.
- Clear button — A close button that removes selected files and returns focus to the input.
- Spinner — Loading indicator that appears during async upload actions.
- Status message — Validation feedback showing error, warning, or success with a message.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Accessible label for the file input. |
| `value` * | `File \| File[] \| null` |  | Currently selected file(s). Controlled component. |
| `onChange` * | `(files: File \| File[] \| null) => void` |  | Callback fired when files are selected or removed. |
| `changeAction` | `(files: File \| File[] \| null) => Promise<void>` |  | Async change action (React 19 transitions pattern). Use for immediate upload on file selection. |
| `accept` | `string` |  | Accepted file types. Uses the HTML accept attribute format (e.g. "image/*", ".pdf,.doc"). |
| `isMultiple` | `boolean` | `false` | Whether multiple files can be selected. When true, value and onChange use File[] instead of File. |
| `maxSize` | `number` |  | Maximum file size in bytes. Files exceeding this are rejected with an error status. |
| `maxFiles` | `number` |  | Maximum number of files (only applies when isMultiple is true). |
| `isLabelHidden` | `boolean` | `false` | Visually hides the label while keeping it accessible to screen readers. |
| `description` | `string` |  | Description text displayed between the label and input. |
| `isOptional` | `boolean` | `false` | Displays an "Optional" indicator next to the label. Mutually exclusive with isRequired. |
| `isRequired` | `boolean` | `false` | Displays a "Required" indicator next to the label and adds a screen-reader-only "Required" description to the trigger (assistive tech does not reliably announce aria-required on the trigger). Mutually exclusive with isOptional. |
| `isDisabled` | `boolean` | `false` | Disables the input, preventing interaction and dimming the element. |
| `disabledMessage` | `string` |  | Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the trigger focusable via aria-disabled (opening the file picker stays blocked). Use this instead of wrapping a disabled FileInput in Tooltip; disabled controls swallow the hover events an external Tooltip needs. |
| `isLoading` | `boolean` | `false` | Puts the input in a loading state, showing a spinner and setting aria-busy. |
| `placeholder` | `string` | `"Choose file" or "Choose files"` | Placeholder text shown when no file is selected. |
| `mode` | `'input' \| 'dropzone'` | `'input'` | Visual mode. 'input' is a compact inline style; 'dropzone' is a larger area with drag-and-drop support. |
| `status` | `{type: 'error' \| 'warning' \| 'success', message?: string}` |  | Validation status: applies a colored border. If message is provided, displays a floating message below the input. Error type also sets aria-invalid. |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | How the status message is placed relative to the input. attached overlaps directly below the input (bordered treatment); detached floats below as a separate element with spacing; tooltip hides the message box and surfaces it in a tooltip on the status icon. |
| `labelTooltip` | `string` |  | Tooltip text displayed in an info icon at the end of the label. |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |

Styling hook class: `.astryx-file-input`, `.astryx-file-input-icon`

### File Input

FileInput provides file upload with optional drag-and-drop support. Use it for single or multiple file selection with built-in validation for file type, size, and count. Pair with validation status for upload feedback.

**Do**

- Always specify an accept prop to guide users toward valid file types.
- Use maxSize and maxFiles to prevent oversized uploads.
- Add a description to communicate constraints.

**Don't**

- Don't use FileInput for directory uploads.
- Don't use mode='input' unless space is constrained; dropzone mode provides a better experience.
- Don't wrap a disabled FileInput in Tooltip to explain the disabled state; use the disabledMessage prop instead.

**Anatomy**

- Label (required) — Text identifying the field.
- Drop zone (required) — Clickable area for file selection.
- Placeholder — Hint text when no files selected.
- File name display — Shows selected file names.
- Clear button — Removes selected files.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 文件输入框的无障碍标签。 |
| `value` * | `File \| File[] \| null` |  | 当前选中的文件。受控组件。 |
| `onChange` * | `(files: File \| File[] \| null) => void` |  | 文件选择或移除时触发的回调。 |
| `accept` | `string` |  | 接受的文件类型。使用 HTML accept 属性格式。 |
| `isMultiple` | `boolean` | `false` | 是否可以选择多个文件。 |
| `maxSize` | `number` |  | 最大文件大小（字节）。超过此限制的文件将被拒绝。 |
| `maxFiles` | `number` |  | 最大文件数（仅在 isMultiple 为 true 时适用）。 |
| `isLabelHidden` | `boolean` | `false` | 视觉上隐藏标签，保持屏幕阅读器可访问。 |
| `description` | `string` |  | 显示在标签和输入框之间的描述文本。 |
| `isDisabled` | `boolean` | `false` | 禁用输入框，阻止交互并使元素变暗。 |
| `disabledMessage` | `string` |  | 说明输入框被禁用的原因。与 isDisabled 一起使用时，在悬停/键盘聚焦时显示工具提示，并通过 aria-disabled 保持触发器可聚焦（打开文件选择器仍被阻止）。请使用此属性，而不是用 Tooltip 包裹已禁用的 FileInput。 |
| `isLoading` | `boolean` | `false` | 加载状态，显示旋转器并设置 aria-busy。 |
| `placeholder` | `string` |  | 未选择文件时显示的占位符文本。 |
| `mode` | `'input' \| 'dropzone'` | `'input'` | 视觉模式。'input' 为紧凑内联样式；'dropzone' 为支持拖放的较大区域。 |
| `status` | `{type: 'error' \| 'warning' \| 'success', message?: string}` |  | 验证状态。 |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | 状态消息相对于输入框的放置方式。attached 直接叠加在输入框下方（带边框处理）；detached 作为独立元素浮于下方并留有间距；tooltip 隐藏消息框，并在状态图标上以提示气泡形式显示。 |

Styling hook class: `.astryx-file-input`, `.astryx-file-input-icon`

## Files

- `upstream/FileInput.doc.mjs`
- `upstream/FileInput.spec.md`
- `upstream/FileInput.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/FileInput
