export default function ExecutionSupport({ c }) {
  const items = [
    { icon: '🎨', label: c.exec_item_1 || 'Project branding & sales creatives' },
    { icon: '🏗️', label: c.exec_item_2 || '2D / 3D visuals & walkthroughs' },
    { icon: '🎬', label: c.exec_item_3 || 'Sales videos, reels & presentations' },
    { icon: '🌐', label: c.exec_item_4 || 'Landing pages & websites' },
  ];

  return (
    <section className="section container reveal" id="execution">
      <div className="section-tag">{c.exec_eyebrow || 'Execution Support'}</div>
      <h2>{c.exec_heading || 'Creative used only when it moves sales.'}</h2>
      <p className="section-intro">{c.exec_intro || 'Creative and digital execution is used only when it directly improves sales performance.'}</p>

      <div className="exec-grid-v2">
        {items.map((item, i) => (
          <div className="exec-card-v2" key={i}>
            <div className="exec-card-v2-icon">{item.icon}</div>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </div>

      <p className="exec-callout">{c.exec_note || 'All execution is aligned with revenue objectives — not vanity metrics.'}</p>
    </section>
  );
}
