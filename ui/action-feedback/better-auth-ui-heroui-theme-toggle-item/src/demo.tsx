import { ThemeToggleItemDemo as E0 } from "./examples/theme-toggle-item";
import { BetterAuthFrame } from "../../../_sources/better-auth-ui/frame-heroui";

const examples = [{ name: "theme-toggle-item", title: "Theme", component: E0 }];

export default function Demo() {
  return <BetterAuthFrame examples={examples} />;
}
