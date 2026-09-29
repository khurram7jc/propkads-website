'use client';
import { useState } from 'react';

export default function Footer({ c }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Subscribed! Thank you.');
        setEmail('');
      } else {
        setStatus(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('Failed to connect. Please try again.');
    }
  };

  return (
    <footer className="footer-v2 reveal">
      <div className="footer-v2-inner">
        <div className="footer-v2-col footer-v2-brand">
          <img src="/logo.png" alt="Propkads" className="footer-v2-logo" />
          <p>{c.footer_tagline || 'A complete revenue system for real estate developers — not just ads.'}</p>
        </div>

        <div className="footer-v2-col footer-v2-links">
          <h4>Quick Links</h4>
          <a href="/#about">{c?.header_nav_1 || 'About Us'}</a>
          <a href="/#services">{c?.header_nav_2 || 'Services'}</a>
          <a href="/#how-it-works">{c?.header_nav_3 || 'How It Works'}</a>
          <a href="/crm">Propkads CRM</a>
          <a href="/#contact">{c?.header_nav_4 || 'Contact'}</a>
        </div>

        <div className="footer-v2-col footer-v2-contact">
          <h4>Contact</h4>
          <a href={`tel:${(c.contact_phone || '').replace(/\s/g, '')}`}>{c.contact_phone}</a>
          <a href={`mailto:${c.contact_email}`}>{c.contact_email}</a>
          <span>{c.contact_location}</span>
        </div>

        <div className="footer-v2-col footer-v2-newsletter">
          <h4>{c.newsletter_heading || 'Subscribe to Our Newsletter'}</h4>
          <p style={{ fontSize: 13, color: '#9DA1A8', marginBottom: 4 }}>
            {c.newsletter_intro || 'Get updates on real estate marketing insights.'}
          </p>
          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">{c.newsletter_button || 'Subscribe'}</button>
          </form>
          {status && <p className="footer-newsletter-status">{status}</p>}
        </div>
      </div>

      <div className="footer-v2-bottom">
        <span>2020 © PROPKADS. All Rights Reserved</span>
        <span>PROPKADS.COM</span>
      </div>
    </footer>
  );
}
