'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SERVICES_DATA, SERVICE_CATEGORIES } from '@/data/services';
import ServiceIcon from '@/components/ServiceIcons';
import '@/app/crm/crm.css';

const DEFAULT_CONTENT = {
  footer_tagline: 'A complete revenue system for real estate developers — not just ads.',
  newsletter_heading: 'Subscribe to Our Newsletter',
  newsletter_intro: 'Get updates on real estate marketing insights.',
  newsletter_button: 'Subscribe',
  social_facebook: 'https://www.facebook.com/Propkads/',
  social_instagram: 'https://www.instagram.com/propkads/',
  social_linkedin: 'https://www.linkedin.com/company/propkads/',
  social_youtube: 'https://www.youtube.com/@Propkads',
  social_x: 'https://x.com/propkads',
  social_tiktok: 'https://www.tiktok.com/@propkads',
  contact_phone: '+92 333 2000649',
  contact_email: 'contact@propkads.com',
  contact_location: 'Karachi, Pakistan',
  header_nav_1: 'About Us',
  header_nav_2: 'Services',
  header_nav_3: 'How It Works',
  header_nav_4: 'Contact',
};

export default function ServicesPage() {
  const [c, setC] = useState(DEFAULT_CONTENT);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setC((prev) => ({ ...prev, ...d.content }));
      })
      .catch(() => {});
  }, []);

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  return (
    <div className="crm-page-wrap">
      {/* 1. Header Navigation */}
      <Header c={c} />

      {/* 2. Hero Section */}
      <section className="services-hub-hero">
        <div className="container">
          <div className="services-hub-hero-inner">
            <span className="section-tag">Propkads Services Hub</span>
            <h1 className="services-hub-title">
              Full-Spectrum Creative, Digital Marketing &amp; <span className="highlight">Sales Technology</span> for Real Estate
            </h1>
            <p className="services-hub-sub">
              From cinema-grade 3D architectural walkthroughs and viral social media content to high-intent Meta ads, custom web portals, and our proprietary enterprise CRM — we provide the complete growth ecosystem for housing societies, high-rises, and real estate agencies.
            </p>

            <div className="services-hub-hero-ctas">
              <a href="/#contact" className="btn btn-solid">
                Get a Free Project Audit
              </a>
              <Link href="/crm" className="btn btn-outline" style={{ background: '#fff' }}>
                Explore Propkads CRM →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Services Directory */}
      <section className="section container" style={{ paddingTop: '40px' }}>
        {/* Category Pills */}
        <div className="services-filter-tabs" style={{ marginBottom: '40px', justifyContent: 'center' }}>
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`services-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.label}</span>
              <span className="services-tab-count">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="services-showcase-grid">
          {filteredServices.map((service) => (
            <div className="service-showcase-card" key={service.id}>
              <div className="service-card-top">
                <div className="service-icon-box">
                  <ServiceIcon name={service.icon} size={24} />
                </div>
                <span className="service-category-pill">{service.categoryName}</span>
              </div>

              <h2 className="service-card-title" style={{ fontSize: '20px' }}>{service.title}</h2>
              <p className="service-card-desc">{service.longDesc}</p>

              <div className="service-deliverables-list">
                <span className="service-deliverables-heading">Deliverables Breakdown:</span>
                <ul>
                  {service.deliverables.map((item, idx) => (
                    <li key={idx}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-impact-badge">
                <span className="impact-dot"></span>
                <span><b>Impact:</b> {service.impact}</span>
              </div>

              <div className="service-card-footer">
                <Link
                  href={service.id === 'propkads-real-estate-sales-crm' ? '/crm' : `/services/${service.slug}`}
                  className="service-card-btn"
                >
                  <span>View Full Service Scope</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 4-Phase Turnkey Execution Framework */}
      <section className="section container" style={{ background: '#FFFFFF', borderRadius: '24px', padding: '64px 32px', margin: '40px auto 80px auto', border: '1px solid var(--line)' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <span className="section-tag">How We Work</span>
          <h2 style={{ fontSize: '32px' }}>Our 4-Phase Real Estate Growth Framework</h2>
          <p className="section-intro">
            We don&apos;t just deliver isolated services. We integrate media, advertising, and technology into a single revenue-generating pipeline.
          </p>
        </div>

        <div className="framework-grid">
          <div className="framework-step">
            <span className="framework-num">01</span>
            <h3>Project Discovery &amp; Audit</h3>
            <p>We review your property inventory, pricing structure, competitive advantages, and target buyer persona (local vs overseas).</p>
          </div>

          <div className="framework-step">
            <span className="framework-num">02</span>
            <h3>Creative &amp; 3D Production</h3>
            <p>Our studio produces 3D walkthroughs, luxury branding, payment plan brochures, and presenter video ads ready for launch.</p>
          </div>

          <div className="framework-step">
            <span className="framework-num">03</span>
            <h3>Multi-Channel Digital Launch</h3>
            <p>We activate high-intent Meta, TikTok &amp; Google ad campaigns connected to instant WhatsApp automation and landing pages.</p>
          </div>

          <div className="framework-step">
            <span className="framework-num">04</span>
            <h3>CRM Control &amp; Closing Audit</h3>
            <p>Every inquiry is protected from duplicate theft in Propkads CRM while agent call activity is audited daily to ensure maximum closings.</p>
          </div>
        </div>
      </section>

      {/* 5. Website Footer */}
      <Footer c={c} />
    </div>
  );
}
