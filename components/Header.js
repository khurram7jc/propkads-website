'use client';
import { useEffect, useState } from 'react';

export default function Header({ c }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="site-header">
      <nav className={`mainnav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="mainnav-inner">
          <a href="#top" className="mainnav-logo">
            <img src="/logo.png" alt="Propkads" />
          </a>

          <div className="mainnav-links">
            <a href="#about">{c.header_nav_1 || 'About Us'}</a>
            <a href="#services">{c.header_nav_2 || 'Services'}</a>
            <a href="#how-it-works">{c.header_nav_3 || 'How It Works'}</a>
            <a href="#contact">{c.header_nav_4 || 'Contact'}</a>
          </div>

          <a href="#contact" className="mainnav-cta">{c.header_cta_text || 'Get a Free Review'}</a>
        </div>
      </nav>
    </header>
  );
}
