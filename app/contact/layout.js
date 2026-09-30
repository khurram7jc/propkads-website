export const metadata = {
  title: 'Contact Us — Request a Free Real Estate Project Review',
  description:
    'Schedule a confidential project audit with Propkads. Call +92 333 3401101, email contact@propkads.com, or submit your project details for custom marketing & CRM proposals.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Propkads — Free Real Estate Project Review',
    description:
      'Connect with our real estate growth consultants to discuss your residential or commercial project inventory.',
    url: 'https://propkads.com/contact',
    type: 'website',
  },
};

export default function ContactLayout({ children }) {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Propkads',
    url: 'https://propkads.com/contact',
    description: 'Get a free project review for your residential or commercial real estate development.',
    mainEntity: {
      '@type': 'RealEstateAgent',
      name: 'Propkads',
      telephone: '+92-333-3401101',
      email: 'contact@propkads.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </>
  );
}
