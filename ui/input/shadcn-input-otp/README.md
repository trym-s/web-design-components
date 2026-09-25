# Input OTP

Accessible one-time password component with copy-paste functionality.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/input-otp.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Accessible one-time password component with copy-paste functionality.
- Provides: input-otp with 9 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: input-otp-demo, input-otp-pattern, input-otp-separator, input-otp-disabled, input-otp-controlled, input-otp-invalid, input-otp-four-digits, input-otp-alphanumeric, input-otp-form
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add input-otp`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/input-otp.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `input-otp-demo` — `upstream/examples/input-otp-demo.tsx`, `static/input-otp-demo.html`

## About

Input OTP is built on top of [input-otp](https://github.com/guilhermerodz/input-otp) by [@guilherme_rodz](https://twitter.com/guilherme_rodz).

## Installation

```bash
npx shadcn@latest add input-otp
```

- Install the following dependencies:

```bash
npm install input-otp
```

- Copy and paste the following code into your project.

Source: `components/ui/input-otp.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
```

```tsx showLineNumbers
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

## Composition

Use the following composition to build an `InputOTP`:

```text
InputOTP
├── InputOTPGroup
│   ├── InputOTPSlot
│   ├── InputOTPSlot
│   └── InputOTPSlot
├── InputOTPSeparator
├── InputOTPGroup
│   ├── InputOTPSlot
│   ├── InputOTPSlot
│   └── InputOTPSlot
├── InputOTPSeparator
└── InputOTPGroup
    ├── InputOTPSlot
    └── InputOTPSlot
```

## Pattern

Use the `pattern` prop to define a custom pattern for the OTP input.

```tsx showLineNumbers {1,5}
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

;<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  ...
</InputOTP>
```

> Example `input-otp-pattern` — `upstream/examples/input-otp-pattern.tsx`, `static/input-otp-pattern.html`

## Separator

Use the `<InputOTPSeparator />` component to add a separator between input groups.

> Example `input-otp-separator` — `upstream/examples/input-otp-separator.tsx`, `static/input-otp-separator.html`

## Disabled

Use the `disabled` prop to disable the input.

> Example `input-otp-disabled` — `upstream/examples/input-otp-disabled.tsx`, `static/input-otp-disabled.html`

## Controlled

Use the `value` and `onChange` props to control the input value.

> Example `input-otp-controlled` — `upstream/examples/input-otp-controlled.tsx`, `static/input-otp-controlled.html`

## Invalid

Use `aria-invalid` on the slots to show an error state.

> Example `input-otp-invalid` — `upstream/examples/input-otp-invalid.tsx`, `static/input-otp-invalid.html`

## Four Digits

A common pattern for PIN codes. This uses the `pattern={REGEXP_ONLY_DIGITS}` prop.

> Example `input-otp-four-digits` — `upstream/examples/input-otp-four-digits.tsx`, `static/input-otp-four-digits.html`

## Alphanumeric

Use `REGEXP_ONLY_DIGITS_AND_CHARS` to accept both letters and numbers.

> Example `input-otp-alphanumeric` — `upstream/examples/input-otp-alphanumeric.tsx`, `static/input-otp-alphanumeric.html`

## Form

> Example `input-otp-form` — `upstream/examples/input-otp-form.tsx`, `static/input-otp-form.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `input-otp-rtl` — `upstream/examples/input-otp-rtl.tsx`, `static/input-otp-rtl.html`

## API Reference

See the [input-otp](https://input-otp.rodz.dev) documentation for more information.

## Files

- `upstream/ui/input-otp.tsx` — the ui file as the registry installs it
- `upstream/examples/input-otp-demo.tsx`
- `upstream/examples/input-otp-pattern.tsx`
- `upstream/examples/input-otp-separator.tsx`
- `upstream/examples/input-otp-disabled.tsx`
- `upstream/examples/input-otp-controlled.tsx`
- `upstream/examples/input-otp-invalid.tsx`
- `upstream/examples/input-otp-four-digits.tsx`
- `upstream/examples/input-otp-alphanumeric.tsx`
- `upstream/examples/input-otp-form.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/input-otp
