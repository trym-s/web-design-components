import { PasskeysDemo as E0 } from "./examples/passkeys";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "passkeys", title: "Passkey", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}
