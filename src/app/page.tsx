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

        {/* ── PROGRAMS SECTION ── */}
        <section className="site-section" id="programs">
          <div className="wrap">
            <h2>Our Free Funeral Program Maker</h2>
            <p className="section-sub">
              Build a custom memorial program in your browser — add a photo,
              personal details, and the order of service. Our free funeral
              program generator produces a print-ready PDF in seconds.
            </p>
            <div className="hub-highlight">
              <div className="hub-highlight-text">
                <h3>Everything you need, nothing you don&apos;t</h3>
                <ul>
                  <li>
                    <strong>Completely free</strong> — no hidden fees, no premium
                    tiers
                  </li>
                  <li>
                    <strong>Private by design</strong> — everything stays in your
                    browser
                  </li>
                  <li>
                    <strong>Fast</strong> — pick a template, fill in the details,
                    download your PDF
                  </li>
                  <li>
                    <strong>Print-ready</strong> — standard paper sizes, works at
                    home or any copy shop
                  </li>
                </ul>
                <Link
                  href="/free-funeral-program-generator"
                  className="btn-primary"
                >
                  Open the Free Funeral Program Generator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRESET PROGRAM PAGES ── */}
        <section className="site-section" style={{ background: '#fff', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div className="wrap">
            <h2>Program Templates for Every Service</h2>
            <p className="section-sub">
              Start with a pre-filled template tailored to the type of service
              you&apos;re planning. Each one is ready to customise and download.
            </p>
            <div className="hub-card-grid">
              <Link href="/catholic-funeral-program" className="hub-card">
                <div className="hub-card-icon">✝</div>
                <h4>Catholic Funeral Program</h4>
                <p>
                  Complete Mass order of service with readings, prayers, and
                  Catholic traditions pre-filled.
                </p>
              </Link>
              <Link href="/celebration-of-life-program" className="hub-card">
                <div className="hub-card-icon">✦</div>
                <h4>Celebration of Life Program</h4>
                <p>
                  Uplifting design with a celebration-focused order of service
                  and personal tributes.
                </p>
              </Link>
              <Link href="/spanish-funeral-program" className="hub-card">
                <div className="hub-card-icon">✦</div>
                <h4>Spanish Funeral Program (Programa Fúnebre)</h4>
                <p>
                  Bilingual program with Spanish Mass order of service and
                  bilingual readings.
                </p>
              </Link>
              <Link href="/pet-memorial-program" className="hub-card">
                <div className="hub-card-icon">🐾</div>
                <h4>Pet Memorial Program</h4>
                <p>
                  A heartfelt tribute for your beloved companion with the
                  Rainbow Bridge poem and pet-specific content.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* ── KEEPSAKES SECTION (Coming Soon) ── */}
        <section className="site-section">
          <div className="wrap">
            <h2>Memorial Keepsakes</h2>
            <p className="section-sub">
              More printable keepsakes are on the way — sign up-free, just like
              our programs.
            </p>
            <div className="hub-card-grid">
              <Link href="/prayer-cards" className="hub-card hub-card--soon">
                <span className="hub-card-badge">Coming soon</span>
                <div className="hub-card-icon">🙏</div>
                <h4>Prayer Cards</h4>
                <p>Coming soon</p>
              </Link>
              <Link
                href="/memorial-bookmarks"
                className="hub-card hub-card--soon"
              >
                <span className="hub-card-badge">Coming soon</span>
                <div className="hub-card-icon">🔖</div>
                <h4>Memorial Bookmarks</h4>
                <p>Coming soon</p>
              </Link>
              <Link
                href="/thank-you-cards"
                className="hub-card hub-card--soon"
              >
                <span className="hub-card-badge">Coming soon</span>
                <div className="hub-card-icon">💌</div>
                <h4>Thank You Cards</h4>
                <p>Coming soon</p>
              </Link>
              <Link
                href="/memorial-cards"
                className="hub-card hub-card--soon"
              >
                <span className="hub-card-badge">Coming soon</span>
                <div className="hub-card-icon">🕊</div>
                <h4>Memorial Cards</h4>
                <p>Coming soon</p>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="site-features">
          <div className="wrap">
            <h2>Why families choose Memorial Printables</h2>
            <p className="feat-sub">
              Simple, private, and free — everything you need when it matters
              most.
            </p>
            <div className="feat-grid">
              <div className="feat-card">
                <div className="feat-icon">✦</div>
                <h4>Completely Free</h4>
                <p>
                  No hidden fees, no premium tier, no &ldquo;upgrade to
                  download.&rdquo; Every template and tool is free, always.
                </p>
              </div>
              <div className="feat-card">
                <div className="feat-icon">🔒</div>
                <h4>100% Private</h4>
                <p>
                  Everything runs in your browser. No data is sent to our
                  servers. Your loved one&apos;s details stay with you.
                </p>
              </div>
              <div className="feat-card">
                <div className="feat-icon">⚡</div>
                <h4>Ready in Under a Minute</h4>
                <p>
                  Fill in the name, dates, and a photo. Pick a template.
                  Download your PDF. That&apos;s it — no learning curve.
                </p>
              </div>
              <div className="feat-card">
                <div className="feat-icon">🖨️</div>
                <h4>Print-Ready PDFs</h4>
                <p>
                  Download high-quality PDFs sized for standard paper. Print at
                  home or send to a print shop — they&apos;ll look great either
                  way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BAND ── */}
        <section className="site-cta-band">
          <div className="wrap">
            <h2>Ready to create a funeral program?</h2>
            <p className="cta-sub">
              It takes less than a minute. No signup, no cost, no strings
              attached.
            </p>
            <Link
              href="/free-funeral-program-generator"
              className="btn-primary"
            >
              Start Now — It&apos;s Free
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
