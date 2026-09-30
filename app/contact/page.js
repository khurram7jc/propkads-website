'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DEFAULT_CONTENT } from '@/data/content';
import { PhoneIcon, MailIcon, PinIcon, FacebookIcon, InstagramIcon, LinkedInIcon } from '@/components/Icons';
import '@/app/crm/crm.css';

export default function ContactPage() {
  const [c, setC] = useState(DEFAULT_CONTENT);
  const [form, setForm] = useState({ fullName: '', companyName: '', phone: '', city: '', inventoryType: '', notes: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setC((prev) => ({ ...prev, ...d.content }));
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) {
      setStatus('Please fill in your name and phone number.');
      return;
    }
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Thank you! Your project review request has been received. Our senior consultant will contact you via WhatsApp / Phone within 2 hours.');
        setForm({ fullName: '', companyName: '', phone: '', city: '', inventoryType: '', notes: '' });
      } else {
        setStatus(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('Failed to connect. Please WhatsApp us directly.');
    }
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Propkads, I would like to schedule a free project review for my real estate development.'
  );

  return (
    <div className="crm-page-wrap">
      {/* 1. Header */}
      <Header c={c} />

      {/* 2. Hero Section */}
      <section className="services-hub-hero">
        <div className="container">
          <div className="services-hub-hero-inner">
            <span className="section-tag">{c.contact_eyebrow || 'Contact Propkads'}</span>
            <h1 className="services-hub-title">
              {c.contact_heading || 'Get a Free Project Review'}
            </h1>
            <p className="services-hub-sub">
              {c.contact_intro ||
                'Tell us about your residential society, apartment high-rise, or commercial project. We will analyze your inventory and propose a predictable revenue strategy.'}
            </p>

            <div className="services-hub-hero-ctas">
              <a
                href={`https://wa.me/923333401101?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
              >
                <span>Instant Chat on WhatsApp</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="tel:+923333401101" className="btn btn-outline" style={{ background: '#fff' }}>
                Call +92 333 3401101
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Contact Form & Details Section */}
      <section className="section container">
        <div className="contact-wrap-v2" style={{ opacity: 1, transform: 'none' }}>
          {/* Left: Form Card */}
          <form className="contact-form-v2" onSubmit={handleSubmit}>
            <div className="contact-fields-card">
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--ink)', marginBottom: '8px' }}>
                Project Application Form
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--slate)', marginBottom: '16px' }}>
                Fill out the form below and our team will get back to you with a comprehensive audit.
              </p>

              <div className="field-v2">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
              </div>

              <div className="field-v2">
                <input
                  type="text"
                  placeholder="Company / Project Name"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                />
              </div>

              <div className="field-v2">
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp Number *"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className="field-v2">
                <input
                  type="text"
                  placeholder="Project Location / City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>

              <div className="field-v2">
                <select
                  required
                  className={form.inventoryType ? '' : 'is-placeholder'}
                  value={form.inventoryType}
                  onChange={(e) => setForm({ ...form, inventoryType: e.target.value })}
                >
                  <option value="" disabled hidden>Select Your Property Type</option>
                  <option>Apartments / High-Rise</option>
                  <option>Houses / Luxury Villas</option>
                  <option>Plots / Housing Scheme</option>
                  <option>Shops / Commercial Plaza</option>
                  <option>Farmhouses / Gated Land</option>
                </select>
              </div>

              <div className="field-v2">
                <input
                  type="text"
                  placeholder="Specific Goals (e.g. Need 3D Walkthrough, Meta Ads, CRM setup)"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              <div className="contact-submit-wrap" style={{ marginTop: '8px' }}>
                <button type="submit" className="btn btn-solid contact-submit-btn" style={{ border: 'none', width: '100%' }}>
                  Submit Project Review Request
                </button>
                {status && (
                  <p style={{ fontSize: '13.5px', color: 'var(--green)', marginTop: '12px', lineHeight: '1.5' }}>
                    {status}
                  </p>
                )}
              </div>
            </div>
          </form>

          {/* Right: Info Card */}
          <div className="contact-info-v2">
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--ink)', marginBottom: '16px' }}>
                Direct Contact Information
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: '1.6', marginBottom: '24px' }}>
                Prefer speaking directly? Our senior real estate growth partners are available Monday through Saturday.
              </p>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon"><PhoneIcon /></span>
              <div>
                <span className="lbl">Phone / WhatsApp</span>
                <a className="val" href={`tel:${c.contact_phone.replace(/\s/g, '')}`}>{c.contact_phone}</a>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon"><MailIcon /></span>
              <div>
                <span className="lbl">Email</span>
                <a className="val" href={`mailto:${c.contact_email}`}>{c.contact_email}</a>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon"><PinIcon /></span>
              <div>
                <span className="lbl">Office Location</span>
                <span className="val">{c.contact_location}</span>
              </div>
            </div>

            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
              <span className="lbl" style={{ display: 'block', marginBottom: '10px' }}>Follow Us Online</span>
              <div className="social-row">
                <a href={c.social_facebook || 'https://www.facebook.com/Propkads/'} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon /></a>
                <a href={c.social_instagram || 'https://www.instagram.com/propkads/'} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
                <a href={c.social_linkedin || 'https://www.linkedin.com/company/propkads/'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <Footer c={c} />
    </div>
  );
}
