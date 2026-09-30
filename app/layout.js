import './globals.css';
import './services.css';
import { sql } from '@/lib/db';

export const metadata = {
  metadataBase: new URL('https://propkads.com'),
  title: {
    default: 'Propkads — A Complete Revenue System for Real Estate Developers',
    template: '%s | Propkads',
  },
  description:
    'We help real estate developers generate high-intent buyers, control leads through CRM, monitor sales teams, and improve conversions — end to end.',
  keywords: [
    'real estate marketing pakistan',
    'real estate crm pakistan',
    'property lead generation',
    'housing society marketing',
    'real estate sales system',
    'property developer marketing karachi lahore islamabad',
    '3d architectural walkthroughs pakistan',
    'whatsapp business api real estate',
    'real estate inventory closing system',
  ],
  authors: [{ name: 'Propkads', url: 'https://propkads.com' }],
  creator: 'Propkads',
  publisher: 'Propkads',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://propkads.com',
    siteName: 'Propkads',
    title: 'Propkads — A Complete Revenue System for Real Estate Developers',
    description:
      'We help real estate developers generate high-intent buyers, control leads through CRM, monitor sales teams, and improve conversions — end to end.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Propkads Real Estate Revenue Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Propkads — A Complete Revenue System for Real Estate Developers',
    description:
      'We help real estate developers generate high-intent buyers, control leads through CRM, monitor sales teams, and improve conversions — end to end.',
    images: ['/og-image.png'],
    creator: '@propkads',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Propkads',
  url: 'https://propkads.com',
  logo: 'https://propkads.com/logo.png',
  description:
    'A complete sales and revenue system for real estate developers: performance marketing, proprietary sales CRM, and sales floor closing operations.',
  telephone: '+92-333-3401101',
  email: 'contact@propkads.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Karachi',
    addressRegion: 'Sindh',
    addressCountry: 'PK',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '24.8607',
    longitude: '67.0011',
  },
  sameAs: [
    'https://www.facebook.com/Propkads/',
    'https://www.instagram.com/propkads/',
    'https://www.linkedin.com/company/propkads/',
    'https://www.youtube.com/@Propkads',
    'https://www.tiktok.com/@propkads',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Propkads',
  url: 'https://propkads.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://propkads.com/services?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

async function getGaId() {
  try {
    const rows = await sql`select value from site_content where key = 'google_analytics_id'`;
    return rows[0]?.value?.trim() || '';
  } catch {
    return '';
  }
}

export default async function RootLayout({ children }) {
  const gaId = await getGaId();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
