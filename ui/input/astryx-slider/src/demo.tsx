import E0 from "./examples/SliderShowcase.tsx";
import E1 from "./examples/SliderFormattedValue.tsx";
import E2 from "./examples/SliderRangeSlider.tsx";
import E3 from "./examples/SliderWithMarks.tsx";
import E4 from "./examples/SliderWithStatus.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "SliderShowcase", title: "Slider", component: E0 },
  { name: "SliderFormattedValue", title: "Slider — Formatted Value", component: E1 },
  { name: "SliderRangeSlider", title: "Slider — Range", component: E2 },
  { name: "SliderWithMarks", title: "Slider — With Marks", component: E3 },
  { name: "SliderWithStatus", title: "Slider — Validation States", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
