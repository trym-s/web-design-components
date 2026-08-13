/* Shim — the vault pages import these app-level helpers but never shipped them.
   Haptics are a no-op on desktop anyway, so stubbing them changes nothing visual. */
export const hapticTap = (): void => {};
export const hapticHover = (): void => {};
export default { hapticTap, hapticHover };
