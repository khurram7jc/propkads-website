export default function About({ c }) {
  return (
    <section className="section container" id="about">
      <div className="section-tag">{c.about_eyebrow || 'About Propkads'}</div>

      <div className="about-v2-top">
        <h2>{c.about_heading || 'We combine sales discipline with marketing precision.'}</h2>
        <div className="about-v2-copy">
          <p>{c.about_lead_1}</p>
          <a href="#services" className="about-v2-link">More About Our Approach →</a>
        </div>
      </div>

      <div className="about-v2-facts">
        <div className="about-fact"><span className="dot"></span>{c.about_fact_1 || 'Sales-first, not vanity marketing'}</div>
        <div className="about-fact"><span className="dot"></span>{c.about_fact_2 || 'CRM-led visibility and accountability'}</div>
        <div className="about-fact"><span className="dot"></span>{c.about_fact_3 || 'Practical execution aligned with revenue'}</div>
        <div className="about-fact"><span className="dot"></span>{c.about_fact_4 || 'Honest timelines and data-driven decisions'}</div>
      </div>
    </section>
  );
}
