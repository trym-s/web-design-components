# Questionnaire

A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/questionnaire.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions.
- Provides: questionnaire with 14 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: questionnaire-demo, questionnaire-multiple, questionnaire-freeform, questionnaire-skip, questionnaire-shortcuts, questionnaire-validation, questionnaire-controlled, questionnaire-resume, questionnaire-conditional, questionnaire-navigation-state, questionnaire-progress, questionnaire-animated, questionnaire-card, questionnaire-dialog
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add questionnaire`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/questionnaire.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `questionnaire-demo` — `src/examples/questionnaire-demo.tsx`, `static/questionnaire-demo.html`

## Installation

```bash
npx shadcn@latest add questionnaire
```

- Install the following dependency:

```bash
npm install @shadcn/react
```

- Copy and paste the following code into your project.

Source: `components/ui/questionnaire.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
```

```tsx
const items = [
  {
    name: "direction",
    required: true,
    prompt: "What should we prototype next?",
    description: "Choose a direction or write your own.",
    choices: [
      {
        value: "delegation",
        label: "Delegation",
        description: "Show how work moves to a specialist.",
      },
      {
        value: "questions",
        label: "Question prompts",
        description: "Show choices while the interface waits.",
      },
      { value: "both", label: "Both together" },
    ],
    input: { label: "Another answer", placeholder: "Type another answer…" },
  },
  {
    name: "detail",
    required: false,
    prompt: "How much detail should it include?",
    description: "Skip this if you are not sure yet.",
    choices: [
      { value: "focused", label: "Focused" },
      { value: "complete", label: "Complete flow" },
    ],
  },
] as const
```

Define the collection once: pass it to `Questionnaire` for server-rendered
progress, actions, and shortcuts, then map it into the parts.

```tsx
<Questionnaire items={items} onSubmit={handleSubmit}>
  <QuestionnaireProgress />
  {items.map((question) => (
    <QuestionnaireItem
      key={question.name}
      name={question.name}
      required={question.required}
    >
      <QuestionnaireTitle>{question.prompt}</QuestionnaireTitle>
      <QuestionnaireDescription>
        {question.description}
      </QuestionnaireDescription>
      <QuestionnaireChoices>
        {question.choices.map((choice) => (
          <QuestionnaireChoice key={choice.value} value={choice.value}>
            <span className="font-medium">{choice.label}</span>
            {"description" in choice ? (
              <span className="text-muted-foreground">
                {choice.description}
              </span>
            ) : null}
          </QuestionnaireChoice>
        ))}
        {"input" in question ? (
          <QuestionnaireInput
            aria-label={question.input.label}
            placeholder={question.input.placeholder}
          />
        ) : null}
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>
  ))}
  <QuestionnaireActions>
    <QuestionnairePrevious />
    <QuestionnaireSkip />
    <QuestionnaireNext />
    <QuestionnaireSubmit />
  </QuestionnaireActions>
</Questionnaire>
```

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const answers = new FormData(event.currentTarget)
  // answers.get("direction"), answers.getAll(...) for multiple items.
}
```

## Composition

```text
Questionnaire
├── QuestionnaireProgress
├── QuestionnaireItem
│   ├── QuestionnaireTitle
│   ├── QuestionnaireDescription
│   ├── QuestionnaireChoices
│   │   ├── QuestionnaireChoice
│   │   └── QuestionnaireInput
│   └── QuestionnaireError
└── QuestionnaireActions
    ├── QuestionnairePrevious
    ├── QuestionnaireSkip
    ├── QuestionnaireNext
    └── QuestionnaireSubmit
```

Questionnaire owns the ordered items, active item, answer state, validation,
progress, and navigation. The containing page, card, dialog, or drawer owns
close and cancellation behavior, persistence, transport, and branching.

## Server Rendering

Pass `items` to server-render the active item, progress, actions, and answer
shortcuts. See the
[headless Questionnaire](/docs/react/questionnaire) for the complete behavior.

## Multiple Selection

Use `multiple` for an item that accepts more than one fixed answer.

> Example `questionnaire-multiple` — `src/examples/questionnaire-multiple.tsx`, `static/questionnaire-multiple.html`

## Freeform Answer

Compose `QuestionnaireInput` with fixed choices when the user can provide another answer.

> Example `questionnaire-freeform` — `src/examples/questionnaire-freeform.tsx`, `static/questionnaire-freeform.html`

## Explicit Skip

Add `QuestionnaireSkip` when an optional item may be intentionally left unanswered.

> Example `questionnaire-skip` — `src/examples/questionnaire-skip.tsx`, `static/questionnaire-skip.html`

## Shortcuts

Assign a letter or number key to each answer with `shortcuts`.

> Example `questionnaire-shortcuts` — `src/examples/questionnaire-shortcuts.tsx`, `static/questionnaire-shortcuts.html`

## Custom Validation

Combine controlled navigation with an external schema such as Zod to return to an invalid item and present its error.

> Example `questionnaire-validation` — `src/examples/questionnaire-validation.tsx`, `static/questionnaire-validation.html`

## Controlled

Control the active item from host state, such as returning to an invalid step.

> Example `questionnaire-controlled` — `src/examples/questionnaire-controlled.tsx`, `static/questionnaire-controlled.html`

## Resume

Restore a saved active item and default answers, then reset changes back to that saved state.

> Example `questionnaire-resume` — `src/examples/questionnaire-resume.tsx`, `static/questionnaire-resume.html`

## Conditional Items

Disable items that do not apply to the user's earlier answers.

> Example `questionnaire-conditional` — `src/examples/questionnaire-conditional.tsx`, `static/questionnaire-conditional.html`

## Navigation State

Read item status to opt into disabled navigation and custom action styling.

> Example `questionnaire-navigation-state` — `src/examples/questionnaire-navigation-state.tsx`, `static/questionnaire-navigation-state.html`

## Custom Progress

Use the Progress render state to build a custom progress indicator.

> Example `questionnaire-progress` — `src/examples/questionnaire-progress.tsx`, `static/questionnaire-progress.html`

## Animated Items

Animate the active item while keeping progress and navigation stationary.

> Example `questionnaire-animated` — `src/examples/questionnaire-animated.tsx`, `static/questionnaire-animated.html`

## Card

Compose Questionnaire with Card slots while keeping the question title and description semantic.

> Example `questionnaire-card` — `src/examples/questionnaire-card.tsx`, `static/questionnaire-card.html`

## Dialog

Compose Questionnaire inside a Dialog while keeping cancellation and dismissal host-owned.

> Example `questionnaire-dialog` — `src/examples/questionnaire-dialog.tsx`, `static/questionnaire-dialog.html`

## Accessibility

`QuestionnaireItem` renders a `fieldset`, and `QuestionnaireTitle` renders its
`legend`. Descriptions and active errors are associated with the current item,
and invalid items and answer controls expose `aria-invalid`.

Fixed choices preserve native radio and checkbox behavior. Progress is exposed
as a named progressbar, navigation uses real buttons, and inactive items and
actions are hidden and inert. Successful navigation focuses the newly active
item; failed validation focuses an available answer control.

Always give `QuestionnaireInput` an accessible name with a visible label,
`aria-label`, or `aria-labelledby`. A placeholder is not a label. See the
[Questionnaire accessibility guide](/docs/react/questionnaire#accessibility)
for labeling custom compositions and the complete keyboard behavior.

## Unstyled

The behavior in `Questionnaire` comes from the `@shadcn/react` package. To use
it directly with your own markup and styles, see
[Questionnaire](/docs/react/questionnaire) under @shadcn/react.

## API Reference

The props, data attributes, and render states for every part are documented on
the [@shadcn/react Questionnaire](/docs/react/questionnaire#api-reference) page.
The styled components inherit the corresponding unstyled props. Navigation
components also accept Button `size` and `variant` props, and
`QuestionnaireActions` is a styled-only layout helper.

## Files

- `src/ui/questionnaire.tsx` — the ui file as the registry installs it
- `src/examples/questionnaire-demo.tsx`
- `src/examples/questionnaire-multiple.tsx`
- `src/examples/questionnaire-freeform.tsx`
- `src/examples/questionnaire-skip.tsx`
- `src/examples/questionnaire-shortcuts.tsx`
- `src/examples/questionnaire-validation.tsx`
- `src/examples/questionnaire-controlled.tsx`
- `src/examples/questionnaire-resume.tsx`
- `src/examples/questionnaire-conditional.tsx`
- `src/examples/questionnaire-navigation-state.tsx`
- `src/examples/questionnaire-progress.tsx`
- `src/examples/questionnaire-animated.tsx`
- `src/examples/questionnaire-card.tsx`
- `src/examples/questionnaire-dialog.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/questionnaire
