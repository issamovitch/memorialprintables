import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Free Funeral Programs & Memorial Printables | No Signup',
  description:
    'Create free funeral programs, prayer cards, and memorial keepsakes. Download print-ready PDFs in minutes. No signup, no watermark.',
  keywords: [
    'free funeral programs',
    'free printable funeral programs',
    'memorial printables',
    'funeral program templates free',
  ],
  alternates: { canonical: 'https://memorialprintables.com/' },
  openGraph: {
    title: 'Free Funeral Programs & Memorial Printables | No Signup',
    description:
      'Create free funeral programs, prayer cards, and memorial keepsakes. Download print-ready PDFs in minutes. No signup, no watermark.',
    url: 'https://memorialprintables.com',
    siteName: 'Memorial Printables',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Memorial Printables',
  url: 'https://memorialprintables.com',
  description: 'Free funeral programs and memorial printables.',
  potentialAction: {
    '@type': 'SearchAction',
    target:
      'https://memorialprintables.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <div className="site-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteNav current="home" />

      <div className="main-content">
        {/* ── HERO ── */}
        <section className="site-hero">
          <div className="wrap">
            <div className="hero-badge">Free · No Signup</div>
            <h1>Free Funeral Programs and Memorial Printables</h1>
            <p className="hero-sub">
              Create beautiful, print-ready funeral programs, prayer cards, and
              memorial keepsakes — right in your browser. No account needed, no
              watermark, no cost.
            </p>
            <div className="hero-actions">
              <Link
                href="/free-funeral-program-generator"
                className="btn-primary"
              >
                Make a Funeral Program
              </Link>
              <Link href="#programs" className="btn-secondary">
                Browse Templates
              </Link>
            </div>
            <div className="trust-row">
              <div className="trust-item">🔒 Private — nothing uploaded</div>
              <div className="trust-item">📄 Print-ready PDF</div>
              <div className="trust-item">⚡ Ready in under a minute</div>
              <div className="trust-item">🎨 6 professional templates</div>
            </div>
          </div>
        </section>

      </div>

      <SiteFooter />

    </div>
  );
}
