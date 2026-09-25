/**
 * @audio-ui/utils entry — https://github.com/ouestlabs/audio-ui/blob/aeba2d5efaa0ffbc21e334bac0817cc3060289ef/packages/utils/src/index.ts
 * MIT License, Copyright (c) 2025 Ouest Labs (full text: ../LICENSE).
 * Changes: geom.ts is not vendored; the primitives only need its `Point` type, copied here.
 */
export * from "./math";
export * from "./std";

export type Point = { x: number; y: number };
