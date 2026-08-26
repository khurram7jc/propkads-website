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
    <main style={{ fontFamily: 'Arial, sans-serif', color: '#1a1a1a', margin: 0, padding: 0 }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 5%', background: '#0f172a', color: '#fff', alignItems: 'center' }}>
        <h2 style={{ color: '#38bdf8', margin: 0 }}>PROPKADS</h2>
        <div>
          <a href="tel:+923333401101" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>+92 333 3401101</a>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '80px 5%', background: '#1e293b', color: '#fff', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', lineHeight: '1.2' }}>
          Sell Your Real Estate Inventory With a Complete Revenue System — Not Just Ads
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto 30px' }}>
          We help real estate developers generate high-intent buyers, control leads through CRM, monitor sales teams, and improve conversions — end to end.
        </p>
        <a href="#enquiry" style={{ background: '#0284c7', color: '#fff', padding: '15px 30px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Get a Free Project Review</a>
      </section>

      {/* Core Services */}
      <section style={{ padding: '60px 5%', display: 'flex', justifyContent: 'space-around', background: '#f8fafc', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ flex: '1 1 250px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#0284c7' }}>Buyer Acquisition</h3>
          <p>High-intent buyers through targeted digital campaigns based on location, budget, and inventory type.</p>
        </div>
        <div style={{ flex: '1 1 250px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#0284c7' }}>CRM Integration & Control</h3>
          <p>All leads captured in CRM with real-time tracking, tagging, and automated distribution.</p>
        </div>
        <div style={{ flex: '1 1 250px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#0284c7' }}>Sales Team Accountability</h3>
          <p>Response times, follow-ups, and conversions monitored to improve discipline and performance.</p>
        </div>
      </section>

      {/* Lead Form */}
      <section id="enquiry" style={{ padding: '60px 5%', background: '#fff', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Get a Free Project Review</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '30px' }}>Please provide the correct information below.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Full Name *" required value={formData.fullName} onChange={(e)=>setFormData({...formData, fullName: e.target.value})} style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
          <input type="text" placeholder="Company / Project Name" value={formData.companyName} onChange={(e)=>setFormData({...formData, companyName: e.target.value})} style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
          <input type="text" placeholder="Phone / WhatsApp *" required value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
          <input type="text" placeholder="City" value={formData.city} onChange={(e)=>setFormData({...formData, city: e.target.value})} style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
          
          <select value={formData.inventoryType} onChange={(e)=>setFormData({...formData, inventoryType: e.target.value})} style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
            <option value="Apartments">Apartments</option>
            <option value="Plots">Plots</option>
            <option value="Commercial">Commercial</option>
          </select>

          <button type="submit" style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Submit Enquiry</button>
        </form>
        {status && <p style={{ marginTop: '15px', textAlign: 'center', color: '#0284c7' }}>{status}</p>}
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'center', padding: '20px' }}>
        <p>2020 © PROPKADS. All Rights Reserved. Karachi, Pakistan.</p>
      </footer>
    </main>
  );
}
