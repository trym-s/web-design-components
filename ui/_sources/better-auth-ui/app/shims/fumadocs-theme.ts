/* Bank shim for fumadocs-ui/provider/base: next-themes' useTheme shape, toggling `.dark` as the docs site does. */
import { useState } from "react";

export function useTheme() {
  const [theme, set] = useState("system");
  const setTheme = (next: string) => {
    set(next);
    const dark = next === "dark" || (next === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  };
  return { theme, setTheme, themes: ["light", "dark", "system"], resolvedTheme: theme };
}
