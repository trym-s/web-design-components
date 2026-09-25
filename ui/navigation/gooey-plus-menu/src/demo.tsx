import type { ReactNode } from "react";
import { GooeyPlusMenu, type GooeyPlusMenuItem } from "./gooey-plus-menu";

const icon = (children: ReactNode) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const ITEMS: GooeyPlusMenuItem[] = [
  {
    label: "New file",
    x: -54,
    y: -34,
    icon: icon(
      <>
        <path d="M9 1.5H4A1.5 1.5 0 0 0 2.5 3v10A1.5 1.5 0 0 0 4 14.5h8a1.5 1.5 0 0 0 1.5-1.5V6z" />
        <path d="M9 1.5V6h4.5" />
      </>,
    ),
  },
  {
    label: "Add image",
    x: 0,
    y: -64,
    icon: icon(
      <>
        <rect x="1.5" y="1.5" width="13" height="13" rx="2" />
        <circle cx="5.5" cy="5.5" r="1.25" />
        <path d="M14.5 10.5L11 7l-7.5 7.5" />
      </>,
    ),
  },
  {
    label: "New folder",
    x: 54,
    y: -34,
    icon: icon(
      <path d="M14.5 12.5A1.5 1.5 0 0 1 13 14H3a1.5 1.5 0 0 1-1.5-1.5V3A1.5 1.5 0 0 1 3 1.5h3L7.5 4H13a1.5 1.5 0 0 1 1.5 1.5z" />,
    ),
  },
];

export default function GooeyPlusMenuDemo() {
  return (
    <div className="grid h-[280px] w-full max-w-md place-items-center overflow-hidden rounded-lg bg-muted/30">
      <GooeyPlusMenu items={ITEMS} />
    </div>
  );
}
