# VerifyEmail (HeroUI)

A verify email component that prompts the user to confirm their email, with a button to open their email provider and a cooldown-limited resend button.

## Classification

- Category: `page` — structural
- Medium: React + TypeScript + HeroUI v3 (Tailwind CSS v4); static HTML
- Framework: react
- Entry point: `upstream/examples/verify-email.tsx`
- Nature: structural; reuse the flow, fields, hierarchy and copy, adapt literal values to the target project.
- Added: 2026-09-25T07:33:05Z
- Curation: pending
- Use when: A verify email component that prompts the user to confirm their email, with a button to open their email provider and a cooldown-limited resend button.
- Provides: `VerifyEmail` from `@better-auth-ui/heroui`
- Requires: React, a Better Auth client and `@better-auth-ui/heroui`
- Variants: default
- Upstream: Better Auth UI 1.7.26 · HeroUI
- Local source fallback: `ui/_sources/better-auth-ui/app/`

## How an agent uses this reference

- **React + HeroUI target** — `npm i @better-auth-ui/heroui@1.7.26 @heroui/react @heroui/styles` and render the
  same component inside its `AuthProvider`; `upstream/examples/` shows the exact usage.
- **Any other stack** — open `static/<example>.html`: the rendered DOM; every class resolves through
  `ui/_sources/better-auth-ui/heroui.css` (HeroUI's styles plus Tailwind utilities).
- The demo data comes from the docs' mock client (`ui/_sources/better-auth-ui/app/lib/auth-client.tsx`), not a server.

## Files

- `upstream/examples/verify-email.tsx` — the docs demo, imports pointed at the snapshot
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://better-auth-ui.com/docs/heroui/components/auth/verify-email
