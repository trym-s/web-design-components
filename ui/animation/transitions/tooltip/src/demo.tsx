import { Tooltip } from "./tooltip";

export default function Demo() {
  return (
    <div className="flex h-[260px] w-[296px] items-center justify-center rounded-xl bg-muted/40 p-4">
      <Tooltip content="Copied to clipboard">
        {({ className, ...props }) => (
          <button
            type="button"
            {...props}
            className={`${className} h-8 rounded-full bg-foreground/[0.06] px-3 text-sm font-medium text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50`}
          >
            Hover me
          </button>
        )}
      </Tooltip>
    </div>
  );
}
