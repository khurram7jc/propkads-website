export default function SystemFlow({ c }) {
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

      <div className="process-v2-wrap">
        <div className="process-v2-line"></div>
        <div className="process-v2-steps">
          {steps.map((step, i) => (
            <div className="process-v2-step" key={i}>
              <div className={`process-v2-circle ${i === steps.length - 1 ? 'is-last' : ''}`}>{i + 1}</div>
              <h3>{step.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <p className="flow-note">{c.system_note || 'Every lead is tracked, assigned, followed up, and pushed toward booking with full visibility.'}</p>
    </section>
  );
}
