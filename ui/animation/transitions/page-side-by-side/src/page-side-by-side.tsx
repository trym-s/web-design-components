import type { ReactNode } from "react";
import { cn } from "./lib/utils";
import "./page-side-by-side.css";

export type PageSlideProps = {
  /** Which page is shown. Page 1 sits to the left of page 2. */
  page: 1 | 2;
  /** Content of page 1 (e.g. a list). */
  first: ReactNode;
  /** Content of page 2 (e.g. a detail view). */
  second: ReactNode;
  /** Size the container: both pages are absolutely stacked inside it. */
  className?: string;
};

/**
 * Two stacked pages that cross-fade with an 8 px horizontal slide and a 3 px blur (250 ms): page 1
 * exits left, page 2 exits right. The hidden page is inert.
 */
export function PageSlide({ page, first, second, className }: PageSlideProps) {
  return (
    <div className={cn("t-page-slide overflow-hidden", className)} data-page={page}>
      <section className="t-page" data-page-id="1" inert={page !== 1}>
        {first}
      </section>
      <section className="t-page" data-page-id="2" inert={page !== 2}>
        {second}
      </section>
    </div>
  );
}
