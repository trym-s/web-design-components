import { DangerZoneDemo as E0 } from "./examples/danger-zone";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "delete-user-danger-zone", title: "Delete User", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}
