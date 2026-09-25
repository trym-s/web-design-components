import { useId, useState } from "react";
import { PasswordStrength } from "./password-strength";

export default function PasswordStrengthDemo() {
  const id = useId();
  const [value, setValue] = useState("Harbourlight7");

  return (
    <div className="mx-auto w-full max-w-[320px]">
      <label
        htmlFor={id}
        className="block text-[13px] font-medium text-foreground"
      >
        New password
      </label>

      <input
        id={id}
        type="password"
        value={value}
        autoComplete="new-password"
        spellCheck={false}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a password"
        className="mt-1.5 h-10 w-full rounded-lg border-2 border-border bg-muted/70 px-3 text-[13px] text-foreground inset-shadow-xs outline-none transition-[background-color,border-color,box-shadow] duration-150 placeholder:text-muted-foreground focus:border-primary focus:bg-card focus:shadow-none focus-visible:outline-none"
      />

      <PasswordStrength value={value} className="mt-3" />
    </div>
  );
}
