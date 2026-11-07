'use client';
import { useState, useEffect, memo } from 'react';

const TypingWord = memo(function TypingWord() {
  const targetWord = 'Closed Bookings.';
  const [displayText, setDisplayText] = useState('Closed Bookings.');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let delay = isDeleting ? 50 : 85;
    if (!isDeleting && displayText === targetWord) {
      delay = 2200;
    } else if (isDeleting && displayText === '') {
      delay = 420;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText === targetWord) {
          setIsDeleting(true);
        } else {
          setDisplayText(targetWord.substring(0, displayText.length + 1));
        }
      } else {
        if (displayText === '') {
          setIsDeleting(false);
        } else {
          setDisplayText(targetWord.substring(0, displayText.length - 1));
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting]);

  return (
    <span className="hero-typing-word">
      {displayText || '\u00A0'}
    </span>
  );
});

export default function Hero({ c = {}, onQuickPhone }) {
  const handleQuickSubmit = (e) => {
    e.preventDefault();
    const phone = e.target.elements.quickPhone.value.trim();
    if (!phone) return;
    onQuickPhone(phone);
  };

  return (
    <section className="hero-v2">
      {/* Background Video with Real Estate Towers & Overlay */}
      <div className="hero-video-wrap" aria-hidden="true">
        <video
          className="hero-video-bg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/hero-properties.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      <div className="hero-v2-inner">
        {/* Left Column: Core Value Proposition */}
        <div className="hero-v2-left">
          <h1 className="hero-v2-title">
            We Turn Unsold Real Estate Inventory Into
            <TypingWord />
          </h1>

          <p className="hero-v2-sub">
            From project launch to final booking. We generate serious property buyers, filter qualified leads through structured systems, and help your sales team close high-ticket apartments, plots, and commercial units.
          </p>

          <div className="hero-v2-cta-wrap">
            <form className="hero-quickform" onSubmit={handleQuickSubmit}>
              <input
                type="tel"
                name="quickPhone"
                placeholder="Your phone / WhatsApp number..."
                required
              />
              <button type="submit">Book Project Review →</button>
            </form>

            <div className="hero-trust-desk">
              <span className="hero-trust-label">Direct Consultant Desk:</span>
              <a href={`tel:${(c.contact_phone || '+923333401101').replace(/\s/g, '')}`} className="hero-trust-phone">
                {c.contact_phone || '+92 333 3401101'}
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Luxury Stadium Capsule Pods */}
        <div className="hero-v2-right">
          <div className="hero-capsules-wrap">
            {/* Capsule 1: Top Primary Wide Pod */}
            <div className="hero-capsule-item hero-capsule-wide">
              <span className="hero-capsule-beam"></span>
              <div className="hero-capsule-left">
                <div className="hero-capsule-big-num">{c.hero_stat1_number || 'PKR 27 Crore+'}</div>
              </div>
              <div className="hero-capsule-div"></div>
              <div className="hero-capsule-right">
                <div className="hero-capsule-label">{c.hero_stat1_title || 'Ad Spend Managed'}</div>
              </div>
            </div>

            {/* Bottom Row: 2 Distinct Pods */}
            <div className="hero-capsules-row">
              {/* Capsule 2: Efficiency */}
              <div className="hero-capsule-item hero-capsule-pod hero-capsule-efficiency">
                <span className="hero-capsule-beam"></span>
                <div className="hero-capsule-mid-num">{c.hero_stat2_number || 'PKR 250–500'}</div>
                <div className="hero-capsule-label">{c.hero_stat2_title || 'Typical Cost Per Lead'}</div>
              </div>

              {/* Capsule 3: Quality */}
              <div className="hero-capsule-item hero-capsule-pod hero-capsule-quality">
                <span className="hero-capsule-beam"></span>
                <div className="hero-capsule-mid-num">{c.hero_stat3_number || '60–70%'}</div>
                <div className="hero-capsule-label">{c.hero_stat3_title || 'Qualified Lead Rate'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
