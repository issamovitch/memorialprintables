"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LayoutType = "bifold" | "trifold" | "single" | "booklet";
export type PaperSize = "letter" | "a4";

export interface ServiceItem {
  id: string;
  title: string;
  description?: string;
}

export interface FuneralProgramState {
  layout: LayoutType;
  paperSize: PaperSize;
  name: string;
  birthDate: string;
  deathDate: string;
  photo: string;
  serviceItems: ServiceItem[];
  obituary: string;
  pallbearers: string;
  acknowledgements: string;
  poemOrScripture: string;
  setLayout: (layout: LayoutType) => void;
  setPaperSize: (size: PaperSize) => void;
  setField: (field: string, value: string) => void;
  setPhoto: (base64: string) => void;
  addServiceItem: (item: ServiceItem) => void;
  removeServiceItem: (id: string) => void;
  updateServiceItem: (id: string, data: Partial<ServiceItem>) => void;
  reorderServiceItems: (items: ServiceItem[]) => void;
}

let counter = 0;
function nextId() {
  counter += 1;
  return `item-${Date.now()}-${counter}`;
}

const defaultServiceItems: ServiceItem[] = [
  { id: nextId(), title: "Prelude", description: "" },
  { id: nextId(), title: "Opening Prayer", description: "" },
  { id: nextId(), title: "Scripture Reading", description: "" },
  { id: nextId(), title: "Eulogy", description: "" },
  { id: nextId(), title: "Closing Remarks", description: "" },
  { id: nextId(), title: "Committal", description: "" },
  { id: nextId(), title: "Recessional", description: "" },
];

export const useFuneralProgramStore = create<FuneralProgramState>()(
  persist(
    (set) => ({
      layout: "bifold",
      paperSize: "letter",
      name: "",
      birthDate: "",
      deathDate: "",
      photo: "",
      serviceItems: defaultServiceItems,
      obituary: "",
      pallbearers: "",
      acknowledgements: "",
      poemOrScripture: "",
      setLayout: (layout) => set({ layout }),
      setPaperSize: (paperSize) => set({ paperSize }),
      setField: (field, value) => set({ [field]: value }),
      setPhoto: (photo) => set({ photo }),
      addServiceItem: (item) =>
        set((state) => ({
          serviceItems: [...state.serviceItems, item],
        })),
      removeServiceItem: (id) =>
        set((state) => ({
          serviceItems: state.serviceItems.filter((i) => i.id !== id),
        })),
      updateServiceItem: (id, data) =>
        set((state) => ({
          serviceItems: state.serviceItems.map((i) =>
            i.id === id ? { ...i, ...data } : i
          ),
        })),
      reorderServiceItems: (items) => set({ serviceItems: items }),
    }),
    {
      name: "memorial-printables-program",
    }
  )
);
