import { MetaColorIcon, GoogleColorIcon, YoutubeColorIcon, LinkedInColorIcon, TiktokColorIcon, SnapchatColorIcon } from '@/components/Icons';

export default function PlatformsStrip({ c }) {
  const platforms = [
    { icon: <MetaColorIcon />, label: c.platforms_1 || 'Meta Ads' },
    { icon: <GoogleColorIcon />, label: c.platforms_2 || 'Google Ads' },
    { icon: <YoutubeColorIcon />, label: c.platforms_4 || 'YouTube Ads' },
    { icon: <LinkedInColorIcon />, label: c.platforms_5 || 'LinkedIn Ads' },
    { icon: <TiktokColorIcon />, label: c.platforms_3 || 'TikTok Ads' },
    { icon: <SnapchatColorIcon />, label: c.platforms_6 || 'Snapchat Ads' },
  ];

  return (
    <section className="platforms-section reveal">
      <div className="container">
        <div className="platforms-heading-block">
          <div className="platforms-eyebrow">
            <span className="platforms-eyebrow-line"></span>
            {c.platforms_label || 'Platforms We Advertise On'}
            <span className="platforms-eyebrow-line"></span>
          </div>
          <h2 className="platforms-heading">
            {c.platforms_heading_1 || 'We run high-performing ads across'}{' '}
            <span className="platforms-heading-highlight">{c.platforms_heading_highlight || 'all major platforms'}</span>
          </h2>
          <p className="platforms-intro">
            {c.platforms_intro || 'From awareness to conversions, we help real estate brands reach the right audience, on the right platform.'}
          </p>
        </div>

        <div className="platforms-panel">
          {platforms.map((p, i) => (
            <div className="platforms-panel-item" key={i}>
              <span className="platforms-panel-icon">{p.icon}</span>
              <span className="platforms-panel-label">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
