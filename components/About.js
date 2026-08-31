export default function About({ c }) {
  const cards = [
    {
      title: c.about_card_1_title || 'Our Approach',
      bullets: (c.about_card_1_bullets || '').split('\n').filter(Boolean),
      note: c.about_card_1_note,
    },
    {
      title: c.about_card_2_title || 'Why Propkads Exists',
      bullets: (c.about_card_2_bullets || '').split('\n').filter(Boolean),
      note: c.about_card_2_note,
    },
    {
      title: c.about_card_3_title || 'What Makes Us Different',
      bullets: (c.about_card_3_bullets || '').split('\n').filter(Boolean),
      note: c.about_card_3_note,
    },
  ];

  return (
    <section className="section container reveal" id="about">
      <div className="section-tag">{c.about_eyebrow || 'About Propkads'}</div>
      <h2>{c.about_heading || 'A sales-driven real estate growth partner.'}</h2>

      <div className="about-v2-intro">
        <p>{c.about_lead_1}</p>
        <p>{c.about_lead_2}</p>
        <p>{c.about_lead_3}</p>
      </div>

      <div className="about-cards-v3">
        {cards.map((card, i) => (
          <div className="about-card-v3" key={i}>
            <div className="about-card-v3-badge">{String(i + 1).padStart(2, '0')}</div>
            <h3>{card.title}</h3>
            <ul>
              {card.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
            {card.note && <p className="about-card-v3-note">{card.note}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
