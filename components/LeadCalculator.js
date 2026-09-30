'use client';

import { useState } from 'react';

export default function LeadCalculator() {
  const [projectType, setProjectType] = useState('apartments');
  const [units, setUnits] = useState(60);
  const [avgPrice, setAvgPrice] = useState(85); // in Lacs PKR

  // Calculations
  const totalRevenueCrore = ((units * avgPrice) / 100).toFixed(1);
  const conversionRate = projectType === 'commercial' ? 0.02 : projectType === 'apartments' ? 0.025 : 0.03;
  const estimatedLeadsNeeded = Math.round(units / conversionRate);
  const avgCpl = 350; // PKR 350 average
  const totalAdBudgetLacs = Math.round((estimatedLeadsNeeded * avgCpl) / 100000);
  const suggestedMonthlyAdLacs = Math.max(2, Math.round(totalAdBudgetLacs / 6));

  const formatPrice = (val) => {
    if (val >= 100) {
      return `PKR ${(val / 100).toFixed(2)} Crore`;
    }
    return `PKR ${val} Lacs`;
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Propkads, I used your Project Revenue Calculator for my ${projectType} project (${units} units, avg price ${formatPrice(avgPrice)}, target revenue PKR ${totalRevenueCrore} Crore). I would like to schedule a strategy consultation.`
  );

  return (
    <section className="section container" id="calculator">
      <div className="calc-card-container">
        <div className="calc-header">
          <span className="section-tag">Interactive Planning Tool</span>
          <h2 className="calc-title">Real Estate Project Revenue &amp; Lead Calculator</h2>
          <p className="section-intro" style={{ maxWidth: '720px', margin: '0 auto 36px auto' }}>
            Calculate the exact lead volume, recommended digital ad spend, and sales timeline needed to sell out your residential or commercial inventory.
          </p>
        </div>

        <div className="calc-layout-grid">
          {/* Left Column: Sliders & Controls */}
          <div className="calc-controls-col">
            {/* Project Type Picker */}
            <div className="calc-group">
              <label className="calc-label">1. Select Property Project Type</label>
              <div className="calc-type-buttons">
                <button
                  type="button"
                  className={`calc-type-btn ${projectType === 'plots' ? 'active' : ''}`}
                  onClick={() => setProjectType('plots')}
                >
                  🏡 Housing Scheme
                </button>
                <button
                  type="button"
                  className={`calc-type-btn ${projectType === 'apartments' ? 'active' : ''}`}
                  onClick={() => setProjectType('apartments')}
                >
                  🏢 High-Rise Apartments
                </button>
                <button
                  type="button"
                  className={`calc-type-btn ${projectType === 'commercial' ? 'active' : ''}`}
                  onClick={() => setProjectType('commercial')}
                >
                  🛍️ Commercial Plaza
                </button>
              </div>
            </div>

            {/* Units Slider */}
            <div className="calc-group">
              <div className="calc-slider-header">
                <label className="calc-label">2. Total Units / Properties to Sell</label>
                <span className="calc-slider-value">{units} Units</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="calc-range-slider"
              />
              <div className="calc-range-limits">
                <span>10 Units</span>
                <span>150 Units</span>
                <span>300 Units</span>
              </div>
            </div>

            {/* Average Price Slider */}
            <div className="calc-group">
              <div className="calc-slider-header">
                <label className="calc-label">3. Average Unit Selling Price</label>
                <span className="calc-slider-value">{formatPrice(avgPrice)}</span>
              </div>
              <input
                type="range"
                min="25"
                max="500"
                step="5"
                value={avgPrice}
                onChange={(e) => setAvgPrice(Number(e.target.value))}
                className="calc-range-slider"
              />
              <div className="calc-range-limits">
                <span>PKR 25 Lacs</span>
                <span>PKR 2.5 Crore</span>
                <span>PKR 5.0 Crore</span>
              </div>
            </div>
          </div>

          {/* Right Column: Projections Card */}
          <div className="calc-results-col">
            <div className="calc-results-card">
              <span className="calc-result-badge">Projected Sales Blueprint</span>
              
              <div className="calc-big-stat">
                <span className="calc-stat-label">Total Inventory Revenue Target</span>
                <span className="calc-stat-number">PKR {totalRevenueCrore} Crore</span>
              </div>

              <div className="calc-stats-grid">
                <div className="calc-mini-stat">
                  <span className="calc-mini-label">Verified Leads Needed</span>
                  <span className="calc-mini-val">~{estimatedLeadsNeeded.toLocaleString()}</span>
                  <span className="calc-mini-sub">Based on ~{(conversionRate * 100).toFixed(1)}% deal closing rate</span>
                </div>

                <div className="calc-mini-stat">
                  <span className="calc-mini-label">Monthly Ad Spend Guide</span>
                  <span className="calc-mini-val">PKR {suggestedMonthlyAdLacs} Lacs / mo</span>
                  <span className="calc-mini-sub">Meta, TikTok &amp; Google buyer funnels</span>
                </div>

                <div className="calc-mini-stat">
                  <span className="calc-mini-label">Target Sales Velocity</span>
                  <span className="calc-mini-val">6 – 9 Months</span>
                  <span className="calc-mini-sub">With Propkads CRM &amp; Call Audits</span>
                </div>

                <div className="calc-mini-stat">
                  <span className="calc-mini-label">Average CPL Benchmark</span>
                  <span className="calc-mini-val">PKR 300 – 450</span>
                  <span className="calc-mini-sub">Filtered phone-verified inquiries</span>
                </div>
              </div>

              <div className="calc-cta-wrap">
                <a
                  href={`https://wa.me/923332000649?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="calc-btn-action"
                >
                  <span>Discuss Strategy on WhatsApp</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <span className="calc-guarantee-note">✓ 100% Free Consultation • No Obligation Project Audit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
