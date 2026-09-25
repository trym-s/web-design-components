import { createElement, type ComponentType } from "react";
import * as S0 from "./stories/SankeyChart.stories";
import { AstryxFrame, type Example } from "../../../_sources/astryx/frame";

// Storybook CSF: default export is the meta, every other export a story.
function fromStories(file: string, mod: Record<string, any>): Example[] {
  const meta = mod.default ?? {};
  return Object.entries(mod).filter(([k, v]) => k !== "default" && v && typeof v === "object" || typeof v === "function" && k !== "default" && /^[A-Z]/.test(k)).map(([k, story]) => {
    const component: ComponentType = () => {
      const args = { ...(meta.args ?? {}), ...(story.args ?? {}) };
      if (typeof story === "function") return story(args);
      if (story.render) return story.render(args, { args });
      return meta.component ? createElement(meta.component, args) : null;
    };
    return { name: `${file}--${k}`, title: `${file} · ${story.name ?? k}`, component };
  });
}

const examples = [...fromStories("SankeyChart", S0)];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
