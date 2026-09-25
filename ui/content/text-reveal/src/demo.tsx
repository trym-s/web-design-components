"use client";

import { useState } from "react";
import { TextReveal } from "./text-reveal";

const COPY =
  "Nobody is given a week to write these, so they ship at eighty percent and stay there for the life of the product.";

export default function TextRevealDemo() {
  const [take, setTake] = useState(0);

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <TextReveal
        key={take}
        text={COPY}
        startOnView={false}
        className="block text-[13.5px] leading-relaxed text-muted-foreground"
      />

      <button
        type="button"
        onClick={() => setTake((t) => t + 1)}
        className="border bg-card shadow-xs transition-[transform,background-color,color] duration-150 active:translate-y-px mt-4 h-8 rounded-[calc(var(--radius)-4px)] px-3 text-[12.5px] font-medium text-foreground"
      >
        Reveal
      </button>
    </div>
  );
}
