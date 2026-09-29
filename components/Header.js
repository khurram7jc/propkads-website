'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header({ c = {} }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="mainnav">
        <div className="mainnav-inner">
          <Link href="/" className="mainnav-logo">
            <img src="/logo.png" alt="Propkads" />
          </Link>

          <div className="mainnav-links">
            <Link
              href="/crm"
              style={{
                color: '#14A750',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '6px',
                background: '#EBF8F1',
                border: '1px solid rgba(20, 167, 80, 0.25)',
                textDecoration: 'none'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#14A750' }}></span>
              Sales CRM
            </Link>
            <a href="/#about">{c?.header_nav_1 || 'About Us'}</a>
            <a href="/#services">{c?.header_nav_2 || 'Services'}</a>
            <a href="/#how-it-works">{c?.header_nav_3 || 'How It Works'}</a>
            <a href="/#contact">{c?.header_nav_4 || 'Contact'}</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href="https://crm.propkads.com/login"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#1A1B1B',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #E2E8EA',
                background: '#FFFFFF',
                transition: 'all .2s',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>CRM Login</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
              </svg>
            </a>
            <a href="/#contact" className="mainnav-cta">{c?.header_cta_text || 'Get a Free Review'}</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
