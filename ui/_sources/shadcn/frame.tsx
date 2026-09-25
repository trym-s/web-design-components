/**
 * Bank-only harness: mounts shadcn examples on the site's neutral theme (compiled Tailwind in
 * styles.css). Not part of the snapshot; the examples themselves are verbatim.
 */
import { Component, useState, type ComponentType, type ReactNode } from "react";
import "./styles.css";

export type Example = { name: string; title: string; component: ComponentType };

class Guard extends Component<{ children: ReactNode }, { error?: string }> {
  state: { error?: string } = {};
  static getDerivedStateFromError(e: Error) { return { error: e.message }; }
  render() { return this.state.error ? <pre data-bank-error style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{this.state.error}</pre> : this.props.children; }
}

export function ShadcnFrame({ examples, page = false }: { examples: Example[]; page?: boolean }) {
  const pinned = new URLSearchParams(location.search).get("example");
  const [current, setCurrent] = useState(() => Math.max(0, examples.findIndex((e) => e.name === pinned)));
  const Example = examples[current]?.component;
  // The capture tool enumerates examples through this list.
  (window as any).__bankExamples = examples.map((e) => e.name);
  return (
    <div data-bank-frame className="bg-background text-foreground font-sans antialiased" style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", padding: page ? 0 : 24 }}>
      {examples.length > 1 && !pinned && (
        <select aria-label="Example" value={current} onChange={(e) => setCurrent(Number(e.target.value))} style={{ margin: page ? 8 : "0 0 16px", font: "inherit" }}>
          {examples.map((e, i) => <option key={e.name} value={i}>{e.title}</option>)}
        </select>
      )}
      <div data-bank-example={examples[current]?.name} className={page ? "" : "flex min-h-[320px] w-full items-center justify-center"}>
        <Guard key={current}>{Example ? <Example /> : null}</Guard>
      </div>
    </div>
  );
}
