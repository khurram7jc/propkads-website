export default function Hero({ c, onQuickPhone }) {
  const handleQuickSubmit = (e) => {
    e.preventDefault();
    const phone = e.target.elements.quickPhone.value.trim();
    if (!phone) return;
    onQuickPhone(phone);
  };

  const goalValue = parseInt(c.hero_dash_campaign_value || '690', 10);
  const goalTarget = parseInt(c.hero_dash_campaign_goal || '1000', 10);
  const pct = Math.min(1, goalValue / goalTarget);
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference * (1 - pct);

  return (
    <section className="hero-v2">
      <div className="hero-float-icons" aria-hidden="true">
        <svg className="hero-float-icon icon-pin" viewBox="0 0 48 48" style={{ '--dur': '5.5s', '--delay': '.8s' }}>
          <path d="M24 4C15 4 8 11 8 20C8 32 24 44 24 44C24 44 40 32 40 20C40 11 33 4 24 4Z" fill="none" strokeWidth="2.5" stroke="currentColor" strokeLinejoin="round" />
          <circle cx="24" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
        <svg className="hero-float-icon icon-house" viewBox="0 0 48 48" style={{ '--dur': '6.5s', '--delay': '0s' }}>
          <path d="M6 22 L24 8 L42 22 V40 H6 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="19" y="28" width="10" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
        <svg className="hero-float-icon icon-key" viewBox="0 0 48 48" style={{ '--dur': '7s', '--delay': '1.6s' }}>
          <circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M22 22 L40 40 M34 34 L40 28 M28 40 L34 34" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <svg className="hero-float-icon icon-building" viewBox="0 0 48 48" style={{ '--dur': '6s', '--delay': '2.2s' }}>
          <rect x="10" y="6" width="28" height="38" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
        <svg className="hero-float-icon icon-mappin" viewBox="0 0 48 48" style={{ '--dur': '5.8s', '--delay': '1.1s' }}>
          <path d="M24 2C13.5 2 5 10.5 5 21C5 35 24 46 24 46C24 46 43 35 43 21C43 10.5 34.5 2 24 2Z" fill="currentColor" />
          <circle cx="24" cy="20" r="7" fill="#fff" />
        </svg>
      </div>

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
          <div className="hero-dash-cards">
            <div className="hero-dash-card hero-dash-budget">
              <div className="hero-dash-budget-value">{c.hero_dash_budget_current || 'PKR 4,250,000'}</div>
              <div className="hero-dash-budget-total">Budget: {c.hero_dash_budget_total || 'PKR 5,500,000'}</div>
              <svg className="hero-dash-line" viewBox="0 0 200 60" preserveAspectRatio="none">
                <polyline points="0,40 20,45 40,30 60,38 80,20 100,32 120,15 140,25 160,10 180,18 200,5" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="hero-dash-line-labels"><span>Jan 2026</span><span>Feb 2026</span></div>
            </div>

            <div className="hero-dash-row">
              <div className="hero-dash-card hero-dash-goal">
                <div className="hero-dash-card-title">{c.hero_dash_campaign_title || 'Facebook Marketing Campaign'}</div>
                <div className="hero-dash-ring-wrap">
                  <svg viewBox="0 0 100 100" className="hero-dash-ring">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--line)" strokeWidth="9" />
                    <circle
                      cx="50" cy="50" r="40" fill="none" stroke="var(--green)" strokeWidth="9"
                      strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="47" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--ink)">{goalValue}</text>
                    <text x="50" y="63" textAnchor="middle" fontSize="8" fill="var(--slate)">Goal: {goalTarget}</text>
                  </svg>
                </div>
              </div>

              <div className="hero-dash-card hero-dash-traffic">
                <div className="hero-dash-card-title">{c.hero_dash_traffic_title || 'Generated Traffic & Leads'}</div>
                <svg className="hero-dash-bars" viewBox="0 0 160 60" preserveAspectRatio="none">
                  <rect x="0" y="30" width="16" height="30" fill="var(--green)" opacity="0.45" />
                  <rect x="24" y="20" width="16" height="40" fill="var(--green)" opacity="0.6" />
                  <rect x="48" y="35" width="16" height="25" fill="var(--green)" opacity="0.45" />
                  <rect x="72" y="10" width="16" height="50" fill="var(--green)" />
                  <rect x="96" y="25" width="16" height="35" fill="var(--green)" opacity="0.6" />
                  <rect x="120" y="15" width="16" height="45" fill="var(--green)" opacity="0.75" />
                  <rect x="144" y="5" width="16" height="55" fill="var(--green)" />
                </svg>
                <div className="hero-dash-traffic-pct">{c.hero_dash_traffic_percent || '61%'}</div>
                <div className="hero-dash-traffic-label">{c.hero_dash_traffic_label || 'Average monthly growth rate'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
