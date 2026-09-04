export default function Hero({ c, onQuickPhone }) {
  const handleQuickSubmit = (e) => {
    e.preventDefault();
    const phone = e.target.elements.quickPhone.value.trim();
    if (!phone) return;
    onQuickPhone(phone);
  };

  return (
    <section className="hero-v2">
      <div className="hero-float-icons" aria-hidden="true">
        <svg className="hero-float-icon icon-house" viewBox="0 0 48 48" style={{ '--dur': '6.5s', '--delay': '0s' }}>
          <path d="M6 22 L24 8 L42 22 V40 H6 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="19" y="28" width="10" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
        <svg className="hero-float-icon icon-pin" viewBox="0 0 48 48" style={{ '--dur': '5.5s', '--delay': '.8s' }}>
          <path d="M24 4C15 4 8 11 8 20C8 32 24 44 24 44C24 44 40 32 40 20C40 11 33 4 24 4Z" fill="none" strokeWidth="2.5" stroke="currentColor" strokeLinejoin="round" />
          <circle cx="24" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
        <svg className="hero-float-icon icon-key" viewBox="0 0 48 48" style={{ '--dur': '7s', '--delay': '1.6s' }}>
          <circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M22 22 L40 40 M34 34 L40 28 M28 40 L34 34" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <svg className="hero-float-icon icon-building" viewBox="0 0 48 48" style={{ '--dur': '6s', '--delay': '2.2s' }}>
          <rect x="10" y="6" width="28" height="38" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <line x1="17" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="31" y1="14" x2="31" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="17" y1="22" x2="17" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="22" x2="24" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="31" y1="22" x2="31" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="17" y1="30" x2="17" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="30" x2="24" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="31" y1="30" x2="31" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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
