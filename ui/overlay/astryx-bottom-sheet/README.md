# Bottom Sheet

A mobile touch surface for filters, actions, forms, and detail views that should rise from the bottom of the viewport; use BottomSheetSwitcher for multi-step flows.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/BottomSheet.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A mobile touch surface for filters, actions, forms, and detail views that should rise from the bottom of the viewport; use BottomSheetSwitcher for multi-step flows.
- Avoid when: Don't make the sheet content overly long. Consider breaking it into steps and using Bottom Sheet Switcher.
- Provides: Sheet panel, Content area, Handle, Scrim
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: BottomSheetShowcase, BottomSheetHeights, BottomSheetMobileKeyboard, BottomSheetNoScrim, BottomSheetSnapPoints
- Upstream: Astryx core · Overlay
- Keywords: bottom sheet, sheet, mobile, touch, drag, swipe, snap point, detent, resize, dismiss, grab handle, dialog, overlay, modal, form, mobile keyboard, visual viewport

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

- `src/examples/BottomSheetShowcase.tsx` — Bottom Sheet: A mobile filter surface that rises from the bottom edge. · static: `static/BottomSheetShowcase.html`
- `src/examples/BottomSheetHeights.tsx` — Bottom Sheet — Height variants: Compares hug, capped, and tall starting heights for different amounts of content. · static: `static/BottomSheetHeights.html`
- `src/examples/BottomSheetMobileKeyboard.tsx` — Bottom Sheet — Mobile keyboard: Uses a tall, scrollable form that keeps focused controls visible above the mobile keyboard. · static: `static/BottomSheetMobileKeyboard.html`
- `src/examples/BottomSheetNoScrim.tsx` — Bottom Sheet — No scrim: Keeps the page visible and interactive behind a non-modal bottom sheet. · static: `static/BottomSheetNoScrim.html`
- `src/examples/BottomSheetSnapPoints.tsx` — Bottom Sheet — Snap points: Drag-to-resize stops: a half-height working surface, and a peek that slides away and thins the scrim. · static: `static/BottomSheetSnapPoints.html`

## Documentation

### Bottom Sheet

A mobile touch surface for filters, actions, forms, and detail views that should rise from the bottom of the viewport; use BottomSheetSwitcher for multi-step flows.

**Do**

- Use for mobile-first surfaces (filters, share sheets, quick actions) where the content should rise from the bottom edge.
- Pick the starting height that fits the content: 'hug' for short bounded content, 'capped' for lists, and 'tall' for forms or streaming/resizing content.
- Use purpose='form' to protect entered data from scrim clicks and swipes while keeping Escape available; reserve purpose='required' for flows that must end through an explicit action.

**Don't**

- Don't make the sheet content overly long. Consider breaking it into steps and using Bottom Sheet Switcher.

**Anatomy**

- Sheet panel (required) — Painted surface that rises from the bottom edge and contains the sheet.
- Content area (required) — Scrollable area that presents the caller-provided sheet content.
- Handle (required) — Decorative grab affordance and drag region at the top of the panel.
- Scrim — Backdrop that dims and blocks the page in a scrim-backed presentation.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isOpen` | `boolean` |  | Whether a standalone sheet is open. Fully controlled; pair with onOpenChange. Omit inside BottomSheetSwitcher. |
| `onOpenChange` | `(isOpen: boolean) => void` |  | For a standalone sheet, called when it requests an open-state change. Automatic calls follow purpose: info dismisses on Escape, scrim click, or swipe; form dismisses on Escape only; required never dismisses implicitly. Omit inside BottomSheetSwitcher. |
| `finalFocusRef` | `RefObject<HTMLElement \| null>` |  | Optional explicit focus-return target for a standalone sheet. Use when the opener can remount or the active element is not a reliable trigger, such as an adaptive presentation switch. Omit inside BottomSheetSwitcher. |
| `purpose` | `'required' \| 'form' \| 'info'` | `'info'` | Controls implicit dismissal behavior, matching Dialog. info allows Escape, scrim click, and swipe-to-dismiss. form protects entered data by blocking scrim click and swipe while allowing Escape. required blocks every implicit dismissal path and uses role='alertdialog'. Explicit controls may still update the controlled state. Works for standalone and BottomSheetSwitcher-managed sheets. |
| `sheetId` | `string` |  | Unique ID for this sheet inside BottomSheetSwitcher. The switcher opens it when activeSheet matches. Omit isOpen and onOpenChange when sheetId is used. |
| `label` * | `string` |  | Accessible label for the sheet. Required; the sheet has no built-in heading to derive a name from. |
| `children` * | `ReactNode` |  | Sheet content in a scrollable area. The named body is keyboard reachable while overflowing. Forward Tab entry may move directly to the first native link or button; input controls, composite widgets, and nested scroll areas retain the body stop. Shift+Tab from a delegated first child skips the body. Fitting content adds no body stop. The internal observed content box preserves block flow and percentage heights. If it includes a text-entry control that can bring up the mobile keyboard, use height='tall' and keep the sheet fully expanded while editing. |
| `height` | `'hug' \| 'capped' \| 'tall' \| number \| string` | `'capped'` | How tall the sheet is. Named budgets: 'hug' fits its content up to 92% of the viewport, 'capped' is a scrolling mid-height panel (~62%), and 'tall' is a pinned near-full panel (~92%) for content that streams in. Or pass a number (px) / CSS length for a custom budget. Give snapPoints to let the user drag between heights. On shorter viewports the sheet fills the available height. Only a fully expanded 'tall' sheet provides mobile-keyboard accommodation: it stays put and scrolls each focused control above the keyboard. Hug, Capped, numeric and CSS-length heights never do, and a Tall sheet stops doing it the moment the user drags it to a shorter detent, resuming when they drag it back. Outside that state the sheet neither moves nor adds keyboard scroll space, and the browser's own focus reveal is left in place; on iOS that reveal can shift the whole page. |
| `snapPoints` | `ReadonlyArray<number \| string>` |  | Extra heights the sheet can rest at when dragged; its own height is always the tallest stop, and omitting this gives a sheet that only opens and closes. Each stop is the sheet's visible height: a number is a viewport fraction (0.5 is half the screen), '50%' the same in CSS, '320px' an absolute length. A stop of a quarter of the sheet or less is a peek: it slides away instead of reflowing, and thins the scrim. |
| `hasScrim` | `boolean` | `true` | For a standalone BottomSheet, whether to render a scrim, the semi-transparent overlay that covers and blocks the background. true (default) uses showModal(): top layer, focus trap, ::backdrop scrim, body scroll lock, and tap-scrim-to-dismiss when purpose='info', with the background inert. false uses show() with no scrim, leaving the page behind interactive and scrollable. For a multi-step flow, configure hasScrim on BottomSheetSwitcher instead; it owns one shared dialog across every child. |

Styling hook class: `.astryx-bottom-sheet`

**Example — Basic**

```tsx
const [isOpen, setIsOpen] = useState(false);
<BottomSheet
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  label="Filters">
  <FilterControls />
</BottomSheet>
```

**Example — Tall sheet (a list)**

```tsx
const [isOpen, setIsOpen] = useState(false);
<BottomSheet
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  label="Nearby places"
  height="tall">
  <PlaceList />
</BottomSheet>
```

**Example — Collapsible to half the screen**

```tsx
const [isOpen, setIsOpen] = useState(false);
<BottomSheet
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  label="Nearby places"
  height="tall"
  snapPoints={[0.5]}>
  <PlaceList />
</BottomSheet>
```

**Example — A peek, a working height, and full**

```tsx
const [isOpen, setIsOpen] = useState(false);
<BottomSheet
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  label="Route"
  height="tall"
  snapPoints={['96px', '50%']}>
  <RouteDetails />
</BottomSheet>
```

**Example — Hug height (fits content)**

```tsx
const [isOpen, setIsOpen] = useState(false);
<BottomSheet
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  label="Share"
  height="hug">
  <ShareActions />
</BottomSheet>
```

**Example — Long scrolling content**

```tsx
const [isOpen, setIsOpen] = useState(false);
<BottomSheet
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  label="Release notes"
  height="hug">
  <ReleaseNotes />
</BottomSheet>
```

**Example — Multi-step flow (one sheet at a time)**

```tsx
const [activeSheet, setActiveSheet] = useState(null);
<>
  <Button label="Start" onClick={() => setActiveSheet('details')} />
  <BottomSheetSwitcher
    activeSheet={activeSheet}
    onActiveSheetChange={setActiveSheet}>
    <BottomSheet sheetId="details" label="Details">
      <Button label="Continue" onClick={() => setActiveSheet('confirm')} />
    </BottomSheet>
    <BottomSheet sheetId="confirm" label="Confirm">
      <Button label="Back" onClick={() => setActiveSheet('details')} />
    </BottomSheet>
  </BottomSheetSwitcher>
</>
```

**Example — Mobile keyboard**

```tsx
const [isOpen, setIsOpen] = useState(false);
<BottomSheet
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  label="Add a comment"
  height="tall">
  <LongCommentForm />
</BottomSheet>
```

**Example — No scrim**

```tsx
const [isOpen, setIsOpen] = useState(true);
<BottomSheet
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  label="Nearby places"
  hasScrim={false}>
  <PlaceList />
</BottomSheet>
```

**Example — Protect form input**

```tsx
const [isOpen, setIsOpen] = useState(false);
<BottomSheet
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  purpose="form"
  label="Edit profile">
  <ProfileForm onSave={() => setIsOpen(false)} />
</BottomSheet>
```

## Files

- `src/BottomSheet.doc.mjs`
- `src/BottomSheet.spec.md`
- `src/BottomSheet.tsx`
- `src/BottomSheetEdgeTint.tsx`
- `src/BottomSheetPanel.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/BottomSheet
