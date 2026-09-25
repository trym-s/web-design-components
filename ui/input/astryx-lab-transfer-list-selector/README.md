# Transfer List Selector

Use TransferListSelector by default for medium-to-large, inspectable sets where membership and selected order need explicit control. Immediate behavior commits each edit and renders no footer. Choose staged behavior when users must review a set of changes before Apply. Use TransferList directly only in a deliberately custom ComplexSelector surface, such as table column settings with saved views and a custom footer.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/TransferListSelector.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Use TransferListSelector by default for medium-to-large, inspectable sets where membership and selected order need explicit control.
- Avoid when: Use commitBehavior as a presentation or container choice. Both values render the same selector popover; use explicit composition for a different shell. Use a transfer list for a handful of simple choices; CheckboxInput or MultiSelector is more compact.
- Provides: Field label and description, Selector trigger, Search, Selected and available sections, Row actions, Bulk actions, Apply and Cancel footer, Live announcements
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: TransferList, TransferListSelector
- Upstream: Astryx lab (experimental, canary-only upstream) · Form Controls
- Keywords: transfer list, dual list, pick list, selector, popover, selection, reorder, columns, available, selected, immediate, draft, apply

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

- `upstream/stories/TransferList.stories.tsx` — Storybook — TransferList
- `upstream/stories/TransferListSelector.stories.tsx` — Storybook — TransferListSelector

## Documentation

### Transfer List Selector

Use TransferListSelector by default for medium-to-large, inspectable sets where membership and selected order need explicit control. Immediate behavior commits each edit and renders no footer. Choose staged behavior when users must review a set of changes before Apply. Use TransferList directly only in a deliberately custom ComplexSelector surface, such as table column settings with saved views and a custom footer.

**Do**

- Start with immediate behavior. Add, remove, bulk, and reorder changes call onChange as they occur, and closing or dismissing the popover keeps those committed changes.
- Set commitBehavior="staged" when the complete selection should be reviewed or persisted as one transaction. Apply commits a changed draft; Cancel, Escape, and light dismiss discard it.
- Use TransferList directly inside ComplexSelector only when the surface needs custom structure such as saved views, presets, headers, or footer actions. Keep applied and draft state separate and reset the draft whenever the surface opens.
- Use isTransferDisabled and isReorderDisabled independently. Provide disabledMessage whenever either action is unavailable so the constraint is discoverable.
- Keep rows concise and single-line. Use option description as searchable metadata, or renderOption when richer visible content is necessary.
- Commit add, remove, bulk, and keyboard reorder changes immediately. During pointer reordering, keep rows stationary, lock the translucent preview to its source-column position, use vertical pointer movement to determine insertion, and commit once on release. Keep the preview in the nearest popover or dialog top layer.

**Don't**

- Use commitBehavior as a presentation or container choice. Both values render the same selector popover; use explicit composition for a different shell.
- Use a transfer list for a handful of simple choices; CheckboxInput or MultiSelector is more compact.

**Anatomy**

- Field label and description (required) — Names and explains the selector outside the popover so placement does not change with supporting text.
- Selector trigger (required) — Summarizes the committed value and opens the transfer-list popover.
- Search — Filters the selected and available lists without changing their values and uses a uniform 12px inset.
- Selected and available sections (required) — Places two unframed semantic lists beside one divider. Narrow containers stack the sections, use the body background behind each column header, expand both sections to their rows, and delegate overflow to one scrollable containing surface.
- Row actions (required) — Uses a direction-neutral X to remove and plus to add. Selected rows retain a start-aligned grip when reordering is enabled; constraints disable each control independently.
- Bulk actions — Optional Clear and Add all text actions that honor transfer-disabled options.
- Apply and Cancel footer — Rendered only for staged behavior. Apply commits a changed draft; Cancel closes without changing the committed value.
- Live announcements (required) — Reports add, remove, bulk, and reorder results without relying on visual position alone.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Accessible field label shown outside the popover unless isLabelHidden is true. |
| `options` * | `readonly TransferListOption<T>[]` |  | Complete option pool. Each option has value and label, with optional searchable description metadata, group, independent isTransferDisabled and isReorderDisabled constraints, and disabledMessage. |
| `value` * | `readonly T[]` |  | Committed selected values in display order. In staged behavior this is the applied value copied into a local draft when the selector opens. |
| `onChange` * | `(nextValue: readonly T[]) => void` |  | Called after every permitted list edit in immediate behavior, or once when Apply commits a changed draft in staged behavior. |
| `commitBehavior` | `TransferListSelectorCommitBehavior` | `'immediate'` | Controls when changes commit. Immediate updates on each list edit without a footer; staged waits for Apply and supports Cancel or dismiss. |
| `triggerLabel` | `ReactNode` | ``${value.length} selected`` | Content shown in the closed selector trigger. |
| `description` | `string` |  | Supporting field guidance shown with the external label. |
| `isLabelHidden` | `boolean` | `false` | Visually hides the field label while preserving its accessible name. |
| `selectedLabel` | `string` | `'Selected'` | Heading and accessible name for the selected list. |
| `availableLabel` | `string` | `'Available'` | Heading and accessible name for the available list. |
| `hasSearch` | `boolean` | `false` | Shows a shared search field that filters both lists by label and description. |
| `searchLabel` | `string` | `'Search ' followed by label` | Accessible label for the shared search field. |
| `searchPlaceholder` | `string` | `'Search...'` | Placeholder shown in the shared search field. |
| `isReorderable` | `boolean` | `true` | Shows a left-side grip for every selected option. Per-option isReorderDisabled keeps its grip visible but disabled and makes it a fixed-order barrier. |
| `hasSelectAll` | `boolean` | `false` | Shows Add all and adds every transfer-enabled available option to the current selection. |
| `hasClear` | `boolean` | `false` | Shows Clear and removes every transfer-enabled selected option from the current selection. |
| `renderOption` | `(option: TransferListOption<T>) => ReactNode` |  | Customizes row content while retaining built-in labels, actions, constraints, and reorder interaction. |
| `selectedEmptyText` | `string` | `'No selected options'` | Message shown when the selected list is empty. |
| `availableEmptyText` | `string` | `'No available options'` | Message shown when every option has been selected. |
| `noResultsText` | `string` | `'No results'` | Message shown when search has no matches in a list. |
| `applyLabel` | `string` | `'Apply'` | Label for the staged Apply action. Only valid with commitBehavior="staged". |
| `cancelLabel` | `string` | `'Cancel'` | Label for the staged Cancel action. Only valid with commitBehavior="staged". |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Trigger and field size. |
| `width` | `SizeValue` | `'min(41rem, calc(100vw - 32px))'` | Width of the field and its popup; both track this one value. |
| `placement` | `'above' \| 'below' \| 'start' \| 'end'` | `'below'` | Popover placement relative to the trigger. |
| `isOptional` | `boolean` |  | Marks the field optional. |
| `isRequired` | `boolean` |  | Marks the field required. |
| `isDisabled` | `boolean` |  | Disables the selector trigger and transfer interaction. |
| `isLoading` | `boolean` |  | Shows loading state on the trigger and disables transfer interaction while busy. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | Validation status for the field. |
| `statusVariant` | `FieldStatusVariant` |  | Placement treatment for the status message. |
| `labelTooltip` | `string` |  | Tooltip text displayed next to the field label. |
| `changeAction` | `(value: readonly T[]) => void \| Promise<void>` |  | Optional async action run after each immediate commit or a changed staged Apply; drives optimistic and busy state. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for the external selector field. |
| `className` | `string` |  | Class name applied to the external selector field. |
| `style` | `CSSProperties` |  | Inline styles applied to the external selector field. |
| `data-testid` | `string` |  | Test ID for the selector trigger container. |

Styling hook class: `.astryx-transfer-list`, `.astryx-transfer-list-collection`, `.astryx-transfer-list-panel`, `.astryx-transfer-list-item`

**Example — Default immediate selector**

```tsx
const [fields, setFields] = useState(['name', 'status']);

<TransferListSelector
  label="Visible fields"
  description="Choose which fields appear. Changes take effect immediately."
  triggerLabel={fields.length + ' visible fields'}
  options={[
    {value: 'name', label: 'Name'},
    {value: 'status', label: 'Status'},
    {value: 'owner', label: 'Owner'},
  ]}
  value={fields}
  onChange={setFields}
  selectedLabel="Visible fields"
  availableLabel="Available fields"
  hasSelectAll
  hasClear
/>
```

**Example — Staged commit**

```tsx
const [fields, setFields] = useState(['name', 'status']);

<TransferListSelector
  label="Visible fields"
  description="Review the complete selection before applying it."
  options={fieldOptions}
  value={fields}
  onChange={setFields}
  commitBehavior="staged"
  selectedLabel="Visible fields"
  availableLabel="Available fields"
  hasSelectAll
  hasClear
/>
```

**Example — Independent transfer and reorder constraints**

```tsx
<TransferListSelector
  label="Visible fields"
  options={[
    {
      value: 'name',
      label: 'Name',
      isTransferDisabled: true,
      disabledMessage: 'Name must remain visible.',
    },
    {
      value: 'status',
      label: 'Status',
      isReorderDisabled: true,
      disabledMessage: 'Status is fixed in position but can be removed.',
    },
    {value: 'owner', label: 'Owner'},
  ]}
  value={fields}
  onChange={setFields}
/>
```

**Example — Saved views in a custom ComplexSelector**

```tsx
const savedViews = {
  standard: ['name', 'status', 'owner'],
  ownership: ['name', 'owner', 'team'],
};
const [applied, setApplied] = useState(savedViews.standard);
const [draft, setDraft] = useState(applied);
const activeSavedView =
  Object.entries(savedViews).find(
    ([, columns]) =>
      columns.length === draft.length &&
      columns.every((column, index) => column === draft[index]),
  )?.[0] ?? 'custom';

function ResetDraftOnOpen({isOpen, value, onReset}) {
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      onReset([...value]);
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, onReset, value]);

  return null;
}

<ComplexSelector
  label="View options"
  isLabelHidden
  triggerLabel="View options"
  value={applied}
  onChange={setApplied}>
  {(_appliedValue, commit, close, state) => (
    <>
      <ResetDraftOnOpen
        isOpen={state.isOpen}
        value={applied}
        onReset={setDraft}
      />
      <Selector
        label="Saved view"
        options={savedViewOptions}
        value={activeSavedView}
        onChange={nextSavedView => {
          setDraft(savedViews[nextSavedView]);
        }}
      />
      <TransferList
        label="Visible fields"
        isLabelHidden
        options={fieldOptions}
        value={draft}
        onChange={setDraft}
        selectedLabel="Visible fields"
        availableLabel="Available fields"
        hasSelectAll
        hasClear
      />
      <Button label="Cancel" variant="ghost" onClick={close} />
      <Button
        label="Apply"
        variant="primary"
        onClick={() => {
          commit(draft);
          close();
        }}
      />
    </>
  )}
</ComplexSelector>
```

## Files

- `upstream/TransferList.doc.mjs`
- `upstream/TransferListSelector.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
