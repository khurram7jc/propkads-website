'use client';
import { useState } from 'react';

export default function Services({ c }) {
  const [active, setActive] = useState(0);

  const items = [
    { title: c.service_1_title, desc: c.service_1_desc },
    { title: c.service_2_title, desc: c.service_2_desc },
    { title: c.service_3_title, desc: c.service_3_desc },
    { title: c.service_4_title, desc: c.service_4_desc },
  ];

  return (
    <section className="section container reveal" id="services">
      <div className="section-tag">{c.services_eyebrow || 'What We Do'}</div>
      <h2>{c.services_heading || 'Driving a better way of doing marketing.'}</h2>
      <p className="section-intro">{c.services_intro || 'We deliver revenue impact through a combination of performance marketing, CRM control, and sales accountability.'}</p>

      <div className="whatwedo-wrap">
        <div className="whatwedo-list">
          {items.map((item, i) => (
            <div
              key={i}
              className={`whatwedo-item ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              <div className="whatwedo-item-title">
                {item.title}
                <span className="whatwedo-arrow">→</span>
              </div>
              {i === active && <div className="whatwedo-item-desc">{item.desc}</div>}
            </div>
          ))}
        </div>

        <div className="whatwedo-checklist">
          <h4>{c.checklist_heading || 'What This Gives You'}</h4>
          <ul>
            <li>{c.checklist_1 || 'Real-time CRM visibility'}</li>
            <li>{c.checklist_2 || 'Weekly performance reports'}</li>
            <li>{c.checklist_3 || 'Direct WhatsApp & phone leads'}</li>
            <li>{c.checklist_4 || 'No guesswork, no excuses'}</li>
          </ul>
        </div>

        <div className="whatwedo-stat">
          <div className="whatwedo-stat-circle">
            <span>{c.services_stat_value || '60–90 Days'}</span>
          </div>
          <p>{c.services_stat_label || 'To real sales clarity'}</p>
        </div>
      </div>
    </section>
  );
}
