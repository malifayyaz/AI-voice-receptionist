'use client';

import React from 'react';

const PILLARS = [
  {
    number: '01',
    title: 'Zero Hold Time',
    text: 'Every patient call is answered on the very first ring. No complex phone trees, elevator music, or voicemails.'
  },
  {
    number: '02',
    title: 'Live Medical Synchronization',
    text: 'Maya references real-time chair availability across our operatories and instantly writes confirmed visits to Google Sheets.'
  },
  {
    number: '03',
    title: '24/7 Continuous Availability',
    text: 'Schedule examinations at midnight, over the weekend, or during peak hours with redundant multi-model intelligence.'
  }
];

export default function ValuePropsSection() {
  return (
    <section
      id="experience"
      style={{
        padding: '100px 24px',
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      <div style={{ marginBottom: '56px' }}>
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
          THE CLINICAL STANDARD
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 400,
            color: '#FFFFFF',
            lineHeight: 1.15
          }}
        >
          Crafted for modern patient expectations.
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          borderTop: '1px solid var(--border-hairline)',
          paddingTop: '40px'
        }}
      >
        {PILLARS.map((pillar, idx) => (
          <div key={idx}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                color: 'var(--accent-terracotta)',
                display: 'block',
                marginBottom: '16px'
              }}
            >
              {pillar.number}
            </span>
            <h3
              style={{
                fontSize: '1.2rem',
                fontWeight: 500,
                color: '#FFFFFF',
                marginBottom: '12px',
                letterSpacing: '-0.015em'
              }}
            >
              {pillar.title}
            </h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              {pillar.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
