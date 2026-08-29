export default function Footer({ c }) {
  return (
    <footer className="footer-v2">
      <div className="footer-v2-inner">
        <div className="footer-v2-col footer-v2-brand">
          <img src="/logo.png" alt="Propkads" className="footer-v2-logo" />
          <p>{c.footer_tagline || 'A complete revenue system for real estate developers — not just ads.'}</p>
        </div>

        <div className="footer-v2-col">
          <h4>Quick Links</h4>
          <a href="#about">{c.header_nav_1 || 'About Us'}</a>
          <a href="#services">{c.header_nav_2 || 'Services'}</a>
          <a href="#how-it-works">{c.header_nav_3 || 'How It Works'}</a>
          <a href="#contact">{c.header_nav_4 || 'Contact'}</a>
        </div>

        <div className="footer-v2-col">
          <h4>Contact</h4>
          <a href={`tel:${(c.contact_phone || '').replace(/\s/g, '')}`}>{c.contact_phone}</a>
          <a href={`mailto:${c.contact_email}`}>{c.contact_email}</a>
          <span>{c.contact_location}</span>
        </div>

        <div className="footer-v2-col">
          <h4>Follow Us</h4>
          <div className="footer-v2-social">
            <a href={c.social_facebook || 'https://www.facebook.com/Propkads/'} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={c.social_instagram || 'https://www.instagram.com/propkads/'} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={c.social_linkedin || 'https://www.linkedin.com/company/propkads/'} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={c.social_youtube || 'https://www.youtube.com/@Propkads'} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href={c.social_x || 'https://x.com/propkads'} target="_blank" rel="noopener noreferrer">X</a>
            <a href={c.social_tiktok || 'https://www.tiktok.com/@propkads'} target="_blank" rel="noopener noreferrer">TikTok</a>
          </div>
        </div>
      </div>

      <div className="footer-v2-bottom">
        <span>2020 © PROPKADS. All Rights Reserved</span>
        <span>PROPKADS.COM</span>
      </div>
    </footer>
  );
}
