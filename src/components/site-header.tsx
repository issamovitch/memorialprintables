"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Funeral Program Maker", href: "/funeral-program-maker" },
  { label: "Word Templates", href: "/templates/word" },
  { label: "Google Docs Templates", href: "/templates/google-docs" },
  { label: "How to Make a Program", href: "/how-to-make-a-funeral-program" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Site name / logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.png"
            alt="MemorialPrintables"
            width={40}
            height={40}
            quality={100}
            className="size-10"
          />
          <span className="font-heading text-lg font-semibold tracking-tight text-primary">
            MemorialPrintables
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Separator orientation="vertical" className="mx-2 h-5" />
          <Link href="/funeral-program-maker">
            <Button size="sm" className="cursor-pointer bg-[#6B6B8D] text-white hover:bg-[#6B6B8D]/90">
              Create Free Program
            </Button>
          </Link>
        </nav>

        {/* Mobile navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 overflow-y-auto">
            <SheetHeader>
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="MemorialPrintables"
                  width={32}
                  height={32}
                  quality={100}
                  className="size-8"
                />
                <SheetTitle className="font-heading text-lg text-primary">
                  MemorialPrintables
                </SheetTitle>
              </div>
            </SheetHeader>
            <nav className="mt-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Separator className="my-2" />
              <Link
                href="/funeral-program-maker"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-md bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Create Free Program
              </Link>
            </nav>
            <p className="mt-auto px-3 pb-6 pt-8 text-xs leading-relaxed text-muted-foreground">
              All templates are free to use and print. No signup or account
              required. Our condolences for your loss.
            </p>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
