'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FacebookIcon, InstagramIcon, LinkedInIcon, YoutubeIcon } from '@/components/Icons';

export default function Footer({ c = {} }) {
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
    <footer className="footer-v2">
      <div className="footer-v2-inner">
        <div className="footer-v2-col footer-v2-brand">
          <img src="/logo.png" alt="Propkads" className="footer-v2-logo" />
          <p>{c?.footer_tagline || 'From launch to final booking, turning inventory into closed bookings.'}</p>
        </div>

        <div className="footer-v2-col footer-v2-links">
          <h4>Quick Links</h4>
          <div className="footer-links-grid">
            <div className="footer-links-subcol">
              <Link href="/about">About Us</Link>
              <Link href="/services">Services</Link>
              <Link href="/projects">Projects</Link>
            </div>
            <div className="footer-links-subcol">
              <Link href="/blog">Blogs</Link>
              <Link href="/careers">Career</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </div>
        </div>

        <div className="footer-v2-col footer-v2-contact">
          <h4>Contact</h4>
          <div className="footer-contact-list">
            <a href={`tel:${(c?.contact_phone || '+92 333 3401101').replace(/\s/g, '')}`}>{c?.contact_phone || '+92 333 3401101'}</a>
            <span>{c?.contact_email || 'contact@propkads.com'}</span>
            <span>{c?.contact_location || 'Karachi, Pakistan'}</span>
          </div>
        </div>

        <div className="footer-v2-col footer-v2-newsletter">
          <h4>{c?.newsletter_heading || 'Subscribe to Our Newsletter'}</h4>
          <div className="footer-newsletter-wrap">
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
            <div className="footer-v2-socials">
              <a href={c?.social_facebook || 'https://www.facebook.com/Propkads/'} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href={c?.social_instagram || 'https://www.instagram.com/propkads/'} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={c?.social_linkedin || 'https://www.linkedin.com/company/propkads/'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href={c?.social_youtube || 'https://www.youtube.com/@Propkads'} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-v2-bottom">
        <span>2020 © PROPKADS. All Rights Reserved</span>
      </div>
    </footer>
  );
}
