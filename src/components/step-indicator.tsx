"use client";

import { cn } from "@/lib/utils";

export interface StepIndicatorProps {
  /** Current active step (0-indexed) */
  currentStep: number;
  /** Array of step labels */
  steps: string[];
  /** Additional CSS classes */
  className?: string;
}

export function StepIndicator({
  currentStep,
  steps,
  className,
}: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" className={cn("w-full", className)}>
      <ol className="flex items-center gap-0">
        {steps.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <li
              key={label}
              className="flex flex-1 items-center"
              aria-current={isCurrent ? "step" : undefined}
            >
              <div className="flex flex-col items-center gap-1.5">
                {/* Step circle */}
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border-2 text-xs font-medium transition-colors",
                    isCompleted &&
                      "border-primary bg-primary text-primary-foreground",
                    isCurrent &&
                      "border-primary bg-primary/10 text-primary",
                    isUpcoming &&
                      "border-border bg-card text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      aria-label="Completed"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Step label */}
                <span
                  className={cn(
                    "text-center text-xs font-medium leading-tight",
                    isCurrent && "text-foreground",
                    isCompleted && "text-muted-foreground",
                    isUpcoming && "text-muted-foreground/60"
                  )}
                >
                  {label}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "relative mt-[-1.25rem] h-[2px] flex-1",
                    index < currentStep ? "bg-primary" : "bg-border"
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
