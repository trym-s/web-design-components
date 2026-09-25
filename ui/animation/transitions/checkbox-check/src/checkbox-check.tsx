import { useState } from "react";
import { cn } from "./lib/utils";
import "./checkbox-check.css";

export type CheckboxCheckProps = {
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state when uncontrolled. */
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
  className?: string;
};

/** 16 px checkbox: the box fills (150 ms), then the checkmark stroke draws (350 ms). */
export function CheckboxCheck({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  id,
  className,
  ...aria
}: CheckboxCheckProps) {
  const [inner, setInner] = useState(defaultChecked);
  const checked = checkedProp ?? inner;
  const toggle = () => {
    if (checkedProp === undefined) setInner(!checked);
    onCheckedChange?.(!checked);
  };

  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "t-check grid size-4 shrink-0 place-items-center rounded-[calc(var(--radius)-6px)] bg-background text-primary-foreground outline-none ring-1 ring-inset ring-input focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50",
        "aria-checked:bg-primary aria-checked:ring-0",
        className,
      )}
      {...aria}
    >
      <svg viewBox="0 0 10.1668 10.1668" className="size-2.5" aria-hidden="true">
        <path d="M1 5.52L3.92 9.17L9.17 1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
