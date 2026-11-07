'use client';

const PARTNERS = [
  { name: 'Karachi Enclave', src: '/partners/karachi-enclave.png' },
  { name: 'Fariha Builders & Developers', src: '/partners/fariha-builders.png' },
  { name: 'Falaknaz Grand', src: '/partners/falaknaz-grand.png' },
  { name: 'Diamond Builders', src: '/partners/diamond-builders.png' },
  { name: 'Aziz Broadway', src: '/partners/aziz-broadway.png' },
  { name: 'Atom Builders', src: '/partners/atom-builders.png' },
  { name: 'Falaknaz Highlife', src: '/partners/falaknaz-highlife.png' },
  { name: 'Makadian Properties', src: '/partners/makadian-properties.png' },
  { name: 'Aziz Builders & Developers', src: '/partners/aziz-builders.png' },
  { name: 'Diamond Twin Towers', src: '/partners/diamond-twin-towers.png' },
  { name: 'Falaknaz Skyview', src: '/partners/falaknaz-skyview.png' },
  { name: 'MK 021 Builders & Developers', src: '/partners/mk-021.png' },
  { name: 'Aziz Excellency', src: '/partners/aziz-excellency.png' },
  { name: 'Al-Mateen', src: '/partners/al-mateen.png' },
  { name: 'Falaknaz Group', src: '/partners/falaknaz-group.png' },
  { name: 'Petal Index Residency', src: '/partners/petal-index.png' },
  { name: 'Aziz Skyline', src: '/partners/aziz-skyline.png' },
  { name: 'GM Lakhani Towers', src: '/partners/gm-lakhani.png' },
  { name: '5 Exclusive', src: '/partners/exclusive-5.png' },
  { name: 'Falaknaz Marketing', src: '/partners/falaknaz-marketing.png' },
];

export default function PartnersMarquee() {
  return (
    <section
      id="partners"
      style={{
        padding: '40px 0 34px 0',
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1120px', margin: '0 auto 22px auto', padding: '0 24px', textAlign: 'center' }}>
        <h2
          style={{
            fontSize: 'clamp(17px, 2vw, 20px)',
            fontWeight: '800',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#0F172A',
            margin: 0,
          }}
        >
          Trusted Partners
        </h2>
        <div
          style={{
            width: '100%',
            maxWidth: '220px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #CBD5E1 50%, transparent)',
            margin: '14px auto 0 auto',
          }}
        />
      </div>

      <style>{`
        .partners-marquee-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }

        .partners-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          animation: partnersScroll 46s linear infinite;
        }

        .partners-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes partnersScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .partner-logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          height: 64px;
          min-width: 125px;
          padding: 0 8px;
          margin-right: 52px;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .partner-logo-img {
          max-height: 50px;
          max-width: 140px;
          width: auto;
          height: auto;
          object-fit: contain;
          opacity: 0.92;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
        }

        .partner-logo-item:hover .partner-logo-img {
          opacity: 1;
          transform: scale(1.06);
        }

        @media (max-width: 640px) {
          .partner-logo-item {
            margin-right: 34px;
            min-width: 96px;
            height: 52px;
          }
          .partner-logo-img {
            max-height: 38px;
            max-width: 110px;
          }
        }
      `}</style>

      <div className="partners-marquee-container">
        <div className="partners-marquee-track">
          {/* First Set of Logos */}
          {PARTNERS.map((partner, idx) => (
            <div key={`p1-${idx}`} className="partner-logo-item" title={partner.name}>
              <img
                src={partner.src}
                alt={partner.name}
                className="partner-logo-img"
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
          {/* Duplicate Set for Seamless Infinite Loop */}
          {PARTNERS.map((partner, idx) => (
            <div key={`p2-${idx}`} className="partner-logo-item" title={partner.name} aria-hidden="true">
              <img
                src={partner.src}
                alt={partner.name}
                className="partner-logo-img"
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
