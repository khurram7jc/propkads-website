export default function CommercialModel({ c }) {
  return (
    <section className="section container" id="model">
      <div className="section-tag">{c.model_eyebrow || 'Commercial Model'}</div>
      <h2>{c.model_heading || 'Retainer + Performance Structure'}</h2>

      <div className="model-panel">
        <div className="model-panel-grid">
          <div className="model-panel-card">
            <span className="tag">{c.model_retainer_label || 'Retainer'}</span>
            <p>{c.model_retainer_desc || 'Monthly retainer based on project scope'}</p>
          </div>
          <div className="model-panel-card">
            <span className="tag">{c.model_performance_label || 'Performance'}</span>
            <p>{c.model_performance_desc || 'Plus per-booking incentive or mutually agreed revenue share'}</p>
          </div>
        </div>

        <p className="model-panel-tagline">{c.commercial_model_tagline || 'We earn more only when you sell more.'}</p>
        <span className="model-panel-min">{c.model_min_engagement || 'Minimum engagement period: 60–90 days'}</span>
      </div>
    </section>
  );
}
