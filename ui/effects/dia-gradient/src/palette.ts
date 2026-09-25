/** Dia's colour stops as CSS variables, declared on each gradient root (upstream hex values in oklch).
 *  Override any of them with a class such as `[--dia-4:var(--chart-2)]`. */
export const DIA_VARS =
  "[--dia-1:oklch(0.222_0.068_32.2)] [--dia-2:oklch(0.531_0.247_262.2)] [--dia-3:oklch(0.639_0.105_244.7)] " +
  "[--dia-4:oklch(0.94_0.027_260.3)] [--dia-5:oklch(0.881_0.181_94)] [--dia-6:oklch(0.646_0.228_32)] " +
  "[--dia-7:oklch(0.693_0.315_330.1)] [--dia-8:oklch(0.884_0.106_327.5/0)]";

/** Shared rise-from-the-floor easing. */
export const RISE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
