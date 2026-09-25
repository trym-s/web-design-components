"use client";

import { useRef, useState } from "react";
import { Lightbox } from "./lightbox";
import PHOTO from "./hillside-castle.jpg";

export default function LightboxDemo() {
  const [open, setOpen] = useState(false);
  const originRef = useRef<HTMLElement | null>(null);

  return (
    <div className="grid w-full place-items-center">
      <figure className="w-full max-w-[300px]">
        <button
          type="button"
          aria-label="Open Hillside castle"
          onClick={(e) => {
            originRef.current = e.currentTarget;
            setOpen(true);
          }}
          className="group block w-full cursor-zoom-in overflow-hidden rounded-[calc(var(--radius)-1px)] outline-none focus-visible:ring-[1.5px] focus-visible:ring-primary"
        >
          <img
            src={PHOTO}
            alt="Hilltop castle above a wooded valley, under a clouded sky"
            width={640}
            height={400}
            draggable={false}
            className="block w-full transition-transform duration-200 ease-out group-hover:scale-[1.02]"
          />
        </button>
        <figcaption className="mt-1.5 flex items-baseline justify-between">
          <span className="text-[11.5px] text-muted-foreground">
            Hillside castle
          </span>
          <span className="font-mono text-[9.5px] tabular-nums text-muted-foreground">
            640 × 400
          </span>
        </figcaption>
      </figure>

      <Lightbox
        open={open}
        onClose={() => setOpen(false)}
        originRef={originRef}
        src={PHOTO}
        alt="Hilltop castle above a wooded valley, under a clouded sky"
        caption="Hillside castle"
        width={640}
        height={400}
      />
    </div>
  );
}
