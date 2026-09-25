import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn/ui's `cn`. If the target already has one (`@/lib/utils`), point the imports there instead. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
