/**
 * Vendored from @audio-ui/react 0.1.2 — https://github.com/ouestlabs/audio-ui/blob/aeba2d5efaa0ffbc21e334bac0817cc3060289ef/packages/ui/src/primitives/fader.tsx
 * MIT License, Copyright (c) 2025 Ouest Labs (full text: ./LICENSE).
 * Changes: `@audio-ui/utils` imports point at ./utils; the `Fader` namespace is flattened to a plain object plus a type-only namespace, so the file compiles under `erasableSyntaxOnly`.
 */
import type { Procedure } from "../utils";
import { clampUnit, type Nullable, type Point } from "../utils";
import * as React from "react";
import { useFocus } from "../hooks/interactions/use-focus";
import { usePointerDrag } from "../hooks/interactions/use-pointer-drag";
import { getDataAttributes } from "./internal/data-attributes";
import { useInheritedOrientation } from "./internal/orientation-context";
import {
  type UseParameterDragCallbacks,
  useParameter,
} from "./internal/use-parameter";

interface FaderConfigContextValue {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  disabled: boolean;
  dragCallbacks: UseParameterDragCallbacks;
  elementId: string;
  keyboardProps: { onKeyDown: Procedure<React.KeyboardEvent> };
  max: number;
  min: number;
  orientation: "horizontal" | "vertical";
  shouldPreventFocusRef: React.RefObject<boolean>;
  thumbRef: React.RefObject<Nullable<HTMLDivElement>>;
  trackRef: React.RefObject<Nullable<HTMLDivElement>>;
  wheelRef: Procedure<Nullable<HTMLDivElement>>;
}

/** Split from config: changes every drag frame, so only components that render live position subscribe to it. */
interface FaderValueContextValue {
  percentage: number;
  value: number;
}

const FaderConfigContext = React.createContext<FaderConfigContextValue | null>(
  null
);
const FaderValueContext = React.createContext<FaderValueContextValue | null>(
  null
);

function useFaderConfigContext() {
  const context = React.useContext(FaderConfigContext);
  if (!context) {
    throw new Error("Fader components must be used within Fader.Root");
  }
  return context;
}

function useFaderValueContext() {
  const context = React.useContext(FaderValueContext);
  if (!context) {
    throw new Error("Fader components must be used within Fader.Root");
  }
  return context;
}

interface FaderRootProps
  extends Omit<
    React.ComponentProps<"div">,
    | "onChange"
    | "onInput"
    | "type"
    | "value"
    | "defaultValue"
    | "min"
    | "max"
    | "step"
  > {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  defaultValue?: number;
  disabled?: boolean;
  max?: number;
  min?: number;
  onValueChange?: Procedure<number>;
  onValueCommit?: Procedure<number>;
  orientation?: "horizontal" | "vertical";
  step?: number;
  value?: number | number[];
}

function FaderRoot({
  value: controlledValue,
  defaultValue,
  min = -60,
  max = 6,
  step = 1,
  orientation: orientationProp,
  disabled = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  onValueChange,
  onValueCommit,
  id,
  className,
  children,
  ...props
}: FaderRootProps) {
  const inheritedOrientation = useInheritedOrientation();
  const orientation = orientationProp ?? inheritedOrientation ?? "vertical";

  const faderId = React.useId();
  const trackRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);

  const normalizedValue = Array.isArray(controlledValue)
    ? controlledValue[0]
    : controlledValue;

  const calculateValueFromPoint = React.useCallback(
    (point: Point): Nullable<number> => {
      const track = trackRef.current;
      if (!track) {
        return null;
      }

      const rect = track.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return null;
      }

      if (orientation === "vertical") {
        const clickY = point.y - rect.top;
        const percentage = 1 - clampUnit(clickY / rect.height);
        return min + percentage * (max - min);
      }

      const clickX = point.x - rect.left;
      const percentage = clampUnit(clickX / rect.width);
      return min + percentage * (max - min);
    },
    [orientation, min, max]
  );

  const calculateValueFromDelta = React.useCallback(
    (delta: Point, initialValue: number) => {
      const track = trackRef.current;
      if (!track) {
        return initialValue;
      }

      const rect = track.getBoundingClientRect();
      const sensitivity =
        orientation === "vertical"
          ? (max - min) / Math.max(rect.height, 1)
          : (max - min) / Math.max(rect.width, 1);

      return orientation === "vertical"
        ? initialValue + delta.y * sensitivity
        : initialValue + delta.x * sensitivity;
    },
    [orientation, min, max]
  );

  const containsTarget = React.useCallback(
    (target: Node) =>
      Boolean(
        thumbRef.current?.contains(target) ||
          trackRef.current?.contains(target)
      ),
    []
  );

  const {
    dragCallbacks,
    keyboardProps,
    percentage,
    shouldPreventFocusRef,
    value,
    wheelRef,
  } = useParameter({
    containsTarget,
    defaultValue,
    deltaToValue: calculateValueFromDelta,
    disabled,
    focusRef: thumbRef,
    max,
    min,
    onValueChange,
    onValueCommit,
    pointToValue: calculateValueFromPoint,
    step,
    value: normalizedValue,
  });

  const elementId = id || faderId;

  const configValue = React.useMemo<FaderConfigContextValue>(
    () => ({
      ariaLabel,
      ariaLabelledBy,
      disabled,
      dragCallbacks,
      elementId,
      keyboardProps,
      max,
      min,
      orientation,
      shouldPreventFocusRef,
      thumbRef,
      trackRef,
      wheelRef,
    }),
    [
      ariaLabel,
      ariaLabelledBy,
      disabled,
      dragCallbacks,
      elementId,
      keyboardProps,
      max,
      min,
      orientation,
      shouldPreventFocusRef,
      wheelRef,
    ]
  );

  const valueContextValue = React.useMemo<FaderValueContextValue>(
    () => ({ percentage, value }),
    [percentage, value]
  );

  return (
    <FaderConfigContext.Provider value={configValue}>
      <FaderValueContext.Provider value={valueContextValue}>
        <div
          className={className}
          {...getDataAttributes("fader", { part: "fader-wrapper" })}
          {...props}
        >
          {ariaLabel || ariaLabelledBy ? null : (
            <span className="sr-only" id={`${elementId}-label`}>
              Fader
            </span>
          )}
          {children}
        </div>
      </FaderValueContext.Provider>
    </FaderConfigContext.Provider>
  );
}

interface FaderSliderProps extends React.ComponentProps<"div"> {}

function FaderSlider({ className, ...props }: FaderSliderProps) {
  const { disabled, orientation, trackRef, wheelRef } =
    useFaderConfigContext();

  return (
    <div
      className={className}
      {...getDataAttributes("fader", { disabled, orientation })}
      ref={(node) => {
        trackRef.current = node;
        wheelRef(node);
      }}
      {...props}
    />
  );
}

interface FaderTrackProps extends React.ComponentProps<"div"> {}

function FaderTrack({ className, ...props }: FaderTrackProps) {
  const { disabled, orientation, trackRef, dragCallbacks } =
    useFaderConfigContext();

  const { pointerProps: trackPointerProps } = usePointerDrag({
    capturePointer: true,
    disabled,
    elementRef: trackRef,
    ...dragCallbacks,
  });

  return (
    <div
      className={className}
      {...getDataAttributes("fader", { orientation, part: "track" })}
      {...trackPointerProps}
      {...props}
    />
  );
}

interface FaderRangeProps extends React.ComponentProps<"div"> {}

function FaderRange({ className, style, ...props }: FaderRangeProps) {
  const { orientation } = useFaderConfigContext();
  const { percentage } = useFaderValueContext();
  const clampedPercentage = clampUnit(percentage);

  return (
    <div
      className={className}
      {...getDataAttributes("fader", { orientation, part: "range" })}
      style={{
        ...(orientation === "horizontal"
          ? {
              height: "100%",
              transform: `scaleX(${clampedPercentage})`,
              transformOrigin: "left center",
              width: "100%",
              willChange: "transform",
            }
          : {
              height: "100%",
              transform: `scaleY(${clampedPercentage})`,
              transformOrigin: "center bottom",
              width: "100%",
              willChange: "transform",
            }),
        ...style,
      }}
      {...props}
    />
  );
}

interface FaderThumbProps extends React.ComponentProps<"div"> {}

function FaderThumb({ className, style, ...props }: FaderThumbProps) {
  const {
    ariaLabel,
    ariaLabelledBy,
    disabled,
    dragCallbacks,
    elementId,
    keyboardProps,
    max,
    min,
    orientation,
    shouldPreventFocusRef,
    thumbRef,
  } = useFaderConfigContext();
  const { percentage, value } = useFaderValueContext();

  const { pointerProps: thumbPointerProps } = usePointerDrag({
    capturePointer: true,
    disabled,
    elementRef: thumbRef,
    ...dragCallbacks,
  });

  const { focusProps } = useFocus({
    disabled,
    onFocus: () => {
      if (shouldPreventFocusRef.current) {
        shouldPreventFocusRef.current = false;
      }
    },
  });

  const baseTransform =
    orientation === "horizontal" ? "translateX(-50%)" : "translateY(50%)";
  const transform = style?.transform
    ? `${baseTransform} ${style.transform}`
    : baseTransform;

  return (
    <div
      aria-disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={
        ariaLabelledBy || (ariaLabel ? undefined : `${elementId}-label`)
      }
      aria-orientation={orientation}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      className={className}
      {...getDataAttributes("fader", {
        disabled,
        orientation,
        part: "thumb",
      })}
      ref={thumbRef}
      role="slider"
      style={{
        ...(orientation === "horizontal"
          ? { left: `${percentage * 100}%` }
          : { bottom: `${percentage * 100}%` }),
        ...style,
        transform,
      }}
      {...keyboardProps}
      {...thumbPointerProps}
      {...focusProps}
      onFocus={(e) => {
        if (shouldPreventFocusRef.current) {
          shouldPreventFocusRef.current = false;
        }
        focusProps.onFocus(e);
      }}
      tabIndex={disabled ? -1 : focusProps.tabIndex}
      {...props}
    />
  );
}

interface FaderThumbInnerProps extends React.ComponentProps<"div"> {}

function FaderThumbInner({ className, ...props }: FaderThumbInnerProps) {
  const { orientation } = useFaderConfigContext();

  return (
    <div
      className={className}
      {...getDataAttributes("fader", { orientation, part: "thumb-inner" })}
      {...props}
    />
  );
}

interface FaderThumbMarkProps extends React.ComponentProps<"div"> {}

function FaderThumbMark({ className, ...props }: FaderThumbMarkProps) {
  const { orientation } = useFaderConfigContext();

  return (
    <div
      className={className}
      {...getDataAttributes("fader", { orientation, part: "thumb-mark" })}
      {...props}
    />
  );
}

export const Fader = { Root: FaderRoot, Slider: FaderSlider, Track: FaderTrack, Range: FaderRange, Thumb: FaderThumb, ThumbInner: FaderThumbInner, ThumbMark: FaderThumbMark };

export namespace Fader {
  export type RootProps = FaderRootProps;
  export type SliderProps = FaderSliderProps;
  export type TrackProps = FaderTrackProps;
  export type RangeProps = FaderRangeProps;
  export type ThumbProps = FaderThumbProps;
  export type ThumbInnerProps = FaderThumbInnerProps;
  export type ThumbMarkProps = FaderThumbMarkProps;
}

export type { FaderRootProps, FaderSliderProps, FaderTrackProps, FaderRangeProps, FaderThumbProps, FaderThumbInnerProps, FaderThumbMarkProps };
