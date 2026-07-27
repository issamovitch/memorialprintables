'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SiteNavProps {
  current?: 'home' | 'about' | 'contact' | 'generator';
}

export default function SiteNav({ current }: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <Image src="/logo.png" alt="Memorial Printables" width={32} height={32} className="logo-img" />
          <span>Memorial Printables</span>
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>

        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          <Link href="/" className={current === 'home' ? 'active' : ''}>Home</Link>
          <Link href="/free-funeral-program-generator" className={current === 'generator' ? 'active' : ''}>Funeral Program</Link>
          <Link href="/about" className={current === 'about' ? 'active' : ''}>About</Link>
          <Link href="/contact" className={current === 'contact' ? 'active' : ''}>Contact</Link>
        </div>

        <div className="nav-right">
          <span className="free-tag">Free · No signup</span>
          <Link href="/free-funeral-program-generator" className="cta">Make a program</Link>
        </div>
      </div>
    </nav>
  );
}
