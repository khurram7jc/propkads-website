import { FacebookIcon, GoogleIcon, TiktokIcon, YoutubeIcon, LinkedInIcon, SnapchatIcon } from '@/components/Icons';

export default function PlatformsStrip({ c }) {
  const platforms = [
    { icon: <FacebookIcon />, label: c.platforms_1 || 'Meta Ads' },
    { icon: <GoogleIcon />, label: c.platforms_2 || 'Google Ads' },
    { icon: <TiktokIcon />, label: c.platforms_3 || 'TikTok Ads' },
    { icon: <YoutubeIcon />, label: c.platforms_4 || 'YouTube Ads' },
    { icon: <LinkedInIcon />, label: c.platforms_5 || 'LinkedIn Ads' },
    { icon: <SnapchatIcon />, label: c.platforms_6 || 'Snapchat Ads' },
  ];

  return (
    <div className="platforms-strip">
      <div className="platforms-strip-inner">
        <span className="platforms-strip-label">{c.platforms_label || 'Platforms We Advertise On'}</span>
        <div className="platforms-strip-list">
          {platforms.map((p, i) => (
            <span className="platforms-strip-item" key={i}>
              <span className="platforms-strip-icon">{p.icon}</span>
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
