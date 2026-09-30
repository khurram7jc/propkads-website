export default function ServiceIcon({ name, className = '', size = 24 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className
  };

  switch (name) {
    case 'palette':
      return (
        <svg {...props}>
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
        </svg>
      );
    case 'cube':
      return (
        <svg {...props}>
          <path d="m21.12 6.4-6-3.4a2 2 0 0 0-2 0l-6 3.4a2 2 0 0 0-1 1.7v7.8a2 2 0 0 0 1 1.7l6 3.4a2 2 0 0 0 2 0l6-3.4a2 2 0 0 0 1-1.7V8.1a2 2 0 0 0-1-1.7z"></path>
          <path d="m3.3 7 8.7 5 8.7-5"></path>
          <path d="M12 22V12"></path>
        </svg>
      );
    case 'video':
      return (
        <svg {...props}>
          <path d="m22 8-6 4 6 4V8Z"></path>
          <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
        </svg>
      );
    case 'drone':
      return (
        <svg {...props}>
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
          <path d="M10 10l-4 -4"></path>
          <path d="M14 10l4 -4"></path>
          <path d="M10 14l-4 4"></path>
          <path d="M14 14l4 4"></path>
          <circle cx="5" cy="5" r="2"></circle>
          <circle cx="19" cy="5" r="2"></circle>
          <circle cx="5" cy="19" r="2"></circle>
          <circle cx="19" cy="19" r="2"></circle>
        </svg>
      );
    case 'eye':
      return (
        <svg {...props}>
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      );
    case 'share2':
      return (
        <svg {...props}>
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      );
    case 'target':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      );
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      );
    case 'messageCircle':
      return (
        <svg {...props}>
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
        </svg>
      );
    case 'code':
      return (
        <svg {...props}>
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      );
    case 'zap':
      return (
        <svg {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      );
    case 'layout':
    default:
      return (
        <svg {...props}>
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      );
  }
}
