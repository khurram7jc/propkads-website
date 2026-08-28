export default function Header({ c }) {
  const phoneHref = `tel:${(c.contact_phone || '').replace(/\s/g, '')}`;

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="topbar-inner">
          <a href={phoneHref} className="topbar-item">
            <span className="topbar-icon">☎</span> {c.contact_phone}
          </a>
          <a href={`mailto:${c.contact_email}`} className="topbar-item">
            <span className="topbar-icon">✉</span> {c.contact_email}
          </a>
        </div>
      </div>

      <nav className="mainnav">
        <div className="mainnav-inner">
          <a href="#top" className="mainnav-logo">
            <img src="/logo.png" alt="Propkads" />
          </a>

          <div className="mainnav-links">
            <a href="#about">{c.header_nav_1 || 'About Us'}</a>
            <a href="#services">{c.header_nav_2 || 'Services'}</a>
            <a href="#how-it-works">{c.header_nav_3 || 'How It Works'}</a>
            <a href="#contact">{c.header_nav_4 || 'Contact'}</a>
          </div>

          <a href="#contact" className="mainnav-cta">{c.header_cta_text || 'Get a Free Review'}</a>
        </div>
      </nav>
    </header>
  );
}
