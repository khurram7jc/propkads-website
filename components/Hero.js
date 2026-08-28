export default function Hero({ c, onQuickPhone }) {
  const handleQuickSubmit = (e) => {
    e.preventDefault();
    const phone = e.target.elements.quickPhone.value.trim();
    if (!phone) return;
    onQuickPhone(phone);
  };

  return (
    <section className="hero-v2">
      <div className="hero-v2-inner">
        <div className="hero-v2-left">
          <span className="hero-tag">A complete revenue system, not just ads</span>
          <h1>{c.hero_heading}</h1>
          <p className="sub">{c.hero_subheading}</p>

          <form className="hero-quickform" onSubmit={handleQuickSubmit}>
            <input type="tel" name="quickPhone" placeholder="Your phone / WhatsApp number" required />
            <button type="submit">Next</button>
          </form>
          <p className="hero-quicknote">Or call us directly: <a href={`tel:${(c.contact_phone || '').replace(/\s/g, '')}`}>{c.contact_phone}</a></p>
        </div>

        <div className="hero-v2-right">
          <div className="hero-cards-grid">
            <div className="floating-card">
              <div className="floating-card-num">01</div>
              <div className="floating-card-title">{c.hero_step_1 || 'Project Audit'}</div>
            </div>
            <div className="floating-card">
              <div className="floating-card-num">02</div>
              <div className="floating-card-title">{c.hero_step_2 || 'Launch & CRM Setup'}</div>
            </div>
            <div className="floating-card">
              <div className="floating-card-num">03</div>
              <div className="floating-card-title">{c.hero_step_3 || 'Weekly Optimization'}</div>
            </div>
            <div className="floating-card">
              <div className="floating-card-num">04</div>
              <div className="floating-card-title">{c.hero_step_4 || 'Conversion & Scaling'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
