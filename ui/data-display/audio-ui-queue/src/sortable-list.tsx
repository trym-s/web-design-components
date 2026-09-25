/**
 * Sortable List — Audio UI's registry element (registry-audio/bases/base/audio/sortable-list.tsx), same API
 * (`SortableList`, `SortableItem`, `SortableDragHandle`), with the @dnd-kit sensors replaced by pointer and
 * keyboard handling in this file. MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 *
 * Pointer: drag the handle; the list reorders live as the item passes its neighbours.
 * Keyboard: focus the handle, Space/Enter lifts, arrow keys move, Space/Enter drops, Escape restores.
 */
import { GripVerticalIcon } from "lucide-react";
import * as React from "react";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";

type Id = string | number;
type SortableBaseItem = { id: Id };

type SortableListProps<TItem extends SortableBaseItem> = {
  items: TItem[];
  onChange: (items: TItem[]) => void;
  /** `isOverlay` is kept for API parity with the upstream component and is always `false` here. */
  renderItem: (item: TItem, index: number, isOverlay?: boolean) => React.ReactNode;
  className?: string;
};

type ListContextValue = {
  activeId: Id | null;
  register: (id: Id, node: HTMLElement | null) => void;
  start: (id: Id, event: React.PointerEvent) => void;
  keyboard: (id: Id, event: React.KeyboardEvent) => void;
};

const ListContext = React.createContext<ListContextValue | null>(null);
const ItemContext = React.createContext<Id | null>(null);

function arrayMove<T>(items: T[], from: number, to: number): T[] {
  const next = items.slice();
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

function SortableList<TItem extends SortableBaseItem>({ items, onChange, renderItem, className }: SortableListProps<TItem>) {
  const [activeId, setActiveId] = React.useState<Id | null>(null);
  const [announcement, setAnnouncement] = React.useState("");
  const nodes = React.useRef(new Map<Id, HTMLElement>());
  const latest = React.useRef({ items, onChange });
  latest.current = { items, onChange };
  const lifted = React.useRef<{ id: Id; original: TItem[] } | null>(null);

  const moveTo = React.useCallback((id: Id, to: number) => {
    const { items: current, onChange: change } = latest.current;
    const from = current.findIndex((item) => item.id === id);
    if (from < 0 || to < 0 || to >= current.length || from === to) return;
    change(arrayMove(current, from, to));
    setAnnouncement(`Moved to position ${to + 1} of ${current.length}`);
  }, []);

  const start = React.useCallback(
    (id: Id, event: React.PointerEvent) => {
      if (event.button !== 0) return;
      event.preventDefault();
      setActiveId(id);
      const onMove = (move: PointerEvent) => {
        let best = -1;
        let bestDistance = Number.POSITIVE_INFINITY;
        latest.current.items.forEach((item, index) => {
          const rect = nodes.current.get(item.id)?.getBoundingClientRect();
          if (!rect) return;
          const distance = Math.hypot(move.clientX - (rect.left + rect.width / 2), move.clientY - (rect.top + rect.height / 2));
          if (distance < bestDistance) {
            bestDistance = distance;
            best = index;
          }
        });
        moveTo(id, best);
      };
      const onUp = () => {
        setActiveId(null);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [moveTo]
  );

  const keyboard = React.useCallback(
    (id: Id, event: React.KeyboardEvent) => {
      const { items: current, onChange: change } = latest.current;
      const index = current.findIndex((item) => item.id === id);
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        if (lifted.current?.id === id) {
          lifted.current = null;
          setActiveId(null);
          setAnnouncement(`Dropped at position ${index + 1} of ${current.length}`);
        } else {
          lifted.current = { id, original: current };
          setActiveId(id);
          setAnnouncement(`Picked up item ${index + 1} of ${current.length}. Use the arrow keys to move, Space to drop.`);
        }
      } else if (lifted.current?.id === id && ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
        moveTo(id, index + (event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 1));
      } else if (lifted.current?.id === id && event.key === "Escape") {
        event.preventDefault();
        change(lifted.current.original);
        lifted.current = null;
        setActiveId(null);
        setAnnouncement("Reorder cancelled");
      }
    },
    [moveTo]
  );

  const register = React.useCallback((id: Id, node: HTMLElement | null) => {
    if (node) nodes.current.set(id, node);
    else nodes.current.delete(id);
  }, []);

  const context = React.useMemo(() => ({ activeId, keyboard, register, start }), [activeId, keyboard, register, start]);

  return (
    <ListContext value={context}>
      <ul className={cn("flex list-none flex-col p-0", className)}>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>{renderItem(item, index, false)}</React.Fragment>
        ))}
      </ul>
      <span aria-live="assertive" className="sr-only">
        {announcement}
      </span>
    </ListContext>
  );
}

function useList() {
  const context = React.use(ListContext);
  if (!context) throw new Error("SortableItem must be rendered inside SortableList");
  return context;
}

type SortableItemProps = React.PropsWithChildren<{ id: Id; className?: string }>;

function SortableItem({ id, className, children }: SortableItemProps) {
  const { activeId, register } = useList();
  const isDragging = activeId === id;
  return (
    <ItemContext value={id}>
      <li
        className={cn(
          "flex flex-1 list-none rounded-lg transition-[opacity,box-shadow]",
          isDragging && "opacity-40 shadow-lg ring-1 ring-ring/50",
          className
        )}
        data-dragging={isDragging ? "true" : undefined}
        ref={(node) => register(id, node)}
      >
        {children}
      </li>
    </ItemContext>
  );
}

function SortableDragHandle({ className }: { className?: string }) {
  const { activeId, keyboard, start } = useList();
  const id = React.use(ItemContext);
  if (id === null) throw new Error("SortableDragHandle must be rendered inside SortableItem");
  return (
    <Button
      aria-label="Reorder"
      aria-pressed={activeId === id}
      className={cn("cursor-grab touch-none active:cursor-grabbing", className)}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => keyboard(id, event)}
      onPointerDown={(event) => {
        event.stopPropagation();
        start(id, event);
      }}
      size="icon-sm"
      variant="ghost"
    >
      <GripVerticalIcon className="size-4" />
    </Button>
  );
}

export { SortableDragHandle, SortableItem, SortableList };
