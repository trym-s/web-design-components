import { SwitchAccountSubmenuDemo as E0 } from "./examples/switch-account-submenu";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "switch-account-submenu", title: "Multi Session", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}
