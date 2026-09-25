import { CommandDemo as E0 } from "./examples/command-demo";
import { CommandBasic as E1 } from "./examples/command-basic";
import { CommandWithShortcuts as E2 } from "./examples/command-shortcuts";
import { CommandWithGroups as E3 } from "./examples/command-groups";
import { CommandManyItems as E4 } from "./examples/command-scrollable";
import { CommandDialogDemo as E5 } from "./examples/command-dialog";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "command-demo", title: "Command Demo", component: E0 },
  { name: "command-basic", title: "Command Basic", component: E1 },
  { name: "command-shortcuts", title: "Command Shortcuts", component: E2 },
  { name: "command-groups", title: "Command Groups", component: E3 },
  { name: "command-scrollable", title: "Command Scrollable", component: E4 },
  { name: "command-dialog", title: "Command Dialog · not on docs page", component: E5 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
