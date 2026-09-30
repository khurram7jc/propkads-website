'use client';
import { useState } from 'react';

export default function FAQ({ c = {} }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      q: c?.faq_q1 || 'Do you guarantee sales?',
      a: c?.faq_a1 || 'We do not offer false guarantees. We build a measurable system that shows real sales potential within 60–90 days using CRM-based data.',
    },
    {
      q: c?.faq_q2 || 'Are you just running ads?',
      a: c?.faq_a2 || 'No. Ads are only the starting point. CRM control, sales team accountability, and closing support drive conversions.',
    },
    {
      q: c?.faq_q3 || 'Do you replace our sales team?',
      a: c?.faq_a3 || 'No. We strengthen and enable your existing sales team through systems, tracking, and performance control.',
    },
    {
      q: c?.faq_q4 || 'What type of projects do you work with?',
      a: c?.faq_a4 || 'We work with developers who value structure, transparency, and long-term revenue control.',
    },
  ].filter((f) => f.q);

  const handleToggle = (i) => (e) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === i ? -1 : i));
  };

  return (
    <section className="section container" id="faq" style={{ paddingBottom: '36px' }}>
      <div className="faq-v2-wrap">
        <div className="faq-v2-left">
          <div className="section-tag">{c?.faq_eyebrow || 'FAQ'}</div>
          <h2>{c?.faq_heading || 'Frequently Asked Questions'}</h2>
          <p className="section-intro">
            {c?.faq_intro ||
              'Common questions about our services, lead generation, CRM control, and how we work with real estate developers.'}
          </p>
        </div>

        <div className="faq-v2-list in-view">
          {faqs.map((f, i) => (
            <details className={`faq-v2-item faq-stagger-${i + 1}`} key={i} open={activeIndex === i}>
              <summary onClick={handleToggle(i)}>
                <span className="faq-v2-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq-v2-q">{f.q}</span>
                <span className="faq-v2-icon">
                  <span className="plus">+</span>
                  <span className="minus">–</span>
                </span>
              </summary>
              <div className="faq-v2-answer">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
