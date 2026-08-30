'use client';

import React from 'react';

export default function HeroSection({ onOpenVoice }) {
  return (
    <section
      style={{
        paddingTop: '160px',
        paddingBottom: '120px',
        position: 'relative',
        background: 'var(--bg-deep)',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      {/* Soft, blurred radial glow positioned behind the headline only */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '540px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(212, 103, 76, 0.07) 0%, rgba(212, 103, 76, 0.02) 45%, transparent 75%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Subtle abstract ambient grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.35,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Whisper-quiet status line (Minimal, no thick border box) */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.04em',
            marginBottom: '32px'
          }}
        >
          <span className="micro-dot" />
          <span>MAYA 2.0 &bull; 24/7 VOICE CONCIERGE</span>
        </div>

        {/* Dominant Editorial Serif H1 (Midday scale) */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.2rem, 7.5vw, 6.0rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#FFFFFF',
            letterSpacing: '-0.035em',
            marginBottom: '28px',
            maxWidth: '900px'
          }}
        >
          Dentistry without the hold music.
        </h1>

        {/* Refined, constrained subtext */}
        <p
          style={{
            fontSize: 'clamp(1.02rem, 1.8vw, 1.15rem)',
            color: 'var(--text-body)',
            lineHeight: 1.65,
            fontWeight: 400,
            maxWidth: '580px',
            margin: '0 auto 40px auto'
          }}
        >
          City Dental Clinic pairs world-class clinical craft with an intelligent voice receptionist that books appointments in real-time.
        </p>

        {/* Single Refined Hero CTA Button (Matte terracotta, understated) */}
        <button
          onClick={onOpenVoice}
          className="btn-matte"
          style={{
            padding: '14px 34px',
            fontSize: '0.96rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
          </svg>
          <span>Speak to Maya</span>
        </button>

        {/* Minimal Footer-Style Horizontal Info Row (Generous breathing room, zero card borders) */}
        <div
          style={{
            marginTop: '110px',
            paddingTop: '36px',
            borderTop: '1px solid var(--border-hairline)',
            width: '100%',
            maxWidth: '720px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '48px',
            flexWrap: 'wrap',
            color: 'var(--text-muted)',
            fontSize: '0.84rem'
          }}
        >
          {/* Hours */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>Mon–Sat: 9:00 AM – 6:00 PM</span>
          </div>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>12 Main Boulevard (Free Parking)</span>
          </div>

          {/* Emergency note */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-emerald)' }} />
            <span>24/7 Live Voice Scheduling</span>
          </div>
        </div>
      </div>
    </section>
  );
}
