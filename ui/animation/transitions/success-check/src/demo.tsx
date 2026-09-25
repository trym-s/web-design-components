import { useEffect, useState } from "react";
import { SuccessCheck } from "./success-check";

export default function Demo() {
  const [visible, setVisible] = useState(false);

  const replay = () => {
    setVisible(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };
  useEffect(replay, []);

  return (
    <div className="flex h-[260px] w-[296px] flex-col items-center justify-between rounded-xl bg-muted/40 p-4 pt-[70px]">
      <SuccessCheck visible={visible} className="text-chart-2">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" role="img" aria-label="Saved">
          <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
          <path d="M7.5 12.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </SuccessCheck>
      <button
        type="button"
        onClick={replay}
        className="h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground"
      >
        Animate
      </button>
    </div>
  );
}
