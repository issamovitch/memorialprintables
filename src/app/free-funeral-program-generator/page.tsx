import type { Metadata } from 'next';
import Link from 'next/link';
import { DEFAULT_CONFIG } from '@/lib/funeral-config';
import { getTemplates } from '@/lib/template-loader';
import FuneralMaker from '@/components/funeral-maker';
import FaqAccordion from '@/components/faq-accordion';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Free Funeral Program Maker | No Signup, Print PDF',
  description:
    'Make a print-ready funeral program free in minutes. Single, bifold, or trifold. No signup, no watermark, everything stays private in your browser.',
  alternates: {
    canonical: 'https://memorialprintables.com/free-funeral-program-generator',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Funeral Program Maker',
    url: 'https://memorialprintables.com/free-funeral-program-generator',
    description:
      'Make a print-ready funeral program free in minutes. Single, bifold, or trifold. No signup, no watermark, everything stays private in your browser.',
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
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://memorialprintables.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Funeral Program',
        item: 'https://memorialprintables.com/free-funeral-program-generator',
      },
    ],
  },
];

export default function FlagshipGeneratorPage() {
  const templates = getTemplates();
  return (
    <div className="er-root">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <SiteNav current="generator" />

      <div className="wrap main-content">
        <div className="breadcrumb">
          <Link href="/">Home</Link> › Funeral Program
        </div>
        <h1 className="title">Free Funeral Program Maker</h1>
        <p className="subtitle">
          Make a print-ready funeral program free in minutes — no signup, no
          watermark. Choose single, bifold, or trifold and download a PDF.
          This funeral program maker free online tool lets you design
          everything in your browser.
        </p>

        <div className="chips">
          <div className="chip">▤ Format</div>
          <div className="chip">✝ Religion</div>
          <div className="chip">▾ All templates</div>
        </div>

        <div className="privacy">
          🔒 100% private. Everything is generated in your browser — nothing is
          uploaded or saved.
        </div>

        <FuneralMaker templates={templates} />



      </div>

      <SiteFooter />
    </div>
  );
}
