export default function FAQ({ c }) {
  const faqs = [
    { q: c.faq_q1, a: c.faq_a1 },
    { q: c.faq_q2, a: c.faq_a2 },
    { q: c.faq_q3, a: c.faq_a3 },
    { q: c.faq_q4, a: c.faq_a4 },
  ].filter((f) => f.q);

  return (
    <section className="section container" id="faq">
      <div className="section-tag">{c.faq_eyebrow || 'FAQ'}</div>
      <h2>{c.faq_heading || 'Frequently Asked Questions'}</h2>

      <div className="faq-list">
        {faqs.map((f, i) => (
          <details className="faq-item" key={i} open={i === 0}>
            <summary>
              <span className="faq-q-text">{f.q}</span>
              <span className="faq-icon">
                <span className="faq-icon-plus">+</span>
                <span className="faq-icon-minus">–</span>
              </span>
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
