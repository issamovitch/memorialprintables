import type { Metadata } from 'next';
import Link from 'next/link';
import { PET_CONFIG } from '@/lib/funeral-config';
import { getTemplates } from '@/lib/template-loader';
import FuneralMaker from '@/components/funeral-maker';
import FaqAccordion from '@/components/faq-accordion';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: PET_CONFIG.title,
  description: PET_CONFIG.meta,
  alternates: { canonical: 'https://memorialprintables.com/pet-memorial-program' },
};

export default function PetMemorialProgramPage() {
  const templates = getTemplates();
  const cfg = PET_CONFIG;
  return (
    <div className="er-root">
      <SiteNav />
      <div className="wrap main-content">
        <div className="breadcrumb">
          <Link href="/">Home</Link> › <Link href="/free-funeral-program-generator">Funeral Program</Link> › <span>Pet Memorial</span>
        </div>
        <h1 className="title">{cfg.h1}</h1>
        <p className="subtitle">Honour your beloved pet with a heartfelt memorial program. Create a lasting keepsake for dogs, cats, and all companions. Free, no signup.</p>
        <div className="privacy">🔒 100% private. Everything is generated in your browser — nothing is uploaded or saved.</div>
        <FuneralMaker templates={templates} config={cfg} />

        {/* HOW TO */}
        <section className="block">
          <div className="band">
            <h2 className="h">How to make a pet memorial program</h2>
            <p className="h-sub">Three steps to a touching tribute for your beloved companion.</p>
            <div className="steps">
              <div className="step"><div className="num">1</div><p>Choose a format — single, bifold, or trifold.</p></div>
              <div className="step"><div className="num">2</div><p>Enter your pet&apos;s name, dates, and upload a photo.</p></div>
              <div className="step"><div className="num">3</div><p>The memorial order of service is pre-filled with the Rainbow Bridge reading. Customise any section, then download.</p></div>
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
