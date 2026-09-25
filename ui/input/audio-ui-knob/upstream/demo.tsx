import E0 from "./examples/knob-demo";
import E1 from "./examples/knob-disabled-demo";
import E2 from "./examples/knob-size-variants-demo";
import E3 from "./examples/knob-fine-step-demo";
import E4 from "./examples/knob-filter-control-demo";
import E5 from "./examples/knob-change-vs-commit-demo";
import E6 from "./examples/knob-arc-and-anchor-demo";
import E7 from "./examples/knob-circular-arc-demo";
import E8 from "./examples/knob-double-tap-reset-demo";
import E9 from "./examples/knob-revolution-drag-demo";
import E10 from "./examples/knob-vertical-drag-demo";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "knob-demo", title: "Knob", component: E0 },
  { name: "knob-disabled-demo", title: "Knob Disabled", component: E1 },
  { name: "knob-size-variants-demo", title: "Knob Size Variants", component: E2 },
  { name: "knob-fine-step-demo", title: "Knob Fine Step", component: E3 },
  { name: "knob-filter-control-demo", title: "Knob Filter Control", component: E4 },
  { name: "knob-change-vs-commit-demo", title: "Knob Change Vs Commit", component: E5 },
  { name: "knob-arc-and-anchor-demo", title: "Knob Arc And Anchor", component: E6 },
  { name: "knob-circular-arc-demo", title: "Knob Circular Arc", component: E7 },
  { name: "knob-double-tap-reset-demo", title: "Knob Double Tap Reset", component: E8 },
  { name: "knob-revolution-drag-demo", title: "Knob Revolution Drag", component: E9 },
  { name: "knob-vertical-drag-demo", title: "Knob Vertical Drag", component: E10 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
