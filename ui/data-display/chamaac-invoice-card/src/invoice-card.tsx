/**
 * Invoice Card — Chamaac UI `app/in-progress/invoice-card/invoice-card.tsx` (commit 345d79b) without Next.js.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { cn } from "./lib/utils";

export interface InvoiceItem {
  name: string;
  description: string;
  price: number;
}

export interface InvoiceCardProps {
  title?: string;
  /** Amount shown large at the top and as the Total row. */
  total: number;
  /** Struck-through amount next to `total`. */
  originalAmount?: number;
  items: InvoiceItem[];
  /** Percent; 0 hides the tax row. */
  taxRate?: number;
  taxLabel?: string;
  /** Stagger between rows sliding in, seconds. */
  delay?: number;
  /** Currency formatter; defaults to `$` + `toLocaleString()`. */
  format?: (amount: number) => string;
  className?: string;
}

const slideIn = (delay: number) => ({
  initial: { x: -150, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { delay, duration: 0.3 },
});

/** Invoice summary card whose rows slide in from the left one after another; subtotal and tax are computed from `items`. */
export default function InvoiceCard({
  title = "Invoice",
  total,
  originalAmount,
  items,
  taxRate = 0,
  taxLabel = "Tax",
  delay = 0.1,
  format = (amount) => `$${amount.toLocaleString()}`,
  className,
}: InvoiceCardProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * (taxRate / 100);
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className={cn("flex h-[500px] w-full items-center justify-center", className)}>
          <div className="flex h-auto min-w-[350px] flex-col overflow-hidden rounded-[20px] border border-border bg-card px-5 py-6 text-card-foreground">
            <m.p {...slideIn(0)} className="text-[16px] leading-[15px] font-medium tracking-tight text-muted-foreground">
              {title}
            </m.p>
            <div className="flex flex-row items-center gap-2 pt-8 tracking-tighter">
              <m.h1 {...slideIn(0)} className="text-[28px] leading-[15px] font-medium tracking-[0em] text-foreground">
                {format(total)}
              </m.h1>
              {originalAmount ? (
                <m.p {...slideIn(delay)} className="text-[18px] leading-[15px] text-muted-foreground line-through">
                  {format(originalAmount)}
                </m.p>
              ) : null}
            </div>

            <div className="mt-8 space-y-4">
              <div className="space-y-3">
                {items.map((item, index) => (
                  <m.div key={item.name} {...slideIn(index * delay)} className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="mb-1 text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <p className="text-sm font-medium text-foreground">{format(item.price)}</p>
                  </m.div>
                ))}
              </div>

              <m.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: items.length * delay, duration: 0.3 }}
                className="my-4 border-t border-border"
              />

              <div className="space-y-2">
                <m.div {...slideIn(items.length * delay)} className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-sm font-medium text-foreground">{format(subtotal)}</p>
                </m.div>
                {taxRate > 0 && (
                  <m.div {...slideIn((items.length + 1) * delay)} className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {taxLabel} ({taxRate}%)
                    </p>
                    <p className="text-sm font-medium text-foreground">{format(tax)}</p>
                  </m.div>
                )}
                <m.div
                  {...slideIn((items.length + (taxRate > 0 ? 2 : 1)) * delay)}
                  className="flex items-center justify-between border-t border-border pt-2"
                >
                  <p className="text-base font-semibold text-foreground">Total</p>
                  <p className="text-base font-semibold text-foreground">{format(total)}</p>
                </m.div>
              </div>
            </div>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
