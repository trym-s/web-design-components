# Command Palette

CommandPalette is a searchable dialog for quick access to commands, navigation, and actions. Use it as a keyboard-driven launcher powered by SearchSource for filtering and selection.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/CommandPalette.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: CommandPalette is a searchable dialog for quick access to commands, navigation, and actions.
- Avoid when: Use CommandPalette for simple dropdowns or menus; use Menu or Selector for inline selections. Add too many groups or items; curate results to keep the palette fast and scannable.
- Provides: Dialog, Input, Search glyph, Query field, Loading spinner, List, Item, Group, Group heading, Empty, Footer, Keyboard shortcut
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: CommandPaletteEmptyShowcase, CommandPaletteFooterShowcase, CommandPaletteGroupShowcase, CommandPaletteInputShowcase, CommandPaletteItemShowcase, CommandPaletteListShowcase, CommandPaletteShowcase, CommandPaletteAsyncSearch, CommandPaletteAutoGrouped, CommandPaletteCustomFooter, CommandPaletteEmptyBasic, CommandPaletteFooterBasic, CommandPaletteGroupBasic, CommandPaletteInputBasic, CommandPaletteItemBasic, CommandPaletteListBasic, CommandPalettePickerMode, CommandPaletteRichItems
- Upstream: Astryx core · Overlay
- Keywords: command, spotlight, launcher, omnibox, quicksearch, palette, finder, search, modal, dialog, navigation

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

- `upstream/examples/CommandPaletteEmptyShowcase.tsx` — Command Palette Empty: Command palette empty state shown when no commands are available. · static: `static/CommandPaletteEmptyShowcase.html`
- `upstream/examples/CommandPaletteFooterShowcase.tsx` — Command Palette Footer: Command palette footer with custom tip content. · static: `static/CommandPaletteFooterShowcase.html`
- `upstream/examples/CommandPaletteGroupShowcase.tsx` — Command Palette Group: Command palette groups in both data-driven (auxiliaryData.group) and composed (CommandPaletteGroup + CommandPaletteItem) forms. · static: `static/CommandPaletteGroupShowcase.html`
- `upstream/examples/CommandPaletteInputShowcase.tsx` — Command Palette Input: Command palette search input with a custom placeholder and a keyboard shortcut hint in the endContent slot. · static: `static/CommandPaletteInputShowcase.html`
- `upstream/examples/CommandPaletteItemShowcase.tsx` — Command Palette Item: Command palette items with custom content via renderItem and as composed CommandPaletteItem with icons, highlighted, selected, and disabled states. · static: `static/CommandPaletteItemShowcase.html`
- `upstream/examples/CommandPaletteListShowcase.tsx` — Command Palette List: Scrollable command palette list with grouped items, including a highlighted item, composed without a full CommandPalette. · static: `static/CommandPaletteListShowcase.html`
- `upstream/examples/CommandPaletteShowcase.tsx` — Command Palette: Basic command palette with static items and keyboard navigation. · static: `static/CommandPaletteShowcase.html`
- `upstream/examples/CommandPaletteAsyncSearch.tsx` — CommandPalette — Async Search: Server-side search with loading spinner and custom empty states. · static: `static/CommandPaletteAsyncSearch.html`
- `upstream/examples/CommandPaletteAutoGrouped.tsx` — CommandPalette — Grouped: Command palette with items grouped via auxiliaryData.group. · static: `static/CommandPaletteAutoGrouped.html`
- `upstream/examples/CommandPaletteCustomFooter.tsx` — CommandPalette — Custom Footer: Command palette with a custom footer tip message. · static: `static/CommandPaletteCustomFooter.html`
- `upstream/examples/CommandPaletteEmptyBasic.tsx` — CommandPaletteEmpty — Basic: A command palette with no results, showing a custom empty message via emptyBootstrapText. Use to explain why the palette is empty and what the user can do next. · static: `static/CommandPaletteEmptyBasic.html`
- `upstream/examples/CommandPaletteFooterBasic.tsx` — CommandPaletteFooter — Basic: A command palette footer with no children, rendering the built-in keyboard navigation hints. Use CommandPaletteFooter without content to get the default arrow-key, Enter, and Esc hints below the results list. · static: `static/CommandPaletteFooterBasic.html`
- `upstream/examples/CommandPaletteGroupBasic.tsx` — CommandPaletteGroup — Basic: Command palette items organized under group headings using the composed CommandPaletteGroup form. Use to separate related commands into labeled sections. · static: `static/CommandPaletteGroupBasic.html`
- `upstream/examples/CommandPaletteInputBasic.tsx` — CommandPaletteInput — With End Content: Custom placeholder and a keyboard shortcut badge in the trailing slot via endContent. · static: `static/CommandPaletteInputBasic.html`
- `upstream/examples/CommandPaletteItemBasic.tsx` — CommandPaletteItem — Basic: Selectable command palette items inside a CommandPaletteList, including highlighted and disabled states. Use when composing a palette manually instead of a search source. · static: `static/CommandPaletteItemBasic.html`
- `upstream/examples/CommandPaletteListBasic.tsx` — CommandPaletteList — Item States: Flat list showing the highlighted, selected, and disabled item states. Use CommandPaletteGroup to add section headings. · static: `static/CommandPaletteListBasic.html`
- `upstream/examples/CommandPalettePickerMode.tsx` — CommandPalette — Picker Mode: Single-value picker with persistent selection and check indicator. · static: `static/CommandPalettePickerMode.html`
- `upstream/examples/CommandPaletteRichItems.tsx` — CommandPalette — Rich Items: Custom item rendering with icons, keyboard shortcuts, and keyword search. · static: `static/CommandPaletteRichItems.html`

## Documentation

### Command Palette

CommandPalette is a searchable dialog for quick access to commands, navigation, and actions. Use it as a keyboard-driven launcher powered by SearchSource for filtering and selection.

**Do**

- Provide a searchSource with bootstrap results so users see useful options before typing.
- Use auxiliaryData.group on items to automatically organize results into labeled sections.

**Don't**

- Use CommandPalette for simple dropdowns or menus; use Menu or Selector for inline selections.
- Add too many groups or items; curate results to keep the palette fast and scannable.

**Anatomy**

- Dialog (required) — Modal surface that contains the command palette.
- Input (required) — Search region containing the query field and its supporting visuals.
- Search glyph (required) — Search symbol rendered by Icon in the default Input.
- Query field (required) — Native text field used to enter a search query.
- Loading spinner — Spinner shown in the default Input while a search is pending.
- List (required) — Scrollable listbox containing the current results or Empty state.
- Item — Selectable command result rendered inside the List.
- Group — Optional collection of Items that share a heading.
- Group heading — Visible heading rendered for a Group.
- Empty — Message shown when the current result set is empty.
- Footer — Footer region for default keyboard guidance or caller-provided content.
- Keyboard shortcut — Painted key badges rendered by Kbd in the default Footer guidance.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isOpen` * | `boolean` |  | Whether the command palette dialog is visible. |
| `onOpenChange` * | `(isOpen: boolean) => void` |  | Called when the palette visibility changes. |
| `searchSource` * | `SearchSource<T>` |  | Search source providing items via search(query) and bootstrap(). Use createStaticSource for static lists. |
| `input` | `ReactNode` | `<CommandPaletteInput />` | Input slot. Defaults to CommandPaletteInput with standard behavior. |
| `footer` | `ReactNode` | `<CommandPaletteFooter />` | Footer slot. Defaults to CommandPaletteFooter showing keyboard hints. |
| `renderItem` | `(item: T, isSelected: boolean) => ReactNode` |  | Per-item render function. Auto-grouping by auxiliaryData.group is preserved. When omitted, renders label text. |
| `emptySearchText` | `ReactNode` | `'No results'` | Content shown when a search query returns no results. |
| `emptyBootstrapText` | `ReactNode` | `'Type to search'` | Content shown when there is no search query and bootstrap() returns nothing. |
| `value` | `string` |  | Controlled selected value for picker mode. |
| `onValueChange` | `(value: string) => void` |  | Called when the selected value changes in picker mode. |
| `label` | `string` | `'Command palette'` | Accessible label for the command palette dialog. |
| `width` | `number \| string` | `640` | Width of the dialog. |
| `maxHeight` | `number \| string` | `480` | Maximum height of the dialog. |
| `isInline` | `boolean` | `false` | Renders command palette content inline without modal behavior. Automatically disables input auto-focus and initial highlighted-item auto-scroll. For documentation previews and showcases only. |

Styling hook class: `.astryx-command-palette-empty`, `.astryx-command-palette-footer`, `.astryx-command-palette-group`, `.astryx-command-palette-group-heading`, `.astryx-command-palette-input`, `.astryx-command-palette-item`, `.astryx-command-palette-list`

### Command Palette Empty

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Message or content to display. |

### Command Palette Empty

### Command Palette Empty

### Command Palette Footer

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | Custom footer content. When omitted, renders default keyboard hints via Kbd. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value. |

### Command Palette Footer

### Command Palette Footer

### Command Palette Group

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` * | `string` |  | Group heading text. |
| `children` * | `ReactNode` |  | CommandPaletteItem children. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value. |

### Command Palette Group

### Command Palette Group

### Command Palette Input

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `string` | `'Search...'` | Placeholder text for the input. |
| `label` | `string` |  | Accessible label for the combobox input, announced by screen readers. Falls back to the placeholder text when omitted. |
| `hasAutoFocus` | `boolean` | `true` | Auto-focus the input when mounted. Automatically disabled when inside an inline command palette. |
| `endContent` | `ReactNode` |  | Content rendered at the trailing end of the input, after the spinner. Use for clear buttons or keyboard shortcut hints. |
| `value` | `string` |  | Search value. When omitted inside CommandPalette, reads from context. |
| `onValueChange` | `(value: string) => void` |  | Called when search value changes. When omitted inside CommandPalette, writes to context. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value. |

### Command Palette Input

### Command Palette Input

### Command Palette Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` * | `string` |  | Unique value for identification and selection. |
| `children` * | `ReactNode` |  | Item content: render icons, descriptions, keyboard shortcuts, etc. |
| `onSelect` | `(value: string) => void` |  | Called when this item is selected via click or Enter. |
| `isHighlighted` | `boolean` | `false` | Whether this item has keyboard focus. Derived from context when inside CommandPalette. |
| `isSelected` | `boolean` | `false` | Whether this item is selected in picker mode. |
| `isDisabled` | `boolean` | `false` | Whether the item is non-interactive. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value. |

### Command Palette Item

### Command Palette Item

### Command Palette List

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Items, groups, and empty states. |
| `label` | `string` | `'Commands'` | Accessible label for the listbox. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value. |

### Command Palette List

### Command Palette List

## Files

- `upstream/CommandPalette.doc.mjs`
- `upstream/CommandPalette.spec.md`
- `upstream/CommandPalette.tsx`
- `upstream/CommandPaletteContext.ts`
- `upstream/CommandPaletteEmpty.doc.mjs`
- `upstream/CommandPaletteEmpty.tsx`
- `upstream/CommandPaletteFooter.doc.mjs`
- `upstream/CommandPaletteFooter.tsx`
- `upstream/CommandPaletteGroup.doc.mjs`
- `upstream/CommandPaletteGroup.tsx`
- `upstream/CommandPaletteInput.doc.mjs`
- `upstream/CommandPaletteInput.tsx`
- `upstream/CommandPaletteItem.doc.mjs`
- `upstream/CommandPaletteItem.tsx`
- `upstream/CommandPaletteList.doc.mjs`
- `upstream/CommandPaletteList.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/CommandPalette
