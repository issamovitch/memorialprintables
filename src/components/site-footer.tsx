import Link from 'next/link';
import Image from 'next/image';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="logo">
              <Image src="/logo.png" alt="Memorial Printables" width={32} height={32} className="logo-img" />
              <span>Memorial Printables</span>
            </div>
            <p className="about">Free, private memorial tools. Create beautiful funeral programs, prayer cards, and keepsakes — right in your browser.</p>
            <div className="about badge">◷ Generated in your browser — nothing uploaded</div>
            <div className="about badge">✓ No signup required to download</div>
          </div>
          <div>
            <h5>Programs</h5>
            <ul>
              <li><Link href="/free-funeral-program-generator">Funeral Program</Link></li>
              <li><Link href="/catholic-funeral-program">Catholic</Link></li>
              <li><Link href="/celebration-of-life-program">Celebration of Life</Link></li>
              <li><Link href="/spanish-funeral-program">Spanish</Link></li>
              <li><Link href="/pet-memorial-program">Pet Memorial</Link></li>
            </ul>
          </div>
          <div>
            <h5>Keepsakes</h5>
            <ul>
              <li><Link href="/prayer-cards">Prayer Cards</Link></li>
              <li><Link href="/memorial-bookmarks">Bookmarks</Link></li>
              <li><Link href="/thank-you-cards">Thank-You Cards</Link></li>
              <li><Link href="/memorial-cards">Memorial Cards</Link></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h5>Resources</h5>
            <ul>
              <li><a href="#">Guides</a></li>
              <li><a href="#">How to Write a Program</a></li>
              <li><a href="#">Order of Service Wording</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; {new Date().getFullYear()} Memorial Printables. Free tools for families.</span>
          <span>Everything runs in your browser. Your details stay private.</span>
        </div>
      </div>
    </footer>
  );
}
