import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  /** Section title text */
  title: string;
  /** Optional subtitle / description */
  subtitle?: string;
  /** Additional CSS classes */
  className?: string;
  /** When true, renders with a smaller style for inline sections */
  compact?: boolean;
  /** Optional text alignment override */
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  compact = false,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8",
        align === "center" && "text-center",
        compact ? "mb-5" : "mb-8",
        className
      )}
    >
      <h2
        className={cn(
          "font-heading text-foreground",
          compact ? "text-xl font-semibold" : "text-2xl font-semibold sm:text-3xl"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-2 text-muted-foreground",
            compact ? "text-sm max-w-lg" : "text-base max-w-2xl",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
