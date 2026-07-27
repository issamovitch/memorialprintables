import Link from 'next/link';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

export default function NotFound() {
  return (
    <div className="site-root">
      <SiteNav />

      <div className="main-content">
        <div className="wrap">
          <div className="site-page-hero">
            <h1>Page Not Found</h1>
            <p className="page-sub">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          <div style={{ textAlign: 'center', padding: '40px 0 80px' }}>
            <div style={{ fontSize: '80px', fontWeight: 800, color: 'var(--accent-soft)', lineHeight: 1, marginBottom: '20px' }}>
              404
            </div>
            <p style={{ fontSize: '16px', color: 'var(--slate)', marginBottom: '28px' }}>
              We couldn&apos;t find the page at this address. Let&apos;s get you back on track.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                href="/"
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: '0.15s',
                }}
              >
                ✦ Go to Home
              </Link>
              <Link
                href="/contact"
                style={{
                  background: '#fff',
                  color: 'var(--ink)',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 600,
                  border: '1px solid var(--line)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: '0.15s',
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
