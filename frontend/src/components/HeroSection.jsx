'use client';

import React from 'react';

export default function HeroSection({ onOpenVoice }) {
  return (
    <section
      style={{
        paddingTop: '140px',
        paddingBottom: '90px',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="bg-ambient-hero"
    >
      {/* Subtle Radial Glow behind headline */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 101, 75, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '56px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Left Column: Headlines & Single Unified CTA */}
        <div>
          {/* Top Status Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 14px',
              borderRadius: '99px',
              background: 'rgba(217, 101, 75, 0.08)',
              border: '1px solid rgba(217, 101, 75, 0.22)',
              marginBottom: '28px'
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <span className="wave-bar" />
              <span className="wave-bar" />
              <span className="wave-bar" />
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#D9654B',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              24/7 AI Voice Receptionist Active
            </span>
          </div>

          {/* Main Headline (Dominant, commanding serif) */}
          <h1
            style={{
              fontSize: 'clamp(2.6rem, 5.2vw, 4.0rem)',
              lineHeight: 1.12,
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '18px',
              letterSpacing: '-0.025em'
            }}
          >
            City Dental Clinic
          </h1>

          {/* Tagline (Noticeably smaller, lighter weight for clear hierarchy) */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.02rem, 1.8vw, 1.15rem)',
              color: '#CBD5E1',
              lineHeight: 1.6,
              fontWeight: 400,
              marginBottom: '36px',
              maxWidth: '540px'
            }}
          >
            Dentistry without the hold music. Experience frictionless, patient-first care backed by instant 24/7 voice scheduling.
          </p>

          {/* Primary Action Button Row (One primary button + secondary link) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              flexWrap: 'wrap',
              marginBottom: '48px'
            }}
          >
            <button
              onClick={onOpenVoice}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                borderRadius: '12px',
                fontSize: '0.98rem',
                fontWeight: 600
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
              Talk to Maya (AI Receptionist)
            </button>

            <a
              href="#services"
              style={{
                color: '#94A3B8',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                padding: '12px 18px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94A3B8';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              Procedures &amp; Rates &rarr;
            </a>
          </div>

          {/* Quick Clinic Badges with Generous Breathing Room */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              paddingTop: '28px',
              borderTop: '1px solid rgba(255, 255, 255, 0.07)'
            }}
          >
            {/* Hours */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                  flexShrink: 0
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600, display: 'block', letterSpacing: '0.04em' }}>Clinic Hours</span>
                <span style={{ fontSize: '0.88rem', color: '#F1F5F9', fontWeight: 600, display: 'block', marginTop: '2px' }}>Mon–Sat: 9:00 AM – 6:00 PM</span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Closed Sundays</span>
              </div>
            </div>

            {/* Address */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(6, 182, 212, 0.08)',
                  border: '1px solid rgba(6, 182, 212, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#06B6D4',
                  flexShrink: 0
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600, display: 'block', letterSpacing: '0.04em' }}>Location</span>
                <span style={{ fontSize: '0.88rem', color: '#F1F5F9', fontWeight: 600, display: 'block', marginTop: '2px' }}>12 Main Boulevard</span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Dedicated Patient Parking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Purely Illustrative Chat Mockup (No Redundant Button) */}
        <div>
          <div
            className="glass-panel"
            style={{
              padding: '32px 26px',
              position: 'relative',
              borderRadius: '24px',
              background: 'rgba(11, 18, 38, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.55), 0 4px 12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Top Assistant Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '22px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.07)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #D9654B, #8B3E2C)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(217, 101, 75, 0.25)',
                    flexShrink: 0
                  }}
                >
                  M
                </div>
                <div>
                  <h4 style={{ fontSize: '0.98rem', color: '#FFFFFF', fontWeight: 600 }}>Maya</h4>
                  <p style={{ fontSize: '0.76rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '1px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                    Live Voice Receptionist
                  </p>
                </div>
              </div>

              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#94A3B8',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                Real-time Audio
              </span>
            </div>

            {/* Conversation Flow (Varied organic bubble radius) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
              <div
                style={{
                  alignSelf: 'flex-start',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '16px 16px 16px 4px',
                  padding: '12px 16px',
                  maxWidth: '88%',
                  fontSize: '0.88rem',
                  color: '#E2E8F0',
                  lineHeight: 1.5
                }}
              >
                &ldquo;Hello! Thank you for calling City Dental Clinic. How can I help you today?&rdquo;
              </div>

              <div
                style={{
                  alignSelf: 'flex-end',
                  background: 'rgba(217, 101, 75, 0.14)',
                  border: '1px solid rgba(217, 101, 75, 0.25)',
                  borderRadius: '16px 16px 4px 16px',
                  padding: '12px 16px',
                  maxWidth: '85%',
                  fontSize: '0.88rem',
                  color: '#FFFFFF',
                  lineHeight: 1.5
                }}
              >
                &ldquo;Hi Maya, I&apos;d like to schedule a teeth cleaning for Tuesday at 2 PM.&rdquo;
              </div>

              <div
                style={{
                  alignSelf: 'flex-start',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '16px 16px 16px 4px',
                  padding: '12px 16px',
                  maxWidth: '88%',
                  fontSize: '0.88rem',
                  color: '#E2E8F0',
                  lineHeight: 1.5
                }}
              >
                &ldquo;Tuesday at 2:00 PM is open! I have you down for Cleaning ($50). May I have your full name?&rdquo;
              </div>
            </div>

            {/* Purely Informational Status Footer (No redundant CTA button) */}
            <div
              style={{
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.78rem',
                color: '#94A3B8'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                Instant Calendar &amp; Sheets Sync
              </span>
              <span style={{ color: '#64748B', fontFamily: 'var(--font-mono)' }}>0.3s response</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
