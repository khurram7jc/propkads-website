'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
      title: c.about_card_1_title || 'Our Approach',
      bullets: (c.about_card_1_bullets || '').split('\n').filter(Boolean),
      note: c.about_card_1_note,
    },
    {
      title: c.about_card_2_title || 'Why Propkads Exists',
      bullets: (c.about_card_2_bullets || '').split('\n').filter(Boolean),
      note: c.about_card_2_note,
    },
    {
      title: c.about_card_3_title || 'What Makes Us Different',
      bullets: (c.about_card_3_bullets || '').split('\n').filter(Boolean),
      note: c.about_card_3_note,
    },
  ];

  const problems = [c.pos_problem_1, c.pos_problem_2, c.pos_problem_3, c.pos_problem_4].filter(Boolean);
  const solutions = [c.pos_solution_1, c.pos_solution_2, c.pos_solution_3, c.pos_solution_4].filter(Boolean);

  const yesItems = [c.fit_yes_1, c.fit_yes_2, c.fit_yes_3].filter(Boolean);
  const noItems = [c.fit_no_1, c.fit_no_2, c.fit_no_3].filter(Boolean);

  return (
    <div className="crm-page-wrap">
      {/* 1. Header */}
      <Header c={c} />

      {/* 2. Hero Section */}
      <section className="services-hub-hero">
        <div className="container">
          <div className="services-hub-hero-inner">
            <span className="section-tag">{c.about_eyebrow || 'About Propkads'}</span>
            <h1 className="services-hub-title">
              {c.about_heading || 'A sales-driven real estate growth partner.'}
            </h1>
            <div className="about-v2-intro" style={{ margin: '20px auto 32px auto', maxWidth: '820px', textAlign: 'left' }}>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--ink)' }}>{c.about_lead_1}</p>
              <p style={{ fontSize: '15.5px', lineHeight: '1.7', color: 'var(--slate)' }}>{c.about_lead_2}</p>
              <p style={{ fontSize: '15.5px', lineHeight: '1.7', color: 'var(--slate)' }}>{c.about_lead_3}</p>
            </div>

            <div className="services-hub-hero-ctas">
              <Link href="/contact" className="btn btn-solid">
                Get a Free Project Review
              </Link>
              <Link href="/services" className="btn btn-outline" style={{ background: '#fff' }}>
                Explore All 12 Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Core Pillars */}
      <section className="section container">
        <div className="about-cards-v3" style={{ opacity: 1, transform: 'none' }}>
          {cards.map((card, i) => (
            <div className="about-card-v3" key={i} style={{ opacity: 1, transform: 'none' }}>
              <div className="about-card-v3-badge">{String(i + 1).padStart(2, '0')}</div>
              <h3>{card.title}</h3>
              <ul>
                {card.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              {card.note && <p className="about-card-v3-note">{card.note}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* 4. Strategic Positioning: Struggle vs Solution */}
      <section className="section container" style={{ paddingTop: '0' }}>
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag" style={{ display: 'inline-block', margin: '0 auto 10px auto', textAlign: 'center' }}>
            {c.pos_eyebrow || 'Positioning'}
          </span>
          <h2 style={{ fontSize: '32px', textAlign: 'center', margin: '0 auto', maxWidth: '100%' }}>
            {c.pos_heading || 'Built for Real Estate Developers — Designed for Closings'}
          </h2>
          <p className="section-intro" style={{ textAlign: 'center', margin: '14px auto 0 auto', maxWidth: '640px' }}>
            {c.pos_intro ||
              'Propkads is not a traditional marketing agency. We build and operate a sales-focused revenue system that connects buyer acquisition, CRM control, and sales team accountability.'}
          </p>
        </div>

        <div className="fit-grid-v2" style={{ opacity: 1, transform: 'none' }}>
          <div className="fit-card-v2 no" style={{ opacity: 1, transform: 'none' }}>
            <h3>{c.pos_problem_label || 'Why Most Projects Struggle to Sell'}</h3>
            <ul>
              {problems.map((item, i) => (
                <li key={i}>
                  <span className="fit-card-v2-icon">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="fit-card-v2 yes" style={{ opacity: 1, transform: 'none' }}>
            <h3>{c.pos_solution_label || 'What Propkads Changes'}</h3>
            <ul>
              {solutions.map((item, i) => (
                <li key={i}>
                  <span className="fit-card-v2-icon">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="callout" style={{ marginTop: '36px' }}>
          {c.pos_callout || 'Marketing alone does not sell projects — systems do.'}
        </p>
      </section>

      {/* 5. Ideal Client Fit */}
      <section className="section container" style={{ paddingTop: '0' }}>
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag" style={{ display: 'inline-block', margin: '0 auto 10px auto', textAlign: 'center' }}>
            {c.fit_eyebrow || 'Ideal Client Fit'}
          </span>
          <h2 style={{ fontSize: '30px', textAlign: 'center', margin: '0 auto', maxWidth: '100%' }}>
            {c.fit_heading || 'Who we work best with.'}
          </h2>
        </div>

        <div className="fit-grid-v2" style={{ opacity: 1, transform: 'none' }}>
          <div className="fit-card-v2 yes" style={{ opacity: 1, transform: 'none' }}>
            <h3>{c.fit_yes_label || 'Best Fit For'}</h3>
            <ul>
              {yesItems.map((item, i) => (
                <li key={i}>
                  <span className="fit-card-v2-icon">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="fit-card-v2 no" style={{ opacity: 1, transform: 'none' }}>
            <h3>{c.fit_no_label || 'Not a Fit For'}</h3>
            <ul>
              {noItems.map((item, i) => (
                <li key={i}>
                  <span className="fit-card-v2-icon">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <div className="container" style={{ margin: '16px auto 32px auto' }}>
        <div className="services-hub-banner" style={{ marginTop: '0' }}>
          <div>
            <h4>Partner with a Real Estate Sales Growth Agency</h4>
            <p>Ready to move unsold inventory and get 100% visibility into your sales team&apos;s daily activity?</p>
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
