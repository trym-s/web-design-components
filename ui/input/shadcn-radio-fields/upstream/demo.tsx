import { RadioFields as E0 } from "./examples/radio-fields";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "radio-fields", title: "Radio Fields · not on docs page", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
