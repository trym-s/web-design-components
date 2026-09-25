import E0 from "./examples/BaseTypeaheadShowcase.tsx";
import E1 from "./examples/TypeaheadItemShowcase.tsx";
import E2 from "./examples/TypeaheadShowcase.tsx";
import E3 from "./examples/BaseTypeaheadCustomSearch.tsx";
import E4 from "./examples/TypeaheadItemBasic.tsx";
import E5 from "./examples/TypeaheadLimitedResults.tsx";
import E6 from "./examples/TypeaheadSearchField.tsx";
import E7 from "./examples/TypeaheadWithHelperText.tsx";
import E8 from "./examples/TypeaheadWithValidation.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "BaseTypeaheadShowcase", title: "Base Typeahead", component: E0 },
  { name: "TypeaheadItemShowcase", title: "Typeahead Item", component: E1 },
  { name: "TypeaheadShowcase", title: "Typeahead", component: E2 },
  { name: "BaseTypeaheadCustomSearch", title: "BaseTypeahead — Custom Search Bar", component: E3 },
  { name: "TypeaheadItemBasic", title: "TypeaheadItem — Basic", component: E4 },
  { name: "TypeaheadLimitedResults", title: "Typeahead — Limited Results", component: E5 },
  { name: "TypeaheadSearchField", title: "Typeahead — Search Field", component: E6 },
  { name: "TypeaheadWithHelperText", title: "Typeahead — With Helper Text", component: E7 },
  { name: "TypeaheadWithValidation", title: "Typeahead — With Validation", component: E8 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
