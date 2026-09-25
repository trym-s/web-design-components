import { useEffect, useRef, useState } from "react";
import { cn } from "./lib/utils";
import "./toggle.css";

export type ToggleProps = {
  /** Controlled on state. */
  checked?: boolean;
  /** Initial state when uncontrolled. */
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
  className?: string;
};

/**
 * Switch whose 14 px thumb travels 14.66 px with a 1 px overshoot (350 ms keyframes). The
 * keyframes are enabled (`.is-init`) only after the first change, so the first paint does not play.
 */
export function Toggle({ checked, defaultChecked = false, onCheckedChange, disabled, id, className, ...aria }: ToggleProps) {
  const [inner, setInner] = useState(defaultChecked);
  const on = checked ?? inner;
  const [init, setInit] = useState(false);
  const first = useRef(on);

  useEffect(() => {
    if (on !== first.current) setInit(true);
  }, [on]);

  const toggle = () => {
    if (checked === undefined) setInner(!on);
    onCheckedChange?.(!on);
  };

  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={on}
      data-on={on}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "t-toggle inline-flex h-[18px] w-[32.66px] shrink-0 items-center rounded-full bg-input p-0.5 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 data-[on=true]:bg-primary",
        init && "is-init",
        className,
      )}
      {...aria}
    >
      <span className="t-toggle-thumb block size-3.5 rounded-full bg-background shadow-sm" />
    </button>
  );
}
