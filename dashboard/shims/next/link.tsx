/** next/link for bank previews: a plain anchor (shadcn examples and blocks are Next-flavored). */
import { forwardRef, type AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string | { pathname?: string }; prefetch?: boolean; replace?: boolean; scroll?: boolean };

export default forwardRef<HTMLAnchorElement, Props>(function Link({ href, prefetch, replace, scroll, ...rest }, ref) {
  return <a ref={ref} href={typeof href === "string" ? href : href.pathname ?? "#"} {...rest} />;
});
