import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Memorial Printables | Free Memorial Card Templates',
  description: 'Create beautiful memorial cards for free. Personalise with a photo, message, or verse. Perfect for sharing at a funeral or memorial service. No signup, no watermark.',
  alternates: { canonical: 'https://memorialprintables.com/memorial-cards' },
};

export default function MemorialCardsPage() {
  return (
    <div className="site-root">
      <SiteNav />
      <div className="main-content">
        <div className="wrap">
          <div className="site-page-hero">
            <div className="breadcrumb"><Link href="/">Home</Link> › <span>Memorial Cards</span></div>
            <h1>Free Memorial Card Templates</h1>
            <p className="page-sub">Create beautiful memorial cards to share at a funeral or keep as a personal tribute. Add a photo and message, then download a print-ready PDF.</p>
          </div>

          <section className="site-section">
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--accent-soft)', border: '1px solid #d9e7e3', borderRadius: '20px', padding: '8px 20px', fontSize: '14px', fontWeight: 600, color: 'var(--accent)', marginBottom: '24px' }}>
                🚧 Coming Soon
              </div>
              <p style={{ fontSize: '16px', color: 'var(--slate)', maxWidth: '500px', margin: '0 auto 28px' }}>
                We&apos;re building a memorial card maker. In the meantime, try our free funeral program generator.
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
