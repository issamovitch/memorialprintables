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

export const metadata = {
  title: "How to Make a Funeral Program - Step by Step | MemorialPrintables",
  description:
    "Learn how to make a funeral program from scratch. Step-by-step guide covering layout, content, printing, and folding. Free templates included.",
  alternates: {
    canonical: "https://memorialprintables.com/how-to-make-a-funeral-program",
  },
};

export default function HowToMakeAFuneralProgramPage() {
  return (
    <>
      {/* Breadcrumbs */}
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
                <BreadcrumbPage>How to Make a Funeral Program</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            How to Make a Funeral Program
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            A step-by-step guide for creating a funeral or memorial service program.
            No design experience needed.
          </p>
        </div>
      </div>

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="leading-relaxed text-muted-foreground">
          A funeral program is a printed document handed to guests at a memorial
          service. It typically includes the name and dates of the person who has
          passed, the order of events for the service, an obituary or life summary,
          and sometimes a photo, poems, or acknowledgements from the family. Creating
          one does not require professional design skills. This guide walks you
          through the entire process, from deciding what to include to printing and
          folding the finished program.
        </p>

        {/* Step 1 */}
        <h2 className="mt-10 font-heading text-xl font-semibold text-foreground">
          Step 1: Choose a Layout
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          The layout determines how the program folds and how many panels you have to
          work with. The four most common options are bifold, trifold, single sheet,
          and booklet. A bifold program is printed on a single sheet of paper and
          folded in half once, giving you four panels: a front cover, two inside
          pages, and a back cover. This is the most traditional format and works well
          for most funeral and memorial services. It fits neatly in a hand or a small
          program holder at the service.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          A trifold program is folded twice, creating three panels per side for a total
          of six. This gives you more space and works well for services with a longer
          order of events or when you want to include additional content like multiple
          readings or a longer obituary. Trifold programs are common at celebrations of
          life and less formal services. A single-sheet program is just that: one
          unfolded page, often printed on both sides. It is the simplest option and
          works for short services where a brief schedule and a few words of
          remembrance are sufficient.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          A booklet format uses multiple sheets folded and stapled in the center to
          create an eight-page program. This option gives you the most room and is
          appropriate for large services, long obituaries, or when the family wants to
          include multiple photos, extended acknowledgements, or several poems and
          readings. The choice of layout depends on how much content you have and the
          formality of the service. If you are unsure, a bifold is a safe and
          traditional choice.
        </p>

        {/* Step 2 */}
        <h2 className="mt-10 font-heading text-xl font-semibold text-foreground">
          Step 2: Gather the Content
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Before you sit down to design the program, collect everything you want to
          include. Having the content ready makes the design process much faster. You
          will need the full name of the person who has passed away, their date of
          birth and date of death, and a photograph. The photo should be a clear, recent
          image that the family approves of. If a recent photo is not available, an
          older photograph that represents the person well is perfectly acceptable. You
          will also need the order of service, which is the schedule of events during
          the ceremony. This typically includes musical selections, prayers, scripture
          readings, the eulogy, and any other planned elements.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          The obituary or a brief life summary is usually included on one of the inside
          panels. If an obituary has already been written for a newspaper or online
          memorial, you can use that text. Otherwise, a short paragraph covering the
          person's early life, career, family, and interests is sufficient. You may
          also want to include the names of pallbearers, a list of surviving family
          members, acknowledgements thanking people who helped during the illness or
          after the passing, and a poem, scripture verse, or quote that was meaningful
          to the person or the family.
        </p>

        {/* Step 3 */}
        <h2 className="mt-10 font-heading text-xl font-semibold text-foreground">
          Step 3: Create the Program
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          You have three ways to create your program on this site. The fastest option
          is the{" "}
          <Link
            href="/funeral-program-maker"
            className="text-[#3D5A73] underline underline-offset-2 hover:text-[#2F4759]"
          >
            free online funeral program maker
          </Link>
          . It runs entirely in your browser. You choose a layout, type in the details,
          upload a photo, arrange the order of service, and download a print-ready PDF.
          There is no signup, no watermark, and no cost. The maker automatically saves
          your work as you go, so if you need to take a break, your progress will still
          be there when you return.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          If you prefer to work in a familiar document editor, you can download a free{" "}
          <Link
            href="/templates/word"
            className="text-[#3D5A73] underline underline-offset-2 hover:text-[#2F4759]"
          >
            funeral program template for Microsoft Word
          </Link>{" "}
          or a{" "}
          <Link
            href="/templates/google-docs"
            className="text-[#3D5A73] underline underline-offset-2 hover:text-[#2F4759]"
          >
            template for Google Docs
          </Link>
          . These are pre-formatted files with placeholder text that you replace with
          your own content. Word templates are ideal if you want to work offline or
          need precise typographic control. Google Docs templates are convenient if
          multiple family members need to collaborate on the content, since you can
          share the document and edit it together in real time.
        </p>

        {/* Step 4 */}
        <h2 className="mt-10 font-heading text-xl font-semibold text-foreground">
          Step 4: Review and Proofread
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Before printing, review every part of the program carefully. Check the
          spelling of names, especially the name of the person who has passed and the
          names of family members. Verify the dates of birth and death. Read the
          order of service from top to bottom to make sure the sequence of events is
          correct and nothing has been left out or duplicated. If the obituary
          includes specific details like workplace names, school names, or dates of
          milestones, confirm those are accurate as well.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          It helps to have someone who was not involved in writing the content review
          the program. A fresh pair of eyes will catch errors that you might overlook
          because you have been reading the same text repeatedly. Pay attention to
          formatting too. Make sure the text fits within the margins, the photo is
          not stretched or cropped awkwardly, and the font sizes are consistent. If
          you are using the online maker, the live preview shows you approximately how
          the printed program will look, but it is still worth reading through the
          content one more time.
        </p>

        {/* Step 5 */}
        <h2 className="mt-10 font-heading text-xl font-semibold text-foreground">
          Step 5: Print and Assemble
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          For the best results, use standard letter-size or A4 paper depending on
          your region. Standard copy paper works fine, but slightly heavier paper in
          the 24 to 32 pound range will feel more substantial and hold up better to
          handling at the service. If you are printing at home, set your printer to
          the highest quality setting. If you are using a copy shop or professional
          printer, they can usually produce better results on heavier or textured
          paper.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          For a bifold program, fold the printed sheet in half along the long edge so
          the cover is on the front. Use a bone folder or the edge of a ruler to
          make a crisp fold. For a trifold, fold one side in first, then fold the
          other side over it. The panels should nest inside each other. For a booklet,
          stack the printed pages in the correct order, fold the entire stack in half,
          and staple along the center crease. If you do not have a long-reach stapler,
          a copy shop can staple booklets for you.
        </p>

        {/* CTA Card */}
        <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Ready to Get Started?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Open our free funeral program maker and create a print-ready PDF in
            minutes. No signup, no watermarks, no cost.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button
              className="bg-[#3D5A73] text-white hover:bg-[#2F4759]"
              asChild
            >
              <Link href="/funeral-program-maker">
                Open the Free Maker
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/templates/word">Browse Word Templates</Link>
            </Button>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                What should be included in a funeral program?
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Most programs include the full name of the deceased, birth and death
                dates, a photo, the order of service, an obituary or life summary,
                and optionally pallbearers, acknowledgements, and a poem or scripture
                reading. The exact contents vary based on the family's preferences and
                the type of service.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                How many copies should I print?
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Print one copy per expected attendee, plus ten to fifteen extra. It
                is better to have a few too many than to run short. If you are
                unsure of the attendance, ask the funeral home or the person
                coordinating the service for an estimate.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Can I make a funeral program on my phone?
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Yes. Our online maker works on mobile browsers, though a tablet or
                desktop computer is easier for editing. For Word and Google Docs
                templates, a desktop or laptop is recommended since those editors are
                not fully featured on mobile devices.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                What paper is best for funeral programs?
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Standard 24 to 32 pound paper works well. Heavier paper feels more
                substantial and holds up to handling. Textured or linen-finish paper
                adds a refined touch. Matte paper is generally preferred over glossy
                for funeral programs because it looks more understated and is easier
                to read under lighting at a service.
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Structured Data: HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Make a Funeral Program",
            description:
              "A complete step-by-step guide for creating a funeral program, from choosing a layout to printing and folding.",
            step: [
              {
                "@type": "HowToStep",
                name: "Choose a Layout",
                text: "Select bifold, trifold, single sheet, or booklet format based on the amount of content and formality of the service.",
              },
              {
                "@type": "HowToStep",
                name: "Gather the Content",
                text: "Collect the name, dates, photo, order of service, obituary, and any additional readings or acknowledgements.",
              },
              {
                "@type": "HowToStep",
                name: "Create the Program",
                text: "Use the online maker, a Word template, or a Google Docs template to design and fill in the program.",
              },
              {
                "@type": "HowToStep",
                name: "Review and Proofread",
                text: "Check all names, dates, and the order of service. Have someone else review the program for errors.",
              },
              {
                "@type": "HowToStep",
                name: "Print and Assemble",
                text: "Print on standard or slightly heavier paper. Fold bifold in half, trifold in thirds, or staple booklets along the center.",
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
                name: "What should be included in a funeral program?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most programs include the name, dates, photo, order of service, obituary, and optionally pallbearers, acknowledgements, and a poem.",
                },
              },
              {
                "@type": "Question",
                name: "How many copies should I print?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Print one per expected attendee plus ten to fifteen extra. Ask the funeral home for an attendance estimate if unsure.",
                },
              },
              {
                "@type": "Question",
                name: "Can I make a funeral program on my phone?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the online maker works on mobile. A tablet or desktop is easier for editing. Word and Google Docs templates work best on desktop.",
                },
              },
              {
                "@type": "Question",
                name: "What paper is best for funeral programs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "24 to 32 pound paper works well. Matte finish is preferred over glossy. Textured or linen-finish paper adds a refined touch.",
                },
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
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://memorialprintables.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "How to Make a Funeral Program",
                item: "https://memorialprintables.com/how-to-make-a-funeral-program",
              },
            ],
          }),
        }}
      />
    </>
  );
}
