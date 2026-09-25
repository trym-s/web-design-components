# Selector

A dropdown selector for choosing a single value from a list of options. Supports labels, validation, descriptions, and required/optional states. Use it in forms and settings when presenting a moderate number of options. Keyboard typeahead matches a native select: typing on the focused closed trigger selects the matching option directly, repeated presses cycle through options sharing a first letter, and spaces count as match characters ("new y" reaches "New York"). With the menu open, typing moves the highlight and Enter commits. With hasSearch, typing on the closed trigger opens the popup and seeds the search input.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Selector.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A dropdown selector for choosing a single value from a list of options.
- Avoid when: Use for action menus; use Dropdown Menu for triggering commands or navigation. Use when there are only two options; use a SegmentedControl or radio buttons instead. Use Selector for navigation; links should be links, not dropdown options. Use for yes/no or on/off choices; use Switch or CheckboxInput instead. Put more than ~20 options without sections; consider Typeahead for large lists. Wrap a disabled Selector in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Field, Trigger, Icon-rendered start icon, Caller-rendered start content, Trigger clear button, Status icon, Indicator icon, Search row, Search icon, Search clear button, Option row, SelectorOption-rendered content, Bare caller-rendered option content, Option selection indicator, Option divider, Section heading, Empty state, Pointer popup, Touch sheet heading, Touch sheet
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: SelectorOptionShowcase, SelectorShowcase, SelectorBottomSheet, SelectorClearable, SelectorGhostToolbar, SelectorOptionBasic, SelectorOptionDescriptions, SelectorWithSections, SelectorWithStatus
- Upstream: Astryx core · Form Controls
- Keywords: selector, select, dropdown, combobox, picker, listbox, chooser, autocomplete, option, selectmenu

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

- `upstream/examples/SelectorOptionShowcase.tsx` — Selector Option: Selector with custom-rendered options using SelectorOption for icons and descriptions. · static: `static/SelectorOptionShowcase.html`
- `upstream/examples/SelectorShowcase.tsx` — Selector · static: `static/SelectorShowcase.html`
- `upstream/examples/SelectorBottomSheet.tsx` — Selector — Bottom Sheet: Presents a single-selection list in a bottom sheet for compact touch interfaces. · static: `static/SelectorBottomSheet.html`
- `upstream/examples/SelectorClearable.tsx` — Selector — Clearable: Selector with a clear button to reset the selected value. · static: `static/SelectorClearable.html`
- `upstream/examples/SelectorGhostToolbar.tsx` — Selector — Ghost Toolbar: Borderless Selector variant composed with ghost buttons in a toolbar. · static: `static/SelectorGhostToolbar.html`
- `upstream/examples/SelectorOptionBasic.tsx` — SelectorOption — Basic: A selector whose options are rendered with SelectorOption, adding a secondary description below each label. Use inside renderOption for consistent custom option styling. · static: `static/SelectorOptionBasic.html`
- `upstream/examples/SelectorOptionDescriptions.tsx` — Selector — Option descriptions: Options carry a description, so the dropdown draws a two-line row. The closed trigger is sized by padding, so it is the size token for a one-line value and exactly one line taller for a two-line one; both on the 4px rhythm. An InputGroup pins the row, so the value folds back onto one line there. · static: `static/SelectorOptionDescriptions.html`
- `upstream/examples/SelectorWithSections.tsx` — Selector — Grouped Sections: Selector with options grouped into labeled sections. · static: `static/SelectorWithSections.html`
- `upstream/examples/SelectorWithStatus.tsx` — Selector — Validation States: Selector showing error, warning, and success validation states. · static: `static/SelectorWithStatus.html`

## Documentation

### Selector

A dropdown selector for choosing a single value from a list of options. Supports labels, validation, descriptions, and required/optional states. Use it in forms and settings when presenting a moderate number of options. Keyboard typeahead matches a native select: typing on the focused closed trigger selects the matching option directly, repeated presses cycle through options sharing a first letter, and spaces count as match characters ("new y" reaches "New York"). With the menu open, typing moves the highlight and Enter commits. With hasSearch, typing on the closed trigger opens the popup and seeds the search input.

**Do**

- Provide a visible label so users understand what they are selecting.
- Use sections and dividers to organize options when the list exceeds ~8 items.
- Use renderOption for custom option rows. Do not pass SelectorOption directly as JSX children.
- Set a meaningful placeholder that hints at the expected selection (e.g. "Choose a country" not "Select...").
- Use inside InputGroup only when the selector needs a short prefix or suffix addon as part of one decorated input surface.
- Use variant="ghost" when a selector sits in a toolbar with ghost buttons. If validation status is needed there, prefer statusVariant="tooltip" so the toolbar height stays compact.
- Use presentation="adaptive" when the selector should become a bottom sheet on compact touch screens.

**Don't**

- Use for action menus; use Dropdown Menu for triggering commands or navigation.
- Use when there are only two options; use a SegmentedControl or radio buttons instead.
- Use Selector for navigation; links should be links, not dropdown options.
- Use for yes/no or on/off choices; use Switch or CheckboxInput instead.
- Put more than ~20 options without sections; consider Typeahead for large lists.
- Wrap a disabled Selector in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Field — Standalone Field shell that provides the label and optional supporting content; omitted inside InputGroup.
- Trigger (required) — Painted control that displays the current selection or placeholder and opens the selection surface when editable.
- Icon-rendered start icon — Optional leading semantic icon or icon component rendered through Icon.
- Caller-rendered start content — Optional arbitrary React content rendered directly at the start of the trigger.
- Trigger clear button — Shared clear action that removes the selected value when hasClear is enabled.
- Status icon — Status glyph shown in place of the disclosure indicator for attached or tooltip status.
- Indicator icon — Trailing chevron shown when status presentation does not replace it; reflects collapsed or expanded state.
- Search row — Panel header with a borderless search input and optional clear action.
- Search icon — Leading magnifier rendered through Icon inside the search row.
- Search clear button — Shared clear action shown in the search row while a query is present.
- Option row — Selectable row for one supplied option.
- SelectorOption-rendered content — Option content rendered with SelectorOption, either by the default renderer or by renderOption when it returns SelectorOption.
- Bare caller-rendered option content — Arbitrary content returned directly by renderOption without opting into SelectorOption.
- Option selection indicator — Resolved selection mark rendered for each option in its checked or unchecked state. Its layout space collapses when the resolved indicator draws nothing.
- Option divider — Divider supplied in the public options data to separate adjacent option groups.
- Section heading — Visible heading for a labeled group of option rows.
- Empty state — Message shown when the shared panel content has no options or no search matches.
- Pointer popup — Anchored painted surface that hosts the shared panel content for popover presentation.
- Touch sheet heading — Heading above the shared panel content in bottom-sheet presentation.
- Touch sheet — BottomSheet surface that hosts the same panel content for bottom-sheet presentation.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Label text for accessibility. |
| `options` * | `SelectorOption[]` |  | Array of items: strings, objects with value/label/description/icon/disabled, dividers ({type: "divider"}), or sections ({type: "section", title, items}). |
| `value` | `string` |  | Currently selected value. |
| `onChange` | `(value: string) => void` |  | Callback fired when the selection changes. |
| `hasClear` | `boolean` | `false` | Shows a clear (×) button when a value is selected. When true, onChange also accepts null to signal the user cleared the selection. |
| `hasSearch` | `boolean` | `false` | Whether to show a search input for filtering options. As the user types, the match count (or "No results found") is announced to screen readers via a polite live region. The search field has built-in affordances: a leading magnifier icon and, once a query is typed, a trailing clear (✕) button that resets the query and returns focus to the input. |
| `searchPlaceholder` | `string` | `'Search...'` | Placeholder text for the search input. |
| `emptyText` | `ReactNode` | `'No options'` | Content shown in the dropdown panel when there are no options to show, and announced in a polite live region when the panel opens (a string override is announced verbatim; a richer node falls back to the default text). Not shown while isLoading. |
| `emptySearchText` | `ReactNode` | `'No results found'` | Content shown in the dropdown panel when a search query matches no options, and announced in a polite live region at the same time (a string override is announced verbatim; a richer node falls back to the default text). |
| `placeholder` | `string` | `'Select...'` | Placeholder text shown when no value is selected. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant for the selector. |
| `variant` | `'input' \| 'ghost'` | `'input'` | Visual trigger style. input is the bordered input treatment for forms; ghost is borderless and matches ghost buttons for toolbar usage. |
| `isDisabled` | `boolean` | `false` | Disables the selector. |
| `isReadOnly` | `boolean` | `false` | Makes the selector read-only: the selected value stays visible, focusable, and included in form submission, and retains its combobox identity with aria-readonly. The selection surface, clear action, and disclosure indicator are removed. Unlike isDisabled, the control is not dimmed. isDisabled takes precedence when both are set. |
| `htmlName` | `string` |  | The HTML name attribute for form submissions. Renders a hidden input carrying the selected value, like a native select. |
| `disabledMessage` | `string` |  | Explains why the selector is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the trigger focusable via aria-disabled (activation stays blocked). Use this instead of wrapping a disabled Selector in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `isLabelHidden` | `boolean` | `false` | Visually hides the label while keeping it accessible. |
| `description` | `string` |  | Helper text displayed below the label. |
| `isOptional` | `boolean` | `false` | Marks the field as optional. |
| `isRequired` | `boolean` | `false` | Marks the field as required. |
| `status` | `{type: 'error' \| 'warning' \| 'success', message?: string}` |  | Validation status with an optional message. |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached' for input selectors; 'detached' for ghost selectors` | How the status message is placed relative to the input. attached overlaps directly below the bordered input and is only valid for the input variant; ghost selectors detach attached status messages by default. Use tooltip for compact toolbar controls. |
| `renderOption` | `(option: SelectorOptionData) => ReactNode` |  | Custom render function for each selectable option in the dropdown. Use this instead of JSX children; dividers and sections are rendered by the selector. |
| `renderValue` | `(option: SelectorOptionData) => ReactNode` |  | Custom render function for the selected option inside the closed trigger. The trigger is sized by padding, so it is the size token for a one-line value (28/32/36) and exactly one text line taller for a two-line one (48/52/56), always on the 4px rhythm, always aligned with the buttons and inputs beside it. Inside an InputGroup the group owns the row height: a SelectorOption folds onto one line and ellipsizes, and any taller node is cut off at the row. |
| `indicatorPosition` | `'start' \| 'end'` | `'end'` | Which logical edge of the option row carries a rendered selection mark. An empty mark consumes no space, so selected and unselected labels may shift or have different available width. end is the house convention shared with Typeahead and CommandPalette. |
| `presentation` | `'popover' \| 'bottom-sheet' \| 'adaptive'` | `'popover'` | How the option list is presented. adaptive uses a bottom sheet on compact touch screens and an anchored popover otherwise. |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |
| `startIcon` | `IconType \| ReactNode` |  | Icon displayed at the start of the selector trigger. |
| `isLoading` | `boolean` | `false` | Shows a loading spinner in the trigger. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-selector`, `.astryx-selector-option`, `.astryx-selector-option-row`, `.astryx-selector-search`, `.astryx-selector-section-heading`, `.astryx-selector-empty-state`, `.astryx-selector-clear-icon`, `.astryx-selector-indicator-icon`, `.astryx-selector-check`, `.astryx-selector-popup`

### Selector Option

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `ReactNode` |  | Primary label text for the item. |
| `icon` | `IconType` |  | Icon displayed before the label. See `astryx docs icons` for valid semantic names. |
| `description` | `ReactNode` |  | Secondary description text displayed below the label. |
| `layout` | `'stacked' \| 'inline'` | `'stacked'` | How the label and description sit together. 'stacked' puts the description on its own line; 'inline' keeps both on one line so the row fits a fixed-height host. Inside a Selector trigger the trigger's padding sizes itself to whichever layout you pick, so both land on the 4px rhythm; an InputGroup pins the row height and forces 'inline'. |
| `endContent` | `ReactNode` |  | Additional content rendered after the label and description. |

### Selector Option

### Selector Option

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `ReactNode` |  | 选项的主标签文本。 |
| `icon` | `IconType` |  | 显示在标签前的图标。 |
| `description` | `ReactNode` |  | 显示在标签下方的次要描述文本。 |
| `endContent` | `ReactNode` |  | 在标签和描述之后渲染的附加内容。 |

## Files

- `upstream/Selector.doc.mjs`
- `upstream/Selector.spec.md`
- `upstream/Selector.tsx`
- `upstream/SelectorBottomSheet.tsx`
- `upstream/SelectorOption.doc.mjs`
- `upstream/SelectorOption.tsx`
- `upstream/SelectorRowLayoutContext.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Selector
