import { useState } from "react";
import { Accordion } from "./accordion";

const THEMES = ["Light", "Dark", "System"];

export default function Demo() {
  const [theme, setTheme] = useState("System");

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-start rounded-xl bg-muted/40 p-4 pt-16">
      <Accordion title="Appearance">
        <div className="flex flex-col gap-1">
          {THEMES.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTheme(option)}
              className="flex h-8 items-center justify-between rounded-md px-2 text-left text-foreground hover:bg-accent"
            >
              {option}
              {theme === option && <span className="size-1.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>
      </Accordion>
    </div>
  );
}
