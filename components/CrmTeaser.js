'use client';

import Link from 'next/link';

export default function CrmTeaser() {
  const highlights = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: 'Zero Lead Leakage',
      desc: 'Meta, Google & TikTok inquiries sync instantly into private agent queues. Phone numbers are protected from duplicate dealer theft.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
      title: 'Inventory Unit Locks',
      desc: 'Society plots, commercial shops & luxury apartments locked in real time as Available, Booked, or Sold to eliminate double bookings.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: 'Agent Call & Audit Tracking',
      desc: 'Response times under 5 minutes enforced. Daily call volume, recording notes, and deal stages visible directly to project owners.',
    },
  ];

  return (
    <section className="section container" id="crm-teaser">
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 28px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span className="section-tag" style={{ margin: '0 auto 12px auto', display: 'inline-block', textAlign: 'center' }}>
          Proprietary Sales Technology
        </span>
        <h2 style={{ textAlign: 'center', margin: '0 auto 14px auto', maxWidth: '100%' }}>
          Propkads Real Estate Sales CRM Engine
        </h2>
        <p className="section-intro" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '640px' }}>
          Marketing alone does not generate revenue — accountability does. We operate a cloud-based CRM built specifically for residential and commercial developer sales teams.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '24px' }}>
        {highlights.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--line)',
              borderRadius: '18px',
              padding: '24px 22px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 8px 24px rgba(20, 22, 26, 0.04)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'var(--green-tint)',
                color: 'var(--green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
              }}
            >
              {item.icon}
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--ink)', marginBottom: '8px' }}>
              {item.title}
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--slate)', lineHeight: '1.6', margin: 0 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          flexWrap: 'wrap',
          marginTop: '30px',
        }}
      >
        <Link href="/crm" className="btn btn-solid">
          Explore Propkads CRM Features →
        </Link>
        <a
          href="https://crm.propkads.com/login"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{ background: '#fff' }}
        >
          Login to CRM Portal ↗
        </a>
      </div>
    </section>
  );
}
