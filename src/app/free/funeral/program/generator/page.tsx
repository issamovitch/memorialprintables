import type { Metadata } from 'next';
import Link from 'next/link';
import { DEFAULT_CONFIG } from '@/lib/funeral-config';
import { getTemplates } from '@/lib/template-loader';
import FuneralMaker from '@/components/funeral-maker';
import FaqAccordion from '@/components/faq-accordion';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Memorial Printables | Free Funeral Program Maker',
  description: DEFAULT_CONFIG.meta,
  alternates: { canonical: 'https://memorialprintables.com/free/funeral/program/generator' },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Funeral Program Maker',
    url: 'https://memorialprintables.com/free/funeral/program/generator',
    description: DEFAULT_CONFIG.meta,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    isAccessibleForFree: true,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to make a funeral program',
    step: [
      { '@type': 'HowToStep', position: 1, text: 'Pick a format — single, bifold, or trifold.' },
      { '@type': 'HowToStep', position: 2, text: 'Enter the name, dates, and upload a photo.' },
      { '@type': 'HowToStep', position: 3, text: 'Add the order of service and obituary.' },
      { '@type': 'HowToStep', position: 4, text: 'Choose a style, then download your PDF.' },
      { '@type': 'HowToStep', position: 5, text: 'Print double-sided, fold, and share.' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: DEFAULT_CONFIG.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://memorialprintables.com' },
      { '@type': 'ListItem', position: 2, name: 'Program Makers', item: 'https://memorialprintables.com/program-makers' },
      { '@type': 'ListItem', position: 3, name: 'Funeral Program', item: 'https://memorialprintables.com/free/funeral/program/generator' },
    ],
  },
];

export default function FuneralProgramPage() {
  const templates = getTemplates();
  return (
    <div className="er-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd[0]) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd[1]) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd[2]) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd[3]) }}
      />

      {/* NAV */}
      <SiteNav current="generator" />

      {/* MAIN CONTENT */}
      <div className="wrap main-content">
        <div className="breadcrumb">
          <Link href="/">Home</Link> › Funeral Program
        </div>
        <h1 className="title">Funeral Program Maker</h1>
        <p className="subtitle">Create a beautiful, print-ready funeral program in under a minute.</p>

        <div className="chips">
          <div className="chip">▤ Format</div>
          <div className="chip">✝ Religion</div>
          <div className="chip">▾ All templates</div>
        </div>

        <div className="privacy">🔒 100% private. Everything is generated in your browser — nothing is uploaded or saved.</div>

        <FuneralMaker templates={templates} />

        {/* HOW TO */}
        <section className="block">
          <div className="band">
            <h2 className="h">How to make a funeral program</h2>
            <p className="h-sub">Four steps to a finished, print-ready program — no account needed.</p>
            <div className="steps">
              <div className="step"><div className="num">1</div><p>Pick a format — single, bifold, or trifold.</p></div>
              <div className="step"><div className="num">2</div><p>Enter the name, dates, and upload a photo.</p></div>
              <div className="step"><div className="num">3</div><p>Add the order of service and obituary.</p></div>
              <div className="step"><div className="num">4</div><p>Choose a style, then download your PDF.</p></div>
              <div className="step"><div className="num">5</div><p>Print double-sided, fold, and share.</p></div>
            </div>
          </div>
        </section>

        {/* WHAT TO INCLUDE */}
        <section className="block">
          <h2 className="h">What to include in a funeral program</h2>
          <p className="h-sub">A clear program helps guests follow the service and becomes a lasting keepsake.</p>
          <div className="two-col">
            <div>
              <h4>◷ What to include</h4>
              <ul>
                <li>Full name, birth and death dates, and a cover photo.</li>
                <li>The order of service — readings, hymns, eulogy, prayers.</li>
                <li>A short obituary or life story.</li>
                <li>Acknowledgments thanking those who offered support.</li>
                <li>An optional poem, scripture, or favourite quote.</li>
              </ul>
            </div>
            <div>
              <h4>◷ Why it matters</h4>
              <p style={{ fontSize: '14px', color: 'var(--slate)' }}>A well-structured program gives mourners something to hold and follow, guides them through each moment of the service, and preserves the details of a life so families can return to it long after the day itself.</p>
            </div>
          </div>
        </section>

        <div className="ad">
          <div className="lbl">Advertisement</div>
          A discreet ad keeps this tool free. The maker above is fully usable without clicking anything.
        </div>

        {/* FAQ */}
        <section className="block">
          <div className="band">
            <h2 className="h">Frequently asked questions</h2>
            <FaqAccordion items={DEFAULT_CONFIG.faq} />
          </div>
        </section>

        {/* PROMO / AFFILIATE */}
        <section className="block">
          <div className="promo">
            <div>
              <div className="tag">Recommended</div>
              <h3>Need it printed and delivered?</h3>
              <p>If you&apos;d rather not print at home, online print services can ship professionally printed programs on heavy cardstock — often next-day. Free to design here; upgrade only if you want it done for you.</p>
              <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)' }}>Affiliate disclosure: we may earn a commission if you order through these links, at no cost to you.</p>
            </div>
            <div className="acts">
              <a href="#">Order Prints</a>
              <a href="#" className="ghost">Compare Services</a>
            </div>
          </div>
        </section>

        {/* LEARN MORE */}
        <section className="block">
          <h2 className="h">◫ Learn more</h2>
          <p className="h-sub">Practical guides to help you plan a meaningful service.</p>
          <div className="cards guides">
            <a className="card" href="#"><div className="k">Getting started</div><h4>How to Write a Funeral Program: A Step-by-Step Guide</h4><div className="read">7 min read</div></a>
            <a className="card" href="#"><div className="k">Wording</div><h4>Order of Service Wording and Examples</h4><div className="read">6 min read</div></a>
            <a className="card" href="#"><div className="k">Writing</div><h4>How to Write an Obituary That Honors a Life</h4><div className="read">8 min read</div></a>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}
