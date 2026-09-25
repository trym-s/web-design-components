import E0 from "./examples/button-demo";
import E1 from "./examples/button-size";
import E2 from "./examples/button-default";
import E3 from "./examples/button-outline";
import E4 from "./examples/button-secondary";
import E5 from "./examples/button-ghost";
import E6 from "./examples/button-destructive";
import E7 from "./examples/button-link";
import E8 from "./examples/button-icon";
import E9 from "./examples/button-with-icon";
import E10 from "./examples/button-rounded";
import E11 from "./examples/button-spinner";
import E12 from "./examples/button-group-demo";
import E13 from "./examples/button-aschild";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "button-demo", title: "Button Demo", component: E0 },
  { name: "button-size", title: "Button Size", component: E1 },
  { name: "button-default", title: "Button Default", component: E2 },
  { name: "button-outline", title: "Button Outline", component: E3 },
  { name: "button-secondary", title: "Button Secondary", component: E4 },
  { name: "button-ghost", title: "Button Ghost", component: E5 },
  { name: "button-destructive", title: "Button Destructive", component: E6 },
  { name: "button-link", title: "Button Link", component: E7 },
  { name: "button-icon", title: "Button Icon", component: E8 },
  { name: "button-with-icon", title: "Button With Icon", component: E9 },
  { name: "button-rounded", title: "Button Rounded", component: E10 },
  { name: "button-spinner", title: "Button Spinner", component: E11 },
  { name: "button-group-demo", title: "Button Group Demo", component: E12 },
  { name: "button-aschild", title: "Button Aschild", component: E13 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
