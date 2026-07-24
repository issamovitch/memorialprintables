import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SectionHeading, type SectionHeadingProps } from "@/components/section-heading";

export interface BreadcrumbItemData {
  label: string;
  href: string;
}

export interface PageHeaderProps extends Omit<SectionHeadingProps, "compact"> {
  /** Breadcrumb trail items, ordered from root to current page's parent */
  breadcrumbs?: BreadcrumbItemData[];
  /** Current page title (shown as last breadcrumb and heading) */
  pageTitle: string;
  /** Page description (optional) */
  pageDescription?: string;
  /** Additional CSS classes */
  className?: string;
}

export function PageHeader({
  breadcrumbs = [],
  pageTitle,
  pageDescription,
  className,
  align,
}: PageHeaderProps) {
  const hasBreadcrumbs = breadcrumbs.length > 0;

  return (
    <div
      className={`border-b border-border bg-background ${className ?? ""}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {hasBreadcrumbs && (
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.href} className="contents">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </span>
              ))}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {/* Title and description */}
        <SectionHeading
          title={pageTitle}
          subtitle={pageDescription}
          compact={false}
          align={align}
        />
      </div>
    </div>
  );
}
