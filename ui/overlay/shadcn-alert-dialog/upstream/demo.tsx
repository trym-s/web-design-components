import E0 from "./examples/alert-dialog-demo";
import { AlertDialogBasic as E1 } from "./examples/alert-dialog-basic";
import { AlertDialogSmall as E2 } from "./examples/alert-dialog-small";
import { AlertDialogWithMedia as E3 } from "./examples/alert-dialog-media";
import { AlertDialogSmallWithMedia as E4 } from "./examples/alert-dialog-small-media";
import { AlertDialogDestructive as E5 } from "./examples/alert-dialog-destructive";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "alert-dialog-demo", title: "Alert Dialog Demo", component: E0 },
  { name: "alert-dialog-basic", title: "Alert Dialog Basic", component: E1 },
  { name: "alert-dialog-small", title: "Alert Dialog Small", component: E2 },
  { name: "alert-dialog-media", title: "Alert Dialog Media", component: E3 },
  { name: "alert-dialog-small-media", title: "Alert Dialog Small Media", component: E4 },
  { name: "alert-dialog-destructive", title: "Alert Dialog Destructive", component: E5 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
