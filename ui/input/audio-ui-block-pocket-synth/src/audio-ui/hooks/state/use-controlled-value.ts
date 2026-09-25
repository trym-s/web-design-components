/**
 * Vendored from @audio-ui/react 0.1.2 — https://github.com/ouestlabs/audio-ui/blob/aeba2d5efaa0ffbc21e334bac0817cc3060289ef/packages/ui/src/hooks/state/use-controlled-value.ts
 * MIT License, Copyright (c) 2025 Ouest Labs (full text: ./LICENSE).
 * Changes: `@audio-ui/utils` imports point at ./utils.
 */
import {
  EmptyProcedure,
  type Func,
  isNotUndefined,
  isUndefined,
  type Optional,
  type Procedure,
} from "../../utils";
import * as React from "react";
import { useCallbackRef } from "../use-callback-ref";

export interface UseControlledValueOptions<T> {
  defaultValue?: T;
  onChange?: Procedure<T>;
  transform?: Func<T, T>;
  value?: T;
}

export interface UseControlledValueReturn<T> {
  setValue: Procedure<T>;
  value: Optional<T>;
}

export function useControlledValue<T>({
  value: controlledValue,
  defaultValue,
  onChange,
  transform,
}: UseControlledValueOptions<T>): UseControlledValueReturn<T> {
  const [internalValue, setInternalValue] =
    React.useState<Optional<T>>(defaultValue);

  const isControlled = isNotUndefined(controlledValue);
  const rawValue = isControlled ? controlledValue : internalValue;

  const onChangeRef = useCallbackRef(onChange ?? EmptyProcedure);

  const value = React.useMemo(() => {
    if (isUndefined(rawValue)) {
      return rawValue;
    }
    return transform ? transform(rawValue) : rawValue;
  }, [rawValue, transform]);

  const setValue = React.useCallback(
    (newValue: T) => {
      const transformedValue = transform ? transform(newValue) : newValue;
      if (!isControlled) {
        setInternalValue(transformedValue);
      }
      onChangeRef(transformedValue);
    },
    [isControlled, onChangeRef, transform]
  );

  return {
    setValue,
    value,
  };
}
