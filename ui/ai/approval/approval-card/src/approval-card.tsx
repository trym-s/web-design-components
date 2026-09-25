import { useState } from "react";
import { cn } from "./lib/utils";
import "./approval-card.css";

/* ─────────────────────────────────────────────────────────
 * APPROVAL CARD (human-in-the-loop)
 * One question at a time; ring dots show progress; the
 * square arrow in the footer advances (↑ sends on the last).
 * ───────────────────────────────────────────────────────── */

export type ApprovalQuestion = {
  question: string;
  /** `single` picks one option and auto-advances after 480 ms; `multiple` toggles checkboxes. */
  type: "single" | "multiple";
  options: string[];
};

export type ApprovalAnswer = { selected: number[]; custom: string };

const EASE = "cubic-bezier(0.23,1,0.32,1)";

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export function ApprovalCard({
  questions,
  onSubmit,
  onDismiss,
  onReset,
  customPlaceholder = "Type something…",
  sentLabel = "Answers sent",
  className,
}: {
  questions: ApprovalQuestion[];
  onSubmit?: (answers: ApprovalAnswer[]) => void;
  onDismiss?: () => void;
  onReset?: () => void;
  customPlaceholder?: string;
  sentLabel?: string;
  className?: string;
}) {
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [custom, setCustom] = useState<Record<number, string>>({});
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(true);
  const question = questions[qi];
  const last = qi === questions.length - 1;
  const selected = answers[qi] ?? [];
  const hasAnswer = selected.length > 0 || Boolean(custom[qi]?.trim());

  const submit = (nextAnswers = answers, nextCustom = custom) => {
    setSent(true);
    onSubmit?.(questions.map((_, i) => ({ selected: nextAnswers[i] ?? [], custom: nextCustom[i] ?? "" })));
  };

  const toggle = (index: number) => {
    const picked = answers[qi] ?? [];
    const next =
      question.type === "single"
        ? [index]
        : picked.includes(index)
          ? picked.filter((item) => item !== index)
          : [...picked, index];
    const nextAnswers = { ...answers, [qi]: next };
    setAnswers(nextAnswers);
    if (question.type === "single") {
      const nextCustom = { ...custom, [qi]: "" };
      setCustom(nextCustom);
      // single-choice auto-advances
      window.setTimeout(() => {
        if (qi === questions.length - 1) submit(nextAnswers, nextCustom);
        else setQi((current) => Math.min(questions.length - 1, current + 1));
      }, 480);
    }
  };

  const reset = () => {
    setQi(0);
    setAnswers({});
    setCustom({});
    setSent(false);
    setOpen(true);
    onReset?.();
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-card px-3 py-2 text-[12.5px] font-medium text-foreground shadow-xs ring-1 ring-input transition-colors duration-150 hover:bg-accent"
      >
        Open approval
      </button>
    );
  }

  const pagerButton =
    "flex size-6 items-center justify-center rounded-[calc(var(--radius)-5px)] text-muted-foreground transition-colors duration-100 enabled:hover:bg-accent enabled:hover:text-muted-foreground disabled:opacity-35";

  return (
    <div
      className={cn(
        "flex min-h-[196px] w-full max-w-80 flex-col items-stretch",
        "[--success:oklch(0.603_0.155_150.9)] dark:[--success:oklch(0.705_0.154_153.8)]",
        "[--approval-card-shadow:inset_0_1px_0_oklch(1_0_0/0.14)]",
        className,
      )}
    >
      <div className="w-full self-start overflow-hidden rounded-lg bg-card shadow-xs ring-1 ring-border">
        {sent ? (
          <div className="flex h-37 flex-col items-center justify-center gap-2">
            <span
              className="flex size-6 items-center justify-center rounded-full bg-(--success) text-white"
              style={{ animation: `pop-in 300ms ${EASE} both` }}
            >
              <Check />
            </span>
            <span className="text-[13px] font-medium text-foreground" style={{ animation: `fade-up 350ms ${EASE} 100ms both` }}>
              {sentLabel}
            </span>
            <button type="button" onClick={reset} className="text-[12px] font-medium text-primary hover:underline">
              Start over
            </button>
          </div>
        ) : (
          <div key={qi} className="p-3" style={{ animation: `fade-up 350ms ${EASE} both` }}>
            <div className="flex items-start justify-between gap-3">
              <span className="text-[13px] font-medium text-foreground">{question.question}</span>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => {
                  setOpen(false);
                  onDismiss?.();
                }}
                className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:bg-accent hover:text-foreground"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-2 flex flex-col gap-0.5">
              {question.options.map((option, i) => {
                const on = selected.includes(i);
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(i)}
                    className="-mx-1.5 flex items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors duration-100 hover:bg-accent"
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center transition-colors duration-200",
                        question.type === "single" ? "rounded-full" : "rounded-[calc(var(--radius)-5px)]",
                        on ? "bg-foreground text-muted" : "text-transparent shadow-[inset_0_0_0_1.5px_var(--input)]",
                      )}
                    >
                      {question.type === "single" ? (
                        <span
                          className="size-1.5 rounded-full bg-muted transition-transform duration-200"
                          style={{ transform: on ? "scale(1)" : "scale(0)" }}
                        />
                      ) : (
                        <Check />
                      )}
                    </span>
                    <span className={cn("text-[13px] transition-colors duration-200", on ? "text-foreground" : "text-muted-foreground")}>
                      {option}
                    </span>
                  </button>
                );
              })}
              <label className="-mx-1.5 flex items-center gap-2 rounded-md px-1.5 py-1 transition-colors duration-100 focus-within:bg-accent hover:bg-accent">
                <span aria-hidden="true" className="size-4 shrink-0" />
                <input
                  value={custom[qi] ?? ""}
                  onChange={(event) => {
                    setCustom((current) => ({ ...current, [qi]: event.target.value }));
                    if (question.type === "single") setAnswers((current) => ({ ...current, [qi]: [] }));
                  }}
                  placeholder={customPlaceholder}
                  aria-label="Custom answer"
                  className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
                />
              </label>
            </div>
          </div>
        )}

        {/* footer — ring-dot pager + send arrow */}
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              disabled={qi === 0 || sent}
              onClick={() => setQi((current) => Math.max(0, current - 1))}
              className={pagerButton}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <span className="flex items-center gap-1">
              {questions.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to question ${i + 1}`}
                  aria-current={i === qi && !sent ? "step" : undefined}
                  disabled={sent}
                  onClick={() => setQi(i)}
                  className={cn(
                    "rounded-full transition-all duration-300 disabled:cursor-default",
                    i === qi && !sent
                      ? "size-[9px] border-[2.5px] border-foreground"
                      : sent || i < qi
                        ? "size-[7px] bg-muted-foreground"
                        : "size-[7px] border-[1.5px] border-muted-foreground",
                  )}
                />
              ))}
            </span>
            <button
              type="button"
              aria-label="Next"
              disabled={last || sent}
              onClick={() => setQi((current) => Math.min(questions.length - 1, current + 1))}
              className={pagerButton}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </span>
          {!sent && (
            <button
              type="button"
              aria-label={last ? "Send answers" : "Next question"}
              disabled={!hasAnswer}
              onClick={() => (last ? submit() : setQi((current) => current + 1))}
              className={cn(
                "-mr-0.5 flex size-7 items-center justify-center rounded-md transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.96]",
                hasAnswer
                  ? "bg-foreground text-card shadow-(--approval-card-shadow)"
                  : "bg-muted text-muted-foreground shadow-xs ring-1 ring-input",
              )}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
