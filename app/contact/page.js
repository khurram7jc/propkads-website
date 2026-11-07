'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DEFAULT_CONTENT } from '@/data/content';
import { PhoneIcon, MailIcon, PinIcon, FacebookIcon, InstagramIcon, LinkedInIcon } from '@/components/Icons';
import '@/app/crm/crm.css';

export default function ContactPage() {
  const [c, setC] = useState(DEFAULT_CONTENT);
  const [form, setForm] = useState({ fullName: '', companyName: '', phone: '', city: '', inventoryType: '' });
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
        body: JSON.stringify({ ...form, leadCategory: 'client' }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Thank you! Your project review request has been received. Our senior consultant will contact you via WhatsApp / Phone within 2 hours.');
        setForm({ fullName: '', companyName: '', phone: '', city: '', inventoryType: '' });
      } else {
        setStatus(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('Failed to connect. Please WhatsApp us directly.');
    }
  };

  return (
    <div className="crm-page-wrap">
      {/* 1. Header */}
      <Header c={c} />

      {/* 2. Hero Section with Background Video & Brand Overlay */}
      <section className="services-hub-hero">
        {/* Background Video with Real Estate Towers & Overlay */}
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            className="hero-video-bg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/hero-properties.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>

        <div className="container">
          <div className="services-hub-hero-inner">
            <h1 className="services-hub-title">
              Get a Free Project Review
            </h1>
          </div>
        </div>
      </section>

      {/* 3. Contact Form & Details Section */}
      <section className="section container">
        {/* Intro Paragraph */}
        <div className="page-hero-subtitle-wrap">
          <p className="page-hero-subtitle">
            Whether you&apos;re launching a new development or accelerating existing inventory sales, our team is ready to assist. Reach out today for an honest, data-backed project review.
          </p>
        </div>

        <div className="contact-wrap-v2" style={{ opacity: 1, transform: 'none' }}>
          {/* Left: Form Card */}
          <form className="contact-form-v2" onSubmit={handleSubmit}>
            <div className="contact-fields-card">
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--ink)', marginBottom: '18px' }}>
                Project Application Form
              </h3>

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
                  placeholder="Phone / WhatsApp *"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className="field-v2">
                <input
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>

              <div className="field-v2">
                <select
                  className={form.inventoryType ? '' : 'is-placeholder'}
                  value={form.inventoryType}
                  onChange={(e) => setForm({ ...form, inventoryType: e.target.value })}
                >
                  <option value="" disabled hidden>Select Your Property Type</option>
                  <option>Apartments</option>
                  <option>Houses / Villas</option>
                  <option>Plots / Land</option>
                  <option>Shops / Commercial</option>
                  <option>Farmhouses</option>
                </select>
              </div>

              <div className="contact-submit-wrap" style={{ marginTop: '8px' }}>
                <button type="submit" className="contact-submit-btn">
                  Submit Enquiry
                </button>
                {status && (
                  <p style={{ fontSize: 13.5, color: 'var(--slate)', marginTop: 12, textAlign: 'center', lineHeight: '1.5' }}>
                    {status}
                  </p>
                )}
              </div>
            </div>
          </form>

          {/* Right: Info Card */}
          <div className="contact-info-v2">
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--ink)', marginBottom: '20px' }}>
                Direct Contact Information
              </h3>
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
