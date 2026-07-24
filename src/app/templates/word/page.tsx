import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, FileText } from "lucide-react";

export const metadata = {
  title: "Free Funeral Program Template Word - Download | MemorialPrintables",
  description:
    "Download free funeral program templates for Microsoft Word. No signup, no watermarks. Edit and print at home.",
  alternates: {
    canonical: "https://memorialprintables.com/templates/word",
  },
};

const templates = [
  {
    name: "Classic Bifold Program",
    description: "A traditional bifold layout with space for a cover photo, order of service, obituary, and acknowledgements. Works with standard letter or A4 paper.",
    format: "Bifold",
  },
  {
    name: "Simple Single Sheet",
    description: "An unfolded single-page program listing the order of service and key details. Ideal for short or informal services.",
    format: "Single Sheet",
  },
  {
    name: "Trifold Memorial Program",
    description: "A six-panel trifold layout with room for extended content including readings, poems, and longer obituaries.",
    format: "Trifold",
  },
  {
    name: "Religious Service Program",
    description: "A bifold template with sections for scripture readings, prayers, and hymn lyrics alongside the standard service elements.",
    format: "Bifold",
  },
  {
    name: "Celebration of Life",
    description: "A warm, less formal template designed for celebration of life services. Includes space for photos and personal stories.",
    format: "Bifold",
  },
  {
    name: "Minimalist Memorial",
    description: "A clean, understated design with minimal decoration. Lets the content and photograph speak for themselves.",
    format: "Bifold",
  },
];

export default function WordTemplatesPage() {
  return (
    <>
      <div className="border-b border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/templates/word">Templates</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Word Templates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Free Funeral Program Templates for Word
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Download, edit in Microsoft Word, and print. No signup required and no watermarks.
          </p>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="leading-relaxed text-muted-foreground">
          These funeral program templates are formatted for Microsoft Word and ready to
          download. Each template includes placeholder text that you replace with your
          own content. The formatting, fonts, and layout are already set up so you can
          focus on entering the details about your loved one rather than designing from
          scratch. All templates are free, with no signup or email required, and the
          downloaded files have no watermarks.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          To use a template, click the download button next to the one you want. Open
          the file in Microsoft Word (or any compatible editor like LibreOffice or
          Google Docs). Replace the placeholder name, dates, and other text with your
          own content. Insert a photo by clicking the placeholder image area and
          selecting a photo from your computer. When you are finished, print the
          program on standard letter or A4 paper and fold according to the layout
          instructions.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          If you would prefer to create your program online without downloading
          anything, try our{" "}
          <Link
            href="/funeral-program-maker"
            className="text-[#3D5A73] underline underline-offset-2 hover:text-[#2F4759]"
          >
            free online funeral program maker
          </Link>{" "}
          instead. It generates a print-ready PDF directly in your browser.
        </p>
      </article>

      {/* Template Grid */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((tpl) => (
            <Card
              key={tpl.name}
              className="overflow-hidden border-border transition-shadow hover:shadow-md"
            >
              {/* Preview placeholder */}
              <div className="flex h-44 items-center justify-center border-b border-border bg-muted/30">
                <div className="w-28 rounded border border-border bg-white p-3 shadow-sm">
                  <div className="mb-1.5 h-px w-8 mx-auto bg-[#8FA396]" />
                  <div className="h-2 w-16 mx-auto rounded bg-muted" />
                  <div className="mt-1 h-10 rounded bg-muted/60" />
                  <div className="mt-1 space-y-0.5">
                    <div className="h-1 w-14 rounded bg-muted" />
                    <div className="h-1 w-12 rounded bg-muted" />
                    <div className="h-1 w-16 rounded bg-muted" />
                  </div>
                  <div className="mt-1 h-px w-8 mx-auto bg-[#8FA396]" />
                </div>
              </div>
              <CardContent className="p-4">
                <span className="mb-1.5 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {tpl.format}
                </span>
                <h2 className="font-heading text-base font-semibold text-foreground">
                  {tpl.name}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {tpl.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 border-[#3D5A73] text-[#3D5A73] hover:bg-[#3D5A73] hover:text-white"
                >
                  <Download className="mr-1.5 size-3.5" />
                  Download Free Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-muted/30 p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Prefer to Edit Online?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            If you do not have Microsoft Word or would rather work in your browser,
            try our free online maker. It generates a print-ready PDF with no
            software to install.
          </p>
          <Button
            className="mt-4 bg-[#3D5A73] text-white hover:bg-[#2F4759]"
            asChild
          >
            <Link href="/funeral-program-maker">
              Use the Online Maker
            </Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Do I need Microsoft Word to use these templates?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              The templates are in .docx format, which works in Microsoft Word,
              LibreOffice, Google Docs, and most other word processors. You can also
              upload them to Google Drive and open them in Google Docs if you prefer
              to work online.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Can I change the fonts and colors in the template?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Yes. After downloading, you can change any element of the template
              including fonts, colors, text size, and layout. The templates are fully
              editable starting points.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              What paper size do these templates use?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              All templates are set up for US Letter size (8.5 by 11 inches). To use
              A4 paper, change the page size in Word under Page Setup. The layout may
              need minor adjustments after switching.
            </p>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://memorialprintables.com" },
              { "@type": "ListItem", position: 2, name: "Word Templates", item: "https://memorialprintables.com/templates/word" },
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
              { "@type": "Question", name: "Do I need Microsoft Word?", acceptedAnswer: { "@type": "Answer", text: "The .docx templates work in Microsoft Word, LibreOffice, and Google Docs." } },
              { "@type": "Question", name: "Can I change fonts and colors?", acceptedAnswer: { "@type": "Answer", text: "Yes. The templates are fully editable. You can change any element after downloading." } },
              { "@type": "Question", name: "What paper size?", acceptedAnswer: { "@type": "Answer", text: "US Letter by default. You can change to A4 in Page Setup." } },
            ],
          }),
        }}
      />
    </>
  );
}
