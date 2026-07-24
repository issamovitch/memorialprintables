import Link from "next/link";
import { ArrowRight, FileText, BookOpen, Pencil } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { TrustBar } from "@/components/trust-bar";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const templateCategories = [
  {
    title: "Funeral Program Maker",
    description: "Create a custom program in your browser. Choose a layout, fill in details, and download a print-ready PDF.",
    href: "/funeral-program-maker",
    icon: Pencil,
    badge: "Most Popular",
  },
  {
    title: "Word Templates",
    description: "Download free funeral program templates for Microsoft Word. Edit on your computer and print at home.",
    href: "/templates/word",
    icon: FileText,
    badge: null,
  },
  {
    title: "Google Docs Templates",
    description: "Copy free templates directly to your Google Drive. Edit online from any device and share with family.",
    href: "/templates/google-docs",
    icon: BookOpen,
    badge: null,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        heading="Free Funeral Program Templates"
        description="Create a beautiful funeral program in minutes. No signup, no cost, no watermarks. Download a print-ready PDF or start from a template."
        ctaText="Create a Free Program"
        ctaHref="/funeral-program-maker"
        secondaryText="How to Make a Funeral Program"
        secondaryHref="/how-to-make-a-funeral-program"
      />

      {/* Trust Bar */}
      <TrustBar />

      {/* Template Categories */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="Ways to Create Your Funeral Program"
          subtitle="Choose the option that works best for you. All of them are free and require no account."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {templateCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.href} href={cat.href}>
                <Card className="h-full border-border transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    {cat.badge && (
                      <span className="mb-3 inline-block rounded-full bg-muted px-3 py-0.5 text-xs font-medium text-muted-foreground">
                        {cat.badge}
                      </span>
                    )}
                    <Icon className="mb-3 size-8 text-[#8FA396]" strokeWidth={1.5} />
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#3D5A73]">
                      Get started <ArrowRight className="size-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="Three steps to a finished funeral program, whether you use our online maker or a downloadable template."
            align="center"
          />
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#3D5A73] text-lg font-semibold text-white">
                1
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                Choose a Template
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Pick from our free online maker, a Word template, or a Google Docs template. Each option produces a professional result. Browse the previews to find the style that feels right for your loved one.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#3D5A73] text-lg font-semibold text-white">
                2
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                Add Your Details
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Enter the name, dates, order of service, obituary, and any other information you want to include. Upload a photo if you have one. The preview updates as you go so you can see the program take shape.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#3D5A73] text-lg font-semibold text-white">
                3
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                Download and Print
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Download your finished program as a print-ready PDF or save your edited document. Print at home, at a copy shop, or at a professional printer. The files are formatted with correct margins and paper sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Tool Preview / CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                The Online Funeral Program Maker
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Our in-browser tool lets you create a complete funeral program without
                leaving this page. Choose a layout, enter the details about your loved
                one, and download a print-ready PDF. There is no account to create, no
                email to enter, and no watermark on the output. The entire process
                happens in your browser so your personal information stays private.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The tool supports bifold, trifold, single-sheet, and eight-page booklet
                layouts. You can add a photo, build a custom order of service, include
                an obituary, and add poems or scripture. Your work is automatically saved
                to your browser so you can step away and come back without losing
                anything.
              </p>
              <div className="mt-6">
                <Button
                  size="lg"
                  className="bg-[#3D5A73] text-white hover:bg-[#2F4759]"
                  asChild
                >
                  <Link href="/funeral-program-maker">
                    Open the Free Maker
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden items-center justify-center bg-muted/30 p-8 md:flex">
              {/* Simplified program preview illustration */}
              <div className="w-48 rounded border border-border bg-white p-4 shadow-sm">
                <div className="mb-2 h-px w-10 mx-auto bg-[#8FA396]" />
                <p className="text-center text-[8px] tracking-widest text-[#8FA396]">
                  IN LOVING MEMORY OF
                </p>
                <p className="mt-1.5 text-center font-heading text-sm font-semibold text-[#2C2C2E]">
                  Your Loved One
                </p>
                <div className="mt-2 h-16 rounded bg-muted/60" />
                <p className="mt-2 text-center text-[7px] text-[#6E6E73]">
                  January 1, 1940 — December 31, 2024
                </p>
                <div className="mt-2 h-px w-10 mx-auto bg-[#8FA396]" />
                <div className="mt-3 space-y-1">
                  {["Prelude", "Opening Prayer", "Scripture Reading", "Eulogy", "Recessional"].map((item) => (
                    <p key={item} className="text-left text-[7px] text-[#2C2C2E]">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide CTA */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Need Help Getting Started?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Our complete guide walks you through every step of creating a funeral
            program, from deciding what to include to choosing the right paper and
            folding it for the service. Written for families who have never done this
            before.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="mt-6 border-[#3D5A73] text-[#3D5A73] hover:bg-[#3D5A73] hover:text-white"
            asChild
          >
            <Link href="/how-to-make-a-funeral-program">
              Read the Full Guide
            </Link>
          </Button>
        </div>
      </section>

      {/* Homepage FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="Common Questions"
          align="center"
        />
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Are these funeral program templates really free?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Yes. Every template on this site is free to download and use. There is no signup required, no trial period, and no watermark on the final output. You can create as many programs as you need without paying anything.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Do I need to create an account?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              No. You do not need an account, an email address, or any kind of login. Open the tool or download a template and start working immediately. The online maker saves your progress in your browser automatically, so you can come back to it without signing in.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              What is the difference between the online maker and the templates?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              The online maker generates a print-ready PDF directly in your browser. The Word and Google Docs templates are downloadable files you edit in Microsoft Word or Google Docs. Both options are free. The online maker is faster if you want a PDF right away. The templates give you more control over the design if you are comfortable with a document editor.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Can I print these at home?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Yes. All of our programs are designed to print on standard paper. The PDFs from the online maker and the Word templates work on any home printer. For the best results with bifold or trifold programs, use slightly heavier paper (around 24 to 32 pound weight) if you have it.
            </p>
          </div>
        </div>
      </section>

      {/* BreadcrumbList structured data for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://memorialprintables.com",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Are these funeral program templates really free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Every template on this site is free to download and use with no signup required and no watermarks.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to create an account?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. You do not need an account, an email address, or any kind of login to use our templates or maker.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between the online maker and the templates?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The online maker generates a PDF directly in your browser. The templates are files you edit in Word or Google Docs for more design control.",
                },
              },
              {
                "@type": "Question",
                name: "Can I print these at home?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. All programs are designed to print on standard paper on any home printer, copy shop, or professional printer.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
