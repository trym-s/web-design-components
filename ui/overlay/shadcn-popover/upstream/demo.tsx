import E0 from "./examples/popover-demo";
import { PopoverBasic as E1 } from "./examples/popover-basic";
import { PopoverAlignments as E2 } from "./examples/popover-alignments";
import { PopoverForm as E3 } from "./examples/popover-form";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "popover-demo", title: "Popover Demo", component: E0 },
  { name: "popover-basic", title: "Popover Basic", component: E1 },
  { name: "popover-alignments", title: "Popover Alignments", component: E2 },
  { name: "popover-form", title: "Popover Form", component: E3 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
