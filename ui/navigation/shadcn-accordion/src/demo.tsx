import E0 from "./examples/accordion-demo";
import { AccordionBasic as E1 } from "./examples/accordion-basic";
import { AccordionMultiple as E2 } from "./examples/accordion-multiple";
import E3 from "./examples/accordion-disabled";
import E4 from "./examples/accordion-borders";
import E5 from "./examples/accordion-card";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "accordion-demo", title: "Accordion Demo", component: E0 },
  { name: "accordion-basic", title: "Accordion Basic", component: E1 },
  { name: "accordion-multiple", title: "Accordion Multiple", component: E2 },
  { name: "accordion-disabled", title: "Accordion Disabled", component: E3 },
  { name: "accordion-borders", title: "Accordion Borders", component: E4 },
  { name: "accordion-card", title: "Accordion Card", component: E5 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
