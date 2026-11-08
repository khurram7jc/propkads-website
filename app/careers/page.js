'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomSelect from '@/components/CustomSelect';
import { DEFAULT_CONTENT } from '@/data/content';

const OPEN_ROLES = [
  {
    id: 'designer',
    type: 'Full Time / Remote & On-site',
    title: 'Graphic Designer',
    fullTitle: 'Graphic Designer (Real Estate & Ad Creatives)',
    desc: 'Design high-converting ad creatives for Meta, Google & TikTok campaigns. Produce luxury brochures, floor plans, and digital sales decks.',
  },
  {
    id: '2d-animator',
    type: 'Full Time / Remote & On-site',
    title: '2D Animator',
    fullTitle: '2D Motion Designer & Animator',
    desc: 'Create dynamic 2D motion graphics, animated explainer ads, project highlight reels, and branded motion overlays for social campaigns.',
  },
  {
    id: 'video-editor',
    type: 'Full Time / Remote & On-site',
    title: 'Video Editor',
    fullTitle: 'Video Editor (Reels & Performance Ads)',
    desc: 'Edit fast-paced property reels, TikTok/Meta ad hooks, walkthrough tours, and YouTube long-form project presentations with premium pacing.',
  },
  {
    id: 'content-creator',
    type: 'Full Time / On-site & Hybrid',
    title: 'Content Creator',
    fullTitle: 'Real Estate Content Creator & Presenter',
    desc: 'Script, host, and conceptualize engaging on-camera property reviews, developer interviews, and trending social videos that drive buyer trust.',
  },
  {
    id: 'videographer',
    type: 'Full Time / On-site (Field)',
    title: 'Videographer',
    fullTitle: 'Real Estate Videographer & Drone Pilot',
    desc: 'Shoot cinematic on-site property walkthroughs, construction progress updates, 4K drone aerials, and high-production luxury project footage.',
  },
  {
    id: 'sales-executive',
    type: 'Full Time / On-site',
    title: 'Real Estate Sales Executive',
    fullTitle: 'Real Estate Sales Executive (Inquiries & Closings)',
    desc: 'Manage qualified high-intent investor leads, conduct on-site project walkthroughs, and close property bookings with developer sales partners.',
  },
];

export default function CareersPage() {
  const [c, setC] = useState(DEFAULT_CONTENT);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: 'Graphic Designer (Real Estate & Ad Creatives)',
    portfolioLink: '',
    message: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isHighlighted, setIsHighlighted] = useState(false);

  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setC((prev) => ({ ...prev, ...d.content }));
      })
      .catch(() => {});
  }, []);

  const handleApplyClick = (fullTitle) => {
    setFormData((prev) => ({ ...prev, position: fullTitle }));
    setIsHighlighted(true);
    setTimeout(() => setIsHighlighted(false), 1800);

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const input = formRef.current?.querySelector('input');
        if (input) input.focus();
      }, 300);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setError('File size must be under 8MB.');
        return;
      }
      setError('');
      setResumeFile(file);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please fill in your Name, Email, and Phone number.');
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('fullName', formData.fullName.trim());
      data.append('email', formData.email.trim());
      data.append('phone', formData.phone.trim());
      data.append('position', formData.position);
      data.append('portfolioLink', formData.portfolioLink.trim());
      data.append('message', formData.message.trim());
      if (resumeFile) {
        data.append('resume', resumeFile);
      }

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setError(json.error || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header c={c} />

      <main style={{ background: '#FAFAF8', minHeight: '100vh' }}>
        {/* Page Hero with Background Video & Brand Overlay */}
        <section className="services-hub-hero">
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

          <div className="container">
            <div className="services-hub-hero-inner">
              <h1 className="services-hub-title">
                Careers at Propkads
              </h1>
            </div>
          </div>
        </section>

        {/* Split Section: Top Header + (2x2 Cards Grid & Form Card) */}
        <section className="careers-hub-section">
          {/* Header Subtitle */}
          <div className="page-hero-subtitle-wrap">
            <p className="page-hero-subtitle">
              Join a fast-moving creative team helping top property developers launch and sell out their projects. Build a portfolio you&apos;re proud of and grow with us.
            </p>
          </div>

          {/* Main 2-Column Layout */}
          <div className="careers-main-layout">
            {/* Left Column: Open Positions Grid */}
            <div className="careers-cards-grid">
              {OPEN_ROLES.map((role, idx) => (
                <div className="career-grid-card" key={role.id}>
                  {/* Outer Stadium Capsule Animated Green Beam at Top Edge */}
                  <span
                    className="system-capsule-beam"
                    style={{ animationDelay: `${(idx % 6) * 0.45}s` }}
                  />
                  <div>
                    <div className="career-card-top-type">{role.type}</div>
                    <h3 className="career-card-role-title">{role.title}</h3>
                    <p className="career-card-desc">{role.desc}</p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                    }}
                  >
                    <div className="career-card-salary-badge" style={{ margin: 0, whiteSpace: 'nowrap', fontSize: '13px' }}>
                      Salary: <strong>40k – 60k PKR</strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleApplyClick(role.fullTitle)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '0',
                        color: '#14A750',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        whiteSpace: 'nowrap',
                        transition: 'gap 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.gap = '7px';
                        e.currentTarget.style.textDecoration = 'underline';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.gap = '4px';
                        e.currentTarget.style.textDecoration = 'none';
                      }}
                    >
                      <span>Apply Now</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Direct Application Form Card */}
            <div
              className={`career-form-card ${isHighlighted ? 'highlighted' : ''}`}
              ref={formRef}
              id="apply-form"
            >
              <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                <h3 style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.02em', margin: '0 0 6px 0', color: 'var(--ink)' }}>
                  <span style={{ color: 'var(--green)' }}>Join</span> Our Team!
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--slate)', margin: 0, lineHeight: '1.5' }}>
                  Please provide the correct information below.
                </p>
              </div>

              {submitted ? (
                <div className="career-success-card">
                  <div className="career-success-icon">✓</div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: 'var(--ink)', marginBottom: '8px' }}>
                    Application Submitted!
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--slate)', lineHeight: '1.6', marginBottom: '20px' }}>
                    Thank you, <strong>{formData.fullName}</strong>. We have received your application for <strong>{formData.position}</strong>. Our hiring team will review your profile and get in touch with you shortly.
                  </p>
                  <button
                    type="button"
                    className="career-submit-btn"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        position: 'Graphic Designer (Real Estate & Ad Creatives)',
                        portfolioLink: '',
                        message: '',
                      });
                      setResumeFile(null);
                    }}
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="career-form-fields">
                  {error && (
                    <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', fontSize: '12.5px', padding: '9px 12px', borderRadius: '8px', lineHeight: '1.4' }}>
                      {error}
                    </div>
                  )}

                  {/* Candidate Name */}
                  <input
                    type="text"
                    className="career-input-field"
                    placeholder="Your Name *"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />

                  {/* Email Address */}
                  <input
                    type="email"
                    className="career-input-field"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />

                  {/* WhatsApp / Phone */}
                  <input
                    type="tel"
                    className="career-input-field"
                    placeholder="WhatsApp / Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />

                  {/* Position Dropdown (Auto-filled on card click) */}
                  <CustomSelect
                    className="career-custom-select"
                    options={[
                      ...OPEN_ROLES.map((r) => ({ value: r.fullTitle, label: r.title })),
                      { value: 'General Application / Other Role', label: 'Other / General Application' },
                    ]}
                    value={formData.position}
                    onChange={(val) => setFormData({ ...formData, position: val })}
                    placeholder="Select Target Position *"
                  />

                  {/* Portfolio / CV Link */}
                  <input
                    type="url"
                    className="career-input-field"
                    placeholder="Portfolio / CV Link (Drive, Behance, LinkedIn)"
                    value={formData.portfolioLink}
                    onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                  />

                  {/* File Upload Attachment Box */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />

                  <div
                    className="career-file-dropzone"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload Resume (PDF or Word)"
                  >
                    {resumeFile ? (
                      <>
                        <div className="career-file-info">
                          <span>📄</span>
                          <span style={{ fontWeight: '600', maxWidth: '200px' }}>{resumeFile.name}</span>
                          <span style={{ color: '#94A3B8', fontSize: '11.5px' }}>
                            ({(resumeFile.size / 1024).toFixed(0)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          className="career-file-remove"
                          onClick={handleRemoveFile}
                        >
                          ✕ Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="career-file-info">
                          <span style={{ fontSize: '15px' }}>📎</span>
                          <span>Upload Resume / CV (PDF, DOCX)</span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--green)', textTransform: 'uppercase' }}>
                          Browse
                        </span>
                      </>
                    )}
                  </div>

                  {/* Message / Brief Intro */}
                  <textarea
                    rows={3}
                    className="career-input-field"
                    placeholder="Enter your message or brief intro..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ resize: 'vertical' }}
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="career-submit-btn"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting Application...' : 'Send Application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer c={c} />
    </>
  );
}
