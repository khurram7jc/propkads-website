'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FacebookIcon, InstagramIcon, LinkedInIcon, YoutubeIcon } from '@/components/Icons';

export default function Header({ c = {} }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  const isActive = (path) => {
    if (!pathname) return false;
    if (path === '/') return pathname === '/';
    return pathname === path || pathname.startsWith(`${path}/`);
  };


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top Information Bar (Scrolls naturally with page) */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-label-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="top-bar-text-label">Call Desk:</span>
              <a href="tel:+923333401101" className="top-bar-phone">
                +92 333 3401101
              </a>
            </span>
            <span className="top-bar-sep">|</span>
            <span className="top-bar-email-text">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{c.contact_email || 'contact@propkads.com'}</span>
            </span>
          </div>
          <div className="top-bar-right">
            <div className="top-bar-socials">
              <span className="top-bar-social-label">Follow Us:</span>
              <a href={c.social_facebook || 'https://www.facebook.com/Propkads/'} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href={c.social_instagram || 'https://www.instagram.com/propkads/'} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={c.social_linkedin || 'https://www.linkedin.com/company/propkads/'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href={c.social_youtube || 'https://www.youtube.com/@Propkads'} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation (Sticky at top: 0 with zero glitch) */}
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <nav className="mainnav">
        <div className="mainnav-inner">
          {/* Logo */}
          <Link href="/" className="mainnav-logo">
            <img src="/logo.png" alt="Propkads" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="mainnav-links">
            <Link href="/about" className={isActive('/about') ? 'is-active' : ''}>
              {c?.header_nav_1 || 'About Us'}
            </Link>

            {/* Services Direct Link */}
            <Link href="/services" className={isActive('/services') ? 'is-active' : ''}>
              {c?.header_nav_2 || 'Services'}
            </Link>

            {/* Projects Dropdown */}
            <div
              className="nav-dropdown-wrap"
              onMouseEnter={() => setProjectsDropdownOpen(true)}
              onMouseLeave={() => setProjectsDropdownOpen(false)}
            >
              <span
                className={`nav-dropdown-trigger ${pathname?.startsWith('/projects') ? 'is-active' : ''}`}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => setProjectsDropdownOpen((prev) => !prev)}
              >
                <span>Projects</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>

              {projectsDropdownOpen && (
                <div className="nav-dropdown-menu projects-dropdown-menu">
                  <Link href="/projects/karachi-enclave" className="nav-drop-item" onClick={() => setProjectsDropdownOpen(false)}>
                    Karachi Enclave
                  </Link>
                </div>
              )}
            </div>
            <Link href="/blog" className={isActive('/blog') ? 'is-active' : ''}>Blogs</Link>
            <Link href="/careers" className={isActive('/careers') ? 'is-active' : ''}>Career</Link>
            <Link href="/contact" className={isActive('/contact') ? 'is-active' : ''}>Contact Us</Link>
          </div>

          {/* Right CTA */}
          <div className="mainnav-actions">
            <Link href="/contact" className="mainnav-cta">
              {c?.header_cta_text || 'Get a Free Review'}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-nav-panel">
            <Link href="/about" className={isActive('/about') ? 'is-active' : ''} onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/services" className={isActive('/services') ? 'is-active' : ''} onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--slate)', padding: '12px 0 4px 0', display: 'block', userSelect: 'none' }}>Projects</span>
            <div className="mobile-services-links">
              <Link href="/projects/karachi-enclave" onClick={() => setMobileMenuOpen(false)}>• Karachi Enclave</Link>
            </div>
            <Link href="/blog" className={isActive('/blog') ? 'is-active' : ''} onClick={() => setMobileMenuOpen(false)}>Blogs</Link>
            <Link href="/careers" className={isActive('/careers') ? 'is-active' : ''} onClick={() => setMobileMenuOpen(false)}>Career</Link>
            <Link href="/contact" className={isActive('/contact') ? 'is-active' : ''} onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
          </div>
        )}
      </nav>
    </header>
    </>
  );
}
