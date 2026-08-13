/* Shim — upstream's WebAudio cue helpers were not part of the captured source.
   Silent no-ops: the visuals are the reference, the sound is not. */
export type ButtonSound = unknown;
const noop = (): void => {};
export const buttonHover = noop;
export const buttonClick = noop;
export const hoverLink = noop;
export const swirlFormation = noop;
export const swirlChurn = noop;
export const swirlMove = noop;
export const swirlClick = noop;
