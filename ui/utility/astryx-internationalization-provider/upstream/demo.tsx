import E0 from "./examples/InternationalizationProvider01ShippedLocale.tsx";
import E1 from "./examples/InternationalizationProvider02Overrides.tsx";
import E2 from "./examples/InternationalizationProvider03RtlDirection.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "InternationalizationProvider01ShippedLocale", title: "Internationalization Provider — Shipped Locale", component: E0 },
  { name: "InternationalizationProvider02Overrides", title: "Internationalization Provider — Overrides", component: E1 },
  { name: "InternationalizationProvider03RtlDirection", title: "Internationalization Provider — RTL Direction", component: E2 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
