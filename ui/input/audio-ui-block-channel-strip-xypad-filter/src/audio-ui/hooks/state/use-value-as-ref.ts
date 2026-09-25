/**
 * Vendored from @audio-ui/react 0.1.2 — https://github.com/ouestlabs/audio-ui/blob/aeba2d5efaa0ffbc21e334bac0817cc3060289ef/packages/ui/src/hooks/state/use-value-as-ref.ts
 * MIT License, Copyright (c) 2025 Ouest Labs (full text: ./LICENSE).
 * Changes: `@audio-ui/utils` imports point at ./utils.
 */
import * as React from "react";

/**
 * Converts a value to a ref to remove its reactivity.
 * Used to access the passed value inside `React.useEffect` without causing
 * the effect to re-run when the value changes.
 */
export function useValueAsRef<T>(value: T): React.RefObject<T> {
  const ref = React.useRef<T>(value);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}
