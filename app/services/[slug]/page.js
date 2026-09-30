'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SERVICES_DATA } from '@/data/services';
import ServiceIcon from '@/components/ServiceIcons';
import '@/app/crm/crm.css';

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

export default function ServiceDetailPage({ params }) {
  const { slug } = params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  const [c, setC] = useState(DEFAULT_CONTENT);
  const [form, setForm] = useState({ name: '', phone: '', project: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setC((prev) => ({ ...prev, ...d.content }));
      })
      .catch(() => {});
  }, []);

  if (!service) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Propkads, I am interested in your "${service.title}" service for my real estate project. Please share details and pricing.`
  );

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setStatus('Please enter your name and phone number.');
      return;
    }
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.name,
          phone: form.phone,
          companyName: form.project,
          inventoryType: service.title,
          city: form.message || 'Consultation Request'
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Thank you! Our growth consultant will reach out via WhatsApp/Call within 2 hours.');
        setForm({ name: '', phone: '', project: '', message: '' });
      } else {
        setStatus(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('Failed to send. Please WhatsApp us directly.');
    }
  };

  return (
    <div className="crm-page-wrap">
      {/* 1. Header */}
      <Header c={c} />

      {/* 2. Breadcrumbs & Service Hero */}
      <section className="service-detail-hero">
        <div className="container">
          <div className="service-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <span className="current">{service.title}</span>
          </div>

          <div className="service-detail-header">
            <div className="service-detail-badge-row">
              <span className="section-tag">{service.categoryName}</span>
              <span className="service-category-pill">{service.badge}</span>
            </div>

            <h1 className="service-detail-h1">{service.title}</h1>
            <p className="service-detail-lead">{service.longDesc}</p>

            <div className="service-detail-impact-box">
              <span className="impact-dot"></span>
              <span><b>Target Outcome:</b> {service.impact}</span>
            </div>

            <div className="service-detail-ctas">
              <a
                href={`https://wa.me/923333401101?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
              >
                <span>Discuss on WhatsApp</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#quote-form" className="btn btn-outline" style={{ background: '#fff' }}>
                Request Custom Proposal ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deliverables Scope & Proposal Form */}
      <section className="section container" style={{ paddingBottom: '20px' }}>
        <div className="service-content-grid">
          {/* Left: Deliverables Scope */}
          <div className="service-content-main">
            <div className="service-block">
              <h2 className="service-block-heading">Comprehensive Deliverables Scope</h2>
              <p style={{ color: 'var(--slate)', marginBottom: '20px', fontSize: '15px' }}>
                Every deliverable is crafted specifically to increase real estate buyer confidence, justify premium pricing, and accelerate deal closures.
              </p>

              <div className="deliverables-checklist-grid">
                {service.deliverables.map((item, idx) => (
                  <div className="deliverable-item-card" key={idx}>
                    <div className="deliverable-check-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="deliverable-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Quick Proposal Form */}
          <div className="service-content-sidebar" id="quote-form">
            <div className="service-quote-card">
              <div className="service-quote-badge">Direct Agency Service</div>
              <h3>Get a Customized Proposal</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--slate)', margin: '8px 0 20px 0' }}>
                Share your project details to receive a tailored scope, pricing tiers, and delivery schedule.
              </p>

              <form onSubmit={handleConsultSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="field-v2">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="field-v2">
                    <input
                      type="tel"
                      placeholder="WhatsApp / Phone Number *"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <div className="field-v2">
                    <input
                      type="text"
                      placeholder="Project Name / Location"
                      value={form.project}
                      onChange={(e) => setForm({ ...form, project: e.target.value })}
                    />
                  </div>

                  <div className="field-v2">
                    <input
                      type="text"
                      placeholder="Specific Requirements / Target Date"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-solid" style={{ width: '100%', marginTop: '6px' }}>
                    Request Proposal
                  </button>

                  {status && (
                    <p style={{ fontSize: '13px', color: 'var(--green)', marginTop: '8px', lineHeight: '1.5' }}>
                      {status}
                    </p>
                  )}
                </div>
              </form>

              <div className="service-quote-contact-alt">
                <span>Or connect immediately:</span>
                <a href="tel:+923333401101">+92 333 3401101</a>
                <a href="mailto:contact@propkads.com">contact@propkads.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full-Width Execution Workflow & Why Propkads */}
      <section className="section container" style={{ paddingTop: '20px', paddingBottom: '36px' }}>
        {/* Workflow Section */}
        <div className="service-block">
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="section-tag">Systematic Process</span>
            <h2 style={{ fontSize: '28px', color: 'var(--ink)' }}>Execution &amp; Deployment Workflow</h2>
            <p style={{ color: 'var(--slate)', fontSize: '15px', maxWidth: '640px', margin: '8px auto 0 auto' }}>
              Our systematic 4-step process ensures clear timelines and transparent delivery milestones.
            </p>
          </div>

          <div className="workflow-timeline-list">
            {service.workflow.map((step, idx) => (
              <div className="workflow-step-card" key={idx}>
                <div className="workflow-step-badge">{step.step}</div>
                <div className="workflow-step-content">
                  <h3 className="workflow-step-title">{step.title}</h3>
                  <p className="workflow-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Propkads */}
        <div className="service-why-card" style={{ marginTop: '36px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#0F172A', textAlign: 'center' }}>
            Why Real Estate Developers Choose Propkads for This Service
          </h3>
          <p style={{ color: 'var(--slate)', fontSize: '15px', lineHeight: '1.7', textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
            Unlike generic agencies that treat real estate like e-commerce or clothing brands, Propkads specializes 100% in property marketing, plot/apartment sales psychology, and developer cash flow cycles. Our team understands NOC verification, installment plans, buyer objections, and on-ground closing operations.
          </p>
        </div>
      </section>

      {/* 5. Footer */}
      <Footer c={c} />
    </div>
  );
}
