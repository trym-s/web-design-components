"use client";

import { Pagination } from "./pagination";

export function PaginationDemo() {
  return (
    <div className="grid w-full place-items-center">
      <Pagination count={12} defaultPage={1} label="Search results" />
    </div>
  );
}
