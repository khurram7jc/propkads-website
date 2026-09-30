'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { DEFAULT_CONTENT } from '@/data/content';
import { UsersIcon, CrmDocIcon, TeamStarIcon, GrowthBarsIcon } from '@/components/Icons';
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

  // 4 Deep-Dive Operational Modules (Distinct from Homepage summary teaser)
  const architectureEngines = [
    {
      stepNum: '01',
      engine: 'Acquisition Engine',
      title: 'Targeted Buyer Acquisition & Lead Filtering',
      subtitle: 'Meta Ads, Google Search, YouTube & TikTok',
      icon: <UsersIcon />,
      desc: 'We launch precision-targeted ad funnels designed specifically for real estate investors and end-users, cutting through social noise to reach qualified capital.',
      features: [
        'Geographic & wealth-bracket targeting for overseas Pakistanis (GCC, UK, USA) and domestic HNWIs.',
        'In-funnel pre-qualification questionnaires filtering by purchase timeline, budget, and inventory type.',
        'Zero junk leads: verification mechanisms eliminate fake phone numbers before CRM ingestion.',
      ],
      kpi: '60–70% Verified Lead Qualification Rate',
    },
    {
      stepNum: '02',
      engine: 'Control Engine',
      title: 'Zero-Leakage CRM Routing & Lead Protection',
      subtitle: 'Propkads Proprietary Cloud CRM',
      icon: <CrmDocIcon />,
      desc: 'Inquiries never get lost in WhatsApp chats or exported to personal dealer files. Every lead is automatically captured, locked, and distributed in real time.',
      features: [
        'Sub-60-second round-robin distribution to active on-duty sales representatives.',
        'Automated Pakistani phone number deduplication — eliminating duplicate leads and agent conflict.',
        'Instant automated WhatsApp welcome sequence delivering digital brochures, video walkthroughs, and payment plans.',
      ],
      kpi: '< 5-Minute Initial Lead Touchpoint SLA',
    },
    {
      stepNum: '03',
      engine: 'Accountability Engine',
      title: 'Sales Team Performance Control & Daily Audits',
      subtitle: 'Enforcing Follow-up Rigor',
      icon: <TeamStarIcon />,
      desc: 'We bridge the classic disconnect between marketing spend and sales floor execution with complete executive visibility into daily agent productivity.',
      features: [
        'Live tracking of outbound call volume, conversation durations, and follow-up adherence.',
        'Milestone pipeline stages: Inquiry → Contacted → Qualified → Site Tour Scheduled → Token Advance.',
        'Weekly sales calibration audits reviewing lost leads, price objections, and agent pitch quality.',
      ],
      kpi: '100% Pipeline Visibility — Zero Excuses',
    },
    {
      stepNum: '04',
      engine: 'Closing Engine',
      title: 'Dynamic Inventory Locking & Booking Support',
      subtitle: 'Eliminating Friction at the Closing Table',
      icon: <GrowthBarsIcon />,
      desc: 'Our operational workflow coordinates directly with your site office to turn buyer intent into cleared bank deposits and signed agreements.',
      features: [
        'Live digital inventory board: society plots, commercial units, and apartments locked as Available, Reserved, or Booked in real time.',
        'Instant token deposit alerts, payment receipt generation, and installment schedule tracking.',
        'Site office sales enablement: luxury presentation decks, 3D walkthrough displays, and objection-handling scripts.',
      ],
      kpi: 'Zero Double-Booking Risk & Faster Token Clearance',
    },
  ];

  // 4-Phase Deployment Timeline
  const timelinePhases = [
    {
      phase: 'Phase 1',
      timeframe: 'Days 1–7',
      title: 'Project Audit & Buyer Profiling',
      desc: 'We analyze your unsold inventory, pricing competitiveness, installment plans, and competitor positioning. We define ideal buyer personas for local and overseas investor segments.',
      deliverables: ['Inventory Matrix Review', 'Buyer Demographic Persona', 'Competitor Benchmark Audit'],
    },
    {
      phase: 'Phase 2',
      timeframe: 'Days 8–14',
      title: 'CRM Setup & Campaign Launch',
      desc: 'We configure your private company CRM workspace, set up sales agent accounts, establish lead distribution rules, produce high-converting ad creative assets, and deploy campaigns live.',
      deliverables: ['Custom CRM Pipeline', 'Multi-Channel Ad Launch', 'WhatsApp Business Integration'],
    },
    {
      phase: 'Phase 3',
      timeframe: 'Days 15–30',
      title: 'Sales Floor Calibration & Lead Optimization',
      desc: 'Lead flow goes live. We enforce the sub-5-minute response SLA, monitor daily call duration logs, conduct weekly sales reviews, and optimize ad spend toward highest-converting audience clusters.',
      deliverables: ['Daily Agent Call Audits', 'A/B Creative Optimization', 'Site Visit Tracking System'],
    },
    {
      phase: 'Phase 4',
      timeframe: 'Days 31–90+',
      title: 'Predictable Scaling & Booking Acceleration',
      desc: 'With lead quality calibrated and sales follow-up disciplined, we scale marketing budgets profitably, conduct overseas investor webinar drives, and accelerate token booking velocity.',
      deliverables: ['Budget Scaling to Peak ROI', 'Overseas Buyer Drives', 'Executive Revenue Governance'],
    },
  ];

  return (
    <div className="crm-page-wrap">
      {/* 1. Header */}
      <Header c={c} />

      {/* 2. Hero Section */}
      <section className="services-hub-hero">
        <div className="container">
          <div className="services-hub-hero-inner">
            <span className="section-tag">{c.howitworks_eyebrow || 'How Propkads Operates'}</span>
            <h1 className="services-hub-title">
              A 4-Phase Revenue Engine <span className="highlight">Engineered to Move Inventory</span>
            </h1>
            <p className="services-hub-sub">
              We connect digital buyer acquisition, proprietary CRM lead routing, sales floor accountability, and deal closings into one seamless, measurable pipeline for real estate developers.
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

      {/* 3. Deep-Dive Operational Architecture (Replaces duplicate simple 4 cards) */}
      <section className="section container">
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag" style={{ margin: '0 auto 12px auto', display: 'inline-block', textAlign: 'center' }}>
            System Architecture
          </span>
          <h2 style={{ fontSize: '32px', textAlign: 'center', margin: '0 auto 14px auto', maxWidth: '100%' }}>
            How the 4 Interconnected Engines Drive Developer Bookings
          </h2>
          <p className="section-intro" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '660px' }}>
            Traditional marketing fails because advertising agencies stop at the click. Propkads controls every critical friction point between digital spend and cleared bank deposits.
          </p>
        </div>

        {/* 2x2 Rich Architecture Modules */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginTop: '20px',
          }}
        >
          {architectureEngines.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--line)',
                borderRadius: '20px',
                padding: '30px 26px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 24px rgba(20, 22, 26, 0.04)',
                position: 'relative',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {/* Badge & Step */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'var(--green-tint)',
                      color: 'var(--green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--green)',
                    }}
                  >
                    {item.engine}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: '800',
                    color: 'var(--slate)',
                    background: 'var(--paper-dim)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                  }}
                >
                  Step {item.stepNum}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 style={{ fontSize: '19px', fontWeight: '800', color: 'var(--ink)', marginBottom: '4px', lineHeight: '1.3' }}>
                {item.title}
              </h3>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--green)', marginBottom: '12px', display: 'block' }}>
                {item.subtitle}
              </span>

              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: '1.65', marginBottom: '16px' }}>
                {item.desc}
              </p>

              {/* Mechanism Checklist */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {item.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: '1.5' }}>
                    <span style={{ color: 'var(--green)', fontWeight: '800', flexShrink: 0 }}>✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* KPI Pill */}
              <div
                style={{
                  marginTop: 'auto',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'var(--green-tint)',
                  border: '1px solid rgba(15, 138, 64, 0.15)',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  color: 'var(--green)',
                }}
              >
                {item.kpi}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Step-by-Step Implementation Roadmap */}
      <section className="section container" style={{ paddingTop: '20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag" style={{ margin: '0 auto 12px auto', display: 'inline-block', textAlign: 'center' }}>
            Implementation Roadmap
          </span>
          <h2 style={{ fontSize: '30px', textAlign: 'center', margin: '0 auto 14px auto', maxWidth: '100%' }}>
            From Project Audit to Booking Velocity: A 90-Day Plan
          </h2>
          <p className="section-intro" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '660px' }}>
            From initial inventory review to scaling booked volume, here is how our revenue team operates alongside yours.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          {timelinePhases.map((phase, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--line)',
                borderRadius: '18px',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--green)',
                    background: 'var(--green-tint)',
                    padding: '3px 10px',
                    borderRadius: '6px',
                  }}
                >
                  {phase.phase}
                </span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--slate)' }}>{phase.timeframe}</span>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--ink)', marginBottom: '10px' }}>
                {phase.title}
              </h3>

              <p style={{ fontSize: '13.5px', color: 'var(--slate)', lineHeight: '1.6', marginBottom: '16px' }}>
                {phase.desc}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
                  Key Deliverables:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {phase.deliverables.map((del, dIdx) => (
                    <span key={dIdx} style={{ fontSize: '12.5px', color: 'var(--slate)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--green)' }}></span>
                      {del}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Commercial Model Section */}
      <section className="section container" style={{ paddingTop: '20px' }}>
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
              <p>{c.model_retainer_desc || 'Monthly retainer based on project scope and sales support requirements'}</p>
            </div>
            <div className="model-panel-card">
              <span className="tag">{c.model_performance_label || 'Performance'}</span>
              <p>{c.model_performance_desc || 'Plus per-booking incentive or mutually agreed revenue share milestone'}</p>
            </div>
          </div>

          <p className="model-panel-tagline">{c.commercial_model_tagline || 'We earn more only when you sell more.'}</p>
          <span className="model-panel-min">{c.model_min_engagement || 'Minimum engagement period: 60–90 days'}</span>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <FAQ c={c} />

      {/* 7. CTA Banner */}
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

      {/* 8. Footer */}
      <Footer c={c} />
    </div>
  );
}
