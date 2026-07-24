import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComfortMessageProps {
  /** The supportive message to display */
  message: string;
  /** Optional title above the message */
  title?: string;
  /** Visual style variant */
  variant?: "subtle" | "warm";
  /** Additional CSS classes */
  className?: string;
}

export function ComfortMessage({
  message,
  title,
  variant = "subtle",
  className,
}: ComfortMessageProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-6 text-center",
        variant === "subtle" && "border-border/60 bg-muted/30",
        variant === "warm" && "border-secondary/20 bg-secondary/5",
        className
      )}
      role="complementary"
      aria-label="Supportive message"
    >
      {title && (
        <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
          {title}
        </h3>
      )}

      <div className="mx-auto mb-3 flex items-center justify-center gap-2">
        <span className="h-px w-8 bg-secondary/40" aria-hidden="true" />
        <Heart
          className="size-4 text-secondary"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span className="h-px w-8 bg-secondary/40" aria-hidden="true" />
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground italic">
        {message}
      </p>
    </div>
  );
}
