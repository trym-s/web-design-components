import E0 from "./examples/AlertDialogAsyncAction.tsx";
import E1 from "./examples/AlertDialogDeleteConfirmation.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "AlertDialogAsyncAction", title: "AlertDialog — Loading", component: E0 },
  { name: "AlertDialogDeleteConfirmation", title: "AlertDialog — Delete", component: E1 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
