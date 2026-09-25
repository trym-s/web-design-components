# DeleteAccountVerificationEmail

Email template for verifying a permanent account deletion request.

## Classification

- Category: `content` — structural
- Medium: HTML email (React Email template, rendered); static HTML
- Framework: react
- Entry point: `upstream/examples/delete-account-verification-email.tsx`
- Nature: structural; reuse the flow, fields, hierarchy and copy, adapt literal values to the target project.
- Added: 2026-09-25T07:33:05Z
- Curation: pending
- Use when: Email template for verifying a permanent account deletion request.
- Provides: DeleteAccountVerificationEmail email template
- Requires: `@better-auth-ui/react/email` and `@react-email/render`, or the static HTML
- Variants: default
- Upstream: Better Auth UI 1.7.26 · shadcn/ui

## How an agent uses this reference

- **Any stack** — `static/delete-account-verification-email.html` is the finished email (table layout, inline styles).
- **React** — render the template from `@better-auth-ui/react/email` with `@react-email/render`; `upstream/examples/` has the props.

## Files

- `upstream/examples/delete-account-verification-email.tsx` — the docs demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point
- `static/delete-account-verification-email.html` — the rendered email

Upstream page: https://better-auth-ui.com/docs/shadcn/components/email/delete-account-verification-email
