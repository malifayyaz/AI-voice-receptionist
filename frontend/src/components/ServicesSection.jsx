'use client';

import React from 'react';

const PROCEDURES = [
  {
    name: 'Routine Consultation & HD Digital Scan',
    price: '$30',
    category: 'Preventative',
    desc: 'Comprehensive oral examination, high-definition digital X-rays, cavity detection, and periodontal health assessment.',
    duration: '30 min'
  },
  {
    name: 'Ultrasonic Teeth Cleaning & Polish',
    price: '$50',
    category: 'Hygiene',
    desc: 'Gentle ultrasonic plaque and calculus debridement, surface stain polishing, and remineralizing fluoride application.',
    duration: '45 min'
  },
  {
    name: 'Endodontic Root Canal Therapy',
    price: 'From $180',
    category: 'Specialist',
    desc: 'Microscope-assisted root canal disinfection and bioceramic sealing to alleviate pain and preserve natural teeth.',
    duration: '60 min'
  },
  {
    name: 'In-Office Laser Teeth Whitening',
    price: '$120',
    category: 'Cosmetics',
    desc: 'Professional LED-activated whitening treatment achieving up to 6 shades brighter in a single 45-minute visit.',
    duration: '45 min'
  },
  {
    name: 'Emergency Dental Pain & Trauma Care',
    price: 'Priority',
    category: 'Urgent Care',
    desc: 'Immediate same-day triage and relief for acute toothache, crown fractures, abscesses, or facial impact trauma.',
    duration: 'Immediate'
  },
  {
    name: 'Custom Ceramic Veneers & Crowns',
    price: 'Custom',
    category: 'Restorative',
    desc: 'Precision CAD/CAM aesthetic restorations handcrafted for seamless, natural smile aesthetics and longevity.',
    duration: 'Multi-Visit'
  }
];

export default function ServicesSection({ onOpenVoice }) {
  return (
    <section
      id="procedures"
      style={{
        padding: '120px 24px',
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '64px' }}>
        <span
          style={{
            fontSize: '0.76rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px'
          }}
        >
          TRANSPARENT SCHEDULE OF FEES
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              lineHeight: 1.15
            }}
          >
            Procedures &amp; Rates
          </h2>
          <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>
            No hidden costs. Inquire or book any procedure with Maya.
          </p>
        </div>
      </div>

      {/* Editorial Minimalist List (Ramp / Midday Style) */}
      <div style={{ borderTop: '1px solid var(--border-hairline)' }}>
        {PROCEDURES.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: '28px 0',
              borderBottom: '1px solid var(--border-hairline)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              alignItems: 'baseline',
              transition: 'background-color 0.15s ease'
            }}
          >
            {/* Left: Procedure Name & Category */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 500, letterSpacing: '-0.01em' }}>
                  {item.name}
                </h3>
              </div>
              <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', lineHeight: 1.6, maxWidth: '440px' }}>
                {item.desc}
              </p>
            </div>

            {/* Right: Duration, Price & Action */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '36px',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {item.duration}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  fontWeight: 400,
                  color: 'var(--accent-terracotta)',
                  minWidth: '90px',
                  textAlign: 'right'
                }}
              >
                {item.price}
              </span>
              <button
                onClick={onOpenVoice}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '99px',
                  padding: '6px 14px',
                  color: '#CBD5E1',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--text-pure)';
                  e.currentTarget.style.color = 'var(--text-pure)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.color = '#CBD5E1';
                }}
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
