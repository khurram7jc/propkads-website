'use client';
import { useEffect, useRef } from 'react';

export default function FAQ({ c }) {
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const faqs = [
    { q: c.faq_q1, a: c.faq_a1 },
    { q: c.faq_q2, a: c.faq_a2 },
    { q: c.faq_q3, a: c.faq_a3 },
    { q: c.faq_q4, a: c.faq_a4 },
  ].filter((f) => f.q);

  return (
    <section className="section container reveal" id="faq">
      <div className="faq-v2-wrap">
        <div className="faq-v2-left">
          <div className="section-tag">{c.faq_eyebrow || 'FAQ'}</div>
          <h2>{c.faq_heading || 'Frequently Asked Questions'}</h2>
          <p className="section-intro">
            {c.faq_intro ||
              'Common questions about our services, lead generation, CRM control, and how we work with real estate developers.'}
          </p>
        </div>

        <div className="faq-v2-list" ref={listRef}>
          {faqs.map((f, i) => (
            <details className={`faq-v2-item faq-stagger-${i + 1}`} key={i} open={i === 0}>
              <summary>
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
