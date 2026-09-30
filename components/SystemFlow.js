import Link from 'next/link';
import { UsersIcon, CrmDocIcon, TeamStarIcon, GrowthBarsIcon, CurvedArrowIcon } from '@/components/Icons';

export default function SystemFlow({ c, buttonHref = '/contact', buttonText = 'Get a Free Project Review →' }) {
  const steps = [
    { icon: <UsersIcon />, title: c.system_step_1 || 'Buyers', desc: c.system_step_1_desc || 'We target the right audience of property buyers through precise digital marketing and smart targeting.' },
    { icon: <CrmDocIcon />, title: c.system_step_2 || 'CRM', desc: c.system_step_2_desc || 'We capture, nurture and manage leads through a powerful CRM system for better follow-ups and higher conversions.' },
    { icon: <TeamStarIcon />, title: c.system_step_3 || 'Sales Team', desc: c.system_step_3_desc || 'Our experienced sales team connects with qualified leads, handles inquiries and moves prospects towards booking and sales.' },
    { icon: <GrowthBarsIcon />, title: c.system_step_4 || 'Closings', desc: c.system_step_4_desc || 'We help you close more deals with consistent follow-ups, professional support and a streamlined process from inquiry to handover.' },
  ];

  return (
    <section className="section container" id="system-flow">
      <div className="process-heading-block" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 28px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="platforms-eyebrow" style={{ margin: '0 auto 14px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="platforms-eyebrow-line"></span>
          {c.system_eyebrow || 'Our Process'}
          <span className="platforms-eyebrow-line"></span>
        </div>
        <h2 className="process-heading" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '100%' }}>
          {c.system_heading_1 || 'A Complete Revenue & Sales System'}<br />
          <span className="process-heading-highlight">{c.system_heading_highlight || 'for Developers'}</span>
        </h2>
        <p className="process-intro" style={{ textAlign: 'center', margin: '14px auto 0 auto', maxWidth: '600px' }}>
          {c.system_intro || 'We combine strategy, technology and execution to help real estate developers generate quality leads and close more deals.'}
        </p>
      </div>

      <div className="process-row">
        {steps.map((step, i) => (
          <div className="process-item" key={i}>
            <div className="process-card">
              <div className="process-icon-badge">{step.icon}</div>
              <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="process-title">{step.title}</h3>
              <span className="process-accent"></span>
              <p className="process-desc">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="process-arrow">
                <CurvedArrowIcon />
                <span className="process-arrow-mobile"></span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="process-bottom-stat">
        <span className="process-bottom-line"></span>
        <span className="process-bottom-check">✓</span>
        <span className="process-bottom-text">
          {c.system_bottom_stat_1 || 'More Leads'} / {c.system_bottom_stat_2 || 'Better Follow-ups'} / {c.system_bottom_stat_3 || 'Higher Sales'}
        </span>
        <span className="process-bottom-line"></span>
      </div>

      <div style={{ textAlign: 'center', marginTop: '28px' }}>
        <Link href={buttonHref} className="btn btn-solid">
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
