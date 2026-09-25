import { ActiveSessionsDemo as E0 } from "./examples/active-sessions";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "active-sessions", title: "ActiveSessions", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}
