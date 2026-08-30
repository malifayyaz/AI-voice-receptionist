'use client';

import React from 'react';
import AmbientCanvasBackground from './AmbientCanvasBackground';

export default function HeroSection({ onOpenVoice }) {
  return (
    <section
      style={{
        paddingTop: '165px',
        paddingBottom: '120px',
        position: 'relative',
        background: 'var(--bg-deep)',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      {/* 3D / Fluid Ambient Canvas Animation Layer */}
      <AmbientCanvasBackground />

      {/* Soft, blurred radial amber glow directly behind headline */}
      <div
        style={{
          position: 'absolute',
          top: '32%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '580px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(212, 103, 76, 0.12) 0%, rgba(212, 103, 76, 0.03) 55%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Lightened, targeted text-contrast overlay (lets the wave motion show through clearly) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 38%, rgba(7, 7, 9, 0.45) 0%, rgba(7, 7, 9, 0.1) 60%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Whisper-quiet status line */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.04em',
            marginBottom: '32px',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}
        >
          <span className="micro-dot" />
          <span>MAYA 2.0 &bull; 24/7 VOICE CONCIERGE</span>
        </div>

        {/* Dominant Editorial Serif H1 (with subtle crisp text-shadow) */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.2rem, 7.5vw, 6.0rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#FFFFFF',
            letterSpacing: '-0.035em',
            marginBottom: '28px',
            maxWidth: '900px',
            textShadow: '0 4px 28px rgba(0, 0, 0, 0.75)'
          }}
        >
          Dentistry without the hold music.
        </h1>

        {/* Refined subtext */}
        <p
          style={{
            fontSize: 'clamp(1.02rem, 1.8vw, 1.15rem)',
            color: '#A0A6B2',
            lineHeight: 1.65,
            fontWeight: 400,
            maxWidth: '580px',
            margin: '0 auto 40px auto',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.8)'
          }}
        >
          City Dental Clinic pairs world-class clinical craft with an intelligent voice receptionist that books appointments in real-time.
        </p>

        {/* Single Refined Hero CTA Button (Matte terracotta pill) */}
        <button
          onClick={onOpenVoice}
          className="btn-matte"
          style={{
            padding: '14px 34px',
            fontSize: '0.96rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
          </svg>
          <span>Speak to Maya</span>
        </button>

        {/* Minimal Horizontal Info Row */}
        <div
          style={{
            marginTop: '110px',
            paddingTop: '36px',
            borderTop: '1px solid var(--border-hairline)',
            width: '100%',
            maxWidth: '740px',
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

          {/* Availability */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-emerald)' }} />
            <span>24/7 Voice Scheduling</span>
          </div>
        </div>
      </div>
    </section>
  );
}
