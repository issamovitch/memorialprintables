import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface HeroSectionProps {
  /** Main heading text */
  heading: string;
  /** Subheading or description */
  description: string;
  /** Primary CTA button text */
  ctaText?: string;
  /** Primary CTA link */
  ctaHref?: string;
  /** Secondary link text (optional) */
  secondaryText?: string;
  /** Secondary link href (optional) */
  secondaryHref?: string;
  /** Optional background image URL */
  bgImage?: string;
}

export function HeroSection({
  heading,
  description,
  ctaText = "Browse Templates",
  ctaHref = "#programs",
  secondaryText,
  secondaryHref,
  bgImage,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      {/* Optional background image with overlay */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
      )}

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          {/* Decorative flourish */}
          <div className="mx-auto mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-secondary/50" aria-hidden="true" />
            <svg
              className="size-5 text-secondary"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                d="M12 21c-1.5-4.5-4-7.5-4-10.5a4 4 0 0 1 8 0c0 3-2.5 6-4 10.5Z"
              />
              <path d="M12 21c-3-1.5-6.5-2-10.5-2m10.5 2c3-1.5 6.5-2 10.5-2" />
            </svg>
            <span className="h-px w-12 bg-secondary/50" aria-hidden="true" />
          </div>

          <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {heading}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              className="min-w-[200px] bg-primary text-primary-foreground shadow-sm hover:bg-[#2F4759]"
              asChild
            >
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>

            {secondaryText && secondaryHref && (
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] text-primary border-border hover:bg-muted"
                asChild
              >
                <Link href={secondaryHref}>{secondaryText}</Link>
              </Button>
            )}
          </div>

          {/* Trust indicators */}
          <p className="mt-6 text-xs tracking-wide text-muted-foreground">
            Free to use &middot; No signup required &middot; Print-ready PDF
          </p>
        </div>
      </div>
    </section>
  );
}
