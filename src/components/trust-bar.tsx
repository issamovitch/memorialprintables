import { cn } from "@/lib/utils";

export interface TrustBadgeProps {
  /** Badge label */
  label: string;
  /** Optional sub-label */
  sublabel?: string;
  /** Additional CSS classes */
  className?: string;
}

export function TrustBadge({ label, sublabel, className }: TrustBadgeProps) {
  return (
    <div className={cn("flex flex-col items-center gap-0.5 text-center", className)}>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {sublabel && (
        <span className="text-xs text-muted-foreground">{sublabel}</span>
      )}
    </div>
  );
}

export interface TrustBarProps {
  /** Additional CSS classes */
  className?: string;
}

export function TrustBar({ className }: TrustBarProps) {
  const badges = [
    { label: "Free Forever", sublabel: "No hidden fees" },
    { label: "No Signup", sublabel: "Start immediately" },
    { label: "Print-Ready", sublabel: "Professional quality" },
    { label: "Easy to Use", sublabel: "Edit in minutes" },
  ];

  return (
    <section className="border-y border-border bg-muted/20" aria-label="Trust indicators">
      <div className={cn("mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8", className)}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {badges.map((badge) => (
            <TrustBadge
              key={badge.label}
              label={badge.label}
              sublabel={badge.sublabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
