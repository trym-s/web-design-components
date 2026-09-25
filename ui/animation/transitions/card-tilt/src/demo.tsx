import { TiltCard } from "./card-tilt";

export default function Demo() {
  return (
    <div className="flex h-[260px] w-[296px] items-center justify-center rounded-xl bg-muted/40 p-4">
      <TiltCard className="h-[106px] w-[192px] bg-linear-to-br from-primary/75 to-primary/60 text-primary-foreground shadow-lg">
        <div className="flex h-full flex-col justify-between p-3.5">
          <div className="flex items-start justify-between">
            <span className="text-[9px] opacity-80">Credit</span>
            <span className="text-sm font-black italic tracking-tight">VISA</span>
          </div>
          <div className="font-mono text-[9px] leading-snug">
            <div>John Smith</div>
            <div>4111 - 1111 - 1111 - 1111</div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
