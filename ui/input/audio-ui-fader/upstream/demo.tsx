import E0 from "./examples/fader-vertical-demo";
import E1 from "./examples/fader-horizontal-demo";
import E2 from "./examples/fader-size-variants-demo";
import E3 from "./examples/fader-thumb-marks-variants-demo";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "fader-vertical-demo", title: "Fader Vertical", component: E0 },
  { name: "fader-horizontal-demo", title: "Fader Horizontal", component: E1 },
  { name: "fader-size-variants-demo", title: "Fader Size Variants", component: E2 },
  { name: "fader-thumb-marks-variants-demo", title: "Fader Thumb Marks Variants", component: E3 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
