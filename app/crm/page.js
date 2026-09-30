'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './crm.css';

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
  contact_phone: '+92 333 3401101',
  contact_email: 'contact@propkads.com',
  contact_location: 'Karachi, Pakistan',
  header_nav_1: 'About Us',
  header_nav_2: 'Services',
  header_nav_3: 'How It Works',
  header_nav_4: 'Contact',
};

const CRM_FAQS = [
  {
    q: 'Is Propkads CRM suitable for real estate marketing agencies as well as developers?',
    a: 'Yes, absolutely. The CRM supports multi-project management, dealer commissions, and lead pipelines suitable for both housing developers managing their own sales floor and marketing agencies selling inventory on contract.',
  },
  {
    q: 'How does the duplicate phone number detection work?',
    a: 'Whenever a lead is ingested via Facebook Ads, web forms, or manual entry, our system normalizes the Pakistani phone number and checks your database. If the phone already exists, it displays an alert with the assigned agent\'s name, preventing multiple agents from calling the same buyer.',
  },
  {
    q: 'Can sales representatives see other agents\' leads?',
    a: 'No. Sales representatives only have access to their assigned leads. They cannot view or export customer contact information assigned to other representatives, keeping your proprietary database secure.',
  },
  {
    q: 'Who has permission to enter new property bookings?',
    a: 'Only the Company Administrator has the permission to enter new property bookings and lock property unit status. Sales agents and external brokers have view-only rights to prevent unauthorized booking entries.',
  },
  {
    q: 'How quickly can our team get onboarded?',
    a: 'Your dedicated company workspace can be set up within 24 to 48 hours. We configure your projects, property inventory, and team accounts, followed by an onboarding walkthrough for your sales team.',
  },
];

export default function CRMProductPage() {
  const [c, setC] = useState(DEFAULT_CONTENT);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setC((prev) => ({ ...prev, ...d.content }));
      })
      .catch(() => {});
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div className="crm-page-wrap">
      {/* 1. Website Standard Header Navigation */}
      <Header />

      {/* 2. Hero Section */}
      <section className="crm-hero">
        <div className="crm-container">
          <div className="crm-hero-content">
            <h1 className="crm-hero-title">
              The Complete <span className="highlight">Sales CRM System</span> Built for Real Estate Teams
            </h1>

            <p className="crm-hero-sub">
              Capture leads from Facebook Ads, TikTok, and Web with automated duplicate phone detection, audit sales team call productivity in real time, lock property inventory, and manage deal pipeline — all purpose-built for Pakistani real estate developers and agencies.
            </p>

            <div className="crm-hero-actions">
              <a
                href="https://crm.propkads.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="crm-btn-primary-lg"
              >
                <span>Launch CRM Portal (Login)</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            <div className="crm-hero-badges">
              <div className="crm-badge-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Zero Duplicate Lead Leakage</span>
              </div>
              <div className="crm-badge-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Sales Team Call Productivity Audit</span>
              </div>
              <div className="crm-badge-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Admin-Restricted Property Bookings</span>
              </div>
              <div className="crm-badge-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Multi-Tenant Company Workspaces</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Capabilities (Bento Grid) */}
      <section className="crm-capabilities-section" id="features">
        <div className="crm-container">
          <div className="crm-section-header">
            <span className="crm-section-badge">Built For Real Estate</span>
            <h2 className="crm-section-title">Designed Around Real Estate Sales Operations</h2>
            <p className="crm-section-desc">
              Every tool and metric addresses real problems faced by Pakistani property developers and sales directors.
            </p>
          </div>

          <div className="crm-bento-grid">
            <div className="crm-bento-card">
              <div className="crm-bento-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <polyline points="16 11 18 13 22 9"></polyline>
                </svg>
              </div>
              <h3 className="crm-bento-title">Smart Ingestion &amp; Phone Deduplication</h3>
              <p className="crm-bento-desc">
                Sync buyer inquiries from Facebook Lead Ads, TikTok, and web forms automatically. Instant duplicate detection prevents reps from colliding over the same buyer.
              </p>
            </div>

            <div className="crm-bento-card">
              <div className="crm-bento-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="crm-bento-title">Sales Team Call &amp; Productivity Audit</h3>
              <p className="crm-bento-desc">
                Track total calls, answered rate, dead numbers, and response lag. Eliminate excuses and monitor daily activity with 100% transparency.
              </p>
            </div>

            <div className="crm-bento-card">
              <div className="crm-bento-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="crm-bento-title">Real-Time Agent Leaderboards</h3>
              <p className="crm-bento-desc">
                Rank your in-house sales agents and outside brokers by closed deals, qualified prospects, and response times to foster healthy sales floor competition.
              </p>
            </div>

            <div className="crm-bento-card">
              <div className="crm-bento-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                </svg>
              </div>
              <h3 className="crm-bento-title">Property Inventory Management</h3>
              <p className="crm-bento-desc">
                Manage society phases, residential properties, and commercial plazas. Lock property units in real-time as Available, Booked, or Sold to eliminate double bookings.
              </p>
            </div>

            <div className="crm-bento-card">
              <div className="crm-bento-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="crm-bento-title">Confirmed Bookings &amp; Deal Tracking</h3>
              <p className="crm-bento-desc">
                Admin-exclusive booking authority. Record verified property customer bookings, token advances, and down payments with protected role boundaries.
              </p>
            </div>

            <div className="crm-bento-card">
              <div className="crm-bento-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="crm-bento-title">Outside Dealers &amp; Commission Ledger</h3>
              <p className="crm-bento-desc">
                Onboard outside brokers, log client referrals, and calculate commission percentages automatically upon confirmed booking with an audit-ready payout ledger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strict Role-Based Permissions Section */}
      <section className="crm-roles-section" id="security">
        <div className="crm-container">
          <div className="crm-section-header">
            <span className="crm-section-badge">Data Protection</span>
            <h2 className="crm-section-title">Strict Role-Based Access Control</h2>
            <p className="crm-section-desc">
              Prevent lead theft and protect company records with isolated role boundaries.
            </p>
          </div>

          <div className="crm-roles-grid">
            <div className="crm-role-card">
              <span className="crm-role-badge crm-role-badge-admin">Full Executive Access</span>
              <h3 className="crm-role-title">Company Admin</h3>
              <p className="crm-role-desc">
                Exclusive authority to confirm bookings, lock property units, add team members, and view executive conversion reports.
              </p>
            </div>

            <div className="crm-role-card">
              <span className="crm-role-badge crm-role-badge-manager">Team Supervision</span>
              <h3 className="crm-role-title">Sales Manager</h3>
              <p className="crm-role-desc">
                Supervise lead distribution, assign inquiries to agents, monitor call volumes and response times, and review pipeline deal stages.
              </p>
            </div>

            <div className="crm-role-card">
              <span className="crm-role-badge crm-role-badge-sales">Assigned Focus</span>
              <h3 className="crm-role-title">Sales Representative</h3>
              <p className="crm-role-desc">
                Can only view and follow up on leads assigned to them. Cannot export customer phone numbers or create unauthorized bookings.
              </p>
            </div>

            <div className="crm-role-card">
              <span className="crm-role-badge crm-role-badge-dealer">Partner Portal</span>
              <h3 className="crm-role-title">Affiliate Dealer / Broker</h3>
              <p className="crm-role-desc">
                View available property units, submit buyer leads to lock commission attribution, and view verified payout statuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions (Matching Main Website Design) */}
      <section className="section container" id="faq" style={{ paddingBottom: '96px' }}>
        <div className="faq-v2-wrap">
          <div className="faq-v2-left">
            <div className="section-tag">FAQ</div>
            <h2>Frequently Asked Questions</h2>
            <p className="section-intro">
              Common questions about our real estate CRM system, lead tracking, permissions, and deployment.
            </p>
          </div>

          <div className="faq-v2-list in-view">
            {CRM_FAQS.map((f, i) => (
              <details className={`faq-v2-item faq-stagger-${i + 1}`} key={i} open={openFaq === i}>
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenFaq(openFaq === i ? -1 : i);
                  }}
                >
                  <span className="faq-v2-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="faq-v2-q">{f.q}</span>
                  <span className="faq-v2-icon">
                    <span className="plus">+</span>
                    <span className="minus">–</span>
                  </span>
                </summary>
                <div className="faq-v2-answer">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Website Standard Footer */}
      <Footer c={c} />
    </div>
  );
}
