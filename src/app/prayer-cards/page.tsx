import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Memorial Printables | Free Prayer Card Templates',
  description: 'Create beautiful wallet-sized prayer and memorial cards for free. Upload a photo, add a prayer or verse. No signup, no watermark.',
  alternates: { canonical: 'https://memorialprintables.com/prayer-cards' },
};

export default function PrayerCardsPage() {
  return (
    <div className="site-root">
      <SiteNav />
      <div className="main-content">
        <div className="wrap">
          <div className="site-page-hero">
            <div className="breadcrumb"><Link href="/">Home</Link> › <span>Prayer Cards</span></div>
            <h1>Free Prayer Card Templates</h1>
            <p className="page-sub">Create beautiful wallet-sized memorial prayer cards. Upload a photo, add a favourite prayer or verse, and download a print-ready PDF.</p>
          </div>

          <section className="site-section">
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--accent-soft)', border: '1px solid #d9e7e3', borderRadius: '20px', padding: '8px 20px', fontSize: '14px', fontWeight: 600, color: 'var(--accent)', marginBottom: '24px' }}>
                🚧 Coming Soon
              </div>
              <p style={{ fontSize: '16px', color: 'var(--slate)', maxWidth: '500px', margin: '0 auto 28px' }}>
                We&apos;re building a prayer card maker. In the meantime, try our free funeral program generator.
              </p>
              <Link href="/free-funeral-program-generator" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--accent)', color: '#fff', padding: '14px 28px', borderRadius: '10px', fontSize: '16px', fontWeight: 700 }}>
                Try the Funeral Program Maker
              </Link>
            </div>
          </section>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
