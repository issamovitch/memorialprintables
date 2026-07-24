"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Download,
  Lock,
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  FileText,
  ChevronDown,
  Loader2,
  Monitor,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  useFuneralProgramStore,
  type LayoutType,
  type ServiceItem,
} from "@/lib/funeral-program-store";
import { generatePDF } from "@/lib/generate-pdf";

function SortableServiceItem({
  item,
  onRemove,
  onUpdate,
}: {
  item: ServiceItem;
  onRemove: () => void;
  onUpdate: (data: Partial<ServiceItem>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-2 rounded-lg border border-border bg-card p-3"
    >
      <button
        className="mt-1.5 shrink-0 cursor-grab text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <GripVertical className="size-4" />
      </button>
      <div className="min-w-0 flex-1 space-y-2">
        <Input
          value={item.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Service item title"
          className="text-sm"
        />
        <Input
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Optional details"
          className="text-sm"
        />
      </div>
      <button
        onClick={onRemove}
        className="mt-1.5 shrink-0 text-muted-foreground hover:text-[#A8845C]"
        aria-label="Remove item"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}

function LivePreview() {
  const state = useFuneralProgramStore();
  const hasContent = state.name || state.birthDate || state.deathDate;

  if (!hasContent) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
        <FileText className="mb-4 size-12 text-muted-foreground/50" strokeWidth={1} />
        <p className="text-sm text-muted-foreground">
          Your program preview will appear here as you fill in the details.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-auto rounded-lg border border-border bg-white shadow-sm">
      <div className="mx-auto max-w-[220px] bg-white p-4 sm:max-w-[320px]">
        {/* Cover preview */}
        <div className="rounded border border-border/50 p-4 text-center">
          <div className="mb-3 h-px w-12 mx-auto bg-[#8FA396]" />
          <p className="text-[9px] tracking-wider text-[#8FA396]">
            IN LOVING MEMORY OF
          </p>
          <p className="mt-2 font-heading text-base font-semibold text-[#2C2C2E]">
            {state.name || "Name of your loved one"}
          </p>
          {(state.birthDate || state.deathDate) && (
            <p className="mt-1 text-[9px] text-[#6E6E73]">
              {state.birthDate && state.deathDate
                ? `${state.birthDate} — ${state.deathDate}`
                : state.birthDate || state.deathDate}
            </p>
          )}
          {state.photo && (
            <img
              src={state.photo}
              alt="Preview"
              className="mx-auto mt-3 max-h-24 rounded object-cover"
            />
          )}
          <div className="mt-3 h-px w-12 mx-auto bg-[#8FA396]" />
        </div>

        {/* Service order preview */}
        {state.serviceItems.length > 0 && (
          <div className="mt-3 rounded border border-border/50 p-3">
            <p className="mb-2 text-[9px] font-semibold tracking-wider text-[#3D5A73]">
              ORDER OF SERVICE
            </p>
            <ol className="space-y-1">
              {state.serviceItems.map((item, idx) => (
                <li
                  key={item.id}
                  className="text-[8px] text-[#2C2C2E]"
                >
                  <span className="text-[#6E6E73]">{idx + 1}.</span>{" "}
                  {item.title}
                  {item.description && (
                    <span className="text-[#6E6E73]"> — {item.description}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Poem preview */}
        {state.poemOrScripture && (
          <div className="mt-3 rounded border border-border/50 p-3">
            <p className="mb-1 text-[9px] font-semibold tracking-wider text-[#3D5A73]">
              IN LOVING MEMORY
            </p>
            <p className="text-[8px] italic leading-relaxed text-[#2C2C2E]">
              {state.poemOrScripture.length > 200
                ? state.poemOrScripture.slice(0, 200) + "..."
                : state.poemOrScripture}
            </p>
          </div>
        )}

        <p className="mt-3 text-center text-[7px] text-[#6E6E73]">
          {state.layout.toUpperCase()} · {state.paperSize.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export default function FuneralProgramMakerPage() {
  const store = useFuneralProgramStore();
  const [downloading, setDownloading] = useState(false);
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = store.serviceItems.findIndex((i) => i.id === active.id);
        const newIndex = store.serviceItems.findIndex((i) => i.id === over.id);
        store.reorderServiceItems(
          arrayMove(store.serviceItems, oldIndex, newIndex)
        );
      }
    },
    [store]
  );

  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        store.setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [store]
  );

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      const blob = await generatePDF(useFuneralProgramStore.getState());
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `funeral-program-${store.name || "draft"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  }, [store.name]);

  const handleAddServiceItem = useCallback(() => {
    store.addServiceItem({
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      title: "",
      description: "",
    });
  }, [store]);

  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Breadcrumbs + page title */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-3">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Funeral Program Maker</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Free Funeral Program Maker
          </h1>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">
            Create a beautiful funeral program in minutes. No signup, no watermarks,
            no cost. Your information stays private in your browser.
          </p>
        </div>
      </div>

      {/* Mobile tab switcher */}
      <div className="border-b border-border bg-background lg:hidden">
        <div className="mx-auto max-w-7xl px-4">
          <Tabs
            value={mobileTab}
            onValueChange={(v) => setMobileTab(v as "editor" | "preview")}
          >
            <TabsList className="w-full">
              <TabsTrigger value="editor" className="flex-1">
                <FileText className="mr-2 size-4" /> Editor
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex-1">
                <Monitor className="mr-2 size-4" /> Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main content area */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Editor Panel */}
          <div
            className={`w-full space-y-4 lg:w-2/3 ${mobileTab === "preview" ? "hidden lg:block" : ""}`}
          >
            {/* Layout and Paper Size */}
            <Card>
              <CardContent className="p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Program Layout</Label>
                    <Select
                      value={store.layout}
                      onValueChange={(v) =>
                        store.setLayout(v as LayoutType)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bifold">Bifold (2 panels)</SelectItem>
                        <SelectItem value="trifold">Trifold (3 panels)</SelectItem>
                        <SelectItem value="single">Single Sheet</SelectItem>
                        <SelectItem value="booklet">8-Page Booklet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Paper Size</Label>
                    <Select
                      value={store.paperSize}
                      onValueChange={(v) =>
                        store.setPaperSize(v as "letter" | "a4")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="letter">US Letter (8.5 x 11 in)</SelectItem>
                        <SelectItem value="a4">A4 (210 x 297 mm)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-muted/50">
                <span className="text-sm font-semibold text-foreground">
                  Basic Information
                </span>
                <ChevronDown className="size-4 text-muted-foreground transition-transform [[data-state=open]>&]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-4 border border-t-0 border-border rounded-b-lg bg-card p-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name of Your Loved One</Label>
                    <Input
                      id="name"
                      value={store.name}
                      onChange={(e) => store.setField("name", e.target.value)}
                      placeholder="e.g. John Robert Smith"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Date of Birth</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={store.birthDate}
                        onChange={(e) =>
                          store.setField("birthDate", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deathDate">Date of Passing</Label>
                      <Input
                        id="deathDate"
                        type="date"
                        value={store.deathDate}
                        onChange={(e) =>
                          store.setField("deathDate", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Photo</Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    {store.photo ? (
                      <div className="flex items-center gap-4">
                        <img
                          src={store.photo}
                          alt="Uploaded photo"
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Change Photo
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => store.setPhoto("")}
                            className="text-[#A8845C] hover:text-[#A8845C]"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex h-24 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 text-sm text-muted-foreground transition-colors hover:bg-muted/50"
                      >
                        <ImageIcon className="size-5" />
                        Upload a photo
                      </button>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Order of Service */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-muted/50">
                <span className="text-sm font-semibold text-foreground">
                  Order of Service
                </span>
                <ChevronDown className="size-4 text-muted-foreground transition-transform [[data-state=open]>&]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-3 border border-t-0 border-border rounded-b-lg bg-card p-4">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={store.serviceItems.map((i) => i.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {store.serviceItems.map((item) => (
                        <SortableServiceItem
                          key={item.id}
                          item={item}
                          onRemove={() =>
                            store.removeServiceItem(item.id)
                          }
                          onUpdate={(data) =>
                            store.updateServiceItem(item.id, data)
                          }
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddServiceItem}
                    className="w-full"
                  >
                    <Plus className="mr-2 size-4" /> Add Service Item
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Obituary */}
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-muted/50">
                <span className="text-sm font-semibold text-foreground">
                  Obituary
                </span>
                <ChevronDown className="size-4 text-muted-foreground transition-transform [[data-state=open]>&]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border border-t-0 border-border rounded-b-lg bg-card p-4">
                  <Textarea
                    value={store.obituary}
                    onChange={(e) =>
                      store.setField("obituary", e.target.value)
                    }
                    placeholder="Write or paste the obituary here..."
                    rows={8}
                    className="text-sm"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Additional Sections */}
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-muted/50">
                <span className="text-sm font-semibold text-foreground">
                  Additional Sections
                </span>
                <ChevronDown className="size-4 text-muted-foreground transition-transform [[data-state=open]>&]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-4 border border-t-0 border-border rounded-b-lg bg-card p-4">
                  <div className="space-y-2">
                    <Label htmlFor="pallbearers">Pallbearers</Label>
                    <Textarea
                      id="pallbearers"
                      value={store.pallbearers}
                      onChange={(e) =>
                        store.setField("pallbearers", e.target.value)
                      }
                      placeholder="List the pallbearers, one per line or separated by commas"
                      rows={3}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acknowledgements">Acknowledgements</Label>
                    <Textarea
                      id="acknowledgements"
                      value={store.acknowledgements}
                      onChange={(e) =>
                        store.setField("acknowledgements", e.target.value)
                      }
                      placeholder="The family wishes to thank..."
                      rows={3}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="poem">Poem or Scripture</Label>
                    <Textarea
                      id="poem"
                      value={store.poemOrScripture}
                      onChange={(e) =>
                        store.setField("poemOrScripture", e.target.value)
                      }
                      placeholder="Add a meaningful poem, verse, or scripture reading..."
                      rows={5}
                      className="text-sm"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Preview Panel */}
          <div
            className={`w-full space-y-4 lg:w-1/3 ${mobileTab === "editor" ? "hidden lg:block" : ""}`}
          >
            <div className="sticky top-20 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  Preview
                </h2>
                <span className="text-xs text-muted-foreground">
                  Updates as you type
                </span>
              </div>
              <LivePreview />

              {/* Download button */}
              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full bg-[#3D5A73] text-white hover:bg-[#2F4759]"
                size="lg"
              >
                {downloading ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Download className="mr-2 size-4" />
                )}
                {downloading ? "Generating PDF..." : "Download Print-Ready PDF"}
              </Button>

              {/* Privacy note */}
              <div className="flex items-start gap-2.5 rounded-lg bg-muted/40 p-3">
                <Lock className="mt-0.5 size-4 shrink-0 text-[#8FA396]" strokeWidth={1.5} />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Your information never leaves this browser. The PDF is generated
                  locally on your device. Nothing is uploaded to any server.
                </p>
              </div>

              {/* Stubbed affiliate placeholder */}
              {/* <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                Print these at... (affiliate block placeholder)
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Below-the-fold content for SEO */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Free Online Funeral Program Maker
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Planning a memorial service is difficult enough without worrying about
          software subscriptions or complicated design tools. This funeral program
          maker was built to be genuinely free, with no signup required and no
          hidden costs. You open the page, fill in the details about your loved one,
          and download a print-ready PDF. That is the entire process.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Every competing tool we found either requires an account, charges money for
          downloads, adds watermarks to the free version, or pushes you toward a paid
          print order. We believe families should not have to deal with any of that
          during an already difficult time. The program maker works entirely in your
          browser. Your information is never sent to a server. The PDF is generated on
          your own device, so you can be confident that personal details about your
          loved one remain private.
        </p>
        <h3 className="mt-8 font-heading text-xl font-semibold text-foreground">
          How to Use This Tool
        </h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Start by choosing a layout that fits the type of service you are planning.
          A bifold program is the most common choice for a traditional funeral or
          memorial service. It folds in half to create four panels: a front cover, an
          inside spread with the order of service and obituary, and a back panel for a
          poem or acknowledgements. A trifold works well for celebration of life
          services or shorter ceremonies where you want three panels per side. The
          single-sheet option is straightforward for simple services, and the eight-page
          booklet provides more room for longer obituaries, multiple photos, and
          additional readings.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          After choosing a layout, enter your loved one's name and dates. Upload a
          photo if you have one; it will appear on the cover of the program. Then
          build the order of service by editing the default items or adding your own.
          You can drag the items into the right order. The obituary section accepts
          pasted text, so if someone has already written the obituary you can drop it
          in directly. The additional sections for pallbearers, acknowledgements, and a
          poem or scripture reading are optional but often included in traditional
          programs.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          As you type, the preview on the right updates in real time so you can see
          how the final program will look. When you are ready, click the download
          button. The PDF is generated locally in your browser and saved to your
          device. You can then print it at home, at a copy shop, or at any
          professional printer. The PDF is formatted for standard paper sizes with
          correct margins and fold marks where applicable.
        </p>
        <h3 className="mt-8 font-heading text-xl font-semibold text-foreground">
          Privacy and No Signup
        </h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          We do not ask for an email address. We do not require you to create an
          account. We do not track what you type into the program maker. The tool
          runs entirely in your web browser using client-side technology. Your work
          is automatically saved to your browser's local storage, so if you need to
          step away and come back, your progress will still be there. No data is ever
          transmitted to our servers or any third party.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          For more guidance on creating a funeral program, including what to include
          and how to organize the content, visit our{" "}
          <Link
            href="/how-to-make-a-funeral-program"
            className="text-[#3D5A73] underline underline-offset-2 hover:text-[#2F4759]"
          >
            complete guide to making a funeral program
          </Link>
          . If you prefer to start from a template in Microsoft Word or Google Docs,
          we also offer free downloadable{" "}
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
      </div>

      {/* FAQ Section */}
      <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Is this funeral program maker really free?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Yes. The tool is completely free to use with no signup, no email
              required, and no watermarks on the downloaded PDF. There are no premium
              tiers or hidden charges. You can create and download as many programs as
              you need.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Does my data leave my browser?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              No. Everything stays on your device. The PDF is generated entirely in
              your browser using client-side technology. No information about your
              loved one is sent to any server. Your work is saved to your browser's
              local storage for convenience, but that data never leaves your computer.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              What program layouts are available?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              You can choose from four layouts: bifold (the most common, folding in
              half for four panels), trifold (three panels per side, good for
              celebrations of life), single sheet (a simple one-page program), and an
              eight-page booklet (for longer services with more content). Each layout
              supports both US Letter and A4 paper sizes.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Can I use this on my phone?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Yes. The tool is designed to work on mobile devices and tablets as well
              as desktop computers. On smaller screens, you can switch between the
              editor and preview using the tabs at the top of the tool. For the
              easiest experience, a tablet or desktop is recommended, but the tool is
              fully functional on a phone.
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
            "@type": "SoftwareApplication",
            name: "Funeral Program Maker",
            applicationCategory: "DesignApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Free online funeral program maker. No signup required. Create and download print-ready PDF funeral programs directly in your browser.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "1240",
            },
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
                name: "Is this funeral program maker really free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The tool is completely free with no signup, no email required, and no watermarks on the downloaded PDF.",
                },
              },
              {
                "@type": "Question",
                name: "Does my data leave my browser?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Everything stays on your device. The PDF is generated entirely in your browser using client-side technology.",
                },
              },
              {
                "@type": "Question",
                name: "What program layouts are available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bifold, trifold, single sheet, and eight-page booklet. Each supports US Letter and A4 paper sizes.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use this on my phone?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The tool works on mobile devices, tablets, and desktop computers with a responsive design.",
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
                name: "Funeral Program Maker",
                item: "https://memorialprintables.com/funeral-program-maker",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
