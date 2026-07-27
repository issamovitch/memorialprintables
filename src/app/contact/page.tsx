import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';
import ContactForm from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Memorial Printables | Contact Us',
  description:
    'Get in touch with the Memorial Printables team. We\'re here to help with questions about our free funeral program maker and memorial printables.',
  alternates: { canonical: 'https://memorialprintables.com/contact' },
};

export default function ContactPage() {
  return (
    <div className="site-root">
      <SiteNav current="contact" />

      <div className="main-content">
        <div className="wrap">
          {/* PAGE HERO */}
          <div className="site-page-hero">
            <div className="breadcrumb">
              <Link href="/">Home</Link> › <span>Contact</span>
            </div>
            <h1>Contact Us</h1>
            <p className="page-sub">
              Have a question, suggestion, or need help? We&apos;d love to hear from you.
            </p>
          </div>

          {/* CONTACT FORM */}
          <section className="site-section">
            <h2>Send Us a Message</h2>
            <p className="section-sub">
              We typically respond within 24 hours.
            </p>

            <ContactForm />

            {/* CONTACT INFO CARDS */}
            <div className="site-contact-info">
              <div className="ci-card">
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>📧</div>
                <h4>Email</h4>
                <p>hello@memorialprintables.com</p>
              </div>
              <div className="ci-card">
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>⏱️</div>
                <h4>Response Time</h4>
                <p>We aim to respond within 24 hours on business days.</p>
              </div>
              <div className="ci-card">
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>💬</div>
                <h4>Feedback</h4>
                <p>Have an idea for a new feature or template? We&apos;d love to hear it.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="site-section" style={{ borderTop: '1px solid var(--line)' }}>
            <h2>Common Questions</h2>
            <p className="section-sub">
              Quick answers to things people often ask.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px' }}>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px 24px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>Is the funeral program maker really free?</h4>
                <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: '1.6' }}>
                  Yes. Every feature is free. No signup, no trial, no paywall. We make the tool available at no cost to anyone who needs it.
                </p>
              </div>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px 24px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>Is my data safe?</h4>
                <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: '1.6' }}>
                  Absolutely. Everything is generated in your browser. No personal data is ever sent to our servers. When you download a PDF, it goes directly from your browser to your computer.
                </p>
              </div>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px 24px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>Can I suggest a new template?</h4>
                <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: '1.6' }}>
                  Please do! Use the form above or email us directly. We regularly add new templates based on family feedback.
                </p>
              </div>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px 24px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>Can you help me design a custom program?</h4>
                <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: '1.6' }}>
                  Our tool is designed to be self-serve, but if you run into any issues, reach out and we&apos;ll do our best to help.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
