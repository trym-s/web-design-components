import { DiaGradient } from "./dia-gradient";
import { DodgeGradient } from "./dodge-gradient";
import { PeakedGradient } from "./peaked-gradient";

export default function Demo() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      <section className="relative h-80 overflow-hidden rounded-xl border bg-background">
        <p className="relative z-10 p-6 text-center font-mono text-muted-foreground text-xs uppercase tracking-widest">
          Bars
        </p>
        <div className="absolute inset-x-0 bottom-0 h-[85%]">
          <DiaGradient />
        </div>
      </section>
      <div className="grid gap-6 sm:grid-cols-2">
        <section className="relative h-56 overflow-hidden rounded-xl border bg-background">
          <PeakedGradient className="absolute inset-x-0 bottom-0 h-[85%]" />
        </section>
        {/* The dodge variant needs a dark stage */}
        <section className="dark relative h-56 overflow-hidden rounded-xl border bg-background">
          <div className="absolute inset-x-0 bottom-0 h-[70%]">
            <DodgeGradient />
          </div>
        </section>
      </div>
    </div>
  );
}
