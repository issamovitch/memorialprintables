import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  templates: [
    { label: "Funeral Program Maker", href: "/funeral-program-maker" },
    { label: "Word Templates", href: "/templates/word" },
    { label: "Google Docs Templates", href: "/templates/google-docs" },
    { label: "Editable Templates", href: "/templates/editable" },
  ],
  resources: [
    { label: "How to Make a Funeral Program", href: "/how-to-make-a-funeral-program" },
    { label: "Funeral Planning Guide", href: "/how-to-make-a-funeral-program" },
  ],
  support: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
} as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      {/* Comfort message */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-5 sm:px-6 lg:px-8">
          <Heart
            className="size-5 shrink-0 text-secondary"
            strokeWidth={1.5}
          />
          <p className="text-sm leading-relaxed text-muted-foreground">
            We are here to help during this difficult time. All our templates
            are completely free, with no signup required.
          </p>
        </div>
      </div>

      {/* Footer links */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="mb-4 flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Image
                src="/logo.png"
                alt="MemorialPrintables"
                width={28}
                height={28}
                quality={100}
                className="size-7"
              />
              <span className="font-heading text-base font-semibold text-primary">
                MemorialPrintables
              </span>
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Free, easy-to-use funeral and memorial printables to help you honor
              your loved one with dignity and care.
            </p>
          </div>

          {/* Templates */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Templates
            </h3>
            <ul className="mt-3 space-y-2.5">
              {footerLinks.templates.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Resources
            </h3>
            <ul className="mt-3 space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Support
            </h3>
            <ul className="mt-3 space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MemorialPrintables. All rights
            reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with care for families navigating loss.
          </p>
        </div>
      </div>
    </footer>
  );
}
