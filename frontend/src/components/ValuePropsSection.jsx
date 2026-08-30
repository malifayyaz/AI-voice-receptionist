'use client';

import React from 'react';

const VALUE_PROPS = [
  {
    id: 1,
    title: 'Zero Hold Music, Zero Waiting',
    description: 'Never listen to canned hold elevator music again. Speak naturally to Maya and check open slots in under 3 seconds.',
    accent: '#FF6559',
    badge: 'Instant Pick-Up',
    // Custom Handcrafted SVG Icon
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    description: 'Need to book at 11 PM or Sunday morning? Our AI receptionist operates 24/7 with zero downtime and multi-model fallback redundancy.',
    accent: '#10B981',
    badge: 'Always Available',
    // Custom SVG Clock/Calendar Icon
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    title: 'Instant Database & Sheets Sync',
    description: 'Every confirmed appointment is immediately written to our local clinic database and synchronized live to Google Sheets for doctor staff.',
    accent: '#06B6D4',
    badge: 'Live Auto-Sync',
    // Custom SVG Cloud Sync Icon
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        padding: '100px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 64px auto' }}>
        <span
          style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#10B981',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            display: 'block',
            marginBottom: '12px'
          }}
        >
          The City Dental Difference
        </span>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            color: '#FFFFFF',
            lineHeight: 1.2,
            marginBottom: '16px'
          }}
        >
          Care designed around your schedule, not our office hours.
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#94A3B8', lineHeight: 1.6 }}>
          We replaced sluggish telephone queues with conversational voice AI that understands your schedule and confirms bookings in seconds.
        </p>
      </div>

      {/* 3 Value Prop Cards */}
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
              padding: '36px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease'
            }}
          >
            <div>
              {/* Top Row: Icon & Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '26px'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${prop.accent}20, ${prop.accent}05)`,
                    border: `1px solid ${prop.accent}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: prop.accent
                  }}
                >
                  {prop.icon}
                </div>

                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: prop.accent,
                    background: `${prop.accent}15`,
                    padding: '4px 12px',
                    borderRadius: '99px',
                    border: `1px solid ${prop.accent}30`
                  }}
                >
                  {prop.badge}
                </span>
              </div>

              {/* Title & Description */}
              <h3
                style={{
                  fontSize: '1.35rem',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  marginBottom: '12px',
                  lineHeight: 1.3
                }}
              >
                {prop.title}
              </h3>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#94A3B8',
                  lineHeight: 1.6
                }}
              >
                {prop.description}
              </p>
            </div>

            {/* Bottom Subtle Indicator */}
            <div
              style={{
                marginTop: '28px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#64748B',
                fontSize: '0.82rem'
              }}
            >
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: prop.accent }} />
              Active in City Dental Clinic
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
