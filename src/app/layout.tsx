import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const heading = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://memorialprintables.com"),
  title: {
    default: "Free Funeral Program Templates | MemorialPrintables",
    template: "%s | MemorialPrintables",
  },
  description:
    "Create beautiful, free funeral programs online. No signup required. Instant print-ready PDF download with our easy funeral program maker.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    siteName: "MemorialPrintables",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MemorialPrintables - Free Funeral Program Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${heading.variable} ${body.variable} antialiased bg-background text-foreground`}
      >
        <SiteHeader />
        <main className="min-h-[calc(100vh-8rem)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
