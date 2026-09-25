import { SpinnerDemo as E0 } from "./examples/spinner-demo";
import { SpinnerCustom as E1 } from "./examples/spinner-custom";
import { SpinnerSize as E2 } from "./examples/spinner-size";
import { SpinnerButton as E3 } from "./examples/spinner-button";
import { SpinnerBadge as E4 } from "./examples/spinner-badge";
import { SpinnerInputGroup as E5 } from "./examples/spinner-input-group";
import { SpinnerEmpty as E6 } from "./examples/spinner-empty";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "spinner-demo", title: "Spinner Demo", component: E0 },
  { name: "spinner-custom", title: "Spinner Custom", component: E1 },
  { name: "spinner-size", title: "Spinner Size", component: E2 },
  { name: "spinner-button", title: "Spinner Button", component: E3 },
  { name: "spinner-badge", title: "Spinner Badge", component: E4 },
  { name: "spinner-input-group", title: "Spinner Input Group", component: E5 },
  { name: "spinner-empty", title: "Spinner Empty", component: E6 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
