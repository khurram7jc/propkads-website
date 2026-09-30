'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SERVICES_DATA, SERVICE_CATEGORIES } from '@/data/services';
import ServiceIcon from './ServiceIcons';

export default function Services({ c = {} }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  return (
    <section className="section container" id="services">
      <div className="services-section-header">
        <div className="section-tag">{c?.services_eyebrow || 'Complete Real Estate Solutions'}</div>
        <h2 className="services-main-title">
          {c?.services_heading || '360° Real Estate Creative, Digital Marketing & Tech Services'}
        </h2>
        <p className="section-intro">
          {c?.services_intro ||
            'Everything your real estate development or agency needs to capture serious buyers, present projects with luxury prestige, and scale verified sales.'}
        </p>

        {/* Filter Category Tabs */}
        <div className="services-filter-tabs">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`services-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.label}</span>
              <span className="services-tab-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Services Bento Grid */}
      <div className="services-showcase-grid">
        {filteredServices.map((service) => (
          <div className="service-showcase-card" key={service.id}>
            <div className="service-card-top">
              <div className="service-icon-box">
                <ServiceIcon name={service.icon} size={24} />
              </div>
              <span className="service-category-pill">{service.badge}</span>
            </div>

            <h3 className="service-card-title">{service.title}</h3>
            <p className="service-card-desc">{service.shortDesc}</p>

            <div className="service-deliverables-list">
              <span className="service-deliverables-heading">Key Deliverables:</span>
              <ul>
                {service.deliverables.slice(0, 3).map((item, idx) => (
                  <li key={idx}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-impact-badge">
              <span className="impact-dot"></span>
              <span>{service.impact}</span>
            </div>

            <div className="service-card-footer">
              <Link
                href={service.id === 'propkads-real-estate-sales-crm' ? '/crm' : `/services/${service.slug}`}
                className="service-card-btn"
              >
                <span>Explore Service Details</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Services Hub Link Bar */}
      <div className="services-hub-banner">
        <div>
          <h4>Looking for an All-In-One Revenue Partnership?</h4>
          <p>We combine 3D visuals, performance ad funnels, and our proprietary CRM into a single turnkey engagement.</p>
        </div>
        <div className="services-hub-actions">
          <Link href="/services" className="btn btn-outline" style={{ background: '#fff' }}>
            Browse Full Services Hub →
          </Link>
          <a href="#contact" className="btn btn-solid">
            Get Project Audit
          </a>
        </div>
      </div>
    </section>
  );
}
