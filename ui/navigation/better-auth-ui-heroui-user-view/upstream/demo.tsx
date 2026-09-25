import { UserViewDemo as E0 } from "./examples/user-view";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "user-view", title: "UserView", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}
