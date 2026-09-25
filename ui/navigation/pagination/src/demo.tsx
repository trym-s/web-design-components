import { Pagination } from "./pagination";

export default function PaginationDemo() {
  return (
    <div className="grid w-full place-items-center">
      <Pagination count={12} defaultPage={6} label="Search results" />
    </div>
  );
}
