'use client';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { PhoneIcon, MailIcon, PinIcon, FacebookIcon, InstagramIcon, LinkedInIcon, YoutubeIcon, XIcon, TiktokIcon } from '@/components/Icons';
import Hero from '@/components/Hero';
import Positioning from '@/components/Positioning';
import SystemFlow from '@/components/SystemFlow';
import Services from '@/components/Services';
import About from '@/components/About';
import HowItWorks from '@/components/HowItWorks';
import ExecutionSupport from '@/components/ExecutionSupport';
import CommercialModel from '@/components/CommercialModel';
import IdealFit from '@/components/IdealFit';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const DEFAULT_CONTENT = {
  system_eyebrow: 'System',
  system_heading: 'A Complete Revenue & Sales System for Developers',
  system_intro: 'Founded in 2020 — serving developers all over Pakistan.',
  system_step_1: 'Buyers',
  system_step_2: 'CRM',
  system_step_3: 'Sales Team',
  system_step_4: 'Closings',
  system_note: 'Every lead is tracked, assigned, followed up, and pushed toward booking with full visibility.',
  pos_eyebrow: 'Positioning',
  pos_heading: 'Built for Real Estate Developers — Designed for Closings',
  pos_intro: 'Propkads is not a traditional marketing agency. We build and operate a sales-focused revenue system that connects buyer acquisition, CRM control, and sales team accountability.',
  pos_problem_label: 'Why Most Projects Struggle to Sell',
  pos_problem_1: 'Leads are generated, but conversions remain low',
  pos_problem_2: 'Sales teams fail to follow up consistently',
  pos_problem_3: 'No visibility into lead status or agent performance',
  pos_problem_4: 'Owners receive excuses instead of real data',
  pos_solution_label: 'What Propkads Changes',
  pos_solution_1: 'Every lead tracked from first click to closing',
  pos_solution_2: 'Sales follow-up monitored and enforced',
  pos_solution_3: 'Full visibility into lead status and agent performance',
  pos_solution_4: 'Real CRM data instead of excuses',
  pos_callout: 'Marketing alone does not sell projects — systems do.',
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
  faq_eyebrow: 'FAQ',
  faq_intro: 'Common questions about our services, lead generation, CRM control, and how we work with real estate developers.',
  faq_heading: 'Frequently Asked Questions',
  faq_q1: 'Do you guarantee sales?',
  faq_a1: 'We do not offer false guarantees. We build a measurable system that shows real sales potential within 60–90 days using CRM-based data.',
  faq_q2: 'Are you just running ads?',
  faq_a2: 'No. Ads are only the starting point. CRM control, sales team accountability, and closing support drive conversions.',
  faq_q3: 'Do you replace our sales team?',
  faq_a3: 'No. We strengthen and enable your existing sales team through systems, tracking, and performance control.',
  faq_q4: 'What type of projects do you work with?',
  faq_a4: 'We work with developers who value structure, transparency, and long-term revenue control.',
  fit_eyebrow: 'Ideal Client Fit',
  fit_heading: 'Who we work best with.',
  fit_yes_label: 'Best Fit For',
  fit_yes_1: 'Developers with unsold or slow-moving inventory',
  fit_yes_2: 'Projects generating leads but struggling with conversions',
  fit_yes_3: 'Owners seeking transparency, control, and revenue visibility',
  fit_no_label: 'Not a Fit For',
  fit_no_1: 'Clients looking only for branding or impressions',
  fit_no_2: 'Teams avoiding CRM and accountability',
  fit_no_3: 'Short-term or experimental mindsets',
  model_eyebrow: 'Commercial Model',
  model_heading: 'Retainer + Performance Structure',
  model_retainer_label: 'Retainer',
  model_retainer_desc: 'Monthly retainer based on project scope',
  model_performance_label: 'Performance',
  model_performance_desc: 'Plus per-booking incentive or mutually agreed revenue share',
  model_min_engagement: 'Minimum engagement period: 60–90 days',
  exec_eyebrow: 'Execution Support',
  exec_heading: 'Creative used only when it moves sales.',
  exec_intro: 'Creative and digital execution is used only when it directly improves sales performance.',
  exec_item_1: 'Project branding & sales creatives',
  exec_item_2: '2D / 3D visuals & walkthroughs',
  exec_item_3: 'Sales videos, reels & presentations',
  exec_item_4: 'Landing pages & websites',
  exec_note: 'All execution is aligned with revenue objectives — not vanity metrics.',
  howitworks_eyebrow: 'How It Works',
  howitworks_heading: 'Our working process.',
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
  contact_eyebrow: 'Contact',
  contact_heading: 'Get a Free Project Review',
  contact_intro: 'Please provide the correct information below and our team will get back to you.',
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
  contact_phone: '+92 333 2000649',
  contact_email: 'contact@propkads.com',
  contact_location: 'Karachi, Pakistan',
};

export default function Home() {
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

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
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
        setForm({ fullName: '', companyName: '', phone: '', city: '', inventoryType: '' });
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
      <Positioning c={c} />

      {/* SYSTEM FLOW */}
      <SystemFlow c={c} />

      {/* ABOUT */}
      <About c={c} />

      {/* SERVICES */}
      <Services c={c} />

      {/* HOW IT WORKS */}
      <HowItWorks c={c} />

      {/* EXECUTION SUPPORT */}
      <ExecutionSupport c={c} />

      {/* COMMERCIAL MODEL */}
      <CommercialModel c={c} />

      {/* IDEAL CLIENT FIT */}
      <IdealFit c={c} />

      {/* FAQ */}
      <FAQ c={c} />

      {/* CONTACT */}
      <section className="section container reveal" id="contact">
        <div className="section-tag">{c.contact_eyebrow || 'Contact'}</div>
        <h2>{c.contact_heading || 'Get a Free Project Review'}</h2>
        <p className="section-intro">{c.contact_intro || 'Please provide the correct information below and our team will get back to you.'}</p>
        <div className="contact-wrap-v2">
          <form className="contact-form-v2" onSubmit={handleSubmit}>
            <div className="contact-fields-card">
              <div className="field-v2">
                <input type="text" placeholder="Full Name *" required value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              </div>
              <div className="field-v2">
                <input type="text" placeholder="Company / Project Name" value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
              </div>
              <div className="field-v2">
                <input type="tel" placeholder="Phone / WhatsApp *" required value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="field-v2">
                <input type="text" placeholder="City" value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div className="field-v2">
                <select
                  required
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
            </div>
            <div className="contact-submit-wrap">
              <button type="submit" className="btn btn-solid contact-submit-btn" style={{ border: 'none', width: '100%' }}>Submit Enquiry</button>
              {status && <p style={{ fontSize: 13.5, color: 'var(--slate)', marginTop: 10 }}>{status}</p>}
            </div>
          </form>

          <div className="contact-info-v2">
            <div className="contact-info-item">
              <span className="contact-info-icon"><PhoneIcon /></span>
              <div><span className="lbl">Phone</span><a className="val" href={`tel:${c.contact_phone.replace(/\s/g, '')}`}>{c.contact_phone}</a></div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon"><MailIcon /></span>
              <div><span className="lbl">Email</span><a className="val" href={`mailto:${c.contact_email}`}>{c.contact_email}</a></div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon"><PinIcon /></span>
              <div><span className="lbl">Location</span><span className="val">{c.contact_location}</span></div>
            </div>
            <div>
              <span className="lbl" style={{ display: 'block', marginBottom: 10 }}>Follow Us</span>
              <div className="social-row">
                <a href={c.social_facebook || 'https://www.facebook.com/Propkads/'} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon /></a>
                <a href={c.social_instagram || 'https://www.instagram.com/propkads/'} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
                <a href={c.social_linkedin || 'https://www.linkedin.com/company/propkads/'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
                <a href={c.social_youtube || 'https://www.youtube.com/@Propkads'} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><YoutubeIcon /></a>
                <a href={c.social_x || 'https://x.com/propkads'} target="_blank" rel="noopener noreferrer" aria-label="X"><XIcon /></a>
                <a href={c.social_tiktok || 'https://www.tiktok.com/@propkads'} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TiktokIcon /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer c={c} />
    </main>
  );
}
