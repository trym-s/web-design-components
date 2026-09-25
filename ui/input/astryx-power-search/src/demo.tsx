import E0 from "./examples/PowerSearchShowcase.tsx";
import E1 from "./examples/PowerSearchContentSearch.tsx";
import E2 from "./examples/PowerSearchFullFeatured.tsx";
import E3 from "./examples/PowerSearchPresetFilters.tsx";
import E4 from "./examples/PowerSearchSearchWithTable.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "PowerSearchShowcase", title: "Power Search", component: E0 },
  { name: "PowerSearchContentSearch", title: "PowerSearch — Content Search", component: E1 },
  { name: "PowerSearchFullFeatured", title: "PowerSearch — Full Featured", component: E2 },
  { name: "PowerSearchPresetFilters", title: "PowerSearch — Preset Filters", component: E3 },
  { name: "PowerSearchSearchWithTable", title: "PowerSearch — Search with Table", component: E4 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
