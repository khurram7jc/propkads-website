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
          <span className="hero-tag reveal">A complete revenue system, not just ads</span>
          <h1 className="reveal reveal-delay-1">{c.hero_heading}</h1>
          <p className="sub reveal reveal-delay-2">{c.hero_subheading}</p>

          <form className="hero-quickform reveal reveal-delay-3" onSubmit={handleQuickSubmit}>
            <input type="tel" name="quickPhone" placeholder="Your phone / WhatsApp number" required />
            <button type="submit">Next</button>
          </form>
          <p className="hero-quicknote reveal reveal-delay-3">Or call us directly: <a href={`tel:${(c.contact_phone || '').replace(/\s/g, '')}`}>{c.contact_phone}</a></p>
        </div>

        <div className="hero-v2-right reveal reveal-delay-4">
          <div className="hero-cards-grid">
            <div className="floating-card">
              <div className="floating-card-num">STEP 01</div>
              <div className="floating-card-title">{c.hero_step_1 || 'Project Audit'}</div>
              <div className="floating-card-desc">{c.hero_step_1_desc || 'Inventory review, pricing analysis, buyer profiling, and competitor assessment.'}</div>
            </div>
            <div className="floating-card">
              <div className="floating-card-num">STEP 02</div>
              <div className="floating-card-title">{c.hero_step_2 || 'Launch & CRM Setup'}</div>
              <div className="floating-card-desc">{c.hero_step_2_desc || 'Campaign launch, CRM pipeline configuration, and sales team assignment rules.'}</div>
            </div>
            <div className="floating-card">
              <div className="floating-card-num">STEP 03</div>
              <div className="floating-card-title">{c.hero_step_3 || 'Weekly Optimization'}</div>
              <div className="floating-card-desc">{c.hero_step_3_desc || 'Lead quality improvement, follow-up correction, and sales activity monitoring.'}</div>
            </div>
            <div className="floating-card">
              <div className="floating-card-num">STEP 04</div>
              <div className="floating-card-title">{c.hero_step_4 || 'Conversion & Scaling'}</div>
              <div className="floating-card-desc">{c.hero_step_4_desc || 'Booking-focused optimization and revenue scaling based on real performance data.'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
