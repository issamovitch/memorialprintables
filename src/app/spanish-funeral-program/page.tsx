import type { Metadata } from 'next';
import Link from 'next/link';
import { SPANISH_CONFIG } from '@/lib/funeral-config';
import { getTemplates } from '@/lib/template-loader';
import FuneralMaker from '@/components/funeral-maker';
import FaqAccordion from '@/components/faq-accordion';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: SPANISH_CONFIG.title,
  description: SPANISH_CONFIG.meta,
  alternates: { canonical: 'https://memorialprintables.com/spanish-funeral-program' },
};

export default function SpanishFuneralProgramPage() {
  const templates = getTemplates();
  const cfg = SPANISH_CONFIG;
  return (
    <div className="er-root">
      <SiteNav />
      <div className="wrap main-content">
        <div className="breadcrumb">
          <Link href="/">Home</Link> › <Link href="/free-funeral-program-generator">Funeral Program</Link> › <span>Programa Fúnebre</span>
        </div>
        <h1 className="title">{cfg.h1}</h1>
        <p className="subtitle">Crea un programa fúnebre bilingüe con el orden de la misa y lecturas en español. Gratis, sin registro.</p>
        <div className="privacy">🔒 100% privado. Todo se genera en tu navegador — no se sube ni se guarda nada.</div>
        <FuneralMaker templates={templates} config={cfg} />

        {/* HOW TO */}
        <section className="block">
          <div className="band">
            <h2 className="h">Cómo hacer un programa fúnebre</h2>
            <p className="h-sub">Tres pasos para crear un programa listo para imprimir.</p>
            <div className="steps">
              <div className="step"><div className="num">1</div><p>Elige un formato — sencillo, bipliegue, o tripliegue.</p></div>
              <div className="step"><div className="num">2</div><p>Ingresa el nombre, las fechas, y sube una foto.</p></div>
              <div className="step"><div className="num">3</div><p>El orden de la misa está prellenado. Personaliza las lecturas u oraciones, luego descarga.</p></div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="block">
          <div className="band">
            <h2 className="h">Preguntas frecuentes</h2>
            <FaqAccordion items={cfg.faq} />
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
