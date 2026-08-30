'use client';

import React from 'react';

const SERVICES = [
  {
    name: 'Routine Checkup & Digital Scan',
    price: '$30',
    tag: 'Popular',
    desc: 'Comprehensive oral examination, digital HD X-rays, cavity detection, and tailored treatment strategy.',
    duration: '30 mins'
  },
  {
    name: 'Professional Teeth Cleaning & Polish',
    price: '$50',
    tag: 'Essential',
    desc: 'Ultrasonic plaque & tartar removal, enamel stain polishing, and deep gum health treatment.',
    duration: '45 mins'
  },
  {
    name: 'Gentle Root Canal Therapy',
    price: 'Consultation',
    tag: 'Specialist',
    desc: 'Modern painless endodontic therapy designed to relieve pain and save natural infected teeth.',
    duration: '60 mins'
  },
  {
    name: 'Laser Teeth Whitening',
    price: 'Consultation',
    tag: 'Cosmetic',
    desc: 'In-office professional LED laser whitening achieving up to 6 shades brighter in a single visit.',
    duration: '45 mins'
  },
  {
    name: 'Emergency Dental Pain Relief',
    price: 'Immediate',
    tag: 'Urgent Care',
    desc: 'Same-day priority appointments for acute toothache, chipped crowns, or sudden dental trauma.',
    duration: 'Priority'
  },
  {
    name: 'Porcelain Veneers & Crowns',
    price: 'Custom',
    tag: 'Aesthetics',
    desc: 'Custom-crafted aesthetic ceramics for durable, natural-looking smile transformations.',
    duration: 'Multi-Visit'
  }
];

export default function ServicesSection({ onOpenVoice }) {
  return (
    <section
      id="services"
      style={{
        padding: '100px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 60px auto' }}>
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#D9654B',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            display: 'block',
            marginBottom: '12px'
          }}
        >
          Transparent Pricing
        </span>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
            color: '#FFFFFF',
            lineHeight: 1.2,
            marginBottom: '16px'
          }}
        >
          Comprehensive care with no surprise fees.
        </h2>
        <p style={{ fontSize: '1.02rem', color: '#94A3B8', lineHeight: 1.6 }}>
          Clear, honest rates upfront. Inquire about or book any procedure directly with Maya.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {SERVICES.map((srv, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '30px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              borderRadius: '20px',
              transition: 'all 0.2s ease'
            }}
          >
            <div>
              {/* Top Meta */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '18px'
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#CBD5E1'
                  }}
                >
                  {srv.tag}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                  {srv.duration}
                </span>
              </div>

              {/* Title & Price */}
              <h3
                style={{
                  fontSize: '1.2rem',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}
              >
                {srv.name}
              </h3>
              <div
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#D9654B',
                  fontFamily: 'var(--font-serif)',
                  marginBottom: '14px'
                }}
              >
                {srv.price}
              </div>

              <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.55 }}>
                {srv.desc}
              </p>
            </div>

            {/* Book CTA Link */}
            <button
              onClick={onOpenVoice}
              style={{
                marginTop: '24px',
                padding: '10px 16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#E2E8F0',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#D9654B';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#D9654B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.color = '#E2E8F0';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <span>Book with Maya</span>
              <span>&rarr;</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
