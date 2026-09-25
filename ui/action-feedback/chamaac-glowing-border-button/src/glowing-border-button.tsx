/**
 * Glowing Border Button — Chamaac UI `registry/chamaac/glowing-border-button/glowing-border-button.tsx` (commit 345d79b)
 * without Next.js. MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/utils";

export interface GlowingBorderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
}

/**
 * A 60 px pill whose 2 px border is a blurred beam spinning once every 3 s behind an opaque face.
 * The beam colour is `--glowing-border-beam` (default emerald `#50C878`); set it on the button or an ancestor.
 */
export default function GlowingBorderButton({ className, children = "Book a Call", ...props }: GlowingBorderButtonProps) {
  return (
    <button
      className={cn("group relative h-[60px] cursor-pointer border-0 bg-transparent p-0 px-4 text-[20px] font-bold outline-none", className)}
      {...props}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-border p-[2px] transition-all duration-300 ease-in-out group-focus-visible:ring-3 group-focus-visible:ring-ring/50">
        {/* Rotating border beam */}
        <div className="absolute inset-0 overflow-hidden rounded-[18px]">
          <div className="absolute top-1/2 left-1/2 h-[500%] w-[80px] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] blur-[2px] [background:linear-gradient(to_right,transparent_20%,var(--glowing-border-beam,#50C878)_50%,var(--glowing-border-beam,#50C878)_60%,transparent_80%)] motion-reduce:animate-none" />
        </div>
        {/* Face */}
        <div className="relative z-10 flex h-full w-full items-center justify-center gap-2 rounded-[16px] bg-background px-11 transition-all duration-300 ease-in-out">
          <span className="text-foreground transition-colors duration-300">{children}</span>
        </div>
      </div>
    </button>
  );
}
