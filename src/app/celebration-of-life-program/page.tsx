import type { Metadata } from 'next';
import Link from 'next/link';
import { CELEBRATION_CONFIG } from '@/lib/funeral-config';
import { getTemplates } from '@/lib/template-loader';
import FuneralMaker from '@/components/funeral-maker';
import FaqAccordion from '@/components/faq-accordion';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: CELEBRATION_CONFIG.title,
  description: CELEBRATION_CONFIG.meta,
  alternates: { canonical: 'https://memorialprintables.com/celebration-of-life-program' },
};

export default function CelebrationOfLifeProgramPage() {
  const templates = getTemplates();
  const cfg = CELEBRATION_CONFIG;
  return (
    <div className="er-root">
      <SiteNav />
      <div className="wrap main-content">
        <div className="breadcrumb">
          <Link href="/">Home</Link> › <Link href="/free-funeral-program-generator">Funeral Program</Link> › <span>Celebration of Life</span>
        </div>
        <h1 className="title">{cfg.h1}</h1>
        <p className="subtitle">Create an uplifting celebration of life program that honours your loved one&apos;s journey. Free, no signup, no watermark.</p>
        <div className="privacy">🔒 100% private. Everything is generated in your browser — nothing is uploaded or saved.</div>
        <FuneralMaker templates={templates} config={cfg} />

        {/* HOW TO */}
        <section className="block">
          <div className="band">
            <h2 className="h">How to make a celebration of life program</h2>
            <p className="h-sub">Three steps to a beautiful, uplifting program for a life well lived.</p>
            <div className="steps">
              <div className="step"><div className="num">1</div><p>Choose a format — single, bifold, or trifold.</p></div>
              <div className="step"><div className="num">2</div><p>Enter the name, dates, and upload a photo.</p></div>
              <div className="step"><div className="num">3</div><p>The order of service is pre-filled with uplifting tributes. Customise any section, then download.</p></div>
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
