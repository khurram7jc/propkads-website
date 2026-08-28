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
          <div className="floating-card card-a">
            <div className="floating-card-icon">📅</div>
            <div className="floating-card-value">{c.stat_founded || '2020'}</div>
            <div className="floating-card-label">Founded — Serving All Pakistan</div>
          </div>
          <div className="floating-card card-b">
            <div className="floating-card-icon">📊</div>
            <div className="floating-card-value">{c.stat_clarity || '60–90 Days'}</div>
            <div className="floating-card-label">To Real Sales Clarity</div>
          </div>
        </div>
      </div>
    </section>
  );
}
