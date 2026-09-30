import { SERVICES_DATA } from '@/data/services';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const service = SERVICES_DATA.find(
    (s) => s.slug === slug || (slug === 'whatsapp-api-sms-automation' && s.slug === 'whatsapp-api-msgs-automation')
  );

  if (!service) {
    return {
      title: 'Real Estate Service | Propkads',
      description: 'Specialized real estate marketing, creative, and CRM solutions for developers.',
    };
  }

  return {
    title: `${service.title} — Real Estate Solutions`,
    description: `${service.shortDesc} Specially engineered for housing societies, commercial plazas, and real estate developers.`,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Propkads Real Estate Services`,
      description: service.shortDesc,
      url: `https://propkads.com/services/${service.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Propkads`,
      description: service.shortDesc,
    },
  };
}

export default function ServiceDetailLayout({ children, params }) {
  const { slug } = params;
  const service = SERVICES_DATA.find(
    (s) => s.slug === slug || (slug === 'whatsapp-api-sms-automation' && s.slug === 'whatsapp-api-msgs-automation')
  );

  const breadcrumbSchema = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://propkads.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: 'https://propkads.com/services',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.title,
            item: `https://propkads.com/services/${service.slug}`,
          },
        ],
      }
    : null;

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {children}
    </>
  );
}
