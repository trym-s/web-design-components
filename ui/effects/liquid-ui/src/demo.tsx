import { useRef, useState, type ReactNode } from "react";
import { LiquidCard, LiquidGroup } from "./liquid-group";

/* The upstream playground's "bubble + tail" and "share" presets; drag any piece to watch the joint fuse. */
const bar = (w: string) => <div className="h-2 rounded-full bg-foreground/10" style={{ width: w }} />;
const BubbleBody = (
  <div className="flex h-full items-center gap-2.5 px-4">
    <div className="size-9 shrink-0 rounded-full bg-foreground/10" />
    <div className="flex flex-1 flex-col gap-1.5">{bar("80%")}{bar("55%")}</div>
  </div>
);
const ShareLabel = (
  <div className="flex h-full items-center justify-center pl-1">
    <span className="text-[11px] font-semibold text-muted-foreground">Share</span>
  </div>
);

type Piece = { id: string; x: number; y: number; w: number; h: number; radius: number; content?: ReactNode };
const INITIAL: Piece[] = [
  { id: "bubble", x: 40, y: 30, w: 300, h: 116, radius: 40, content: BubbleBody },
  { id: "tail", x: 324, y: 119, w: 52, h: 52, radius: 14 },
  { id: "card", x: 40, y: 220, w: 288, h: 120, radius: 26, content: BubbleBody },
  { id: "btn", x: 318, y: 254, w: 96, h: 52, radius: 18, content: ShareLabel },
];

export default function Demo() {
  const [pieces, setPieces] = useState(INITIAL);
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const move = (id: string, x: number, y: number) => setPieces((all) => all.map((p) => (p.id === id ? { ...p, x, y } : p)));

  return (
    <LiquidGroup
      k={28}
      cell={8}
      fill="var(--muted)"
      className="h-[380px] w-[480px] touch-none"
      bridges={[]}
    >
      {pieces.map((p) => (
        <LiquidCard key={p.id} id={p.id} x={p.x} y={p.y} w={p.w} h={p.h} radius={p.radius}>
          <div
            className="size-full cursor-grab active:cursor-grabbing"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              drag.current = { id: p.id, dx: e.clientX - p.x, dy: e.clientY - p.y };
            }}
            onPointerMove={(e) => {
              if (drag.current?.id === p.id) move(p.id, e.clientX - drag.current.dx, e.clientY - drag.current.dy);
            }}
            onPointerUp={() => (drag.current = null)}
          >
            {p.content}
          </div>
        </LiquidCard>
      ))}
    </LiquidGroup>
  );
}
