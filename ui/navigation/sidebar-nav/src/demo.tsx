import { useState } from "react";
import { SidebarNav } from "./sidebar-nav";

const svg = (children: React.ReactNode) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export default function Demo() {
  const [active, setActive] = useState("tasks");
  const [query, setQuery] = useState("");
  const [badge, setBadge] = useState(4);

  return (
    <SidebarNav
      workspace={{ name: "Creamery Ops", subtitle: "Production Workspace", initial: "C" }}
      search={query}
      onSearchChange={setQuery}
      actionLabel="New task"
      onAction={() => {
        setBadge((n) => n + 1);
        setActive("tasks");
      }}
      active={active}
      onActiveChange={setActive}
      sections={[
        {
          label: "Workspace",
          items: [
            { key: "activity", label: "Home", icon: svg(<path d="M22 12h-4l-3 9L9 3l-3 9H2" />) },
            { key: "tasks", label: "Agent tasks", count: badge, icon: svg(<><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>) },
            { key: "dashboard", label: "Inbox", icon: svg(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>) },
          ],
        },
        {
          label: "Objects",
          items: [
            { key: "spaces", label: "Suppliers", onAdd: () => {}, icon: svg(<><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></>) },
            { key: "analytics", label: "Inventory", icon: svg(<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />) },
          ],
        },
      ]}
    />
  );
}
