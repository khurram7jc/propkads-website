'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
      {/* 1. Website Standard Header Navigation */}
      <Header />

      {/* 2. Hero Section */}
      <section className="crm-hero">
        <div className="crm-container">
          <div className="crm-hero-content">
            <div className="crm-hero-eyebrow">
              <span className="crm-pulse-dot"></span>
              <span>Propkads Real Estate Sales CRM System</span>
            </div>

            <h1 className="crm-hero-title">
              The Complete <span className="highlight">Sales CRM System</span> Built for Real Estate Teams
            </h1>

            <p className="crm-hero-sub">
              Capture leads from Facebook Ads, TikTok, and Web with automated duplicate phone detection, audit sales team call productivity in real time, lock project inventory, and issue official legal allotment letters — all purpose-built for Pakistani real estate developers and agencies.
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
                <span>Admin-Only Allotment Letters</span>
              </div>
              <div className="crm-badge-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Multi-Tenant Company Workspaces</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Showcase Stage - Authentic Light Theme CRM Mockup */}
      <section className="crm-preview-section" id="preview">
        <div className="crm-container">
          <div className="crm-section-header">
            <span className="crm-section-badge">Live System Showcase</span>
            <h2 className="crm-section-title">Experience the Real Propkads CRM Light Theme</h2>
            <p className="crm-section-desc">
              Explore the exact light-theme dashboard, call audit metrics, plot inventory locks, and legal allotment letters our real estate clients use daily.
            </p>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="crm-tabs-selector">
            <button
              className={`crm-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span>📊 Dashboard &amp; Pipeline</span>
            </button>
            <button
              className={`crm-tab-btn ${activeTab === 'productivity' ? 'active' : ''}`}
              onClick={() => setActiveTab('productivity')}
            >
              <span>📞 Sales Productivity &amp; Calls</span>
            </button>
            <button
              className={`crm-tab-btn ${activeTab === 'leads' ? 'active' : ''}`}
              onClick={() => setActiveTab('leads')}
            >
              <span>🗂️ Leads &amp; Phone Deduplication</span>
            </button>
            <button
              className={`crm-tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              <span>🏢 Plot &amp; Unit Inventory</span>
            </button>
            <button
              className={`crm-tab-btn ${activeTab === 'allotment' ? 'active' : ''}`}
              onClick={() => setActiveTab('allotment')}
            >
              <span>📜 Bookings &amp; Allotment Letter</span>
            </button>
            <button
              className={`crm-tab-btn ${activeTab === 'dealers' ? 'active' : ''}`}
              onClick={() => setActiveTab('dealers')}
            >
              <span>🤝 External Dealers &amp; Commission</span>
            </button>
          </div>

          {/* Light Theme CRM Window Container */}
          <div className="crm-window-light">
            {/* Window Chrome Header */}
            <div className="crm-window-topbar">
              <div className="crm-window-dots">
                <span className="crm-dot crm-dot-red"></span>
                <span className="crm-dot crm-dot-yellow"></span>
                <span className="crm-dot crm-dot-green"></span>
              </div>
              <div className="crm-window-address">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>https://crm.propkads.com/{activeTab === 'dashboard' ? 'dashboard' : activeTab === 'productivity' ? 'dashboard?tab=productivity' : activeTab}</span>
              </div>
              <div className="crm-window-status">
                <span className="crm-pulse-dot"></span>
                <span>Active Cloud Workspace</span>
              </div>
            </div>

            {/* App Layout: Left Sidebar + Main Content */}
            <div className="crm-app-layout">
              {/* Left Sidebar */}
              <aside className="crm-app-sidebar">
                <div>
                  {/* Brand Logo & Tag */}
                  <div className="crm-sidebar-brand">
                    <img
                      src="/propkads-website-logo.png"
                      alt="Propkads Logo"
                      className="crm-sidebar-logo-img"
                    />
                    <div className="crm-sidebar-divider"></div>
                    <div className="crm-sidebar-brand-text">
                      <span className="crm-sidebar-brand-title">Real Estate</span>
                      <span className="crm-sidebar-brand-sub">Sales CRM System</span>
                    </div>
                  </div>

                  {/* Subscribing Company Workspace */}
                  <div className="crm-company-badge">
                    <div className="crm-company-icon">AD</div>
                    <div className="crm-company-info">
                      <div className="crm-company-name">Apex Developers</div>
                      <div className="crm-company-role">Admin Workspace</div>
                    </div>
                  </div>

                  {/* Sidebar Navigation */}
                  <nav className="crm-side-nav">
                    <div
                      className={`crm-side-nav-item ${activeTab === 'dashboard' || activeTab === 'productivity' ? 'active' : ''}`}
                      onClick={() => setActiveTab('dashboard')}
                      style={{ cursor: 'pointer' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="9"></rect>
                        <rect x="14" y="3" width="7" height="5"></rect>
                        <rect x="14" y="12" width="7" height="9"></rect>
                        <rect x="3" y="16" width="7" height="5"></rect>
                      </svg>
                      <span>Dashboard</span>
                    </div>

                    <div
                      className={`crm-side-nav-item ${activeTab === 'leads' ? 'active' : ''}`}
                      onClick={() => setActiveTab('leads')}
                      style={{ cursor: 'pointer' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <span>All Leads</span>
                    </div>

                    <div
                      className={`crm-side-nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
                      onClick={() => setActiveTab('inventory')}
                      style={{ cursor: 'pointer' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                      </svg>
                      <span>Property Inventory</span>
                    </div>

                    <div
                      className={`crm-side-nav-item ${activeTab === 'allotment' ? 'active' : ''}`}
                      onClick={() => setActiveTab('allotment')}
                      style={{ cursor: 'pointer' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <span>Bookings &amp; Sales</span>
                    </div>

                    <div
                      className={`crm-side-nav-item ${activeTab === 'dealers' ? 'active' : ''}`}
                      onClick={() => setActiveTab('dealers')}
                      style={{ cursor: 'pointer' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <polyline points="16 11 18 13 22 9"></polyline>
                      </svg>
                      <span>Dealers &amp; Agents</span>
                    </div>

                    <div className="crm-side-nav-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                        <line x1="6" y1="6" x2="6.01" y2="6"></line>
                        <line x1="6" y1="18" x2="6.01" y2="18"></line>
                      </svg>
                      <span>Sales Team</span>
                    </div>

                    <div className="crm-side-nav-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                      </svg>
                      <span>Reports</span>
                    </div>
                  </nav>
                </div>

                {/* Logged in User Meta */}
                <div className="crm-sidebar-user">
                  <div className="crm-user-avatar">KM</div>
                  <div className="crm-user-meta">
                    <span className="crm-user-name">Khurram Mushtaq</span>
                    <span className="crm-user-role">Company Administrator</span>
                  </div>
                </div>
              </aside>

              {/* Main Content Workspace */}
              <main className="crm-app-main">
                {/* TAB 1: OVERVIEW & PIPELINE DASHBOARD */}
                {activeTab === 'dashboard' && (
                  <div>
                    {/* Top Dashboard Header with exact yellow underline */}
                    <div className="crm-main-topbar">
                      <h2 className="crm-dashboard-heading">
                        Dashboard
                        <span className="crm-heading-underline"></span>
                      </h2>
                      <div className="crm-top-actions">
                        <span className="crm-action-link">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                          <span>Export</span>
                        </span>
                        <span className="crm-action-link">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                          <span>Need help?</span>
                        </span>
                      </div>
                    </div>

                    {/* Subnav Tabs & Filter Bar */}
                    <div className="crm-subnav-strip">
                      <div className="crm-subnav-left">
                        <span className="crm-subnav-item active">MY PIPELINE</span>
                        <span className="crm-subnav-item" onClick={() => setActiveTab('productivity')}>MY PRODUCTIVITY</span>
                        <span className="crm-subnav-item">
                          META <span className="crm-beta-badge">Beta</span>
                        </span>
                      </div>
                      <div className="crm-subnav-filters">
                        <span>Filter by:</span>
                        <span className="crm-filter-pill">Campaign ▾</span>
                        <span className="crm-filter-pill">Agent ▾</span>
                        <span className="crm-filter-pill">📅 2026-09-22 - 2026-09-28 ✕</span>
                      </div>
                    </div>

                    {/* 5 KPI Metric Cards */}
                    <div className="crm-metrics-grid-5">
                      <div className="crm-metric-card">
                        <div className="crm-metric-label">TOTAL LEADS</div>
                        <div className="crm-metric-number">131</div>
                        <div className="crm-metric-unit">LEADS</div>
                      </div>
                      <div className="crm-metric-card">
                        <div className="crm-metric-label">CONTACTED</div>
                        <div className="crm-metric-number">131</div>
                        <div className="crm-metric-unit">LEADS</div>
                      </div>
                      <div className="crm-metric-card">
                        <div className="crm-metric-label">PENDING</div>
                        <div className="crm-metric-number">0</div>
                        <div className="crm-metric-unit">LEADS</div>
                      </div>
                      <div className="crm-metric-card">
                        <div className="crm-metric-label">CLOSED</div>
                        <div className="crm-metric-number">0</div>
                        <div className="crm-metric-unit">LEADS</div>
                      </div>
                      <div className="crm-metric-card">
                        <div className="crm-metric-label">VALUE OF CLOSED DEALS</div>
                        <div className="crm-metric-number">0</div>
                        <div className="crm-metric-unit">PKR</div>
                      </div>
                    </div>

                    {/* Row 2: Status Breakdown Donut & Lead Sources */}
                    <div className="crm-dashboard-row-2">
                      {/* Status Donut */}
                      <div className="crm-dashboard-card">
                        <div className="crm-card-title">Lead Status Breakdown</div>
                        <div className="crm-donut-row">
                          <div className="crm-donut-container">
                            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="4"></circle>
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#22C55E" strokeWidth="4" strokeDasharray="13 87" strokeDashoffset="0"></circle>
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#3B82F6" strokeWidth="4" strokeDasharray="17 83" strokeDashoffset="-13"></circle>
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="39 61" strokeDashoffset="-30"></circle>
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#EAB308" strokeWidth="4" strokeDasharray="9 91" strokeDashoffset="-69"></circle>
                            </svg>
                            <div className="crm-donut-center">
                              <div className="crm-donut-center-num">8,511</div>
                              <div className="crm-donut-center-lbl">Contacted Leads</div>
                            </div>
                          </div>
                          <div className="crm-donut-legend">
                            <div className="crm-legend-item">
                              <span><span className="crm-legend-bullet" style={{ background: '#22C55E' }}></span>Qualified Leads</span>
                              <b>1,112 (13.1%)</b>
                            </div>
                            <div className="crm-legend-item">
                              <span><span className="crm-legend-bullet" style={{ background: '#3B82F6' }}></span>Details Shared</span>
                              <b>1,447 (17.0%)</b>
                            </div>
                            <div className="crm-legend-item">
                              <span><span className="crm-legend-bullet" style={{ background: '#EF4444' }}></span>Unqualified</span>
                              <b>3,348 (39.3%)</b>
                            </div>
                            <div className="crm-legend-item">
                              <span><span className="crm-legend-bullet" style={{ background: '#EAB308' }}></span>Did Not Respond</span>
                              <b>749 (8.8%)</b>
                            </div>
                            <div className="crm-legend-item">
                              <span><span className="crm-legend-bullet" style={{ background: '#64748B' }}></span>Lost Deals</span>
                              <b>691 (8.1%)</b>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Lead Sources Bar */}
                      <div className="crm-dashboard-card">
                        <div className="crm-card-title">Lead Acquisition Sources</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                              <span style={{ fontWeight: '700', color: '#1877F2' }}>📘 Facebook Ads</span>
                              <b>6,900 leads</b>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: '80%', height: '100%', background: '#1877F2', borderRadius: '4px' }}></div>
                            </div>
                          </div>

                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                              <span style={{ fontWeight: '700', color: '#D97706' }}>📄 CSV / Manual Import</span>
                              <b>1,441 leads</b>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: '17%', height: '100%', background: '#D97706', borderRadius: '4px' }}></div>
                            </div>
                          </div>

                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                              <span style={{ fontWeight: '700', color: '#059669' }}>🌐 Website Inquiries</span>
                              <b>88 leads</b>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: '4%', height: '100%', background: '#059669', borderRadius: '4px' }}></div>
                            </div>
                          </div>

                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                              <span style={{ fontWeight: '700', color: '#0284C7' }}>🎵 TikTok Ads</span>
                              <b>82 leads</b>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: '3.5%', height: '100%', background: '#0284C7', borderRadius: '4px' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Top Performing Agents Cards */}
                    <div style={{ marginBottom: '10px', fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>
                      Top Performing Agents
                    </div>
                    <div className="crm-top-agents-grid">
                      <div className="crm-agent-card crm-agent-card-yellow">
                        <div className="crm-agent-header">
                          <div className="crm-agent-avatar">👤</div>
                          <div className="crm-agent-name">Admin</div>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Leads contacted:</span>
                          <span className="crm-agent-stats-val">2564</span>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Qualified leads:</span>
                          <span className="crm-agent-stats-val">0</span>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Deals closed:</span>
                          <span className="crm-agent-stats-val">0</span>
                        </div>
                      </div>

                      <div className="crm-agent-card crm-agent-card-gray">
                        <div className="crm-agent-header">
                          <div className="crm-agent-avatar">👤</div>
                          <div className="crm-agent-name">Ayesha Khadim</div>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Leads contacted:</span>
                          <span className="crm-agent-stats-val">2030</span>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Qualified leads:</span>
                          <span className="crm-agent-stats-val">226</span>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Deals closed:</span>
                          <span className="crm-agent-stats-val">14</span>
                        </div>
                      </div>

                      <div className="crm-agent-card crm-agent-card-beige">
                        <div className="crm-agent-header">
                          <div className="crm-agent-avatar">👤</div>
                          <div className="crm-agent-name">Farrukh Abbas</div>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Leads contacted:</span>
                          <span className="crm-agent-stats-val">1663</span>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Qualified leads:</span>
                          <span className="crm-agent-stats-val">344</span>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Deals closed:</span>
                          <span className="crm-agent-stats-val">3</span>
                        </div>
                      </div>
                    </div>

                    {/* Agent Leaderboard Table */}
                    <div className="crm-table-card">
                      <div className="crm-card-title">Agent Leaderboard</div>
                      <div style={{ overflowX: 'auto' }}>
                        <table className="crm-data-table">
                          <thead>
                            <tr>
                              <th>Agent ↕</th>
                              <th>Total ↕</th>
                              <th>Contacted ↕</th>
                              <th>Pending ↕</th>
                              <th>Qualified ↕</th>
                              <th>Working Deals ↕</th>
                              <th>Closed Deals ↕</th>
                              <th>Future Prospects ↕</th>
                              <th>Lost Deals ↕</th>
                              <th>Did Not Respond ↕</th>
                              <th>Unqualified ↕</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><b>Admin</b></td>
                              <td>2564</td>
                              <td>2564</td>
                              <td>0</td>
                              <td>0</td>
                              <td>0</td>
                              <td>0</td>
                              <td>50</td>
                              <td>345</td>
                              <td>0</td>
                              <td>2167</td>
                            </tr>
                            <tr>
                              <td><b>Ayesha Khadim</b></td>
                              <td>2030</td>
                              <td>2030</td>
                              <td>0</td>
                              <td>226</td>
                              <td>55</td>
                              <td><b style={{ color: '#16A34A' }}>14</b></td>
                              <td>122</td>
                              <td>36</td>
                              <td>0</td>
                              <td>400</td>
                            </tr>
                            <tr>
                              <td><b>Farrukh Abbas</b></td>
                              <td>1663</td>
                              <td>1663</td>
                              <td>0</td>
                              <td>344</td>
                              <td>3</td>
                              <td><b style={{ color: '#16A34A' }}>3</b></td>
                              <td>122</td>
                              <td>191</td>
                              <td>314</td>
                              <td>553</td>
                            </tr>
                            <tr>
                              <td><b>Sidra Ikhlaq</b></td>
                              <td>1495</td>
                              <td>1495</td>
                              <td>0</td>
                              <td>330</td>
                              <td>103</td>
                              <td><b style={{ color: '#16A34A' }}>4</b></td>
                              <td>28</td>
                              <td>59</td>
                              <td>264</td>
                              <td>192</td>
                            </tr>
                            <tr>
                              <td><b>Umair Ahmed</b></td>
                              <td>504</td>
                              <td>504</td>
                              <td>0</td>
                              <td>154</td>
                              <td>160</td>
                              <td>0</td>
                              <td>51</td>
                              <td>2</td>
                              <td>132</td>
                              <td>5</td>
                            </tr>
                            <tr>
                              <td><b>Faisal Ali Khan</b></td>
                              <td>157</td>
                              <td>157</td>
                              <td>0</td>
                              <td>36</td>
                              <td>2</td>
                              <td>1</td>
                              <td>1</td>
                              <td>53</td>
                              <td>13</td>
                              <td>20</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: SALES TEAM PRODUCTIVITY & CALL AUDIT */}
                {activeTab === 'productivity' && (
                  <div>
                    {/* Top Dashboard Header with exact yellow underline */}
                    <div className="crm-main-topbar">
                      <h2 className="crm-dashboard-heading">
                        Dashboard
                        <span className="crm-heading-underline"></span>
                      </h2>
                      <div className="crm-top-actions">
                        <span className="crm-action-link">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                          <span>Export</span>
                        </span>
                        <span className="crm-action-link">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                          <span>Need help?</span>
                        </span>
                      </div>
                    </div>

                    {/* Subnav Tabs & Filter Bar */}
                    <div className="crm-subnav-strip">
                      <div className="crm-subnav-left">
                        <span className="crm-subnav-item" onClick={() => setActiveTab('dashboard')}>MY PIPELINE</span>
                        <span className="crm-subnav-item active">MY PRODUCTIVITY</span>
                        <span className="crm-subnav-item">
                          META <span className="crm-beta-badge">Beta</span>
                        </span>
                      </div>
                      <div className="crm-subnav-filters">
                        <span>Filter by:</span>
                        <span className="crm-filter-pill">All Channels ▾</span>
                        <span className="crm-filter-pill">All Sales Persons ▾</span>
                        <span className="crm-filter-pill">📅 All Dates ▾</span>
                      </div>
                    </div>

                    {/* Row 1: Call Outcomes Donut + 4 KPI Boxes (From Screenshot media_1790631968769.png) */}
                    <div className="crm-dashboard-row-2">
                      {/* Call Outcomes Donut */}
                      <div className="crm-dashboard-card">
                        <div className="crm-card-title">Call outcomes</div>
                        <div className="crm-donut-row">
                          <div className="crm-donut-container">
                            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="4"></circle>
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#22C55E" strokeWidth="4" strokeDasharray="40 60" strokeDashoffset="0"></circle>
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#EAB308" strokeWidth="4" strokeDasharray="58 42" strokeDashoffset="-40"></circle>
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="2 98" strokeDashoffset="-98"></circle>
                            </svg>
                            <div className="crm-donut-center">
                              <div className="crm-donut-center-num">50949</div>
                              <div className="crm-donut-center-lbl">Total Calls</div>
                            </div>
                          </div>
                          <div className="crm-donut-legend">
                            <div className="crm-legend-item">
                              <span><span className="crm-legend-bullet" style={{ background: '#22C55E' }}></span>Answered</span>
                              <b>20,446</b>
                            </div>
                            <div className="crm-legend-item">
                              <span><span className="crm-legend-bullet" style={{ background: '#EAB308' }}></span>Did Not Respond</span>
                              <b>29,983</b>
                            </div>
                            <div className="crm-legend-item">
                              <span><span className="crm-legend-bullet" style={{ background: '#EF4444' }}></span>Dead Numbers</span>
                              <b>520</b>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4 Productivity KPI Cards */}
                      <div className="crm-prod-kpi-grid">
                        <div className="crm-prod-kpi-box">
                          <div className="crm-prod-kpi-title">MEETINGS DONE</div>
                          <div className="crm-prod-kpi-value">475</div>
                          <div className="crm-prod-kpi-sub">MEETINGS</div>
                        </div>
                        <div className="crm-prod-kpi-box">
                          <div className="crm-prod-kpi-title">CALL ANSWER RATE</div>
                          <div className="crm-prod-kpi-value">45.4%</div>
                          <div className="crm-prod-kpi-sub">ANSWERED</div>
                        </div>
                        <div className="crm-prod-kpi-box">
                          <div className="crm-prod-kpi-title">AVERAGE LEAD RESPONSE TIME</div>
                          <div className="crm-prod-kpi-value">🐌 9</div>
                          <div className="crm-prod-kpi-sub">HOURS</div>
                        </div>
                        <div className="crm-prod-kpi-box">
                          <div className="crm-prod-kpi-title">OVERDUE TASKS</div>
                          <div className="crm-prod-kpi-value" style={{ color: '#DC2626' }}>562</div>
                          <div className="crm-prod-kpi-sub">PENDING</div>
                        </div>
                      </div>
                    </div>

                    {/* Top Performing Agents for Calls */}
                    <div style={{ marginBottom: '10px', fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>
                      Top Performing Agents
                    </div>
                    <div className="crm-top-agents-grid">
                      <div className="crm-agent-card crm-agent-card-yellow">
                        <div className="crm-agent-header">
                          <div className="crm-agent-avatar">👤</div>
                          <div className="crm-agent-name">Sidra Ikhlaq</div>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Total calls made:</span>
                          <span className="crm-agent-stats-val">13874</span>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Answered:</span>
                          <span className="crm-agent-stats-val">5901</span>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Did not respond:</span>
                          <span className="crm-agent-stats-val">7927</span>
                        </div>
                      </div>

                      <div className="crm-agent-card crm-agent-card-gray">
                        <div className="crm-agent-header">
                          <div className="crm-agent-avatar">👤</div>
                          <div className="crm-agent-name">Ayesha Khadim</div>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Total calls made:</span>
                          <span className="crm-agent-stats-val">11860</span>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Answered:</span>
                          <span className="crm-agent-stats-val">4825</span>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Did not respond:</span>
                          <span className="crm-agent-stats-val">7019</span>
                        </div>
                      </div>

                      <div className="crm-agent-card crm-agent-card-beige">
                        <div className="crm-agent-header">
                          <div className="crm-agent-avatar">👤</div>
                          <div className="crm-agent-name">Farrukh Abbas</div>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Total calls made:</span>
                          <span className="crm-agent-stats-val">6792</span>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Answered:</span>
                          <span className="crm-agent-stats-val">3184</span>
                        </div>
                        <div className="crm-agent-stats-row">
                          <span>Did not respond:</span>
                          <span className="crm-agent-stats-val">3513</span>
                        </div>
                      </div>
                    </div>

                    {/* Agent Productivity Leaderboard Table (From Screenshot media_1790633168879.png) */}
                    <div className="crm-table-card">
                      <div className="crm-card-title">Agent Productivity Leaderboard</div>
                      <div style={{ overflowX: 'auto' }}>
                        <table className="crm-data-table">
                          <thead>
                            <tr>
                              <th>Agent</th>
                              <th>Total Calls Made</th>
                              <th>Answered</th>
                              <th>Did Not Respond</th>
                              <th>Dead Numbers</th>
                              <th>Texts Sent</th>
                              <th>WhatsApp Sent</th>
                              <th>Emails Sent</th>
                              <th>Meetings Done</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><b>Sidra Ikhlaq</b></td>
                              <td>13874</td>
                              <td>5901</td>
                              <td>7927</td>
                              <td>46</td>
                              <td>9</td>
                              <td>1626</td>
                              <td>3</td>
                              <td><b style={{ color: '#16A34A' }}>55</b></td>
                            </tr>
                            <tr>
                              <td><b>Ayesha Khadim</b></td>
                              <td>11860</td>
                              <td>4825</td>
                              <td>7019</td>
                              <td>16</td>
                              <td>12</td>
                              <td>883</td>
                              <td>40</td>
                              <td><b style={{ color: '#16A34A' }}>101</b></td>
                            </tr>
                            <tr>
                              <td><b>Farrukh Abbas</b></td>
                              <td>6792</td>
                              <td>3184</td>
                              <td>3513</td>
                              <td>95</td>
                              <td>0</td>
                              <td>748</td>
                              <td>0</td>
                              <td><b style={{ color: '#16A34A' }}>89</b></td>
                            </tr>
                            <tr>
                              <td><b>Umair Ahmed</b></td>
                              <td>5345</td>
                              <td>2830</td>
                              <td>2510</td>
                              <td>5</td>
                              <td>1</td>
                              <td>1364</td>
                              <td>0</td>
                              <td><b style={{ color: '#16A34A' }}>87</b></td>
                            </tr>
                            <tr>
                              <td><b>Muhammad Saqib</b></td>
                              <td>3947</td>
                              <td>1863</td>
                              <td>2060</td>
                              <td>24</td>
                              <td>0</td>
                              <td>543</td>
                              <td>0</td>
                              <td><b style={{ color: '#16A34A' }}>36</b></td>
                            </tr>
                            <tr>
                              <td><b>Faisal Ali Khan</b></td>
                              <td>2176</td>
                              <td>1058</td>
                              <td>1105</td>
                              <td>13</td>
                              <td>0</td>
                              <td>176</td>
                              <td>2</td>
                              <td><b style={{ color: '#16A34A' }}>8</b></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: LEADS PIPELINE & DUPLICATE DETECTION */}
                {activeTab === 'leads' && (
                  <div>
                    <div className="crm-main-topbar">
                      <div>
                        <h2 className="crm-dashboard-heading">
                          All Leads Pipeline
                          <span className="crm-heading-underline"></span>
                        </h2>
                        <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                          Real-time multi-channel lead ingestion with automated phone deduplication.
                        </p>
                      </div>
                      <div className="crm-top-actions">
                        <span className="crm-filter-pill">⚡ Auto Deduplication: Active</span>
                      </div>
                    </div>

                    {/* Kanban Columns */}
                    <div className="crm-kanban-grid">
                      {/* Column 1: New Inquiries */}
                      <div className="crm-kanban-col">
                        <div className="crm-kanban-col-header">
                          <span>New Inquiries</span>
                          <span className="crm-kanban-count">18</span>
                        </div>

                        {/* Card with Duplicate Phone Warning */}
                        <div className="crm-kanban-card">
                          <div className="crm-dup-pill">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                              <line x1="12" y1="9" x2="12" y2="13"></line>
                              <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            <span>Duplicate Phone Detected!</span>
                          </div>
                          <div className="crm-kanban-card-title">Chaudhry Nadeem</div>
                          <div className="crm-kanban-card-sub">Phone: +92 300 4567890 • Source: FB Ads</div>
                          <div style={{ fontSize: '11px', color: '#B91C1C', background: '#FEF2F2', padding: '6px', borderRadius: '4px', marginBottom: '8px' }}>
                            ⚠️ Already assigned to <b>Agent Farrukh</b>. Reps cannot steal or double-call this lead.
                          </div>
                          <div className="crm-kanban-actions">
                            <span style={{ fontSize: '10.5px', color: '#64748B' }}>Interest: 1 Kanal Plot</span>
                            <span className="crm-whatsapp-btn">💬 Chat</span>
                          </div>
                        </div>

                        <div className="crm-kanban-card">
                          <div className="crm-kanban-card-title">Hassan Raza</div>
                          <div className="crm-kanban-card-sub">Phone: +92 321 8844210 • Web Portal</div>
                          <div className="crm-kanban-actions">
                            <span style={{ fontSize: '10.5px', color: '#14A750', fontWeight: '700' }}>✓ Unique Lead</span>
                            <span className="crm-whatsapp-btn">💬 Chat</span>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: Contacted */}
                      <div className="crm-kanban-col">
                        <div className="crm-kanban-col-header">
                          <span>Contacted</span>
                          <span className="crm-kanban-count">42</span>
                        </div>
                        <div className="crm-kanban-card">
                          <div className="crm-kanban-card-title">Mian Zafar Iqbal</div>
                          <div className="crm-kanban-card-sub">Assigned: Ayesha Khadim • 3 Calls Logged</div>
                          <div style={{ fontSize: '11.5px', color: '#334155', background: '#F8FAFC', padding: '6px', borderRadius: '4px', marginBottom: '8px' }}>
                            💬 "Client requested brochure and payment schedule on WhatsApp."
                          </div>
                          <div className="crm-kanban-actions">
                            <span style={{ fontSize: '10.5px', color: '#64748B' }}>Last Call: Today 11:30 AM</span>
                            <span className="crm-whatsapp-btn">💬 Chat</span>
                          </div>
                        </div>
                      </div>

                      {/* Column 3: Qualified & Site Visit */}
                      <div className="crm-kanban-col">
                        <div className="crm-kanban-col-header">
                          <span>Site Visit Scheduled</span>
                          <span className="crm-kanban-count">12</span>
                        </div>
                        <div className="crm-kanban-card">
                          <div className="crm-kanban-card-title">Dr. Salman Tariq</div>
                          <div className="crm-kanban-card-sub">Budget: PKR 1.4 Crore • Sector B</div>
                          <div style={{ fontSize: '11px', color: '#1E3A8A', background: '#EFF6FF', padding: '6px', borderRadius: '4px', marginBottom: '8px' }}>
                            📅 Physical Site Visit confirmed for Sunday 3:00 PM with Family.
                          </div>
                          <div className="crm-kanban-actions">
                            <span style={{ fontSize: '10.5px', color: '#047857', fontWeight: '700' }}>Rep: Sidra Ikhlaq</span>
                            <span className="crm-whatsapp-btn">💬 Chat</span>
                          </div>
                        </div>
                      </div>

                      {/* Column 4: Closed Won */}
                      <div className="crm-kanban-col">
                        <div className="crm-kanban-col-header">
                          <span>Deals Closed (Won)</span>
                          <span className="crm-kanban-count" style={{ background: '#DCFCE7', color: '#15803D' }}>29</span>
                        </div>
                        <div className="crm-kanban-card" style={{ borderLeft: '3px solid #16A34A' }}>
                          <div className="crm-kanban-card-title">Malik Waqas</div>
                          <div className="crm-kanban-card-sub">10 Marla Main Boulevard • Plot #44</div>
                          <div style={{ fontSize: '11px', color: '#16A34A', fontWeight: '700', marginBottom: '6px' }}>
                            ✓ Booking Confirmed (Allotment Issued)
                          </div>
                          <div className="crm-kanban-actions">
                            <span style={{ fontSize: '10.5px', color: '#64748B' }}>Dealer: Al-Haram Estate</span>
                            <span style={{ fontSize: '10.5px', fontWeight: '700', color: '#0F172A' }}>PKR 7.5M</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: PROPERTY INVENTORY */}
                {activeTab === 'inventory' && (
                  <div>
                    <div className="crm-main-topbar">
                      <div>
                        <h2 className="crm-dashboard-heading">
                          Property &amp; Plot Inventory
                          <span className="crm-heading-underline"></span>
                        </h2>
                        <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                          Al-Raziq Garden — Phase 1 Executive Block (Live Unit Availability)
                        </p>
                      </div>
                      <div className="crm-top-actions">
                        <span className="crm-filter-pill">All Sizes ▾</span>
                        <span className="crm-filter-pill">Status: All Units ▾</span>
                      </div>
                    </div>

                    <div className="crm-inventory-grid">
                      <div className="crm-unit-card">
                        <div className="crm-unit-header">
                          <span className="crm-unit-num">Plot # 102</span>
                          <span className="crm-status-available">Available</span>
                        </div>
                        <div className="crm-unit-specs">5 Marla Residential • Sector A (Regular)</div>
                        <div className="crm-unit-price">PKR 3,500,000</div>
                      </div>

                      <div className="crm-unit-card">
                        <div className="crm-unit-header">
                          <span className="crm-unit-num">Plot # 103</span>
                          <span className="crm-status-booked">Booked</span>
                        </div>
                        <div className="crm-unit-specs">5 Marla Residential • Corner (+10% Premium)</div>
                        <div className="crm-unit-price">PKR 3,850,000</div>
                      </div>

                      <div className="crm-unit-card">
                        <div className="crm-unit-header">
                          <span className="crm-unit-num">Plot # 104</span>
                          <span className="crm-status-sold">Sold Out</span>
                        </div>
                        <div className="crm-unit-specs">10 Marla Main Boulevard • 60ft Road</div>
                        <div className="crm-unit-price">PKR 7,500,000</div>
                      </div>

                      <div className="crm-unit-card">
                        <div className="crm-unit-header">
                          <span className="crm-unit-num">Plot # 105</span>
                          <span className="crm-status-available">Available</span>
                        </div>
                        <div className="crm-unit-specs">1 Kanal Executive • Park Facing</div>
                        <div className="crm-unit-price">PKR 14,000,000</div>
                      </div>

                      <div className="crm-unit-card">
                        <div className="crm-unit-header">
                          <span className="crm-unit-num">Plot # 106</span>
                          <span className="crm-status-available">Available</span>
                        </div>
                        <div className="crm-unit-specs">10 Marla Residential • West Open</div>
                        <div className="crm-unit-price">PKR 6,800,000</div>
                      </div>

                      <div className="crm-unit-card">
                        <div className="crm-unit-header">
                          <span className="crm-unit-num">Comm # 12</span>
                          <span className="crm-status-booked">Booked</span>
                        </div>
                        <div className="crm-unit-specs">4 Marla Commercial Plaza • Main Square</div>
                        <div className="crm-unit-price">PKR 18,500,000</div>
                      </div>

                      <div className="crm-unit-card">
                        <div className="crm-unit-header">
                          <span className="crm-unit-num">Plot # 108</span>
                          <span className="crm-status-available">Available</span>
                        </div>
                        <div className="crm-unit-specs">5 Marla Residential • Regular</div>
                        <div className="crm-unit-price">PKR 3,500,000</div>
                      </div>

                      <div className="crm-unit-card">
                        <div className="crm-unit-header">
                          <span className="crm-unit-num">Plot # 109</span>
                          <span className="crm-status-sold">Sold Out</span>
                        </div>
                        <div className="crm-unit-specs">1 Kanal Executive • Boulevard Corner</div>
                        <div className="crm-unit-price">PKR 15,200,000</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: BOOKINGS & OFFICIAL ALLOTMENT LETTER */}
                {activeTab === 'allotment' && (
                  <div>
                    <div className="crm-main-topbar">
                      <div>
                        <h2 className="crm-dashboard-heading">
                          Bookings &amp; Official Allotment Letters
                          <span className="crm-heading-underline"></span>
                        </h2>
                        <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                          Official company documents with verifiable legal protection.
                        </p>
                      </div>
                      <div className="crm-admin-lock-pill">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span>Admin Only: Document Issuance Locked</span>
                      </div>
                    </div>

                    <div className="crm-allotment-preview">
                      <div className="crm-letter-header">
                        <div>
                          <div className="crm-letterhead-title">AL-RAZIQ DEVELOPERS (PVT) LTD</div>
                          <div className="crm-letterhead-ntn">NTN: 8291041-7 • Corporate License # LC-2024-991</div>
                          <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>Plot 48, Main Boulevard, Executive Block, Lahore</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ background: '#DCFCE7', color: '#16A34A', fontSize: '11px', fontWeight: '800', padding: '3px 8px', borderRadius: '4px' }}>
                            OFFICIAL PROVISIONAL ALLOTMENT
                          </span>
                          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Ref: ALR/2026/089</div>
                        </div>
                      </div>

                      <div className="crm-letter-body-grid">
                        <div>
                          <span style={{ color: '#64748B' }}>Allottee Name:</span>
                          <div style={{ fontWeight: '700', color: '#0F172A' }}>Muhammad Tariq Sheikh</div>
                        </div>
                        <div>
                          <span style={{ color: '#64748B' }}>CNIC Number:</span>
                          <div style={{ fontWeight: '700', color: '#0F172A' }}>35202-*******-1</div>
                        </div>
                        <div>
                          <span style={{ color: '#64748B' }}>Project &amp; Sector:</span>
                          <div style={{ fontWeight: '700', color: '#0F172A' }}>Al-Raziq Garden — Sector B</div>
                        </div>
                        <div>
                          <span style={{ color: '#64748B' }}>Plot Size &amp; Unit #:</span>
                          <div style={{ fontWeight: '700', color: '#0F172A' }}>10 Marla Regular (Plot #44)</div>
                        </div>
                        <div>
                          <span style={{ color: '#64748B' }}>Booking Date:</span>
                          <div style={{ fontWeight: '700', color: '#0F172A' }}>28 September 2026</div>
                        </div>
                        <div>
                          <span style={{ color: '#64748B' }}>Booking Token Advance:</span>
                          <div style={{ fontWeight: '700', color: '#16A34A' }}>PKR 1,500,000 (Verified)</div>
                        </div>
                      </div>

                      <div className="crm-letter-stamp-row">
                        <div style={{ fontSize: '11px', color: '#64748B' }}>
                          <div>Authorized Cashier Stamp: <b>VERIFIED BY BANK</b></div>
                          <div>QR Code Reference: #99281-CONFIRMED</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ borderBottom: '1px solid #94A3B8', width: '160px', marginBottom: '4px' }}></div>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: '#0F172A' }}>Authorized Signature (Admin)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 6: DEALERS & COMMISSION */}
                {activeTab === 'dealers' && (
                  <div>
                    <div className="crm-main-topbar">
                      <div>
                        <h2 className="crm-dashboard-heading">
                          External Dealers &amp; Broker Commissions
                          <span className="crm-heading-underline"></span>
                        </h2>
                        <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                          Transparent commission tracking for affiliate agencies and independent realtors.
                        </p>
                      </div>
                      <div className="crm-top-actions">
                        <span className="crm-filter-pill">+ Register Outside Broker</span>
                      </div>
                    </div>

                    <div className="crm-table-card">
                      <table className="crm-data-table">
                        <thead>
                          <tr>
                            <th>Agency / Dealer Name</th>
                            <th>Contact Person</th>
                            <th>Commission Rate</th>
                            <th>Referred Leads</th>
                            <th>Confirmed Bookings</th>
                            <th>Total Sales Volume</th>
                            <th>Commission Payable</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><b>Al-Haram Real Estate</b></td>
                            <td>Haji Abdul Rasheed</td>
                            <td><span style={{ background: '#E0E7FF', color: '#3730A3', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>2.5%</span></td>
                            <td>42</td>
                            <td>6 Units</td>
                            <td>PKR 42,000,000</td>
                            <td><b style={{ color: '#16A34A' }}>PKR 1,050,000</b></td>
                          </tr>
                          <tr>
                            <td><b>Star Marketing Associates</b></td>
                            <td>Mian Tariq</td>
                            <td><span style={{ background: '#E0E7FF', color: '#3730A3', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>3.0%</span></td>
                            <td>28</td>
                            <td>4 Units</td>
                            <td>PKR 28,500,000</td>
                            <td><b style={{ color: '#16A34A' }}>PKR 855,000</b></td>
                          </tr>
                          <tr>
                            <td><b>Apex Properties &amp; Builders</b></td>
                            <td>Chaudhry Kamran</td>
                            <td><span style={{ background: '#E0E7FF', color: '#3730A3', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>2.0%</span></td>
                            <td>19</td>
                            <td>2 Units</td>
                            <td>PKR 14,000,000</td>
                            <td><b style={{ color: '#16A34A' }}>PKR 280,000</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Capabilities (Bento Grid) */}
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
                Track total calls, answered rate (45.4%), dead numbers, and response lag (average 9 hours). Eliminate excuses and monitor daily activity with 100% transparency.
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
              <h3 className="crm-bento-title">Plot &amp; Unit Inventory Management</h3>
              <p className="crm-bento-desc">
                Manage society phases, sectors, and commercial plazas. Lock units in real-time as Available, Booked, or Sold to eliminate embarrassing double bookings.
              </p>
            </div>

            <div className="crm-bento-card">
              <div className="crm-bento-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="crm-bento-title">Official Legal Allotment Letters</h3>
              <p className="crm-bento-desc">
                Admin-exclusive letterhead document generation. Issue verified provisional allotment certificates and initial booking payment receipts with company NTN and stamps.
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

      {/* 6. Strict Role-Based Permissions Section */}
      <section className="crm-roles-section" id="security">
        <div className="crm-container">
          <div className="crm-section-header">
            <span className="crm-section-badge">Data Protection</span>
            <h2 className="crm-section-title">Strict Role-Based Access Control</h2>
            <p className="crm-section-desc">
              Prevent lead theft and protect company documents with isolated role boundaries.
            </p>
          </div>

          <div className="crm-roles-grid">
            <div className="crm-role-card">
              <span className="crm-role-badge crm-role-badge-admin">Full Executive Access</span>
              <h3 className="crm-role-title">Company Admin</h3>
              <p className="crm-role-desc">
                Exclusive power to lock bookings, generate official legal allotment letters, print payment vouchers, add team members, and view executive conversion reports.
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
                Can only view and follow up on leads assigned to them. Cannot export customer phone numbers or issue legal allotment certificates.
              </p>
            </div>

            <div className="crm-role-card">
              <span className="crm-role-badge crm-role-badge-dealer">Partner Portal</span>
              <h3 className="crm-role-title">Affiliate Dealer / Broker</h3>
              <p className="crm-role-desc">
                View available unit inventory, submit buyer leads to lock commission attribution, and view verified payout statuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Transparent SaaS Pricing Section */}
      <section className="crm-pricing-section" id="pricing">
        <div className="crm-container">
          <div className="crm-section-header">
            <span className="crm-section-badge">Transparent Plans</span>
            <h2 className="crm-section-title">Simple Subscription Plans for Every Real Estate Team</h2>
            <p className="crm-section-desc">
              Choose the capacity that matches your developer project or agency size.
            </p>

            <div style={{ marginTop: '20px' }}>
              <div className="crm-billing-toggle">
                <button
                  className={`crm-billing-btn ${billingPeriod === 'monthly' ? 'active' : ''}`}
                  onClick={() => setBillingPeriod('monthly')}
                >
                  Monthly Billing
                </button>
                <button
                  className={`crm-billing-btn ${billingPeriod === 'annual' ? 'active' : ''}`}
                  onClick={() => setBillingPeriod('annual')}
                >
                  Annual (2 Months Free)
                </button>
              </div>
            </div>
          </div>

          <div className="crm-pricing-grid">
            {/* Starter Plan */}
            <div className="crm-pricing-card">
              <div className="crm-plan-name">Starter</div>
              <div className="crm-plan-tagline">
                Perfect for boutique real estate agencies and single-phase projects.
              </div>
              <div className="crm-plan-price-wrap">
                <span className="crm-price-currency">PKR </span>
                <span className="crm-price-val">{billingPeriod === 'annual' ? '12,500' : '15,000'}</span>
                <span className="crm-price-period"> / month</span>
              </div>
              <ul className="crm-feature-list">
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Up to 5 Team User Seats</span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>1 Active Real Estate Project</span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Lead Pipeline &amp; Phone Deduplication</span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Basic Unit Inventory View</span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>1-Click WhatsApp Lead Chat</span>
                </li>
              </ul>
              <a
                href="https://wa.me/923332000649?text=Hello%20Propkads,%20I%20want%20to%20subscribe%20to%20the%20Starter%20CRM%20Plan."
                target="_blank"
                rel="noopener noreferrer"
                className="crm-plan-cta-btn crm-plan-cta-outline"
              >
                Get Started with Starter
              </a>
            </div>

            {/* Pro Plan */}
            <div className="crm-pricing-card featured">
              <span className="crm-featured-pill">Most Popular</span>
              <div className="crm-plan-name">Pro</div>
              <div className="crm-plan-tagline">
                For established developers and active sales offices scaling closings.
              </div>
              <div className="crm-plan-price-wrap">
                <span className="crm-price-currency">PKR </span>
                <span className="crm-price-val">{billingPeriod === 'annual' ? '29,000' : '35,000'}</span>
                <span className="crm-price-period"> / month</span>
              </div>
              <ul className="crm-feature-list">
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><b>Up to 15 Team User Seats</b></span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Up to 3 Active Projects / Phases</span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Full Call Productivity &amp; Response Audit</span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Real-Time Agent Leaderboards</span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Official Allotment Letter &amp; Voucher Generator</span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>External Dealer &amp; Commission Tracking</span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Priority WhatsApp Support &amp; Setup</span>
                </li>
              </ul>
              <a
                href="https://wa.me/923332000649?text=Hello%20Propkads,%20I%20want%20to%20subscribe%20to%20the%20Pro%20CRM%20Plan."
                target="_blank"
                rel="noopener noreferrer"
                className="crm-plan-cta-btn crm-plan-cta-primary"
              >
                Choose Pro Plan →
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="crm-pricing-card">
              <div className="crm-plan-name">Enterprise</div>
              <div className="crm-plan-tagline">
                For major developers, multi-society developers, and master sales partners.
              </div>
              <div className="crm-plan-price-wrap">
                <span className="crm-price-currency">PKR </span>
                <span className="crm-price-val">{billingPeriod === 'annual' ? '55,000' : '65,000'}</span>
                <span className="crm-price-period"> / month+</span>
              </div>
              <ul className="crm-feature-list">
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><b>Unlimited Team User Seats</b></span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Unlimited Projects &amp; Phases</span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Multi-Tenant Workspaces &amp; Sub-Branches</span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Custom White-Labeling &amp; Brand Styling</span>
                </li>
                <li className="crm-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Dedicated Account Manager &amp; Onsite Staff Training</span>
                </li>
              </ul>
              <a
                href="https://wa.me/923332000649?text=Hello%20Propkads,%20we%20need%20an%20Enterprise%20CRM%20Consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="crm-plan-cta-btn crm-plan-cta-outline"
              >
                Contact for Enterprise Setup
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="crm-faq-section" id="faq">
        <div className="crm-container">
          <div className="crm-section-header">
            <span className="crm-section-badge">Common Inquiries</span>
            <h2 className="crm-section-title">Frequently Asked Questions</h2>
          </div>

          <div className="crm-faq-list">
            <div className="crm-faq-item">
              <button className="crm-faq-question" onClick={() => toggleFaq(0)}>
                <span>Is Propkads CRM suitable for real estate marketing agencies as well as developers?</span>
                <span>{openFaq === 0 ? '−' : '+'}</span>
              </button>
              {openFaq === 0 && (
                <div className="crm-faq-answer">
                  Yes, absolutely. The CRM supports multi-project management, dealer commissions, and lead pipelines suitable for both housing developers managing their own sales floor and marketing agencies selling inventory on contract.
                </div>
              )}
            </div>

            <div className="crm-faq-item">
              <button className="crm-faq-question" onClick={() => toggleFaq(1)}>
                <span>How does the duplicate phone number detection work?</span>
                <span>{openFaq === 1 ? '−' : '+'}</span>
              </button>
              {openFaq === 1 && (
                <div className="crm-faq-answer">
                  Whenever a lead is ingested via Facebook Ads, web forms, or manual entry, our system normalizes the Pakistani phone number and checks your database. If the phone already exists, it displays an alert with the assigned agent's name, preventing multiple agents from calling the same buyer.
                </div>
              )}
            </div>

            <div className="crm-faq-item">
              <button className="crm-faq-question" onClick={() => toggleFaq(2)}>
                <span>Can sales representatives see other agents&apos; leads?</span>
                <span>{openFaq === 2 ? '−' : '+'}</span>
              </button>
              {openFaq === 2 && (
                <div className="crm-faq-answer">
                  No. Sales representatives only have access to their assigned leads. They cannot view or export customer contact information assigned to other representatives, keeping your proprietary database secure.
                </div>
              )}
            </div>

            <div className="crm-faq-item">
              <button className="crm-faq-question" onClick={() => toggleFaq(3)}>
                <span>Who has permission to issue official Allotment Letters?</span>
                <span>{openFaq === 3 ? '−' : '+'}</span>
              </button>
              {openFaq === 3 && (
                <div className="crm-faq-answer">
                  Only the Company Administrator has the permission to enter confirmed bookings and generate or print official legal Allotment Letters. Sales agents and external brokers have view-only rights to prevent unauthorized document issuance.
                </div>
              )}
            </div>

            <div className="crm-faq-item">
              <button className="crm-faq-question" onClick={() => toggleFaq(4)}>
                <span>How quickly can our team get onboarded?</span>
                <span>{openFaq === 4 ? '−' : '+'}</span>
              </button>
              {openFaq === 4 && (
                <div className="crm-faq-answer">
                  Your dedicated company workspace can be set up within 24 to 48 hours. We configure your projects, plot inventory, and team accounts, followed by an onboarding walkthrough for your sales team.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Bottom Launch Banner */}
      <section className="crm-bottom-banner">
        <div className="crm-container">
          <h2 className="crm-bottom-title">Ready to Automate Your Real Estate Sales &amp; Team Productivity?</h2>
          <p className="crm-bottom-desc">
            Join forward-thinking developers and agencies operating on Propkads CRM. Experience zero lead leakage, faster plot bookings, and live sales accountability.
          </p>
          <div className="crm-bottom-ctas">
            <a
              href="https://crm.propkads.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="crm-btn-launch-portal"
            >
              <span>Login to Propkads CRM Portal →</span>
            </a>
            <a
              href="https://wa.me/923332000649?text=Hello%20Propkads,%20we%20want%20to%20get%20started%20with%20Propkads%20CRM."
              target="_blank"
              rel="noopener noreferrer"
              className="crm-btn-talk-demo"
            >
              <span>Talk to an Onboarding Specialist</span>
            </a>
          </div>
        </div>
      </section>

      {/* 10. Website Standard Footer */}
      <Footer />
    </div>
  );
}
