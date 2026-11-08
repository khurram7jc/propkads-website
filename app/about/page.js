'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DEFAULT_CONTENT } from '@/data/content';
import '@/app/crm/crm.css';

export default function AboutPage() {
  const [c, setC] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setC((prev) => ({ ...prev, ...d.content }));
      })
      .catch(() => {});
  }, []);

  const cards = [
    {
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      title: c.about_card_1_title || 'Our Approach',
      bullets: (c.about_card_1_bullets || '').split('\n').filter(Boolean),
    },
    {
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
        </svg>
      ),
      title: c.about_card_2_title || 'Why Propkads Exists',
      bullets: (c.about_card_2_bullets || '').split('\n').filter(Boolean),
    },
    {
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="14" width="3.4" height="7" rx="0.8" />
          <rect x="9" y="10" width="3.4" height="11" rx="0.8" />
          <rect x="15" y="6" width="3.4" height="15" rx="0.8" />
          <path d="M14 4h6v6" />
          <path d="M20 4l-7 7-3-3-5 5" />
        </svg>
      ),
      title: c.about_card_3_title || 'What Makes Us Different',
      bullets: (c.about_card_3_bullets || '').split('\n').filter(Boolean),
    },
  ];

  const methodologyPoints = [
    {
      title: '100% Real Estate Specialization',
      tag: 'Domain Expertise',
      desc: 'Zero consumer goods, retail, or fashion. Every media buyer, 3D animator, and CRM engineer on our team is dedicated solely to plot files, luxury villas, and high-rise commercial & residential sales cycles.',
      image: '/about/specialization.png',
      alt: 'Propkads digital marketing and media buying team executing real estate campaigns',
    },
    {
      title: 'Accountability Beyond the Click',
      tag: 'Lead Qualification',
      desc: 'While generic agencies stop when a lead form is submitted, we take responsibility for what happens next: ensuring leads are called within 5 minutes, tracked in CRM, and moved to on-ground site visits.',
      image: '/about/accountability.png',
      alt: 'Propkads sales representative managing client follow-ups and inquiries',
    },
    {
      title: 'Data Integrity & Lead Security',
      tag: 'Secure Infrastructure',
      desc: 'Lead theft and duplicate dealer calls destroy developer credibility. Our CRM enforces contact data encryption, automated Pakistani phone number deduplication, and private sales rep queues.',
      image: '/about/crm-security.png',
      alt: 'Propkads CRM real estate dashboard showing lead pipelines and conversion metrics',
    },
    {
      title: 'Performance-Aligned Growth',
      tag: 'Skin in the Game',
      desc: 'We believe partners should have skin in the game. We structure commercial agreements with transparent retainers and milestone performance incentives that scale only when your inventory is booked.',
      image: '/about/growth.png',
      alt: 'Propkads team reviewing project success metrics and developer campaign performance',
    },
  ];

  return (
    <div className="crm-page-wrap">
      {/* 1. Header */}
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
              Real Estate Growth Partner
            </h1>
          </div>
        </div>
      </section>

      {/* 3. Three Core Pillars */}
      <section className="section container">
        {/* Intro Paragraph */}
        <div className="page-hero-subtitle-wrap">
          <p className="page-hero-subtitle">
            Propkads was founded for developers who demand real sales results over vanity impressions. We combine creative excellence, precision advertising, and sales team accountability under one roof.
          </p>
        </div>

        <div className="about-cards-v3" style={{ opacity: 1, transform: 'none' }}>
          {cards.map((card, i) => (
            <div className="about-card-v3" key={i} style={{ opacity: 1, transform: 'none' }}>
              <div className="about-card-v3-header">
                <div className="about-card-v3-icon">{card.icon}</div>
                <h3 className="about-card-v3-title">{card.title}</h3>
              </div>
              <ul>
                {card.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Operating Standards (Alternating Zig-Zag Methodology) */}
      <section className="section container">
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 36px)', textAlign: 'center', margin: '0 auto', maxWidth: '100%', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1.25', color: 'var(--ink)' }}>
            Why Leading Developers Trust Our Operational Methodology
          </h2>
        </div>

        {/* Alternating Zig-Zag Rows */}
        <div className="methodology-zigzag-list">
          {methodologyPoints.map((point, idx) => {
            const isImageLeft = idx % 2 === 0;
            return (
              <div key={idx} className="methodology-zigzag-row">
                <span className="methodology-zigzag-tag mobile-only-tag">{point.tag}</span>
                {isImageLeft ? (
                  <>
                    <div className="methodology-zigzag-img-wrap">
                      <img src={point.image} alt={point.alt} className="methodology-zigzag-img" />
                    </div>
                    <div className="methodology-zigzag-content">
                      <span className="methodology-zigzag-tag desktop-only-tag">{point.tag}</span>
                      <h3 className="methodology-zigzag-title">{point.title}</h3>
                      <p className="methodology-zigzag-desc">{point.desc}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="methodology-zigzag-content">
                      <span className="methodology-zigzag-tag desktop-only-tag">{point.tag}</span>
                      <h3 className="methodology-zigzag-title">{point.title}</h3>
                      <p className="methodology-zigzag-desc">{point.desc}</p>
                    </div>
                    <div className="methodology-zigzag-img-wrap">
                      <img src={point.image} alt={point.alt} className="methodology-zigzag-img" />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Commercial Model (Original Sleek Design with Open Spacing) */}
      <section style={{ padding: '64px 0 84px 0', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.2vw, 34px)',
                textAlign: 'center',
                margin: 0,
                fontWeight: '800',
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
              }}
            >
              {c.model_heading || 'Retainer + Performance Structure'}
            </h2>
          </div>

          <style>{`
            .model-panel-clean-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 52px;
              margin-bottom: 44px;
            }
            @media (max-width: 700px) {
              .model-panel-clean-grid {
                grid-template-columns: 1fr;
                gap: 32px;
                margin-bottom: 36px;
              }
            }
          `}</style>

          {/* 2-Column Grid with Original Green Accent Bars */}
          <div className="model-panel-clean-grid">
            {/* Column 1: Retainer */}
            <div style={{ position: 'relative', paddingTop: '22px' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'var(--green)',
                  borderRadius: '2px',
                }}
              />
              <span
                style={{
                  fontSize: '11.5px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--green)',
                  fontWeight: '800',
                  marginBottom: '14px',
                  display: 'block',
                }}
              >
                {c.model_retainer_label || 'Retainer'}
              </span>
              <p
                style={{
                  fontSize: '16px',
                  color: 'var(--ink)',
                  lineHeight: 1.65,
                  fontWeight: '600',
                  margin: 0,
                }}
              >
                {c.model_retainer_desc || 'Monthly retainer based on project scope'}
              </p>
            </div>

            {/* Column 2: Performance */}
            <div style={{ position: 'relative', paddingTop: '22px' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'var(--green)',
                  borderRadius: '2px',
                }}
              />
              <span
                style={{
                  fontSize: '11.5px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--green)',
                  fontWeight: '800',
                  marginBottom: '14px',
                  display: 'block',
                }}
              >
                {c.model_performance_label || 'Performance'}
              </span>
              <p
                style={{
                  fontSize: '16px',
                  color: 'var(--ink)',
                  lineHeight: 1.65,
                  fontWeight: '600',
                  margin: 0,
                }}
              >
                {c.model_performance_desc || 'Plus per-booking incentive or mutually agreed revenue share'}
              </p>
            </div>
          </div>

          {/* Bottom Area: Tagline & Minimum Period (Left Aligned) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p
              style={{
                fontSize: '20px',
                fontWeight: '800',
                color: 'var(--ink)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              {c.commercial_model_tagline || 'We earn more only when you sell more.'}
            </p>
            <div>
              <span style={{ fontSize: '14.5px', color: 'var(--slate)', fontWeight: '500' }}>
                Minimum engagement period:{' '}
                <strong style={{ color: 'var(--green)', fontWeight: '800', fontSize: '15.5px' }}>
                  60–90 days
                </strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer c={c} />
    </div>
  );
}
