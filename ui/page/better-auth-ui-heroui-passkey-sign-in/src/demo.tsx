import { PasskeySignInDemo as E0 } from "./examples/passkey-sign-in";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "passkey-sign-in", title: "Passkey", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}
