'use client';

import React from 'react';

const VALUE_PROPS = [
  {
    id: 1,
    title: 'Zero Hold Music, Zero Waiting',
    description: 'Never listen to canned elevator hold music again. Speak naturally to Maya and check open slots in under 3 seconds.',
    accent: '#D9654B',
    badge: 'Instant Pick-Up',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        <path d="M14 2v4"/>
        <path d="M18 2v4"/>
        <path d="M14 6h4"/>
      </svg>
    )
  },
  {
    id: 2,
    title: '24/7 Intelligent Booking',
    description: 'Need to schedule late at night or over the weekend? Maya operates 24/7 with zero downtime and multi-model fallback redundancy.',
    accent: '#10B981',
    badge: 'Always Open',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
        <line x1="16" x2="16" y1="2" y2="6"/>
        <line x1="8" x2="8" y1="2" y2="6"/>
        <line x1="3" x2="21" y1="10" y2="10"/>
        <path d="m9 16 2 2 4-4"/>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Live Google Sheets & Calendar Sync',
    description: 'Every confirmed booking writes immediately to our clinic database and synchronizes directly to Google Sheets for our medical team.',
    accent: '#06B6D4',
    badge: 'Real-Time Sync',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
        <path d="m12 12-3 3h6l-3-3z"/>
        <path d="M12 15v7"/>
      </svg>
    )
  }
];

export default function ValuePropsSection() {
  return (
    <section
      id="experience"
      style={{
        padding: '90px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 60px auto' }}>
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#10B981',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            display: 'block',
            marginBottom: '12px'
          }}
        >
          Modern Patient Experience
        </span>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
            color: '#FFFFFF',
            lineHeight: 1.2,
            marginBottom: '16px'
          }}
        >
          High-touch clinical excellence meets effortless voice booking.
        </h2>
        <p style={{ fontSize: '1.02rem', color: '#94A3B8', lineHeight: 1.6 }}>
          Designed from the ground up to respect your time, eliminate waiting, and make scheduling as easy as a friendly conversation.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px'
        }}
      >
        {VALUE_PROPS.map((prop) => (
          <div
            key={prop.id}
            className="glass-panel"
            style={{
              padding: '36px 28px',
              position: 'relative',
              borderRadius: '20px',
              transition: 'all 0.2s ease'
            }}
          >
            {/* Top Badge & Icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '22px'
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: `rgba(${prop.accent === '#D9654B' ? '217, 101, 75' : prop.accent === '#10B981' ? '16, 185, 129' : '6, 182, 212'}, 0.1)`,
                  border: `1px solid rgba(${prop.accent === '#D9654B' ? '217, 101, 75' : prop.accent === '#10B981' ? '16, 185, 129' : '6, 182, 212'}, 0.22)`,
                  color: prop.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {prop.icon}
              </div>

              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#94A3B8'
                }}
              >
                {prop.badge}
              </span>
            </div>

            <h3
              style={{
                fontSize: '1.25rem',
                color: '#FFFFFF',
                fontWeight: 600,
                marginBottom: '12px',
                lineHeight: 1.3
              }}
            >
              {prop.title}
            </h3>

            <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.6 }}>
              {prop.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
