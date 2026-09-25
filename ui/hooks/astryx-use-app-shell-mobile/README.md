# useAppShellMobile

Hook for reading and controlling AppShell mobile navigation state from descendants of AppShell. Use it for custom mobile nav triggers, closing the drawer after route changes, or coordinating AppShell-adjacent mobile experiences with the same breakpoint used by mobile nav.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useAppShellMobile.doc.mjs`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Hook for reading and controlling AppShell mobile navigation state from descendants of AppShell.
- Avoid when: Use as a general responsive primitive when the UI is not inside AppShell or does not need to align with AppShell mobile nav: use useMediaQuery instead. Assume it throws outside AppShell. The hook returns safe defaults and no-op callbacks when no provider is present.
- Provides: useAppShellMobile
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: AppShellMobileHookUsage
- Upstream: Astryx core · layout
- Keywords: appshell, mobile nav, mobile drawer, hamburger, navigation toggle, responsive navigation, drawer state

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
- Hooks carry behavior only: port the logic, keep the accessibility contract.

## Examples

- `src/examples/AppShellMobileHookUsage.tsx` — useAppShellMobile — Custom Mobile Trigger: Custom mobile navigation trigger built with useAppShellMobile. The trigger consumes the surrounding AppShell context instead of rendering its own shell. · static: `static/AppShellMobileHookUsage.html`

## Documentation

### useAppShellMobile

Import: `@astryxdesign/core/AppShell`

Hook for reading and controlling AppShell mobile navigation state from descendants of AppShell. Use it for custom mobile nav triggers, closing the drawer after route changes, or coordinating AppShell-adjacent mobile experiences with the same breakpoint used by mobile nav.

**Do**

- Use inside the AppShell tree when building custom mobile navigation controls, route-aware nav items, or UI that should update at the same breakpoint as AppShell mobile nav.
- Prefer MobileNavToggle for the standard hamburger trigger: use this hook when you need custom placement, styling, or extra behavior.
- Call closeMobileNav after a custom mobile nav item changes route so the drawer dismisses cleanly.

**Don't**

- Use as a general responsive primitive when the UI is not inside AppShell or does not need to align with AppShell mobile nav: use useMediaQuery instead.
- Assume it throws outside AppShell. The hook returns safe defaults and no-op callbacks when no provider is present.

**Returns**

```ts
[
  {
    "name": "isMobile",
    "type": "boolean",
    "description": "Whether the current viewport is below the AppShell mobile navigation breakpoint. Use this to synchronize AppShell-adjacent mobile UI with the same breakpoint as mobile nav."
  },
  {
    "name": "isMobileNavOpen",
    "type": "boolean",
    "description": "Whether the AppShell-managed mobile navigation drawer is open."
  },
  {
    "name": "mobileNavId",
    "type": "string | undefined",
    "description": "DOM id of the mobile navigation drawer, set by AppShell. Point aria-controls of a custom toggle at this so screen-reader users know which element the toggle expands. Undefined outside an AppShell that manages the drawer."
  },
  {
    "name": "toggleMobileNav",
    "type": "() => void",
    "description": "Toggle the AppShell-managed mobile navigation drawer. No-ops when mobile nav is disabled."
  },
  {
    "name": "openMobileNav",
    "type": "() => void",
    "description": "Open the AppShell-managed mobile navigation drawer. No-ops when mobile nav is disabled."
  },
  {
    "name": "closeMobileNav",
    "type": "() => void",
    "description": "Close the AppShell-managed mobile navigation drawer."
  },
  {
    "name": "isMobileNavEnabled",
    "type": "boolean",
    "description": "Whether AppShell mobile navigation is enabled and managed by AppShell. False when mobileNav is false, there is no nav content, or a fully custom mobileNav ReactNode owns the drawer."
  },
  {
    "name": "hasAutoToggle",
    "type": "boolean",
    "description": "Whether AppShell auto-toggle behavior is enabled. False when mobileNav hasToggle is set to false; combine with isMobile and isMobileNavEnabled before rendering custom toggles."
  }
]
```

## Files

- `src/useAppShellMobile.doc.mjs`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useAppShellMobile
