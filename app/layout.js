import './globals.css';
import './services.css';
import { sql } from '@/lib/db';

export const metadata = {
  title: 'Propkads — A Complete Revenue System for Real Estate Developers',
  description:
    'We help real estate developers generate high-intent buyers, control leads through CRM, monitor sales teams, and improve conversions — end to end.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
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
