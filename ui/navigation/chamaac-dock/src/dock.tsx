/**
 * Dock — Chamaac UI `app/components/navigation/dock/dock.tsx` (commit 345d79b) without Next.js: links are plain
 * `<a>` (or `renderLink`), the current page comes from `activePage` instead of `usePathname`, and the hover / active
 * fills are `--accent` classes instead of colours picked in JS from `next-themes`.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, easeIn, easeOut, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "./lib/utils";

type LinkRenderer = (props: { href: string; className?: string; children: ReactNode; onClick?: () => void }) => ReactNode;

interface DockContextType {
  openDropdowns: Record<string, boolean>;
  hoveredLink: string | null;
  setHoveredLink: (href: string | null) => void;
  handleDropdownEnter: (id: string) => void;
  handleDropdownLeave: (id: string) => void;
  activePage?: string;
  renderLink: LinkRenderer;
}

const DockContext = createContext<DockContextType | undefined>(undefined);

function useDock() {
  const context = useContext(DockContext);
  if (!context) throw new Error("useDock must be used within a Dock component");
  return context;
}

const defaultLink: LinkRenderer = ({ href, className, children, onClick }) => (
  <a href={href} className={className} onClick={onClick}>
    {children}
  </a>
);

const typeName = (child: ReactElement) => (child.type as { displayName?: string }).displayName;

export interface DockProps {
  /** `DockIcon`, `DockLink` and `DockItem` (with `DockDropdownItem` children), in order. */
  children: ReactNode;
  /** Milliseconds a dropdown stays open after the pointer leaves. */
  closeDelay?: number;
  /** Distance of the desktop dock from the viewport bottom (CSS length). */
  bottomOffset?: string;
  /** Current path; the matching link is highlighted. */
  activePage?: string;
  /** Renders every internal link; pass your router's Link. Default: a plain `<a>`. */
  renderLink?: LinkRenderer;
  className?: string;
}

/**
 * Fixed bottom navigation. Desktop (md+): a pill of icons, links and dropdown triggers; hovering a `DockItem` grows
 * the pill upward into a panel listing its links beside a preview image of the hovered or active one. Mobile: a
 * "Menu" button opening a full-screen list (page scroll is locked while open).
 */
export function Dock({ children, closeDelay = 100, bottomOffset = "60px", activePage, renderLink = defaultLink, className }: DockProps) {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const closeTimeoutsRef = useRef<Record<string, ReturnType<typeof setTimeout> | null>>({});
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownEnter = (id: string) => {
    const timeout = closeTimeoutsRef.current[id];
    if (timeout) clearTimeout(timeout);
    setOpenDropdowns((prev) => ({ ...prev, [id]: true }));
  };

  const handleDropdownLeave = (id: string) => {
    closeTimeoutsRef.current[id] = setTimeout(() => {
      setOpenDropdowns((prev) => ({ ...prev, [id]: false }));
      setHoveredLink(null);
    }, closeDelay);
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const close = () => setIsMobileMenuOpen(false);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <DockContext.Provider
          value={{ openDropdowns, hoveredLink, setHoveredLink, handleDropdownEnter, handleDropdownLeave, activePage, renderLink }}
        >
          <div className="w-full">
            {/* Desktop dock */}
            <m.nav className="fixed left-0 z-50 hidden w-full md:block" style={{ bottom: bottomOffset }}>
              <div className="flex justify-center px-4">
                <m.div
                  className={cn(
                    "relative flex flex-col items-center justify-center overflow-hidden rounded-[25px] border border-border bg-background p-[3px] text-foreground backdrop-blur-md dark:bg-background/50",
                    className,
                  )}
                  transition={{ duration: 0.2 }}
                >
                  {/* Dropdown panels, above the bar */}
                  {Children.map(children, (child) =>
                    isValidElement(child) && typeName(child) === "DockItem"
                      ? cloneElement(child as ReactElement<DockItemProps>, { renderType: "content" })
                      : null,
                  )}
                  <div className="relative z-10 flex items-center gap-[3px]">
                    {Children.map(children, (child) =>
                      isValidElement(child)
                        ? cloneElement(child as ReactElement<DockItemProps | DockIconProps | DockLinkProps>, { renderType: "trigger" })
                        : null,
                    )}
                  </div>
                </m.div>
              </div>
            </m.nav>

            {/* Mobile dock */}
            <div className="pointer-events-none fixed bottom-8 left-0 z-50 flex w-full justify-center md:hidden">
              <div className="pointer-events-auto">
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <m.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background px-6 pt-20 pb-32 text-foreground"
                    >
                      <div className="flex flex-col gap-6">
                        {Children.map(children, (child) => {
                          if (!isValidElement(child)) return null;
                          if (typeName(child) === "DockLink") {
                            const props = child.props as DockLinkProps;
                            return renderLink({ href: props.href, className: "text-2xl font-medium", onClick: close, children: props.label });
                          }
                          if (typeName(child) === "DockItem") {
                            const props = child.props as DockItemProps;
                            return (
                              <div className="flex flex-col gap-4">
                                <span className="text-lg text-muted-foreground">{props.label}</span>
                                <div className="flex flex-col gap-4 border-l border-border pl-4">
                                  {Children.map(props.children, (subChild) => {
                                    if (!isValidElement(subChild) || typeName(subChild) !== "DockDropdownItem") return null;
                                    const sub = subChild.props as DockDropdownItemProps;
                                    return renderLink({
                                      href: sub.href,
                                      className: "flex items-center gap-3 text-xl font-medium",
                                      onClick: close,
                                      children: (
                                        <>
                                          {sub.image && <img src={sub.image} alt="" width={32} height={32} className="size-8 rounded-lg object-cover" />}
                                          {sub.label}
                                        </>
                                      ),
                                    });
                                  })}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-expanded={isMobileMenuOpen}
                  className={cn(
                    "relative z-50 flex items-center gap-2 rounded-full px-6 py-3 text-foreground shadow-lg transition-all duration-300",
                    isMobileMenuOpen ? "border border-foreground bg-transparent" : "border border-border bg-background",
                  )}
                >
                  <span className="text-lg font-medium">Menu</span>
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </DockContext.Provider>
      </MotionConfig>
    </LazyMotion>
  );
}

export interface DockItemProps {
  /** `DockDropdownItem`s. */
  children: ReactNode;
  label: string;
  id?: string;
  /** Set by `Dock`. */
  renderType?: "content" | "trigger";
  className?: string;
}

const isChildActive = (children: ReactNode, currentPath?: string) =>
  Children.toArray(children).some(
    (child) =>
      isValidElement<DockDropdownItemProps>(child) && typeName(child) === "DockDropdownItem" && currentPath === child.props.href,
  );

/** A dropdown trigger (in the bar) and its panel (above the bar). */
export function DockItem({ children, label, id, renderType, className }: DockItemProps) {
  const { openDropdowns, handleDropdownEnter, handleDropdownLeave, activePage } = useDock();
  const itemId = id || label.toLowerCase().replace(/\s+/g, "-");
  const isOpen = openDropdowns[itemId] || false;
  const isAnyChildActive = isChildActive(children, activePage);

  if (renderType === "content") {
    return (
      <m.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn("w-full overflow-hidden", isOpen ? "pointer-events-auto min-h-[100px]" : "pointer-events-none")}
        onMouseEnter={() => handleDropdownEnter(itemId)}
        onMouseLeave={() => handleDropdownLeave(itemId)}
      >
        <div className="flex w-full min-w-[400px] items-start justify-between bg-background px-[15px] pt-[15px] pb-[30px] dark:bg-transparent">
          <div className="flex flex-col gap-[12.5px]">{children}</div>
          <DockItemImagePreview>{children}</DockItemImagePreview>
        </div>
      </m.div>
    );
  }

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      className={cn(
        "flex h-[42px] cursor-pointer items-center gap-1 rounded-full px-[18px] text-[14px] leading-[10px] text-foreground transition-colors duration-200 outline-none hover:bg-accent focus-visible:bg-accent",
        (isOpen || isAnyChildActive) && "bg-accent",
        isAnyChildActive && "font-medium",
        className,
      )}
      onMouseEnter={() => handleDropdownEnter(itemId)}
      onMouseLeave={() => handleDropdownLeave(itemId)}
      onFocus={() => handleDropdownEnter(itemId)}
      onBlur={() => handleDropdownLeave(itemId)}
    >
      {label}
      <m.svg width="16" height="16" viewBox="0 0 16 16" animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} aria-hidden>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 8.93934L4.53033 5.46967L3.46967 6.53033L6.58578 9.64645C7.36683 10.4275 8.63316 10.4275 9.41421 9.64645L12.5303 6.53033L11.4697 5.46967L8 8.93934Z"
          fill="currentColor"
        />
      </m.svg>
    </button>
  );
}
DockItem.displayName = "DockItem";

function DockItemImagePreview({ children }: { children: ReactNode }) {
  const { hoveredLink, activePage } = useDock();
  const items = Children.toArray(children).filter(
    (child): child is ReactElement<DockDropdownItemProps> => isValidElement<DockDropdownItemProps>(child) && typeName(child) === "DockDropdownItem",
  );
  const activeChild = items.find((child) => child.props.href === activePage);
  const hoveredChild = items.find((child) => child.props.href === hoveredLink);
  const displayImage = hoveredChild?.props.image || activeChild?.props.image;
  const shouldShowImage = Boolean(hoveredLink || activeChild);
  if (!displayImage) return null;

  return (
    <div className="flex flex-col items-end gap-2">
      <m.img
        key={displayImage}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: shouldShowImage ? 1 : 0.8, scale: shouldShowImage ? 1 : 0.9 }}
        transition={{ ease: shouldShowImage ? easeIn : easeOut, duration: 0.2 }}
        src={displayImage}
        className="h-[80px] w-[80px] rounded-[15px] object-cover"
        alt=""
      />
    </div>
  );
}

export interface DockDropdownItemProps {
  href: string;
  label: string;
  /** Preview shown in the panel while this link is hovered or active. */
  image?: string;
  className?: string;
}

/** A link inside a `DockItem` panel. */
export function DockDropdownItem({ href, label, className }: DockDropdownItemProps) {
  const { hoveredLink, setHoveredLink, activePage, renderLink } = useDock();
  const highlighted = activePage === href || hoveredLink === href;
  return (
    <m.div whileHover={{ x: 5 }} transition={{ duration: 0.1 }} onMouseEnter={() => setHoveredLink(href)} onFocus={() => setHoveredLink(href)}>
      {renderLink({
        href,
        className: cn(
          "block text-[14px] leading-[10px] transition-colors outline-none focus-visible:text-foreground",
          highlighted ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
          className,
        ),
        children: label,
      })}
    </m.div>
  );
}
DockDropdownItem.displayName = "DockDropdownItem";

export interface DockIconProps {
  icon: ReactNode;
  href: string;
  /** Accessible name for the icon-only link. */
  label?: string;
  renderType?: "content" | "trigger";
  className?: string;
}

/** An icon-only link in the bar. */
export function DockIcon({ icon, href, label, renderType, className }: DockIconProps) {
  const { activePage, renderLink } = useDock();
  if (renderType === "content") return null;
  return renderLink({
    href,
    className: cn(
      "flex h-[42px] w-[56px] cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-200 outline-none hover:bg-accent focus-visible:bg-accent",
      activePage === href && "bg-accent",
      className,
    ),
    children: (
      <>
        {icon}
        {label && <span className="sr-only">{label}</span>}
      </>
    ),
  });
}
DockIcon.displayName = "DockIcon";

export interface DockLinkProps {
  label: string;
  href: string;
  /** Trailing icon; nudges up-right on hover. */
  icon?: ReactNode;
  /** Opens in a new tab, rendered as a plain `<a>`. */
  external?: boolean;
  renderType?: "content" | "trigger";
  id?: string;
  className?: string;
}

/** A top-level text link in the bar. */
export function DockLink({ label, href, icon, external, renderType, className }: DockLinkProps) {
  const { activePage, renderLink } = useDock();
  const [isHovered, setIsHovered] = useState(false);
  if (renderType === "content") return null;
  const isActive = activePage === href;
  const content = (
    <>
      {label}
      {icon && (
        <m.div initial={{ x: 0, y: 0 }} animate={{ x: isHovered ? 2 : 0, y: isHovered ? -2 : 0 }} transition={{ duration: 0.2 }}>
          {icon}
        </m.div>
      )}
    </>
  );
  const linkClass = cn(
    "flex h-[42px] items-center gap-1 rounded-full px-[18px] text-[14px] leading-[10px] text-foreground transition-colors duration-200 outline-none hover:bg-accent focus-visible:bg-accent",
    isActive && "bg-accent font-medium hover:bg-foreground/10",
    className,
  );
  return (
    <div className="inline-block rounded-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {content}
        </a>
      ) : (
        renderLink({ href, className: linkClass, children: content })
      )}
    </div>
  );
}
DockLink.displayName = "DockLink";

export default Dock;
