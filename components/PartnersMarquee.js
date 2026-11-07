'use client';

import { useEffect, useRef } from 'react';

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
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId;
    let lastTime = performance.now();
    const SPEED_PX_PER_SEC = 58; // Smooth continuous speed

    const wrapOffset = (val, halfWidth) => {
      if (halfWidth <= 0) return 0;
      let next = val % halfWidth;
      if (next < 0) next += halfWidth;
      return next;
    };

    const step = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const halfWidth = track.scrollWidth / 2;
      if (!isHoveredRef.current && !isDraggingRef.current && halfWidth > 0) {
        offsetRef.current = wrapOffset(offsetRef.current + SPEED_PX_PER_SEC * dt, halfWidth);
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const updateDragPosition = (clientX) => {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    if (halfWidth <= 0) return;

    const dx = clientX - dragStartXRef.current;
    let next = (dragStartOffsetRef.current - dx) % halfWidth;
    if (next < 0) next += halfWidth;
    offsetRef.current = next;
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  };

  // Touch handlers (Mobile: pause on thumb down, drag left/right, resume immediately on thumb up)
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || !e.touches || e.touches.length === 0) return;
    updateDragPosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Mouse handlers (Desktop: pause on hover, optional click-drag)
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    updateDragPosition(e.clientX);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

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
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
          cursor: grab;
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }

        .partners-marquee-container:active {
          cursor: grabbing;
        }

        .partners-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
        }

        .partner-logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          height: 82px;
          min-width: 150px;
          padding: 0 10px;
          margin-right: 52px;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .partner-logo-img {
          max-height: 68px;
          max-width: 175px;
          width: auto;
          height: auto;
          object-fit: contain;
          opacity: 0.94;
          pointer-events: none;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .partner-logo-item:hover .partner-logo-img {
            opacity: 1;
            transform: scale(1.06);
          }
        }

        @media (max-width: 640px) {
          .partner-logo-item {
            margin-right: 38px;
            min-width: 132px;
            height: 74px;
          }
          .partner-logo-img {
            max-height: 60px;
            max-width: 155px;
          }
        }
      `}</style>

      <div
        className="partners-marquee-container"
        onMouseEnter={() => {
          if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            isHoveredRef.current = true;
          }
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          isDraggingRef.current = false;
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div className="partners-marquee-track" ref={trackRef}>
          {/* First Set of Logos */}
          {PARTNERS.map((partner, idx) => (
            <div key={`p1-${idx}`} className="partner-logo-item" title={partner.name}>
              <img
                src={partner.src}
                alt={partner.name}
                className="partner-logo-img"
                loading="eager"
                decoding="async"
                draggable={false}
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
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
