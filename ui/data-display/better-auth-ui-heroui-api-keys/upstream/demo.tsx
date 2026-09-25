import { ApiKeysDemo as E0 } from "./examples/api-keys";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "api-keys", title: "API Key", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}
