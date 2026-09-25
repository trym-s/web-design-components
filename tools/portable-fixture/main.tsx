/**
 * A stock Vite + React 19 + Tailwind v4 + shadcn project that knows nothing about the bank.
 * `tools/portable-check.mjs` copies one entry's `src/` to `./entry/` and renders its `demo.tsx`.
 */
import { Component, StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import Demo from "./entry/demo";
import "./.generated/styles.css";

class Guard extends Component<{ children: ReactNode }, { error?: string }> {
  state: { error?: string } = {};
  static getDerivedStateFromError(error: Error) {
    return { error: error.stack ?? error.message };
  }
  render() {
    return this.state.error ? <pre data-portable-error>{this.state.error}</pre> : this.props.children;
  }
}

document.documentElement.classList.toggle("dark", location.hash === "#dark");
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Guard>
      <main className="flex min-h-screen items-center justify-center bg-background p-8 text-foreground">
        <Demo />
      </main>
    </Guard>
  </StrictMode>,
);
