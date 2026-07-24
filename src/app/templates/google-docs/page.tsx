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
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Free Funeral Program Template Google Docs | MemorialPrintables",
  description:
    "Copy free funeral program templates to your Google Drive. Edit online, share with family, and print. No signup.",
  alternates: {
    canonical: "https://memorialprintables.com/templates/google-docs",
  },
};

const templates = [
  {
    name: "Classic Bifold Program",
    description: "A traditional bifold layout with a cover photo, order of service, obituary, and acknowledgements. The most common choice for funeral and memorial services.",
    format: "Bifold",
  },
  {
    name: "Single Sheet Program",
    description: "A straightforward single-page layout listing the order of service and key details. Best for short or informal memorial gatherings.",
    format: "Single Sheet",
  },
  {
    name: "Trifold Memorial Program",
    description: "A six-panel layout providing extra space for longer obituaries, multiple readings, and additional content like poems or family tributes.",
    format: "Trifold",
  },
  {
    name: "Religious Service Template",
    description: "Includes dedicated sections for scripture readings, hymn lyrics, and prayers alongside the standard order of service elements.",
    format: "Bifold",
  },
  {
    name: "Celebration of Life",
    description: "A warmer, less formal template designed for celebrations of life. Includes space for photos and personal stories or memories.",
    format: "Bifold",
  },
  {
    name: "Minimalist Design",
    description: "A clean, understated layout with minimal decoration. Lets the content and photograph be the focus of the program.",
    format: "Bifold",
  },
];

export default function GoogleDocsTemplatesPage() {
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
                  <Link href="/templates/google-docs">Templates</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Google Docs Templates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Free Funeral Program Templates for Google Docs
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Copy a template to your Google Drive. Edit online from any device, share
            with family, and print when ready.
          </p>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="leading-relaxed text-muted-foreground">
          These funeral program templates are designed for Google Docs. Instead of
          downloading a file, you click a button to copy the template directly to your
          Google Drive. From there, you can edit it in Google Docs on any device with
          a web browser. Multiple family members can open the same document at the same
          time, making it easy to collaborate on the content. All templates are free with
          no signup required on our site, and there are no watermarks.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Google Docs templates are a good choice when several people need to contribute
          to the program. One person can work on the obituary while another gathers the
          order of service, and a third person can review and proofread. Changes appear
          in real time for everyone who has the document open. You can also leave
          comments and suggestions without changing the text directly, which is helpful
          when multiple family members are involved in the planning.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          To use a template, click the Copy to Drive button. A Google account is
          required because the template is saved to your Google Drive. Once the copy is
          in your Drive, open it in Google Docs, replace the placeholder text with your
          own content, insert a photo, and adjust any details. When you are ready, go to
          File then Print, or download it as a PDF to print later. If you prefer not to
          use Google Docs, we also offer free{" "}
          <Link
            href="/templates/word"
            className="text-[#3D5A73] underline underline-offset-2 hover:text-[#2F4759]"
          >
            Word templates
          </Link>{" "}
          and a{" "}
          <Link
            href="/funeral-program-maker"
            className="text-[#3D5A73] underline underline-offset-2 hover:text-[#2F4759]"
          >
            free online maker
          </Link>{" "}
          that requires no account at all.
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
                  <ExternalLink className="mr-1.5 size-3.5" />
                  Copy to Google Drive
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
            Want a PDF Without Using Google Docs?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Our online maker creates a print-ready PDF directly in your browser. No
            Google account, no downloads, and no document editor needed.
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
              Do I need a Google account to use these templates?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Yes, because the templates are saved to Google Drive. You need a free
              Google account to copy and edit them. If you do not want to use Google,
              try our online maker or download a Word template instead.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Can multiple people edit the same template?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Yes. Once the template is in your Google Drive, you can share it with
              family members and everyone can edit the same document at the same time.
              Changes appear in real time.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              How do I print the finished program?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              In Google Docs, go to File and then Print. You can print directly if
              you have a printer connected, or choose Save as PDF to download the
              file and print it later at a copy shop.
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
              { "@type": "ListItem", position: 2, name: "Google Docs Templates", item: "https://memorialprintables.com/templates/google-docs" },
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
              { "@type": "Question", name: "Do I need a Google account?", acceptedAnswer: { "@type": "Answer", text: "Yes, because templates are saved to Google Drive. Try the online maker or Word templates if you prefer not to use Google." } },
              { "@type": "Question", name: "Can multiple people edit the same template?", acceptedAnswer: { "@type": "Answer", text: "Yes. Share the document from your Google Drive and everyone can edit in real time." } },
              { "@type": "Question", name: "How do I print the finished program?", acceptedAnswer: { "@type": "Answer", text: "Go to File then Print in Google Docs, or save as PDF to print later." } },
            ],
          }),
        }}
      />
    </>
  );
}
