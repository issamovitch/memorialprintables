import Link from "next/link";
import { FileText, Download, Eye } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface PrintableCardProps {
  /** Display title of the template */
  title: string;
  /** Short description of the template */
  description: string;
  /** Category label (e.g. "Funeral Program", "Prayer Card") */
  category: string;
  /** Optional tag for template style */
  tag?: string;
  /** URL slug or identifier */
  href: string;
  /** Preview image URL (optional, will show placeholder if not provided) */
  previewSrc?: string;
  /** Aspect ratio class for the preview area */
  aspectClass?: string;
}

export function PrintableCard({
  title,
  description,
  category,
  tag,
  href,
  previewSrc,
  aspectClass = "aspect-[3/4]",
}: PrintableCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden border-border/80 transition-shadow hover:shadow-md">
      {/* Preview area */}
      <div
        className={`relative ${aspectClass} w-full overflow-hidden rounded-t-xl bg-muted`}
      >
        {previewSrc ? (
          <img
            src={previewSrc}
            alt={`Preview of ${title} template`}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3 text-muted-foreground/50">
            <FileText className="size-12" strokeWidth={1} />
            <span className="text-xs font-medium">Preview</span>
          </div>
        )}

        {/* Category badge overlay */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-secondary/90 text-white backdrop-blur-sm text-xs"
          >
            {category}
          </Badge>
        </div>

        {/* Hover overlay actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-foreground/0 opacity-0 transition-all duration-200 group-hover:bg-foreground/5 group-hover:opacity-100">
          <Button
            variant="secondary"
            size="sm"
            className="gap-1.5 shadow-sm"
            asChild
          >
            <Link href={href}>
              <Eye className="size-3.5" />
              View
            </Link>
          </Button>
          <Button
            size="sm"
            className="gap-1.5 shadow-sm"
            asChild
          >
            <Link href={`${href}?action=download`}>
              <Download className="size-3.5" />
              Download
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <CardContent className="flex-1 px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
            {title}
          </h3>
          {tag && (
            <Badge
              variant="outline"
              className="shrink-0 border-secondary/40 text-secondary text-[10px] uppercase tracking-wider"
            >
              {tag}
            </Badge>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>

      {/* Footer action */}
      <CardFooter className="border-t border-border/50 px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-sm text-primary hover:text-primary hover:bg-primary/5"
          asChild
        >
          <Link href={href}>
            Customize &amp; Print
            <span className="ml-1 text-xs text-muted-foreground">Free</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
