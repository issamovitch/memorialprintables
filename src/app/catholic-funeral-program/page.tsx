import type { Metadata } from 'next';
import Link from 'next/link';
import { CATHOLIC_CONFIG } from '@/lib/funeral-config';
import { getTemplates } from '@/lib/template-loader';
import FuneralMaker from '@/components/funeral-maker';
import FaqAccordion from '@/components/faq-accordion';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: CATHOLIC_CONFIG.title,
  description: CATHOLIC_CONFIG.meta,
  alternates: { canonical: 'https://memorialprintables.com/catholic-funeral-program' },
};

export default function CatholicFuneralProgramPage() {
  const templates = getTemplates();
  const cfg = CATHOLIC_CONFIG;
  return (
    <div className="er-root">
      <SiteNav />
      <div className="wrap main-content">
        <div className="breadcrumb">
          <Link href="/">Home</Link> › <Link href="/free-funeral-program-generator">Funeral Program</Link> › <span>Catholic</span>
        </div>
        <h1 className="title">{cfg.h1}</h1>
        <p className="subtitle">Create a Catholic funeral program with the traditional Mass order of service, readings, and prayers. Free, no signup.</p>
        <div className="privacy">🔒 100% private. Everything is generated in your browser — nothing is uploaded or saved.</div>
        <FuneralMaker templates={templates} config={cfg} />

        {/* HOW TO */}
        <section className="block">
          <div className="band">
            <h2 className="h">How to make a Catholic funeral program</h2>
            <p className="h-sub">Three steps to a print-ready program with the Mass order of service.</p>
            <div className="steps">
              <div className="step"><div className="num">1</div><p>Choose a format — single, bifold, or trifold.</p></div>
              <div className="step"><div className="num">2</div><p>Enter the name, dates, and upload a photo.</p></div>
              <div className="step"><div className="num">3</div><p>The Mass order of service is pre-filled. Customise any readings or prayers, then download.</p></div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="block">
          <div className="band">
            <h2 className="h">Frequently asked questions</h2>
            <FaqAccordion items={cfg.faq} />
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
