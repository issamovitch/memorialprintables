import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Funeral Program Template Editable - Free Maker | MemorialPrintables",
  description:
    "Create a fully editable funeral program online. No signup, no watermarks. Choose a layout, add your content, and download a print-ready PDF.",
  alternates: {
    canonical: "https://memorialprintables.com/templates/editable",
  },
};

export default function EditableTemplatesPage() {
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
                  <Link href="/templates/editable">Templates</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Editable Templates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Editable Funeral Program Templates
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Create a custom funeral program in your browser. Edit every detail and
            download a print-ready PDF. No signup and no watermarks.
          </p>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="leading-relaxed text-muted-foreground">
          An editable funeral program template gives you full control over every element
          of the design without needing design software. Our online maker lets you choose
          a layout, enter the details about your loved one, upload a photo, build a custom
          order of service, and download a print-ready PDF. Everything happens in your
          browser. There is no account to create, no email to provide, and no watermark
          on the finished program.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          The maker supports four layouts. A bifold program is the most common format for
          a traditional funeral or memorial service. It folds once to create a front
          cover, two inside panels, and a back panel. A trifold program folds twice for
          six panels, giving you more room for longer services or additional content like
          poems and readings. A single-sheet program is a simple one-page handout, and the
          eight-page booklet format provides the most space for extended obituaries,
          multiple photos, and detailed acknowledgements.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Your work is automatically saved to your browser as you type. If you need to
          step away and come back later, your progress will still be there. The PDF is
          generated locally on your device, which means your personal information about
          your loved one never leaves your computer. This is an important privacy
          consideration during an already difficult time.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          For more guidance on what to include in a funeral program and how to organize
          the content, visit our{" "}
          <Link
            href="/how-to-make-a-funeral-program"
            className="text-[#3D5A73] underline underline-offset-2 hover:text-[#2F4759]"
          >
            step-by-step guide to making a funeral program
          </Link>
          . If you prefer to work in a desktop document editor, we also offer free{" "}
          <Link
            href="/templates/word"
            className="text-[#3D5A73] underline underline-offset-2 hover:text-[#2F4759]"
          >
            Word templates
          </Link>{" "}
          and{" "}
          <Link
            href="/templates/google-docs"
            className="text-[#3D5A73] underline underline-offset-2 hover:text-[#2F4759]"
          >
            Google Docs templates
          </Link>
          .
        </p>
      </article>

      {/* Layout options that route to the tool */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Choose a Layout to Start Editing
        </h2>
        <p className="mt-2 mb-8 text-muted-foreground">
          Click any layout to open it in the free online maker. You can change the
          layout later if you need to.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Bifold",
              desc: "Four panels. The most traditional format for funeral services.",
              panels: "4 panels",
            },
            {
              name: "Trifold",
              desc: "Six panels. Good for longer services or celebrations of life.",
              panels: "6 panels",
            },
            {
              name: "Single Sheet",
              desc: "One unfolded page. Simple and direct for short services.",
              panels: "1 page",
            },
            {
              name: "8-Page Booklet",
              desc: "Eight pages. Best for longer obituaries and multiple photos.",
              panels: "8 pages",
            },
          ].map((layout) => (
            <Link key={layout.name} href="/funeral-program-maker">
              <Card className="h-full border-border transition-shadow hover:shadow-md">
                <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                    <Pencil className="size-5 text-[#3D5A73]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {layout.name}
                  </h3>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {layout.panels}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {layout.desc}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#3D5A73]">
                    Start editing <ArrowRight className="size-3.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-muted/30 p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Start Creating Your Program Now
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The online maker is free, requires no signup, and generates a print-ready
            PDF in seconds. Your information stays private in your browser.
          </p>
          <Button
            className="mt-4 bg-[#3D5A73] text-white hover:bg-[#2F4759]"
            asChild
          >
            <Link href="/funeral-program-maker">Open the Free Maker</Link>
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
              What does editable mean?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Editable means you can change every part of the template: the text, the
              photo, the order of service, and all other content. You are not limited
              to filling in blanks. You have full control over the design.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Is the PDF really print-ready?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Yes. The PDF is formatted with correct margins for the selected paper
              size. Bifold and trifold layouts include fold marks. You can print the
              PDF at home, at a copy shop, or at a professional printer.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Can I save my work and come back later?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Yes. The maker automatically saves your progress to your browser. When
              you return to the page, your work will still be there. Note that clearing
              your browser data will remove the saved information.
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
              { "@type": "ListItem", position: 2, name: "Editable Templates", item: "https://memorialprintables.com/templates/editable" },
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
              { "@type": "Question", name: "What does editable mean?", acceptedAnswer: { "@type": "Answer", text: "You can change every part of the template: text, photo, order of service, and all content." } },
              { "@type": "Question", name: "Is the PDF really print-ready?", acceptedAnswer: { "@type": "Answer", text: "Yes. Correct margins, fold marks, and standard paper sizes. Print anywhere." } },
              { "@type": "Question", name: "Can I save and come back?", acceptedAnswer: { "@type": "Answer", text: "Yes. Progress auto-saves to your browser. Return to the page to continue." } },
            ],
          }),
        }}
      />
    </>
  );
}
