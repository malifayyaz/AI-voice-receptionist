'use client';

import React, { useState } from 'react';

const TAGLINES = [
  {
    id: 1,
    label: 'Option 1: Modern & Frictionless',
    text: 'Dentistry without the hold music. Experience frictionless care.'
  },
  {
    id: 2,
    label: 'Option 2: Intelligent & Fast',
    text: 'Modern dental care, booked in seconds with intelligent voice assistance.'
  },
  {
    id: 3,
    label: 'Option 3: Precision & Hospitality',
    text: 'Where precision dental craft meets immediate, 24/7 hospitality.'
  }
];

export default function HeroSection({ onOpenVoice }) {
  const [activeTaglineIndex, setActiveTaglineIndex] = useState(0);

  return (
    <section
      style={{
        paddingTop: '130px',
        paddingBottom: '80px',
        position: 'relative'
      }}
      className="bg-mesh"
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Headlines & Copy */}
        <div>
          {/* Top Status Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 16px',
              borderRadius: '99px',
              background: 'rgba(255, 101, 89, 0.1)',
              border: '1px solid rgba(255, 101, 89, 0.25)',
              marginBottom: '24px'
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
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#FF6559',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              24/7 AI Voice Receptionist Active
            </span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              lineHeight: 1.15,
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '20px'
            }}
          >
            City Dental Clinic
          </h1>

          {/* Tagline Box with Switcher */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '18px 20px',
              marginBottom: '32px'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                color: '#E2E8F0',
                fontStyle: 'italic',
                lineHeight: 1.4,
                marginBottom: '14px',
                minHeight: '44px'
              }}
            >
              &ldquo;{TAGLINES[activeTaglineIndex].text}&rdquo;
            </p>

            {/* Switch Tagline Options */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Tagline Options:</span>
              {TAGLINES.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTaglineIndex(idx)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    background: activeTaglineIndex === idx ? '#FF6559' : 'rgba(255, 255, 255, 0.05)',
                    color: activeTaglineIndex === idx ? '#FFFFFF' : '#94A3B8',
                    borderColor: activeTaglineIndex === idx ? '#FF6559' : 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.15s'
                  }}
                >
                  Option {t.id}
                </button>
              ))}
            </div>
          </div>

          {/* Call to Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '36px'
            }}
          >
            <button
              onClick={onOpenVoice}
              className="btn-pulse-glow"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 30px',
                borderRadius: '99px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 700
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
              Talk to Maya (AI Receptionist)
            </button>

            <a
              href="#services"
              style={{
                color: '#E2E8F0',
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: 600,
                padding: '13px 22px',
                borderRadius: '99px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                transition: 'all 0.15s'
              }}
            >
              View Procedures &amp; Rates &rarr;
            </a>
          </div>

          {/* Quick Clinic Badges */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Hours */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                  flexShrink: 0
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Clinic Hours</span>
                <span style={{ fontSize: '0.85rem', color: '#F1F5F9', fontWeight: 600 }}>Mon–Sat: 9:00 AM – 6:00 PM</span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Closed Sundays</span>
              </div>
            </div>

            {/* Address */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#06B6D4',
                  flexShrink: 0
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Location</span>
                <span style={{ fontSize: '0.85rem', color: '#F1F5F9', fontWeight: 600 }}>12 Main Boulevard</span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Free Valet &amp; Parking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Voice Preview Card */}
        <div>
          <div
            className="glass-panel"
            style={{
              padding: '32px 28px',
              position: 'relative',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Top Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF6559, #F59E0B)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    flexShrink: 0
                  }}
                >
                  M
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#FFFFFF', fontWeight: 700 }}>Maya</h4>
                  <p style={{ fontSize: '0.78rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                    AI Receptionist &bull; Online
                  </p>
                </div>
              </div>

              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '4px 10px',
                  borderRadius: '99px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: '#94A3B8',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                24/7 Service
              </span>
            </div>

            {/* Conversation Mock Snippet */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div
                style={{
                  alignSelf: 'flex-start',
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '14px 14px 14px 4px',
                  padding: '10px 16px',
                  maxWidth: '90%',
                  fontSize: '0.88rem',
                  color: '#E2E8F0'
                }}
              >
                &ldquo;Hello! Thank you for calling City Dental Clinic. How can I help you book today?&rdquo;
              </div>

              <div
                style={{
                  alignSelf: 'flex-end',
                  background: 'rgba(255, 101, 89, 0.18)',
                  border: '1px solid rgba(255, 101, 89, 0.3)',
                  borderRadius: '14px 14px 4px 14px',
                  padding: '10px 16px',
                  maxWidth: '85%',
                  fontSize: '0.88rem',
                  color: '#FFFFFF'
                }}
              >
                &ldquo;Hi Maya, I&apos;d like to schedule a teeth cleaning for next Tuesday at 2 PM.&rdquo;
              </div>

              <div
                style={{
                  alignSelf: 'flex-start',
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '14px 14px 14px 4px',
                  padding: '10px 16px',
                  maxWidth: '90%',
                  fontSize: '0.88rem',
                  color: '#E2E8F0'
                }}
              >
                &ldquo;Tuesday at 2:00 PM is open! I have you down for Teeth Cleaning ($50). May I have your full name?&rdquo;
              </div>
            </div>

            {/* Card Action Call */}
            <button
              onClick={onOpenVoice}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(255, 101, 89, 0.15), rgba(255, 101, 89, 0.05))',
                border: '1px solid rgba(255, 101, 89, 0.4)',
                color: '#FF7D73',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FF6559';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 101, 89, 0.15), rgba(255, 101, 89, 0.05))';
                e.currentTarget.style.color = '#FF7D73';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Try Speaking with Maya Now
            </button>

            {/* Integrated Trust Strip */}
            <div
              style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                Instant confirmation &amp; Google Sheets sync
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
