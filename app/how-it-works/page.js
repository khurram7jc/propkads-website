'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SystemFlow from '@/components/SystemFlow';
import FAQ from '@/components/FAQ';
import { DEFAULT_CONTENT } from '@/data/content';
import '@/app/crm/crm.css';

export default function HowItWorksPage() {
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
      {/* 1. Header */}
      <Header c={c} />

      {/* 2. Hero Section */}
      <section className="services-hub-hero">
        <div className="container">
          <div className="services-hub-hero-inner">
            <span className="section-tag">{c.howitworks_eyebrow || 'How Propkads Works'}</span>
            <h1 className="services-hub-title">
              Our Working Process <span className="highlight">for Developers</span>
            </h1>
            <p className="services-hub-sub">
              A straightforward, 4-step framework from project discovery to scaling closed property bookings.
            </p>

            <div className="services-hub-hero-ctas">
              <Link href="/contact" className="btn btn-solid">
                Apply for Project Review
              </Link>
              <Link href="/crm" className="btn btn-outline" style={{ background: '#fff' }}>
                Explore Propkads CRM →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4-Phase Revenue & Sales System Flow (Moved from Main Page) */}
      <SystemFlow c={c} buttonHref="/contact" buttonText="Schedule Free Project Review →" />

      {/* 4. Commercial Model */}
      <section className="section container" style={{ paddingTop: '0' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 24px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag" style={{ margin: '0 auto 12px auto', display: 'inline-block', textAlign: 'center' }}>
            {c.model_eyebrow || 'Commercial Model'}
          </span>
          <h2 style={{ fontSize: '30px', textAlign: 'center', margin: '0 auto' }}>
            {c.model_heading || 'Retainer + Performance Structure'}
          </h2>
        </div>

        <div className="model-panel" style={{ opacity: 1, transform: 'none' }}>
          <div className="model-panel-grid">
            <div className="model-panel-card">
              <span className="tag">{c.model_retainer_label || 'Retainer'}</span>
              <p>{c.model_retainer_desc || 'Monthly retainer based on project scope'}</p>
            </div>
            <div className="model-panel-card">
              <span className="tag">{c.model_performance_label || 'Performance'}</span>
              <p>{c.model_performance_desc || 'Plus per-booking incentive or mutually agreed revenue share'}</p>
            </div>
          </div>

          <p className="model-panel-tagline">{c.commercial_model_tagline || 'We earn more only when you sell more.'}</p>
          <span className="model-panel-min">{c.model_min_engagement || 'Minimum engagement period: 60–90 days'}</span>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <FAQ c={c} />

      {/* 6. CTA Banner */}
      <div className="container" style={{ margin: '16px auto 32px auto' }}>
        <div className="services-hub-banner" style={{ marginTop: '0' }}>
          <div>
            <h4>Ready to Implement a Predictable Sales Engine?</h4>
            <p>Get an initial project audit and see how our 4-phase system converts inquiries into verified property bookings.</p>
          </div>
          <div className="services-hub-actions">
            <Link href="/contact" className="btn btn-solid" style={{ background: '#22C55E', color: '#fff' }}>
              Schedule Free Review →
            </Link>
          </div>
        </div>
      </div>

      {/* 7. Footer */}
      <Footer c={c} />
    </div>
  );
}
