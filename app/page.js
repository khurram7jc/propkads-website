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
    <main style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#f8fafc', background: '#090d16', margin: 0, padding: 0, lineHeight: '1.6' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 8%', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 100, alignItems: 'center' }}>
        <h2 style={{ color: '#38bdf8', margin: 0, letterSpacing: '1px' }}>PROPKADS</h2>
        <nav style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: '#94a3b8' }}>
          <a href="#about" style={{ color: '#cbd5e1', textDecoration: 'none' }}>About</a>
          <a href="#services" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Services</a>
          <a href="#process" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Process</a>
          <a href="#faq" style={{ color: '#cbd5e1', textDecoration: 'none' }}>FAQ</a>
        </nav>
        <a href="https://wa.me/923332000649" style={{ background: '#0284c7', color: '#fff', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>
          +92 333 2000649
        </a>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '100px 8% 80px', textAlign: 'center', background: 'radial-gradient(circle at top, #1e293b 0%, #090d16 100%)' }}>
        <span style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>BUILT FOR REAL ESTATE DEVELOPERS</span>
        <h1 style={{ fontSize: '3rem', margin: '25px auto 15px', maxWidth: '1000px', fontWeight: '800', lineHeight: '1.2' }}>
          Sell Your Real Estate Inventory With a Complete Revenue System — <span style={{ color: '#38bdf8' }}>Not Just Ads</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '800px', margin: '0 auto 40px' }}>
          We help real estate developers generate high-intent buyers, control leads through CRM, monitor sales teams, and improve conversions — end to end.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#enquiry" style={{ background: '#0284c7', color: '#fff', padding: '16px 32px', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)' }}>Get a Free Project Review</a>
          <a href="https://wa.me/923332000649" style={{ border: '1px solid #334155', color: '#fff', padding: '16px 32px', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', background: '#0f172a' }}>Book a 20-Minute Call</a>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ padding: '60px 8%', background: '#0f172a', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '10px' }}>Why Most Real Estate Projects Struggle to Sell</h2>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '40px' }}>Marketing alone does not sell projects — systems do.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {['Leads are generated, but conversions remain low', 'Sales teams fail to follow up consistently', 'No visibility into lead status or agent performance', 'Owners receive excuses instead of real data'].map((item, idx) => (
            <div key={idx} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
              <p style={{ margin: 0, color: '#cbd5e1' }}>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* System Flow */}
      <section style={{ padding: '80px 8%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem' }}>A Complete Revenue & Sales System</h2>
        <p style={{ color: '#94a3b8', maxWidth: '700px', margin: '0 auto 40px' }}>Every lead is tracked, assigned, followed up, and pushed toward booking with full visibility.</p>
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '30px', borderRadius: '12px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', fontSize: '1.2rem', fontWeight: 'bold', color: '#38bdf8' }}>
          <div>Buyers</div> ➔ <div>CRM</div> ➔ <div>Sales Team</div> ➔ <div>Closings</div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '80px 8%', background: '#0f172a' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#38bdf8' }}>About Propkads</h2>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1' }}>
            Propkads is a sales-driven real estate growth partner created to help developers move inventory through systems — not assumptions. Founded in 2020 and serving all over Pakistan, we bridge the gap between lead generation and actual bookings.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '40px' }}>
            <div style={{ background: '#1e293b', padding: '25px', borderRadius: '8px' }}>
              <h3 style={{ color: '#38bdf8', marginTop: 0 }}>01. Our Approach</h3>
              <ul style={{ paddingLeft: '20px', color: '#cbd5e1' }}>
                <li>Sales-first, not vanity marketing</li>
                <li>CRM-led visibility and accountability</li>
                <li>Practical execution aligned with revenue</li>
                <li>Honest timelines & data-driven decisions</li>
              </ul>
            </div>
            <div style={{ background: '#1e293b', padding: '25px', borderRadius: '8px' }}>
              <h3 style={{ color: '#38bdf8', marginTop: 0 }}>02. Why We Exist</h3>
              <p style={{ color: '#cbd5e1' }}>
                Most projects fail due to weak systems, poor follow-up, and lack of visibility. We replace guesswork with structure, tracking, and control.
              </p>
            </div>
            <div style={{ background: '#1e293b', padding: '25px', borderRadius: '8px' }}>
              <h3 style={{ color: '#38bdf8', marginTop: 0 }}>03. What Makes Us Different</h3>
              <ul style={{ paddingLeft: '20px', color: '#cbd5e1' }}>
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
      <section id="services" style={{ padding: '80px 8%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '50px' }}>Our Core Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {[
            { title: 'Buyer Acquisition', desc: 'High-intent buyers through targeted digital campaigns based on location, budget, and inventory type.' },
            { title: 'CRM Integration & Lead Control', desc: 'All leads captured in CRM with real-time tracking, tagging, and automated distribution.' },
            { title: 'Sales Team Accountability', desc: 'Response times, follow-ups, and conversions monitored to improve discipline and performance.' },
            { title: 'Closing & Deal Support', desc: 'Objection handling, payment guidance, documentation clarity, and deal structure support.' },
            { title: 'Advanced Analytics Dashboard', desc: 'Complete visibility into sales pipeline, conversion metrics, and revenue projections.' },
            { title: 'Execution Support', desc: 'Project branding, 2D/3D visuals, walkthroughs, sales reels, and conversion-focused landing pages.' }
          ].map((srv, idx) => (
            <div key={idx} style={{ background: '#0f172a', padding: '30px', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <h3 style={{ color: '#38bdf8', marginTop: 0 }}>{srv.title}</h3>
              <p style={{ color: '#94a3b8', margin: 0 }}>{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Working Process */}
      <section id="process" style={{ padding: '80px 8%', background: '#0f172a' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '50px' }}>Our Working Process</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {[
            { step: '01', title: 'Project Audit', desc: 'Inventory review, pricing analysis, buyer profiling, and competitor assessment.' },
            { step: '02', title: 'Launch & CRM Setup', desc: 'Campaign launch, CRM pipeline configuration, and sales team assignment rules.' },
            { step: '03', title: 'Weekly Optimization', desc: 'Lead quality improvement, follow-up correction, and sales activity monitoring.' },
            { step: '04', title: 'Conversion & Scaling', desc: 'Booking-focused optimization and revenue scaling based on real performance data.' }
          ].map((proc, idx) => (
            <div key={idx} style={{ background: '#1e293b', padding: '25px', borderRadius: '8px', position: 'relative' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38bdf8', opacity: 0.5 }}>{proc.step}</span>
              <h4 style={{ margin: '10px 0', fontSize: '1.2rem' }}>{proc.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>{proc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commercial Model & Client Fit */}
      <section style={{ padding: '80px 8%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        <div style={{ background: '#0f172a', padding: '35px', borderRadius: '10px', border: '1px solid #1e293b' }}>
          <h2 style={{ color: '#38bdf8', marginTop: 0 }}>Commercial Model</h2>
          <h3 style={{ fontSize: '1.3rem' }}>Retainer + Performance Structure</h3>
          <ul style={{ color: '#cbd5e1', paddingLeft: '20px' }}>
            <li>Monthly retainer based on project scope</li>
            <li>Plus per-booking incentive or mutually agreed revenue share</li>
          </ul>
          <p style={{ color: '#38bdf8', fontWeight: 'bold' }}>We earn more only when you sell more.</p>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Minimum engagement period: 60–90 days</p>
        </div>

        <div style={{ background: '#0f172a', padding: '35px', borderRadius: '10px', border: '1px solid #1e293b' }}>
          <h2 style={{ color: '#38bdf8', marginTop: 0 }}>Ideal Client Fit</h2>
          <h4 style={{ color: '#22c55e', margin: '10px 0 5px' }}>Best Fit For:</h4>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: 0 }}>Developers with unsold inventory, teams struggling with conversions, and owners seeking transparency.</p>
          
          <h4 style={{ color: '#ef4444', margin: '20px 0 5px' }}>Not a Fit For:</h4>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: 0 }}>Clients looking only for branding/impressions, teams avoiding CRM accountability, or short-term mindsets.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '80px 8%', background: '#0f172a' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '40px' }}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { q: 'Do you guarantee sales?', a: 'We do not offer false guarantees. We build a measurable system that shows real sales potential within 60–90 days using CRM-based data.' },
            { q: 'Are you just running ads?', a: 'No. Ads are only the starting point. CRM control, sales team accountability, and closing support drive conversions.' },
            { q: 'Do you replace our sales team?', a: 'No. We strengthen and enable your existing sales team through systems, tracking, and performance control.' },
            { q: 'What type of projects do you work with?', a: 'We work with real estate developers who value structure, transparency, and long-term revenue control.' }
          ].map((faq, idx) => (
            <div key={idx} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ color: '#38bdf8', margin: '0 0 10px 0' }}>{faq.q}</h4>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.95rem' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Form */}
      <section id="enquiry" style={{ padding: '80px 8%', background: '#090d16' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#0f172a', padding: '40px', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <h2 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>Get a Free Project Review</h2>
          <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '30px' }}>Please provide the correct information below.</p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" placeholder="Full Name *" required value={formData.fullName} onChange={(e)=>setFormData({...formData, fullName: e.target.value})} style={{ padding: '14px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} />
            <input type="text" placeholder="Company / Project Name" value={formData.companyName} onChange={(e)=>setFormData({...formData, companyName: e.target.value})} style={{ padding: '14px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} />
            <input type="text" placeholder="Phone / WhatsApp *" required value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} style={{ padding: '14px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} />
            <input type="text" placeholder="City" value={formData.city} onChange={(e)=>setFormData({...formData, city: e.target.value})} style={{ padding: '14px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} />
            
            <select value={formData.inventoryType} onChange={(e)=>setFormData({...formData, inventoryType: e.target.value})} style={{ padding: '14px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }}>
              <option value="Apartments">Apartments</option>
              <option value="Plots">Plots</option>
              <option value="Commercial">Commercial</option>
            </select>

            <button type="submit" style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Submit Enquiry</button>
          </form>
          {status && <p style={{ marginTop: '20px', textAlign: 'center', color: '#38bdf8' }}>{status}</p>}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', borderTop: '1px solid #1e293b', padding: '40px 8%', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
        <p style={{ color: '#cbd5e1' }}>+92 333 2000649 | contact@propkads.com | Karachi, Pakistan</p>
        <p>2020 © PROPKADS. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
