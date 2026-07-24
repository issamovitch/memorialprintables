import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading, type SectionHeadingProps } from "@/components/section-heading";

export interface CategorySectionProps extends SectionHeadingProps {
  /** Unique identifier for the section */
  id?: string;
  /** Content to render inside the section (typically a grid of cards) */
  children: ReactNode;
  /** Additional CSS classes for the content area */
  contentClassName?: string;
  /** Additional CSS classes for the outer wrapper */
  className?: string;
}

export function CategorySection({
  id,
  title,
  subtitle,
  children,
  contentClassName,
  className,
  align,
}: CategorySectionProps) {
  return (
    <section id={id} className={cn("py-10 sm:py-14", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          align={align}
        />
        <div
          className={cn(
            "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            contentClassName
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
