export default function Positioning({ c }) {
  const problems = [c.pos_problem_1, c.pos_problem_2, c.pos_problem_3, c.pos_problem_4].filter(Boolean);
  const solutions = [c.pos_solution_1, c.pos_solution_2, c.pos_solution_3, c.pos_solution_4].filter(Boolean);

  return (
    <section className="section container" id="positioning">
      <div className="section-tag">{c.pos_eyebrow || 'Positioning'}</div>
      <h2>{c.pos_heading || 'Built for Real Estate Developers — Designed for Closings'}</h2>
      <p className="section-intro">{c.pos_intro || 'Propkads is not a traditional marketing agency. We build and operate a sales-focused revenue system that connects buyer acquisition, CRM control, and sales team accountability.'}</p>

      <div className="fit-grid-v2">
        <div className="fit-card-v2 no">
          <h3>{c.pos_problem_label || 'Why Most Projects Struggle to Sell'}</h3>
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
          <h3>{c.pos_solution_label || 'What Propkads Changes'}</h3>
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

      <p className="callout">{c.pos_callout || 'Marketing alone does not sell projects — systems do.'}</p>
    </section>
  );
}
