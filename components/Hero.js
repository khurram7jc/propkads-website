export default function Hero({ c, onQuickPhone }) {
  const handleQuickSubmit = (e) => {
    e.preventDefault();
    const phone = e.target.elements.quickPhone.value.trim();
    if (!phone) return;
    onQuickPhone(phone);
  };

  return (
    <section className="hero-v2">
      <svg className="hero-skyline" viewBox="0 0 1200 180" preserveAspectRatio="none" aria-hidden="true">
        <rect x="20" y="90" width="70" height="90" />
        <rect x="100" y="60" width="55" height="120" />
        <rect x="165" y="110" width="60" height="70" />
        <rect x="235" y="40" width="50" height="140" />
        <rect x="295" y="85" width="65" height="95" />
        <rect x="370" y="65" width="45" height="115" />
        <rect x="425" y="100" width="70" height="80" />
        <rect x="505" y="30" width="55" height="150" />
        <rect x="570" y="75" width="60" height="105" />
        <rect x="640" y="95" width="50" height="85" />
        <rect x="700" y="50" width="65" height="130" />
        <rect x="775" y="88" width="55" height="92" />
        <rect x="840" y="65" width="60" height="115" />
        <rect x="910" y="105" width="45" height="75" />
        <rect x="965" y="35" width="55" height="145" />
        <rect x="1030" y="80" width="65" height="100" />
        <rect x="1105" y="60" width="50" height="120" />
        <circle className="hero-skyline-window" cx="130" cy="90" r="3" />
        <circle className="hero-skyline-window" cx="255" cy="70" r="3" />
        <circle className="hero-skyline-window" cx="530" cy="60" r="3" />
        <circle className="hero-skyline-window" cx="725" cy="80" r="3" />
        <circle className="hero-skyline-window" cx="990" cy="65" r="3" />
      </svg>

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
