'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { DEFAULT_CONTENT } from '@/data/content';
import { UsersIcon, CrmDocIcon, TeamStarIcon, GrowthBarsIcon, CurvedArrowIcon } from '@/components/Icons';
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

  const flowSteps = [
    { icon: <UsersIcon />, title: c.system_step_1 || 'Buyers', desc: c.system_step_1_desc || 'We target the right audience of property buyers through precise digital marketing and smart targeting.' },
    { icon: <CrmDocIcon />, title: c.system_step_2 || 'CRM', desc: c.system_step_2_desc || 'We capture, nurture and manage leads through a powerful CRM system for better follow-ups and higher conversions.' },
    { icon: <TeamStarIcon />, title: c.system_step_3 || 'Sales Team', desc: c.system_step_3_desc || 'Our experienced sales team connects with qualified leads, handles inquiries and moves prospects towards booking and sales.' },
    { icon: <GrowthBarsIcon />, title: c.system_step_4 || 'Closings', desc: c.system_step_4_desc || 'We help you close more deals with consistent follow-ups, professional support and a streamlined process from inquiry to handover.' },
  ];

  const processSteps = [
    { title: c.hero_step_1 || 'Project Audit', desc: c.hero_step_1_desc || 'Inventory review, pricing analysis, buyer profiling, and competitor assessment.' },
    { title: c.hero_step_2 || 'Launch & CRM Setup', desc: c.hero_step_2_desc || 'Campaign launch, CRM pipeline configuration, and sales team assignment rules.' },
    { title: c.hero_step_3 || 'Weekly Optimization', desc: c.hero_step_3_desc || 'Lead quality improvement, follow-up correction, and sales activity monitoring.' },
    { title: c.hero_step_4 || 'Conversion & Scaling', desc: c.hero_step_4_desc || 'Booking-focused optimization and revenue scaling based on real performance data.' },
  ];

  return (
    <div className="crm-page-wrap">
      {/* 1. Header */}
      <Header c={c} />

      {/* 2. Hero Section */}
      <section className="services-hub-hero">
        <div className="container">
          <div className="services-hub-hero-inner">
            <span className="section-tag">{c.howitworks_eyebrow || 'How It Works'}</span>
            <h1 className="services-hub-title">
              {c.system_heading_1 || 'A Complete Revenue & Sales System'}{' '}
              <span className="highlight">{c.system_heading_highlight || 'for Developers'}</span>
            </h1>
            <p className="services-hub-sub">
              {c.system_intro ||
                'We combine strategy, technology and execution to help real estate developers generate quality leads and close more deals.'}
            </p>

            <div className="services-hub-hero-ctas">
              <Link href="/contact" className="btn btn-solid">
                Apply for Project Review
              </Link>
              <Link href="/crm" className="btn btn-outline" style={{ background: '#fff' }}>
                See How CRM Works →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. System Flow Section */}
      <section className="section container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <span className="section-tag">System Architecture</span>
          <h2 style={{ fontSize: '32px' }}>The 4 Interconnected Pillars of Property Closings</h2>
          <p className="section-intro">
            Marketing alone does not sell projects. When buyer acquisition, CRM control, sales accountability, and deal closing work in sync, inventory sells predictably.
          </p>
        </div>

        <div className="process-row" style={{ opacity: 1, transform: 'none' }}>
          {flowSteps.map((step, i) => (
            <div className="process-item" key={i} style={{ opacity: 1, transform: 'none' }}>
              <div className="process-card">
                <div className="process-icon-badge">{step.icon}</div>
                <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="process-title">{step.title}</h3>
                <span className="process-accent"></span>
                <p className="process-desc">{step.desc}</p>
              </div>
              {i < flowSteps.length - 1 && (
                <div className="process-arrow">
                  <CurvedArrowIcon />
                  <span className="process-arrow-mobile"></span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="process-bottom-stat" style={{ marginTop: '40px' }}>
          <span className="process-bottom-line"></span>
          <span className="process-bottom-check">✓</span>
          <span className="process-bottom-text">
            {c.system_bottom_stat_1 || 'More Leads'} / {c.system_bottom_stat_2 || 'Better Follow-ups'} / {c.system_bottom_stat_3 || 'Higher Sales'}
          </span>
          <span className="process-bottom-line"></span>
        </div>
      </section>

      {/* 4. Step-by-Step Implementation Roadmap */}
      <section className="section container" style={{ paddingTop: '0' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <span className="section-tag">Implementation Steps</span>
          <h2 style={{ fontSize: '30px' }}>{c.howitworks_heading || 'Our working process.'}</h2>
          <p className="section-intro">
            From initial inventory review to scaling booked volume, here is how our team operates alongside yours.
          </p>
        </div>

        <div className="process-v2-wrap" style={{ opacity: 1, transform: 'none' }}>
          <div className="process-v2-line"></div>
          <div className="process-v2-steps">
            {processSteps.map((step, i) => (
              <div className="process-v2-step" key={i} style={{ opacity: 1, transform: 'none' }}>
                <div className={`process-v2-circle ${i === processSteps.length - 1 ? 'is-last' : ''}`}>{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Commercial Model Section */}
      <section className="section container" style={{ paddingTop: '0' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px auto' }}>
          <span className="section-tag">{c.model_eyebrow || 'Commercial Model'}</span>
          <h2 style={{ fontSize: '30px' }}>{c.model_heading || 'Retainer + Performance Structure'}</h2>
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

      {/* 6. FAQ Section */}
      <FAQ c={c} />

      {/* 7. Footer */}
      <Footer c={c} />
    </div>
  );
}
