/**
 * Vendored from @audio-ui/react 0.1.2 — https://github.com/ouestlabs/audio-ui/blob/aeba2d5efaa0ffbc21e334bac0817cc3060289ef/packages/ui/src/primitives/internal/orientation-context.tsx
 * MIT License, Copyright (c) 2025 Ouest Labs (full text: ./LICENSE).
 * Changes: `@audio-ui/utils` imports point at ./utils.
 */
import * as React from "react";

export type Orientation = "vertical" | "horizontal";

const OrientationContext = React.createContext<Orientation | undefined>(
  undefined
);

export function OrientationProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Orientation | undefined;
}) {
  return (
    <OrientationContext.Provider value={value}>
      {children}
    </OrientationContext.Provider>
  );
}

export function useInheritedOrientation() {
  return React.useContext(OrientationContext);
}
