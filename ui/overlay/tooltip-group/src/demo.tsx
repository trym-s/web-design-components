import { useEffect, useRef } from "react";
import { Tooltip, TooltipGroup } from "./tooltip-group";

const TOOLS = [
  { id: "bold", glyph: "B", label: "Bold", hint: "⌘B" },
  { id: "italic", glyph: "I", label: "Italic", hint: "⌘I" },
  { id: "under", glyph: "U", label: "Underline", hint: "⌘U" },
  { id: "code", glyph: "{}", label: "Inline code", hint: "⌘E" },
  { id: "link", glyph: "↗", label: "Insert link", hint: "⌘K" },
] as const;

export default function TooltipGroupDemo() {
  const bar = useRef<HTMLDivElement>(null);

  // Keyboard-focus the second tool once so a tooltip is showing without a hover.
  useEffect(() => {
    bar.current?.querySelectorAll("button")[1]?.focus();
  }, []);

  return (
    <div className="grid w-full place-items-center pt-10">
      <div ref={bar} className="flex items-center">
        <TooltipGroup className="flex items-center gap-1">
          {TOOLS.map((tool) => (
            <Tooltip
              key={tool.id}
              side="top"
              label={
                <span className="flex items-center gap-2">
                  {tool.label}
                  <span className="font-mono text-[9.5px] opacity-60">
                    {tool.hint}
                  </span>
                </span>
              }
            >
              <button
                type="button"
                className="border border-border bg-card shadow-xs transition-[transform,background-color] duration-150 hover:bg-accent active:translate-y-px flex h-9 w-10 items-center justify-center rounded-[calc(var(--radius)-3px)] font-mono text-[12.5px] text-foreground"
              >
                {tool.glyph}
              </button>
            </Tooltip>
          ))}
        </TooltipGroup>
      </div>
    </div>
  );
}
