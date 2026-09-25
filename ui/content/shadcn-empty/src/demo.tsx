import E0 from "./examples/empty-demo";
import E1 from "./examples/empty-outline";
import { EmptyMuted as E2 } from "./examples/empty-background";
import E3 from "./examples/empty-avatar";
import E4 from "./examples/empty-avatar-group";
import E5 from "./examples/empty-input-group";
import { EmptyInCard as E6 } from "./examples/empty-card";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "empty-demo", title: "Empty Demo", component: E0 },
  { name: "empty-outline", title: "Empty Outline", component: E1 },
  { name: "empty-background", title: "Empty Background", component: E2 },
  { name: "empty-avatar", title: "Empty Avatar", component: E3 },
  { name: "empty-avatar-group", title: "Empty Avatar Group", component: E4 },
  { name: "empty-input-group", title: "Empty Input Group", component: E5 },
  { name: "empty-card", title: "Empty Card · not on docs page", component: E6 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
