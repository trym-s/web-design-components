/**
 * GIF Text — Chamaac UI `app/components/text-animations/gif-text/gif-text.tsx` (commit 345d79b) without Next.js.
 * The image is a required prop (upstream defaulted to a GIF on the author's CDN).
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { useEffect, useState } from "react";
import { cn } from "./lib/utils";

export interface GifTextProps {
  /** The text to display. */
  text?: string;
  /** URL of the image or animated GIF shown through the letters. */
  gif: string;
  /** Classes for the heading. */
  className?: string;
  /** Classes for the container (height, background…). */
  containerClassName?: string;
}

/**
 * Huge uppercase heading clipped to an image (`background-clip: text`). While the image loads the heading is
 * `--muted-foreground` and pulses; once loaded the letters become windows onto the (animated) image.
 */
export default function GifText({ text = "CHAMAAC", gif, className, containerClassName }: GifTextProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gif) return;
    setLoading(true);
    const img = new Image();
    img.src = gif;
    img.onload = () => setLoading(false);
    return () => {
      img.onload = null;
    };
  }, [gif]);

  return (
    <div className={cn("flex flex-col items-center justify-center bg-background p-4", containerClassName)}>
      <h2
        className={cn(
          "text-center text-[clamp(80px,12vw,150px)] leading-tight font-extrabold uppercase transition-colors duration-300 select-none",
          loading
            ? "animate-pulse text-muted-foreground duration-100 motion-reduce:animate-none"
            : "bg-cover bg-clip-text bg-center bg-no-repeat text-transparent",
          className,
        )}
        style={{
          backgroundImage: loading ? "none" : `url(${gif})`,
          WebkitBackgroundClip: loading ? "border-box" : "text",
          backgroundClip: loading ? "border-box" : "text",
        }}
      >
        {text}
      </h2>
    </div>
  );
}
