'use client';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';

const DEFAULT_CONTENT = {
  header_nav_1: 'About Us',
  header_nav_2: 'Services',
  header_nav_3: 'How It Works',
  header_nav_4: 'Contact',
  header_cta_text: 'Get a Free Review',
  hero_step_1: 'Project Audit',
  hero_step_1_desc: 'Inventory review, pricing analysis, buyer profiling, and competitor assessment.',
  hero_step_2: 'Launch & CRM Setup',
  hero_step_2_desc: 'Campaign launch, CRM pipeline configuration, and sales team assignment rules.',
  hero_step_3: 'Weekly Optimization',
  hero_step_3_desc: 'Lead quality improvement, follow-up correction, and sales activity monitoring.',
  hero_step_4: 'Conversion & Scaling',
  hero_step_4_desc: 'Booking-focused optimization and revenue scaling based on real performance data.',
  hero_heading: 'Sell Your Real Estate Inventory With a Complete Revenue System — Not Just Ads',
  hero_subheading:
    'We help real estate developers generate high-intent buyers, control leads through CRM, monitor sales teams, and improve conversions — end to end.',
  hero_bullet_1: 'Performance Marketing (Buyer Acquisition)',
  hero_bullet_2: 'CRM Integration & Lead Control',
  hero_bullet_3: 'Sales Team Accountability & Closing Support',
  about_eyebrow: 'About Propkads',
  about_heading: 'A sales-driven real estate growth partner.',
  about_lead_1: 'Propkads is a sales-driven real estate growth partner created to help developers move inventory through systems — not assumptions.',
  about_lead_2: 'With deep industry understanding and hands-on experience in real estate marketing, documentation, and sales operations, we bridge the gap between lead generation and actual bookings.',
  about_lead_3: 'We do not operate as a traditional agency. Our role is to design, manage, and optimize the entire sales pipeline — from buyer acquisition to CRM control and closing support.',
  about_card_1_title: 'Our Approach',
  about_card_1_bullets: 'Sales-first, not vanity marketing\nCRM-led visibility and accountability\nPractical execution aligned with revenue\nHonest timelines and data-driven decisions',
  about_card_1_note: "Within 60–90 days, developers gain real clarity on what sells — and what doesn't.",
  about_card_2_title: 'Why Propkads Exists',
  about_card_2_bullets: 'Most projects fail to convert due to weak systems\nPoor follow-up costs more sales than low demand\nLack of visibility keeps owners in the dark',
  about_card_2_note: 'We replace guesswork with structure, tracking, and control.',
  about_card_3_title: 'What Makes Us Different',
  about_card_3_bullets: 'We manage the system, not just ads\nWe track people, not just numbers\nWe focus on closings, not impressions\nWe scale only what performs',
  about_card_3_note: 'We help developers turn inquiries into bookings by building systems that sell.',
  services_eyebrow: 'What We Do',
  services_heading: 'Driving a better way of doing marketing.',
  services_intro: 'We deliver revenue impact through a combination of performance marketing, CRM control, and sales accountability.',
  checklist_heading: 'What This Gives You',
  checklist_1: 'Real-time CRM visibility',
  checklist_2: 'Weekly performance reports',
  checklist_3: 'Direct WhatsApp & phone leads',
  checklist_4: 'No guesswork, no excuses',
  services_stat_value: '60–90 Days',
  services_stat_label: 'To real sales clarity',
  service_1_title: 'Buyer Acquisition',
  service_1_desc: 'High-intent buyers through targeted digital campaigns based on location, budget, and inventory type.',
  service_2_title: 'CRM Integration & Lead Control',
  service_2_desc: 'All leads captured in CRM with real-time tracking, tagging, and automated distribution.',
  service_3_title: 'Sales Team Accountability',
  service_3_desc: 'Response times, follow-ups, and conversions monitored to improve discipline and performance.',
  service_4_title: 'Closing & Deal Support',
  service_4_desc: 'Objection handling, payment guidance, documentation clarity, and deal structure support.',
  commercial_model_tagline: 'We earn more only when you sell more.',
  contact_phone: '+92 333 2000649',
  contact_email: 'contact@propkads.com',
  contact_location: 'Karachi, Pakistan',
};

export default function Home() {
  const [c, setC] = useState(DEFAULT_CONTENT);
  const [form, setForm] = useState({ fullName: '', companyName: '', phone: '', city: '', inventoryType: 'Apartments' });
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
        setStatus('Thank you — we will get back to you shortly.');
        setForm({ fullName: '', companyName: '', phone: '', city: '', inventoryType: 'Apartments' });
      } else {
        setStatus(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('Failed to connect. Please call us directly.');
    }
  };

  return (
    <main id="top">
      <Header c={c} />

      {/* HERO */}
      <Hero
        c={c}
        onQuickPhone={(phone) => {
          setForm((f) => ({ ...f, phone }));
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* POSITIONING */}
      <section className="section container" id="positioning">
        <div className="section-tag">Positioning</div>
        <h2>Built for Real Estate Developers — Designed for Closings</h2>
        <p className="section-intro">
          Propkads is not a traditional marketing agency. We build and operate a sales-focused revenue system
          that connects buyer acquisition, CRM control, and sales team accountability.
        </p>
        <div className="twocol">
          <div className="no">
            <h3>Why Most Projects Struggle to Sell</h3>
            <ul>
              <li>Leads are generated, but conversions remain low</li>
              <li>Sales teams fail to follow up consistently</li>
              <li>No visibility into lead status or agent performance</li>
              <li>Owners receive excuses instead of real data</li>
            </ul>
          </div>
          <div className="yes">
            <h3>What Propkads Changes</h3>
            <ul>
              <li>Every lead tracked from first click to closing</li>
              <li>Sales follow-up monitored and enforced</li>
              <li>Full visibility into lead status and agent performance</li>
              <li>Real CRM data instead of excuses</li>
            </ul>
          </div>
        </div>
        <p className="callout">Marketing alone does not sell projects — systems do.</p>
      </section>

      {/* SYSTEM FLOW */}
      <section className="section container" id="system-flow">
        <div className="section-tag">System</div>
        <h2>A Complete Revenue &amp; Sales System for Developers</h2>
        <p className="section-intro">Founded in 2020 — serving developers all over Pakistan.</p>
        <div className="flow">
          <div className="flow-step"><span>S-01</span>Buyers</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step"><span>S-02</span>CRM</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step"><span>S-03</span>Sales Team</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step" style={{ color: 'var(--green)' }}><span>S-04</span>Closings</div>
        </div>
        <p className="flow-note">Every lead is tracked, assigned, followed up, and pushed toward booking with full visibility.</p>
      </section>

      {/* ABOUT */}
      <About c={c} />

      {/* SERVICES */}
      <Services c={c} />

      {/* HOW IT WORKS */}
      <section className="section container" id="how-it-works">
        <div className="section-tag">How It Works</div>
        <h2>Our working process.</h2>
        <div className="process-grid">
          <div className="process-card"><span>STEP 01</span><h3>Project Audit</h3><p>Inventory review, pricing analysis, buyer profiling, and competitor assessment.</p></div>
          <div className="process-card"><span>STEP 02</span><h3>Launch &amp; CRM Setup</h3><p>Campaign launch, CRM pipeline configuration, and sales team assignment rules.</p></div>
          <div className="process-card"><span>STEP 03</span><h3>Weekly Optimization</h3><p>Lead quality improvement, follow-up correction, and sales activity monitoring.</p></div>
          <div className="process-card"><span>STEP 04</span><h3>Conversion &amp; Scaling</h3><p>Booking-focused optimization and revenue scaling based on real performance data.</p></div>
        </div>
      </section>

      {/* EXECUTION SUPPORT */}
      <section className="section container" id="execution">
        <div className="section-tag">Execution Support</div>
        <h2>Creative used only when it moves sales.</h2>
        <div className="exec-wrap">
          <ul className="exec-list">
            <li>Project branding &amp; sales creatives</li>
            <li>2D / 3D visuals &amp; walkthroughs</li>
            <li>Sales videos, reels &amp; presentations</li>
            <li>Landing pages &amp; websites</li>
          </ul>
          <p className="exec-note">
            Creative and digital execution is used only when it directly improves sales performance. All execution
            is aligned with revenue objectives — not vanity metrics.
          </p>
        </div>
      </section>

      {/* COMMERCIAL MODEL */}
      <section className="section container" id="model">
        <div className="section-tag">Commercial Model</div>
        <h2>Retainer + Performance Structure</h2>
        <div className="model-box">
          <ul>
            <li>Monthly retainer based on project scope</li>
            <li>Plus per-booking incentive or mutually agreed revenue share</li>
          </ul>
          <p className="model-tagline">{c.commercial_model_tagline}</p>
          <p className="model-min">Minimum engagement period: 60–90 days</p>
        </div>
      </section>

      {/* IDEAL CLIENT FIT */}
      <section className="section container" id="fit">
        <div className="section-tag">Ideal Client Fit</div>
        <h2>Who we work best with.</h2>
        <div className="twocol">
          <div className="yes">
            <h3>Best Fit For</h3>
            <ul>
              <li>Developers with unsold or slow-moving inventory</li>
              <li>Projects generating leads but struggling with conversions</li>
              <li>Owners seeking transparency, control, and revenue visibility</li>
            </ul>
          </div>
          <div className="no">
            <h3>Not a Fit For</h3>
            <ul>
              <li>Clients looking only for branding or impressions</li>
              <li>Teams avoiding CRM and accountability</li>
              <li>Short-term or experimental mindsets</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section container" id="faq">
        <div className="section-tag">FAQ</div>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details className="faq-item" open>
            <summary>Do you guarantee sales?</summary>
            <p>We do not offer false guarantees. We build a measurable system that shows real sales potential within 60–90 days using CRM-based data.</p>
          </details>
          <details className="faq-item">
            <summary>Are you just running ads?</summary>
            <p>No. Ads are only the starting point. CRM control, sales team accountability, and closing support drive conversions.</p>
          </details>
          <details className="faq-item">
            <summary>Do you replace our sales team?</summary>
            <p>No. We strengthen and enable your existing sales team through systems, tracking, and performance control.</p>
          </details>
          <details className="faq-item">
            <summary>What type of projects do you work with?</summary>
            <p>We work with developers who value structure, transparency, and long-term revenue control.</p>
          </details>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section container" id="contact">
        <div className="section-tag">Contact</div>
        <h2>Get a Free Project Review</h2>
        <p className="section-intro">Please provide the correct information below and our team will get back to you.</p>
        <div className="contact-wrap">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <input type="text" placeholder="Full Name *" required value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            </div>
            <div className="field">
              <input type="text" placeholder="Company / Project Name" value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
            </div>
            <div className="field">
              <input type="tel" placeholder="Phone / WhatsApp *" required value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="field">
              <input type="text" placeholder="City" value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
            <div className="field">
              <select value={form.inventoryType} onChange={(e) => setForm({ ...form, inventoryType: e.target.value })}>
                <option>Apartments</option>
                <option>Plots</option>
                <option>Commercial</option>
              </select>
            </div>
            <button type="submit" className="btn btn-solid" style={{ border: 'none', marginTop: 8 }}>Submit Enquiry</button>
            {status && <p style={{ fontSize: 13.5, color: 'var(--slate)', marginTop: 4 }}>{status}</p>}
          </form>
          <div className="contact-info">
            <div><span className="lbl">Phone</span><a className="val" href={`tel:${c.contact_phone.replace(/\s/g, '')}`}>{c.contact_phone}</a></div>
            <div><span className="lbl">Email</span><a className="val" href={`mailto:${c.contact_email}`}>{c.contact_email}</a></div>
            <div><span className="lbl">Location</span><span className="val">{c.contact_location}</span></div>
            <div>
              <span className="lbl">Follow Us</span>
              <div className="social-row">
                <a href="https://www.facebook.com/Propkads/" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://www.instagram.com/propkads/" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.linkedin.com/company/propkads/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://www.youtube.com/@Propkads" target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href="https://x.com/propkads" target="_blank" rel="noopener noreferrer">X</a>
                <a href="https://www.tiktok.com/@propkads" target="_blank" rel="noopener noreferrer">TikTok</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer container">
        <span>2020 © PROPKADS. All Rights Reserved</span>
        <span>PROPKADS.COM</span>
      </footer>
    </main>
  );
}
