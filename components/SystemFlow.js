'use client';
import { useEffect, useRef, useState } from 'react';

export default function SystemFlow({ c }) {
  const wrapRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const steps = [
    { title: c.system_step_1 || 'Buyers' },
    { title: c.system_step_2 || 'CRM' },
    { title: c.system_step_3 || 'Sales Team' },
    { title: c.system_step_4 || 'Closings' },
  ];

  return (
    <section className="section container reveal" id="system-flow">
      <div className="section-tag">{c.system_eyebrow || 'System'}</div>
      <h2>{c.system_heading || 'A Complete Revenue & Sales System for Developers'}</h2>
      <p className="section-intro">{c.system_intro || 'Founded in 2020 — serving developers all over Pakistan.'}</p>

      <div className={`zigzag-wrap ${inView ? 'in-view' : ''}`} ref={wrapRef}>
        <svg className="zigzag-svg" viewBox="0 0 1000 300" preserveAspectRatio="none">
          <defs>
            <clipPath id="zigzagReveal" clipPathUnits="userSpaceOnUse">
              <rect className="zigzag-reveal-rect" x="0" y="0" width="0" height="300" />
            </clipPath>
          </defs>
          <path className="zigzag-path-base" d="M60,220 L360,80 L660,220 L940,80" vectorEffect="non-scaling-stroke" />
          <path className="zigzag-path-progress" d="M60,220 L360,80 L660,220 L940,80" vectorEffect="non-scaling-stroke" clipPath="url(#zigzagReveal)" />
        </svg>
        {steps.map((step, i) => (
          <div className={`zigzag-step zigzag-step-${i + 1}`} key={i}>
            <div className="zigzag-dot">{i + 1}</div>
            <div className="zigzag-label">{step.title}</div>
          </div>
        ))}
      </div>

      <div className="zigzag-mobile">
        {steps.map((step, i) => (
          <div className="zigzag-mobile-step" key={i}>
            <div className="zigzag-mobile-dot">{i + 1}</div>
            <div className="zigzag-mobile-label">{step.title}</div>
          </div>
        ))}
      </div>

      <p className="flow-note">{c.system_note || 'Every lead is tracked, assigned, followed up, and pushed toward booking with full visibility.'}</p>
    </section>
  );
}
