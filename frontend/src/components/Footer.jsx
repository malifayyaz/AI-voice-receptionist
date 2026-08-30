'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer({ onOpenVoice }) {
  return (
    <footer
      style={{
        background: '#040710',
        borderTop: '1px solid rgba(255, 255, 255, 0.07)',
        paddingTop: '70px',
        paddingBottom: '40px',
        color: '#94A3B8'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '48px',
            marginBottom: '50px'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #D9654B, #0E162E)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C7.5 2 4 4.5 4 8c0 2.5 1 5 1.5 8 .5 3 2 6 3.5 6s2.5-3 3-5c.5 2 1.5 5 3 5s3-3 3.5-6c.5-3 1.5-5.5 1.5-8 0-3.5-3.5-6-8-6z"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
                City Dental Clinic
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px', color: '#94A3B8' }}>
              Exceptional, stress-free dental care backed by intelligent 24/7 appointment scheduling with Maya.
            </p>
            <button
              onClick={onOpenVoice}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'rgba(217, 101, 75, 0.1)',
                border: '1px solid rgba(217, 101, 75, 0.25)',
                color: '#E06D53',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#D9654B';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(217, 101, 75, 0.1)';
                e.currentTarget.style.color = '#E06D53';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              </svg>
              Speak to Maya Now
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.88rem', color: '#FFFFFF', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Services &amp; Rates</a></li>
              <li><a href="#experience" style={{ color: 'inherit', textDecoration: 'none' }}>Why Choose City Dental</a></li>
              <li><a href="#faqs" style={{ color: 'inherit', textDecoration: 'none' }}>Frequently Asked Questions</a></li>
              <li><Link href="/dashboard" style={{ color: '#10B981', textDecoration: 'none', fontWeight: 600 }}>Live Booking Dashboard &rarr;</Link></li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div>
            <h4 style={{ fontSize: '0.88rem', color: '#FFFFFF', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Visit &amp; Contact
            </h4>
            <div style={{ fontSize: '0.88rem', lineHeight: 1.7 }}>
              <p><strong style={{ color: '#FFFFFF' }}>Address:</strong> 12 Main Boulevard</p>
              <p><strong style={{ color: '#FFFFFF' }}>Hours:</strong> Mon–Sat: 9:00 AM – 6:00 PM</p>
              <p><strong style={{ color: '#FFFFFF' }}>Sunday:</strong> Closed</p>
              <p><strong style={{ color: '#FFFFFF' }}>Emergency:</strong> 24/7 via AI Receptionist</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '0.8rem'
          }}
        >
          <p>&copy; {new Date().getFullYear()} City Dental Clinic. All rights reserved.</p>
          <p style={{ color: '#64748B' }}>
            Emergency notice: In case of acute trauma or breathing difficulty, call emergency services immediately.
          </p>
        </div>
      </div>
    </footer>
  );
}
