import { createElement, type ComponentType } from "react";
import * as S0 from "./stories/Chart.stories";
import * as S1 from "./stories/ChartAdvanced.stories";
import * as S2 from "./stories/ChartCoordinated.stories";
import * as S3 from "./stories/ChartDotGL.stories";
import * as S4 from "./stories/ChartDotGLInteractive.stories";
import * as S5 from "./stories/ChartHeatmapGL.stories";
import * as S6 from "./stories/ChartInteractions.stories";
import * as S7 from "./stories/ChartStreamGL.stories";
import * as S8 from "./stories/ChartStreamPerf.stories";
import * as S9 from "./stories/useChartRange.stories";
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

const examples = [...fromStories("Chart", S0), ...fromStories("ChartAdvanced", S1), ...fromStories("ChartCoordinated", S2), ...fromStories("ChartDotGL", S3), ...fromStories("ChartDotGLInteractive", S4), ...fromStories("ChartHeatmapGL", S5), ...fromStories("ChartInteractions", S6), ...fromStories("ChartStreamGL", S7), ...fromStories("ChartStreamPerf", S8), ...fromStories("useChartRange", S9)];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
