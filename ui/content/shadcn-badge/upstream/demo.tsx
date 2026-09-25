import E0 from "./examples/badge-demo";
import { BadgeVariants as E1 } from "./examples/badge-variants";
import { BadgeWithIconLeft as E2 } from "./examples/badge-icon";
import { BadgeWithSpinner as E3 } from "./examples/badge-spinner";
import { BadgeAsLink as E4 } from "./examples/badge-link";
import { BadgeCustomColors as E5 } from "./examples/badge-colors";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "badge-demo", title: "Badge Demo", component: E0 },
  { name: "badge-variants", title: "Badge Variants", component: E1 },
  { name: "badge-icon", title: "Badge Icon", component: E2 },
  { name: "badge-spinner", title: "Badge Spinner", component: E3 },
  { name: "badge-link", title: "Badge Link", component: E4 },
  { name: "badge-colors", title: "Badge Colors", component: E5 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
