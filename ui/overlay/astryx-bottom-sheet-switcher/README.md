# Bottom Sheet Switcher

Coordinates a multi-step bottom-sheet flow in one shared dialog; set activeSheet to a nested BottomSheet's sheetId to open or switch steps, and to null to close.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/BottomSheetSwitcher.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Coordinates a multi-step bottom-sheet flow in one shared dialog; set activeSheet to a nested BottomSheet's sheetId to open or switch steps, and to null to close.
- Avoid when: Don't split information across sheets when people need to compare it; use a full-page layout that keeps the relevant content visible together instead. Don't use the switcher when multiple panels must stay interactive or visible together; activeSheet intentionally selects one interactive step.
- Provides: Shared dialog, Sheet panels, Scrim
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: BottomSheetSwitcherShowcase, BottomSheetSwitcherReviewFlow
- Upstream: Astryx core · Overlay
- Keywords: bottom sheet, switcher, multi-step, flow, wizard

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

- `src/examples/BottomSheetSwitcherShowcase.tsx` — Bottom Sheet Switcher: A three-step flow that transitions between content-hugging sheets of different heights inside one shared dialog. · static: `static/BottomSheetSwitcherShowcase.html`
- `src/examples/BottomSheetSwitcherReviewFlow.tsx` — Bottom Sheet Switcher — Review flow: A two-step form flow that lets a person review settings, confirm them, or move back without replacing the shared dialog. · static: `static/BottomSheetSwitcherReviewFlow.html`

## Documentation

### Bottom Sheet Switcher

Coordinates a multi-step bottom-sheet flow in one shared dialog; set activeSheet to a nested BottomSheet's sheetId to open or switch steps, and to null to close.

**Do**

- Use when each step depends on the previous one and only one step needs attention at a time.
- Give every child a unique sheetId and non-empty label, choose its purpose to match dismissal requirements, and follow the WAI-ARIA Dialog (Modal) pattern for scrim-backed flows: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/.

**Don't**

- Don't split information across sheets when people need to compare it; use a full-page layout that keeps the relevant content visible together instead.
- Don't use the switcher when multiple panels must stay interactive or visible together; activeSheet intentionally selects one interactive step.

**Anatomy**

- Shared dialog (required) — One native dialog that owns modality, focus, dismissal, and lifecycle for the complete flow.
- Sheet panels (required) — Direct BottomSheet children; exactly one is interactive while a previous panel may remain visible and inert during a handoff.
- Scrim — Native dialog backdrop shown by the default scrim-backed modal presentation.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ref` | `Ref<HTMLDialogElement>` |  | Ref forwarded to the one shared native dialog. |
| `onCancel` | `(event: SyntheticEvent<HTMLDialogElement>) => void` |  | Called before the switcher handles a native dialog cancel request. Calling preventDefault() keeps the controlled flow open. |
| `activeSheet` * | `string \| null` |  | ID of the interactive BottomSheet, or null when the flow should close. Match a nested BottomSheet's unique sheetId; the previous sheet may remain visually present and inert while the new sheet enters, simultaneously align downward behind a shorter step, then fade away. |
| `onActiveSheetChange` * | `(activeSheet: string \| null) => void` |  | Called with null when the active sheet dismisses according to its purpose. Child BottomSheets may use purpose='form' or purpose='required' to limit implicit dismissal while flow controls can still use the same state setter to switch sheets or close the flow. |
| `hasScrim` | `boolean` | `true` | Whether the shared dialog is modal. true uses showModal() once for one native ::backdrop, focus trap, scroll lock, and click-to-dismiss when the active BottomSheet has purpose='info'. false uses show() with no backdrop and leaves the page interactive; avoid transformed, contained, or clipping ancestors because the non-modal dialog remains in its containing context. |
| `children` * | `ReactNode` |  | BottomSheets identified by unique sheetId values. |

**Example — Three-step flow**

```tsx
const [activeSheet, setActiveSheet] = useState(null);

<>
  <Button label="Start" onClick={() => setActiveSheet('details')} />
  <BottomSheetSwitcher
    activeSheet={activeSheet}
    onActiveSheetChange={setActiveSheet}>
    <BottomSheet sheetId="details" label="Details" height="hug">
      <SetupDetails />
      <Button label="Continue" onClick={() => setActiveSheet('preferences')} />
    </BottomSheet>
    <BottomSheet sheetId="preferences" label="Preferences" height="hug">
      <Preferences />
      <Button label="Back" onClick={() => setActiveSheet('details')} />
      <Button label="Continue" onClick={() => setActiveSheet('confirm')} />
    </BottomSheet>
    <BottomSheet sheetId="confirm" label="Confirm" height="hug">
      <Confirmation />
      <Button label="Back" onClick={() => setActiveSheet('preferences')} />
      <Button label="Done" onClick={() => setActiveSheet(null)} />
    </BottomSheet>
  </BottomSheetSwitcher>
</>
```

## Files

- `src/BottomSheetSwitcher.doc.mjs`
- `src/BottomSheetSwitcher.spec.md`
- `src/BottomSheetSwitcher.tsx`
- `src/BottomSheetSwitcherContext.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/BottomSheetSwitcher
