# ResetPasswordEmail (HeroUI)

Email template component that sends password reset links to users.

## Classification

- Category: `content` — structural
- Medium: HTML email (React Email template, rendered); static HTML
- Framework: react
- Entry point: `src/examples/reset-password-email.tsx`
- Nature: structural; reuse the flow, fields, hierarchy and copy, adapt literal values to the target project.
- Added: 2026-09-25T07:33:05Z
- Curation: pending
- Use when: Email template component that sends password reset links to users.
- Provides: ResetPasswordEmail email template
- Requires: `@better-auth-ui/heroui/email` and `@react-email/render`, or the static HTML
- Variants: default
- Upstream: Better Auth UI 1.7.26 · HeroUI

## How an agent uses this reference

- **Any stack** — `static/reset-password-email.html` is the finished email (table layout, inline styles).
- **React** — render the template from `@better-auth-ui/heroui/email` with `@react-email/render`; `src/examples/` has the props.

## Files

- `src/examples/reset-password-email.tsx` — the docs demo
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point
- `static/reset-password-email.html` — the rendered email

Upstream page: https://better-auth-ui.com/docs/heroui/components/email/reset-password-email
