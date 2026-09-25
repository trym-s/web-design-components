import E0 from "./examples/xypad-live-value-demo";
import E1 from "./examples/xypad-size-sm-demo";
import E2 from "./examples/xypad-size-default-demo";
import E3 from "./examples/xypad-size-lg-demo";
import E4 from "./examples/xypad-size-xl-demo";
import E5 from "./examples/xypad-disabled-demo";
import E6 from "./examples/xypad-format-value-demo";
import E7 from "./examples/xypad-bipolar-range-demo";
import E8 from "./examples/xypad-change-vs-commit-demo";
import E9 from "./examples/xypad-hide-value-demo";
import { AudioFrame } from "../../../_sources/audio-ui/frame";

const examples = [
  { name: "xypad-live-value-demo", title: "Xypad Live Value", component: E0 },
  { name: "xypad-size-sm-demo", title: "Xypad Size Sm", component: E1 },
  { name: "xypad-size-default-demo", title: "Xypad Size Default", component: E2 },
  { name: "xypad-size-lg-demo", title: "Xypad Size Lg", component: E3 },
  { name: "xypad-size-xl-demo", title: "Xypad Size Xl", component: E4 },
  { name: "xypad-disabled-demo", title: "Xypad Disabled", component: E5 },
  { name: "xypad-format-value-demo", title: "Xypad Format Value", component: E6 },
  { name: "xypad-bipolar-range-demo", title: "Xypad Bipolar Range", component: E7 },
  { name: "xypad-change-vs-commit-demo", title: "Xypad Change Vs Commit", component: E8 },
  { name: "xypad-hide-value-demo", title: "Xypad Hide Value", component: E9 },
];

export default function Demo() {
  return <AudioFrame examples={examples} />;
}
