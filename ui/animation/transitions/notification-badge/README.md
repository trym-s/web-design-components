# Notification Badge

A small badge appearing on top of a trigger (bell, inbox, button).

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the slide-in pop and blur-out

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `lucide-react` (demo bell icon), `clsx` and `tailwind-merge` (through `lib/utils.ts`). `notification-badge.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### NotificationBadge — `notification-badge.tsx`

- Props: `children` (the icon), `count` (1), `open` / `defaultOpen` (true) / `onOpenChange(open)`, `aria-label`, `className`.
- Structure: a 40 px round button (`--card`, `shadow-sm` + `--border` ring) with the icon; the badge sits 6 px above and 8 px
  outside its top-right corner: a 16 px pill (min-width 16, 4 px padding) in `--destructive` with 10 px semibold white tabular
  digits. Clicking toggles `open` (the demo uses it as "mark read" / "new notification").
- Motion: appearing, the badge slides in from (`--badge-offset-x` −8.2 px, `--badge-offset-y` 12.4 px) over
  `--badge-slide-dur` (260 ms, `cubic-bezier(0.22, 1, 0.36, 1)`) while the dot pops from scale 0 / blur 2 px to 1 over
  `--badge-pop-dur` (500 ms, overshooting `cubic-bezier(0.34, 1.36, 0.64, 1)`) and fades in over `--badge-fade-dur` (400 ms).
  Disappearing, it scales to 0, blurs `--badge-blur` (2 px) and fades over 180 ms (`cubic-bezier(0.4, 0, 0.2, 1)`).
- Keyboard: native button; the badge is `aria-hidden` while closed — put the count in `aria-label`.
