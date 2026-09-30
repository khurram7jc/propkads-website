'use client';

import Link from 'next/link';
import { SERVICES_DATA } from '@/data/services';
import ServiceIcon from './ServiceIcons';

export default function Services({ c = {} }) {
  return (
    <section className="section container" id="services">
      {/* Centered Section Header */}
      <div className="services-section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 28px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="section-tag" style={{ margin: '0 auto 12px auto', display: 'inline-block', textAlign: 'center' }}>
          {c?.services_eyebrow || 'Complete Real Estate Solutions'}
        </div>
        <h2 className="services-main-title" style={{ textAlign: 'center', margin: '0 auto 14px auto', maxWidth: '100%' }}>
          {c?.services_heading || '360° Real Estate Creative, Digital Marketing & Tech Services'}
        </h2>
        <p className="section-intro" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '660px' }}>
          {c?.services_intro ||
            'Everything your real estate development or agency needs to capture serious buyers, present projects with luxury prestige, and scale verified sales.'}
        </p>
      </div>

      {/* Compact Interactive Services Directory Grid */}
      <div className="services-compact-grid">
        {SERVICES_DATA.map((service) => {
          const href = service.id === 'propkads-real-estate-sales-crm' ? '/crm' : `/services/${service.slug}`;
          return (
            <Link key={service.id} href={href} className="service-compact-item">
              <div className="service-compact-icon">
                <ServiceIcon name={service.icon} size={20} />
              </div>
              <div className="service-compact-info">
                <span className="service-compact-title">{service.title}</span>
                <span className="service-compact-cat">{service.categoryName}</span>
              </div>
              <span className="service-compact-arrow">→</span>
            </Link>
          );
        })}
      </div>

      {/* Services Hub Link Bar */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link href="/services" className="btn btn-outline" style={{ background: '#fff' }}>
          Explore Full Services Hub &amp; Detailed Deliverables →
        </Link>
      </div>
    </section>
  );
}
