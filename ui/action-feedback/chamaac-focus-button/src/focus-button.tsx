/**
 * Focus Button — Chamaac UI `app/components/buttons/focus-button/focus-button.tsx` (commit 345d79b) without Next.js.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/utils";

export interface FocusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  /** Colour of the two corner brackets; defaults to `--foreground`. */
  dashColor?: string;
}

function CornerDashes({ color }: { color?: string }) {
  const corner =
    "absolute h-2 w-2 border-foreground transition-all duration-300 group-hover:h-full group-hover:w-full group-focus-visible:h-full group-focus-visible:w-full motion-reduce:transition-none";
  const style = color ? { borderColor: color } : undefined;
  return (
    <>
      <div className={cn(corner, "top-0 right-0 border-t border-r")} style={style} />
      <div className={cn(corner, "bottom-0 left-0 border-b border-l")} style={style} />
    </>
  );
}

/** Outlined button whose top-right and bottom-left corner brackets grow into a full frame on hover. */
export default function FocusButton({ children, className, dashColor, ...props }: FocusButtonProps) {
  return (
    <button
      className={cn("group relative cursor-pointer px-6 py-3 text-[16px] leading-none tracking-normal text-foreground outline-none", className)}
      {...props}
    >
      <div className="absolute inset-0 border border-border" />
      <CornerDashes color={dashColor} />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
