import { DialogDemo as E0 } from "./examples/dialog-demo";
import { DialogCloseButton as E1 } from "./examples/dialog-close-button";
import { DialogNoCloseButton as E2 } from "./examples/dialog-no-close-button";
import { DialogStickyFooter as E3 } from "./examples/dialog-sticky-footer";
import { DialogScrollableContent as E4 } from "./examples/dialog-scrollable-content";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "dialog-demo", title: "Dialog Demo", component: E0 },
  { name: "dialog-close-button", title: "Dialog Close Button", component: E1 },
  { name: "dialog-no-close-button", title: "Dialog No Close Button", component: E2 },
  { name: "dialog-sticky-footer", title: "Dialog Sticky Footer", component: E3 },
  { name: "dialog-scrollable-content", title: "Dialog Scrollable Content", component: E4 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
