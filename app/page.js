'use client';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '', companyName: '', phone: '', city: '', inventoryType: 'Apartments'
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Thank you! Your enquiry has been received.');
        setFormData({ fullName: '', companyName: '', phone: '', city: '', inventoryType: 'Apartments' });
      } else {
        setStatus('Error submitting form. Please try again.');
      }
    } catch (err) {
      setStatus('Failed to connect to server.');
    }
  };

  return (
    <main style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1e293b', background: '#ffffff', margin: 0, padding: 0, lineHeight: '1.6' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 8%', background: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100, alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        {/* Visual Brand Logo */}
        <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0f172a', letterSpacing: '0.5px', display: 'flex', alignItems: 'center' }}>
          PROP<span style={{ color: '#10b981', fontSize: '2.3rem', fontWeight: '900', margin: '0 1px' }}>K</span>ADS
        </div>

        <nav style={{ display: 'flex', gap: '25px', fontSize: '0.95rem', fontWeight: '600' }}>
          <a href="#about" style={{ color: '#475569', textDecoration: 'none' }}>About</a>
          <a href="#services" style={{ color: '#475569', textDecoration: 'none' }}>Services</a>
          <a href="#process" style={{ color: '#475569', textDecoration: 'none' }}>Process</a>
          <a href="#faq" style={{ color: '#475569', textDecoration: 'none' }}>FAQ</a>
        </nav>
        
        <a href="https://wa.me/923333401101" style={{ background: '#10b981', color: '#fff', padding: '10px 22px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>
          +92 333 3401101
        </a>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '90px 8% 70px', textAlign: 'center', background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)' }}>
        <span style={{ color: '#047857', background: '#dcfce7', padding: '6px 18px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>BUILT FOR REAL ESTATE DEVELOPERS</span>
        <h1 style={{ fontSize: '3rem', color: '#0f172a', margin: '25px auto 15px', maxWidth: '1000px', fontWeight: '800', lineHeight: '1.2' }}>
          Sell Your Real Estate Inventory With a Complete Revenue System — <span style={{ color: '#10b981' }}>Not Just Ads</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '800px', margin: '0 auto 40px' }}>
          We help real estate developers generate high-intent buyers, control leads through CRM, monitor sales teams, and improve conversions — end to end.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#enquiry" style={{ background: '#10b981', color: '#fff', padding: '16px 32px', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }}>Get a Free Project Review</a>
          <a href="https://wa.me/923333401101" style={{ border: '2px solid #0f172a', color: '#0f172a', padding: '14px 30px', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', background: '#fff' }}>Book a 20-Minute Call</a>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ padding: '60px 8%', background: '#0f172a', color: '#fff' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '10px' }}>Why Most Real Estate Projects Struggle to Sell</h2>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '40px' }}>Marketing alone does not sell projects — systems do.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {['Leads are generated, but conversions remain low', 'Sales teams fail to follow up consistently', 'No visibility into lead status or agent performance', 'Owners receive excuses instead of real data'].map((item, idx) => (
            <div key={idx} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
              <p style={{ margin: 0, color: '#cbd5e1' }}>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* System Flow */}
      <section style={{ padding: '80px 8%', textAlign: 'center', background: '#f8fafc' }}>
        <h2 style={{ fontSize: '2.2rem', color: '#0f172a' }}>A Complete Revenue & Sales System</h2>
        <p style={{ color: '#64748b', maxWidth: '700px', margin: '0 auto 40px' }}>Every lead is tracked, assigned, followed up, and pushed toward booking with full visibility.</p>
        <div style={{ background: '#ffffff', border: '2px solid #e2e8f0', padding: '30px', borderRadius: '12px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div>Buyers</div> ➔ <div>CRM</div> ➔ <div>Sales Team</div> ➔ <div>Closings</div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '80px 8%', background: '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#0f172a' }}>About <span style={{ color: '#10b981' }}>Propkads</span></h2>
          <p style={{ fontSize: '1.1rem', color: '#475569' }}>
            Propkads is a sales-driven real estate growth partner created to help developers move inventory through systems — not assumptions. Founded in 2020 and serving all over Pakistan, we bridge the gap between lead generation and actual bookings.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '40px' }}>
            <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ color: '#10b981', marginTop: 0 }}>01. Our Approach</h3>
              <ul style={{ paddingLeft: '20px', color: '#475569' }}>
                <li>Sales-first, not vanity marketing</li>
                <li>CRM-led visibility and accountability</li>
                <li>Practical execution aligned with revenue</li>
                <li>Honest timelines & data-driven decisions</li>
              </ul>
            </div>
            <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ color: '#10b981', marginTop: 0 }}>02. Why We Exist</h3>
              <p style={{ color: '#475569' }}>
                Most projects fail due to weak systems, poor follow-up, and lack of visibility. We replace guesswork with structure, tracking, and control.
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ color: '#10b981', marginTop: 0 }}>03. What Makes Us Different</h3>
              <ul style={{ paddingLeft: '20px', color: '#475569' }}>
                <li>We manage the system, not just ads</li>
                <li>We track people, not just numbers</li>
                <li>We focus on closings, not impressions</li>
                <li>We scale only what performs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section id="services" style={{ padding: '80px 8%', background: '#f8fafc' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#0f172a', marginBottom: '50px' }}>Our Core Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {[
            { title: 'Buyer Acquisition', desc: 'High-intent buyers through targeted digital campaigns based on location, budget, and inventory type.' },
            { title: 'CRM Integration & Lead Control', desc: 'All leads captured in CRM with real-time tracking, tagging, and automated distribution.' },
            { title: 'Sales Team Accountability', desc: 'Response times, follow-ups, and conversions monitored to improve discipline and performance.' },
            { title: 'Closing & Deal Support', desc: 'Objection handling, payment guidance, documentation clarity, and deal structure support.' },
            { title: 'Advanced Analytics Dashboard', desc: 'Complete visibility into sales pipeline, conversion metrics, and revenue projections.' },
            { title: 'Execution Support', desc: 'Project branding, 2D/3D visuals, walkthroughs, sales reels, and conversion-focused landing pages.' }
          ].map((srv, idx) => (
            <div key={idx} style={{ background: '#ffffff', padding: '30px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <h3 style={{ color: '#10b981', marginTop: 0 }}>{srv.title}</h3>
              <p style={{ color: '#64748b', margin: 0 }}>{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Working Process */}
      <section id="process" style={{ padding: '80px 8%', background: '#ffffff' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#0f172a', marginBottom: '50px' }}>Our Working Process</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {[
            { step: '01', title: 'Project Audit', desc: 'Inventory review, pricing analysis, buyer profiling, and competitor assessment.' },
            { step: '02', title: 'Launch & CRM Setup', desc: 'Campaign launch, CRM pipeline configuration, and sales team assignment rules.' },
            { step: '03', title: 'Weekly Optimization', desc: 'Lead quality improvement, follow-up correction, and sales activity monitoring.' },
            { step: '04', title: 'Conversion & Scaling', desc: 'Booking-focused optimization and revenue scaling based on real performance data.' }
          ].map((proc, idx) => (
            <div key={idx} style={{ background: '#f8fafc', padding: '25px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{proc.step}</span>
              <h4 style={{ margin: '10px 0', fontSize: '1.2rem', color: '#0f172a' }}>{proc.title}</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{proc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commercial Model & Client Fit */}
      <section style={{ padding: '80px 8%', background: '#f8fafc', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        <div style={{ background: '#ffffff', padding: '35px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#10b981', marginTop: 0 }}>Commercial Model</h2>
          <h3 style={{ fontSize: '1.3rem', color: '#0f172a' }}>Retainer + Performance Structure</h3>
          <ul style={{ color: '#475569', paddingLeft: '20px' }}>
            <li>Monthly retainer based on project scope</li>
            <li>Plus per-booking incentive or mutually agreed revenue share</li>
          </ul>
          <p style={{ color: '#10b981', fontWeight: 'bold' }}>We earn more only when you sell more.</p>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Minimum engagement period: 60–90 days</p>
        </div>

        <div style={{ background: '#ffffff', padding: '35px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#10b981', marginTop: 0 }}>Ideal Client Fit</h2>
          <h4 style={{ color: '#047857', margin: '10px 0 5px' }}>Best Fit For:</h4>
          <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0 }}>Developers with unsold inventory, teams struggling with conversions, and owners seeking transparency.</p>
          
          <h4 style={{ color: '#ef4444', margin: '20px 0 5px' }}>Not a Fit For:</h4>
          <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0 }}>Clients looking only for branding/impressions, teams avoiding CRM accountability, or short-term mindsets.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '80px 8%', background: '#ffffff' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#0f172a', marginBottom: '40px' }}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { q: 'Do you guarantee sales?', a: 'We do not offer false guarantees. We build a measurable system that shows real sales potential within 60–90 days using CRM-based data.' },
            { q: 'Are you just running ads?', a: 'No. Ads are only the starting point. CRM control, sales team accountability, and closing support drive conversions.' },
            { q: 'Do you replace our sales team?', a: 'No. We strengthen and enable your existing sales team through systems, tracking, and performance control.' },
            { q: 'What type of projects do you work with?', a: 'We work with real estate developers who value structure, transparency, and long-term revenue control.' }
          ].map((faq, idx) => (
            <div key={idx} style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: '#0f172a', margin: '0 0 10px 0' }}>{faq.q}</h4>
              <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Form */}
      <section id="enquiry" style={{ padding: '80px 8%', background: '#f0fdf4' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#ffffff', padding: '40px', borderRadius: '12px', border: '1px solid #bbf7d0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ textAlign: 'center', color: '#0f172a', margin: '0 0 10px 0' }}>Get a Free Project Review</h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '30px' }}>Please provide the correct information below.</p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" placeholder="Full Name *" required value={formData.fullName} onChange={(e)=>setFormData({...formData, fullName: e.target.value})} style={{ padding: '14px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', borderRadius: '6px' }} />
            <input type="text" placeholder="Company / Project Name" value={formData.companyName} onChange={(e)=>setFormData({...formData, companyName: e.target.value})} style={{ padding: '14px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', borderRadius: '6px' }} />
            <input type="text" placeholder="Phone / WhatsApp *" required value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} style={{ padding: '14px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', borderRadius: '6px' }} />
            <input type="text" placeholder="City" value={formData.city} onChange={(e)=>setFormData({...formData, city: e.target.value})} style={{ padding: '14px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', borderRadius: '6px' }} />
            
            <select value={formData.inventoryType} onChange={(e)=>setFormData({...formData, inventoryType: e.target.value})} style={{ padding: '14px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', borderRadius: '6px' }}>
              <option value="Apartments">Apartments</option>
              <option value="Plots">Plots</option>
              <option value="Commercial">Commercial</option>
            </select>

            <button type="submit" style={{ background: '#10b981', color: '#fff', border: 'none', padding: '16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Submit Enquiry</button>
          </form>
          {status && <p style={{ marginTop: '20px', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>{status}</p>}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', padding: '40px 8%', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
        <p style={{ color: '#cbd5e1' }}>+92 333 3401101 | contact@propkads.com | Karachi, Pakistan</p>
        <p>2020 © PROPKADS. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
