/**
 * Vendored from @audio-ui/react 0.1.2 — https://github.com/ouestlabs/audio-ui/blob/aeba2d5efaa0ffbc21e334bac0817cc3060289ef/packages/ui/src/primitives/channel-strip.tsx
 * MIT License, Copyright (c) 2025 Ouest Labs (full text: ./LICENSE).
 * Changes: `@audio-ui/utils` imports point at ./utils; the `ChannelStrip` namespace is flattened to a plain object plus a type-only namespace, so the file compiles under `erasableSyntaxOnly`.
 */
import type * as React from "react";
import { getDataAttributes } from "./internal/data-attributes";
import {
  type Orientation,
  OrientationProvider,
  useInheritedOrientation,
} from "./internal/orientation-context";

interface ChannelStripRootProps extends React.ComponentProps<"section"> {
  orientation?: Orientation;
}

function ChannelStripRoot({
  children,
  orientation = "vertical",
  ...props
}: ChannelStripRootProps) {
  return (
    <OrientationProvider value={orientation}>
      <section
        {...getDataAttributes("channel-strip", { orientation, part: "root" })}
        {...props}
      >
        {children}
      </section>
    </OrientationProvider>
  );
}

interface ChannelStripHeaderProps extends React.ComponentProps<"header"> {}

function ChannelStripHeader({ ...props }: ChannelStripHeaderProps) {
  return (
    <header
      {...getDataAttributes("channel-strip", { part: "header" })}
      {...props}
    />
  );
}

interface ChannelStripContentProps extends React.ComponentProps<"div"> {
  layout?: "stack" | "row";
}

function ChannelStripContent({ layout = "stack", ...props }: ChannelStripContentProps) {
  return (
    <div
      {...getDataAttributes("channel-strip", { layout, part: "content" })}
      {...props}
    />
  );
}

interface ChannelStripFooterProps extends React.ComponentProps<"footer"> {}

function ChannelStripFooter({ ...props }: ChannelStripFooterProps) {
  return (
    <footer
      {...getDataAttributes("channel-strip", { part: "footer" })}
      {...props}
    />
  );
}

interface ChannelStripSectionProps extends React.ComponentProps<"div"> {
  orientation?: Orientation;
}

function ChannelStripSection({ children, orientation, ...props }: ChannelStripSectionProps) {
  const inheritedOrientation = useInheritedOrientation();
  const resolvedOrientation =
    orientation ?? inheritedOrientation ?? "vertical";

  return (
    <div
      {...getDataAttributes("channel-strip", {
        orientation: resolvedOrientation,
        part: "section",
      })}
      {...props}
    >
      {children}
    </div>
  );
}

interface ChannelStripLabelProps extends React.ComponentProps<"span"> {}

function ChannelStripLabel({ children, ...props }: ChannelStripLabelProps) {
  return (
    <span
      {...getDataAttributes("channel-strip", { part: "label" })}
      {...props}
    >
      {children}
    </span>
  );
}

interface ChannelStripValueProps extends React.ComponentProps<"output"> {}

function ChannelStripValue({ children, ...props }: ChannelStripValueProps) {
  return (
    <output
      aria-live="polite"
      {...getDataAttributes("channel-strip", { part: "value" })}
      {...props}
    >
      {children}
    </output>
  );
}

export const ChannelStrip = { Root: ChannelStripRoot, Header: ChannelStripHeader, Content: ChannelStripContent, Footer: ChannelStripFooter, Section: ChannelStripSection, Label: ChannelStripLabel, Value: ChannelStripValue };

export namespace ChannelStrip {
  export type RootProps = ChannelStripRootProps;
  export type HeaderProps = ChannelStripHeaderProps;
  export type ContentProps = ChannelStripContentProps;
  export type FooterProps = ChannelStripFooterProps;
  export type SectionProps = ChannelStripSectionProps;
  export type LabelProps = ChannelStripLabelProps;
  export type ValueProps = ChannelStripValueProps;
}

export type { ChannelStripRootProps, ChannelStripHeaderProps, ChannelStripContentProps, ChannelStripFooterProps, ChannelStripSectionProps, ChannelStripLabelProps, ChannelStripValueProps };
