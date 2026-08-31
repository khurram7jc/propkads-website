export default function HowItWorks({ c }) {
  const steps = [
    { title: c.hero_step_1, desc: c.hero_step_1_desc },
    { title: c.hero_step_2, desc: c.hero_step_2_desc },
    { title: c.hero_step_3, desc: c.hero_step_3_desc },
    { title: c.hero_step_4, desc: c.hero_step_4_desc },
  ];

  return (
    <section className="section container reveal" id="how-it-works">
      <div className="section-tag">{c.howitworks_eyebrow || 'How It Works'}</div>
      <h2>{c.howitworks_heading || 'Our working process.'}</h2>

      <div className="process-v2-wrap">
        <div className="process-v2-line"></div>
        <div className="process-v2-steps">
          {steps.map((step, i) => (
            <div className="process-v2-step" key={i}>
              <div className={`process-v2-circle ${i === steps.length - 1 ? 'is-last' : ''}`}>{i + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
