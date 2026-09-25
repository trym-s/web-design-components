import { SliderDemo as E0 } from "./examples/slider-demo";
import { SliderRange as E1 } from "./examples/slider-range";
import { SliderMultiple as E2 } from "./examples/slider-multiple";
import { SliderVertical as E3 } from "./examples/slider-vertical";
import { SliderControlled as E4 } from "./examples/slider-controlled";
import { SliderDisabled as E5 } from "./examples/slider-disabled";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "slider-demo", title: "Slider Demo", component: E0 },
  { name: "slider-range", title: "Slider Range", component: E1 },
  { name: "slider-multiple", title: "Slider Multiple", component: E2 },
  { name: "slider-vertical", title: "Slider Vertical", component: E3 },
  { name: "slider-controlled", title: "Slider Controlled", component: E4 },
  { name: "slider-disabled", title: "Slider Disabled", component: E5 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
