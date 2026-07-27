'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSent(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'var(--accent-soft)',
        border: '1px solid #d9e7e3',
        borderRadius: '14px',
        padding: '32px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '36px', marginBottom: '12px' }}>✦</div>
        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Message Sent!</h3>
        <p style={{ fontSize: '14px', color: 'var(--slate)', marginBottom: '20px' }}>
          Thank you for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          style={{
            background: 'var(--accent)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="site-contact-form" onSubmit={handleSubmit}>
      {error && (
        <div style={{
          maxWidth: '600px',
          margin: '0 auto 20px',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '10px',
          padding: '12px 16px',
          fontSize: '14px',
          color: '#dc2626',
        }}>
          {error}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What is this about?" required />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us how we can help..." required />
      </div>
      <button type="submit" className="submit-btn" disabled={sending}>
        {sending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
