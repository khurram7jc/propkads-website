'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomSelect from '@/components/CustomSelect';
import { DEFAULT_CONTENT } from '@/data/content';

const UNIT_OPTIONS = [
  { value: 'Emerald (1230 SQFT) - PKR 1.72 Cr', label: 'Emerald (1230 SQFT) — PKR 1.72 Cr' },
  { value: 'Ruby (1230 SQFT) - PKR 1.72 Cr', label: 'Ruby (1230 SQFT) — PKR 1.72 Cr' },
  { value: 'Sapphire (1180 SQFT) - PKR 1.65 Cr', label: 'Sapphire (1180 SQFT) — PKR 1.65 Cr' },
  { value: 'Opal (1072 SQFT) - PKR 1.50 Cr', label: 'Opal (1072 SQFT) — PKR 1.50 Cr' },
  { value: 'Commercial Showrooms', label: 'Ground Floor Commercial Showrooms' },
];

// Video URL for "Life at Karachi Enclave" (Supports both YouTube & Facebook Video links)
const KARACHI_ENCLAVE_VIDEO_URL = 'https://youtu.be/Q7Xu-GOZrdo';

function getVideoEmbedUrl(url) {
  if (!url) return '';
  const ytMatch = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
  if (ytMatch && ytMatch[2].length === 11) {
    return `https://www.youtube.com/embed/${ytMatch[2]}?enablejsapi=1&rel=0`;
  }
  if (url.includes('facebook.com')) {
    const encoded = encodeURIComponent(url);
    return `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&t=0`;
  }
  return url;
}

export default function KarachiEnclavePage() {
  const [c, setC] = useState(DEFAULT_CONTENT);
  const [activeTab, setActiveTab] = useState('ruby'); // Default to ruby so both left (emerald) and right (sapphire, opal) are visible on load
  const [cardViews, setCardViews] = useState({
    emerald: '3d',
    ruby: '3d',
    sapphire: '3d',
    opal: '3d',
  });
  const [lightboxImg, setLightboxImg] = useState(null);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', city: 'Karachi', unit: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const videoIframeRef = useRef(null);
  const videoContainerRef = useRef(null);

  // Preload all unit images (3D, 2D, Payment plans) on load so tab switching is instantaneous
  useEffect(() => {
    Object.values(units).forEach((u) => {
      [u.img3d, u.img2d, u.imgPayment].forEach((src) => {
        if (src) {
          const img = new Image();
          img.src = src;
        }
      });
    });
  }, []);

  // Auto-pause video when scrolled out of view
  useEffect(() => {
    const el = videoContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If video card is less than 20% visible or user scrolled past it, pause YouTube video
          if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
            try {
              if (videoIframeRef.current && videoIframeRef.current.contentWindow) {
                videoIframeRef.current.contentWindow.postMessage(
                  JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
                  '*'
                );
              }
            } catch (err) {
              // Ignore cross-origin postMessage issues
            }
          }
        });
      },
      { threshold: [0, 0.2, 0.5] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const setCardView = (unitKey, view) => {
    setCardViews((prev) => ({ ...prev, [unitKey]: view }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImg(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setC((prev) => ({ ...prev, ...d.content }));
      })
      .catch(() => {});
  }, []);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.unit) {
      alert('Please select an apartment category / price range.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: leadForm.name,
          phone: leadForm.phone,
          email: '',
          city: leadForm.city || 'Karachi',
          companyName: 'Karachi Enclave',
          inventoryType: 'Apartments',
          leadCategory: 'project',
          projectName: 'Karachi Enclave',
          unitInterest: leadForm.unit,
          message: `Karachi Enclave Lead: ${leadForm.unit} | City/Country: ${leadForm.city}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(true);
        setLeadForm({ name: '', phone: '', city: 'Karachi', unit: '' });
      }
    } catch {
      // Fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  const units = {
    emerald: {
      name: 'Emerald',
      size: '1230.00 SQFT',
      priceCrore: 'PKR 1.72 Crore',
      formValue: 'Emerald (1230 SQFT) - PKR 1.72 Cr',
      rooms: '4 Rooms Luxury Apartment',
      beds: '3 Beds with Attached Baths, Lounge, Kitchen, Terrace & Store',
      total: '1,72,20,000',
      booking: '17,00,000',
      allocation: '15,00,000',
      confirmation: '15,00,000',
      monthly: '1,50,000 × 36',
      quarterly: '3,00,000 × 12',
      possession: '5,00,000',
      img3d: '/projects/karachi-enclave/emerald-1.jpg',
      img2d: '/projects/karachi-enclave/emerald-0.jpg',
      imgPayment: '/projects/karachi-enclave/emerald-page-1.jpg',
      pdf: '/projects/karachi-enclave/Emerald.pdf',
    },
    ruby: {
      name: 'Ruby',
      size: '1230.00 SQFT',
      priceCrore: 'PKR 1.72 Crore',
      formValue: 'Ruby (1230 SQFT) - PKR 1.72 Cr',
      rooms: '4 Rooms Luxury Apartment',
      beds: '3 Beds with Attached Baths, Lounge, Kitchen, Terrace & Store',
      total: '1,72,20,000',
      booking: '17,00,000',
      allocation: '15,00,000',
      confirmation: '15,00,000',
      monthly: '1,50,000 × 36',
      quarterly: '3,00,000 × 12',
      possession: '5,00,000',
      img3d: '/projects/karachi-enclave/ruby-1.jpg',
      img2d: '/projects/karachi-enclave/ruby-0.jpg',
      imgPayment: '/projects/karachi-enclave/ruby-page-1.jpg',
      pdf: '/projects/karachi-enclave/Ruby.pdf',
    },
    sapphire: {
      name: 'Sapphire',
      size: '1180.00 SQFT',
      priceCrore: 'PKR 1.65 Crore',
      formValue: 'Sapphire (1180 SQFT) - PKR 1.65 Cr',
      rooms: '4 Rooms Luxury Apartment',
      beds: '3 Beds with Attached Baths, Lounge, Kitchen, Terrace & Store',
      total: '1,65,20,000',
      booking: '16,00,000',
      allocation: '14,50,000',
      confirmation: '14,50,000',
      monthly: '1,40,000 × 36',
      quarterly: '2,88,333 × 12',
      possession: '5,20,000',
      img3d: '/projects/karachi-enclave/sapphire-1.jpg',
      img2d: '/projects/karachi-enclave/sapphire-0.jpg',
      imgPayment: '/projects/karachi-enclave/sapphire-page-1.jpg',
      pdf: '/projects/karachi-enclave/Sapphire.pdf',
    },
    opal: {
      name: 'Opal',
      size: '1072.00 SQFT',
      priceCrore: 'PKR 1.50 Crore',
      formValue: 'Opal (1072 SQFT) - PKR 1.50 Cr',
      rooms: '4 Rooms Comfort Apartment',
      beds: '2 Beds with Attached Baths, Drawing Room, TV Lounge, Kitchen & Terrace',
      total: '1,50,08,000',
      booking: '15,00,000',
      allocation: '14,00,000',
      confirmation: '14,00,000',
      monthly: '1,20,000 × 36',
      quarterly: '2,40,000 × 12',
      possession: '5,08,000',
      img3d: '/projects/karachi-enclave/opal-1.jpg',
      img2d: '/projects/karachi-enclave/opal-0.jpg',
      imgPayment: '/projects/karachi-enclave/opal-page-1.jpg',
      pdf: '/projects/karachi-enclave/Opal.pdf',
    },
  };

  const activeUnit = units[activeTab];

  const amenities = [
    {
      title: 'STANDBY GENERATOR',
      icon: (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="12" width="36" height="26" rx="3" />
          <line x1="12" y1="6" x2="12" y2="12" />
          <line x1="36" y1="6" x2="36" y2="12" />
          <circle cx="16" cy="25" r="4" />
          <path d="M28 19l-4 6h5l-3 6" />
          <line x1="35" y1="21" x2="38" y2="21" />
          <line x1="35" y1="25" x2="38" y2="25" />
          <line x1="35" y1="29" x2="38" y2="29" />
          <line x1="12" y1="38" x2="12" y2="42" />
          <line x1="36" y1="38" x2="36" y2="42" />
        </svg>
      ),
    },
    {
      title: 'BASEMENT PARKING',
      icon: (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18h36M8 18V8h32v10" />
          <line x1="8" y1="13" x2="40" y2="13" />
          <line x1="6" y1="40" x2="6" y2="18" />
          <line x1="42" y1="40" x2="42" y2="18" />
          <rect x="11" y="24" width="26" height="15" rx="3" />
          <path d="M15 24l2.5-6h13l2.5 6" />
          <circle cx="17" cy="33" r="2" />
          <circle cx="31" cy="33" r="2" />
          <line x1="21" y1="33" x2="27" y2="33" />
        </svg>
      ),
    },
    {
      title: 'HIGH-SPEED LIFTS',
      icon: (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="6" width="32" height="36" rx="3" />
          <line x1="24" y1="6" x2="24" y2="42" />
          <rect x="18" y="9" width="12" height="5" rx="1" />
          <path d="M14 26l2.5-3 2.5 3" />
          <line x1="16.5" y1="23" x2="16.5" y2="31" />
          <path d="M29 28l2.5 3 2.5-3" />
          <line x1="31.5" y1="23" x2="31.5" y2="31" />
        </svg>
      ),
    },
    {
      title: 'GRAND RECEPTION',
      icon: (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 42h32M10 42V14a6 6 0 016-6h16a6 6 0 016 6v28" />
          <path d="M14 18a10 10 0 0120 0" />
          <line x1="24" y1="8" x2="24" y2="42" />
          <circle cx="20" cy="28" r="1.5" fill="#1E293B" />
          <circle cx="28" cy="28" r="1.5" fill="#1E293B" />
          <line x1="6" y1="42" x2="42" y2="42" />
        </svg>
      ),
    },
    {
      title: 'PEACEFUL MOSQUE',
      icon: (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 6c-3 4-8 7-8 13a8 8 0 0016 0c0-6-5-9-8-13z" />
          <path d="M10 27v15h28V27" />
          <path d="M19 42v-8a5 5 0 0110 0v8" />
          <line x1="6" y1="42" x2="42" y2="42" />
          <line x1="24" y1="3" x2="24" y2="6" />
          <path d="M23 3.5a1.5 1.5 0 112 0" />
        </svg>
      ),
    },
    {
      title: 'ROOFTOP GARDEN',
      icon: (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="12" x2="40" y2="12" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="20" y1="8" x2="20" y2="12" />
          <line x1="28" y1="8" x2="28" y2="12" />
          <line x1="36" y1="8" x2="36" y2="12" />
          <line x1="12" y1="12" x2="12" y2="42" />
          <line x1="36" y1="12" x2="36" y2="42" />
          <path d="M18 36a6 6 0 0112 0v6H18v-6z" />
          <path d="M24 24c-3 0-5 3-5 6h10c0-3-2-6-5-6z" />
          <line x1="24" y1="30" x2="24" y2="36" />
          <line x1="6" y1="42" x2="42" y2="42" />
        </svg>
      ),
    },
    {
      title: 'KIDS PLAY AREA',
      icon: (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="10" y1="40" x2="18" y2="12" />
          <line x1="18" y1="12" x2="18" y2="40" />
          <line x1="13" y1="31" x2="18" y2="31" />
          <line x1="15" y1="22" x2="18" y2="22" />
          <path d="M18 14h6c4 0 7 4 9 9l6 17" />
          <line x1="6" y1="40" x2="42" y2="40" />
          <circle cx="28" cy="9" r="3" />
        </svg>
      ),
    },
    {
      title: '24/7 CCTV SECURITY',
      icon: (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 12h6v18H8z" />
          <path d="M14 18l18-7 4 7-18 7z" />
          <path d="M28 25l-4 8h-6" />
          <circle cx="33" cy="19" r="2" fill="#1E293B" />
          <line x1="36" y1="18" x2="42" y2="18" />
          <line x1="35" y1="22" x2="40" y2="24" />
        </svg>
      ),
    },
  ];

  const landmarks = [
    { title: 'Jinnah Avenue & Malir Cantt', time: '3 Mins' },
    { title: 'Main University Road', time: '5 Mins' },
    { title: 'Jinnah International Airport', time: '8 Mins' },
    { title: 'Safoora Chowrangi / BRT Station', time: '6 Mins' },
    { title: 'Karachi University / NED', time: '10 Mins' },
    { title: 'M-9 Motorway Link', time: '12 Mins' },
  ];

  const interiors = [
    { title: 'Executive Drawing Room', desc: 'Spacious guest lounge with panoramic windows, contemporary furnishings and ambient chandelier lighting.', img: '/projects/karachi-enclave/interior-1.jpg' },
    { title: 'Modern Modular Kitchen & Dining', desc: 'Sleek black marble backsplash with integrated appliances and premium dining area.', img: '/projects/karachi-enclave/interior-2.jpg' },
    { title: 'Master Bedroom & Balcony View', desc: 'Floor-to-ceiling glass doors opening directly to scenic balcony views with hanging lounger.', img: '/projects/karachi-enclave/interior-3.jpg' },
    { title: 'Kids Bedroom & Study Zone', desc: 'Playful and bright children bedroom featuring study workstation and indoor fun slide.', img: '/projects/karachi-enclave/interior-4.jpg' },
    { title: 'Master Bedroom Suite & Wardrobe', desc: 'Spacious king-size master bedroom equipped with custom backlit glass wardrobes.', img: '/projects/karachi-enclave/interior-5.jpg' },
    { title: 'Grand Reception Atrium', desc: 'Double-height commercial entrance lobby with crystal chandelier and marble finishing.', img: '/projects/karachi-enclave/interior-6.jpg' },
  ];

  return (
    <>
      <Header c={c} />

      <main style={{ background: '#F8FAFC', minHeight: '100vh', color: '#0F172A', fontFamily: 'Inter, system-ui, sans-serif' }}>
        
        <style>{`
          @media (max-width: 860px) {
            .ke-hero-section {
              background-attachment: scroll !important;
              min-height: auto !important;
            }
            .ke-hero-container {
              padding: 48px 18px 52px !important;
            }
            .ke-hero-grid {
              grid-template-columns: minmax(0, 1fr) !important;
              gap: 32px !important;
            }
            .ke-section-container {
              padding: 0 18px !important;
            }
          }
          @media (max-width: 520px) {
            .ke-hero-logo-row {
              gap: 14px !important;
            }
            .ke-hero-logo-img {
              max-width: 96px !important;
              max-height: 92px !important;
            }
            .ke-hero-logo-text {
              padding-left: 14px !important;
            }
            #booking-form {
              padding: 24px 18px !important;
            }
            .ke-plans-container {
              padding: 0 8px !important;
            }
            .ke-deck-arrow-prev {
              left: 4px !important;
              width: 40px !important;
              height: 40px !important;
            }
            .ke-deck-arrow-next {
              right: 4px !important;
              width: 40px !important;
              height: 40px !important;
            }
          }
        `}</style>

        {/* 1. HERO SECTION WITH RIGHT-SIDE BOOKING FORM */}
        <section
          className="ke-hero-section"
          style={{
            position: 'relative',
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            backgroundImage: "url('/projects/karachi-enclave/tower-angle.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundAttachment: 'fixed',
          }}
        >
          {/* Dark Luxury Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.82) 55%, rgba(15, 23, 42, 0.92) 100%)',
            }}
          />

          <div className="ke-hero-container" style={{ maxWidth: '1120px', width: '100%', margin: '0 auto', padding: '90px 32px 70px', position: 'relative', zIndex: 10, boxSizing: 'border-box' }}>
            <div className="ke-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center', width: '100%' }}>
              
              {/* Left Column: Headlines & Highlights (Aligned with PropKads Logo) */}
              <div style={{ minWidth: 0 }}>
                
                {/* Logo + Clean Aligned Text Block */}
                <div className="ke-hero-logo-row" style={{ display: 'flex', alignItems: 'center', gap: '22px', marginBottom: '22px' }}>
                  <img
                    className="ke-hero-logo-img"
                    src="/projects/karachi-enclave/karachi-enclave-logo.png"
                    alt="Karachi Enclave"
                    style={{
                      height: 'auto',
                      maxHeight: '130px',
                      width: 'auto',
                      maxWidth: '145px',
                      display: 'block',
                      filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.45))',
                      flexShrink: 0,
                    }}
                  />
                  <div className="ke-hero-logo-text" style={{ borderLeft: '2px solid rgba(255, 255, 255, 0.18)', paddingLeft: '20px', minWidth: 0 }}>
                    <div style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: '900', color: '#3ED17A', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.15 }}>
                      Booking Open
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#94A3B8', marginTop: '4px', letterSpacing: '0.02em' }}>
                      Gulistan-e-Jauhar, Karachi
                    </div>
                    <div style={{ fontSize: 'clamp(15px, 1.6vw, 19px)', fontWeight: '800', color: '#FFFFFF', lineHeight: 1.35, marginTop: '8px' }}>
                      Ultra-Luxury 4-Room Executive Apartments &amp; Commercial Showrooms
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: 1.7, maxWidth: '540px', margin: '0 0 24px 0' }}>
                  A landmark residential tower developed by <strong>Atom Builders &amp; Developers</strong>. Offering 3-bed drawing lounge luxury living on a flexible 36-month installment plan.
                </p>

                {/* Key Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14.5px', color: '#E2E8F0' }}>
                    <span style={{ color: '#3ED17A', fontSize: '17px', fontWeight: '800' }}>✓</span>
                    <span>10% Cash Discount on 100% Upfront Payment</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14.5px', color: '#E2E8F0' }}>
                    <span style={{ color: '#3ED17A', fontSize: '17px', fontWeight: '800' }}>✓</span>
                    <span>36-Month Easy Installment Schedule</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14.5px', color: '#E2E8F0' }}>
                    <span style={{ color: '#3ED17A', fontSize: '17px', fontWeight: '800' }}>✓</span>
                    <span>Standby Generator · High-Speed Lifts · Rooftop Park</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Lead Form (Aligned flush to right with "Get a Free Review" button) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', width: '100%' }}>
                <div id="booking-form" style={{ background: 'rgba(255, 255, 255, 0.96)', color: '#0F172A', padding: '32px 28px', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)', maxWidth: '430px', width: '100%', margin: 0, backdropFilter: 'blur(8px)', boxSizing: 'border-box' }}>
                  {submitSuccess ? (
                    <div style={{ background: '#E9F7EE', border: '1px solid #14A750', padding: '24px 18px', borderRadius: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎉</div>
                      <h4 style={{ margin: '0 0 6px 0', color: '#14A750', fontSize: '17px', fontWeight: '800' }}>Inquiry Received!</h4>
                      <p style={{ fontSize: '13px', color: '#334155', margin: 0, lineHeight: 1.5 }}>
                        Thank you for your interest in Karachi Enclave. Our team will contact you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '15px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '6px' }}>
                          Name <span style={{ color: '#E11D48' }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          style={{ width: '100%', padding: '11px 14px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '14.5px', color: '#1F2937', boxSizing: 'border-box', background: '#FFFFFF' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '15px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '6px' }}>
                          Phone Number <span style={{ color: '#E11D48' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="0300 1234567"
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          style={{ width: '100%', padding: '11px 14px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '14.5px', color: '#1F2937', boxSizing: 'border-box', background: '#FFFFFF' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '15px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '6px' }}>
                          City / Country <span style={{ color: '#E11D48' }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Karachi"
                          value={leadForm.city}
                          onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                          style={{ width: '100%', padding: '11px 14px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '14.5px', color: '#1F2937', boxSizing: 'border-box', background: '#FFFFFF' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '15px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '6px' }}>
                          Available Units &amp; Price Ranges <span style={{ color: '#E11D48' }}>*</span>
                        </label>
                        <CustomSelect
                          className="project-custom-select"
                          options={UNIT_OPTIONS}
                          value={leadForm.unit}
                          onChange={(val) => setLeadForm({ ...leadForm, unit: val })}
                          placeholder="- Select -"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          background: '#090D16',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '12px 32px',
                          borderRadius: '6px',
                          fontSize: '15px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          width: 'fit-content',
                          marginTop: '6px',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                          opacity: isSubmitting ? 0.7 : 1,
                        }}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. ABOUT PROJECT / STRATEGIC OVERVIEW (Image Left, Text & CTA Right) */}
        <section style={{ padding: '52px 0', borderTop: '1px solid #E2E8F0', background: '#FFFFFF' }}>
          <div className="ke-section-container" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 32px', boxSizing: 'border-box' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'center' }}>
              {/* Left: Elevation Image */}
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <img
                  src="/projects/karachi-enclave/front-elevation.jpg"
                  alt="Karachi Enclave Front Elevation"
                  style={{ width: '100%', maxWidth: '380px', height: 'auto', borderRadius: '16px', boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12)', border: '1px solid #E2E8F0', display: 'block' }}
                />
              </div>

              {/* Right: Overview Text + Book Now Button */}
              <div>
                <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: '900', color: '#0F172A', lineHeight: 1.25, marginBottom: '16px' }}>
                  A Modern Sanctuary Designed For Comfort &amp; Security
                </h2>
                <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.75, margin: '0 0 24px 0' }}>
                  <strong>Karachi Enclave</strong> is an exquisite vertical residential community rising in the thriving hub of Gulistan-e-Jauhar, Karachi. Offering thoughtfully configured 4-room luxury residences and ground-floor commercial showrooms on a flexible 36-month installment plan.
                </p>
                <a
                  href="#booking-form"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!leadForm.unit && units[activeTab]) {
                      setLeadForm((prev) => ({ ...prev, unit: units[activeTab].formValue }));
                    }
                    const el = document.getElementById('booking-form');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      const input = el.querySelector('input');
                      if (input) input.focus();
                    }
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#14A750',
                    color: '#FFFFFF',
                    padding: '13px 28px',
                    borderRadius: '8px',
                    fontSize: '14.5px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(20, 167, 80, 0.35)',
                    cursor: 'pointer',
                  }}
                >
                  <span>Book Now</span>
                  <span>↑</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PROJECT INTERIOR (Pure 6-Image Gallery Grid) */}
        <section id="project-interior" style={{ background: '#F8FAFC', padding: '52px 0', borderTop: '1px solid #E2E8F0' }}>
          <div className="ke-section-container" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 32px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', margin: '0 auto 32px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: '900', color: '#0F172A', margin: 0 }}>
                Project Interior
              </h2>
            </div>

            {/* 6-Image Interior Grid (3 columns on desktop, responsive) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
              {interiors.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImg({ src: item.img, title: item.title })}
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    height: '250px',
                    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
                    border: '1px solid #E2E8F0',
                    background: '#E2E8F0',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title || "Karachi Enclave Project Interior"}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.35s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FLOOR PLANS & 3D LAYOUTS (Interactive 3D Deck Carousel) */}
        <section id="floor-plans" style={{ background: '#FFFFFF', padding: '52px 0', borderTop: '1px solid #E2E8F0' }}>
          <div className="ke-plans-container" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 32px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', margin: '0 auto 28px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: '900', color: '#0F172A', margin: 0 }}>
                Apartment Layouts &amp; Pricing
              </h2>
            </div>

            {/* 3D Cover Flow Deck Carousel (Matching Reference Design) */}
            {(() => {
              const unitKeys = ['emerald', 'ruby', 'sapphire', 'opal'];
              const curIdx = unitKeys.indexOf(activeTab);

              const handlePrev = () => {
                const prev = curIdx > 0 ? curIdx - 1 : unitKeys.length - 1;
                setActiveTab(unitKeys[prev]);
              };

              const handleNext = () => {
                const next = curIdx < unitKeys.length - 1 ? curIdx + 1 : 0;
                setActiveTab(unitKeys[next]);
              };

              return (
                <div style={{ position: 'relative', width: '100%', margin: '0 auto' }}>
                  {/* 3D Cover Flow Stage */}
                  <div
                    style={{
                      position: 'relative',
                      height: '570px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      perspective: '1400px',
                    }}
                  >
                    {/* Left Navigation Arrow */}
                    <button
                      type="button"
                      className="ke-deck-arrow-prev"
                      onClick={handlePrev}
                      aria-label="Previous Unit"
                      style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        color: '#0F172A',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                        zIndex: 50,
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                        e.currentTarget.style.background = '#F8FAFC';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        e.currentTarget.style.background = '#FFFFFF';
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>

                    {/* The 4 Deck Cards */}
                    {unitKeys.map((key, i) => {
                      const u = units[key];
                      const offset = i - curIdx;
                      const isCenter = offset === 0;
                      const currentView = cardViews[key] || '3d';
                      const cardImg = currentView === 'payment' ? u.imgPayment : currentView === '2d' ? u.img2d : u.img3d;

                      // Exact 3D Cover Flow calculation (GPU-accelerated 60fps)
                      const absOffset = Math.abs(offset);
                      const translateX = offset * 260;
                      const scale = 1 - absOffset * 0.12;
                      const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.72 : Math.max(0.2, 0.45 - (absOffset - 2) * 0.2);
                      const zIndex = 30 - absOffset * 6;
                      const rotateY = offset * -12;

                      return (
                        <div
                          key={key}
                          onClick={() => !isCenter && setActiveTab(key)}
                          style={{
                            position: 'absolute',
                            width: '340px',
                            maxWidth: '85vw',
                            background: '#FFFFFF',
                            borderRadius: '28px',
                            border: isCenter ? '2px solid #14A750' : '1px solid #E2E8F0',
                            boxShadow: isCenter
                              ? '0 30px 60px -15px rgba(0,0,0,0.22), 0 0 0 1px rgba(20, 167, 80, 0.2)'
                              : '0 12px 30px -10px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            cursor: isCenter ? 'default' : 'pointer',
                            transform: `translate3d(${translateX}px, 0, 0) scale(${scale}) rotateY(${rotateY}deg)`,
                            opacity: opacity,
                            zIndex: zIndex,
                            willChange: 'transform, opacity',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transition: 'transform 0.52s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.52s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.52s ease, border-color 0.35s ease',
                            userSelect: 'none',
                          }}
                        >
                          {/* Card Top: Layout Image with In-Card 3D/2D/Payment Plan Switcher */}
                          <div
                            style={{
                              background: '#F8FAFC',
                              height: '260px',
                              position: 'relative',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '46px 14px 12px',
                              borderBottom: '1px solid #F1F5F9',
                              boxSizing: 'border-box',
                            }}
                          >
                            {/* In-Card Interactive 3-Button Switcher (Only active on front card) */}
                            {isCenter && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '10px',
                                  left: '0',
                                  right: '0',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  zIndex: 20,
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div
                                  style={{
                                    display: 'inline-flex',
                                    background: 'rgba(255, 255, 255, 0.96)',
                                    backdropFilter: 'blur(8px)',
                                    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.12)',
                                    padding: '3px',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(226, 232, 240, 0.9)',
                                    gap: '2px',
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setCardView(key, '3d');
                                    }}
                                    style={{
                                      background: currentView === '3d' ? '#14A750' : 'transparent',
                                      color: currentView === '3d' ? '#FFFFFF' : '#475569',
                                      border: 'none',
                                      padding: '4px 9px',
                                      borderRadius: '16px',
                                      fontSize: '10.5px',
                                      fontWeight: '700',
                                      cursor: 'pointer',
                                      transition: 'all 0.15s',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '3px',
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    <span>🏠</span>
                                    <span>Floor Layout</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setCardView(key, '2d');
                                    }}
                                    style={{
                                      background: currentView === '2d' ? '#14A750' : 'transparent',
                                      color: currentView === '2d' ? '#FFFFFF' : '#475569',
                                      border: 'none',
                                      padding: '4px 9px',
                                      borderRadius: '16px',
                                      fontSize: '10.5px',
                                      fontWeight: '700',
                                      cursor: 'pointer',
                                      transition: 'all 0.15s',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '3px',
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    <span>📐</span>
                                    <span>2D Layout</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setCardView(key, 'payment');
                                    }}
                                    style={{
                                      background: currentView === 'payment' ? '#14A750' : 'transparent',
                                      color: currentView === 'payment' ? '#FFFFFF' : '#475569',
                                      border: 'none',
                                      padding: '4px 10px',
                                      borderRadius: '16px',
                                      fontSize: '10.5px',
                                      fontWeight: '700',
                                      cursor: 'pointer',
                                      transition: 'all 0.15s',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '3px',
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    <span>💳</span>
                                    <span>Payment Plan</span>
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Pre-rendered Layers for Instant Zero-Delay Switching */}
                            {[
                              { viewType: '3d', src: u.img3d, label: 'Floor Layout' },
                              { viewType: '2d', src: u.img2d, label: '2D Layout' },
                              { viewType: 'payment', src: u.imgPayment, label: 'Payment Plan' },
                            ].map((layer) => {
                              const isVisible = currentView === layer.viewType;
                              return (
                                <img
                                  key={layer.viewType}
                                  src={layer.src}
                                  alt={`${u.name} - ${layer.label}`}
                                  onClick={(e) => {
                                    if (!isCenter) return;
                                    e.stopPropagation();
                                    setLightboxImg({
                                      src: layer.src,
                                      title: `${u.name} (${u.size}) — ${layer.label}`,
                                    });
                                  }}
                                  style={{
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    objectFit: 'contain',
                                    display: isVisible ? 'block' : 'none',
                                    borderRadius: layer.viewType === 'payment' ? '8px' : '0',
                                    boxShadow: layer.viewType === 'payment' ? '0 4px 16px rgba(15, 23, 42, 0.12)' : 'none',
                                    cursor: isCenter ? 'zoom-in' : 'pointer',
                                  }}
                                  title={isCenter ? 'Click to enlarge and view details' : undefined}
                                />
                              );
                            })}

                            {/* Zoom hint on front card */}
                            {isCenter && (
                              <div
                                style={{
                                  position: 'absolute',
                                  bottom: '8px',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  background: 'rgba(15, 23, 42, 0.72)',
                                  backdropFilter: 'blur(4px)',
                                  color: '#FFFFFF',
                                  padding: '3px 10px',
                                  borderRadius: '12px',
                                  fontSize: '10px',
                                  fontWeight: '600',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  whiteSpace: 'nowrap',
                                  pointerEvents: 'none',
                                }}
                              >
                                <span>🔍</span>
                                <span>Click to enlarge</span>
                              </div>
                            )}
                          </div>

                          {/* Card Body (Matching Reference Card Structure) */}
                          <div style={{ padding: '22px 24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                              <h4 style={{ fontSize: '22px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
                                {u.name}
                              </h4>
                              <span style={{ fontSize: '12px', fontWeight: '700', color: '#14A750' }}>
                                {u.size}
                              </span>
                            </div>

                            {/* Subtitle / Unit Type */}
                            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span>📍</span>
                              <span>{u.rooms}</span>
                            </div>

                            {/* Description */}
                            <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5, margin: '0 0 12px 0', minHeight: '38px' }}>
                              {u.beds}
                            </p>

                            {/* Total Price */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                              <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Total Price
                              </span>
                              <span style={{ fontSize: '15px', fontWeight: '900', color: '#0F172A' }}>
                                {u.priceCrore}
                              </span>
                            </div>

                            {/* Action Buttons: Book this unit & Download PDF */}
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <a
                                href="#booking-form"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLeadForm((prev) => ({
                                    ...prev,
                                    unit: u.formValue,
                                  }));
                                  const el = document.getElementById('booking-form');
                                  if (el) {
                                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    const input = el.querySelector('input');
                                    if (input) input.focus();
                                  }
                                }}
                                style={{
                                  flex: 1,
                                  background: '#14A750',
                                  color: '#FFFFFF',
                                  padding: '11px 14px',
                                  borderRadius: '10px',
                                  fontSize: '13px',
                                  fontWeight: '700',
                                  textDecoration: 'none',
                                  textAlign: 'center',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '5px',
                                  boxShadow: '0 4px 14px rgba(20, 167, 80, 0.35)',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                }}
                              >
                                <span>Book this unit</span>
                                <span>↑</span>
                              </a>

                              <a
                                href={u.pdf}
                                download
                                style={{
                                  background: '#F8FAFC',
                                  color: '#0F172A',
                                  border: '1px solid #CBD5E1',
                                  padding: '10px 14px',
                                  borderRadius: '10px',
                                  fontSize: '12px',
                                  fontWeight: '700',
                                  textDecoration: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  whiteSpace: 'nowrap',
                                  transition: 'all 0.2s',
                                  cursor: 'pointer',
                                }}
                              >
                                <span>⬇</span>
                                <span>Download PDF</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Right Navigation Arrow */}
                    <button
                      type="button"
                      className="ke-deck-arrow-next"
                      onClick={handleNext}
                      aria-label="Next Unit"
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        color: '#0F172A',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                        zIndex: 50,
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                        e.currentTarget.style.background = '#F8FAFC';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        e.currentTarget.style.background = '#FFFFFF';
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* Lightbox Modal for Enlarge Image Details */}
        {lightboxImg && (
          <div
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '94vw',
                maxHeight: '94vh',
                background: '#FFFFFF',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 30px 70px rgba(0,0,0,0.45)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 22px',
                  borderBottom: '1px solid #E2E8F0',
                  background: '#F8FAFC',
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>
                    {lightboxImg.title}
                  </h3>
                  <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                    Press Esc or click anywhere outside to close
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxImg(null)}
                  style={{
                    background: '#E2E8F0',
                    border: 'none',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#0F172A',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#0F172A';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#E2E8F0';
                    e.currentTarget.style.color = '#0F172A';
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Modal Image View */}
              <div
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'auto',
                  maxHeight: 'calc(94vh - 70px)',
                  background: '#F1F5F9',
                }}
              >
                <img
                  src={lightboxImg.src}
                  alt={lightboxImg.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: 'calc(94vh - 105px)',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: '8px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. AMENITIES & LIFESTYLE FACILITIES (Icon Grid) */}
        <section id="amenities" style={{ background: '#F8FAFC', padding: '52px 0', borderTop: '1px solid #E2E8F0' }}>
          <div className="ke-section-container" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 32px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', margin: '0 auto 32px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: '900', color: '#0F172A', margin: 0 }}>
                World-Class Facilities &amp; Amenities
              </h2>
            </div>

            <style>{`
              .amenities-4x2-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;
              }
              @media (max-width: 900px) {
                .amenities-4x2-grid {
                  grid-template-columns: repeat(2, 1fr);
                  gap: 14px;
                }
              }
            `}</style>
            <div className="amenities-4x2-grid">
              {amenities.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '32px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: '16px',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0F172A';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 24px rgba(15, 23, 42, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.03)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: '800',
                      letterSpacing: '0.04em',
                      color: '#0F172A',
                      lineHeight: 1.35,
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. LIFE AT KARACHI ENCLAVE (VIDEO WALKTHROUGH) */}
        <section
          id="life-at-karachi-enclave"
          style={{
            background: '#FFFFFF',
            padding: '56px 0',
            borderTop: '1px solid #E2E8F0',
          }}
        >
          <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', margin: '0 auto 32px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: '900', color: '#0F172A', margin: 0 }}>
                Life at Karachi Enclave
              </h2>
            </div>

            <div
              ref={videoContainerRef}
              style={{
                maxWidth: '960px',
                margin: '0 auto',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 16px 40px -8px rgba(15, 23, 42, 0.12), 0 4px 14px rgba(15, 23, 42, 0.05)',
                border: '1px solid #E2E8F0',
                background: '#0F172A',
                aspectRatio: '16 / 9',
                position: 'relative',
              }}
            >
              {KARACHI_ENCLAVE_VIDEO_URL ? (
                <iframe
                  ref={videoIframeRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  src={getVideoEmbedUrl(KARACHI_ENCLAVE_VIDEO_URL)}
                  title="Life at Karachi Enclave"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.72)), url(/projects/karachi-enclave/front-elevation.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '50%',
                      background: '#FF0000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(255, 0, 0, 0.45), 0 0 0 10px rgba(255, 255, 255, 0.22)',
                      cursor: 'pointer',
                      transition: 'transform 0.25s ease',
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF" style={{ marginLeft: '4px' }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span
                    style={{
                      color: '#FFFFFF',
                      marginTop: '16px',
                      fontSize: '15px',
                      fontWeight: '800',
                      letterSpacing: '0.04em',
                      textShadow: '0 2px 6px rgba(0,0,0,0.6)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Video Walkthrough Coming Soon
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 7. PROJECT LOCATION & NEARBY AREAS */}
        <section id="location" style={{ background: '#F8FAFC', padding: '52px 0', borderTop: '1px solid #E2E8F0' }}>
          <div className="ke-section-container" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 32px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', margin: '0 auto 32px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: '900', color: '#0F172A', margin: 0 }}>
                Project Location
              </h2>
            </div>

            <style>{`
              .location-split-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 48px;
                align-items: center;
              }
              @media (max-width: 860px) {
                .location-split-grid {
                  grid-template-columns: 1fr;
                  gap: 32px;
                }
              }
            `}</style>

            <div className="location-split-grid">
              {/* Left Column: Google Map */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '420px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06)',
                  background: '#F1F5F9',
                }}
              >
                <iframe
                  title="Karachi Enclave Exact Location Map"
                  src="https://maps.google.com/maps?q=24.9269078,67.1390195+(KARACHI+ENCLAVE)&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <a
                  href="https://www.google.com/maps/place/KARACHI+ENCLAVE/@24.9268192,67.138564,19z/data=!4m6!3m5!1s0x3eb339001b893d8d:0xc7b2d62f23cbb5ee!8m2!3d24.9269078!4d67.1390195!16s%2Fg%2F11yymhz2fj"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: '#FFFFFF',
                    color: '#0F172A',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: '1px solid #E2E8F0',
                    zIndex: 10,
                  }}
                >
                  <span>Open in Maps</span>
                  <span>↗</span>
                </a>
              </div>

              {/* Right Column: Nearby Areas */}
              <div style={{ padding: '8px 0' }}>
                <h3
                  style={{
                    fontSize: '26px',
                    fontWeight: '800',
                    color: '#D97706',
                    margin: '0 0 8px 0',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Nearby
                </h3>
                <div
                  style={{
                    width: '42px',
                    height: '3px',
                    background: '#D97706',
                    borderRadius: '2px',
                    marginBottom: '24px',
                  }}
                />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    { name: 'Main University Road', time: '1–2 min' },
                    { name: 'Kamran Chowrangi & Commercial Hub', time: '2–3 min' },
                    { name: 'Malir Cantt Check Post No. 5', time: '3–5 min' },
                    { name: 'Darul Sehat Hospital', time: '3–5 min' },
                    { name: 'Falcon Complex & Askari V', time: '6–8 min' },
                    { name: 'Jinnah International Airport', time: '8–10 min' },
                  ].map((item, idx, arr) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 0',
                        borderBottom: idx < arr.length - 1 ? '1px solid #E2E8F0' : 'none',
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#D97706"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0 }}
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <div style={{ fontSize: '15px', color: '#1E293B' }}>
                        <span style={{ fontWeight: '600' }}>{item.name}</span>
                        <span style={{ color: '#64748B', margin: '0 6px' }}>—</span>
                        <span style={{ color: '#475569', fontWeight: '500' }}>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer c={c} />
    </>
  );
}
