import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CategoryCardProps {
  /** Category name */
  title: string;
  /** Short description of what's in the category */
  description: string;
  /** Number of templates available */
  count: number;
  /** Link to the category page */
  href: string;
  /** Icon element or SVG to represent the category */
  icon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function CategoryCard({
  title,
  description,
  count,
  href,
  icon,
  className,
}: CategoryCardProps) {
  return (
    <Link href={href} className={cn("group block", className)}>
      <Card className="h-full border-border/70 bg-card transition-shadow hover:shadow-md">
        <CardContent className="flex flex-col gap-3 p-5">
          {/* Icon */}
          <div className="flex size-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
            {icon ?? (
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
                <path d="M7 15h10M7 11h10" />
              </svg>
            )}
          </div>

          {/* Title and count */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {count}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* View link */}
          <div className="mt-auto flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            View templates
            <ArrowRight className="size-3.5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
