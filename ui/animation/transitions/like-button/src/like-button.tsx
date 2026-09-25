import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "./lib/utils";
import "./like-button.css";

const PARTICLES = [
  ["-16px", "-12px"], ["0px", "-20px"], ["16px", "-12px"], ["20px", "2px"],
  ["12px", "16px"], ["-4px", "20px"], ["-18px", "12px"], ["-20px", "-2px"],
];

export type LikeButtonProps = {
  /** Controlled liked state. */
  liked?: boolean;
  /** Initial liked state when uncontrolled. */
  defaultLiked?: boolean;
  onLikedChange?: (liked: boolean) => void;
  label?: string;
  likedLabel?: string;
  className?: string;
};

/**
 * Like toggle: on like the heart fills with `--like-color`, pops (0.82 → 1 with overshoot) and
 * flings 8 particles; unlike just empties the heart.
 */
export function LikeButton({
  liked: likedProp,
  defaultLiked = false,
  onLikedChange,
  label = "Like",
  likedLabel = "Liked",
  className,
}: LikeButtonProps) {
  const [inner, setInner] = useState(defaultLiked);
  const liked = likedProp ?? inner;
  const [bursting, setBursting] = useState(false);

  useEffect(() => {
    if (!bursting) return;
    const id = window.setTimeout(() => setBursting(false), 500);
    return () => window.clearTimeout(id);
  }, [bursting]);

  const toggle = () => {
    if (!liked) setBursting(true);
    if (likedProp === undefined) setInner(!liked);
    onLikedChange?.(!liked);
  };

  return (
    <button
      type="button"
      className={cn(
        "t-like relative inline-flex h-8 items-center gap-1.5 rounded-full bg-card pr-3 pl-2.5 text-sm font-medium text-card-foreground shadow-sm ring-1 ring-border outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "[--like-color:oklch(0.615_0.246_15.4)]",
        bursting && "is-bursting",
        className,
      )}
      data-liked={liked}
      aria-pressed={liked}
      onClick={toggle}
    >
      <span className="t-like-icon inline-flex">
        <svg className="t-like-heart size-4" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
          <path d="M12 21s-7-4.35-9.35-8.5C.48 8.67 2.72 5 6.5 5c2.1 0 3.7 1.1 4.5 2.6C11.8 6.1 13.4 5 15.5 5c3.78 0 6.02 3.67 3.85 7.5C19 16.65 12 21 12 21Z" />
        </svg>
      </span>
      <span className="t-like-particles left-[18px]!" aria-hidden="true">
        {PARTICLES.map(([x, y], index) => (
          <i key={index} style={{ "--px": x, "--py": y } as CSSProperties} />
        ))}
      </span>
      {liked ? likedLabel : label}
    </button>
  );
}
