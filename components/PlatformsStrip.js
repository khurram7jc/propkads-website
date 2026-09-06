export default function PlatformsStrip({ c }) {
  const platforms = [
    c.platforms_1 || 'Meta Ads',
    c.platforms_2 || 'Google Ads',
    c.platforms_3 || 'TikTok Ads',
    c.platforms_4 || 'YouTube Ads',
    c.platforms_5 || 'LinkedIn Ads',
    c.platforms_6 || 'Snapchat Ads',
  ];

  return (
    <div className="platforms-strip">
      <div className="platforms-strip-inner">
        <span className="platforms-strip-label">{c.platforms_label || 'Platforms We Advertise On'}</span>
        <div className="platforms-strip-list">
          {platforms.map((p, i) => (
            <span className="platforms-strip-item" key={i}>{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
