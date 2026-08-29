export default function IdealFit({ c }) {
  const yesItems = [c.fit_yes_1, c.fit_yes_2, c.fit_yes_3].filter(Boolean);
  const noItems = [c.fit_no_1, c.fit_no_2, c.fit_no_3].filter(Boolean);

  return (
    <section className="section container" id="fit">
      <div className="section-tag">{c.fit_eyebrow || 'Ideal Client Fit'}</div>
      <h2>{c.fit_heading || 'Who we work best with.'}</h2>

      <div className="fit-grid-v2">
        <div className="fit-card-v2 yes">
          <h3>{c.fit_yes_label || 'Best Fit For'}</h3>
          <ul>
            {yesItems.map((item, i) => (
              <li key={i}>
                <span className="fit-card-v2-icon">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="fit-card-v2 no">
          <h3>{c.fit_no_label || 'Not a Fit For'}</h3>
          <ul>
            {noItems.map((item, i) => (
              <li key={i}>
                <span className="fit-card-v2-icon">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
