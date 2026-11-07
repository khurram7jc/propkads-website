import { MetaColorIcon, GoogleColorIcon, YoutubeColorIcon, LinkedInColorIcon, TiktokColorIcon, SnapchatColorIcon } from '@/components/Icons';

export default function PlatformsStrip({ c = {} }) {
  const platforms = [
    { icon: <MetaColorIcon />, label: c.platforms_1 || 'Meta Ads' },
    { icon: <GoogleColorIcon />, label: c.platforms_2 || 'Google Ads' },
    { icon: <YoutubeColorIcon />, label: c.platforms_4 || 'YouTube Ads' },
    { icon: <LinkedInColorIcon />, label: c.platforms_5 || 'LinkedIn Ads' },
    { icon: <TiktokColorIcon />, label: c.platforms_3 || 'TikTok Ads' },
    { icon: <SnapchatColorIcon />, label: c.platforms_6 || 'Snapchat Ads' },
  ];

  return (
    <section className="platforms-section">
      <div className="container">
        <div className="platforms-floating-capsule">
          <span className="platforms-capsule-beam" />

          <div className="platforms-grid-row">
            {platforms.map((p, i) => (
              <div className="platform-card" key={i}>
                <div className="platform-card-icon">{p.icon}</div>
                <span className="platform-card-name">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
