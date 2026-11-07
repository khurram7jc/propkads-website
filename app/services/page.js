'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SERVICES_DATA, SERVICE_CATEGORIES } from '@/data/services';
import ServiceIcon from '@/components/ServiceIcons';
import '@/app/crm/crm.css';

const DEFAULT_CONTENT = {
  footer_tagline: 'From launch to final booking, turning inventory into closed bookings.',
  newsletter_heading: 'Subscribe to Our Newsletter',
  newsletter_intro: 'Get updates on real estate marketing insights.',
  newsletter_button: 'Subscribe',
  social_facebook: 'https://www.facebook.com/Propkads/',
  social_instagram: 'https://www.instagram.com/propkads/',
  social_linkedin: 'https://www.linkedin.com/company/propkads/',
  social_youtube: 'https://www.youtube.com/@Propkads',
  social_x: 'https://x.com/propkads',
  social_tiktok: 'https://www.tiktok.com/@propkads',
  contact_phone: '+92 333 3401101',
  contact_email: 'contact@propkads.com',
  contact_location: 'Karachi, Pakistan',
  header_nav_1: 'About Us',
  header_nav_2: 'Services',
  header_nav_3: 'How It Works',
  header_nav_4: 'Contact',
};

const SERVICE_THEMES = {
  'graphic-designing-brand-identity': {
    gradient: 'linear-gradient(135deg, #FF3366 0%, #FF5E7E 100%)',
    shadow: '0 8px 20px rgba(255, 51, 102, 0.32)',
  },
  '3d-architectural-walkthroughs-cgi': {
    gradient: 'linear-gradient(135deg, #FFB703 0%, #FD9E02 100%)',
    shadow: '0 8px 20px rgba(255, 183, 3, 0.32)',
  },
  'content-creation-video-production': {
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #F7441E 100%)',
    shadow: '0 8px 20px rgba(255, 107, 53, 0.32)',
  },
  'site-drone-videography': {
    gradient: 'linear-gradient(135deg, #00C49F 0%, #06D6A0 100%)',
    shadow: '0 8px 20px rgba(0, 196, 159, 0.32)',
  },
  'social-media-management': {
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    shadow: '0 8px 20px rgba(139, 92, 246, 0.32)',
  },
  'performance-paid-advertising': {
    gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    shadow: '0 8px 20px rgba(239, 68, 68, 0.32)',
  },
  'real-estate-seo': {
    gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    shadow: '0 8px 20px rgba(14, 165, 233, 0.32)',
  },
  'custom-real-estate-web-development': {
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    shadow: '0 8px 20px rgba(59, 130, 246, 0.32)',
  },
  'real-estate-crm-pipeline-integration': {
    gradient: 'linear-gradient(135deg, #14A750 0%, #0D843D 100%)',
    shadow: '0 8px 20px rgba(20, 167, 80, 0.32)',
  },
};

export default function ServicesPage() {
  const [c, setC] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setC((prev) => ({ ...prev, ...d.content }));
      })
      .catch(() => {});
  }, []);

  
  return (
    <div className="crm-page-wrap">
      {/* 1. Header Navigation */}
      <Header c={c} />

      {/* 2. Hero Section with Background Video & Brand Overlay */}
      <section className="services-hub-hero">
        {/* Background Video with Real Estate Towers & Overlay */}
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            className="hero-video-bg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/hero-properties.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>

        <div className="container">
          <div className="services-hub-hero-inner">
            <h1 className="services-hub-title">
              Real Estate Growth Services
            </h1>
          </div>
        </div>
      </section>

      {/* 3. Interactive Services Directory */}
      <section className="section container" style={{ maxWidth: '1160px', width: '100%', margin: '0 auto', paddingTop: '48px', paddingBottom: '32px' }}>
                {/* Intro Paragraph */}
        <div className="page-hero-subtitle-wrap">
          <p className="page-hero-subtitle">
            We connect your projects with verified local and overseas property buyers through data-driven performance campaigns, immersive visual storytelling, and qualified sales pipelines.
          </p>
        </div>

        {/* Stadium Capsule Services Grid with Colorful Glowing Icons */}
        <div className="services-showcase-grid">
          {SERVICES_DATA.map((service, idx) => {
            const theme = SERVICE_THEMES[service.id] || {
              gradient: 'linear-gradient(135deg, #14A750 0%, #0D843D 100%)',
              shadow: '0 8px 20px rgba(20, 167, 80, 0.32)',
            };
            return (
              <div className="service-showcase-card" key={service.id}>
                {/* 1. Outer Capsule Animated Green Beam at Top Edge */}
                <span
                  className="system-capsule-beam"
                  style={{ animationDelay: `${(idx % 5) * 0.45}s` }}
                />

                {/* 2. Colorful Glowing Circular Icon */}
                <div
                  className="service-card-icon-circle"
                  style={{
                    background: theme.gradient,
                    boxShadow: theme.shadow,
                  }}
                >
                  <ServiceIcon name={service.icon} size={22} />
                </div>

                {/* 3. Service Title */}
                <h3 className="service-card-title">{service.title}</h3>

                {/* 4. Concise Description */}
                <p className="service-card-desc">{service.shortDesc}</p>


              </div>
            );
          })}
        </div>
      </section>

      {/* 4. 4-Phase Turnkey Execution Framework */}
      <section className="section container" style={{ paddingTop: '52px', paddingBottom: '56px', borderTop: '1px solid var(--line)' }}>
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 28px auto' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', letterSpacing: '-0.02em', margin: '0 auto', color: 'var(--ink)' }}>
            Our Execution Process
          </h2>
        </div>

        <div className="framework-grid">
          <div className="framework-step">
            <div className="framework-phase-badge">Phase 01</div>
            <h3>Project Discovery &amp; Audit</h3>
            <p>We review your property inventory, pricing structure, competitive advantages, and target buyer persona (local vs overseas).</p>
          </div>

          <div className="framework-step">
            <div className="framework-phase-badge">Phase 02</div>
            <h3>Creative &amp; 3D Production</h3>
            <p>Our studio produces 3D walkthroughs, luxury branding, payment plan brochures, and presenter video ads ready for launch.</p>
          </div>

          <div className="framework-step">
            <div className="framework-phase-badge">Phase 03</div>
            <h3>Multi-Channel Digital Launch</h3>
            <p>We activate high-intent Meta, TikTok &amp; Google ad campaigns connected to instant WhatsApp automation and landing pages.</p>
          </div>

          <div className="framework-step">
            <div className="framework-phase-badge">Phase 04</div>
            <h3>CRM Control &amp; Closing Audit</h3>
            <p>Every inquiry is protected from duplicate theft with CRM integration while agent call activity is audited daily to ensure maximum closings.</p>
          </div>
        </div>
      </section>

      {/* 5. Website Footer */}
      <Footer c={c} />
    </div>
  );
}

