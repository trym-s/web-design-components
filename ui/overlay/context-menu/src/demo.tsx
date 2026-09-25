import { useEffect, useRef, useState } from "react";
import {
  ContextMenu,
  type ContextMenuItem,
} from "./context-menu";

const initial = [
  { id: "a", name: "cover-final-v4.png", meta: "PNG · 1.2 MB" },
  { id: "b", name: "hero-crop@2x.png", meta: "PNG · 840 KB" },
  { id: "c", name: "desk-shot-0912.jpg", meta: "JPG · 2.4 MB" },
];

export default function ContextMenuDemo() {
  const [files, setFiles] = useState(initial);
  const list = useRef<HTMLDivElement>(null);

  // Open the menu on the first file once, as a right-click would, so it is visible without interaction.
  useEffect(() => {
    const id = setTimeout(() => {
      const row = list.current?.querySelector<HTMLElement>('[aria-haspopup="menu"]');
      if (!row) return;
      const box = row.getBoundingClientRect();
      row.dispatchEvent(
        new MouseEvent("contextmenu", { bubbles: true, cancelable: true, clientX: box.left + 150, clientY: box.top + 30 }),
      );
    }, 50);
    return () => clearTimeout(id);
  }, []);

  const actions = (id: string): ContextMenuItem[] => [
    { id: "open", label: "Open", shortcut: "↵" },
    { id: "rename", label: "Rename", shortcut: "F2" },
    { id: "copy", label: "Copy link", shortcut: "⌘L" },
    { id: "sep", type: "separator" },
    {
      id: "trash",
      label: "Move to trash",
      shortcut: "⌫",
      onSelect: () => setFiles((prev) => prev.filter((file) => file.id !== id)),
    },
  ];

  return (
    <div ref={list} className="mx-auto w-full max-w-[380px]">
      {files.length > 0 ? (
        <ul className="space-y-1">
          {files.map((file) => (
            <li key={file.id}>
              <ContextMenu
                label={`Actions for ${file.name}`}
                items={actions(file.id)}
                className="flex h-[50px] items-center rounded-[calc(var(--radius)-1px)] bg-muted px-3"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-medium text-foreground">
                    {file.name}
                  </span>
                  <span className="mt-[1px] block text-[11px] text-muted-foreground">
                    {file.meta}
                  </span>
                </span>
              </ContextMenu>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid h-[158px] place-items-center">
          <button
            type="button"
            onClick={() => setFiles(initial)}
            className="border border-border bg-card shadow-xs transition-[transform,background-color] duration-150 hover:bg-accent active:translate-y-px h-9 rounded-[calc(var(--radius)-1px)] px-3.5 text-[13px] font-medium text-foreground"
          >
            Put them back
          </button>
        </div>
      )}
    </div>
  );
}
