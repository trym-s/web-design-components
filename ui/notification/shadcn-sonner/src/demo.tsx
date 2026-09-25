import { SonnerDemo as E0 } from "./examples/sonner-demo";
import { SonnerTypes as E1 } from "./examples/sonner-types";
import { SonnerDescription as E2 } from "./examples/sonner-description";
import { SonnerPosition as E3 } from "./examples/sonner-position";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "sonner-demo", title: "Sonner Demo", component: E0 },
  { name: "sonner-types", title: "Sonner Types", component: E1 },
  { name: "sonner-description", title: "Sonner Description", component: E2 },
  { name: "sonner-position", title: "Sonner Position", component: E3 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
