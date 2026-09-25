import { CollapsibleBanner } from "./collapsible-banner";

export default function CollapsibleBannerDemo() {
  return (
    <div className="mx-auto w-full max-w-[420px] space-y-2">
      <CollapsibleBanner
        dismissible={false}
        title="Payments are degraded"
        description="Charges are queued and settle automatically once the provider recovers. Nothing is lost."
      />

      <CollapsibleBanner
        title="Storage is nearly full"
        description="This workspace is using 94% of its 10 GB."
        action={
          <button
            type="button"
            className="h-7 rounded-[calc(var(--radius)-3px)] border border-border bg-muted px-2.5 text-[11.5px] font-medium text-foreground transition-colors duration-150 hover:bg-accent"
          >
            Upgrade plan
          </button>
        }
      />
    </div>
  );
}
