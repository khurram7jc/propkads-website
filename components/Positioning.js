export default function Positioning({ c = {} }) {
  const problems = [c.pos_problem_1, c.pos_problem_2, c.pos_problem_3, c.pos_problem_4].filter(Boolean);
  const solutions = [c.pos_solution_1, c.pos_solution_2, c.pos_solution_3, c.pos_solution_4].filter(Boolean);

  return (
    <section className="section container" id="positioning">
      <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 32px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ textAlign: 'center', margin: '0 auto', maxWidth: '100%', lineHeight: '1.25' }}>
          Built for Real Estate Developers<br />
          <span style={{ color: 'var(--green)' }}>Designed for Closings</span>
        </h2>
      </div>

      <div className="fit-grid-v2">
        <div className="fit-card-v2 no">
          <h3>{c?.pos_problem_label || 'Why Most Projects Struggle to Sell'}</h3>
          <ul>
            {problems.map((item, i) => (
              <li key={i}>
                <span className="fit-card-v2-icon">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="fit-card-v2 yes">
          <h3>{c?.pos_solution_label || 'What Propkads Changes'}</h3>
          <ul>
            {solutions.map((item, i) => (
              <li key={i}>
                <span className="fit-card-v2-icon">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
