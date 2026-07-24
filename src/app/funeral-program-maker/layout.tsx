import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Funeral Program Maker - No Signup | MemorialPrintables",
  description:
    "Create a beautiful funeral program for free. No signup, no watermarks. Download a print-ready PDF instantly in your browser with complete privacy.",
  alternates: {
    canonical: "https://memorialprintables.com/funeral-program-maker",
  },
};

export default function FuneralProgramMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
