'use client';

import { useState } from 'react';
import Link from 'next/link';
import './crm.css';

export default function CRMProductPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div className="crm-page-wrap">
      {/* 1. Header Navigation */}
      <nav className="crm-nav">
        <div className="crm-nav-inner">
          <Link href="/" className="crm-nav-brand">
            <img src="/logo.png" alt="Propkads" />
            <span className="crm-nav-badge">Sales CRM System</span>
          </Link>

          <div className="crm-nav-links">
            <a href="#features">Features</a>
            <a href="#preview">Interactive Preview</a>
            <a href="#recovery">Installment Recovery</a>
            <a href="#security">Permissions</a>
            <a href="#pricing">Pricing Plans</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="crm-nav-actions">
            <Link href="/" className="crm-btn-subtle">
              ← Main Site
            </Link>
            <a
              href="https://crm.propkads.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="crm-btn-login"
            >
              <span>Login to CRM</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="crm-hero">
        <div className="crm-hero-container">
          <div className="crm-pill">
            <span className="crm-pulse-dot"></span>
            <span>Cloud Operating Platform For Real Estate Developers & Agencies</span>
          </div>

          <h1 className="crm-hero-title">
            The Complete <span className="highlight">Sales CRM &amp; Recovery</span> System Built for Real Estate
          </h1>

          <p className="crm-hero-sub">
            Capture every buyer inquiry with zero duplicate leakage, lock plot bookings with official legal allotment letters, track 36-month installment aging buckets, and manage isolated multi-tenant team workspaces — all from one unified cloud platform.
          </p>

          <div className="crm-hero-ctas">
            <a
              href="https://crm.propkads.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="crm-btn-primary"
            >
              <span>Launch CRM Portal (Login)</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            <a
              href="https://wa.me/923332000649?text=Hello%20Propkads,%20I%20am%20interested%20in%20a%20demo%20of%20the%20Propkads%20Real%20Estate%20Sales%20CRM%20System."
              target="_blank"
              rel="noopener noreferrer"
              className="crm-btn-subtle"
              style={{ padding: '12px 22px', fontSize: '14px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/>
              </svg>
              <span>Schedule Live Demo / WhatsApp</span>
            </a>
          </div>

          <div className="crm-hero-trust">
            <span>🛡️ 100% Multi-Tenant Isolation</span>
            <span>📄 Official Allotment Letters</span>
            <span>⏳ Installment Aging &amp; Recovery</span>
            <span>👥 Role-Based Security Matrix</span>
            <span>⚡ Instant Cloud Access</span>
          </div>
        </div>
      </section>

      {/* 3. Interactive Live Showcase Stage (Propwise-style window) */}
      <section className="crm-stage-wrap" id="preview">
        <div className="crm-stage-card">
          {/* Top Window Chrome */}
          <div className="crm-stage-header">
            <div className="crm-window-dots">
              <i></i><i></i><i></i>
            </div>
            <div className="crm-stage-url">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>https://crm.propkads.com</span>
            </div>
            <div className="crm-live-badge">
              <span className="crm-pulse-dot"></span>
              <span>Live System</span>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="crm-stage-tabs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`crm-stage-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            >
              <span className="tab-indicator"></span>
              <span>📊 Executive Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('kanban')}
              className={`crm-stage-tab-btn ${activeTab === 'kanban' ? 'active' : ''}`}
            >
              <span className="tab-indicator"></span>
              <span>🎯 Visual Leads Kanban</span>
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`crm-stage-tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            >
              <span className="tab-indicator"></span>
              <span>🗺️ Project &amp; Plot Inventory</span>
            </button>
            <button
              onClick={() => setActiveTab('allotment')}
              className={`crm-stage-tab-btn ${activeTab === 'allotment' ? 'active' : ''}`}
            >
              <span className="tab-indicator"></span>
              <span>📜 Allotment Letter &amp; Receipts</span>
            </button>
            <button
              onClick={() => setActiveTab('recovery')}
              className={`crm-stage-tab-btn ${activeTab === 'recovery' ? 'active' : ''}`}
            >
              <span className="tab-indicator"></span>
              <span>⏳ Recovery &amp; Aging Engine</span>
            </button>
            <button
              onClick={() => setActiveTab('superadmin')}
              className={`crm-stage-tab-btn ${activeTab === 'superadmin' ? 'active' : ''}`}
            >
              <span className="tab-indicator"></span>
              <span>👑 Multi-Tenant SaaS Hub</span>
            </button>
          </div>

          {/* Screen Content by Tab */}
          <div className="crm-screen-body">
            {/* TAB 1: EXECUTIVE DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div>
                <div className="crm-dash-kpis">
                  <div className="crm-kpi-card">
                    <div className="crm-kpi-label">Total Active Inquiries</div>
                    <div className="crm-kpi-val">106 Leads</div>
                    <div className="crm-kpi-delta crm-delta-up">↗ +14.2% this month</div>
                  </div>
                  <div className="crm-kpi-card">
                    <div className="crm-kpi-label">Active Pipeline Value</div>
                    <div className="crm-kpi-val">PKR 34.8 Cr</div>
                    <div className="crm-kpi-delta crm-delta-up">↗ 19 High-intent deals</div>
                  </div>
                  <div className="crm-kpi-card">
                    <div className="crm-kpi-label">Units Booked (Revenue)</div>
                    <div className="crm-kpi-val">PKR 7.85 Cr</div>
                    <div className="crm-kpi-delta crm-delta-up">↗ 14 Bookings locked</div>
                  </div>
                  <div className="crm-kpi-card">
                    <div className="crm-kpi-label">Installment Recovery Rate</div>
                    <div className="crm-kpi-val">94.8%</div>
                    <div className="crm-kpi-delta crm-delta-amber">⏳ PKR 2.4M overdue aging</div>
                  </div>
                </div>

                <div className="crm-screen-grid">
                  <div className="crm-card-panel">
                    <div className="crm-panel-head">
                      <div>
                        <div className="crm-panel-title">Sales Pipeline Conversion Funnel</div>
                        <div className="crm-panel-sub">Real-time velocity from digital ad lead to customer token deposit</div>
                      </div>
                      <span className="crm-tag crm-tag-web">Live Pipeline</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '6px' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                          <span style={{ color: '#E2E8F0', fontWeight: '600' }}>New Inquiries</span>
                          <span style={{ color: '#94A3B8' }}>38 Leads · PKR 11.4 Cr</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: '85%', height: '100%', background: '#3B82F6' }}></div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                          <span style={{ color: '#E2E8F0', fontWeight: '600' }}>Contacted &amp; Pitched</span>
                          <span style={{ color: '#94A3B8' }}>26 Leads · PKR 8.2 Cr</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: '60%', height: '100%', background: '#F59E0B' }}></div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                          <span style={{ color: '#E2E8F0', fontWeight: '600' }}>Site Visit Scheduled / Meeting</span>
                          <span style={{ color: '#94A3B8' }}>17 Leads · PKR 5.9 Cr</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: '42%', height: '100%', background: '#8B5CF6' }}></div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                          <span style={{ color: '#E2E8F0', fontWeight: '600' }}>Token Paid &amp; Booked (Won)</span>
                          <span style={{ color: '#4ADE80', fontWeight: '700' }}>14 Units · PKR 7.85 Cr</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: '28%', height: '100%', background: '#14A750' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="crm-card-panel">
                    <div className="crm-panel-head">
                      <div>
                        <div className="crm-panel-title">Recent Transactions</div>
                        <div className="crm-panel-sub">Audited booking log</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ padding: '8px 10px', background: '#1B2232', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '11px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#FFFFFF' }}>
                          <span>Plot # B-42 (10 Marla)</span>
                          <span style={{ color: '#4ADE80' }}>PKR 12.5M</span>
                        </div>
                        <div style={{ color: '#94A3B8', marginTop: '2px' }}>
                          Buyer: Sheikh Tariq · Down Payment Cleared
                        </div>
                      </div>

                      <div style={{ padding: '8px 10px', background: '#1B2232', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '11px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#FFFFFF' }}>
                          <span>Apt # 504 (Executive 2-Bed)</span>
                          <span style={{ color: '#4ADE80' }}>PKR 18.0M</span>
                        </div>
                        <div style={{ color: '#94A3B8', marginTop: '2px' }}>
                          Buyer: Dr. Ayesha Siddiqui · 36-Mo Installments
                        </div>
                      </div>

                      <div style={{ padding: '8px 10px', background: '#1B2232', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '11px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#FFFFFF' }}>
                          <span>Commercial # C-08</span>
                          <span style={{ color: '#4ADE80' }}>PKR 24.5M</span>
                        </div>
                        <div style={{ color: '#94A3B8', marginTop: '2px' }}>
                          Buyer: Malik Farhan · Token Paid
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: VISUAL LEADS KANBAN */}
            {activeTab === 'kanban' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF', margin: 0 }}>
                      Sales Opportunity Board (Zero Lead Leakage)
                    </h3>
                    <p style={{ fontSize: '11.5px', color: '#94A3B8', margin: '2px 0 0 0' }}>
                      Drag and drop stage progression with automated duplicate phone detection
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="crm-tag crm-tag-web">Active Deduplication ON</span>
                    <span className="crm-tag crm-tag-ref">Auto Round-Robin</span>
                  </div>
                </div>

                <div className="crm-kanban-cols">
                  {/* Col 1 */}
                  <div className="crm-kanban-col">
                    <div className="crm-kcol-title">
                      <span>New Leads</span>
                      <span className="crm-kcol-pill">24</span>
                    </div>
                    <div className="crm-lead-box">
                      <div className="crm-lead-name">Haji Muhammad Ashraf</div>
                      <div className="crm-lead-tagline">Budget: PKR 1.8 Cr · 1 Kanal Plot</div>
                      <div className="crm-lead-meta">
                        <span className="crm-tag crm-tag-fb">Facebook Ad</span>
                        <span style={{ color: '#94A3B8' }}>Assignee: Ali R.</span>
                      </div>
                    </div>
                    <div className="crm-lead-box">
                      <div className="crm-lead-name">Zubair Khan (Overseas)</div>
                      <div className="crm-lead-tagline">Budget: PKR 3.5 Cr · Luxury Apt</div>
                      <div className="crm-lead-meta">
                        <span className="crm-tag crm-tag-web">Website Form</span>
                        <span style={{ color: '#94A3B8' }}>Assignee: Usman S.</span>
                      </div>
                    </div>
                  </div>

                  {/* Col 2 */}
                  <div className="crm-kanban-col">
                    <div className="crm-kcol-title">
                      <span>Contacted</span>
                      <span className="crm-kcol-pill">18</span>
                    </div>
                    <div className="crm-lead-box">
                      <div className="crm-lead-name">Chaudhry Naveed</div>
                      <div className="crm-lead-tagline">Budget: PKR 2.4 Cr · Commercial Shop</div>
                      <div className="crm-lead-meta">
                        <span className="crm-tag crm-tag-ref">Broker Referral</span>
                        <span style={{ color: '#94A3B8' }}>Call Logged (10m)</span>
                      </div>
                    </div>
                    <div className="crm-lead-box">
                      <div className="crm-lead-name">Engr. Salman Raza</div>
                      <div className="crm-lead-tagline">Budget: PKR 95 Lac · 5 Marla Plot</div>
                      <div className="crm-lead-meta">
                        <span className="crm-tag crm-tag-fb">Facebook Ad</span>
                        <span style={{ color: '#4ADE80' }}>Brochure Sent</span>
                      </div>
                    </div>
                  </div>

                  {/* Col 3 */}
                  <div className="crm-kanban-col">
                    <div className="crm-kcol-title">
                      <span>Site Visit Planned</span>
                      <span className="crm-kcol-pill">12</span>
                    </div>
                    <div className="crm-lead-box" style={{ borderColor: 'rgba(139, 92, 246, 0.4)' }}>
                      <div className="crm-lead-name">Dr. Kamran Siddique</div>
                      <div className="crm-lead-tagline">Plot # 118, Block C · Tomorrow 3:00 PM</div>
                      <div className="crm-lead-meta">
                        <span className="crm-tag" style={{ background: '#8B5CF6', color: '#fff' }}>VIP Buyer</span>
                        <span style={{ color: '#FBBF24' }}>Site Tour Set</span>
                      </div>
                    </div>
                  </div>

                  {/* Col 4 */}
                  <div className="crm-kanban-col">
                    <div className="crm-kcol-title">
                      <span>Negotiation &amp; Token</span>
                      <span className="crm-kcol-pill">8</span>
                    </div>
                    <div className="crm-lead-box" style={{ borderColor: 'rgba(245, 158, 11, 0.4)' }}>
                      <div className="crm-lead-name">Mian Tahir Mehmood</div>
                      <div className="crm-lead-tagline">Plot # B-42 · PKR 1.25 Cr Finalizing</div>
                      <div className="crm-lead-meta">
                        <span className="crm-tag" style={{ background: '#F59E0B', color: '#fff' }}>Token Expected</span>
                        <span style={{ color: '#4ADE80' }}>Token Slip Drafted</span>
                      </div>
                    </div>
                  </div>

                  {/* Col 5 */}
                  <div className="crm-kanban-col">
                    <div className="crm-kcol-title">
                      <span>Closed Won (Booked)</span>
                      <span className="crm-kcol-pill">14</span>
                    </div>
                    <div className="crm-lead-box" style={{ borderColor: 'rgba(20, 167, 80, 0.6)', background: '#12251D' }}>
                      <div className="crm-lead-name">Sheikh Tariq Mehmood</div>
                      <div className="crm-lead-tagline">BK-2026-004 · Down Payment Paid</div>
                      <div className="crm-lead-meta">
                        <span className="crm-tag crm-tag-web">Allotment Issued</span>
                        <span style={{ color: '#4ADE80', fontWeight: '700' }}>PKR 1.25 Cr</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PROJECT & PLOT INVENTORY */}
            {activeTab === 'inventory' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF', margin: 0 }}>
                      Live Project Master Inventory (Plots &amp; Units)
                    </h3>
                    <p style={{ fontSize: '11.5px', color: '#94A3B8', margin: '2px 0 0 0' }}>
                      Instant unit locking with Corner, Boulevard &amp; Park-Facing attribute pricing
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#14A750' }}></span> Available (68)
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#F59E0B' }}></span> Booked (18)
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#EF4444' }}></span> Sold (42)
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px', padding: '16px', background: '#151B27', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {[
                    { num: 'P-101', type: '10 Marla', status: 'Available', color: '#14A750', badge: 'Corner' },
                    { num: 'P-102', type: '10 Marla', status: 'Booked', color: '#F59E0B', badge: 'Boulevard' },
                    { num: 'P-103', type: '10 Marla', status: 'Sold', color: '#EF4444', badge: 'Standard' },
                    { num: 'P-104', type: '1 Kanal', status: 'Available', color: '#14A750', badge: 'Park Facing' },
                    { num: 'P-105', type: '1 Kanal', status: 'Sold', color: '#EF4444', badge: 'Corner' },
                    { num: 'P-106', type: '5 Marla', status: 'Available', color: '#14A750', badge: 'Standard' },
                    { num: 'P-107', type: '5 Marla', status: 'Available', color: '#14A750', badge: 'West Open' },
                    { num: 'P-108', type: '5 Marla', status: 'Booked', color: '#F59E0B', badge: 'Standard' },
                    { num: 'A-201', type: '2-Bed Apt', status: 'Available', color: '#14A750', badge: 'Floor 2' },
                    { num: 'A-202', type: '3-Bed Pent', status: 'Sold', color: '#EF4444', badge: 'Floor 5' },
                    { num: 'C-01', type: 'Comm Shop', status: 'Available', color: '#14A750', badge: 'Main Road' },
                    { num: 'C-02', type: 'Comm Shop', status: 'Booked', color: '#F59E0B', badge: 'Corner' },
                  ].map((unit, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 10px',
                        background: '#1D2536',
                        borderRadius: '10px',
                        border: `1.5px solid ${unit.color}`,
                        textAlign: 'center',
                        position: 'relative',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>{unit.num}</div>
                      <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>{unit.type}</div>
                      <div style={{ fontSize: '9px', fontWeight: '700', color: unit.color, marginTop: '4px', textTransform: 'uppercase' }}>
                        {unit.status}
                      </div>
                      <div style={{ fontSize: '8.5px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', padding: '2px 4px', color: '#CBD5E1', marginTop: '6px' }}>
                        {unit.badge}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: ALLOTMENT LETTER & RECEIPTS */}
            {activeTab === 'allotment' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
                <div style={{ background: '#FFFFFF', color: '#0F172A', padding: '24px', borderRadius: '14px', border: '1px solid #CBD5E1', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0F172A', paddingBottom: '12px', marginBottom: '14px' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '900', letterSpacing: '0.04em' }}>PROPKADS REAL ESTATE &amp; DEVELOPERS</div>
                      <div style={{ fontSize: '10px', color: '#64748B' }}>Treasury &amp; Allotment Wing • Main Boulevard, Gulberg, Lahore</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: '#14A750' }}>OFFICIAL ALLOTMENT LETTER</div>
                      <div style={{ fontSize: '10px', color: '#64748B' }}>Ref: BK-2026-004</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px', lineHeight: '1.7' }}>
                    <p><b>Customer Name:</b> Sheikh Tariq Mehmood</p>
                    <p><b>CNIC:</b> 35202-8947219-1 &nbsp;|&nbsp; <b>Phone:</b> +92 300 8472910</p>
                    <p><b>Allotted Inventory:</b> Plot # B-42, Block C (10 Marla Residential Corner)</p>
                    <p><b>Total Value:</b> PKR 12,500,000 &nbsp;|&nbsp; <b>Down Payment:</b> PKR 2,500,000 (Cleared)</p>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px dashed #CBD5E1', marginBottom: '16px', fontSize: '10px', color: '#475569' }}>
                    * This allotment is confirmed upon realization of the down payment voucher. Subject to building bylaws and timely installment installments.
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #E2E8F0', fontSize: '10px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: '120px', borderBottom: '1px solid #64748B', height: '24px', margin: '0 auto 4px' }}></div>
                      <span>Allottee Signature</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: '120px', borderBottom: '1px solid #14A750', height: '24px', margin: '0 auto 4px' }}></div>
                      <span style={{ color: '#14A750', fontWeight: '700' }}>✓ Official Registrar Stamp</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="crm-card-panel">
                    <div className="crm-panel-title">🖨️ 1-Click Print &amp; PDF Generation</div>
                    <p style={{ fontSize: '12.5px', color: '#94A3B8', marginTop: '6px', lineHeight: '1.5' }}>
                      Both <b>Allotment Letters</b> and <b>Electronic Payment Receipt Vouchers</b> are generated with instant print layouts, system barcode tracking, and your agency branding.
                    </p>
                  </div>

                  <div className="crm-card-panel">
                    <div className="crm-panel-title">🛡️ Admin-Only Security Lock</div>
                    <p style={{ fontSize: '12.5px', color: '#94A3B8', marginTop: '6px', lineHeight: '1.5' }}>
                      Sales agents and dealers have <i>View-Only</i> access. Only authorized Company Admins can book units or print binding allotment vouchers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: INSTALLMENT RECOVERY & AGING */}
            {activeTab === 'recovery' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF', margin: 0 }}>
                      Propkads Recovery &amp; Installment Aging Matrix
                    </h3>
                    <p style={{ fontSize: '11.5px', color: '#94A3B8', margin: '2px 0 0 0' }}>
                      Track 12, 24, and 36-month payment plans, overdue accounts, and defaulters
                    </p>
                  </div>
                  <span className="crm-tag" style={{ background: '#EF4444', color: '#fff' }}>Aging Audit Engine</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
                  <div style={{ background: '#12251D', border: '1px solid rgba(20, 167, 80, 0.4)', padding: '14px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#4ADE80', fontWeight: '700' }}>Current Due</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', marginTop: '4px' }}>PKR 14,250,000</div>
                    <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>24 Accounts on track</div>
                  </div>

                  <div style={{ background: '#252112', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '14px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#FBBF24', fontWeight: '700' }}>1 - 30 Days Overdue</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', marginTop: '4px' }}>PKR 1,840,000</div>
                    <div style={{ fontSize: '10px', color: '#FBBF24', marginTop: '2px' }}>4 Friendly Reminders sent</div>
                  </div>

                  <div style={{ background: '#2D1D16', border: '1px solid rgba(234, 88, 12, 0.4)', padding: '14px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#FB923C', fontWeight: '700' }}>31 - 60 Days Overdue</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', marginTop: '4px' }}>PKR 950,000</div>
                    <div style={{ fontSize: '10px', color: '#FB923C', marginTop: '2px' }}>2 Warning letters issued</div>
                  </div>

                  <div style={{ background: '#2A1315', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '14px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#F87171', fontWeight: '700' }}>60+ Days Defaulters</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', marginTop: '4px' }}>PKR 650,000</div>
                    <div style={{ fontSize: '10px', color: '#F87171', marginTop: '2px' }}>Penal charges calculated</div>
                  </div>
                </div>

                <div className="crm-card-panel">
                  <div className="crm-panel-title">Defaulter Action Queue &amp; WhatsApp Reminders</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#19202E', borderRadius: '8px', fontSize: '11.5px' }}>
                      <div>
                        <span style={{ fontWeight: '700', color: '#FFFFFF' }}>Mian Waqas</span> — Plot # 89 (PKR 150,000 Due)
                        <span style={{ color: '#F87171', marginLeft: '10px', fontSize: '10px', fontWeight: '600' }}>● 45 Days Overdue</span>
                      </div>
                      <a href="https://wa.me/" className="crm-btn-subtle" style={{ padding: '4px 10px', fontSize: '10px' }}>
                        Send WhatsApp Voucher ↗
                      </a>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#19202E', borderRadius: '8px', fontSize: '11.5px' }}>
                      <div>
                        <span style={{ fontWeight: '700', color: '#FFFFFF' }}>Rana Imran</span> — Apt # 302 (PKR 250,000 Due)
                        <span style={{ color: '#FBBF24', marginLeft: '10px', fontSize: '10px', fontWeight: '600' }}>● 18 Days Overdue</span>
                      </div>
                      <a href="https://wa.me/" className="crm-btn-subtle" style={{ padding: '4px 10px', fontSize: '10px' }}>
                        Send WhatsApp Reminder ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: MULTI-TENANT SUPER ADMIN */}
            {activeTab === 'superadmin' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF', margin: 0 }}>
                      👑 SaaS Super Admin Management Portal
                    </h3>
                    <p style={{ fontSize: '11.5px', color: '#94A3B8', margin: '2px 0 0 0' }}>
                      Register client real estate companies, monitor Monthly Recurring Revenue (MRR), and inspect tenant workspaces
                    </p>
                  </div>
                  <span className="crm-tag crm-tag-ref">Platform Owner Access</span>
                </div>

                <div className="crm-dash-kpis">
                  <div className="crm-kpi-card">
                    <div className="crm-kpi-label">Active Subscriber Companies</div>
                    <div className="crm-kpi-val">12 Companies</div>
                    <div className="crm-kpi-delta crm-delta-up">↗ 100% Data isolation</div>
                  </div>
                  <div className="crm-kpi-card">
                    <div className="crm-kpi-label">Monthly Recurring Revenue (MRR)</div>
                    <div className="crm-kpi-val">PKR 420,000/mo</div>
                    <div className="crm-kpi-delta crm-delta-up">↗ Predictable SaaS cashflow</div>
                  </div>
                  <div className="crm-kpi-card">
                    <div className="crm-kpi-label">Total Platform Users</div>
                    <div className="crm-kpi-val">84 Agents</div>
                    <div className="crm-kpi-delta crm-delta-up">Across 12 brokerages</div>
                  </div>
                </div>

                <div className="crm-card-panel">
                  <div className="crm-panel-title">Registered Subscriber Workspaces</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    {[
                      { name: 'Propkads Real Estate & Developers', plan: 'Enterprise (Master)', users: '13 / 50', status: 'Active' },
                      { name: 'Al-Haram Properties & Builders', plan: 'Pro Plan', users: '9 / 15', status: 'Active' },
                      { name: 'Crown Estate Marketing', plan: 'Starter Plan', users: '4 / 5', status: 'Active' },
                    ].map((co, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#19202E', borderRadius: '8px', fontSize: '11.5px' }}>
                        <div>
                          <span style={{ fontWeight: '700', color: '#FFFFFF' }}>{co.name}</span>
                          <span style={{ color: '#94A3B8', marginLeft: '12px' }}>{co.plan} · {co.users} Seats</span>
                        </div>
                        <span className="crm-tag crm-tag-web">{co.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Bento Grid: Core Capabilities */}
      <section className="crm-bento-section" id="features">
        <div className="crm-sec-header">
          <div className="crm-sec-tag">BUILT FOR REAL ESTATE OPERATIONS</div>
          <h2 className="crm-sec-title">Everything Developers &amp; Agencies Need to Sell Fast</h2>
          <p className="crm-sec-desc">
            Unlike generic CRMs like HubSpot or Salesforce that require months of custom code, Propkads CRM is purpose-built for the Pakistani real estate lifecycle — from digital ad leads to possession handover.
          </p>
        </div>

        <div className="crm-bento-grid">
          {/* Card 1: Lead Pipeline & Deduplication */}
          <div className="crm-bento-card">
            <div>
              <div className="crm-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="crm-bento-title">Smart Leads &amp; Zero Duplicate Leakage</h3>
              <p className="crm-bento-desc">
                Instantly ingest leads from Facebook Ads, web portals, and referrals. Automated duplicate phone validation flags repeat inquiries, preventing multiple reps from fighting over the same client.
              </p>
            </div>
            <div className="crm-bento-preview">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: '700', color: '#0F172A' }}>
                <span>Phone Match Detected</span>
                <span className="crm-tag" style={{ background: '#FEF3C7', color: '#92400E' }}>Deduplicated</span>
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '4px' }}>
                Linked to Existing Profile: Malik Farhan (Assigned to Usman S.)
              </div>
            </div>
          </div>

          {/* Card 2: Installment Aging & Default Tracking (Hero Feature) */}
          <div className="crm-bento-card span-2" id="recovery">
            <div>
              <div className="crm-card-icon-wrap" style={{ background: '#FEF3C7', color: '#D97706' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className="crm-bento-title">36-Month Installment Schedule &amp; Aging Buckets</h3>
              <p className="crm-bento-desc">
                The biggest headache for project developers is tracking late installments. Our engine classifies receivables into 1–30 days, 31–60 days, and 60+ days aging buckets with automated penalty calculations and one-click WhatsApp reminder vouchers.
              </p>
            </div>
            <div className="crm-bento-preview">
              <div className="crm-aging-bucket-row">
                <span><b>Current Due</b> (Due this month)</span>
                <span className="crm-bucket-badge crm-bucket-normal">94.8% Realized</span>
              </div>
              <div className="crm-aging-bucket-row">
                <span><b>1–30 Days Overdue</b> (Friendly WhatsApp Notice)</span>
                <span className="crm-bucket-badge crm-bucket-warning">PKR 1,840,000 Due</span>
              </div>
              <div className="crm-aging-bucket-row">
                <span><b>60+ Days Defaulters</b> (Penalties &amp; Legal Notices)</span>
                <span className="crm-bucket-badge crm-bucket-danger">Defaulter Warning</span>
              </div>
            </div>
          </div>

          {/* Card 3: Project & Plot Inventory Engine */}
          <div className="crm-bento-card">
            <div>
              <div className="crm-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </div>
              <h3 className="crm-bento-title">Plot &amp; Unit Inventory Management</h3>
              <p className="crm-bento-desc">
                Manage multiple housing societies, commercial plazas, and apartment towers. Color-coded status updates in real-time so your sales team never double-books an inventory unit.
              </p>
            </div>
            <div className="crm-bento-preview" style={{ fontSize: '11.5px', color: '#475569' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Corner / Boulevard Markup:</span>
                <b style={{ color: '#14A750' }}>+10% Auto Applied</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Status:</span>
                <span className="crm-tag crm-tag-web">Live Availability</span>
              </div>
            </div>
          </div>

          {/* Card 4: Official White-Labeled Documents */}
          <div className="crm-bento-card">
            <div>
              <div className="crm-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h3 className="crm-bento-title">Official Allotment Letters &amp; Receipts</h3>
              <p className="crm-bento-desc">
                Produce professional, bank-ready PDF documents featuring your company logo, address, NTN number, and authorized cashier stamps on the fly.
              </p>
            </div>
            <div className="crm-bento-preview" style={{ fontSize: '11px', color: '#475569' }}>
              ✓ Barcoded verification &nbsp;•&nbsp; ✓ Customer CNIC &nbsp;•&nbsp; ✓ Cashier Stamp
            </div>
          </div>

          {/* Card 5: External Dealer & Commission Management */}
          <div className="crm-bento-card">
            <div>
              <div className="crm-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M19 8v6M22 11h-6"/>
                </svg>
              </div>
              <h3 className="crm-bento-title">Dealers &amp; Broker Commission Tracking</h3>
              <p className="crm-bento-desc">
                Register outside estate brokers, affiliate agencies, and in-house sales agents. Automatically compute commission percentages (%) upon booking confirmation with transparent payout audit records.
              </p>
            </div>
            <div className="crm-bento-preview" style={{ fontSize: '11.5px', color: '#475569' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Broker Split (1.5%):</span>
                <b style={{ color: '#0F172A' }}>PKR 187,500</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Role-Based Access Control Section */}
      <section className="crm-bento-section" style={{ paddingTop: 0 }} id="security">
        <div style={{ background: '#0F172A', color: '#FFFFFF', padding: '48px', borderRadius: '24px', border: '1px solid #1E293B' }}>
          <div style={{ maxWidth: '680px', marginBottom: '36px' }}>
            <span className="crm-tag crm-tag-web" style={{ marginBottom: '10px' }}>ENTERPRISE GOVERNANCE</span>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#FFFFFF', margin: '10px 0 12px 0' }}>
              Strict Role-Based Security: Keep Your Data Protected
            </h2>
            <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: '1.6' }}>
              Sales reps must not steal company leads, and outside dealers must not view private financials. Propkads CRM enforces strict 4-tier role-based access control out of the box:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#1E293B', padding: '22px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#4ADE80', marginBottom: '8px' }}>1. Company Admin</div>
              <p style={{ fontSize: '12.5px', color: '#CBD5E1', lineHeight: '1.5' }}>
                Full executive control. Create bookings, issue allotment letters, print payment receipts, manage team members, and view cashflow analytics.
              </p>
            </div>

            <div style={{ background: '#1E293B', padding: '22px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#60A5FA', marginBottom: '8px' }}>2. Sales Manager</div>
              <p style={{ fontSize: '12.5px', color: '#CBD5E1', lineHeight: '1.5' }}>
                Team overview. Assign incoming leads, monitor sales agent response times, track scheduled follow-ups, and manage deal pipeline stages.
              </p>
            </div>

            <div style={{ background: '#1E293B', padding: '22px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#FBBF24', marginBottom: '8px' }}>3. Sales Person</div>
              <p style={{ fontSize: '12.5px', color: '#CBD5E1', lineHeight: '1.5' }}>
                Isolated focus. Reps can only view their own assigned leads. Cannot download full customer databases or issue binding legal letters.
              </p>
            </div>

            <div style={{ background: '#1E293B', padding: '22px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#C084FC', marginBottom: '8px' }}>4. Affiliate Dealer</div>
              <p style={{ fontSize: '12.5px', color: '#CBD5E1', lineHeight: '1.5' }}>
                External broker portal. Can see available inventory and submit buyer referrals to earn tracked commissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pricing & Subscription Plans */}
      <section className="crm-pricing-section" id="pricing">
        <div className="crm-sec-header">
          <div className="crm-sec-tag">SIMPLE MONTHLY PRICING</div>
          <h2 className="crm-sec-title">Transparent Plans Built for Real Estate Teams</h2>
          <p className="crm-sec-desc">
            Choose the capacity that matches your agency or developer project. Scale your seats and projects as your sales volume grows.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', background: '#F1F5F9', padding: '4px', borderRadius: '12px', marginTop: '20px' }}>
            <button
              onClick={() => setBillingPeriod('monthly')}
              style={{
                border: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                background: billingPeriod === 'monthly' ? '#FFFFFF' : 'transparent',
                color: billingPeriod === 'monthly' ? '#0F172A' : '#64748B',
                boxShadow: billingPeriod === 'monthly' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer'
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              style={{
                border: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                background: billingPeriod === 'annual' ? '#FFFFFF' : 'transparent',
                color: billingPeriod === 'annual' ? '#0F172A' : '#64748B',
                boxShadow: billingPeriod === 'annual' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer'
              }}
            >
              Annual Billing (Save 20%)
            </button>
          </div>
        </div>

        <div className="crm-pricing-grid">
          {/* Plan 1: Starter */}
          <div className="crm-pricing-card">
            <div>
              <div className="crm-plan-name">Starter Plan</div>
              <div className="crm-plan-desc">For boutique real estate marketing agencies &amp; single projects.</div>
              <div className="crm-plan-price">
                {billingPeriod === 'monthly' ? 'PKR 15,000' : 'PKR 12,000'}
                <span> / month</span>
              </div>
              <div className="crm-plan-note">Billed {billingPeriod === 'monthly' ? 'monthly' : 'annually (PKR 144,000/yr)'}</div>

              <ul className="crm-plan-features">
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>Up to <b>5 Team User Seats</b></span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span><b>1 Active Real Estate Project</b></span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>Lead Pipeline &amp; Deduplication</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>Basic Unit Inventory View</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>1-Click WhatsApp Lead Chat</span>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/923332000649?text=Hello%20Propkads,%20I%20want%20to%20subscribe%20to%20the%20Starter%20CRM%20Plan."
              target="_blank"
              rel="noopener noreferrer"
              className="crm-btn-subtle"
              style={{ justifyContent: 'center', width: '100%', padding: '12px' }}
            >
              Get Started with Starter
            </a>
          </div>

          {/* Plan 2: Pro (Featured) */}
          <div className="crm-pricing-card featured">
            <span className="crm-popular-tag">MOST POPULAR</span>
            <div>
              <div className="crm-plan-name">Pro Plan</div>
              <div className="crm-plan-desc">For active developers &amp; multi-agent sales operations.</div>
              <div className="crm-plan-price">
                {billingPeriod === 'monthly' ? 'PKR 35,000' : 'PKR 28,000'}
                <span> / month</span>
              </div>
              <div className="crm-plan-note">Billed {billingPeriod === 'monthly' ? 'monthly' : 'annually (PKR 336,000/yr)'}</div>

              <ul className="crm-plan-features">
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>Up to <b>15 Team User Seats</b></span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>Up to <b>3 Active Projects</b></span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span><b>Full Installment &amp; Aging Engine</b></span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span><b>Official Allotment Letters &amp; Vouchers</b></span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>External Dealer &amp; Commission Tracking</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>Executive Audit &amp; Performance Reports</span>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/923332000649?text=Hello%20Propkads,%20I%20want%20to%20subscribe%20to%20the%20Pro%20CRM%20Plan."
              target="_blank"
              rel="noopener noreferrer"
              className="crm-btn-primary"
              style={{ justifyContent: 'center', width: '100%', padding: '13px' }}
            >
              Choose Pro Plan →
            </a>
          </div>

          {/* Plan 3: Enterprise */}
          <div className="crm-pricing-card">
            <div>
              <div className="crm-plan-name">Enterprise Plan</div>
              <div className="crm-plan-desc">For master developers, housing societies &amp; large brokerages.</div>
              <div className="crm-plan-price">
                PKR 65,000+
                <span> / month</span>
              </div>
              <div className="crm-plan-note">Customized onboarding &amp; dedicated support</div>

              <ul className="crm-plan-features">
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span><b>Unlimited Team User Seats</b></span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span><b>Unlimited Projects &amp; Phases</b></span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>Custom White-labeling &amp; Brand Styling</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>API Webhook Integrations</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>Dedicated Account Manager &amp; Training</span>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/923332000649?text=Hello%20Propkads,%20we%20need%20an%20Enterprise%20CRM%20Consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="crm-btn-subtle"
              style={{ justifyContent: 'center', width: '100%', padding: '12px' }}
            >
              Contact for Enterprise Setup
            </a>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section className="crm-faq-section" id="faq">
        <div className="crm-sec-header">
          <div className="crm-sec-tag">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="crm-sec-title">Common Questions About Propkads CRM</h2>
        </div>

        <div className="crm-faq-list">
          {[
            {
              q: 'Is my company’s data completely private from other real estate companies?',
              a: 'Yes, 100%. Propkads CRM is built with strict multi-tenant database partitioning. Your leads, customers, project plots, and booking revenue are isolated to your company ID. No other agency or developer on the platform can ever view or access your data.'
            },
            {
              q: 'Can we print official Allotment Letters and Payment Receipts with our own company logo?',
              a: 'Yes! All printed vouchers, payment receipts, and legal allotment letters dynamically feature your company name, logo, NTN number, address, and cashier stamps. The software runs in the cloud, but the documents reflect your brand identity.'
            },
            {
              q: 'How does the Installment Aging and Default Tracking work?',
              a: 'When you create a booking with a 12, 24, or 36-month plan, the system automatically schedules monthly due dates. If an installment is missed, the aging engine automatically buckets the account into 1–30 days, 31–60 days, or 60+ days overdue, computes penal charges, and enables 1-click WhatsApp payment notice dispatch.'
            },
            {
              q: 'Can sales persons take or export our customer leads?',
              a: 'No. Sales persons only have access to their own assigned leads on their screen. They do not have access to full database export tools, preventing sales reps from hoarding or leaving with your agency’s master database.'
            },
            {
              q: 'How do our team members login to the CRM?',
              a: 'Your team can login anytime directly at https://crm.propkads.com/login using their designated work email and password. The system works seamlessly across laptops, tablets, and mobile phones.'
            }
          ].map((item, idx) => (
            <div key={idx} className="crm-faq-item">
              <button onClick={() => toggleFaq(idx)} className="crm-faq-q">
                <span>{item.q}</span>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: openFaq === idx ? '#14A750' : '#94A3B8' }}>
                  {openFaq === idx ? '−' : '+'}
                </span>
              </button>
              {openFaq === idx && <div className="crm-faq-a">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* 8. Bottom Call to Action Banner */}
      <section className="crm-bottom-banner">
        <div className="crm-bottom-container">
          <h2 className="crm-bottom-title">
            Ready to Automate Your Real Estate Sales &amp; Recovery?
          </h2>
          <p className="crm-bottom-desc">
            Join forward-thinking developers and agencies running their sales operations on Propkads CRM. Experience zero lead leakage, faster plot bookings, and predictable monthly cash flow.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://crm.propkads.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="crm-btn-primary"
              style={{ padding: '14px 32px', fontSize: '15px' }}
            >
              <span>Login to Propkads CRM Portal →</span>
            </a>
            <a
              href="https://wa.me/923332000649?text=Hello%20Propkads,%20we%20want%20to%20get%20started%20with%20Propkads%20CRM."
              target="_blank"
              rel="noopener noreferrer"
              className="crm-btn-subtle"
              style={{ padding: '14px 26px', fontSize: '15px', background: 'transparent', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <span>Talk to an Onboarding Specialist</span>
            </a>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer style={{ background: '#07090C', color: '#64748B', padding: '30px 24px', textAlign: 'center', fontSize: '12.5px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p>© {new Date().getFullYear()} Propkads Sales CRM System. All rights reserved. • Powered by <Link href="/" style={{ color: '#14A750', textDecoration: 'underline' }}>Propkads.com</Link></p>
      </footer>
    </div>
  );
}
