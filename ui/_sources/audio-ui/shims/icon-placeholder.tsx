/**
 * Bank shim for app/(create)/components/icon-placeholder: the site resolves the icon library from its
 * customizer (URL params, stored config); the bank renders the lucide name, the docs default.
 */
import type { ComponentProps } from "react";
import * as lucide from "../registry/icons/__lucide__";

type Libraries = { lucide?: string; tabler?: string; hugeicons?: string; phosphor?: string; remixicon?: string };

export function IconPlaceholder({ lucide: name, tabler, hugeicons, phosphor, remixicon, ...props }: Libraries & ComponentProps<"svg">) {
  const Icon = name ? (lucide as Record<string, React.ComponentType<ComponentProps<"svg">>>)[name] : undefined;
  return Icon ? <Icon {...props} /> : null;
}
