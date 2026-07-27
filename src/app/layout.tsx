import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL('https://memorialprintables.com'),
  title: 'Memorial Printables | Free Funeral Program Maker & Memorial Templates',
  description:
    'Create beautiful, print-ready funeral programs and memorial keepsakes. 100% free, no signup, no watermark. Everything stays private in your browser.',
  keywords: [
    'funeral program maker',
    'free funeral program template',
    'memorial printables',
    'funeral program generator',
    'printable funeral program',
  ],
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'Free Funeral Program Maker & Memorial Templates',
    description: 'Create beautiful, print-ready funeral programs. Free, no signup.',
    url: 'https://memorialprintables.com',
    siteName: 'Memorial Printables',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Memorial Printables — Free Funeral Program Maker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memorial Printables | Free Funeral Program Maker',
    description: 'Create beautiful, print-ready funeral programs. Free, no signup.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <NextTopLoader
          color="#3f7d74"
          height={3}
          showSpinner={false}
          shadow="0 0 10px rgba(63,125,116,0.3)"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Memorial Printables',
              url: 'https://memorialprintables.com',
              description: 'Free memorial printables and funeral program maker.',
            }),
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
