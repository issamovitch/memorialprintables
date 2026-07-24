import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  /** Title of the empty state */
  title?: string;
  /** Descriptive message */
  message?: string;
  /** Optional CTA button text */
  actionLabel?: string;
  /** Optional CTA link */
  actionHref?: string;
  /** Callback when action is triggered (for client-side) */
  onAction?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function EmptyState({
  title = "No templates found",
  message = "We are still preparing templates for this category. Please check back soon.",
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center",
        className
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <FileText className="size-6 text-muted-foreground" strokeWidth={1.5} />
      </div>

      <div className="max-w-sm">
        <h3 className="font-heading text-base font-semibold text-foreground">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {message}
        </p>
      </div>

      {actionLabel && actionHref && (
        <Button
          variant="outline"
          size="sm"
          className="mt-1 text-primary border-border"
          asChild
        >
          <a href={actionHref}>{actionLabel}</a>
        </Button>
      )}

      {actionLabel && onAction && !actionHref && (
        <Button
          variant="outline"
          size="sm"
          className="mt-1 text-primary border-border"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
