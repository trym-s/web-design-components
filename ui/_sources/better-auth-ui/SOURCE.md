# Better Auth UI

- Site: https://better-auth-ui.com
- Repository: https://github.com/better-auth-ui/better-auth-ui
- Captured commit: `a036e9a1198aadfd320a81247d463e788c200158`
- Packages: `@better-auth-ui/{core,react,heroui}` 1.7.26 (npm, installed in the bank)
- License: MIT — `LICENSE.md`
- Captured: 2026-09-25T07:33:05Z
- Importer: `node tools/import-better-auth-ui.mjs <better-auth-ui checkout>`, then `node tools/capture-bank.mjs --source better-auth-ui --static --previews`

## Contents

- `app/` — the docs modules the demos reach, same paths as `apps/docs/src/`: the shadcn auth components
  (`components/auth/`), their ui files (`components/ui/`), the mock auth client (`lib/auth-client.tsx`)
  and the plugin configs (`lib/auth/`), and the per-flavour providers (`components/demos/`)
- `shadcn.css`, `heroui.css` — Tailwind v4 builds of `*.input.css`; link one from a static HTML
- `frame-shadcn.tsx`, `frame-heroui.tsx` — bank-only React harnesses; `manifest.json` — every captured entry
- `public/`, `fonts/` — the avatar and logos the demos use, and Inter, localized

## Counts

- shadcn/ui: 54 references
- HeroUI: 54 references
- of which emails: 20

## Excluded

- `zaidan-change-email-confirmation-email` — SolidJS flavour; the viewer does not run Solid
- `zaidan-delete-account-verification-email` — SolidJS flavour; the viewer does not run Solid
- `zaidan-email-changed-email` — SolidJS flavour; the viewer does not run Solid
- `zaidan-email-verification-email` — SolidJS flavour; the viewer does not run Solid
- `zaidan-magic-link-email` — SolidJS flavour; the viewer does not run Solid
- `zaidan-new-device-email` — SolidJS flavour; the viewer does not run Solid
- `zaidan-organization-invitation-email` — SolidJS flavour; the viewer does not run Solid
- `zaidan-otp-email` — SolidJS flavour; the viewer does not run Solid
- `zaidan-password-changed-email` — SolidJS flavour; the viewer does not run Solid
- `zaidan-reset-password-email` — SolidJS flavour; the viewer does not run Solid
