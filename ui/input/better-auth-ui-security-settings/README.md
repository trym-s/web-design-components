# SecuritySettings

A container component that wraps security-related settings like password management.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + shadcn/ui (Tailwind CSS v4, radix-ui); static HTML
- Framework: react
- Entry point: `src/examples/security-settings.tsx`
- Nature: interactive; reuse the flow, fields, hierarchy and copy, adapt literal values to the target project.
- Added: 2026-09-25T07:33:05Z
- Curation: pending
- Use when: A container component that wraps security-related settings like password management.
- Provides: `SecuritySettings` from the shadcn component set
- Requires: React, a Better Auth client and `@better-auth-ui/react`
- Variants: default
- Upstream: Better Auth UI 1.7.26 · shadcn/ui
- Local source fallback: `ui/_sources/better-auth-ui/app/`

## How an agent uses this reference

- **React + shadcn/ui target** — `npx shadcn@latest add https://better-auth-ui.com/r/<component>.json` installs the same component
  set; or copy the files under `ui/_sources/better-auth-ui/app/components/auth/` it imports. They run on
  `@better-auth-ui/react` (headless hooks) and a Better Auth client.
- **Any other stack** — open `static/<example>.html`: the rendered DOM; every class resolves through
  `ui/_sources/better-auth-ui/shadcn.css`. Keep the markup and tokens; re-implement the auth calls.
- The demo data comes from the docs' mock client (`ui/_sources/better-auth-ui/app/lib/auth-client.tsx`), not a server.

## Files

- `src/examples/security-settings.tsx` — the docs demo, imports pointed at the snapshot
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://better-auth-ui.com/docs/shadcn/components/settings/security/security-settings
