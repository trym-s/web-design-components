# AccountSettings (HeroUI)

A container component that wraps the UserProfile component for account settings management.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + HeroUI v3 (Tailwind CSS v4); static HTML
- Framework: react
- Entry point: `upstream/examples/account-settings.tsx`
- Nature: interactive; reuse the flow, fields, hierarchy and copy, adapt literal values to the target project.
- Added: 2026-09-25T07:33:05Z
- Curation: pending
- Use when: A container component that wraps the UserProfile component for account settings management.
- Provides: `AccountSettings` from `@better-auth-ui/heroui`
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

- `upstream/examples/account-settings.tsx` — the docs demo, imports pointed at the snapshot
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://better-auth-ui.com/docs/heroui/components/settings/account/account-settings
