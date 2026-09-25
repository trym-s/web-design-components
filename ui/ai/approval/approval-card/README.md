# Approval Card

A human-in-the-loop question must collect a selected or typed answer before an agent acts.

## Classification

- Category: `ai` — human-in-the-loop approval
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the one-question-at-a-time card with ring-dot pager and send arrow
- Use when: a human-in-the-loop question must collect a selected or typed answer before an agent acts.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site
- Shared styles: `ui/_sources/beautiful-ui/styles.css` (token mapping in `ui/_sources/beautiful-ui/SOURCE.md`)

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--foreground`, `--muted`, `--input`, …).
It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`); `approval-card.css` holds the `pop-in` and
`fade-up` keyframes. `src/demo.tsx` is sample data and wiring only.

### ApprovalCard — `approval-card.tsx`

- Props: `questions` (`{ question, type: "single" | "multiple", options: string[] }[]`), `onSubmit(answers)` with one
  `{ selected: number[], custom: string }` per question, `onDismiss()`, `onReset()`, `customPlaceholder` ("Type something…"),
  `sentLabel` ("Answers sent"), `className`.
- Structure: a column (max-width 320 px, min-height 196 px) holding a `--card` card, radius `--radius`, `shadow-xs` plus a
  1 px `--border` ring. Body (12 px padding, `fade-up` 350 ms `cubic-bezier(0.23,1,0.32,1)` on every question change): the
  question (13 px medium, `--foreground`) with a 28 px dismiss × button on the right; below, one row per option (16 px
  indicator + 13 px label, 4 px/6 px padding, `rounded-md`, hover `--accent`) and a last row holding a borderless text input.
  Indicator: circle for `single`, 5 px-radius square for `multiple`; off = 1.5 px inset `--input` ring, on = `--foreground`
  fill with a `--muted` 6 px dot (scales 0→1 in 200 ms) or a check. Footer (10 px/12 px padding): ‹ button, one dot per
  question, › button (24 px, 5 px radius), and on the right a 28 px square send button with an ↑ arrow.
- States: pager dot — current: 9 px ring with a 2.5 px `--foreground` border; answered (before current, or all after
  sending): 7 px `--muted-foreground` fill; upcoming: 7 px ring, 1.5 px `--muted-foreground`; dots animate size in 300 ms.
  Send button — disabled until the current question has a selection or typed text (`--muted` fill, `--muted-foreground`
  icon, `shadow-xs` + `--input` ring); enabled: `--foreground` fill, `--card` icon, inset top highlight
  (`--approval-card-shadow`, declared on the root). Sent: the body is replaced by a 148 px centred block — a 24 px `--success`
  circle with a white check (`pop-in` 300 ms), "Answers sent" (`fade-up` 350 ms, 100 ms delay) and a `--primary`
  "Start over" link; the send button disappears and the pager is disabled. Dismissed: the card collapses to an
  "Open approval" button (`--card`, `shadow-xs` + `--input` ring) that reopens it. `--success` defaults to
  `oklch(0.603 0.155 150.9)` (dark `oklch(0.705 0.154 153.8)`).
- Interactions: picking a `single` option clears the typed text and after 480 ms advances (or submits on the last
  question); `multiple` options toggle. Typing into the custom row clears a `single` selection. The send button advances,
  or on the last question submits and calls `onSubmit`. Dots jump to their question; ‹ › step. Pressed buttons scale to 0.96.
- Keyboard: every option, dot and button is a native `<button>` (Tab order: dismiss, options, input, ‹, dots, ›, send);
  options expose `aria-pressed`, the current dot `aria-current="step"`; the input is labelled "Custom answer".
