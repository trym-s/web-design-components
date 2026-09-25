import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { InteractiveGridBackground } from "./interactive-grid-background";

// The site shows this hero on its dark theme; `dark` switches the shadcn tokens for this subtree.
export default function Demo() {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <InteractiveGridBackground className="dark h-[600px] w-full rounded-xl text-foreground">
          <div className="pointer-events-none flex h-full flex-col items-center justify-center px-4">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="mb-8 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 text-sm font-medium backdrop-blur-lg">
                New Release
              </div>
              <h1 className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-center text-4xl font-bold tracking-tighter text-transparent md:text-6xl">
                Interactive Grid.
              </h1>
              <p className="mt-6 max-w-xl text-center text-sm leading-relaxed text-foreground/70 md:text-lg">
                A high-performance, reactive canvas grid system. Use your mouse to interact with the data points.
              </p>
              <div className="pointer-events-auto mt-10 flex gap-4">
                <button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-xl transition-all hover:scale-105 active:scale-95">
                  Get Started
                </button>
              </div>
            </m.div>
          </div>
        </InteractiveGridBackground>
      </MotionConfig>
    </LazyMotion>
  );
}
