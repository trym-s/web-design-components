/* Shim — upstream coordinates canvas engines with the Next.js View Transition
   router. Outside that app nothing ever transitions, so the callback never
   fires; returning the unsubscribe keeps the components' cleanup paths intact. */
export function onTransitionChange(_cb: (active: boolean) => void): () => void {
  return () => {};
}
