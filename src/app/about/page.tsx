import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Memorial Printables | About Us',
  description:
    'Learn about Memorial Printables, the free memorial printables platform. Our mission is to help families create beautiful funeral programs and keepsakes — privately, quickly, and at no cost.',
  alternates: { canonical: 'https://memorialprintables.com/about' },
};

export default function AboutPage() {
  return (
    <div className="site-root">
      <SiteNav current="about" />

      <div className="main-content">
        <div className="wrap">
          {/* PAGE HERO */}
          <div className="site-page-hero">
            <div className="breadcrumb">
              <Link href="/">Home</Link> › <span>About</span>
            </div>
            <h1>About Memorial Printables</h1>
            <p className="page-sub">
              Free, private memorial tools for families — because planning a service should be one less thing to worry about.
            </p>
          </div>

          {/* MISSION */}
          <section className="site-section">
            <h2>Our Mission</h2>
            <p className="section-sub">
              When a loved one passes, families face dozens of decisions under enormous emotional strain.
              We believe creating a beautiful funeral program shouldn&apos;t be one of the stressful ones.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
              <div>
                <p style={{ fontSize: '15px', color: 'var(--slate)', lineHeight: '1.75', marginBottom: '16px' }}>
                  Memorial Printables provides free, browser-based tools that let anyone create professional-quality
                  funeral programs, prayer cards, and memorial keepsakes — without creating an account,
                  paying a cent, or uploading personal data to any server.
                </p>
                <p style={{ fontSize: '15px', color: 'var(--slate)', lineHeight: '1.75', marginBottom: '16px' }}>
                  Everything is generated locally in your browser. Your loved one&apos;s name, photo,
                  and life story never leave your device. When you download a PDF, it comes from your
                  browser directly to your computer.
                </p>
                <p style={{ fontSize: '15px', color: 'var(--slate)', lineHeight: '1.75' }}>
                  We built Memorial Printables because we saw families spending money on design software they&apos;d only
                  use once, or struggling with complicated templates in Word. There had to be a simpler way.
                </p>
              </div>
              <div>
                <div style={{ background: 'var(--accent-soft)', border: '1px solid #d9e7e3', borderRadius: '16px', padding: '28px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)' }}>
                    ✦ Memorial Printables by the numbers
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8e5', paddingBottom: '12px' }}>
                      <span style={{ fontSize: '14px', color: 'var(--slate)' }}>Templates</span>
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>6 professional designs</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8e5', paddingBottom: '12px' }}>
                      <span style={{ fontSize: '14px', color: 'var(--slate)' }}>Formats</span>
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>Single, Bifold, Trifold</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8e5', paddingBottom: '12px' }}>
                      <span style={{ fontSize: '14px', color: 'var(--slate)' }}>Cost</span>
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>Free forever</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8e5', paddingBottom: '12px' }}>
                      <span style={{ fontSize: '14px', color: 'var(--slate)' }}>Signup required</span>
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>No</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', color: 'var(--slate)' }}>Data uploaded</span>
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>None — browser only</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* VALUES */}
          <section className="site-section" style={{ borderTop: '1px solid var(--line)', paddingTop: '50px' }}>
            <h2>What We Stand For</h2>
            <p className="section-sub">
              Three principles guide every decision we make.
            </p>
            <div className="card-grid">
              <div className="value-card">
                <div className="vc-icon">🔒</div>
                <h4>Privacy First</h4>
                <p>Your data never leaves your browser. No accounts, no tracking, no servers. We don&apos;t even have a database of user information.</p>
              </div>
              <div className="value-card">
                <div className="vc-icon">✦</div>
                <h4>Always Free</h4>
                <p>No premium tiers, no trial periods, no paywalls. Every feature is available to everyone, at no cost, forever.</p>
              </div>
              <div className="value-card">
                <div className="vc-icon">💛</div>
                <h4>Simple &amp; Dignified</h4>
                <p>We design tools that are intuitive and respectful. No flashy ads, no dark patterns — just clean, helpful software when you need it most.</p>
              </div>
            </div>
          </section>

          {/* WHAT WE OFFER */}
          <section className="site-section" style={{ borderTop: '1px solid var(--line)', paddingTop: '50px' }}>
            <h2>What We Offer</h2>
            <p className="section-sub">
              Professional memorial documents you can create in minutes.
            </p>
            <div className="card-grid">
              <div className="value-card">
                <div className="vc-icon">📄</div>
                <h4>Funeral Programs</h4>
                <p>Single-page, bifold, and trifold programs in 6 professionally designed templates. Upload a photo, add the order of service, and download a print-ready PDF.</p>
              </div>
              <div className="value-card">
                <div className="vc-icon">🔮</div>
                <h4>Prayer Cards</h4>
                <p>Beautiful wallet-sized prayer and memorial cards. Add a photo, a prayer, and the person&apos;s details. Coming soon.</p>
              </div>
              <div className="value-card">
                <div className="vc-icon">🔖</div>
                <h4>Memorial Bookmarks</h4>
                <p>Keepsake bookmarks that guests can take home. Personalised with photos, dates, and a favourite quote or verse. Coming soon.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '60px 0', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Ready to get started?</h2>
            <p style={{ fontSize: '16px', color: 'var(--slate)', marginBottom: '24px' }}>
              Create a beautiful funeral program in under a minute.
            </p>
              <Link href="/free/funeral/program/generator" className="btn-primary" style={{ background: 'var(--accent)', color: '#fff', padding: '14px 28px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Make a Funeral Program
              </Link>
          </section>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
