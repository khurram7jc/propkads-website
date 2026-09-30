'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header({ c = {} }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

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
          {/* Logo */}
          <Link href="/" className="mainnav-logo">
            <img src="/logo.png" alt="Propkads" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="mainnav-links">
            <Link href="/about">{c?.header_nav_1 || 'About Us'}</Link>

            {/* Services Dropdown */}
            <div
              className="nav-dropdown-wrap"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link href="/services" className="nav-dropdown-trigger">
                <span>{c?.header_nav_2 || 'Services'}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </Link>

              {servicesDropdownOpen && (
                <div className="nav-dropdown-menu">
                  <div className="nav-dropdown-group">
                    <span className="nav-group-title">🎨 Creative &amp; 3D Media</span>
                    <Link href="/services/3d-architectural-walkthroughs-cgi" className="nav-drop-item">
                      <b>3D Walkthroughs &amp; CGI</b>
                      <span>Society flythroughs &amp; elevations</span>
                    </Link>
                    <Link href="/services/graphic-designing-brand-identity" className="nav-drop-item">
                      <b>Graphic Design &amp; Branding</b>
                      <span>Luxury brochures &amp; billboards</span>
                    </Link>
                    <Link href="/services/content-creation-video-production" className="nav-drop-item">
                      <b>Content &amp; Video Production</b>
                      <span>Reels, TikToks &amp; presenter tours</span>
                    </Link>
                    <Link href="/services/site-drone-videography" className="nav-drop-item">
                      <b>Drone &amp; Progress Shoots</b>
                      <span>On-ground development updates</span>
                    </Link>
                  </div>

                  <div className="nav-dropdown-group">
                    <span className="nav-group-title">📈 Digital Marketing &amp; SEO</span>
                    <Link href="/services/performance-paid-advertising" className="nav-drop-item">
                      <b>Performance Paid Ads</b>
                      <span>Meta, Google &amp; TikTok lead funnels</span>
                    </Link>
                    <Link href="/services/social-media-management" className="nav-drop-item">
                      <b>Social Media Management</b>
                      <span>Daily posting &amp; community growth</span>
                    </Link>
                    <Link href="/services/real-estate-seo" className="nav-drop-item">
                      <b>Real Estate SEO</b>
                      <span>Rank Page 1 on Google for buyers</span>
                    </Link>
                    <Link href="/services/whatsapp-api-msgs-automation" className="nav-drop-item">
                      <b>WhatsApp &amp; MSGs Automation</b>
                      <span>60s instant brochure delivery</span>
                    </Link>
                  </div>

                  <div className="nav-dropdown-group">
                    <span className="nav-group-title">💻 Web &amp; Technology Systems</span>
                    <Link href="/services/custom-real-estate-web-development" className="nav-drop-item">
                      <b>Custom Web Development</b>
                      <span>Modern property portals &amp; calculators</span>
                    </Link>
                    <Link href="/services/high-converting-landing-pages" className="nav-drop-item">
                      <b>Project Landing Pages</b>
                      <span>Ad funnels optimized for speed</span>
                    </Link>
                    <Link href="/crm" className="nav-drop-item highlight">
                      <b>Propkads Sales CRM</b>
                      <span>Cloud lead audit &amp; inventory locks</span>
                    </Link>
                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #E2E8F0' }}>
                      <Link href="/services" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--green)' }}>
                        Browse All 12 Services →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/how-it-works">{c?.header_nav_3 || 'How It Works'}</Link>

            {/* Propkads CRM Link with Badge */}
            <Link href="/crm" className="crm-nav-link">
              <span>Propkads CRM</span>
              <span className="crm-nav-pill">Portal</span>
            </Link>

            <Link href="/contact">{c?.header_nav_4 || 'Contact'}</Link>
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-nav-panel">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)}>All Services</Link>
            <div className="mobile-services-links">
              <Link href="/services/3d-architectural-walkthroughs-cgi" onClick={() => setMobileMenuOpen(false)}>• 3D Walkthroughs &amp; CGI</Link>
              <Link href="/services/graphic-designing-brand-identity" onClick={() => setMobileMenuOpen(false)}>• Graphic Design &amp; Branding</Link>
              <Link href="/services/performance-paid-advertising" onClick={() => setMobileMenuOpen(false)}>• Performance Paid Ads</Link>
              <Link href="/services/social-media-management" onClick={() => setMobileMenuOpen(false)}>• Social Media Management</Link>
              <Link href="/services/real-estate-seo" onClick={() => setMobileMenuOpen(false)}>• Real Estate SEO</Link>
              <Link href="/services/custom-real-estate-web-development" onClick={() => setMobileMenuOpen(false)}>• Web Development</Link>
            </div>
            <Link href="/crm" onClick={() => setMobileMenuOpen(false)}>Propkads CRM (Portal)</Link>
            <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
            <Link href="/contact" className="btn btn-solid" style={{ width: '100%', marginTop: '12px' }} onClick={() => setMobileMenuOpen(false)}>
              Get a Free Review
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
