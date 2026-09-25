import { SettingsDemo as E0 } from "./examples/settings";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-shadcn";

const examples = [{ name: "settings", title: "Settings", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}
