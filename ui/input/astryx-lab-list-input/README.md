# List Input

ListInput edits a compact, ordered collection of records with consistent fields, built-in add and remove actions, and optional reordering. Standard Astryx controls rendered in its columns inherit the medium control size so inputs align with the Add, remove, reorder, and validation affordances; an explicit field size still takes precedence. Pointer activation measures Add before pointer-down blur or validation can change layout, then keeps it at that viewport position by adjusting available vertical scroll containers from nearest to outermost. The correction is interaction-scoped and rechecked for one animation frame without persistent scroll or resize observation. Added rows enter with tokenized translate motion; after removal, surviving rows animate into their new positions when their geometry stays stable. Motion never delays onChange, focus handoff, or the announcement, while reduced-motion preferences and unsupported browsers use an instant change. Use it for lists with fewer than seven records and up to three simple fields per record, such as guests, travelers, or tag options. Use a Table for larger collections and a card or step-based form when records need many, complex, or inconsistent fields.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/ListInput.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: ListInput edits a compact, ordered collection of records with consistent fields, built-in add and remove actions, and optional reordering.
- Avoid when: Use for seven or more records or more than three simple fields per record; use a Table or a dedicated editing flow instead. Prevent removal solely to enforce a minimum count; allow the action and explain the resulting requirement with list-level validation.
- Provides: Label and description, First-record field labels, Record fields, Remove action, Reorder handle, Empty state, Add action, Validation messages
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ListInput
- Upstream: Astryx lab (experimental, canary-only upstream) · Form Controls
- Keywords: listinput, list input, editable list, repeatable fields, field array, collection input, reorder, guest list, traveler details

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

- `upstream/stories/ListInput.stories.tsx` — Storybook — ListInput

## Documentation

### List Input

ListInput edits a compact, ordered collection of records with consistent fields, built-in add and remove actions, and optional reordering. Standard Astryx controls rendered in its columns inherit the medium control size so inputs align with the Add, remove, reorder, and validation affordances; an explicit field size still takes precedence. Pointer activation measures Add before pointer-down blur or validation can change layout, then keeps it at that viewport position by adjusting available vertical scroll containers from nearest to outermost. The correction is interaction-scoped and rechecked for one animation frame without persistent scroll or resize observation. Added rows enter with tokenized translate motion; after removal, surviving rows animate into their new positions when their geometry stays stable. Motion never delays onChange, focus handoff, or the announcement, while reduced-motion preferences and unsupported browsers use an instant change. Use it for lists with fewer than seven records and up to three simple fields per record, such as guests, travelers, or tag options. Use a Table for larger collections and a card or step-based form when records need many, complex, or inconsistent fields.

**Do**

- Use stable record keys and consistent columns so focus, validation, and reorder announcements remain attached to the correct record.
- Keep validation timing application-owned. Track touched fields by stable item and column keys when errors should appear after blur, while allowing submit or server errors to display immediately.
- Place validation at the narrowest useful level: field status for one value, item status for a record-wide problem, and list status for collection-wide requirements.
- Forward both status and statusVariant from every column renderer to the rendered Astryx input so field messages use the control's native accessible tooltip pattern.
- Let the floating pointer preview follow both axes while using vertical position alone for insertion. Keep list rows stationary and commit the controlled value once on release. Focused handles move immediately with Arrow Up or Arrow Down while preserving lift, move, drop, and cancel behavior.
- Keep collection motion informational and non-blocking. Added live rows translate into place; removed rows disappear immediately while stable-size survivors close the gap. onChange, focus, and announcements run without waiting, and reduced-motion preferences remain instant.
- Keep repeated pointer adding spatially stable by measuring Add before pointer-down blur or validation changes layout, then preserving that viewport position from the nearest vertical scroll container outward. Slight field clipping should not move Add away from the pointer; a meaningfully hidden focused field still takes priority. Keyboard activation follows the normal focus flow.

**Don't**

- Use for seven or more records or more than three simple fields per record; use a Table or a dedicated editing flow instead.
- Prevent removal solely to enforce a minimum count; allow the action and explain the resulting requirement with list-level validation.

**Anatomy**

- Label and description (required) — Names the complete collection and optionally explains what records to add.
- First-record field labels (required) — ListInput renders primary-tone column labels without separate table chrome and keeps each rendered control's own label visually hidden but semantically associated. At wider widths, repeated labels are visually hidden; when fields stack at 640px or narrower, every record shows its field labels.
- Record fields (required) — Consumer-rendered inputs that receive scoped record state, complete validation status, the native tooltip status variant, and update behavior. When stacked responsively, label-to-input spacing is smallest, field spacing is larger, and record groups use 32px separation so each object remains visually distinct.
- Remove action (required) — Removes its record immediately, moves focus to a predictable neighboring control, and animates surviving rows into their new positions when supported. In the stacked layout, it aligns beside the first field at the top of the record.
- Reorder handle — A trailing vertical grip positioned after Remove, with an accessible label and no hover tooltip. In the stacked layout, both actions align beside the first field at the top of the record. Pointer dragging keeps the list stationary, fades both source and duplicate preview to 50%, lets the duplicate follow freely on both axes, and uses vertical position for the insertion line before committing and animating on release. A focused grip moves one position with Arrow Up or Arrow Down; Space or Enter also enables lift mode with Arrow, Home, End, drop, and Escape controls.
- Empty state — When no records exist, a centered compact EmptyState names the empty collection and directs users to the Add action.
- Add action (required) — Fills the record-fields width, uses the inherited medium control size shared by ListInput fields and actions, and immediately appends a new record created by createItem unless maxItems has been reached. On pointer activation, available vertical scroll containers offset the inserted height from nearest to outermost so the action remains under the pointer; keyboard activation keeps the normal focus behavior, and newly focused field visibility always wins. The live row uses tokenized translate entrance motion when supported, and focus moves to its first field without waiting for the animation.
- Validation messages — Explain field-, item-, or list-level errors, warnings, and success states. Field messages use each input's native tooltip status affordance and do not change row height. Item messages align to the record fields without extending under reorder or remove controls.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Visible label that names the collection. It also provides the accessible name for the complete input. |
| `value` * | `T[]` |  | Current ordered records. ListInput is controlled and never mutates this array or its records. |
| `onChange` * | `(next: T[], change: ListInputChange<T>) => void` |  | Called with the next array after an add, update, remove, or reorder action. The change argument identifies the action and affected record. |
| `getItemKey` * | `(item: T) => React.Key` |  | Returns a stable, unique key for each record. Stable identity preserves focus and announcements when records move. |
| `createItem` * | `() => T` |  | Creates the initial record inserted by the built-in add action. Return a new record with its stable key already assigned. |
| `columns` * | `ListInputColumn<T>[]` |  | Consistent simple fields shown for every record. Use each column width with proportional() or pixel() from @astryxdesign/core/Table to tune the width spread. ListInput owns the visible primary-tone column labels while renderer labels remain semantically available to assistive technology. At 640px or narrower, fields stack, every record shows its field labels, record groups use 32px vertical separation, and row actions align beside the first field. Renderers receive isLabelHidden, complete scoped validation status, statusVariant, and updateItem. |
| `itemName` | `string` |  | Singular noun used in built-in action labels and live announcements, such as "guest" in "Add guest". |
| `description` | `string` |  | Supporting text displayed between the collection label and its records. |
| `status` | `InputStatus` |  | List-level validation status displayed for the complete collection. An error marks the collection invalid and associates its message with the input. |
| `getItemStatus` | `(item: T, index: number) => InputStatus \| undefined` |  | Returns validation status for a complete record, such as an invalid combination of otherwise valid fields. |
| `getFieldStatus` | `(item: T, columnKey: string, index: number) => InputStatus \| undefined` |  | Returns validation status for one field. The renderer receives the complete status plus statusVariant="tooltip" and should forward both to its Astryx input so the native status affordance owns styling, description, keyboard access, and tooltip behavior without changing row height. |
| `isReorderable` | `boolean` | `false` | Shows a trailing vertical grip after the Remove action. During pointer reordering, list rows stay stationary while the source row and a free-moving duplicate that follows the pointer on both axes appear at 50% opacity as a temporary drag-only state; full opacity returns immediately on drop or cancel. Vertical pointer position determines the accent insertion line and final list placement. The controlled order commits and affected rows animate with Astryx motion tokens only on release. When the grip is focused, Arrow Up or Arrow Down immediately moves the record one position. Space or Enter starts lift mode for Arrow, Home, or End previewing; Space or Enter drops and Escape cancels. Focus and live announcements are preserved. |
| `isDisabled` | `boolean` | `false` | Disables the collection and all built-in actions. The disabled state is also passed to each column renderer. |
| `isLoading` | `boolean` | `false` | Marks the collection busy and prevents changes while work is pending. The loading state is also passed to each column renderer. |
| `maxItems` | `number` |  | Maximum number of records that can be added. Once the value reaches this limit, the built-in add action is unavailable. |
| `isLabelHidden` | `boolean` | `false` | Visually hides the collection label while keeping it available to assistive technology. |
| `isOptional` | `boolean` | `false` | Displays an optional indicator beside the collection label. Mutually exclusive with isRequired. |
| `isRequired` | `boolean` | `false` | Displays a required indicator beside the collection label and exposes the requirement to assistive technology. Mutually exclusive with isOptional. |

Styling hook class: `.astryx-list-input`

**Example — Controlled guest list**

```tsx
import {proportional} from '@astryxdesign/core/Table';

type Guest = {id: string; name: string; email: string};

const columns = [
  {
    key: 'name',
    header: 'Name',
    width: proportional(1),
    renderInput: ({item, label, isLabelHidden, status, statusVariant, isDisabled, isLoading, updateItem}) => (
      <TextInput
        label={label}
        isLabelHidden={isLabelHidden}
        value={item.name}
        onChange={name => updateItem({...item, name}, 'name')}
        status={status}
        statusVariant={statusVariant}
        isDisabled={isDisabled}
        isLoading={isLoading}
      />
    ),
  },
  {
    key: 'email',
    header: 'Email',
    width: proportional(2),
    renderInput: ({item, label, isLabelHidden, status, statusVariant, isDisabled, isLoading, updateItem}) => (
      <TextInput
        type="email"
        label={label}
        isLabelHidden={isLabelHidden}
        value={item.email}
        onChange={email => updateItem({...item, email}, 'email')}
        status={status}
        statusVariant={statusVariant}
        isDisabled={isDisabled}
        isLoading={isLoading}
      />
    ),
  },
] satisfies ListInputColumn<Guest>[];

<ListInput
  label="Guests"
  itemName="guest"
  value={guests}
  onChange={setGuests}
  getItemKey={guest => guest.id}
  createItem={() => ({id: crypto.randomUUID(), name: '', email: ''})}
  columns={columns}
  isReorderable
  maxItems={6}
  getFieldStatus={(guest, key) =>
    key === 'email' && guest.email === ''
      ? {type: 'error', message: 'Enter an email address'}
      : undefined
  }
  status={
    guests.length === 0
      ? {type: 'error', message: 'Add at least one guest'}
      : undefined
  }
/>
```

## Files

- `upstream/ListInput.doc.mjs`
- `upstream/ListInput.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
