import { UsersIcon, CrmDocIcon, TeamStarIcon, GrowthBarsIcon } from '@/components/Icons';

export default function SystemFlow({ c = {} }) {
  const steps = [
    {
      icon: <UsersIcon />,
      title: c.system_step_1 || 'Buyers',
      mobileTitle: 'Buyer Acquisition',
      desc: c.system_step_1_desc || 'Targeting verified high-intent property buyers through precise digital acquisition.',
    },
    {
      icon: <CrmDocIcon />,
      title: c.system_step_2 || 'CRM',
      mobileTitle: 'CRM & Lead Control',
      desc: c.system_step_2_desc || 'Capturing, nurturing, and distributing leads through structured real-time pipelines.',
    },
    {
      icon: <TeamStarIcon />,
      title: c.system_step_3 || 'Sales Team',
      mobileTitle: 'Sales Accountability',
      desc: c.system_step_3_desc || 'Connecting qualified prospects with trained sales teams to handle inquiries and visits.',
    },
    {
      icon: <GrowthBarsIcon />,
      title: c.system_step_4 || 'Closings',
      mobileTitle: 'Bookings & Closings',
      desc: c.system_step_4_desc || 'Closing high-ticket units with consistent follow-ups and streamlined booking handovers.',
    },
  ];

  return (
    <section className="section container" id="system-flow">
      <div className="process-heading-block" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 28px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className="process-heading" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '100%' }}>
          {c.system_heading_1 || 'A Complete Revenue & Sales System'}<br />
          <span className="process-heading-highlight">{c.system_heading_highlight || 'for Developers'}</span>
        </h2>
      </div>

      {/* 4 Stadium Capsules in One Line */}
      <div className="system-capsules-grid">
        {steps.map((step, idx) => (
          <div key={idx} className="system-capsule-card">
            <span
              className="system-capsule-beam"
              style={{ animationDelay: `${idx * 1.0}s` }}
            />
            <div className="system-capsule-top">
              <div className="system-capsule-icon">{step.icon}</div>
            </div>
            <h3 className="system-capsule-title">
              <span className="system-title-desktop">{step.title}</span>
              <span className="system-title-mobile">{step.mobileTitle}</span>
            </h3>
            <p className="system-capsule-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
