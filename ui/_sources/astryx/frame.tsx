/**
 * Bank-only harness: mounts Astryx examples inside the Theme provider the upstream
 * docsite uses. Not part of the snapshot; the examples themselves are verbatim.
 */
import { Component, useState, type ComponentType, type ReactNode } from "react";
import { Theme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";
import "./frame.css";

export type Example = { name: string; title: string; component: ComponentType };

class Guard extends Component<{ children: ReactNode }, { error?: string }> {
  state: { error?: string } = {};
  static getDerivedStateFromError(e: Error) { return { error: e.message }; }
  render() { return this.state.error ? <pre data-astryx-error style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{this.state.error}</pre> : this.props.children; }
}

export function AstryxFrame({ examples, theme = neutralTheme }: { examples: Example[]; theme?: Parameters<typeof Theme>[0]["theme"] }) {
  const pinned = new URLSearchParams(location.search).get("example");
  const [current, setCurrent] = useState(() => Math.max(0, examples.findIndex((e) => e.name === pinned)));
  const Example = examples[current]?.component;
  // The capture tool enumerates examples through this list.
  (window as any).__astryxExamples = examples.map((e) => e.name);
  return (
    <Theme theme={theme}>
      <div data-astryx-frame style={{ width: "100%", minHeight: "100vh", padding: 24, boxSizing: "border-box", background: "var(--color-background-body, transparent)" }}>
        {examples.length > 1 && !pinned && (
          <select aria-label="Example" value={current} onChange={(e) => setCurrent(Number(e.target.value))} style={{ marginBottom: 16, font: "inherit" }}>
            {examples.map((e, i) => <option key={e.name} value={i}>{e.title}</option>)}
          </select>
        )}
        <div data-astryx-example={examples[current]?.name}>
          <Guard key={current}>{Example ? <Example /> : null}</Guard>
        </div>
      </div>
    </Theme>
  );
}
